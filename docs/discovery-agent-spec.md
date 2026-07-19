# Discovery Agent — Build Spec

> **Status:** Spec — awaiting API key & calendar access before build
> **Version:** 1.0
> **System:** 1 of 3 (AI Systems)
> **Owner:** Harsh Mahajan (HM) — Creator & Builder
> Shareable doc: published as a Claude artifact for the team.

A guided conversation that reads a visitor's website live, tells them what
they're leaking, and books a real call with the team. This covers **v1**:
website-only analysis, direct Google Calendar booking, tiered models.

---

## Decisions locked

| Question | Decision |
|---|---|
| Build order | Discovery agent first |
| Social scope (v1) | Website-only |
| Booking | Direct Google Calendar |
| Calendar type | Google Workspace |
| Slot rules | 30-min · IST business hours |
| Content engine | Parked · publishes as draft → human approve |

---

## 1. What the visitor gets

A floating launcher on every page opens with a line matched to where they are
— on `/solutions/performance` it talks paid media, on `/pricing` it handles
objections. It asks three to five sharp questions, **analyzes their website
live and hands back two or three real gaps** (missing tracking, thin content,
no schema), frames an approach tied to those gaps, then offers **actual open
slots** from the team calendar and books the call.

The live "here's what you're missing" moment is the whole differentiator. It's
the reason this reads as a free mini-audit instead of a contact form — and
it's fully feasible for websites, which is why v1 goes deep there and leaves
social for later.

## 2. The conversation, as a state machine

An orchestrator tracks what's still unknown about the lead so the agent never
loops or forgets. The model drives each state naturally; the machine decides
when to move on.

1. **Engage** — context-matched opener. Get their site URL and primary goal.
2. **Diagnose** — `analyze_website()` runs; the agent turns raw signals into
   two–three plain-English gaps.
3. **Understand** — three–five adaptive questions (stage, budget band,
   timeline, main bottleneck). Soft, never an interrogation.
4. **Propose** — a tailored approach tied to their gaps, anchored to a
   relevant DT proof point.
5. **Book** — reads live availability, offers real slots, creates the calendar
   event with an invite.
6. **Capture / exit** — everything persisted. If they don't book, a graceful
   "email you the audit" fallback keeps the lead.

## 3. Model tiering ("good vs better," settled)

Premium B2B feel without all-premium cost: **good is the default, better shows
up only where it changes the outcome** — analyzing the site and writing the
proposal.

| Model | Role | Runs |
|---|---|---|
| **Haiku 4.5** | Intent routing, real-lead vs spam check, field extraction | Every turn · cheap |
| **Sonnet 5** | The conversation itself — the "good" that's genuinely sharp | Default driver |
| **Opus 4.8** | Website-insight synthesis + the tailored proposal — the "better" | 2–3× per conversation |

## 4. Tools the agent calls

- `analyze_website(url)` — fetches & parses their site: title/meta/H1s,
  platform detection, missing meta & schema, thin content, no GA4/pixel, basic
  speed signals. **Feasible and high-value.**
- `get_availability()` — free/busy read on the team calendar inside working
  hours.
- `book_call(name, email, slot, context)` — creates the Google Calendar event
  and sends the invite.
- `save_lead(...)` — writes the lead, extracted facts, and full transcript.

> ⚠ **Social analysis is deferred, on purpose.** Instagram, LinkedIn, and
> TikTok actively block scraping — reliable access needs approved official APIs
> or a paid data provider. v1 reads whatever a visitor pastes but goes deep only
> on the website. Real social integration is a costed Phase 2, not a v1 promise.

## 5. Data & surfaces

- New `Conversation` table — session, page/persona, transcript, extracted
  facts, outcome, per-model cost tally.
- Extend `Lead` — `websiteAnalysis`, `conversationId`, `qualificationScore`.
- Additive schema only (same safe Supabase pattern used for the blog category
  work) — no destructive migration.
- Transcripts and leads surface in the **existing `/admin/leads`** — nothing
  new for the team to learn.

## 6. Context-aware personas

A single backend, a `route → { persona, opener, goal }` config. v1 ships three
tuned personas plus a default:

| Surface | Persona & job |
|---|---|
| Home / general | Broad discovery — figure out what they need, route to the right system |
| `/pricing` | Objection handling, push to book a call |
| A solution page | Channel specialist — deep on that one service |
| Everywhere else | Default discovery fallback |

Adding a fourth persona later is a config edit, not a rebuild.

## 7. Google Calendar (Workspace)

Because the team is on Google Workspace, the clean path is a **service account
with domain-wide delegation** — it reads free/busy and creates events on the
team calendar directly, no per-user OAuth dance, no token refresh to babysit.

**Slot rules for v1:** 30-minute discovery calls, Mon–Fri within Indian
business hours, small buffer between bookings — all editable later from
settings.

> ◆ **This is the only genuinely new infrastructure in v1.** The chat engine,
> website analysis, and admin wiring all build with zero external credentials —
> so that half can start the moment you say go, with booking stubbed until the
> calendar is connected.

## 8. Guardrails, from day one

- **Prompt-injection defense** — fetched website content is untrusted input to
  a tool-using model; a hostile site could try to hijack it. Treated as data,
  never instructions.
- **Per-session rate limits** and a **hard per-conversation cost ceiling** —
  the tiering keeps spend low; the cap makes it impossible to run away.
- **PII-aware storage** — business info is captured deliberately and handled
  with care.

## 9. Build phases

| Phase | Scope | Status |
|---|---|---|
| **P1 · Engine** | Conversation state machine, persona config, streaming chat UI, website-analysis tool, transcript + lead persistence, admin wiring | Starts on go |
| **P2 · Booking** | Workspace service account, free/busy read, event creation, slot rules | Needs calendar |
| **P3 · Tuning** | Real-traffic persona tuning, qualification scoring, cost dashboard | After live |

## 10. What unblocks the build

1. **Anthropic API key + monthly cap** — an `ANTHROPIC_API_KEY` set on
   Hostinger, plus a monthly spend ceiling. The tiering keeps this low; a hard
   cap is wired so it can't overrun.
2. **Workspace calendar + service account** — which team calendar bookings
   land on, and a Google Cloud service account with domain-wide delegation for
   it (exact click-path to be provided).

The moment those two land, P1 and P2 both build. Nothing deploys to production
without explicit go — same gate as always.

---

## The other two systems (context)

This is System 1 of 3. Kept here so the roadmap stays legible:

- **System 2 — Self-learning SEO content engine.** Keyword/topic intake → SERP
  + competitor gap → brief → human-quality draft → automated editorial QA →
  publish into the existing blog **as draft** for one-click human approval. The
  real value is the self-learning loop feeding off the Google Search Console
  data (recently connected): publish → pull GSC impressions/clicks/position per
  URL → learn what ranks for DT specifically → bias future briefs. **Risk noted:**
  Google's "scaled content abuse" policy de-indexes mass unreviewed AI content —
  so velocity + differentiation + a quality gate, never raw volume. Parked;
  gets its own spec.
- **System 3 — "Different chatbots per window."** Already handled by the
  persona config in System 1; expands from 3 personas to as many surfaces as
  wanted, config-only.

---

## Revision history

| Version | Date | Change |
|---|---|---|
| 1.0 | 2026-07-19 | Initial spec. Decisions locked: agent-first, website-only v1, direct Google Workspace calendar, 30-min IST slots, content engine parked (draft→approve). |
