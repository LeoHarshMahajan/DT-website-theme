import { FilterXSS, safeAttrValue, getDefaultCSSWhiteList } from 'xss';

// Every HTML body that reaches a public page goes through here: editor-written
// posts, CMS pages and AI drafts alike. Allow-list, not deny-list: a regex
// stripper misses entity-encoded `javascript:` URLs, `data:` URLs, SVG
// payloads and the like.
//
// Library choice: js-xss, not sanitize-html. sanitize-html >= 2.17.7 needs
// Node >= 22.12 (ESM-only htmlparser2), and every release below that has a
// published advisory; js-xss has no engine floor and no ESM-only deps.

const GLOBAL = ['id', 'class', 'style'];
const tags: Record<string, string[]> = {};
for (const t of [
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'br', 'hr', 'blockquote', 'pre', 'code',
  'ul', 'ol', 'li', 'strong', 'b', 'em', 'i', 'u', 's', 'mark', 'sub', 'sup', 'small',
  'figure', 'figcaption', 'table', 'thead', 'tbody', 'tfoot', 'tr',
  'div', 'span', 'section', 'aside', 'nav', 'details', 'summary',
]) tags[t] = GLOBAL;
tags.a = [...GLOBAL, 'href', 'title', 'target', 'rel'];
tags.img = [...GLOBAL, 'src', 'alt', 'title', 'width', 'height', 'loading'];
tags.iframe = ['src', 'width', 'height', 'title', 'allow', 'allowfullscreen', 'frameborder'];
tags.th = [...GLOBAL, 'colspan', 'rowspan', 'scope'];
tags.td = [...GLOBAL, 'colspan', 'rowspan'];

// Embeds only from the video hosts the editor actually uses.
const IFRAME_HOSTS = /^https:\/\/(www\.youtube\.com|www\.youtube-nocookie\.com|player\.vimeo\.com)\//i;

const css = getDefaultCSSWhiteList() as unknown as Record<string, boolean>;
for (const k of Object.keys(css)) css[k] = false;
Object.assign(css, { 'text-align': true, color: true, 'background-color': true });

const filter = new FilterXSS({
  whiteList: tags,
  stripIgnoreTag: true, // drop unknown tags, keep their text
  stripIgnoreTagBody: ['script', 'style', 'noscript'], // drop these AND their content
  css: { whiteList: css },
  safeAttrValue(tag, name, value, cssFilter) {
    if (tag === 'iframe' && name === 'src') return IFRAME_HOSTS.test(value) ? value : '';
    if (tag === 'img' && name === 'src' && !/^https?:\/\//i.test(value.trim())) return '';
    // Default handling decodes entities first, so "jav&#x61;script:" is caught.
    return safeAttrValue(tag, name, value, cssFilter);
  },
});

// External links open in a new tab and can't reach window.opener.
function hardenExternalLinks(html: string): string {
  return html.replace(/<a\s([^>]*)>/gi, (m, attrs: string) => {
    const href = attrs.match(/href="([^"]*)"/i)?.[1] ?? '';
    if (!/^https?:\/\//i.test(href) || /^https?:\/\/(www\.)?thedigitaltriangle\.com/i.test(href)) return m;
    const rest = attrs.replace(/\s*(target|rel)="[^"]*"/gi, '');
    return `<a ${rest} target="_blank" rel="noopener noreferrer">`;
  });
}

export function sanitizeHtml(html: string): string {
  return hardenExternalLinks(filter.process(html ?? ''));
}
