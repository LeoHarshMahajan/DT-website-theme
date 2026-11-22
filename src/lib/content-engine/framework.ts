// The Content Engine's editorial framework: the single source for voice
// rules, banned language, structure and the publish bar. Prompts import
// these strings and the deterministic linter enforces the same lists, so
// what we tell the model and what we check can't drift apart.
// Human-readable version: docs/content-framework.md.

import { CASES } from '@/app/(main)/case-studies/page';

// Length follows depth, not a fixed number (Harsh, 22 Nov 2026: 4,500-word
// skyscrapers are welcome when every section earns its place). The planner
// picks a depth per topic; padding is policed by the editor review's "depth"
// check and the per-section overshoot lint, not by a low ceiling.
export const DEPTHS = {
  standard: { sections: '7-9', words: '1,800-2,400', sectionWords: [200, 320] },
  skyscraper: { sections: '10-14', words: '3,500-4,800', sectionWords: [260, 450] },
} as const;
export const MIN_WORDS = 1700;
export const MAX_WORDS = 5200;
// One internal link per ~350 words, within these bounds.
export const linkCap = (words: number) => Math.max(4, Math.min(10, Math.round(words / 350)));
export const MIN_SOURCES = 4; // distinct external domains actually cited in the body
export const MIN_INTERNAL_LINKS = 3;

// Phrases that mark text as machine-written or agency filler. Matched
// case-insensitively on word boundaries by lint(); any hit sends the section
// back for a rewrite.
export const BANNED_PHRASES = [
  "in today's", 'fast-paced', 'digital landscape', 'ever-evolving', 'ever-changing',
  'unlock', 'unleash', 'elevate', 'delve', 'dive into', 'deep dive', 'game-changer',
  'game changer', 'leverage', 'seamless', 'cutting-edge', 'robust', 'harness',
  'navigate the', 'realm', 'tapestry', "it's important to note", 'it is important to note',
  'in conclusion', 'furthermore', 'moreover', 'embark', 'revolutionize', 'revolutionise',
  'synergy', 'holistic', 'supercharge', 'skyrocket', 'look no further', "whether you're",
  'whether you are', 'in the world of', 'when it comes to', 'at the end of the day',
  'plays a crucial role', 'plays a vital role', 'a testament to', 'paramount', 'myriad',
  'empower', 'transformative', 'unprecedented',
];

// Real, published client results: the only first-party numbers an article may
// use. Everything else must come from a cited research source.
export const REAL_PROOF_POINTS = CASES.map(
  (c) => `${c.name} (${c.industry}): ${c.headline}: ${c.metrics.map((m) => `${m.value} ${m.label}`).join(', ')}`
).join('\n');

export const VOICE_RULES = `VOICE (non-negotiable):
- Write like a senior practitioner at an Indian growth agency explaining their playbook to a founder over coffee: first-person plural ("we", "our team"), opinionated where the evidence supports it, plain words.
- Specific beats general, every time. Name the actual tool, setting, metric, threshold, platform or Indian example (Meta Ads Manager, GA4 explorations, Shopify, Shiprocket, Razorpay, WhatsApp Business API, Nykaa, Flipkart, etc.) rather than a category.
- Indian context by default: rupees (₹), Indian buyer behaviour, Indian platforms and regulations where relevant.
- Vary sentence length. Mix a short punchy line with a longer explanatory one. No paragraph longer than 4 sentences.
- At most one em dash per section. Use commas, full stops or brackets instead.
- Never open a section by restating its heading. Never end with a summary line that repeats what was just said.
- Banned words and phrases (and anything in the same register): ${BANNED_PHRASES.map((p) => `"${p}"`).join(', ')}.`;

export const EVIDENCE_RULES = `EVIDENCE (hard rules, checked by code after you write):
- Every statistic, percentage, ₹/$ amount or multiplier you state MUST come from the facts provided to you, quoted exactly, OR from Digital Triangle's verified client results below. If you don't have a number for something, make the point without a number.
- When you use a researched fact, cite it inline in the same sentence as <a href="SOURCE_URL">Publisher name</a>, using the exact URL given. Never invent a URL. Never cite a source for a claim it doesn't support.
- Digital Triangle client results you may cite (exact numbers only, and only where the mechanism genuinely matches the article's point, otherwise cite none):
${REAL_PROOF_POINTS}`;

export const STRUCTURE_RULES = `STRUCTURE (SEO + AEO/GEO):
- A 40-60 word direct answer to the target query, quotable on its own by AI search engines.
- 4-5 key takeaways, one line each, each a concrete claim rather than a teaser.
- H2 sections (count set by the chosen depth), each covering something distinct. Phrase headings as the question a reader would search where that reads naturally.
- At least one worked example (starting situation, exact steps, thresholds, what to check after) and one section on measurement with named metrics.
- 4-6 FAQs answered in 40-70 words each, lead with the answer.
- Internal links woven into sentences with natural anchor text; never "click here".`;
