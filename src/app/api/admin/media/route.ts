import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const media = await prisma.media.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json({ media });
}

export async function DELETE(request: NextRequest) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

  const item = await prisma.media.findUnique({ where: { id } });
  if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  // Delete from Supabase Storage
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY;
  if (supabaseUrl && supabaseKey) {
    const path = item.url.split('/object/public/blog-images/')[1];
    if (path) {
      await fetch(`${supabaseUrl}/storage/v1/object/blog-images/${path}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${supabaseKey}`, apikey: supabaseKey },
      }).catch(() => {});
    }
  }

  await prisma.media.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
