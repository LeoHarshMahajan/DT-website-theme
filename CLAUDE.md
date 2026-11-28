# Digital Triangle — CLAUDE.md

Marketing site + admin CMS + two AI systems (website chat/lead agent, SEO Content Engine) for
thedigitaltriangle.com. Built by Harsh Mahajan (HM) — Creator & Builder: keep that line in
`package.json` author, the `src/app/layout.tsx` comment and the site footer. Read
`AGENTS.md`: this Next.js has breaking changes, so check `node_modules/next/dist/docs/` first.

## Stack
- Next.js 16 App Router, TypeScript. Route guarding lives in `src/proxy.ts` (Next 16 name for
  middleware). `/admin/**` and `/api/admin/**` need an EDITOR+ session.
- Tailwind v4 via `@import "tailwindcss"` in `src/styles/globals.css`; there is no
  `tailwind.config`. Use the CSS variables there (`--bg-0..3`, `--fg-0..3`, `--brand-blue #4b6bff`,
  `--brand-violet #8b5cf6`, `--brand-magenta #c026d3`), never hard-coded colours.
- Motion is CSS-first, no animation library. `<Reveal>` is a server component (content is visible
  in the HTML); `RevealObserver` in the layout hides only below-the-fold elements and fades them in.
  Anything JS-driven must honour reduced motion (`usePrefersReducedMotion` in `src/lib/animations.ts`).
  Art direction for images is in `docs/visual-prompt-pack.md`; hero art is `<PageHeroArt/>`.
- Prisma 5 + Supabase Postgres. **The local `.env` points at the SAME database as production**,
  so every local test writes live data: use `@example.invalid` emails and delete what you create.
- NextAuth v5, JWT sessions. Roles: SUPER_ADMIN > ADMIN > EDITOR > VIEWER. Use `guardRoles` /
  `canManage` in `src/lib/auth/utils.ts` (reads the DB, not the JWT); VIEWER is read-only.

## Run
`npm run dev` (http://localhost:3000) · `npm run build` = `prisma generate && next build --webpack`.

## Deploying (Hostinger Node Cloud, auto-deploys on `git push origin main`)
Hostinger's build box is glibc 2.28 / Node 20 and installs **without devDependencies**. Hence:
- Build with `--webpack` (Next's native compiler needs glibc 2.29, so the WASM one is used and
  Turbopack can't run) and keep `next.config.mjs` plain JS (WASM can't load `next.config.ts`).
- `typescript`, `@types/*` and anything the build needs must be in `dependencies`.
- Env values in the Hostinger panel must have no surrounding quotes. Multi-line secrets (the Google
  service-account key) live in the Supabase `AppSecret` table, not the panel.
- Before pushing a deploy-affecting change, reproduce it:
  `docker run -e NODE_ENV=production registry.access.redhat.com/ubi8/nodejs-20`, then
  `npm install && npm run build && npx next start`. Build logs: hPanel → Deployments.

## Rules
- Never commit or push without Harsh's explicit OK.
- **Zero vulnerabilities**: `npm audit --omit=dev` and `npm audit` must both be 0 before a push.
  Advisories appear between pushes, so re-audit at the start of every task.
- Every push needs the full gate: `npx tsc --noEmit`, both audits, a clean build, the changed
  feature actually exercised, and a regression pass (pages, admin, chat widget, lead forms).
- `.redirects-cache.json` is a tracked snapshot the proxy reads (Prisma can't run there). The admin
  redirects API rewrites it; don't gitignore it or deploys lose their redirects.
- Public HTML always goes through `src/lib/sanitize.ts`; URLs a visitor supplies go through
  `src/lib/safeFetch.ts`; public endpoints use `src/lib/rateLimit.ts`.

## Where things are
- `src/app/(main)` public pages · `src/app/admin` CMS · `src/app/api` routes · `prisma/schema.prisma`
- `src/lib/discovery/` chat agent tools (OpenAI), website analysis, Google Calendar booking
- `src/lib/content-engine/` SEO article pipeline (GPT-5.5 + live web search, `gpt-image-2` images) →
  admin **Content Queue**, runs in the background (`ContentRun`); a human approves every article.
  Editorial rules live in `framework.ts` and are documented in `docs/content-framework.md`
- `src/lib/seo.ts` per-page metadata with admin overrides · `src/lib/redirectRules.ts` redirect checks
- Specs: `docs/discovery-agent-spec.md`, `docs/content-engine-spec.md`
