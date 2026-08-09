import OpenAI from 'openai';
import { prisma } from '@/lib/db/prisma';
import { BLOG_CATEGORIES } from '@/lib/constants';

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

async function jsonCompletion(openai: OpenAI, system: string, user: string) {
  const res = await openai.chat.completions.create({
    model: MODEL,
    messages: [
      { role: 'system', content: system },
      { role: 'user', content: user },
    ],
    response_format: { type: 'json_object' },
  });
  return JSON.parse(res.choices[0].message.content || '{}');
}

async function ideate(existingTitles: string[]): Promise<{ title: string; targetQuery: string; rationale: string; score: number } | null> {
  const openai = getClient();
  if (!openai) return null;

  const categories = BLOG_CATEGORIES.map((c) => c.label).join(', ');
  const result = await jsonCompletion(
    openai,
    `You are the content strategist for Digital Triangle, a growth marketing agency (D2C, AI marketing, SEO, paid ads, retention, analytics). You pick ONE article topic per run that would genuinely help a founder and has real SEO potential for this specific agency's site. Service areas to draw from: ${categories}. Prefer a narrow, concrete how-to angle ("how to set up X for Y") over a broad trend piece ("the future of X") — narrow topics are easier to make genuinely specific and useful, which is exactly what gets rejected in review when it's missing.

Return JSON: { "title": string, "targetQuery": string, "rationale": string (2-3 sentences on why this topic and why DT can write it well), "score": number 0-100 }.`,
    `Already-published titles (do NOT repeat these or anything nearly identical):\n${existingTitles.map((t) => `- ${t}`).join('\n') || '(none yet)'}\n\nPropose the single best next topic.`
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
    `You write blog articles for Digital Triangle, a growth marketing agency. Voice: direct, specific, no fluff, no AI tells ("in today's fast-paced world", "unlock the power of"), no invented statistics or client results — if you don't have a real number, describe the mechanism instead of faking a figure. Every section must include a concrete, actionable specific: an exact tactic, a step-by-step setup, a real tool/platform name, a formula, or a worked example — never a vague claim like "leverage AI" or "reveals insights" without saying exactly what to do or how it works mechanically. Write clean semantic HTML (h2/h3/p/ul/li, no h1 — the title is separate).

Pick the single best category slug from: ${categories}.

Return JSON: { "excerpt": string (1-2 sentences), "content": string (HTML body, 600-900 words), "category": string (one slug from the list), "whyItWillRank": string (2-3 sentences on the specific gap this fills) }.`,
    `Title: ${concept.title}\nTarget query: ${concept.targetQuery}\nWhy this topic: ${concept.rationale}${feedbackBlock}`
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
    `You are a strict editor reviewing a draft before it can ever reach a human for approval. Check every item honestly — if you are not sure a claim is true, that is a fact-check FAIL, not a pass. Return JSON: { "passed": boolean, "checks": [{ "name": string, "passed": boolean, "note": string }] } covering exactly these six checks: "fact-check" (no invented/unverifiable stats or claims), "originality" (not a near-duplicate of the existing titles given), "seo" (title/heading structure covers the target query), "brand-voice" (no AI-tell phrases, no fluff), "no-cannibalization" (doesn't fight an existing title for the same query), "usefulness" (a real founder would learn something, not filler). "passed" at the top level is true only if ALL six checks pass.`,
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
// Discards after 4 failed revise attempts (each fed the prior failure's exact
// reasons, a real revise loop, not blind re-rolling) — a failed draft is never
// queued, matching the spec ("you never see anything unverified").
export async function runPipeline(): Promise<RunResult> {
  const openai = getClient();
  if (!openai) return { ok: false, error: 'OPENAI_API_KEY not configured' };

  const existingPosts = await prisma.post.findMany({ select: { title: true }, orderBy: { createdAt: 'desc' }, take: 100 });
  const existingTitles = existingPosts.map((p) => p.title);

  const concept = await ideate(existingTitles);
  if (!concept) return { ok: false, error: 'Ideation failed to produce a concept' };

  const conceptRow = await prisma.contentConcept.create({
    data: { title: concept.title, targetQuery: concept.targetQuery, rationale: concept.rationale, score: concept.score },
  });

  let feedback: string[] | undefined;
  for (let attempt = 0; attempt < 4; attempt++) {
    const drafted = await draft(concept, feedback);
    if (!drafted) {
      await prisma.contentConcept.update({ where: { id: conceptRow.id }, data: { status: 'DISCARDED' } });
      return { ok: false, error: 'Drafting failed' };
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
      return { ok: true, draftId: draftRow.id, passed: true };
    }
    feedback = qa.checks.filter((c) => !c.passed).map((c) => `${c.name}: ${c.note}`);
    // Log why a self-verify failure was discarded — it never reaches a human,
    // so this is the only visibility into whether the gate is well-calibrated.
    console.warn(`content-engine: QA failed for "${concept.title}" (attempt ${attempt + 1}):`, feedback);
    // next attempt gets this exact feedback, so it's a real revise, not a re-roll
  }

  await prisma.contentConcept.update({ where: { id: conceptRow.id }, data: { status: 'DISCARDED' } });
  return { ok: true, passed: false, reason: 'Failed self-verification 4 times — discarded, nothing queued.' };
}
