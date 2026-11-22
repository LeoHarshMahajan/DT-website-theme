// Gives every H2 a stable id (keeping any the engine already set) and returns
// the table of contents. Runs at render time, so posts written before the
// engine emitted ids get anchors and a TOC too.
export type TocItem = { id: string; text: string };

const slug = (s: string) =>
  s.toLowerCase().replace(/&[a-z#0-9]+;/g, ' ').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '').slice(0, 80);

export function withHeadingIds(html: string): { html: string; toc: TocItem[] } {
  const toc: TocItem[] = [];
  const used = new Set<string>();
  const out = html.replace(/<h2([^>]*)>([\s\S]*?)<\/h2>/gi, (_m, attrs: string, inner: string) => {
    const text = inner.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').trim();
    if (!text) return _m;
    let id = attrs.match(/\sid="([^"]+)"/i)?.[1] || slug(text) || `section-${toc.length + 1}`;
    while (used.has(id)) id = `${id}-${toc.length + 1}`;
    used.add(id);
    toc.push({ id, text });
    return `<h2${attrs.replace(/\sid="[^"]*"/i, '')} id="${id}">${inner}</h2>`;
  });
  return { html: out, toc };
}

export function readingMinutes(html: string): number {
  const words = html.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}
