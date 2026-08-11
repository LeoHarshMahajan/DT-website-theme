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

// Floor, not the target — the brief asks for 600-900. Anything under this is
// too thin to rank and gets sent back for expansion.
const MIN_WORDS = 550;

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
  existingTitles: string[],
  steer?: { topic: string; notes: string | null }
): Promise<{ title: string; targetQuery: string; rationale: string; score: number } | null> {
  const openai = getClient();
  if (!openai) return null;

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

async function draft(concept: { title: string; targetQuery: string; rationale: string }, feedback?: string[]) {
  const openai = getClient();
  if (!openai) return null;

  const categories = BLOG_CATEGORIES.map((c) => c.slug).join(', ');
  const feedbackBlock = feedback?.length
    ? `\n\nA previous draft of this exact topic FAILED review for these specific reasons — fix each one directly, don't just rewrite generically:\n${feedback.map((f) => `- ${f}`).join('\n')}`
    : '';
  const result = await jsonCompletion(
    openai,
    `You write blog articles for Digital Triangle, a growth marketing agency. Voice: direct, specific, no fluff, no AI tells. Banned phrases and their pattern (these exact ones and anything in the same register have failed review before — do not use them or near-variants): "in today's fast-paced world", "unlock the power of", "leverage AI", "reveals insights", "use AI to analyze", "utilize machine learning models", "use platforms like", "remember, the goal is". Instead of "use AI to analyze X", name the exact metric and threshold. Instead of "utilize machine learning models", name the actual model type or vendor feature. Every section must include a concrete, actionable specific: an exact tactic, a step-by-step setup, a real tool/platform name, a formula, or a worked example. Write clean semantic HTML (h2/h3/p/ul/li, no h1 — the title is separate).

REAL client results you may cite if genuinely relevant to this topic — use these exact numbers, never alter them, never invent a client, campaign, or stat that isn't in this list:
${REAL_PROOF_POINTS}

A citation must match what that client's result actually demonstrates — do not reuse a real number for a different cause than what actually drove it (real failure caught in testing: attributing Portronics' ROAS/revenue numbers, which came from an AI creative engine + retargeting, to "dynamic pricing" — Portronics has no pricing case study, so that number cannot appear in a pricing article at all). If none of the results above were driven by the exact mechanism this article is about, cite NONE of them — write zero client examples and explain the mechanism in enough concrete detail that it doesn't need a number to feel real. Zero citations is always safer than one attached to the wrong cause.

Pick the single best category slug from: ${categories}.

REQUIRED STRUCTURE — this is not a suggestion, drafts that miss it are auto-rejected. The body must contain:
- An opening paragraph (2-3 sentences) framing the specific problem.
- EXACTLY 5 to 6 <h2> sections. Each <h2> section must have at least two full <p> paragraphs of 3+ sentences each, OR one paragraph plus a <ul> of 3+ substantive items (a full sentence each, not two-word fragments).
- At least one section must walk through a worked example end to end: the starting situation, the exact steps taken, the specific settings/thresholds used, and what to look at afterwards.
- A short closing section on how to measure whether it worked, naming the actual metrics.
That structure lands around 700-900 words. A draft under ${MIN_WORDS} words is rejected automatically before review, so write the full thing — do not summarise or cut sections short.

Return JSON: { "excerpt": string (1-2 sentences), "content": string (HTML body, 700-900 words following the structure above), "category": string (one slug from the list), "whyItWillRank": string (2-3 sentences on the specific gap this fills) }.`,
    `Title: ${concept.title}\nTarget query: ${concept.targetQuery}\nWhy this topic: ${concept.rationale}${feedbackBlock}`,
    3000
  );

  if (!result.content) return null;
  return {
    excerpt: String(result.excerpt || ''),
    content: String(result.content),
    category: BLOG_CATEGORIES.some((c) => c.slug === result.category) ? String(result.category) : null,
    whyItWillRank: String(result.whyItWillRank || ''),
  };
}

async function selfVerify(input: {
  title: string;
  content: string;
  targetQuery: string;
  existingTitles: string[];
}): Promise<QaReport> {
  const openai = getClient();
  if (!openai) return { passed: false, checks: [{ name: 'openai', passed: false, note: 'Not configured' }] };

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
  const steer = await prisma.contentTopic.findFirst({
    where: { status: 'PENDING' },
    orderBy: { createdAt: 'asc' },
  });

  const concept = await ideate(existingTitles, steer ? { topic: steer.topic, notes: steer.notes } : undefined);
  if (!concept) return { ok: false, error: 'Ideation failed to produce a concept' };

  const conceptRow = await prisma.contentConcept.create({
    data: { title: concept.title, targetQuery: concept.targetQuery, rationale: concept.rationale, score: concept.score },
  });

  let feedback: string[] | undefined;
  for (let attempt = 0; attempt < 7; attempt++) {
    const drafted = await draft(concept, feedback);
    if (!drafted) {
      await prisma.contentConcept.update({ where: { id: conceptRow.id }, data: { status: 'DISCARDED' } });
      return { ok: false, error: 'Drafting failed' };
    }

    // Deterministic length floor before spending a verify call. The model
    // routinely returns ~370 words against a 600-900 brief, and the LLM gate
    // never flags it because length isn't one of its six checks. Cheap code
    // check beats asking a model to count.
    const wordCount = drafted.content.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
    if (wordCount < MIN_WORDS) {
      feedback = [
        `length: the draft was only ${wordCount} words. It must be at least ${MIN_WORDS} (target 600-900). Expand with more concrete detail — extra steps, a worked example, specific thresholds — not filler or restatement.`,
      ];
      console.warn(`content-engine: too short (${wordCount}w) for "${concept.title}" (attempt ${attempt + 1})`);
      continue;
    }

    const qa = await selfVerify({
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

      const draftRow = await prisma.contentDraft.create({
        data: {
          conceptId: conceptRow.id,
          title: concept.title,
          slug,
          excerpt: drafted.excerpt,
          content: drafted.content,
          category: drafted.category,
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
    // Log why a self-verify failure was discarded — it never reaches a human,
    // so this is the only visibility into whether the gate is well-calibrated.
    console.warn(`content-engine: QA failed for "${concept.title}" (attempt ${attempt + 1}):`, feedback);
    // next attempt gets this exact feedback, so it's a real revise, not a re-roll
  }

  await prisma.contentConcept.update({ where: { id: conceptRow.id }, data: { status: 'DISCARDED' } });
  return {
    ok: true,
    passed: false,
    reason: steer
      ? `"${concept.title}" failed self-verification 7 times — discarded. Your topic "${steer.topic}" is still queued and will be retried on the next run.`
      : 'Failed self-verification 7 times — discarded, nothing queued.',
  };
}
