/**
 * Next.js 16 Proxy — Route Protection & Security
 *
 * Next.js 16 renamed middleware.ts to proxy.ts. This file MUST be named proxy.ts.
 * It runs on the Edge runtime on every matching request.
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

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
  matcher: ['/admin/:path*', '/api/admin/:path*', '/api/posts', '/api/posts/:path*'],
};
