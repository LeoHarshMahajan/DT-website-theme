import OpenAI from 'openai';
import { prisma } from '@/lib/db/prisma';
import { BLOG_CATEGORIES } from '@/lib/constants';
import { CASES } from '@/app/(main)/case-studies/page';

// Real, already-published proof points — the actual fix for weak "usefulness"
// and fact-check failures found in testing (the model fabricated a "Brand X,
// 15% increase" case study when it had nothing real to cite). Reusing the
// live case-studies page's own data, not inventing a knowledge base.
const REAL_PROOF_POINTS = CASES.map(
  (c) => `${c.name} (${c.industry}): ${c.headline} — ${c.metrics.map((m) => `${m.value} ${m.label}`).join(', ')}`
).join('\n');

// ponytail: research/differentiation and drafting are one OpenAI call, not
// the spec's two separate stages — tightly coupled reasoning-then-writing,
// splitting it added a round trip with no quality win in testing. Split again
// if a real draft shows the model needs a dedicated research pass.
//
// Also: no live SERP reading here (spec allows it, but only "no paid API in
// v1" — scraping Google SERPs is exactly the kind of thing that got ruled out
// for social profiles on the Discovery Agent: unreliable and actively
// blocked). Differentiation instead comes from DT's own blog corpus (what's
// already been said) plus the model's training knowledge — same honesty
// principle as analyzeWebsite: don't claim to have read something you didn't.
const MODEL = 'gpt-4o';

// Floor, not the target. Harsh's bar is 1800-2000+ for anything meant to rank.
// A single completion reliably under-delivers on length (asking gpt-4o for
// 2000 words in one shot yielded ~370-700), so the article is planned as an
// outline and then written section by section in parallel — each call only has
// to do 250-350 words well, which it actually does.
const MIN_WORDS = 1500;
const TARGET_WORDS = '1800-2200';

// Internal linking targets that always exist, regardless of how many posts are
// published. Blog posts get added to this list at runtime.
const SERVICE_PAGES = [
  { url: '/solutions/organic-growth', label: 'SEO and organic growth' },
  { url: '/solutions/performance', label: 'paid performance marketing' },
  { url: '/solutions/ai-automation', label: 'AI and marketing automation' },
  { url: '/solutions/content-social', label: 'content and social' },
  { url: '/solutions/analytics', label: 'analytics and CRO' },
  { url: '/solutions/retention', label: 'retention and lifecycle' },
  { url: '/case-studies', label: 'Digital Triangle case studies' },
  { url: '/free-growth-audit', label: 'free growth audit' },
];

type LinkTarget = { url: string; label: string };

function getClient() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;
  return new OpenAI({ apiKey });
}

type QaCheck = { name: string; passed: boolean; note: string };
type QaReport = { passed: boolean; checks: QaCheck[] };

