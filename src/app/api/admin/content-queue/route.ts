import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db/prisma';
import { runPipeline } from '@/lib/content-engine/pipeline';

export const dynamic = 'force-dynamic';

// GET /api/admin/content-queue — list drafts awaiting review
export async function GET() {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const drafts = await prisma.contentDraft.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json({ drafts });
}

// POST /api/admin/content-queue — manual "run now" trigger (P1; nightly cron is P2)
export async function POST() {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const result = await runPipeline();
  if (!result.ok) return NextResponse.json({ error: result.error }, { status: 502 });
  return NextResponse.json(result);
}
