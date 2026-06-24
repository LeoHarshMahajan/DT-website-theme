import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db/prisma';

export const dynamic = 'force-dynamic';

function slugify(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

// GET /api/admin/pages — list all pages
export async function GET() {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const pages = await prisma.page.findMany({ orderBy: { updatedAt: 'desc' } });
  return NextResponse.json({ pages });
}

// POST /api/admin/pages — create a page
export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const { title, content = '', metaTitle, metaDescription, isPublished = false } = body;

  if (!title) return NextResponse.json({ error: 'Title is required' }, { status: 400 });

  const slug = body.slug ? slugify(body.slug) : slugify(title);
  const existing = await prisma.page.findUnique({ where: { slug } });
  if (existing) return NextResponse.json({ error: 'A page with that slug already exists' }, { status: 409 });

  const page = await prisma.page.create({
    data: { slug, title, content, metaTitle, metaDescription, isPublished },
  });

  return NextResponse.json({ page }, { status: 201 });
}
