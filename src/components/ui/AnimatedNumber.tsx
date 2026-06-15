'use client';

import React, { useEffect, useState } from 'react';
import { useInView } from '@/lib/animations';
import { animateNumber, easings } from '@/lib/animations';

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  easing?: (t: number) => number;
  suffix?: string;
  prefix?: string;
  className?: string;
  threshold?: number;
}

export function AnimatedNumber({
  value,
  duration = 2000,
  easing: easingFn = easings.easeOutCubic,
  suffix = '',
  prefix = '',
  className = '',
  threshold = 0.5,
}: AnimatedNumberProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const [ref, inView] = useInView({ threshold, once: true });

  useEffect(() => {
    if (!inView) return;

    let cancel: (() => void) | null = null;

    // Small delay to allow animation to be visible
    const timeout = setTimeout(() => {
      cancel = animateNumber(value, duration, easingFn, setDisplayValue);
    }, 100);

    return () => {
      clearTimeout(timeout);
      if (cancel) cancel();
    };
  }, [inView, value, duration, easingFn]);

  return (
    <div ref={ref} className={className}>
      {prefix}
      {displayValue.toLocaleString()}
      {suffix}
    </div>
  );
}
