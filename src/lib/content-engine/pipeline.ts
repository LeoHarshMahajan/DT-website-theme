import OpenAI from 'openai';
import sharp from 'sharp';
import { prisma } from '@/lib/db/prisma';
import { BLOG_CATEGORIES } from '@/lib/constants';
import { sanitizeHtml } from '@/lib/sanitize';
import { safeFetch } from '@/lib/safeFetch';
import {
  BANNED_PHRASES, DEPTHS, EVIDENCE_RULES, MAX_WORDS, MIN_SOURCES, MIN_WORDS,
  REAL_PROOF_POINTS, STRUCTURE_RULES, VOICE_RULES, linkCap,
} from './framework';

// Content Engine v2. Stages:
//   ideate -> research (live web search) -> verify sources (code) -> outline
//   -> sections in parallel (each linted by code, repaired once) -> FAQs
//   -> assemble (ids, takeaways, sources) -> deterministic gate -> LLM review
//   -> images. Runs in the background; progress is written to ContentRun.
//
// Why research is live: v1 wrote from gpt-4o's memory, so every stat was
// stale or unsourced. Now every number in an article must trace to a source
// the research stage found and code confirmed still resolves.

const MODEL = 'gpt-5.5';

const SERVICE_PAGES = [
  { url: '/solutions/organic-growth', label: 'SEO and organic growth services' },
  { url: '/search-engine-optimization', label: 'SEO for AI-first search (AEO/GEO)' },
  { url: '/solutions/performance', label: 'paid performance marketing' },
  { url: '/solutions/ai-automation', label: 'AI and marketing automation' },
  { url: '/solutions/content-social', label: 'content and social media' },
  { url: '/solutions/brand-creative', label: 'brand and creative' },
  { url: '/solutions/analytics', label: 'analytics and CRO' },
  { url: '/solutions/retention', label: 'retention, email and WhatsApp lifecycle' },
  { url: '/case-studies', label: 'Digital Triangle case studies' },
  { url: '/free-growth-audit', label: 'free growth audit' },
];

type LinkTarget = { url: string; label: string };
type Fact = { id: string; claim: string; url: string; publisher: string; date: string };
type Brief = { facts: Fact[]; questions: string[]; gaps: string[]; angle: string; entities: string[] };
type Section = { heading: string; covers: string; wordTarget: number; factIds: string[]; links: string[] };
type Outline = {
  directAnswer: string; takeaways: string[]; sections: Section[];
  faqs: { question: string; answerHint: string }[];
  category: string | null; excerpt: string; whyItWillRank: string; imageSection: number;
};
type QaCheck = { name: string; passed: boolean; note: string };
type QaReport = { passed: boolean; checks: QaCheck[] };
type Progress = (stage: string) => Promise<void>;

const slugify = (s: string) =>
  s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '').slice(0, 80);
const textOf = (html: string) => html.replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ');
const countWords = (html: string) => textOf(html).split(/\s+/).filter(Boolean).length;
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const domainOf = (u: string) => { try { return new URL(u).hostname.replace(/^www\./, ''); } catch { return ''; } };
const cleanUrl = (u: string) => {
  try {
    const url = new URL(u);
    for (const k of [...url.searchParams.keys()]) if (k.startsWith('utm_')) url.searchParams.delete(k);
    return url.toString();
  } catch { return ''; }
};

function parseJson(text: string): Record<string, unknown> {
  try { return JSON.parse(text); } catch { /* fall through */ }
  const m = text.match(/\{[\s\S]*\}/); // model wrapped JSON in prose/fences
  if (m) try { return JSON.parse(m[0]); } catch { /* fall through */ }
  return {};
}

async function ask(
  openai: OpenAI,
  opts: { system: string; user: string; effort?: 'low' | 'medium' | 'high'; search?: boolean },
): Promise<Record<string, unknown>> {
  const res = await openai.responses.create({
    model: MODEL,
    reasoning: { effort: opts.effort ?? 'low' },
    instructions: opts.system,
    // JSON mode requires the word "json" in the input itself, not just the instructions.
    input: `${opts.user}\n\nRespond with a single JSON object only.`,
    ...(opts.search
      ? { tools: [{ type: 'web_search' as const, user_location: { type: 'approximate' as const, country: 'IN' } }] }
      : { text: { format: { type: 'json_object' as const } } }),
  });
  return parseJson(res.output_text ?? '');
}

