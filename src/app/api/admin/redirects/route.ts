import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db/prisma';
import { refreshRedirectCacheFile } from '@/lib/redirectCache';
import { z } from 'zod';
import { normalizeSource, validateRedirect } from '@/lib/redirectRules';

export const dynamic = 'force-dynamic';

export async function GET() {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const redirects = await prisma.redirect.findMany({ orderBy: { createdAt: 'desc' } });
  // Opportunistic self-heal: if a deploy wiped the on-disk cache file since
  // the last mutation, visiting this page regenerates it from the DB.
  await refreshRedirectCacheFile();
  return NextResponse.json({ redirects });
}

const createSchema = z.object({
  source: z.string().min(1),
  destination: z.string().min(1),
  permanent: z.boolean().default(false),
});

type CreateOneResult =
  | { error: string; redirect?: undefined }
  | { error?: undefined; redirect: Awaited<ReturnType<typeof prisma.redirect.create>> };

// Create a single redirect (shared by POST and bulk).
async function createOne(input: { source: string; destination: string; permanent?: boolean }): Promise<CreateOneResult> {
  const source = normalizeSource(input.source);
  const destination = input.destination.trim();
  const invalid = await validateRedirect(source, destination);
  if (invalid) return { error: invalid };

  const existing = await prisma.redirect.findUnique({ where: { source } });
  if (existing) return { error: `Redirect for ${source} already exists` };

  const redirect = await prisma.redirect.create({
    data: { source, destination, permanent: input.permanent ?? false },
  });
  return { redirect };
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();

  // Bulk mode: { items: [{ source, destination, permanent }] }
  if (Array.isArray(body?.items)) {
    const created: unknown[] = [];
    const errors: { line: number; error: string }[] = [];
    for (let i = 0; i < body.items.length; i++) {
      const parsed = createSchema.safeParse(body.items[i]);
      if (!parsed.success) { errors.push({ line: i + 1, error: 'Invalid row' }); continue; }
      const r = await createOne(parsed.data);
      if (r.error) errors.push({ line: i + 1, error: r.error });
      else created.push(r.redirect);
    }
    if (created.length) await refreshRedirectCacheFile();
    return NextResponse.json({ created, errors }, { status: created.length ? 201 : 400 });
  }

  const parsed = createSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const r = await createOne(parsed.data);
  if (r.error) return NextResponse.json({ error: r.error }, { status: 409 });
  await refreshRedirectCacheFile();
  return NextResponse.json({ redirect: r.redirect }, { status: 201 });
}
