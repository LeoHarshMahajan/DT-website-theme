import type { CSSProperties, ReactNode } from 'react';

export interface RevealProps {
  children: ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  /** false = hide again when it scrolls back below the fold */
  once?: boolean;
}

/**
 * Scroll-reveal wrapper. A plain server component: it renders fully visible,
 * so the HTML a visitor (or Google) first receives already shows the content.
 * <RevealObserver/> (mounted once in the layout) then hides only the elements
 * that start below the fold and fades them in as they arrive. The old
 * per-instance hook shipped every hero element at opacity 0 until hydration,
 * which is why the nav logo, not the headline, was the page's LCP element.
 */
export function Reveal({
  children,
  className = '',
  duration = 0.6,
  delay = 0,
  direction = 'up',
  once = true,
}: RevealProps) {
  return (
    <div
      className={`rv rv-${direction}${className ? ` ${className}` : ''}`}
      data-reveal={once ? '' : 'repeat'}
      style={{ '--rv-d': `${delay}s`, '--rv-t': `${duration}s` } as CSSProperties}
    >
      {children}
    </div>
  );
}
