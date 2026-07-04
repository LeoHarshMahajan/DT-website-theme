import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const subscribers = await prisma.subscriber.findMany({
    orderBy: { createdAt: 'desc' },
    select: { id: true, email: true, status: true, createdAt: true },
  });

  const counts = {
    total: subscribers.length,
    active: subscribers.filter((s) => s.status === 'ACTIVE').length,
    unsubscribed: subscribers.filter((s) => s.status === 'UNSUBSCRIBED').length,
  };

  return NextResponse.json({ subscribers, counts });
}

export async function DELETE(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');
  if (!email) return NextResponse.json({ error: 'Missing email' }, { status: 400 });

  await prisma.subscriber.updateMany({
    where: { email },
    data: { status: 'UNSUBSCRIBED', updatedAt: new Date() },
  });

  return NextResponse.json({ success: true });
}
