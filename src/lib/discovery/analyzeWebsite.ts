// Fetches a visitor's site and extracts cheap, high-signal gaps. Regex over
// raw HTML — ponytail: no cheerio dep for a handful of tag lookups.
export type WebsiteAnalysis = {
  url: string;
  title: string | null;
  metaDescription: string | null;
  h1Count: number;
  hasSchema: boolean;
  hasGA4: boolean;
  hasMetaPixel: boolean;
  wordCount: number;
  gaps: string[];
};

function normalizeUrl(input: string): string {
  const trimmed = input.trim();
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

export async function analyzeWebsite(input: string): Promise<WebsiteAnalysis> {
  const url = normalizeUrl(input);
  const res = await fetch(url, {
    redirect: 'follow',
    signal: AbortSignal.timeout(8000),
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; DTDiscoveryBot/1.0)' },
  });
  const html = await res.text();

  const title = html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1]?.trim() ?? null;
  const metaDescription =
    html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i)?.[1]?.trim() ?? null;
  const h1Count = (html.match(/<h1[\s>]/gi) ?? []).length;
  const hasSchema = /application\/ld\+json/i.test(html);
  const hasGA4 = /gtag\(|googletagmanager\.com\/gtag|G-[A-Z0-9]{6,}/i.test(html);
  const hasMetaPixel = /fbq\(|connect\.facebook\.net\/.*\/fbevents/i.test(html);
  const wordCount = html.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;

  const gaps: string[] = [];
  if (!title) gaps.push('No <title> tag — a real SEO basic missing entirely.');
  if (!metaDescription) gaps.push('No meta description — search snippets are auto-generated and weak.');
  if (h1Count === 0) gaps.push('No H1 on the page — search engines can\'t tell what it\'s about.');
  if (h1Count > 1) gaps.push(`${h1Count} H1 tags on one page — dilutes topical relevance.`);
  if (!hasSchema) gaps.push('No structured data (schema.org) — missing rich results in search.');
  if (!hasGA4) gaps.push('No GA4 tracking detected — can\'t measure what\'s working.');
  if (!hasMetaPixel) gaps.push('No Meta Pixel detected — paid social can\'t retarget or optimize.');
  if (wordCount < 300) gaps.push('Thin content on this page — under 300 words of visible text.');

  return { url, title, metaDescription, h1Count, hasSchema, hasGA4, hasMetaPixel, wordCount, gaps };
}
