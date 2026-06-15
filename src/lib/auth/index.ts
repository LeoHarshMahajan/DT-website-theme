/**
 * NextAuth v5 — central auth export
 *
 * Import `auth`, `signIn`, `signOut` from here in server components / server actions.
 * Client components should import `signIn`/`signOut` from `next-auth/react` instead.
 *
 * The route handler (GET / POST) lives at:
 *   src/app/api/auth/[...nextauth]/route.ts
 */

import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

export const { auth, handlers, signIn, signOut } = NextAuth(authConfig);
