import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db/prisma';

export const dynamic = 'force-dynamic';

const createSchema = z.object({
  topic: z.string().min(3).max(200),
  notes: z.string().max(1000).optional(),
});

// GET /api/admin/content-topics — topics Harsh wants the engine to cover
export async function GET() {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const topics = await prisma.contentTopic.findMany({ orderBy: { createdAt: 'asc' } });
  return NextResponse.json({ topics });
}

// POST /api/admin/content-topics — queue a topic for the next run
export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const parsed = createSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: 'Invalid input' }, { status: 400 });

  const topic = await prisma.contentTopic.create({
    data: { topic: parsed.data.topic, notes: parsed.data.notes || null },
  });
  return NextResponse.json({ topic });
}

// DELETE /api/admin/content-topics?id=... — drop a topic
export async function DELETE(request: NextRequest) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const id = new URL(request.url).searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

  await prisma.contentTopic.deleteMany({ where: { id } });
  return NextResponse.json({ ok: true });
}
