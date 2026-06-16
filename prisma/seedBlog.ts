/**
 * Seeds the 22 real Digital Triangle blog posts (and their authors) into the DB.
 * Run once against the production DB:
 *   npx tsx prisma/seedBlog.ts
 * Idempotent — uses upsert keyed on slug/email, safe to re-run.
 */
import { PrismaClient } from '@prisma/client';
import { BLOG_POSTS } from '../src/lib/blogPosts';

const prisma = new PrismaClient();

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// Both authors share info@ in the source data; give them distinct login emails.
function authorEmail(name: string): string {
  return `${slugify(name).split('-')[0]}@digitaltriangle.in`;
}

async function main() {
  let posts = 0;
  let tagsCreated = 0;

  for (const p of BLOG_POSTS) {
    // ── Author ───────────────────────────────────────────────────────────────
    const email = authorEmail(p.author.name);
    const author = await prisma.user.upsert({
      where: { email },
      update: { name: p.author.name },
      create: {
        email,
        name: p.author.name,
        role: 'EDITOR',
        isActive: true,
      },
    });

    // ── Tags ─────────────────────────────────────────────────────────────────
    const tagConnect = [];
    for (const tagName of p.tags) {
      const tagSlug = slugify(tagName);
      const tag = await prisma.tag.upsert({
        where: { slug: tagSlug },
        update: {},
        create: { slug: tagSlug, name: tagName },
      });
      tagConnect.push({ id: tag.id });
      tagsCreated++;
    }

    // ── Post ─────────────────────────────────────────────────────────────────
    const content = `<p>${p.description}</p>\n<p><a href="${p.liveUrl}" target="_blank" rel="noopener">Read the full article →</a></p>`;
    const createdAt = new Date(p.createdAt);

    await prisma.post.upsert({
      where: { slug: p.slug },
      update: {
        title: p.title,
        excerpt: p.description,
        content,
        metaDescription: p.description,
        canonical: p.liveUrl,
        status: 'PUBLISHED',
        publishedAt: createdAt,
        authorId: author.id,
        tags: { set: tagConnect },
      },
      create: {
        slug: p.slug,
        title: p.title,
        excerpt: p.description,
        content,
        metaDescription: p.description,
        canonical: p.liveUrl,
        status: 'PUBLISHED',
        featured: false,
        publishedAt: createdAt,
        createdAt,
        authorId: author.id,
        tags: { connect: tagConnect },
      },
    });
    posts++;
  }

  console.log(`Seeded ${posts} posts, ${tagsCreated} tag links.`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
