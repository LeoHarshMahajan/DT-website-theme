'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * useInView Hook
 * Detects when an element becomes visible in the viewport
 */
export interface UseInViewOptions {
  threshold?: number | number[];
  once?: boolean;
  margin?: string;
}

export function useInView(
  options: UseInViewOptions = { threshold: 0.15, once: true }
): [React.RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        if (options.once && ref.current) {
          observer.unobserve(ref.current);
        }
      } else if (!options.once) {
        setInView(false);
      }
    }, {
      threshold: options.threshold || 0.15,
      rootMargin: options.margin || '0px',
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [options]);

  return [ref, inView];
}

/**
 * Easing functions for animations
 */
export const easings = {
  linear: (t: number) => t,
  easeInQuad: (t: number) => t * t,
  easeOutQuad: (t: number) => t * (2 - t),
  easeInOutQuad: (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
  easeOutCubic: (t: number) => {
    const x = t - 1;
    return x * x * x + 1;
  },
  easeInOutCubic: (t: number) =>
    t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * (t - 2)) * (2 * (t - 2)) + 1,
};

/**
 * AnimatedCounter - counts from 0 to targetValue
 */
export function animateNumber(
  targetValue: number,
  duration: number = 1000,
  easing: (t: number) => number = easings.easeOutCubic,
  onUpdate: (value: number) => void
): () => void {
  const startTime = Date.now();
  let animationId: number;

  const animate = () => {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easing(progress);
    const currentValue = Math.round(targetValue * easedProgress);

    onUpdate(currentValue);

    if (progress < 1) {
      animationId = requestAnimationFrame(animate);
    }
  };

  animationId = requestAnimationFrame(animate);

  return () => cancelAnimationFrame(animationId);
}

/**
 * Stagger animation delay calculator
 */
export function getStaggerDelay(index: number, baseDelay: number = 0.05) {
  return index * baseDelay;
}

/**
 * Get animation variants for Framer Motion
 */
export const animationVariants = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  slideUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
  slideDown: {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  },
  slideLeft: {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
  },
  slideRight: {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  },
};
