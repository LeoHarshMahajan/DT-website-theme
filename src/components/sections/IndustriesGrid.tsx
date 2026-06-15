'use client';

import React from 'react';
import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';

const INDUSTRIES = [
  { icon: '⚡', name: 'D2C Brands',        desc: 'Founder-led brands scaling from ₹1Cr to ₹100Cr.', href: '/industries/d2c' },
  { icon: '◈',  name: 'Ecommerce',          desc: 'Shopify, custom, marketplaces.',                   href: '/industries/ecommerce' },
  { icon: '</>',name: 'SaaS & Startups',    desc: 'Product-led growth + paid acquisition.',           href: '/industries/saas' },
  { icon: '✦',  name: 'Luxury & Lifestyle', desc: 'Premium brands across India, GCC, EU.',            href: '/industries/luxury' },
  { icon: '✏', name: 'Fashion & Beauty',   desc: 'Reels-first attention + retention systems.',       href: '/industries/fashion' },
  { icon: '⊕',  name: 'Enterprise B2B',     desc: 'Long-cycle pipelines, AEO, ABM.',                  href: '/industries/b2b' },
];

export function IndustriesGrid() {
  return (
    <section style={{ padding: 'clamp(72px,10vw,112px) 0', backgroundColor: 'var(--bg-0)', borderTop: '1px solid var(--line)' }}>
      <div className="shell">

        {/* Header */}
        <div style={{ marginBottom: '48px', maxWidth: '640px' }}>
          <Reveal direction="up" delay={0.05}>
            <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.03em', color: 'var(--fg-0)', marginBottom: '20px' }}>
              Built for modern<br />
              <span style={{ color: 'var(--fg-2)' }}>commerce categories.</span>
            </h2>
          </Reveal>
          <Reveal direction="up" delay={0.12}>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--fg-1)' }}>
              We work deepest with D2C, ecommerce, founder-led brands, and modern B2B —
              where speed, AI leverage, and unit economics matter most.
            </p>
          </Reveal>
        </div>

        {/* 3×2 grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '32px' }} className="ind-grid">
          {INDUSTRIES.map((ind, i) => (
            <Reveal key={ind.name} direction="up" delay={0.06 * i}>
              <Link href={ind.href} style={{ display: 'block', textDecoration: 'none' }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '14px',
                  padding: '20px 22px', borderRadius: '14px',
                  backgroundColor: 'var(--bg-2)', border: '1px solid var(--line)',
                  transition: 'all 0.2s', cursor: 'pointer',
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(75,107,255,0.35)'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--line)'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
                  {/* Icon */}
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '10px', flexShrink: 0,
                    backgroundColor: 'var(--bg-3)', border: '1px solid var(--line)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '16px', color: 'var(--fg-1)',
                  }}>
                    {ind.icon}
                  </div>
                  {/* Text */}
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: '700', fontSize: '0.95rem', color: 'var(--fg-0)', marginBottom: '3px', lineHeight: 1.2 }}>{ind.name}</p>
                    <p style={{ fontSize: '0.78rem', color: 'var(--fg-2)', lineHeight: 1.45 }}>{ind.desc}</p>
                  </div>
                  {/* Arrow */}
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, color: 'var(--fg-3)' }}>
                    <path d="M2 12L12 2M12 2H5M12 2v7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* CTA button */}
        <Reveal direction="up" delay={0.1}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Link href="/industries" style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              padding: '12px 24px', borderRadius: '24px',
              border: '1px solid var(--line-strong)', color: 'var(--fg-1)',
              fontSize: '0.875rem', fontWeight: '500', textDecoration: 'none',
              transition: 'all 0.2s',
            }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--brand-blue)'; e.currentTarget.style.color = 'var(--brand-blue)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--line-strong)'; e.currentTarget.style.color = 'var(--fg-1)'; }}>
              See all 12 industries
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2 6.5h9M7 3l3.5 3.5L7 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
          </div>
        </Reveal>

      </div>
      <style>{`
        @media (max-width: 900px) { .ind-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 560px) { .ind-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
