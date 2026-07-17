import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db/prisma';

export const dynamic = 'force-dynamic';

// Hardcoded/static routes that ship as code, not CMS pages — kept in sync
// with the actual app/(main) route tree by hand since they're not DB-driven.
export const SITE_ROUTES = [
  { path: '/', title: 'Home' },
  { path: '/about', title: 'About' },
  { path: '/solutions', title: 'Solutions' },
  { path: '/solutions/organic-growth', title: 'Solutions — Organic Growth' },
  { path: '/solutions/performance', title: 'Solutions — Performance' },
  { path: '/solutions/ai-automation', title: 'Solutions — AI & Automation' },
  { path: '/solutions/content-social', title: 'Solutions — Content & Social' },
  { path: '/solutions/analytics', title: 'Solutions — Analytics' },
  { path: '/solutions/retention', title: 'Solutions — Retention' },
  { path: '/solutions/brand-creative', title: 'Solutions — Brand & Creative' },
  { path: '/industries', title: 'Industries' },
  { path: '/case-studies', title: 'Case Studies' },
  { path: '/insights', title: 'Insights' },
  { path: '/blog', title: 'Blog' },
  { path: '/pricing', title: 'Pricing' },
  { path: '/contact', title: 'Contact' },
  { path: '/book-consultation', title: 'Book Consultation' },
  { path: '/free-growth-audit', title: 'Free Growth Audit' },
  { path: '/search-engine-optimization', title: 'SEO' },
] as const;

// GET /api/admin/site-pages — the static route list merged with any saved overrides
export async function GET() {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const overrides = await prisma.pageSeoOverride.findMany();
  const byPath = new Map(overrides.map((o) => [o.path, o]));

  const pages = SITE_ROUTES.map((r) => {
    const o = byPath.get(r.path);
    return {
      path: r.path,
      title: r.title,
      metaTitle: o?.metaTitle ?? null,
      metaDescription: o?.metaDescription ?? null,
      ogImage: o?.ogImage ?? null,
      canonical: o?.canonical ?? null,
      noindex: o?.noindex ?? false,
      nofollow: o?.nofollow ?? false,
    };
  });

  return NextResponse.json({ pages });
}

const upsertSchema = z.object({
  path: z.string().min(1),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  ogImage: z.string().optional(),
  canonical: z.string().optional(),
  noindex: z.boolean().optional(),
  nofollow: z.boolean().optional(),
});

// PATCH /api/admin/site-pages — upsert the SEO override for one static route
export async function PATCH(request: NextRequest) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const parsed = upsertSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  if (!SITE_ROUTES.some((r) => r.path === parsed.data.path)) {
    return NextResponse.json({ error: 'Unknown page path' }, { status: 404 });
  }

  const { path, ...fields } = parsed.data;
  const data = {
    metaTitle: fields.metaTitle || null,
    metaDescription: fields.metaDescription || null,
    ogImage: fields.ogImage || null,
    canonical: fields.canonical || null,
    noindex: fields.noindex ?? false,
    nofollow: fields.nofollow ?? false,
  };

  const page = await prisma.pageSeoOverride.upsert({
    where: { path },
    update: data,
    create: { path, ...data },
  });

  return NextResponse.json({ page });
}
