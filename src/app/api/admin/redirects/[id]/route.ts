import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db/prisma';
import { refreshRedirectCacheFile } from '@/lib/redirectCache';
import { z } from 'zod';
import { normalizeSource, validateRedirect } from '@/lib/redirectRules';

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
  const body = await request.json().catch(() => null);
  const parsed = patchSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const current = await prisma.redirect.findUnique({ where: { id } });
  if (!current) return NextResponse.json({ error: 'Redirect not found' }, { status: 404 });
  const source = parsed.data.source !== undefined ? normalizeSource(parsed.data.source) : current.source;
  const destination = (parsed.data.destination ?? current.destination).trim();
  // Re-validate whenever the rule will be live, so editing can't sneak in a loop.
  if (parsed.data.isActive ?? current.isActive) {
    const invalid = await validateRedirect(source, destination, id);
    if (invalid) return NextResponse.json({ error: invalid }, { status: 409 });
  }

  const redirect = await prisma.redirect.update({
    where: { id },
    data: { ...parsed.data, source, destination },
  }).catch((e: { code?: string }) => {
    if (e?.code === 'P2002') return null;
    throw e;
  });
  if (!redirect) return NextResponse.json({ error: `Redirect for ${source} already exists` }, { status: 409 });
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
