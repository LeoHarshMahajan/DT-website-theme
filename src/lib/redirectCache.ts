import fs from 'fs';
import path from 'path';
import { prisma } from '@/lib/db/prisma';

export type RedirectMap = Record<string, { destination: string; permanent: boolean }>;

// Persisted outside .next/public so a rebuild doesn't wipe it and it's never
// served as a static asset. Read by proxy.ts via plain fs (no network, no
// Prisma-in-middleware) — both of those silently failed in this host's
// middleware execution context, so this sidesteps them entirely.
const CACHE_PATH = path.join(process.cwd(), '.redirects-cache.json');

export function readRedirectCacheFile(): RedirectMap {
  try {
    return JSON.parse(fs.readFileSync(CACHE_PATH, 'utf-8'));
  } catch {
    return {};
  }
}

// Re-reads active redirects from the DB and writes the cache file. Call this
// after any create/update/delete so proxy.ts picks up the change on its next
// request (no polling interval to wait out).
export async function refreshRedirectCacheFile(): Promise<RedirectMap> {
  const rows = await prisma.redirect.findMany({
    where: { isActive: true },
    select: { source: true, destination: true, permanent: true },
  });
  const map: RedirectMap = {};
  for (const r of rows) map[r.source] = { destination: r.destination, permanent: r.permanent };
  try {
    fs.writeFileSync(CACHE_PATH, JSON.stringify(map));
  } catch { /* read-only fs — proxy.ts falls back to an empty map */ }
  return map;
}