// ── 1. Ideate ───────────────────────────────────────────────────────────────
async function ideate(openai: OpenAI, existingTitles: string[], steer?: { topic: string; notes: string | null }) {
  const steerBlock = steer
    ? `\n\nHarsh has requested this topic. You MUST write about it, not a substitute:\nTopic: ${steer.topic}${steer.notes ? `\nAngle / must-cover: ${steer.notes}` : ''}\nShape it into a specific title and the main search query it should rank for.`
    : '\n\nPropose the single best next topic.';
  const r = await ask(openai, {
    system: `You are the content strategist for Digital Triangle, an Indian growth marketing agency (D2C, SEO/AEO, paid ads, AI automation, retention, analytics). Pick ONE article that a founder in India would genuinely search for and that DT has real expertise to answer. Prefer specific, practical, commercially valuable queries over broad trend pieces. The title should promise a concrete outcome and include the target query naturally; no clickbait, no year unless the query needs it.
Service areas: ${BLOG_CATEGORIES.map((c) => c.label).join(', ')}.
Return JSON: { "title": string, "targetQuery": string, "rationale": string (2-3 sentences), "score": number 0-100 }.`,
    user: `Already-published titles (do NOT repeat or closely overlap):\n${existingTitles.map((t) => `- ${t}`).join('\n') || '(none)'}${steerBlock}`,
  });
  if (!r.title || !r.targetQuery) return null;
  return {
    title: String(r.title), targetQuery: String(r.targetQuery),
    rationale: String(r.rationale ?? ''), score: typeof r.score === 'number' ? r.score : 70,
  };
}

