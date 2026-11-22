// Fixed-window, per-IP, in-process limiter. Hostinger runs one long-lived Node
// process, so a Map is enough. ponytail: move to Redis/DB only if we ever run
// more than one instance.
const windows = new Map<string, { count: number; resetAt: number }>();

export function clientIp(headers: Headers): string {
  return headers.get('x-forwarded-for')?.split(',')[0]?.trim() || headers.get('x-real-ip') || 'unknown';
}

/** Returns null if allowed, or a 429 Response if the caller is over the limit. */
export function rateLimit(bucket: string, headers: Headers, limit: number, windowMs: number): Response | null {
  const now = Date.now();
  const key = `${bucket}:${clientIp(headers)}`;
  const w = windows.get(key);
  if (!w || w.resetAt <= now) {
    windows.set(key, { count: 1, resetAt: now + windowMs });
    if (windows.size > 10_000) for (const [k, v] of windows) if (v.resetAt <= now) windows.delete(k);
    return null;
  }
  if (++w.count <= limit) return null;
  return Response.json(
    { error: 'Too many requests — please wait a few minutes and try again.' },
    { status: 429, headers: { 'Retry-After': String(Math.ceil((w.resetAt - now) / 1000)) } },
  );
}
