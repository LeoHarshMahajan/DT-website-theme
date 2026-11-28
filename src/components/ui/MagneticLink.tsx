'use client';

import Link from 'next/link';
import { useRef, type ComponentProps } from 'react';

/** A <Link> that leans a few pixels toward the cursor. Fine pointers only. */
export function MagneticLink({ children, className = '', ...props }: ComponentProps<typeof Link>) {
  const ref = useRef<HTMLAnchorElement>(null);
  const enabled = () =>
    matchMedia('(hover: hover) and (pointer: fine)').matches && !matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <Link
      ref={ref}
      className={`magnetic ${className}`}
      onPointerMove={(e) => {
        if (!enabled() || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * 0.18;
        const y = (e.clientY - r.top - r.height / 2) * 0.3;
        ref.current.style.transform = `translate(${x}px, ${y}px)`;
      }}
      onPointerLeave={() => {
        if (ref.current) ref.current.style.transform = '';
      }}
      {...props}
    >
      {children}
    </Link>
  );
}
