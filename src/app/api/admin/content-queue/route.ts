import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { guardRoles } from '@/lib/auth/utils';
import { runPipeline } from '@/lib/content-engine/pipeline';

export const dynamic = 'force-dynamic';

// A healthy run finishes in a few minutes. Anything RUNNING longer than this
// was killed mid-flight (deploy, restart, crash) and will never update again.
const STALE_MS = 25 * 60_000;

// Mark dead runs FAILED and hand back topics they had claimed, so neither the
// single-flight lock nor a requested topic is stuck forever.
async function reapStaleRuns() {
  const reaped = await prisma.contentRun.updateMany({
    where: { status: 'RUNNING', startedAt: { lt: new Date(Date.now() - STALE_MS) } },
    data: { status: 'FAILED', message: 'Interrupted (server restarted or crashed mid-run). Safe to run again.', finishedAt: new Date() },
  });
  const live = await prisma.contentRun.count({ where: { status: 'RUNNING' } });
  if (reaped.count || !live) {
    await prisma.contentTopic.updateMany({ where: { status: 'CLAIMED' }, data: { status: 'PENDING' } });
  }
}

// GET /api/admin/content-queue: drafts awaiting review + the latest run.
export async function GET() {
  const { deny } = await guardRoles('SUPER_ADMIN', 'ADMIN', 'EDITOR');
  if (deny) return deny;

  await reapStaleRuns();
  const [drafts, run] = await Promise.all([
    prisma.contentDraft.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.contentRun.findFirst({ orderBy: { startedAt: 'desc' } }),
  ]);
  return NextResponse.json({ drafts, run });
}

// POST /api/admin/content-queue: start a run in the background and return at
// once. A run takes minutes, far longer than Hostinger's proxy keeps an HTTP
// request open; the page polls GET for progress instead.
export async function POST() {
  const { deny } = await guardRoles('SUPER_ADMIN', 'ADMIN', 'EDITOR');
  if (deny) return deny;

  await reapStaleRuns();
  // Serializable: of two simultaneous clicks, one transaction aborts instead
  // of both seeing "nothing running" and starting two paid runs.
  const run = await prisma.$transaction(async (tx) => {
    if (await tx.contentRun.count({ where: { status: 'RUNNING' } })) return null;
    return tx.contentRun.create({ data: { stage: 'Starting' } });
  }, { isolationLevel: 'Serializable' }).catch(() => null);
  if (!run) return NextResponse.json({ error: 'A run is already in progress' }, { status: 409 });

  const update = (data: { stage?: string; status?: string; message?: string; draftId?: string; finishedAt?: Date }) =>
    prisma.contentRun.update({ where: { id: run.id }, data }).then(() => undefined);

  // Fire and forget: Hostinger runs one long-lived Node process, so the
  // promise keeps running after the response is sent.
  void runPipeline((stage) => update({ stage }))
    .then((r) =>
      r.ok && r.passed
        ? update({ status: 'DONE', stage: 'Done', message: 'New draft ready for review.', draftId: r.draftId, finishedAt: new Date() })
        : r.ok
          ? update({ status: 'DISCARDED', stage: 'Done', message: r.reason, finishedAt: new Date() })
          : update({ status: 'FAILED', stage: 'Failed', message: r.error, finishedAt: new Date() }),
    )
    .catch((err) => {
      console.error('content-engine: run crashed', err);
      return update({ status: 'FAILED', stage: 'Failed', message: err instanceof Error ? err.message.slice(0, 500) : 'Unknown error', finishedAt: new Date() });
    })
    .catch((err) => console.error('content-engine: could not record run outcome', err));

  return NextResponse.json({ run }, { status: 202 });
}
