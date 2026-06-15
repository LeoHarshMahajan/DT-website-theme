# Digital Triangle — CLAUDE.md

## Current Status: All Core Pages + Infrastructure Complete ✅

**Last Update**: May 26, 2026  
**Framework**: Next.js 16.2.6, App Router, Turbopack, TypeScript  
**Theme**: `next-themes` with `attribute="class"` (`html.dark` / `html.light`)

---

## How to Run

```bash
cd "D:/Claude Code apps/digital-triangle"
npm run dev          # http://localhost:3000
npm run build        # production build
npm run db:migrate   # run Prisma migrations (needs DATABASE_URL in .env)
```

---

## Architecture

```
src/
├── app/
│   ├── layout.tsx               # Root layout — ThemeProvider wrapper
│   ├── sitemap.ts               # Auto-generated /sitemap.xml
│   ├── robots.ts                # Auto-generated /robots.txt
│   ├── (main)/                  # Route group — all public pages + Navigation
│   │   ├── layout.tsx           # Wraps children with <Navigation />
│   │   ├── page.tsx             # Homepage (/)
│   │   ├── about/               # /about
│   │   ├── solutions/           # /solutions
│   │   ├── industries/          # /industries
│   │   ├── case-studies/        # /case-studies
│   │   ├── pricing/             # /pricing
│   │   ├── contact/             # /contact  ('use client' — form)
│   │   └── blog/                # /blog, /blog/[slug], /blog/tag/[slug], /blog/author/[id]
│   ├── admin/                   # /admin/** — protected by middleware
│   │   ├── layout.tsx           # Admin sidebar + header ('use client')
│   │   ├── page.tsx             # Dashboard
│   │   ├── posts/               # Post management
│   │   ├── users/               # User management
│   │   └── settings/            # Site settings
│   ├── auth/                    # /auth/** — authentication pages
│   │   ├── login/               # Login (uses NextAuth signIn())
│   │   ├── register/
│   │   ├── reset-password/
│   │   └── error/
│   └── api/
│       ├── auth/[...nextauth]/  # NextAuth route handler
│       ├── posts/               # Posts CRUD
│       └── subscribers/         # Newsletter subscribe/unsubscribe
├── components/
│   ├── Navigation.tsx
│   ├── Footer.tsx
│   ├── sections/                # Homepage sections (Hero, Pricing, etc.)
│   ├── ui/                      # Reveal, Icon, AnimatedNumber, StatusPill, Logo
│   ├── forms/                   # AuthLayout, FormInput, FormSelect, FormTextarea
│   └── editor/                  # RichTextEditor (Tiptap)
├── lib/
│   ├── auth/
│   │   ├── index.ts             # NextAuth v5 — exports { auth, handlers, signIn, signOut }
│   │   ├── auth.config.ts       # NextAuth config (providers, callbacks, RBAC)
│   │   └── utils.ts             # hashPassword, isAdmin, isEditor, etc.
│   ├── db/
│   │   ├── prisma.ts            # Prisma client singleton
│   │   └── queries.ts           # Typed query functions (getPosts, getPost, etc.)
│   ├── animations.ts            # useInView hook + animation helpers
│   └── constants.ts             # Routes, roles, site config
├── middleware.ts                # Admin route protection (edge-safe JWT check)
└── styles/
    └── globals.css              # CSS variables, Tailwind v4, design tokens
```

---

## Design System

### CSS Variables (must use these — never hardcode rgba)

```css
/* Backgrounds (dark → light) */
--bg-0: #07070a  → #ffffff
--bg-1: #0d0d12  → #f9fafb
--bg-2: #131318  → #f3f4f6
--bg-3: #1a1a22  → #e9eaec

/* Foreground */
--fg-0: #ffffff  → #0a0a0f     (headings)
--fg-1: #c8c8d4  → #1f1f2e     (body)
--fg-2: #8a8a9a  → #4a4a5a     (secondary)
--fg-3: #525260  → #7a7a8a     (muted)

/* Borders */
--line:        rgba(255,255,255,0.07)  → rgba(0,0,0,0.08)
--line-strong: rgba(255,255,255,0.12) → rgba(0,0,0,0.15)

/* Brand */
--brand-blue:   #4b6bff
--brand-violet: #8b5cf6
--brand-magenta:#c026d3
```

**Rule**: If a component uses `rgba(255,255,255,...)` directly for non-dark-only elements, replace with the corresponding CSS variable.

### Tailwind v4 Syntax
```css
/* globals.css uses v4 import syntax: */
@import "tailwindcss";
/* NOT @tailwind base/components/utilities */
```

---

## Authentication

- **Library**: NextAuth v5 (`next-auth@^5.0.0-beta.31`)
- **Strategy**: JWT (no DB session)
- **Roles**: `SUPER_ADMIN`, `ADMIN`, `EDITOR`, `VIEWER`
- **Login page**: `/auth/login` — uses `signIn('credentials', {...})` from `next-auth/react`
- **Logout**: `signOut({ callbackUrl: '/auth/login' })` from `next-auth/react`
- **Admin protection**: `src/middleware.ts` — edge-safe JWT check via `getToken()` from `next-auth/jwt`
- **ENV required**: `AUTH_SECRET` (generate with `openssl rand -base64 32`)

