import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

export const dynamic = 'force-dynamic';

// Public endpoint — returns active redirect map consumed by proxy.ts (cached 5 min)
export async function GET() {
  try {
    const rows = await prisma.redirect.findMany({
      where: { isActive: true },
      select: { source: true, destination: true, permanent: true },
    });

    const map: Record<string, { destination: string; permanent: boolean }> = {};
    for (const r of rows) map[r.source] = { destination: r.destination, permanent: r.permanent };

    return NextResponse.json(map, {
      headers: { 'Cache-Control': 'public, max-age=300' },
    });
  } catch {
    return NextResponse.json({});
  }
}
