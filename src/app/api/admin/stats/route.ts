import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const [
    totalPosts,
    publishedPosts,
    draftPosts,
    totalUsers,
    activeUsers,
    totalViews,
    totalLeads,
    newLeads,
    recentPosts,
  ] = await Promise.all([
    prisma.post.count(),
    prisma.post.count({ where: { status: 'PUBLISHED' } }),
    prisma.post.count({ where: { status: 'DRAFT' } }),
    prisma.user.count(),
    prisma.user.count({ where: { isActive: true } }),
    prisma.pageView.count(),
    prisma.lead.count(),
    prisma.lead.count({ where: { status: 'NEW' } }),
    prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: { id: true, title: true, status: true, createdAt: true },
    }),
  ]);

  return NextResponse.json({
    totalPosts,
    publishedPosts,
    draftPosts,
    totalUsers,
    activeUsers,
    totalViews,
    totalLeads,
    newLeads,
    recentPosts,
  });
}