// ── 2. Research (live web) ────────────────────────────────────────────────
async function research(openai: OpenAI, concept: { title: string; targetQuery: string }): Promise<Brief> {
  const r = await ask(openai, {
    effort: 'medium',
    search: true,
    system: `You are a research analyst preparing a fact brief for a writer. Search the live web. Prefer primary and authoritative sources: official platform docs and help centres (Google, Meta, Shopify), government/regulator data (RBI, MeitY, TRAI, CBIC), industry bodies and reputable research (IAMAI, KPMG, Redseer, Bain, McKinsey, Statista summaries), and major publications (Economic Times, Mint, Business Standard, TechCrunch). Prefer India-specific data. Prefer sources from the last 24 months. Never use a competitor agency's blog as a source of statistics.
Also look at what currently ranks for the query: note what those pages cover and what they miss.

Return ONLY a JSON object:
{ "facts": [ { "claim": string (one precise factual statement, with the exact number as published), "url": string (the exact page URL), "publisher": string (e.g. "Google Search Central", "RBI", "Economic Times"), "date": string (publish/update date if shown, else "") } ] (10-16 items),
  "questions": string[] (6-10 real questions people ask about this),
  "gaps": string[] (3-5 things the current top results get wrong or leave out),
  "angle": string (the specific angle that would make our article more useful than what ranks today),
  "entities": string[] (tools, platforms, metrics and concepts the article must mention to be complete) }`,
    user: `Article: ${concept.title}\nTarget query: ${concept.targetQuery}`,
  });

  const facts = (Array.isArray(r.facts) ? r.facts : [])
    .map((f: Record<string, unknown>, i: number) => ({
      id: `F${i + 1}`,
      claim: String(f.claim ?? '').trim(),
      url: cleanUrl(String(f.url ?? '')),
      publisher: String(f.publisher ?? '').trim() || domainOf(String(f.url ?? '')),
      date: String(f.date ?? '').trim(),
    }))
    .filter((f) => f.claim && /^https?:\/\//.test(f.url));
  const list = (v: unknown) => (Array.isArray(v) ? v.map(String).filter(Boolean) : []);
  return { facts, questions: list(r.questions), gaps: list(r.gaps), angle: String(r.angle ?? ''), entities: list(r.entities) };
}

// Code, not the model, decides whether a source is real. 404/410/DNS failure
// means the model invented or mangled it: drop. 401/403/429 means the page
// exists but blocks bots (common on news sites): keep.
async function verifySources(facts: Fact[]): Promise<Fact[]> {
  const status = new Map<string, boolean>();
  await Promise.all([...new Set(facts.map((f) => f.url))].map(async (url) => {
    try {
      const { res } = await safeFetch(url, { timeoutMs: 10000, headers: { 'User-Agent': 'Mozilla/5.0 (compatible; DTContentBot/1.0)' } });
      res.body?.cancel().catch(() => {});
      status.set(url, res.status < 400 || [401, 403, 429].includes(res.status));
    } catch {
      status.set(url, false);
    }
  }));
  return facts.filter((f) => status.get(f.url));
}

// ── 3. Outline ────────────────────────────────────────────────────────────
async function planOutline(
  openai: OpenAI,
  concept: { title: string; targetQuery: string; rationale: string },
  brief: Brief,
  links: LinkTarget[],
  feedback?: string[],
): Promise<Outline | null> {
  const r = await ask(openai, {
    system: `You plan long-form articles for Digital Triangle's blog. ${STRUCTURE_RULES}

DEPTH: choose one, based on what it takes to genuinely beat what ranks today for this query:
- "standard": ${DEPTHS.standard.sections} H2 sections, ${DEPTHS.standard.words} words. For focused, specific how-to queries.
- "skyscraper": ${DEPTHS.skyscraper.sections} H2 sections, ${DEPTHS.skyscraper.words} words. For broad or competitive queries where the top results are long guides; must be the most complete and useful resource on the topic.
Length must come from depth: every section must give the buyer something new (a decision framework, worked example, benchmark, tool setup, checklist, mistake to avoid). Never pad, never restate.
Assign each section the research facts (by id) it should use; spread facts so most of them get used and no fact is assigned twice.
Assign internal links: about one per 350 words in total, only where genuinely relevant, at most 2 per section, none in the first section. Only use URLs from the candidate list.

Return JSON: { "depth": "standard" | "skyscraper", "directAnswer": string, "takeaways": string[], "sections": [ { "heading": string, "covers": string (3-4 sentences briefing the writer: the exact points, examples, tools and thresholds to include), "wordTarget": number (standard ${DEPTHS.standard.sectionWords.join('-')}, skyscraper ${DEPTHS.skyscraper.sectionWords.join('-')}), "factIds": string[], "links": string[] (URLs) } ], "faqs": [ { "question": string, "answerHint": string } ], "category": string (one of: ${BLOG_CATEGORIES.map((c) => c.slug).join(', ')}), "excerpt": string (150-160 characters, written as the meta description), "whyItWillRank": string, "imageSection": number (0-based index of the section that most benefits from an explanatory illustration) }`,
    user: `Title: ${concept.title}
Target query: ${concept.targetQuery}
Why: ${concept.rationale}
Angle to win: ${brief.angle}
Gaps in what ranks today: ${brief.gaps.join(' | ')}
Must-cover entities: ${brief.entities.join(', ')}
Questions people ask: ${brief.questions.join(' | ')}

Research facts:
${brief.facts.map((f) => `${f.id}: ${f.claim} (${f.publisher}${f.date ? `, ${f.date}` : ''})`).join('\n') || '(none)'}

Internal link candidates:
${links.map((l) => `- ${l.url}: ${l.label}`).join('\n')}${feedback?.length ? `\n\nThe previous version FAILED review. Fix each of these in this plan:\n${feedback.map((f) => `- ${f}`).join('\n')}` : ''}`,
  });

  if (!Array.isArray(r.sections) || !r.sections.length) return null;
  const known = new Set(links.map((l) => l.url));
  const factIds = new Set(brief.facts.map((f) => f.id));
  const depth = r.depth === 'skyscraper' ? 'skyscraper' : 'standard';
  const [minW, maxW] = DEPTHS[depth].sectionWords;
  const sections: Section[] = (r.sections as Record<string, unknown>[])
    .filter((s) => s?.heading)
    .map((s) => ({
      heading: String(s.heading),
      covers: String(s.covers ?? ''),
      wordTarget: Math.min(maxW, Math.max(minW, Number(s.wordTarget) || minW)),
      factIds: (Array.isArray(s.factIds) ? s.factIds.map(String) : []).filter((id) => factIds.has(id)),
      links: (Array.isArray(s.links) ? s.links.map(String) : []).filter((u) => known.has(u)).slice(0, 2),
    }));
  // Article-wide link cap enforced in code (the first test linked 12 times
  // because nothing capped the total), scaled to the planned length.
  let linkBudget = linkCap(sections.reduce((n, s) => n + s.wordTarget, 0));
  const seenLinks = new Set<string>();
  for (const s of sections) {
    s.links = s.links.filter((u) => !seenLinks.has(u) && linkBudget > 0 && (seenLinks.add(u), linkBudget--, true));
  }
  const faqs = (Array.isArray(r.faqs) ? r.faqs : [])
    .filter((f: Record<string, unknown>) => f?.question)
    .map((f: Record<string, unknown>) => ({ question: String(f.question), answerHint: String(f.answerHint ?? '') }));
  return {
    directAnswer: String(r.directAnswer ?? ''),
    takeaways: Array.isArray(r.takeaways) ? r.takeaways.map(String).filter(Boolean).slice(0, 5) : [],
    sections,
    faqs,
    category: BLOG_CATEGORIES.some((c) => c.slug === r.category) ? String(r.category) : null,
    excerpt: String(r.excerpt ?? ''),
    whyItWillRank: String(r.whyItWillRank ?? ''),
    imageSection: Math.min(sections.length - 1, Math.max(0, Number(r.imageSection) || 2)),
  };
}

// ── 4. Write + lint each section ─────────────────────────────────────────
// Numbers worth guarding: percentages, money, multipliers, big counts.
const NUMBER_RE = /(?:₹|\$|rs\.?\s?|inr\s?)\s?\d[\d,.]*\s?(?:k|lakh|lakhs|crore|cr|mn|million|bn|billion)?|\d[\d,.]*\s?(?:%|x\b|×|lakh|crore|million|billion)/gi;
const normNum = (s: string) => s.toLowerCase().replace(/rs\.?|inr|₹|\$|\s|,/g, '');

// Word-boundary match, so "realm" doesn't flag the phone brand "Realme".
export const bannedHits = (text: string) =>
  BANNED_PHRASES.filter((p) => new RegExp(`(^|[^a-z])${p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}([^a-z]|$)`, 'i').test(text));

/** Problems a writer must fix. Empty = clean. */
export function lintSection(html: string, opts: { wordTarget: number; allowedText: string; allowedUrls: Set<string>; needsCitation: boolean }): string[] {
  const issues: string[] = [];
  const text = textOf(html);
  const hits = bannedHits(text);
  if (hits.length) issues.push(`Remove banned phrasing: ${hits.map((h) => `"${h}"`).join(', ')}.`);
  const dashes = (text.match(/—/g) ?? []).length;
  if (dashes > 1) issues.push(`Uses ${dashes} em dashes; at most 1. Use commas or full stops.`);
  const words = countWords(html);
  if (opts.wordTarget && words < opts.wordTarget * 0.8) issues.push(`Only ${words} words; write about ${opts.wordTarget}.`);
  if (opts.wordTarget && words > opts.wordTarget * 1.35) issues.push(`${words} words is too long; cut to about ${opts.wordTarget} by removing repetition and the weakest points, keeping every specific.`);
  const allowed = normNum(opts.allowedText);
  const invented = [...new Set((text.match(NUMBER_RE) ?? []).map((n) => n.trim()))].filter((n) => !allowed.includes(normNum(n)));
  if (invented.length) issues.push(`These numbers are not in your facts or DT's verified results, so they count as invented: ${invented.join(', ')}. Remove them or use a provided fact.`);
  const hrefs = [...html.matchAll(/href="([^"]+)"/g)].map((m) => m[1]);
  const stray = hrefs.filter((h) => !opts.allowedUrls.has(h));
  if (stray.length) issues.push(`These links are not allowed (use only the URLs provided): ${stray.join(', ')}.`);
  if (opts.needsCitation && !hrefs.some((h) => /^https?:/.test(h))) issues.push('Cite at least one of your assigned facts inline with its source link.');
  return issues;
}

async function writeSection(
  openai: OpenAI,
  concept: { title: string; targetQuery: string },
  outline: Outline,
  index: number,
  facts: Fact[],
  links: LinkTarget[],
): Promise<string> {
  const s = outline.sections[index];
  const myFacts = facts.filter((f) => s.factIds.includes(f.id));
  const myLinks = links.filter((l) => s.links.includes(l.url));
  const allowedUrls = new Set([...myFacts.map((f) => f.url), ...myLinks.map((l) => l.url)]);
  const allowedText = myFacts.map((f) => f.claim).join(' ') + ' ' + REAL_PROOF_POINTS;

  const system = `You write one section of a long-form article for Digital Triangle's blog.
${VOICE_RULES}

${EVIDENCE_RULES}

Write ONLY this section's body HTML (no <h2>, it is added for you): about ${s.wordTarget} words of <p> paragraphs, plus a <ul>/<ol> or a small <table> only where it genuinely helps the reader. Use <h3> sub-headings only if the section has distinct steps. Include at least one hard specific (exact tool, setting, metric, threshold, formula or step sequence).
Return JSON: { "html": string }.`;
  const base = `Article: ${concept.title} (target query: ${concept.targetQuery})
Section ${index + 1} of ${outline.sections.length}: ${s.heading}
Other sections (don't repeat their content): ${outline.sections.filter((_, i) => i !== index).map((x) => x.heading).join(' | ')}
What this section must cover: ${s.covers}

Facts you may use (cite inline as <a href="URL">Publisher</a>):
${myFacts.map((f) => `- ${f.claim} | URL: ${f.url} | Publisher: ${f.publisher}`).join('\n') || '(none: make the point without statistics)'}

Internal links to weave in naturally (use each once, as <a href="URL">descriptive anchor</a>):
${myLinks.map((l) => `- ${l.url}: ${l.label}`).join('\n') || '(none)'}`;

  let html = String((await ask(openai, { system, user: base })).html ?? '');
  const lintOpts = { wordTarget: s.wordTarget, allowedText, allowedUrls, needsCitation: myFacts.length > 0 };
  const issues = lintSection(html, lintOpts);
  if (issues.length) {
    // One targeted repair: the writer sees its own draft and the exact problems.
    const fixed = String((await ask(openai, {
      system,
      user: `${base}\n\nYour previous draft:\n${html}\n\nRewrite it fixing ALL of these problems, keeping everything else that works:\n${issues.map((i) => `- ${i}`).join('\n')}`,
    })).html ?? '');
    if (fixed && lintSection(fixed, lintOpts).length <= issues.length) html = fixed;
  }
  return html;
}

async function writeFaqs(openai: OpenAI, concept: { title: string }, outline: Outline): Promise<string> {
  if (!outline.faqs.length) return '';
  const system = `You write the FAQ section of a Digital Triangle article. ${VOICE_RULES}
Answer each question in 40-70 words: lead with the direct answer, then the reason. No statistics, percentages or money figures (FAQs carry no citations) and no links. Return JSON: { "html": string } with, per FAQ, an <h3> holding the question and a <p> holding the answer.`;
  const user = `Article: ${concept.title}\n\n${outline.faqs.map((f) => `Q: ${f.question}\nAngle: ${f.answerHint}`).join('\n\n')}`;
  let html = String((await ask(openai, { system, user })).html ?? '');
  // Same evidence rule as sections, with an empty allow-list: any stat here is invented.
  const issues = lintSection(html, { wordTarget: 0, allowedText: REAL_PROOF_POINTS, allowedUrls: new Set(), needsCitation: false });
  if (issues.length) {
    const fixed = String((await ask(openai, { system, user: `${user}\n\nYour previous draft:\n${html}\n\nRewrite it fixing ALL of these problems:\n${issues.map((i) => `- ${i}`).join('\n')}` })).html ?? '');
    if (fixed) html = fixed;
  }
  return html;
}

// ── 5. Assemble ───────────────────────────────────────────────────────────
// Parallel sections can't see each other's links: keep each URL's first use.
function dedupeLinks(html: string): string {
  const seen = new Set<string>();
  return html.replace(/<a\s+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi, (m, url: string, text: string) => {
    if (seen.has(url)) return text;
    seen.add(url);
    return m;
  });
}

// Belt and braces after the per-section lint: any link to a URL we did not
// supply is unwrapped to plain text, so a hallucinated URL can never ship.
function keepKnownLinks(html: string, allowed: Set<string>): string {
  return html.replace(/<a\s+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi, (m, url: string, text: string) => (allowed.has(url) ? m : text));
}

function assemble(outline: Outline, bodies: string[], faqHtml: string, facts: Fact[], links: LinkTarget[]) {
  const parts: string[] = [];
  if (outline.directAnswer) parts.push(`<p class="direct-answer"><strong>${esc(outline.directAnswer)}</strong></p>`);
  if (outline.takeaways.length) {
    parts.push(`<div class="key-takeaways"><p><strong>Key takeaways</strong></p><ul>${outline.takeaways.map((t) => `<li>${esc(t)}</li>`).join('')}</ul></div>`);
  }
  const used = new Set<string>();
  outline.sections.forEach((s, i) => {
    if (!bodies[i]?.trim()) return;
    let id = slugify(s.heading) || `section-${i + 1}`;
    while (used.has(id)) id += '-2';
    used.add(id);
    parts.push(`<h2 id="${id}">${esc(s.heading)}</h2>`, bodies[i]);
  });
  if (faqHtml.trim()) parts.push('<h2 id="faq">Frequently asked questions</h2>', faqHtml);

  const allowed = new Set([...facts.map((f) => f.url), ...links.map((l) => l.url)]);
  let html = dedupeLinks(keepKnownLinks(sanitizeHtml(parts.join('\n')), allowed));

  // Sources = the research facts actually cited in the body, in order of use.
  // citedFacts: every fact whose source is linked (one source often backs
  // several facts; the reviewer needs all of them). cited: one per source,
  // for the visible Sources list.
  const citedFacts = facts.filter((f) => html.includes(`href="${f.url}"`));
  const cited = citedFacts.filter((f, i, all) => all.findIndex((x) => x.url === f.url) === i);
  if (cited.length) {
    html += `\n<h2 id="sources">Sources</h2>\n<ol class="sources">${cited
      .map((f) => `<li><a href="${f.url}">${esc(f.publisher)}</a>${f.date ? `, ${esc(f.date)}` : ''}</li>`)
      .join('')}</ol>`;
  }
  return { html, cited, citedFacts };
}

// ── 6. Gates ──────────────────────────────────────────────────────────────
function deterministicGate(html: string, cited: Fact[], knownInternal: Set<string>): QaCheck[] {
  const body = html.split('<h2 id="sources">')[0];
  const words = countWords(body);
  const domains = new Set(cited.map((f) => domainOf(f.url)));
  const internal = [...new Set([...body.matchAll(/href="(\/[^"]*)"/g)].map((m) => m[1]))];
  const broken = internal.filter((u) => !knownInternal.has(u));
  const banned = bannedHits(textOf(body));
  return [
    { name: 'length', passed: words >= MIN_WORDS && words <= MAX_WORDS, note: `${words} words (allowed ${MIN_WORDS}-${MAX_WORDS})` },
    { name: 'sources', passed: domains.size >= MIN_SOURCES, note: `${domains.size} distinct cited domains (minimum ${MIN_SOURCES}): ${[...domains].join(', ')}` },
    { name: 'internal-links', passed: internal.length >= 3 && internal.length <= linkCap(words) + 1 && !broken.length, note: `${internal.length} internal links${broken.length ? `, broken: ${broken.join(', ')}` : ''} (allowed 3-${linkCap(words) + 1} for ${words} words)` },
    { name: 'language', passed: banned.length === 0, note: banned.length ? `banned phrasing: ${banned.join(', ')}` : 'no banned phrasing' },
  ];
}

async function editorialReview(
  openai: OpenAI,
  input: { title: string; targetQuery: string; html: string; facts: Fact[]; existingTitles: string[] },
): Promise<QaCheck[]> {
  const r = await ask(openai, {
    system: `You are the senior editor and final gate before a human reviews this draft. Decide "is this publishable and genuinely useful?", not "could it be better?". Fail ONLY on a concrete defect you can quote from the draft. Return JSON: { "checks": [ { "name": string, "passed": boolean, "note": string } ] } with exactly these checks:
- "accuracy": FAIL if any sentence misrepresents what its cited source fact says, or cites a DT client result for a mechanism it didn't come from. Quote it.
- "intent-match": FAIL if the article doesn't actually answer the target query a searcher typed.
- "usefulness": PASS if a reader gets at least five concrete, actionable specifics (tools, settings, thresholds, steps, worked example). FAIL only if it's generic throughout.
- "originality": FAIL only if it substantially duplicates one of DT's existing titles listed.
- "depth": the article may be long on purpose. FAIL only if you can point to specific sections that pad: they restate another section, or stay generic with no framework, example, benchmark, setup step or decision rule a buyer could use. Name the sections. Length alone is never a failure and never a pass.
- "voice": FAIL only if you can quote filler, AI-tell phrasing or repetitive structure (e.g. every section ending with a summary line).`,
    user: `Target query: ${input.targetQuery}\nExisting DT titles:\n${input.existingTitles.map((t) => `- ${t}`).join('\n')}\n\nSource facts the writer had:\n${input.facts.map((f) => `- ${f.claim} (${f.url})`).join('\n')}\n\nVerified DT client results:\n${REAL_PROOF_POINTS}\n\nDraft title: ${input.title}\nDraft:\n${input.html}`,
  });
  return Array.isArray(r.checks)
    ? (r.checks as Record<string, unknown>[]).map((c) => ({ name: String(c.name), passed: Boolean(c.passed), note: String(c.note ?? '') }))
    : [{ name: 'review', passed: false, note: 'editor returned no verdict' }];
}

// ── 7. Images (best-effort: a failed image never blocks an article) ───────
export async function makeImage(openai: OpenAI, prompt: string, name: string, size: '1536x1024' | '1024x1024'): Promise<string | null> {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseKey) return null;
  try {
    const img = await openai.images.generate({ model: IMAGE_MODEL, prompt, size });
    const b64 = img.data?.[0]?.b64_json;
    if (!b64) return null;
    // The model returns ~1.5-2 MB PNGs; as WebP they're ~100-200 KB, which
    // matters for Core Web Vitals. Falls back to the PNG if conversion fails.
    let bytes: Buffer = Buffer.from(b64, 'base64');
    let ext = 'png';
    try {
      bytes = await sharp(bytes).webp({ quality: 82 }).toBuffer();
      ext = 'webp';
    } catch (err) {
      console.warn('content-engine: webp conversion failed, uploading png', err instanceof Error ? err.message : err);
    }
    const path = `ai-${name.slice(0, 50)}-${Date.now()}.${ext}`;
    const res = await fetch(`${supabaseUrl}/storage/v1/object/blog-images/${path}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${supabaseKey}`, apikey: supabaseKey, 'Content-Type': `image/${ext}`, 'x-upsert': 'true' },
      body: new Uint8Array(bytes),
    });
    if (!res.ok) {
      console.warn('content-engine: image upload failed', res.status, (await res.text()).slice(0, 200));
      return null;
    }
    return `${supabaseUrl}/storage/v1/object/public/blog-images/${path}`;
  } catch (err) {
    console.warn('content-engine: image generation failed', err instanceof Error ? err.message : err);
    return null;
  }
}

