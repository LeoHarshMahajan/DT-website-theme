/**
 * NextAuth API Route Handler
 * Delegates to the shared auth instance so handlers are created exactly once.
 */

import { handlers } from '@/lib/auth';

export const { GET, POST } = handlers;
