// Small helpers that used to be copy-pasted across admin pages and API routes.

/** URL slug: lowercase, "&" -> "and", everything else non-alphanumeric -> "-". */
export function slugify(s: string): string {
  return s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

/** Brand CSS variable -> rgba() with the given alpha (admin status chips). */
export function rgba(varColor: string, a: number) {
  const map: Record<string, string> = {
    'var(--brand-blue)': `rgba(75,107,255,${a})`,
    'var(--brand-violet)': `rgba(139,92,246,${a})`,
    'var(--brand-magenta)': `rgba(192,38,211,${a})`,
    'var(--fg-3)': `rgba(138,138,154,${a})`,
  };
  return map[varColor] || `rgba(138,138,154,${a})`;
}