function slugify(s: string): string {
  return s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

// Model output is rendered with dangerouslySetInnerHTML — in the admin preview
// and, once approved, publicly on the blog. The model is told to emit semantic
// HTML, but "we asked it nicely" is not a security control on a path that ends
// in public HTML. Strip executable vectors at ingest.
// ponytail: regex, not a sanitiser dep — the allowed surface here is a handful
// of text tags we generate ourselves. Swap in DOMPurify if this ever accepts
// HTML from anywhere other than our own prompt.
function sanitizeHtml(html: string): string {
  return html
    .replace(/<script\b[\s\S]*?<\/script\s*>/gi, '')
    .replace(/<(iframe|object|embed|style|link|meta|form)\b[\s\S]*?(<\/\1\s*>|>)/gi, '')
    .replace(/\son\w+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, '') // onclick=, onerror=, ...
    .replace(/(href|src)\s*=\s*(?:"\s*javascript:[^"]*"|'\s*javascript:[^']*'|javascript:[^\s>]+)/gi, '$1="#"');
}

async function jsonCompletion(openai: OpenAI, system: string, user: string, maxTokens?: number) {
  const res = await openai.chat.completions.create({
    model: MODEL,
    messages: [
      { role: 'system', content: system },
      { role: 'user', content: user },
    ],
    response_format: { type: 'json_object' },
    ...(maxTokens ? { max_tokens: maxTokens } : {}),
  });
  return JSON.parse(res.choices[0].message.content || '{}');
}

async function ideate(
  openai: OpenAI,
  existingTitles: string[],
  steer?: { topic: string; notes: string | null }
): Promise<{ title: string; targetQuery: string; rationale: string; score: number } | null> {
  // A steer is a direction, not a finished title — the model still shapes it
  // into a narrow angle and a real target query, it just can't pick a
  // different subject.
  const steerBlock = steer
    ? `\n\nHarsh has requested this specific topic — you MUST write about it, do not substitute your own subject:\nTopic: ${steer.topic}${steer.notes ? `\nAngle / must-cover: ${steer.notes}` : ''}\nTurn it into a narrow, concrete title and the target search query it should rank for.`
    : '\n\nPropose the single best next topic.';

  const categories = BLOG_CATEGORIES.map((c) => c.label).join(', ');
  const result = await jsonCompletion(
    openai,
    `You are the content strategist for Digital Triangle, a growth marketing agency (D2C, AI marketing, SEO, paid ads, retention, analytics). You pick ONE article topic per run that would genuinely help a founder and has real SEO potential for this specific agency's site. Service areas to draw from: ${categories}. Prefer a narrow, concrete how-to angle ("how to set up X for Y") over a broad trend piece ("the future of X") — narrow topics are easier to make genuinely specific and useful, which is exactly what gets rejected in review when it's missing.

Return JSON: { "title": string, "targetQuery": string, "rationale": string (2-3 sentences on why this topic and why DT can write it well), "score": number 0-100 }.`,
    `Already-published titles (do NOT repeat these or anything nearly identical):\n${existingTitles.map((t) => `- ${t}`).join('\n') || '(none yet)'}${steerBlock}`
  );

  if (!result.title || !result.targetQuery) return null;
  return {
    title: String(result.title),
    targetQuery: String(result.targetQuery),
    rationale: String(result.rationale || ''),
    score: typeof result.score === 'number' ? result.score : 70,
  };
}

// Sections are written in parallel, so no section can know which links the
// others used — telling the model "don't repeat a URL" cannot work across
// independent calls (confirmed: one article linked the same post 3 times).
// Keep the first occurrence of each URL, unwrap the rest to plain text.
function dedupeLinks(html: string): string {
  const seen = new Set<string>();
  return html.replace(/<a\s+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi, (match, url: string, text: string) => {
    if (seen.has(url)) return text;
    seen.add(url);
    return match;
  });
}

// Voice rules shared by the outline and every section writer, so a section
// written in isolation still sounds like the rest of the article.
const VOICE_RULES = `Voice: direct, specific, no fluff, no AI tells. Banned phrases and their pattern (these exact ones and anything in the same register have failed review before — do not use them or near-variants): "in today's fast-paced world", "unlock the power of", "leverage AI", "reveals insights", "use AI to analyze", "utilize machine learning models", "use platforms like", "remember, the goal is". Instead of "use AI to analyze X", name the exact metric and threshold. Instead of "utilize machine learning models", name the actual model type or vendor feature. Never open a section by restating its own heading.

REAL client results you may cite if genuinely relevant — use these exact numbers, never alter them, never invent a client, campaign, or stat that isn't in this list:
${REAL_PROOF_POINTS}

A citation must match what that client's result actually demonstrates — never reuse a real number for a different cause than what drove it (real failure caught in testing: attributing Portronics' ROAS numbers, which came from an AI creative engine, to "dynamic pricing"). If none fit this article's exact mechanism, cite NONE — zero citations always beats one attached to the wrong cause.`;

type Outline = {
  sections: { heading: string; covers: string; wordTarget: number }[];
  faqs: { question: string; answerHint: string }[];
  category: string | null;
  excerpt: string;
  whyItWillRank: string;
  directAnswer: string;
};

// Stage 1: plan the article. Cheap call, and it's what makes the parallel
// section writes coherent instead of six essays that repeat each other.
async function planOutline(
  openai: OpenAI,
  concept: { title: string; targetQuery: string; rationale: string },
  feedback?: string[]
): Promise<Outline | null> {
  const categories = BLOG_CATEGORIES.map((c) => c.slug).join(', ');
  const feedbackBlock = feedback?.length
    ? `\n\nA previous version FAILED review for these reasons — fix each directly in this plan:\n${feedback.map((f) => `- ${f}`).join('\n')}`
    : '';

  const result = await jsonCompletion(
    openai,
    `You plan long-form SEO articles for Digital Triangle, a growth marketing agency. ${VOICE_RULES}

Plan an article of ${TARGET_WORDS} words. Modern SEO + AI-search (AEO/GEO) requirements you are planning for:
- A "directAnswer": 40-60 words that answer the target query directly and completely, in plain declarative sentences. This is what an AI search engine will quote, so it must stand alone without the surrounding article.
- 7 to 9 H2 sections. Headings must be specific and scannable; phrase them as the question a reader would actually search where that reads naturally.
- Sections must not overlap — each covers something genuinely distinct. Give each a wordTarget between 200 and 320 that sums to roughly ${TARGET_WORDS}.
- At least one section is a worked example (starting situation, exact steps, specific thresholds, what to check after).
- At least one section covers measurement, naming real metrics.
- 4 to 6 FAQs at the end targeting real long-tail questions — these earn featured snippets and AI citations.

Return JSON: { "directAnswer": string, "sections": [{ "heading": string, "covers": string (2-3 sentences briefing the writer on exactly what this section must contain, including which specifics/tools/numbers to use), "wordTarget": number }], "faqs": [{ "question": string, "answerHint": string }], "category": string (one of: ${categories}), "excerpt": string (1-2 sentences), "whyItWillRank": string (2-3 sentences on the specific gap this fills) }.`,
    `Title: ${concept.title}\nTarget query: ${concept.targetQuery}\nWhy this topic: ${concept.rationale}${feedbackBlock}`,
    2500
  );

  if (!Array.isArray(result.sections) || result.sections.length === 0) return null;
  return {
    sections: result.sections
      .filter((s: { heading?: string }) => s?.heading)
      .map((s: { heading: string; covers?: string; wordTarget?: number }) => ({
        heading: String(s.heading),
        covers: String(s.covers || ''),
        wordTarget: Math.min(400, Math.max(180, Number(s.wordTarget) || 260)),
      })),
    faqs: Array.isArray(result.faqs)
      ? result.faqs
          .filter((f: { question?: string }) => f?.question)
          .map((f: { question: string; answerHint?: string }) => ({
            question: String(f.question),
            answerHint: String(f.answerHint || ''),
          }))
      : [],
    category: BLOG_CATEGORIES.some((c) => c.slug === result.category) ? String(result.category) : null,
    excerpt: String(result.excerpt || ''),
    whyItWillRank: String(result.whyItWillRank || ''),
    directAnswer: String(result.directAnswer || ''),
  };
}

// Stage 2: write one section. Small, focused calls — this is why the word
// count actually lands, where a single "write 2000 words" call did not.
async function writeSection(
  openai: OpenAI,
  concept: { title: string; targetQuery: string },
  section: { heading: string; covers: string; wordTarget: number },
  links: LinkTarget[],
  linkBudget: number
): Promise<string> {
  const linkBlock = linkBudget
    ? `\n\nInternal links: weave in ${linkBudget} of these, inline in a sentence where genuinely relevant, as <a href="URL">natural anchor text</a>. Never link the same URL twice, never say "click here", and never force a link that doesn't fit — returning fewer is fine.\n${links
        .map((l) => `- ${l.url} — ${l.label}`)
        .join('\n')}`
    : '';

  const result = await jsonCompletion(
    openai,
    `You write one section of a long-form article for Digital Triangle, a growth marketing agency. ${VOICE_RULES}

Write ONLY this section's body — no <h2>, that is added for you. ${section.wordTarget} words, and hitting that length matters. Use <p> paragraphs of 3+ sentences; add a <ul> with substantive full-sentence items only where a list genuinely helps. Include at least one hard specific: an exact tool name, a threshold, a formula, a setting, or a step sequence.${linkBlock}

Return JSON: { "html": string }.`,
    `Article: ${concept.title}\nTarget query: ${concept.targetQuery}\n\nThis section's heading: ${section.heading}\nWhat it must cover: ${section.covers}`,
    1400
  );

  return typeof result.html === 'string' ? result.html : '';
}

async function writeFaqs(
  openai: OpenAI,
  concept: { title: string },
  faqs: { question: string; answerHint: string }[]
): Promise<string> {
  if (!faqs.length) return '';
  const result = await jsonCompletion(
    openai,
    `You write the FAQ section of an article for Digital Triangle. ${VOICE_RULES}

Answer each question in 40-70 words — direct, complete, and quotable on its own (AI search engines lift these verbatim). Lead with the answer, then the why. Return JSON: { "html": string } containing, for each FAQ, an <h3> with the question followed by <p> with the answer. No wrapper heading.`,
    `Article: ${concept.title}\n\n${faqs.map((f) => `Q: ${f.question}\nAngle: ${f.answerHint}`).join('\n\n')}`,
    1600
  );
  return typeof result.html === 'string' ? result.html : '';
}

// Stage 3: assemble. Sections are written in parallel, then stitched in the
// planned order so the article reads top-to-bottom as one piece.
async function draft(
  openai: OpenAI,
  concept: { title: string; targetQuery: string; rationale: string },
  links: LinkTarget[],
  feedback?: string[]
) {
  const outline = await planOutline(openai, concept, feedback);
  if (!outline) return null;

  // Spread the internal links across the middle sections — not the opener
  // (readers bounce) and not every section (reads spammy to both people and
  // Google). Roughly 4-6 links across a 2000-word piece.
  const linkBudgets = outline.sections.map((_, i) =>
    i === 0 || i === outline.sections.length - 1 ? 0 : i % 2 === 1 ? 2 : 1
  );

  const bodies = await Promise.all(
    outline.sections.map((s, i) => writeSection(openai, concept, s, links, linkBudgets[i]))
  );
  const faqHtml = await writeFaqs(openai, concept, outline.faqs);

  const parts: string[] = [];
  if (outline.directAnswer) parts.push(`<p><strong>${outline.directAnswer}</strong></p>`);
  outline.sections.forEach((s, i) => {
    if (!bodies[i]?.trim()) return;
    parts.push(`<h2>${s.heading}</h2>`, bodies[i]);
  });
  if (faqHtml.trim()) parts.push('<h2>Frequently asked questions</h2>', faqHtml);

  return {
    excerpt: outline.excerpt,
    content: dedupeLinks(sanitizeHtml(parts.join('\n'))),
    category: outline.category,
    whyItWillRank: outline.whyItWillRank,
  };
}

async function selfVerify(
  openai: OpenAI,
  input: {
    title: string;
    content: string;
    targetQuery: string;
    existingTitles: string[];
  }
): Promise<QaReport> {
  const result = await jsonCompletion(
    openai,
    `You are the final gate before a draft reaches a human editor who will still review and edit it themselves.

YOUR JOB: decide "is this publishable as a solid draft?" — NOT "is this perfect?" and NOT "could this be better?". Every piece of writing could be deeper, more specific, or more novel; that is never grounds to fail. Fail ONLY on a concrete, nameable defect. If you cannot quote the exact offending text from the draft, it is a PASS.

Return JSON: { "passed": boolean, "checks": [{ "name": string, "passed": boolean, "note": string }] } with exactly these six checks. "passed" at top level is true only if all six pass. For any FAIL, the note MUST quote the specific offending text — a note like "could be more in-depth" or "may not offer novel insights" is not a valid failure, mark it PASS instead.

Pass/fail thresholds — apply these literally:
- "fact-check": FAIL only if you can name a specific fabricated claim. See the verified-results rule below. Lacking external citations/sources is NOT a fail — this is a practitioner blog, not an academic paper.
- "originality": compares against Digital Triangle's OWN existing titles listed below only. FAIL only if it substantially duplicates one of those. A title matching the target search query is CORRECT SEO practice, never an originality failure. Topics existing elsewhere on the internet is NOT a fail.
- "seo": PASS if the title and at least one heading address the target query. Do not fail for hypothetical extra optimizations.
- "brand-voice": FAIL only if you can quote an actual AI-tell/filler phrase. Ordinary plain professional prose is a PASS.
- "no-cannibalization": FAIL only if an existing DT title listed below targets essentially the same search intent.
- "usefulness": PASS if the draft contains at least three concrete specifics a reader could act on — a named tool, an exact metric or threshold, a formula, a step sequence, or a worked example. Count them. If there are three or more, it PASSES even if you personally find it introductory. FAIL only if it is genuinely vague throughout.

fact-check detail: this is the ONLY list of pre-verified real Digital Triangle client results. A number/client from this exact list, cited accurately, is a PASS — do not fail it for lacking a source, this IS the source:
${REAL_PROOF_POINTS}
Any other client name, company, or statistic NOT in that list is an invented claim and a hard FAIL — including real companies that aren't Digital Triangle clients. Generic, non-attributed industry statements ("cart abandonment is a common problem") are fine and not fabrication.`,
    `Target query: ${input.targetQuery}\nExisting titles:\n${input.existingTitles.map((t) => `- ${t}`).join('\n') || '(none yet)'}\n\nDraft title: ${input.title}\nDraft content:\n${input.content}`
  );

  return {
    passed: Boolean(result.passed),
    checks: Array.isArray(result.checks) ? result.checks : [],
  };
}

// Blog posts + evergreen service pages the writer can link to. Published only —
// linking to an unpublished draft would 404.
async function getLinkTargets(): Promise<LinkTarget[]> {
  const posts = await prisma.post.findMany({
    where: { status: 'PUBLISHED' },
    select: { title: true, slug: true },
    orderBy: { publishedAt: 'desc' },
    take: 30,
  });
  return [...posts.map((p) => ({ url: `/blog/${p.slug}`, label: p.title })), ...SERVICE_PAGES];
}

// Cover image. Deliberately best-effort: a failed image must never block a
// finished article, so every failure path returns null and the draft ships
// without one (the editor can still add a cover by hand).
async function generateCoverImage(openai: OpenAI, title: string, slug: string): Promise<string | null> {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseKey) return null;

  try {
    const img = await openai.images.generate({
      model: 'gpt-image-1',
      // No text in the image — generators still mangle lettering, and a
      // misspelt word on a hero image is worse than no image.
      prompt: `Editorial hero illustration for a B2B growth-marketing article titled "${title}". Abstract, modern, geometric — data flows, nodes, gradient light. Deep near-black background (#07070a) with electric blue (#4b6bff), violet (#8b5cf6) and magenta (#c026d3) accents. No text, no words, no letters, no logos, no people, no charts with labels. Clean, premium, lots of negative space.`,
      size: '1536x1024',
    });

    const b64 = img.data?.[0]?.b64_json;
    if (!b64) return null;

    const path = `ai-${slug.slice(0, 40)}-${Date.now()}.png`;
    const res = await fetch(`${supabaseUrl}/storage/v1/object/blog-images/${path}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${supabaseKey}`,
        apikey: supabaseKey,
        'Content-Type': 'image/png',
        'x-upsert': 'true',
      },
      body: Buffer.from(b64, 'base64'),
    });
    if (!res.ok) {
      console.warn('content-engine: cover image upload failed', res.status, (await res.text()).slice(0, 200));
      return null;
    }
    return `${supabaseUrl}/storage/v1/object/public/blog-images/${path}`;
  } catch (err) {
    console.warn('content-engine: cover image generation failed', err instanceof Error ? err.message : err);
    return null;
  }
}

