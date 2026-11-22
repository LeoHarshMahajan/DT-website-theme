# Digital Triangle content framework

How the Content Engine (Admin, Content Queue) researches, writes and checks every article.
The enforceable rules live in code, in `src/lib/content-engine/framework.ts`. The prompts and the
automatic checks both read from that file, so this page describes them but does not override them.

## 1. Topic
- Your topics list wins. The oldest topic you added is written first, and the engine only picks its
  own topic when the list is empty.
- It aims for one specific, commercially useful query a founder in India would search, never a broad
  trend piece. It never repeats or overlaps an existing post title.

## 2. Research (live web)
- GPT-5.5 searches the live web, preferring Indian and primary sources: platform docs (Google, Meta,
  Shopify), regulators (RBI, MeitY, TRAI, CBIC), research firms and major business press. It never
  takes statistics from competitor agencies' blogs.
- It collects 10-16 facts, each with its exact source URL, publisher and date. It also records what
  people ask, what today's top results miss, and the angle that would beat them.
- **Every source URL is checked by code.** A dead link (404, 410, DNS failure) is dropped. A page that
  only blocks bots (401, 403, 429) is kept. If fewer than 4 distinct sites survive, the run stops
  rather than writing a thin article.

## 3. Structure (SEO + AEO/GEO)
- A 40-60 word direct answer at the top that AI search engines can quote as-is.
- 4-5 one-line key takeaways.
- **Depth is chosen per topic.** "Standard": 7-9 H2 sections, about 1,800-2,400 words, for focused
  how-to queries. "Skyscraper": 10-14 sections, about 3,500-4,800 words, for broad or competitive
  queries where the top results are long guides. Length must come from substance: every section
  needs a framework, worked example, benchmark, setup step or decision rule a buyer can use.
- H2 headings are phrased as real questions where natural. Every article includes at least one
  worked example and one section on measurement.
- 4-6 FAQs of 40-70 words each, answer first.
- Internal links at roughly one per 350 words (never fewer than 3, never more than 10), chosen for
  relevance to a specific section and never placed in the opening.
- A Sources list at the end, built from the sources actually cited.
- Anchors on every H2. The blog page builds the "On this page" table of contents, reading time and
  author box from them.

## 4. Voice
- A senior practitioner at an Indian growth agency talking to a founder: "we", specific and
  opinionated, plain words.
- Name the actual tool, setting, metric, threshold or Indian example rather than a category. Use ₹
  and Indian platforms by default.
- Vary sentence length, keep paragraphs to 4 sentences or fewer, and use at most one em dash per
  section.
- Banned phrases (the full list is in `framework.ts`) include "in today's", "unlock", "elevate",
  "delve", "leverage", "seamless", "game-changer", "furthermore" and "in conclusion".

## 5. Evidence (checked by code, not trusted to the model)
- Every percentage, ₹/$ amount, multiplier or large count has to appear in that section's cited
  facts or in DT's verified case-study results. Any other number counts as invented.
- Facts are cited inline in the same sentence, linked to their source URL.
- A link to any URL the engine didn't supply is stripped before saving.
- When a section breaks any of these rules, it is sent back once with the exact problems listed.

## 6. Publish bar
**Automatic checks (all must pass):**
- between 1,700 and 5,200 words;
- at least 4 distinct cited source sites;
- 3 or more internal links, within the cap for the article's length, all pointing to real pages;
- zero banned phrases.

**Editorial review by GPT-5.5:**
- accuracy against the sources;
- matches what the searcher wants;
- at least 5 actionable specifics;
- no padding: long is fine, but sections that restate each other or stay generic fail;
- not a duplicate of an existing DT post;
- no filler.

A draft that fails is revised once using the review's notes. If it fails again it is discarded
rather than queued, and your topic goes back on the list.

## 7. Images
- A cover image plus one explanatory illustration inside the article, both in brand colours, with no
  text in the image.
- Images are best-effort: an article is never blocked because an image failed.

## 8. Human step
Nothing publishes on its own. "Approve, then open in editor" creates a **draft** post. You check
facts, cover, meta and keywords in the editor, then publish.
