'use client';

import React from 'react';
import { Reveal } from '@/components/ui/Reveal';

const TESTIMONIALS = [
  {
    quote: 'Within 90 days they replaced three agencies and a dashboard our team hated. The AI workflow alone saves us a full headcount.',
    role: 'VP Marketing',
    company: 'Consumer Tech · D2C',
    color: '#6366f1',
  },
  {
    quote: "They don't sell services — they sell systems. Our ROAS hasn't moved below 4× in eight months, and we finally know why.",
    role: 'Founder',
    company: 'Fashion · Premium D2C',
    color: '#8b5cf6',
  },
  {
    quote: 'The AEO play was the unlock. We started showing up in ChatGPT answers and our pipeline doubled without spending more.',
    role: 'Growth Lead',
    company: 'B2B SaaS',
    color: '#c026d3',
  },
];

export function CustomerTestimonials() {
  return (
    <section style={{ padding: 'clamp(72px,10vw,112px) 0', backgroundColor: 'var(--bg-0)', borderTop: '1px solid var(--line)' }}>
      <div className="shell">

        {/* Header */}
        <div style={{ marginBottom: '52px', maxWidth: '640px' }}>
          <Reveal direction="up" delay={0.05}>
            <p style={{ fontSize: '0.68rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--brand-blue)', marginBottom: '14px' }}>
              08 · WHAT FOUNDERS SAY
            </p>
          </Reveal>
          <Reveal direction="up" delay={0.1}>
            <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.03em', color: 'var(--fg-0)' }}>
              Less agency talk.<br />
              <span style={{ color: 'var(--fg-2)' }}>More business math.</span>
            </h2>
          </Reveal>
        </div>

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px' }} className="t-grid">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={i} direction="up" delay={0.08 * i}>
              <div style={{
                backgroundColor: 'var(--bg-2)', border: '1px solid var(--line)',
                borderRadius: '18px', padding: '28px',
                display: 'flex', flexDirection: 'column', gap: '20px', height: '100%', boxSizing: 'border-box',
                transition: 'all 0.25s',
              }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${t.color}44`; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--line)'; e.currentTarget.style.transform = 'none'; }}>

                {/* Quote mark */}
                <div style={{ fontSize: '2.5rem', lineHeight: 1, color: t.color, fontFamily: 'Georgia, serif', opacity: 0.7 }}>"</div>

                {/* Quote */}
                <p style={{ fontSize: '1rem', lineHeight: 1.7, color: 'var(--fg-1)', flexGrow: 1, fontWeight: '400' }}>
                  {t.quote}
                </p>

                {/* Author */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '38px', height: '38px', borderRadius: '50%', flexShrink: 0,
                    backgroundColor: t.color,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '14px', fontWeight: '700', color: 'white',
                  }}>
                    {t.role.charAt(0)}
                  </div>
                  <div>
                    <p style={{ fontWeight: '600', fontSize: '0.875rem', color: 'var(--fg-0)', margin: 0, lineHeight: 1.3 }}>{t.role}</p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--fg-3)', margin: 0 }}>{t.company}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
      <style>{`
        @media (max-width: 900px) { .t-grid { grid-template-columns: 1fr !important; } }
        @media (min-width: 560px) and (max-width: 900px) { .t-grid { grid-template-columns: repeat(2,1fr) !important; } }
      `}</style>
    </section>
  );
}
