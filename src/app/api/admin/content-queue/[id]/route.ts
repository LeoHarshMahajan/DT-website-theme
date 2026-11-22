import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/db/prisma';
import { guardRoles } from '@/lib/auth/utils';

export const dynamic = 'force-dynamic';

// 'approve' (instant publish) was removed: the UI only ever sends 'edit', and
// AI output should always pass through the editor before it goes public.
const bodySchema = z.object({
  action: z.enum(['edit', 'reject']),
  rejectionReason: z.string().max(1000).optional(),
});

// PATCH /api/admin/content-queue/[id]: 'edit' turns the draft into a DRAFT
// Post and hands it to the editor; 'reject' records why.
export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { user, deny } = await guardRoles('SUPER_ADMIN', 'ADMIN', 'EDITOR');
  if (deny) return deny;

  const { id } = await params;
  const parsed = bodySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: 'Invalid input' }, { status: 400 });

  const draft = await prisma.contentDraft.findUnique({ where: { id } });
  if (!draft) return NextResponse.json({ error: 'Draft not found' }, { status: 404 });

  // Claim + act in one transaction. The conditional updateMany is the lock:
  // of two simultaneous clicks only one sees count === 1; the other gets 409
  // instead of creating a second Post.
  const result = await prisma.$transaction(async (tx) => {
    const nextStatus = parsed.data.action === 'reject' ? 'REJECTED' : 'APPROVED';
    const claim = await tx.contentDraft.updateMany({
      where: { id, status: 'QUEUED' },
      data: {
        status: nextStatus,
        rejectionReason: parsed.data.action === 'reject' ? parsed.data.rejectionReason || null : null,
      },
    });
    if (claim.count !== 1) return { conflict: true as const };
    if (parsed.data.action === 'reject') return { postId: null };

    let slug = draft.slug;
    for (let n = 2; await tx.post.findUnique({ where: { slug }, select: { id: true } }); n++) slug = `${draft.slug}-${n}`;

    const post = await tx.post.create({
      data: {
        slug,
        title: draft.title,
        excerpt: draft.excerpt,
        content: draft.content,
        category: draft.category,
        coverImage: draft.coverImage,
        // Pre-fill SEO from what the engine already worked out, so the editor
        // opens populated instead of blank. The excerpt doubles as the meta
        // description (the editor's "Meta Description" box), so no separate copy.
        metaTitle: draft.title,
        metaKeywords: draft.targetQuery,
        status: 'DRAFT',
        authorId: user.id,
      },
    });
    await tx.contentDraft.update({ where: { id }, data: { postId: post.id } });
    return { postId: post.id };
  }).catch((e: { code?: string }) => {
    // A post grabbed the same slug between our check and insert: ask for a retry
    // (the draft claim rolled back with the transaction, so it's still QUEUED).
    if (e?.code === 'P2002') return { retry: true as const };
    throw e;
  });

  if ('conflict' in result) return NextResponse.json({ error: 'Draft already actioned' }, { status: 409 });
  if ('retry' in result) return NextResponse.json({ error: 'Slug clash, please try again' }, { status: 409 });
  return NextResponse.json({ ok: true, postId: result.postId });
}
