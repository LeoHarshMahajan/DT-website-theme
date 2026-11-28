'use client';

import { useEffect } from 'react';

/**
 * One shared IntersectionObserver for every <Reveal> on the page (there are
 * 36+ call sites). Mounted once in the layout, so it also picks up elements
 * that appear later through client-side navigation or async data.
 *
 * Only elements still below the fold get hidden, and only after hydration, so
 * nothing in view ever flashes and nothing is hidden if JavaScript fails.
 */
export function RevealObserver() {
  useEffect(() => {
    if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const el = e.target as HTMLElement;
          if (e.isIntersecting) {
            el.classList.remove('rv-pre');
            if (el.dataset.reveal !== 'repeat') io.unobserve(el);
          } else if (el.dataset.reveal === 'repeat' && e.boundingClientRect.top > 0) {
            el.classList.add('rv-pre');
          }
        }
      },
      // threshold 0 (not a ratio): an element several screens tall can never
      // be 12% visible, and would stay at opacity 0 forever.
      { threshold: 0, rootMargin: '0px 0px -6% 0px' },
    );

    const seen = new WeakSet<Element>();
    const add = (el: Element) => {
      if (seen.has(el)) return;
      seen.add(el);
      if (el.getBoundingClientRect().top > window.innerHeight) el.classList.add('rv-pre');
      io.observe(el);
    };
    const scan = (root: ParentNode) => root.querySelectorAll('[data-reveal]').forEach(add);

    scan(document);
    const mo = new MutationObserver((records) => {
      for (const r of records) {
        r.addedNodes.forEach((n) => {
          if (!(n instanceof HTMLElement)) return;
          if (n.hasAttribute('data-reveal')) add(n);
          scan(n);
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
