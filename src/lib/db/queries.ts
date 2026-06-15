/**
 * Database Query Functions
 * Centralized database operations for the application
 */

import { prisma } from "./prisma";
import { POST_STATUS, POSTS_PER_PAGE } from "@/lib/constants";

// ============================================================
// POSTS
// ============================================================

export async function getPublishedPosts(
  page: number = 1,
  limit: number = POSTS_PER_PAGE
) {
  const skip = (page - 1) * limit;

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where: {
        status: POST_STATUS.PUBLISHED,
        publishedAt: { lte: new Date() },
      },
      include: {
        author: { select: { id: true, name: true, avatar: true } },
        tags: true,
      },
      orderBy: { publishedAt: "desc" },
      skip,
      take: limit,
    }),
    prisma.post.count({
      where: {
        status: POST_STATUS.PUBLISHED,
        publishedAt: { lte: new Date() },
      },
    }),
  ]);

  return {
    posts,
    total,
    pages: Math.ceil(total / limit),
    currentPage: page,
  };
}

export async function getPostBySlug(slug: string) {
  return prisma.post.findUnique({
    where: { slug },
    include: {
      author: { select: { id: true, name: true, avatar: true, bio: true } },
      tags: true,
      comments: {
        where: { status: "APPROVED" },
        include: { author: { select: { id: true, name: true, avatar: true } } },
        orderBy: { createdAt: "desc" },
      },
    },
  });
}

export async function getRelatedPosts(postId: string, limit: number = 3) {
  const post = await prisma.post.findUnique({
    where: { id: postId },
    select: { tags: { select: { id: true } } },
  });

  if (!post || post.tags.length === 0) {
    return prisma.post.findMany({
      where: { status: POST_STATUS.PUBLISHED, NOT: { id: postId } },
      orderBy: { publishedAt: "desc" },
      take: limit,
    });
  }

  const tagIds = post.tags.map((tag) => tag.id);

  return prisma.post.findMany({
    where: {
      status: POST_STATUS.PUBLISHED,
      NOT: { id: postId },
      tags: { some: { id: { in: tagIds } } },
    },
    include: {
      author: { select: { id: true, name: true } },
      tags: true,
    },
    orderBy: { publishedAt: "desc" },
    take: limit,
  });
}

export async function getPostsByTag(slug: string, page: number = 1) {
  const tag = await prisma.tag.findUnique({ where: { slug } });
  if (!tag) return null;

  const skip = (page - 1) * POSTS_PER_PAGE;

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where: {
        status: POST_STATUS.PUBLISHED,
        tags: { some: { id: tag.id } },
      },
      include: {
        author: { select: { id: true, name: true } },
        tags: true,
      },
      orderBy: { publishedAt: "desc" },
      skip,
      take: POSTS_PER_PAGE,
    }),
    prisma.post.count({
      where: {
        status: POST_STATUS.PUBLISHED,
        tags: { some: { id: tag.id } },
      },
    }),
  ]);

  return { tag, posts, total, pages: Math.ceil(total / POSTS_PER_PAGE) };
}

export async function getPostsByAuthor(authorId: string, page: number = 1) {
  const skip = (page - 1) * POSTS_PER_PAGE;

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where: {
        authorId,
        status: POST_STATUS.PUBLISHED,
      },
      include: {
        author: { select: { id: true, name: true } },
        tags: true,
      },
      orderBy: { publishedAt: "desc" },
      skip,
      take: POSTS_PER_PAGE,
    }),
    prisma.post.count({
      where: {
        authorId,
        status: POST_STATUS.PUBLISHED,
      },
    }),
  ]);

  return { posts, total, pages: Math.ceil(total / POSTS_PER_PAGE) };
}

// ============================================================
// TAGS
// ============================================================

export async function getAllTags() {
  return prisma.tag.findMany({
    include: {
      _count: { select: { posts: true } },
    },
    orderBy: { name: "asc" },
  });
}

export async function getTag(slug: string) {
  return prisma.tag.findUnique({
    where: { slug },
    include: {
      _count: { select: { posts: true } },
    },
  });
}

// ============================================================
// USERS
// ============================================================

export async function getUserById(id: string) {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      name: true,
      avatar: true,
      bio: true,
      role: true,
      isActive: true,
      createdAt: true,
    },
  });
}

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
  });
}

// ============================================================
// PAGES
// ============================================================

export async function getPageBySlug(slug: string) {
  return prisma.page.findUnique({
    where: { slug },
  });
}

export async function getPublishedPages() {
  return prisma.page.findMany({
    where: { isPublished: true },
    orderBy: { title: "asc" },
  });
}

// ============================================================
// SUBSCRIBERS
// ============================================================

export async function getSubscriber(email: string) {
  return prisma.subscriber.findUnique({
    where: { email },
  });
}

export async function subscribeEmail(email: string) {
  return prisma.subscriber.upsert({
    where: { email },
    update: { status: "ACTIVE" },
    create: { email, status: "ACTIVE" },
  });
}

// ============================================================
// COMMENTS
// ============================================================

export async function getPostComments(postId: string) {
  return prisma.comment.findMany({
    where: {
      postId,
      status: "APPROVED",
    },
    include: {
      author: { select: { id: true, name: true, avatar: true } },
    },
    orderBy: { createdAt: "desc" },
  });
}

// ============================================================
// MEDIA
// ============================================================

export async function getMediaByUrl(url: string) {
  return prisma.media.findUnique({
    where: { url },
  });
}

export async function getMediaList(limit: number = 50) {
  return prisma.media.findMany({
    orderBy: { createdAt: "desc" },
    take: limit,
  });
}

// ============================================================
// ANALYTICS
// ============================================================

export async function trackPageView(path: string, referer?: string, userAgent?: string) {
  return prisma.pageView.create({
    data: { path, referer, userAgent },
  });
}

export async function getPageViewStats(path: string, days: number = 30) {
  const sinceDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

  return prisma.pageView.groupBy({
    by: ["path"],
    where: {
      path,
      createdAt: { gte: sinceDate },
    },
    _count: true,
  });
}

// ============================================================
// SETTINGS
// ============================================================

export async function getSiteSettings() {
  const settings = await prisma.siteSettings.findFirst();
  return settings || createDefaultSettings();
}

async function createDefaultSettings() {
  return prisma.siteSettings.create({
    data: {
      siteTitle: "Digital Triangle",
      siteDescription: "AI-powered growth infrastructure for modern brands",
    },
  });
}

export async function updateSiteSettings(data: any) {
  const existing = await prisma.siteSettings.findFirst();

  if (existing) {
    return prisma.siteSettings.update({
      where: { id: existing.id },
      data,
    });
  }

  return prisma.siteSettings.create({ data });
}
