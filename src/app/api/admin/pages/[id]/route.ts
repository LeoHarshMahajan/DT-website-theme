import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db/prisma';

export const dynamic = 'force-dynamic';

// PATCH /api/admin/pages/[id]
export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const body = await request.json();
  const { title, content, metaTitle, metaDescription, isPublished } = body;

  const page = await prisma.page.update({
    where: { id },
    data: {
      ...(title !== undefined      ? { title }           : {}),
      ...(content !== undefined    ? { content }         : {}),
      ...(metaTitle !== undefined  ? { metaTitle }       : {}),
      ...(metaDescription !== undefined ? { metaDescription } : {}),
      ...(isPublished !== undefined ? { isPublished }    : {}),
    },
  });

  return NextResponse.json({ page });
}

// DELETE /api/admin/pages/[id]
export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  await prisma.page.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
