/**
 * NextAuth API Route Handler
 * Delegates to the shared auth instance so handlers are created exactly once.
 */

export { handlers as GET, handlers as POST } from '@/lib/auth';