---

## Database

- **ORM**: Prisma with SQLite (dev) / PostgreSQL (prod)
- **Schema**: `prisma/schema.prisma`
- **Models**: User, Post, Tag, Comment, Page, Media, Subscriber, PageView, SiteSettings
- **Queries**: `src/lib/db/queries.ts` — fully typed, ready to use once DB is set up

### Setup

```bash
# 1. Set DATABASE_URL in .env
# SQLite (dev):   DATABASE_URL="file:./dev.db"
# PostgreSQL:     DATABASE_URL="postgresql://user:pass@host:5432/db"

# 2. Run migrations
npm run db:migrate

# 3. (optional) Open Prisma Studio
npx prisma studio
```

---

## SEO

- `src/app/sitemap.ts` → `/sitemap.xml` (static routes + dynamic blog posts from DB)
- `src/app/robots.ts` → `/robots.txt` (disallows all in dev, allows public routes in prod)
- Per-page `export const metadata` in every Server Component page
- Root `layout.tsx` sets default title template, OG, Twitter cards

---

## API Routes

| Method | Route | Purpose |
|--------|-------|---------|
| GET/POST | `/api/auth/[...nextauth]` | NextAuth handler |
| POST | `/api/auth/register` | User registration |
| POST | `/api/auth/request-reset` | Request password reset email |
| POST | `/api/auth/reset-password` | Reset password with token |
| GET | `/api/posts` | List published posts |
| POST | `/api/posts` | Create post (auth required) |
| GET | `/api/posts/[id]` | Get single post |
| PATCH | `/api/posts/[id]` | Update post |
| DELETE | `/api/posts/[id]` | Delete post |
| POST | `/api/posts/[id]/publish` | Publish post |
| POST | `/api/subscribers` | Subscribe to newsletter |
| DELETE | `/api/subscribers?email=` | Unsubscribe |

---

## Component Usage

```tsx
// Scroll animation wrapper
<Reveal direction="up" delay={0.1}>
  <h2>Animates in on scroll</h2>
</Reveal>

// Counting number
<AnimatedNumber value={312} suffix="%" />

// Icon (24+ names)
<Icon name="arrow-right" size="md" />

// Status badge
<StatusPill tone="blue">Published</StatusPill>
```

---

## Known Issues / Next Steps

### To Do Before Production
- [ ] Set `AUTH_SECRET`, `DATABASE_URL`, `NEXT_PUBLIC_SITE_URL` in `.env.production`
- [ ] Run `npm run db:migrate` once `DATABASE_URL` is set
- [ ] Add `public/favicon.ico` and `public/site.webmanifest`
- [x] Replace placeholder WhatsApp number in `pricing/page.tsx` → `+918077042525`
- [ ] Blog pages still use mock data — wire `queries.ts` to render real posts
- [x] Newsletter form in `Footer.tsx` connected to `POST /api/subscribers`
- [x] Contact form wired to `POST /api/contact` — set `RESEND_API_KEY` to activate email delivery

### Security Fixes Applied (June 2026)
- [x] **proxy.ts** — confirmed as the correct Next.js 16 middleware filename (not middleware.ts)
- [x] **proxy.ts** — now also guards `POST/PATCH/DELETE /api/posts` (was unprotected)
- [x] **Open redirect** fixed in `/auth/login` — `callbackUrl` validated to relative paths only
- [x] **Email enumeration** prevented — auth errors now return generic "Invalid credentials"
- [x] **Crypto token** — `generateToken()` uses `crypto.randomBytes(32)` instead of `Math.random()`
- [x] **PII leak** — removed `console.log(user.email)` from auth event handlers
- [x] **CSP + HSTS** — `Content-Security-Policy` and `Strict-Transport-Security` headers added in `next.config.ts`
- [x] **Reset endpoint** — no longer echoes the submitted email back in the response
- [x] **Admin invite** — email format validated before adding to list
- [x] **`/auth/error`** — wrapped `useSearchParams()` in `<Suspense>` (build fix)
- [x] **`/auth/login`** — wrapped `useSearchParams()` in `<Suspense>` (build fix)
- [x] **SEO page** — removed `onMouseEnter`/`onMouseLeave` from Server Component (build fix)

### Optional Enhancements
- Google / GitHub OAuth (already stubbed as disabled buttons in login page)
- Email delivery for password reset (configure SMTP / Resend)
- Admin analytics dashboard (PageView table is in schema, tracking not wired)
- Lighthouse CI in CI/CD pipeline

---

## Git / Deployment

```bash
# Deploy to Vercel (recommended)
vercel --prod

# Required Vercel env vars:
# AUTH_SECRET
# DATABASE_URL
# NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```
