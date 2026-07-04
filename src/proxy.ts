/**
 * Next.js 16 Proxy — Route Protection & Security
 *
 * Next.js 16 renamed middleware.ts to proxy.ts. This file MUST be named proxy.ts.
 * It runs on the Edge runtime on every matching request.
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// ── Redirect map cache (5-min TTL) ────────────────────────────────────────────
let rdCache: Record<string, { destination: string; permanent: boolean }> | null = null;
let rdExpiry = 0;

async function getRedirectMap(origin: string): Promise<Record<string, { destination: string; permanent: boolean }>> {
  if (rdCache && Date.now() < rdExpiry) return rdCache;
  try {
    const res = await fetch(`${origin}/api/redirects-map`, { cache: 'no-store' });
    if (res.ok) {
      rdCache = await res.json();
      rdExpiry = Date.now() + 5 * 60 * 1000;
    }
  } catch { /* ignore — return stale or empty */ }
  return rdCache ?? {};
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
  const origin = `${request.nextUrl.protocol}//${request.nextUrl.host}`;
  const rdMap = await getRedirectMap(origin);
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
