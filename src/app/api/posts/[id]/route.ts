import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { auth } from '@/lib/auth';
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
  if (!post) return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  return NextResponse.json({ post });
}

const updateSchema = z.object({
  title: z.string().min(1).optional(),
  slug: z.string().min(1).optional(),
  description: z.string().optional(),
  content: z.string().optional(),
  published: z.boolean().optional(),
  tags: z.union([z.string(), z.array(z.string())]).optional(),
});

// PATCH /api/posts/[id]
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();
  const parsed = updateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }

  const existing = await prisma.post.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: 'Post not found' }, { status: 404 });

  const data: Record<string, unknown> = {};
  if (parsed.data.title !== undefined) data.title = parsed.data.title;
  if (parsed.data.slug !== undefined) data.slug = slugify(parsed.data.slug);
  if (parsed.data.description !== undefined) data.excerpt = parsed.data.description;
  if (parsed.data.content !== undefined) data.content = parsed.data.content;
  if (parsed.data.published !== undefined) {
    data.status = parsed.data.published ? 'PUBLISHED' : 'DRAFT';
    if (parsed.data.published && !existing.publishedAt) data.publishedAt = new Date();
  }

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
  });

  return NextResponse.json({ post });
}

// DELETE /api/posts/[id]
export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const existing = await prisma.post.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: 'Post not found' }, { status: 404 });

  await prisma.post.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
