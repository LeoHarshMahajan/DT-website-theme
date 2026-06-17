import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db/prisma';

export const dynamic = 'force-dynamic';

// GET /api/admin/leads — list all captured leads
export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const leads = await prisma.lead.findMany({ orderBy: { createdAt: 'desc' } });
  const counts = {
    total: leads.length,
    new: leads.filter((l) => l.status === 'NEW').length,
  };
  return NextResponse.json({ leads, counts });
}
