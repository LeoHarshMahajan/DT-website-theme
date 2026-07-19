# Content Engine — Build Spec

> **Status:** Spec — awaiting go & three access keys before build
> **Version:** 1.0
> **System:** 2 of 3 (AI Systems)
> **Owner:** Harsh Mahajan (HM) — Creator & Builder
> Shareable doc: published as a Claude artifact for the team.

A system that ideates on its own, drafts genuinely good articles, edits itself
against a hard quality bar, and hands you a single morning approval. Not volume
— sustained, verified quality that compounds in search.

---

## Decisions locked

| Question | Decision |
|---|---|
| Scheduler | Hostinger cron → secret-protected route |
| Approval | Email digest + admin queue |
| Cadence | 1/day, ramp once proven |
| SEO data | GSC + live SERP reading (no paid API in v1) |

---

## 1. What "self-learning" actually means (the honest reframe)

It's **not** retraining a model. It's a system that keeps a persistent memory
of **what ranked** and **what you approved**, and conditions every new run on
that memory. Each night it's a little sharper about what to write and how you
like it written — real, compounding self-improvement, achievable now, without
the cost and fragility of fine-tuning.

## 2. The nightly pipeline

Runs while you sleep. Five stages, each gated by the next — a concept only
advances if it earns it.

1. **Ideate — generates its own concepts.** Ranks a backlog from four signals:
   striking-distance GSC queries (positions 11–20), the topical-authority map,
   DT's service priorities, and learned bias toward what has ranked or been
   approved. Each concept ships with a written rationale.
2. **Research & differentiate.** Reads what currently ranks, finds what they
   all miss, then pulls DT's real edge — data, frameworks, client results —
   from the knowledge base. **Original substance is the moat, not writing
   style.** Builds the brief (intent, outline, internal links, proof points).
3. **Draft — Opus, humanized.** Written to DT's voice with the brief's original
   substance baked in. Humanization comes from real data + POV + specificity,
   never a "write like a human" instruction.
4. **Self-verify — its own editor.** Runs the QA gate on itself (§3). Fails →
   revise, or discard the concept. You never see anything unverified.
5. **Queue for morning.** One verified draft, waiting with its rationale and QA
   report, by the time you wake up.

## 3. Self-verification gate (the part you emphasized)

Before anything reaches you, the system is its own first editor. A draft must
pass every check:

- **Fact-check** — every claim & stat verified or flagged. Hallucinated numbers
  are fatal.
- **Originality** — not a near-duplicate of anything it read.
- **SEO** — query coverage, title/meta, headings, internal links, schema,
  readability.
- **Brand voice** — DT tone, no AI tells, no unsupported claims.
- **No cannibalization** — doesn't fight an existing DT page for the same query.
- **Usefulness self-critique** — "is this genuinely good?" It rejects its own
  filler.

That's why the morning queue is short and strong, never noise. The system does
the tedious editing; you make the one judgment call.

## 4. The morning gate

By the time you're up, a **morning email** (plus an admin queue view) holds the
day's verified draft. Each entry shows: title, target query, **why it'll rank**
(the SERP gap it fills), expected impact, and the QA report. One tap:
**Approve → publishes** straight into the existing blog with category, cover,
and SEO fields / **Edit** / **Reject with a reason**. Approve is the only action
needed to ship.

## 5. The learning loop

- **Search Console** (already connected) — 2–4 weeks post-publish it reads
  impressions, clicks, and position per URL, learns which topics & angles rank
  *for DT specifically*, and biases the next night's ideation toward them.
- **Your decisions** — every reject-with-reason and every edit is a signal.
  Reject because an intro was too salesy → it learns your intro. Over weeks, the
  queue needs fewer edits and converges on things you approve. **That's the
  self-learning you described.**

## 6. Model tiering

| Model | Role | Runs |
|---|---|---|
| **Haiku 4.5** | Concept scoring, dedup / cannibalization checks, cheap classification | Constantly · cheap |
| **Sonnet 5** | Research synthesis, brief building, QA checks, the morning digest | Every run |
| **Opus 4.8** | The draft itself + the hardest verification reasoning | Per article |

## 7. Data, reuse & new build

- New tables: `ContentConcept` (backlog + rationale + score), `ContentDraft`
  (draft, status, QA report, target query), and a `ContentLearning` store
  (per-URL performance snapshots, approve/reject/edit history, cluster map).
- **Reuses:** the blog (`Post`, categories, cover image, SEO fields,
  revalidation), the Search Console connection, the email infra, and the admin
  — approvals land in a new *Content Queue* view.
- Additive schema only — same safe Supabase pattern as everything before it.

## 8. On the right side of Google (why this is safe)

Google de-indexes mass, unreviewed AI content ("scaled content abuse"). This
system is built to sit on the safe side **by design**: one differentiated,
fact-verified, human-approved piece a day. The self-verification, your approval,
and original substance **are** the safety. Scale comes from sustained quality +
topical authority — which compounds — never from volume, which gets penalized.
This matches exactly what you asked for (quality-gated, not volume-dumped).

## 9. Build phases

| Phase | Scope | Status |
|---|---|---|
| **P1 · Pipeline** | Ideation → research → draft → self-verify, concept/draft tables, admin Content Queue, manual "run now" trigger | Starts on go |
| **P2 · Autonomy** | Nightly Hostinger cron, morning email digest, one-tap approve/edit/reject → publish | Needs keys |
| **P3 · Learning** | GSC performance ingestion, decision-feedback store, ideation bias, ramp cadence | After live |

## 10. What unblocks the build

1. **Anthropic API key** — shared with the Discovery Agent; one
   `ANTHROPIC_API_KEY` on Hostinger covers both. Hard cost cap wired.
2. **Search Console API access** — GSC is connected for verification; the *API*
   to pull performance data needs a Google service account with read access to
   the property (exact click-path to be provided).
3. **Email sending + Hostinger cron** — a `RESEND_API_KEY` (or SMTP) for the
   morning digest, and one nightly Hostinger cron job hitting a
   secret-protected route.

P1 builds with **zero external keys** — the full pipeline plus a manual "run
now" you can watch produce a verified draft. Autonomy (P2) and learning (P3)
switch on as the keys land. Nothing publishes without your approval, ever.

---

## Where this sits (3-system roadmap)

- **System 1 — Discovery Agent** (`docs/discovery-agent-spec.md`) — build
  first. Conversational lead-nurture with live website analysis + Google
  Calendar booking.
- **System 2 — Content Engine** — this doc.
- **System 3 — "Different chatbots per window"** — handled by System 1's persona
  config; config-only expansion.

---

## Revision history

| Version | Date | Change |
|---|---|---|
| 1.0 | 2026-07-19 | Initial spec. Decisions locked: Hostinger cron → secured route, email digest + admin queue, 1/day cadence (ramp later), GSC + live SERP reading (no paid SEO API in v1). |
