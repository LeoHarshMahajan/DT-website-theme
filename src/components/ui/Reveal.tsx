'use client';

import React, { ReactNode } from 'react';
import { useInView } from '@/lib/animations';

export interface RevealProps {
  children: ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  once?: boolean;
  threshold?: number;
}

export function Reveal({
  children,
  className = '',
  duration = 0.6,
  delay = 0,
  direction = 'up',
  once = true,
  threshold = 0.12,
}: RevealProps) {
  const [ref, inView] = useInView({ threshold, once });

  const getTransform = () => {
    if (!inView) {
      if (direction === 'up')    return 'translateY(24px)';
      if (direction === 'down')  return 'translateY(-24px)';
      if (direction === 'left')  return 'translateX(24px)';
      if (direction === 'right') return 'translateX(-24px)';
    }
    return 'none';
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: getTransform(),
        transition: `opacity ${duration}s cubic-bezier(0.4,0,0.2,1) ${delay}s, transform ${duration}s cubic-bezier(0.4,0,0.2,1) ${delay}s`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
}
