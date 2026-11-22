import sanitize from 'sanitize-html';

// Every HTML body that reaches a public page goes through here: editor-written
// posts, CMS pages and AI drafts alike. Allow-list, not deny-list: a regex
// stripper misses entity-encoded `javascript:` URLs, `data:` URLs, SVG
// payloads and the like.
const OPTIONS: sanitize.IOptions = {
  allowedTags: [
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'br', 'hr', 'blockquote', 'pre', 'code',
    'ul', 'ol', 'li', 'strong', 'b', 'em', 'i', 'u', 's', 'mark', 'sub', 'sup', 'small',
    'a', 'img', 'figure', 'figcaption', 'table', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td',
    'div', 'span', 'section', 'aside', 'nav', 'details', 'summary', 'iframe',
  ],
  allowedAttributes: {
    '*': ['id', 'class', 'style'],
    a: ['href', 'title', 'target', 'rel'],
    img: ['src', 'alt', 'title', 'width', 'height', 'loading'],
    iframe: ['src', 'width', 'height', 'title', 'allow', 'allowfullscreen', 'frameborder'],
    th: ['colspan', 'rowspan', 'scope'],
    td: ['colspan', 'rowspan'],
  },
  allowedSchemes: ['http', 'https', 'mailto', 'tel'],
  allowedSchemesByTag: { img: ['http', 'https'] },
  // Embeds only from video hosts the editor actually uses.
  allowedIframeHostnames: ['www.youtube.com', 'www.youtube-nocookie.com', 'player.vimeo.com'],
  allowedStyles: {
    '*': {
      'text-align': [/^(left|right|center|justify)$/],
      color: [/^#[0-9a-f]{3,8}$/i, /^rgb\(/i, /^var\(--[a-z0-9-]+\)$/i],
      'background-color': [/^#[0-9a-f]{3,8}$/i, /^rgb\(/i, /^var\(--[a-z0-9-]+\)$/i],
    },
  },
  transformTags: {
    // External links open in a new tab and can't reach window.opener.
    a: (tagName, attribs) => {
      const external = /^https?:\/\//i.test(attribs.href ?? '') && !/thedigitaltriangle\.com/i.test(attribs.href ?? '');
      return {
        tagName,
        attribs: external ? { ...attribs, target: '_blank', rel: 'noopener noreferrer' } : attribs,
      };
    },
  },
};

export function sanitizeHtml(html: string): string {
  return sanitize(html ?? '', OPTIONS);
}
