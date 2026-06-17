import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/constants';

// Regenerate at most once per hour — new posts/tags/authors appear within 60 min
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = SITE_URL.replace(/\/$/, '');
  const now = new Date();

  // ── Static pages ─────────────────────────────────────────────────────────────
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base,                                   lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${base}/about`,                        lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/solutions`,                    lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/solutions/organic-growth`,     lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/solutions/performance`,        lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/solutions/content-social`,     lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/solutions/ai-automation`,      lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/solutions/brand-creative`,     lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/solutions/analytics`,          lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/industries`,                   lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/case-studies`,                 lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${base}/pricing`,                      lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/blog`,                         lastModified: now, changeFrequency: 'daily',   priority: 0.8 },
    { url: `${base}/contact`,                      lastModified: now, changeFrequency: 'yearly',  priority: 0.7 },
  ];

  // ── Dynamic routes from DB ────────────────────────────────────────────────────
  let blogRoutes: MetadataRoute.Sitemap = [];
  let tagRoutes: MetadataRoute.Sitemap = [];
  let authorRoutes: MetadataRoute.Sitemap = [];

  try {
    const { prisma } = await import('@/lib/db/prisma');

    // Published blog posts
    const posts = await prisma.post.findMany({
      where: { status: 'PUBLISHED' },
      select: { slug: true, updatedAt: true },
      orderBy: { publishedAt: 'desc' },
    });
    blogRoutes = posts.map((post) => ({
      url: `${base}/blog/${post.slug}`,
      lastModified: post.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));

    // Tag pages — only tags that have at least one published post
    const tags = await prisma.tag.findMany({
      where: { posts: { some: { status: 'PUBLISHED' } } },
      select: { slug: true, updatedAt: true },
    });
    tagRoutes = tags.map((tag) => ({
      url: `${base}/blog/tag/${tag.slug}`,
      lastModified: tag.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.5,
    }));

    // Author pages — only authors who have published at least one post
    const authors = await prisma.user.findMany({
      where: {
        posts: { some: { status: 'PUBLISHED' } },
        isActive: true,
      },
      select: { id: true, updatedAt: true },
    });
    authorRoutes = authors.map((author) => ({
      url: `${base}/blog/author/${author.id}`,
      lastModified: author.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    }));
  } catch {
    // DB not available — return static routes only
  }

  return [...staticRoutes, ...blogRoutes, ...tagRoutes, ...authorRoutes];
}
