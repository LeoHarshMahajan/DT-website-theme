'use client';

import React, { useState, useEffect } from 'react';
import { useInView, animateNumber, easings } from '@/lib/animations';

const METRICS = [
  { value: 312, suffix: '%', decimals: 0, label: 'Avg organic traffic growth', gradient: true },
  { value: 4.8, suffix: '×', decimals: 1, label: 'Blended ROAS across portfolio', gradient: false },
  { value: 38,  suffix: '%', decimals: 0, label: 'Avg repeat-rate lift', gradient: true },
  { value: 120, suffix: 'hr', decimals: 0, label: 'Saved per brand per month', gradient: false },
  { value: 62,  suffix: '%', decimals: 0, label: 'Avg conversion-rate lift', gradient: false },
];

function AnimatedMetric({ value, suffix, decimals, gradient }: {
  value: number;
  suffix: string;
  decimals: number;
  gradient: boolean;
}) {
  const [display, setDisplay] = useState(0);
  const [ref, inView] = useInView({ threshold: 0.3, once: true });

  useEffect(() => {
    if (!inView) return;
    const factor = decimals > 0 ? Math.pow(10, decimals) : 1;
    const cancel = animateNumber(
      Math.round(value * factor),
      1800,
      easings.easeOutCubic,
      (v) => setDisplay(decimals > 0 ? v / factor : v)
    );
    return cancel;
  }, [inView, value, decimals]);

  return (
    <div
      ref={ref}
      style={{
        fontSize: 'clamp(36px, 5vw, 64px)',
        fontWeight: 500,
        letterSpacing: '-0.03em',
        lineHeight: 1,
        background: gradient
          ? 'linear-gradient(135deg, var(--brand-blue), var(--brand-magenta))'
          : 'linear-gradient(135deg, var(--fg-0), var(--fg-2))',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}
    >
      {decimals > 0 ? display.toFixed(decimals) : Math.round(display)}{suffix}
    </div>
  );
}

export function MetricsSection() {
  return (
    <section style={{ padding: '80px 0', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
      <div className="shell">
        <div style={{
          display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
          gap: '24px', marginBottom: '56px', flexWrap: 'wrap',
        }}>
          <span style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--fg-3)' }}>
            05 · Results
          </span>
          <h2 style={{
            fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 700,
            letterSpacing: '-0.03em', lineHeight: 1.1,
            color: 'var(--fg-0)', maxWidth: '20ch',
          }}>
            The numbers that{' '}
            <span style={{
              background: 'linear-gradient(135deg, var(--brand-blue), var(--brand-magenta))',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              actually move the business.
            </span>
          </h2>
        </div>

        <div className="metrics-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', borderTop: '1px solid var(--line)' }}>
          {METRICS.map((m, i) => (
            <div
              key={i}
              style={{
                padding: '32px 24px',
                borderRight: i < METRICS.length - 1 ? '1px solid var(--line)' : 'none',
                display: 'flex', flexDirection: 'column', gap: '10px',
              }}
            >
              <AnimatedMetric {...m} />
              <div style={{ fontSize: '13px', color: 'var(--fg-2)', lineHeight: 1.4 }}>{m.label}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .metrics-row { grid-template-columns: repeat(2, 1fr) !important; }
          .metrics-row > div { border-bottom: 1px solid var(--line); }
          .metrics-row > div:nth-child(2n) { border-right: none !important; }
        }
        @media (max-width: 480px) {
          .metrics-row { grid-template-columns: 1fr !important; }
          .metrics-row > div { border-right: none !important; }
        }
      `}</style>
    </section>
  );
}
