import { Metadata } from 'next';
import { prisma } from '@/lib/db/prisma';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://thedigitaltriangle.com';
const SITE_NAME = 'Digital Triangle';

/**
 * Builds page Metadata for a hardcoded/static route, merging in any admin-set
 * override for `path` (title, description, OG image, canonical, indexing).
 * Falls back to the code-defined defaults when no override exists or the DB
 * is unreachable — a page must never lose its SEO tags because of this.
 */
export async function buildPageMetadata(
  path: string,
  fallback: { title: string; description: string }
): Promise<Metadata> {
  let override: {
    metaTitle: string | null;
    metaDescription: string | null;
    ogImage: string | null;
    canonical: string | null;
    noindex: boolean;
    nofollow: boolean;
  } | null = null;

  try {
    override = await prisma.pageSeoOverride.findUnique({ where: { path } });
  } catch { /* DB unavailable — use fallback */ }

  const title = override?.metaTitle || fallback.title;
  const description = override?.metaDescription || fallback.description;

  return {
    title,
    description,
    ...(override?.ogImage ? {
      openGraph: {
        type: 'website',
        url: `${SITE_URL}${path}`,
        siteName: SITE_NAME,
        title,
        description,
        images: [{ url: override.ogImage }],
      },
    } : {}),
    ...(override?.canonical ? { alternates: { canonical: override.canonical } } : {}),
    ...(override?.noindex || override?.nofollow ? {
      robots: { index: !override.noindex, follow: !override.nofollow },
    } : {}),
  };
}
