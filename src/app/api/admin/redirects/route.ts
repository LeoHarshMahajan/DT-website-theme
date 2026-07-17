import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db/prisma';
import { refreshRedirectCacheFile } from '@/lib/redirectCache';
import { z } from 'zod';

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

// Normalise a source into a same-site path.
//  "https://thedigitaltriangle.com/blog/x?y=1#z" → "/blog/x"
//  "blog/x" → "/blog/x"   ·   "/blog/x/" → "/blog/x"
export function normalizeSource(raw: string): string {
  let s = raw.trim();
  if (!s) return s;
  if (/^https?:\/\//i.test(s)) {
    try { s = new URL(s).pathname; } catch { /* keep as-is */ }
  }
  s = s.split('#')[0].split('?')[0];
  if (!s.startsWith('/')) s = '/' + s;
  if (s.length > 1) s = s.replace(/\/+$/, ''); // trim trailing slash (but keep root "/")
  return s;
}

const createSchema = z.object({
  source: z.string().min(1),
  destination: z.string().min(1),
  permanent: z.boolean().default(false),
});

const SITE_HOSTNAME = (() => {
  try { return new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://thedigitaltriangle.com').hostname.replace(/^www\./, ''); }
  catch { return 'thedigitaltriangle.com'; }
})();

// Whether `destination` resolves to the same path as `source` once both are
// normalized — catches a destination written as an absolute same-site URL
// (e.g. source "/old", destination "https://thedigitaltriangle.com/old"),
// which a raw string comparison misses because only source gets normalized.
function pointsAtSelf(source: string, destination: string): boolean {
  if (!/^https?:\/\//i.test(destination)) return normalizeSource(destination) === source;
  try {
    const u = new URL(destination);
    if (u.hostname.replace(/^www\./, '') !== SITE_HOSTNAME) return false; // external — can't loop
    return normalizeSource(u.pathname) === source;
  } catch { return false; }
}

type CreateOneResult =
  | { error: string; redirect?: undefined }
  | { error?: undefined; redirect: Awaited<ReturnType<typeof prisma.redirect.create>> };

// Create a single redirect (shared by POST and bulk).
async function createOne(input: { source: string; destination: string; permanent?: boolean }): Promise<CreateOneResult> {
  const source = normalizeSource(input.source);
  const destination = input.destination.trim();
  if (!source || source === '/') return { error: 'Source path is required (e.g. /old-page)' };
  if (!destination) return { error: 'Destination is required' };
  if (pointsAtSelf(source, destination)) return { error: `Source and destination are identical (${source})` };

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
