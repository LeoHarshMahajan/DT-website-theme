'use client';

import { useEffect } from 'react';

/**
 * Cursor-follow light on cards: one passive pointermove listener for the whole
 * page sets --gx/--gy on whichever .card / [data-glow] is under the cursor
 * (the glow itself is pure CSS). Desktop pointers only; off for reduced motion.
 */
export function PointerFx() {
  useEffect(() => {
    if (!matchMedia('(hover: hover) and (pointer: fine)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      const card = (e.target as Element | null)?.closest<HTMLElement>('.card, [data-glow]');
      if (!card) return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--gx', `${e.clientX - r.left}px`);
        card.style.setProperty('--gy', `${e.clientY - r.top}px`);
      });
    };
    document.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      document.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);
  return null;
}
