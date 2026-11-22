import { prisma } from '@/lib/db/prisma';

// Shared validation for the admin redirects API (create + edit).

const SITE_HOSTNAME = (() => {
  try { return new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://thedigitaltriangle.com').hostname.replace(/^www\./, ''); }
  catch { return 'thedigitaltriangle.com'; }
})();

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

// Same-site path a destination resolves to, or null if it's external.
function sitePath(destination: string): string | null {
  if (!/^https?:\/\//i.test(destination)) return normalizeSource(destination);
  try {
    const u = new URL(destination);
    return u.hostname.replace(/^www\./, '') === SITE_HOSTNAME ? normalizeSource(u.pathname) : null;
  } catch { return null; }
}

/** Returns an error message, or null if the rule is safe to save. */
export async function validateRedirect(source: string, destination: string, ignoreId?: string): Promise<string | null> {
  if (!source || source === '/') return 'Source path is required (e.g. /old-page)';
  if (!destination) return 'Destination is required';
  if (/^\/(admin|auth|api|_next)(\/|$)/.test(source)) return `${source} is a system path and can't be redirected`;

  // Walk the chain of same-site hops; reaching `source` again is a loop.
  const rules = await prisma.redirect.findMany({
    where: { isActive: true, ...(ignoreId ? { id: { not: ignoreId } } : {}) },
    select: { source: true, destination: true },
  });
  const next = new Map(rules.map((r) => [r.source, r.destination]));
  let hop = sitePath(destination);
  for (let i = 0; hop && i < 20; i++) {
    if (hop === source) return i === 0 ? `Source and destination are identical (${source})` : `This would create a redirect loop back to ${source}`;
    const d = next.get(hop);
    hop = d ? sitePath(d) : null;
  }
  return null;
}
