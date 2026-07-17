import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db/prisma';
import { refreshRedirectCacheFile } from '@/lib/redirectCache';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const patchSchema = z.object({
  source: z.string().min(1).startsWith('/').optional(),
  destination: z.string().min(1).optional(),
  permanent: z.boolean().optional(),
  isActive: z.boolean().optional(),
});

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const body = await request.json();
  const parsed = patchSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const redirect = await prisma.redirect.update({ where: { id }, data: parsed.data });
  await refreshRedirectCacheFile();
  return NextResponse.json({ redirect });
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  await prisma.redirect.delete({ where: { id } });
  await refreshRedirectCacheFile();
  return NextResponse.json({ success: true });
}