export type RunResult =
  | { ok: true; draftId: string; passed: true }
  | { ok: true; passed: false; reason: string }
  | { ok: false; error: string };

// One full nightly cycle, run synchronously for the P1 manual trigger.
// Discards after 7 failed revise attempts (each fed the prior failure's exact
// reasons, a real revise loop, not blind re-rolling) — a failed draft is never
// queued, matching the spec ("you never see anything unverified"). 7 is a
// judgment call from real testing: single-shot passes were rare, and each
// revise attempt targets a genuinely different, real gap rather than
// looping on the same complaint — worth the extra OpenAI calls to convert a
// close draft into a queueable one instead of discarding it.
export async function runPipeline(): Promise<RunResult> {
  const openai = getClient();
  if (!openai) return { ok: false, error: 'OPENAI_API_KEY not configured' };

  const existingPosts = await prisma.post.findMany({ select: { title: true }, orderBy: { createdAt: 'desc' }, take: 100 });
  const existingTitles = existingPosts.map((p) => p.title);

  // Oldest requested topic first; falls back to self-ideation when empty.
  // Atomic claim: findFirst-then-update let two concurrent "Run now" clicks
  // grab the same topic. A run is now ~10 OpenAI calls, so duplicated work is
  // real money — the conditional updateMany means only one caller wins.
  const candidate = await prisma.contentTopic.findFirst({
    where: { status: 'PENDING' },
    orderBy: { createdAt: 'asc' },
  });
  let steer: typeof candidate = null;
  if (candidate) {
    const claim = await prisma.contentTopic.updateMany({
      where: { id: candidate.id, status: 'PENDING' },
      data: { status: 'CLAIMED' },
    });
    if (claim.count === 1) steer = candidate;
  }
  // Any exit from here on must release the claim, or the topic is stranded.
  const releaseTopic = async () => {
    if (steer) await prisma.contentTopic.updateMany({ where: { id: steer.id, status: 'CLAIMED' }, data: { status: 'PENDING' } });
  };

  const links = await getLinkTargets();

  const concept = await ideate(openai, existingTitles, steer ? { topic: steer.topic, notes: steer.notes } : undefined);
  if (!concept) {
    await releaseTopic();
    return { ok: false, error: 'Ideation failed to produce a concept' };
  }

  const conceptRow = await prisma.contentConcept.create({
    data: { title: concept.title, targetQuery: concept.targetQuery, rationale: concept.rationale, score: concept.score },
  });

  let feedback: string[] | undefined;
  let lastFailure = 'self-verification';
  // Was 7. Each attempt is now an outline + ~8 parallel section writes + a
  // verify, so a failing run costs real money — and the sectioned writer is
  // far more likely to land on the first pass anyway.
  for (let attempt = 0; attempt < 3; attempt++) {
    const drafted = await draft(openai, concept, links, feedback);
    if (!drafted) {
      await prisma.contentConcept.update({ where: { id: conceptRow.id }, data: { status: 'DISCARDED' } });
      await releaseTopic();
      return { ok: false, error: 'Drafting failed' };
    }

    // Deterministic length floor before spending a verify call — the LLM gate
    // has no length check, and counting words is code's job, not a model's.
    const wordCount = drafted.content.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
    if (wordCount < MIN_WORDS) {
      feedback = [
        `length: the draft was only ${wordCount} words. It must be at least ${MIN_WORDS} (target ${TARGET_WORDS}). Plan more sections and raise each section's wordTarget — add genuinely new substance, not restatement.`,
      ];
      console.warn(`content-engine: too short (${wordCount}w) for "${concept.title}" (attempt ${attempt + 1})`);
      lastFailure = `the length floor (last draft was ${wordCount} words, minimum ${MIN_WORDS})`;
      continue;
    }

    const qa = await selfVerify(openai, {
      title: concept.title,
      content: drafted.content,
      targetQuery: concept.targetQuery,
      existingTitles,
    });

    if (qa.passed) {
      const baseSlug = slugify(concept.title);
      let slug = baseSlug;
      let n = 1;
      while (await prisma.contentDraft.findUnique({ where: { slug } })) slug = `${baseSlug}-${++n}`;

      // Best-effort — a null here just means the editor adds a cover manually.
      const coverImage = await generateCoverImage(openai, concept.title, slug);

      const draftRow = await prisma.contentDraft.create({
        data: {
          conceptId: conceptRow.id,
          title: concept.title,
          slug,
          excerpt: drafted.excerpt,
          content: drafted.content,
          category: drafted.category,
          coverImage,
          targetQuery: concept.targetQuery,
          whyItWillRank: drafted.whyItWillRank,
          qaReport: JSON.stringify(qa),
        },
      });
      await prisma.contentConcept.update({ where: { id: conceptRow.id }, data: { status: 'DRAFTED' } });
      // Only consume the requested topic once something actually reached the
      // queue — a discarded run must not silently burn a topic Harsh asked for.
      if (steer) await prisma.contentTopic.update({ where: { id: steer.id }, data: { status: 'USED' } });
      return { ok: true, draftId: draftRow.id, passed: true };
    }
    feedback = qa.checks.filter((c) => !c.passed).map((c) => `${c.name}: ${c.note}`);
    lastFailure = `self-verification (${feedback.map((f) => f.split(':')[0]).join(', ') || 'unspecified'})`;
    // Log why a self-verify failure was discarded — it never reaches a human,
    // so this is the only visibility into whether the gate is well-calibrated.
    console.warn(`content-engine: QA failed for "${concept.title}" (attempt ${attempt + 1}):`, feedback);
    // next attempt gets this exact feedback, so it's a real revise, not a re-roll
  }

  await prisma.contentConcept.update({ where: { id: conceptRow.id }, data: { status: 'DISCARDED' } });
  await releaseTopic();
  return {
    ok: true,
    passed: false,
    reason: steer
      ? `"${concept.title}" failed 3 times on ${lastFailure} — discarded. Your topic "${steer.topic}" is still queued and will be retried on the next run.`
      : `"${concept.title}" failed 3 times on ${lastFailure} — discarded, nothing queued.`,
  };
}
