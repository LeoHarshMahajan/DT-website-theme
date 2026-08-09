import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db/prisma';

export const dynamic = 'force-dynamic';

const bodySchema = z.object({
  action: z.enum(['approve', 'edit', 'reject']),
  rejectionReason: z.string().max(1000).optional(),
});

async function uniqueSlug(base: string) {
  let slug = base;
  let n = 1;
  while (await prisma.post.findUnique({ where: { slug } })) slug = `${base}-${++n}`;
  return slug;
}

// PATCH /api/admin/content-queue/[id] — approve (publish), edit (create as
// draft Post + hand off to the existing editor), or reject with a reason.
export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const parsed = bodySchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: 'Invalid input' }, { status: 400 });

  const draft = await prisma.contentDraft.findUnique({ where: { id } });
  if (!draft) return NextResponse.json({ error: 'Draft not found' }, { status: 404 });
  if (draft.status !== 'QUEUED') return NextResponse.json({ error: 'Draft already actioned' }, { status: 409 });

  if (parsed.data.action === 'reject') {
    await prisma.contentDraft.update({
      where: { id },
      data: { status: 'REJECTED', rejectionReason: parsed.data.rejectionReason || null },
    });
    return NextResponse.json({ ok: true });
  }

  // approve -> publish immediately; edit -> create as DRAFT and hand off to
  // the existing post editor (reuses 100% of the current editing/publish UI).
  const slug = await uniqueSlug(draft.slug);
  const publish = parsed.data.action === 'approve';
  const post = await prisma.post.create({
    data: {
      slug,
      title: draft.title,
      excerpt: draft.excerpt,
      content: draft.content,
      category: draft.category,
      status: publish ? 'PUBLISHED' : 'DRAFT',
      publishedAt: publish ? new Date() : null,
      authorId: (session.user as { id: string }).id,
    },
  });

  await prisma.contentDraft.update({
    where: { id },
    data: { status: 'APPROVED', postId: post.id },
  });

  return NextResponse.json({ ok: true, postId: post.id });
}
