/**
 * Post queries used by the public blog page. Other pages and APIs query
 * Prisma directly; 18 unused helpers (tags, authors, pages, comments, page
 * views, site settings...) were removed in the Nov 2026 cleanup.
 */

import { prisma } from "./prisma";
import { POST_STATUS } from "@/lib/constants";

export async function getPostBySlug(slug: string) {
  return prisma.post.findUnique({
    where: { slug },
    include: {
      author: { select: { id: true, name: true, avatar: true, bio: true } },
      tags: true,
    },
  });
}

export async function getRelatedPosts(postId: string, limit: number = 3) {
  const post = await prisma.post.findUnique({
    where: { id: postId },
    select: { category: true, tags: { select: { id: true } } },
  });
  if (!post) return [];

  const include = {
    author: { select: { id: true, name: true } },
    tags: true,
  };

  const collected: any[] = [];
  const seen = new Set<string>([postId]);

  // 1. Same category first — this is the primary relatedness signal.
  if (post.category) {
    const byCategory = await prisma.post.findMany({
      where: {
        status: POST_STATUS.PUBLISHED,
        NOT: { id: postId },
        category: post.category,
      },
      include,
      orderBy: { publishedAt: "desc" },
      take: limit,
    });
    // Query already excludes postId — no need to re-check `seen` here.
    for (const p of byCategory) { collected.push(p); seen.add(p.id); }
  }

  // 2. Top up with shared-tag matches if the category didn't fill the row.
  if (collected.length < limit && post.tags.length > 0) {
    const tagIds = post.tags.map((t) => t.id);
    const byTag = await prisma.post.findMany({
      where: {
        status: POST_STATUS.PUBLISHED,
        id: { notIn: Array.from(seen) },
        tags: { some: { id: { in: tagIds } } },
      },
      include,
      orderBy: { publishedAt: "desc" },
      take: limit - collected.length,
    });
    // Query already excludes everything in `seen` via notIn — no re-check needed.
    for (const p of byTag) { collected.push(p); seen.add(p.id); }
  }

  // 3. Final fallback — most recent posts.
  if (collected.length < limit) {
    const recent = await prisma.post.findMany({
      where: { status: POST_STATUS.PUBLISHED, id: { notIn: Array.from(seen) } },
      include,
      orderBy: { publishedAt: "desc" },
      take: limit - collected.length,
    });
    // Query already excludes everything in `seen` via notIn — no re-check needed.
    for (const p of recent) { collected.push(p); seen.add(p.id); }
  }

  return collected.slice(0, limit);
}
