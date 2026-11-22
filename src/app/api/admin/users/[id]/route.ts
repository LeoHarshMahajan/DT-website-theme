import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/db/prisma';
import { guardRoles, canManage } from '@/lib/auth/utils';

export const dynamic = 'force-dynamic';

const patchSchema = z.object({
  role: z.enum(['SUPER_ADMIN', 'ADMIN', 'EDITOR', 'VIEWER']).optional(),
  isActive: z.boolean().optional(),
});

// PATCH /api/admin/users/[id] — update role / active status.
// Rules: only ADMIN+; never on yourself; only on users strictly below you;
// only to roles strictly below you (SUPER_ADMIN is exempt from the "below" rule).
export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { user: actor, deny } = await guardRoles('SUPER_ADMIN', 'ADMIN');
  if (deny) return deny;

  const { id } = await params;
  const parsed = patchSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }

  if (id === actor.id) {
    return NextResponse.json({ error: "You can't change your own role or status" }, { status: 403 });
  }
  const target = await prisma.user.findUnique({ where: { id }, select: { role: true } });
  if (!target) return NextResponse.json({ error: 'User not found' }, { status: 404 });
  if (!canManage(actor.role, target.role) || (parsed.data.role && !canManage(actor.role, parsed.data.role))) {
    return NextResponse.json({ error: 'You can only manage roles below your own' }, { status: 403 });
  }

  const user = await prisma.user.update({
    where: { id },
    data: parsed.data,
    select: { id: true, name: true, email: true, role: true, isActive: true, createdAt: true },
  });

  return NextResponse.json({ user });
}

// DELETE /api/admin/users/[id] — remove a user
export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { user: actor, deny } = await guardRoles('SUPER_ADMIN', 'ADMIN');
  if (deny) return deny;

  const { id } = await params;
  if (id === actor.id) {
    return NextResponse.json({ error: "You can't remove yourself" }, { status: 403 });
  }

  const target = await prisma.user.findUnique({ where: { id } });
  if (!target) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }
  if (target.role === 'SUPER_ADMIN' || !canManage(actor.role, target.role)) {
    return NextResponse.json({ error: 'You can only remove users below your own role' }, { status: 403 });
  }

  await prisma.user.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