// gpt-image-1 was retired from this account (calls 400 "does not exist"),
// which silently cost every draft its cover. Checked against models.list().
const IMAGE_MODEL = 'gpt-image-2';
// No maps or flags: AI maps get India's official borders wrong, and
// publishing an incorrect map of India is a legal problem, not just a visual one.
export const STYLE = 'Premium editorial illustration, dark near-black background (#07070a) with electric blue (#4b6bff), violet (#8b5cf6) and magenta (#c026d3) light. Clean, modern, generous negative space, subtle depth and glow. Absolutely no text, letters, numbers, logos, watermarks or UI labels. No maps, country outlines or flags.';

// ── Orchestration ─────────────────────────────────────────────────────────
export type RunResult =
  | { ok: true; draftId: string; passed: true }
  | { ok: true; passed: false; reason: string }
  | { ok: false; error: string };

export async function runPipeline(progress: Progress = async () => {}): Promise<RunResult> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return { ok: false, error: 'OPENAI_API_KEY not configured' };
  const openai = new OpenAI({ apiKey, timeout: 240_000 });

  const existingTitles = (await prisma.post.findMany({ select: { title: true }, orderBy: { createdAt: 'desc' }, take: 150 })).map((p) => p.title);

  // Oldest requested topic first; conditional update so two runs can't share it.
  const candidate = await prisma.contentTopic.findFirst({ where: { status: 'PENDING' }, orderBy: { createdAt: 'asc' } });
  let steer: typeof candidate = null;
  if (candidate) {
    const claim = await prisma.contentTopic.updateMany({ where: { id: candidate.id, status: 'PENDING' }, data: { status: 'CLAIMED' } });
    if (claim.count === 1) steer = candidate;
  }
  const releaseTopic = async () => {
    if (steer) await prisma.contentTopic.updateMany({ where: { id: steer.id, status: 'CLAIMED' }, data: { status: 'PENDING' } });
  };

  try {
    await progress(steer ? `Shaping your topic "${steer.topic}"` : 'Choosing a topic');
    const concept = await ideate(openai, existingTitles, steer ? { topic: steer.topic, notes: steer.notes } : undefined);
    if (!concept) { await releaseTopic(); return { ok: false, error: 'Ideation failed to produce a concept' }; }
    const conceptRow = await prisma.contentConcept.create({
      data: { title: concept.title, targetQuery: concept.targetQuery, rationale: concept.rationale, score: concept.score },
    });

    await progress(`Researching "${concept.title}" on the live web`);
    const brief = await research(openai, concept);
    await progress(`Checking ${brief.facts.length} sources still resolve`);
    brief.facts = await verifySources(brief.facts);
    if (new Set(brief.facts.map((f) => domainOf(f.url))).size < MIN_SOURCES) {
      await prisma.contentConcept.update({ where: { id: conceptRow.id }, data: { status: 'DISCARDED' } });
      await releaseTopic();
      return { ok: true, passed: false, reason: `Research found only ${brief.facts.length} verifiable sources for "${concept.title}", too thin to write a cited article. Nothing queued${steer ? '; your topic stays in the list' : ''}.` };
    }

    const posts = await prisma.post.findMany({
      where: { status: 'PUBLISHED' },
      select: { title: true, slug: true, excerpt: true },
      orderBy: { publishedAt: 'desc' },
      take: 60,
    });
    const links: LinkTarget[] = [
      ...posts.map((p) => ({ url: `/blog/${p.slug}`, label: `${p.title}${p.excerpt ? `: ${p.excerpt.slice(0, 120)}` : ''}` })),
      ...SERVICE_PAGES,
    ];
    const knownInternal = new Set(links.map((l) => l.url));

    let feedback: string[] | undefined;
    let lastFailure = '';
    for (let attempt = 0; attempt < 2; attempt++) {
      await progress(attempt ? 'Revising the plan after review' : 'Planning the outline');
      const outline = await planOutline(openai, concept, brief, links, feedback);
      if (!outline) { lastFailure = 'outline'; continue; }

      await progress(`Writing ${outline.sections.length} sections in parallel`);
      const [bodies, faqHtml] = await Promise.all([
        Promise.all(outline.sections.map((_, i) => writeSection(openai, concept, outline, i, brief.facts, links))),
        writeFaqs(openai, concept, outline),
      ]);
      const { html, cited, citedFacts } = assemble(outline, bodies, faqHtml, brief.facts, links);

      await progress('Reviewing the draft');
      const hard = deterministicGate(html, cited, knownInternal);
      const soft = hard.every((c) => c.passed)
        ? await editorialReview(openai, { title: concept.title, targetQuery: concept.targetQuery, html, facts: citedFacts, existingTitles })
        : [];
      const checks = [...hard, ...soft];
      const qa: QaReport = { passed: checks.every((c) => c.passed), checks };

      if (!qa.passed) {
        feedback = checks.filter((c) => !c.passed).map((c) => `${c.name}: ${c.note}`);
        lastFailure = feedback.map((f) => f.split(':')[0]).join(', ');
        console.warn(`content-engine: review failed for "${concept.title}" (attempt ${attempt + 1}):`, feedback);
        continue;
      }

      const baseSlug = slugify(concept.title);
      let slug = baseSlug;
      for (let n = 2; await prisma.contentDraft.findUnique({ where: { slug } }); n++) slug = `${baseSlug}-${n}`;

      await progress('Generating the cover and an in-article illustration');
      const imgSection = outline.sections[outline.imageSection];
      const [coverImage, inlineImage] = await Promise.all([
        makeImage(openai, `Hero image for an article titled "${concept.title}". Visual metaphor for the idea, abstract and conceptual. ${STYLE}`, `${slug}-cover`, '1536x1024'),
        makeImage(openai, `Explanatory concept illustration for an article section titled "${imgSection.heading}": ${imgSection.covers.slice(0, 300)}. Show the idea as a clear visual diagram-like metaphor (flows, layers, stages) without any labels. ${STYLE}`, `${slug}-inline`, '1536x1024'),
      ]);
      let content = html;
      if (inlineImage) {
        const anchor = `<h2 id="${slugify(imgSection.heading)}">`;
        const at = content.indexOf(anchor);
        const next = at >= 0 ? content.indexOf('<h2', at + anchor.length) : -1;
        if (next > 0) {
          content = `${content.slice(0, next)}<figure><img src="${inlineImage}" alt="${esc(`Illustration: ${imgSection.heading}`)}" loading="lazy" width="1536" height="1024" /></figure>\n${content.slice(next)}`;
        }
      }

      const draftRow = await prisma.contentDraft.create({
        data: {
          conceptId: conceptRow.id,
          title: concept.title,
          slug,
          excerpt: outline.excerpt,
          content,
          category: outline.category,
          coverImage,
          targetQuery: concept.targetQuery,
          whyItWillRank: outline.whyItWillRank,
          qaReport: JSON.stringify(qa),
          sources: JSON.stringify(citedFacts.map(({ url, publisher, date, claim }) => ({ url, publisher, date, claim }))),
          researchBrief: JSON.stringify({ angle: brief.angle, gaps: brief.gaps, questions: brief.questions, entities: brief.entities }),
        },
      });
      await prisma.contentConcept.update({ where: { id: conceptRow.id }, data: { status: 'DRAFTED' } });
      if (steer) await prisma.contentTopic.update({ where: { id: steer.id }, data: { status: 'USED' } });
      return { ok: true, draftId: draftRow.id, passed: true };
    }

    await prisma.contentConcept.update({ where: { id: conceptRow.id }, data: { status: 'DISCARDED' } });
    await releaseTopic();
    return {
      ok: true,
      passed: false,
      reason: `"${concept.title}" failed review twice (${lastFailure || 'unknown'}), so it was discarded.${steer ? ` Your topic "${steer.topic}" is still queued for the next run.` : ''}`,
    };
  } catch (err) {
    await releaseTopic();
    throw err;
  }
}
