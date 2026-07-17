/**
 * Next.js 16 Proxy — Route Protection & Security
 *
 * Next.js 16 renamed middleware.ts to proxy.ts. This file MUST be named proxy.ts.
 * Proxy always runs on the Node.js runtime (not Edge) — safe to use Prisma directly.
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { readRedirectCacheFile } from '@/lib/redirectCache';

// ── Redirect map ───────────────────────────────────────────────────────────
// Reads a small JSON file on disk instead of querying Prisma or self-fetching
// an API route from here — both silently failed in this host's proxy/
// middleware execution context (Prisma's native engine doesn't load there,
// and a loopback HTTP call to the app's own port never connected either, for
// reasons that weren't observable without server log access). Plain fs reads
// have no such dependency. The file is (re)written by the admin redirects API
// on every create/update/delete — see src/lib/redirectCache.ts.
function getRedirectMap() {
  return readRedirectCacheFile();
}

const ADMIN_ROLES = ['SUPER_ADMIN', 'ADMIN', 'EDITOR'] as const;

// NextAuth v5 (Auth.js) cookie names. On HTTPS the cookie is prefixed `__Secure-`.
// getToken must be told the exact cookie name + secureCookie, otherwise it can't
// find/decrypt the session and treats every request as unauthenticated.
const useSecureCookies = process.env.NODE_ENV === 'production';
const SESSION_COOKIE = useSecureCookies
  ? '__Secure-authjs.session-token'
  : 'authjs.session-token';

function readToken(request: NextRequest) {
  return getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
    secureCookie: useSecureCookies,
    cookieName: SESSION_COOKIE,
    salt: SESSION_COOKIE,
  });
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ── DB-driven redirects ────────────────────────────────────────────────────
  const rdMap = await getRedirectMap();
  const rd = rdMap[pathname];
  if (rd) {
    return NextResponse.redirect(new URL(rd.destination, request.url), {
      status: rd.permanent ? 308 : 307,
    });
  }

  // ── Protect /admin/** ──────────────────────────────────────────────────────
  if (pathname.startsWith('/admin')) {
    const token = await readToken(request);

    if (!token) {
      const loginUrl = new URL('/auth/login', request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }

    if (!ADMIN_ROLES.includes(token.role as (typeof ADMIN_ROLES)[number])) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // ── Protect /api/admin/** ──────────────────────────────────────────────────
  if (pathname.startsWith('/api/admin')) {
    const token = await readToken(request);

    if (!token || !ADMIN_ROLES.includes(token.role as (typeof ADMIN_ROLES)[number])) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  // ── Protect /api/posts mutation methods ───────────────────────────────────
  if (
    pathname.startsWith('/api/posts') &&
    ['POST', 'PATCH', 'DELETE'].includes(request.method)
  ) {
    const token = await readToken(request);

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // All paths except static assets and the redirects-map endpoint itself
    '/((?!_next/static|_next/image|favicon\\.ico|site\\.webmanifest|api/redirects-map).*)',
  ],
};
