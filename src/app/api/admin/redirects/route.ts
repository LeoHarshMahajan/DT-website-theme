import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db/prisma';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

export async function GET() {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const redirects = await prisma.redirect.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json({ redirects });
}

const createSchema = z.object({
  source: z.string().min(1).startsWith('/'),
  destination: z.string().min(1),
  permanent: z.boolean().default(false),
});

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const parsed = createSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const existing = await prisma.redirect.findUnique({ where: { source: parsed.data.source } });
  if (existing) return NextResponse.json({ error: 'Redirect for this source already exists' }, { status: 409 });

  const redirect = await prisma.redirect.create({ data: parsed.data });
  return NextResponse.json({ redirect }, { status: 201 });
}
