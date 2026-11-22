import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { auth } from '@/lib/auth';
import { guardRoles, isEditor } from '@/lib/auth/utils';
import { prisma } from '@/lib/db/prisma';

export const dynamic = 'force-dynamic';

type RouteParams = { params: Promise<{ id: string }> };

function slugify(s: string): string {
  return s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function parseTags(tags: string | string[] | undefined): string[] {
  if (tags === undefined) return [];
  const arr = Array.isArray(tags) ? tags : tags.split(',');
  return arr.map((t) => t.trim()).filter(Boolean);
}

// GET /api/posts/[id]
export async function GET(_request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const post = await prisma.post.findUnique({
    where: { id },
    include: { author: { select: { name: true } }, tags: { select: { name: true } } },
  });
  // Drafts/archived posts are staff-only; to everyone else they don't exist.
  const session = await auth();
  const staff = isEditor(((session?.user as { role?: string } | undefined)?.role) ?? '');
  if (!post || (!staff && post.status !== 'PUBLISHED')) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }
  return NextResponse.json({ post });
}

const updateSchema = z.object({
  title: z.string().min(1).optional(),
  slug: z.string().min(1).optional(),
  description: z.string().optional(),
  content: z.string().optional(),
  published: z.boolean().optional(),
  tags: z.union([z.string(), z.array(z.string())]).optional(),
  category: z.string().optional(),
  coverImage: z.string().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().max(400).optional(),
  metaKeywords: z.string().max(400).optional(),
  ogImage: z.string().optional(),
  canonical: z.string().optional(),
  noindex: z.boolean().optional(),
  nofollow: z.boolean().optional(),
});

// PATCH /api/posts/[id]
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  const { deny } = await guardRoles('SUPER_ADMIN', 'ADMIN', 'EDITOR');
  if (deny) return deny;

  const { id } = await params;
  const body = await request.json().catch(() => null);
  const parsed = updateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }

  const existing = await prisma.post.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: 'Post not found' }, { status: 404 });

  const data: Record<string, unknown> = {};
  if (parsed.data.title !== undefined) data.title = parsed.data.title;
  if (parsed.data.slug !== undefined) data.slug = slugify(parsed.data.slug);
  if (parsed.data.description !== undefined) {
    data.excerpt = parsed.data.description;
    // The editor's "Meta Description" box IS the excerpt. Drop any separate
    // metaDescription (e.g. seeded by the content queue) so what the editor
    // typed is what search engines get.
    if (parsed.data.metaDescription === undefined) data.metaDescription = null;
  }
  if (parsed.data.content !== undefined) data.content = parsed.data.content;
  // `published` is a toggle on the PUBLISHED/DRAFT axis only. Saving an
  // ARCHIVED post with published:false must not silently turn it into a draft.
  if (parsed.data.published === true) {
    data.status = 'PUBLISHED';
    if (!existing.publishedAt) data.publishedAt = new Date();
  } else if (parsed.data.published === false && existing.status === 'PUBLISHED') {
    data.status = 'DRAFT';
  }

  if (parsed.data.category !== undefined) data.category = parsed.data.category || null;
  if (parsed.data.coverImage !== undefined) data.coverImage = parsed.data.coverImage || null;
  if (parsed.data.metaTitle !== undefined) data.metaTitle = parsed.data.metaTitle || null;
  if (parsed.data.metaDescription !== undefined) data.metaDescription = parsed.data.metaDescription || null;
  if (parsed.data.metaKeywords !== undefined) data.metaKeywords = parsed.data.metaKeywords || null;
  if (parsed.data.ogImage !== undefined) data.ogImage = parsed.data.ogImage || null;
  if (parsed.data.canonical !== undefined) data.canonical = parsed.data.canonical || null;
  if (parsed.data.noindex !== undefined) data.noindex = parsed.data.noindex;
  if (parsed.data.nofollow !== undefined) data.nofollow = parsed.data.nofollow;

  if (parsed.data.tags !== undefined) {
    const tagNames = parseTags(parsed.data.tags);
    const tags = await Promise.all(
      tagNames.map((name) =>
        prisma.tag.upsert({ where: { slug: slugify(name) }, update: {}, create: { slug: slugify(name), name } })
      )
    );
    data.tags = { set: tags.map((t) => ({ id: t.id })) };
  }

  const post = await prisma.post.update({
    where: { id },
    data,
    include: { author: { select: { name: true } }, tags: { select: { name: true } } },
  }).catch((e: { code?: string }) => {
    if (e?.code === 'P2002') return null; // slug taken by another post
    throw e;
  });
  if (!post) {
    return NextResponse.json({ error: 'A post with that slug already exists' }, { status: 409 });
  }

  return NextResponse.json({ post });
}

// DELETE /api/posts/[id]
export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  const { deny } = await guardRoles('SUPER_ADMIN', 'ADMIN', 'EDITOR');
  if (deny) return deny;

  const { id } = await params;
  const existing = await prisma.post.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: 'Post not found' }, { status: 404 });

  await prisma.post.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
