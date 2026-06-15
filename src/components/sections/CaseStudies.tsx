'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';

const CASES = [
  {
    id: 'portronics',
    num: '01',
    name: 'Portronics',
    industry: 'Consumer Tech · D2C',
    tag: 'Consumer Tech · D2C',
    headline: 'Re-engineered performance growth across Meta, Google, Amazon — and built an AI creative engine.',
    desc: 'Replaced fragmented agency stack with a unified AI-orchestrated growth system. 14 ad variants per launch, server-side tracking, and a creative model that learns from every result.',
    tags: ['Performance', 'AI Creative', 'Marketplace', 'Amazon SEO'],
    metrics: [
      { value: '+4.2×', label: 'Blended ROAS', color: '#4b6bff' },
      { value: '−41%', label: 'CAC',           color: '#c026d3' },
      { value: '2.8×',  label: 'Revenue, 6 mo', color: '#4b6bff' },
    ],
    chartBars: [30, 38, 42, 50, 62, 70, 80, 95],
  },
  {
    id: 'kajaria',
    num: '02',
    name: 'Kajaria',
    industry: 'Building Materials · Enterprise',
    tag: 'Building Materials · Enterprise',
    headline: 'Built an AI content engine that dominates category search — 312% organic growth in 9 months.',
    desc: 'Full-funnel SEO + AEO strategy targeting product, brand, and comparison keywords. Combined with programmatic content at scale and GEO targeting for dealer networks.',
    tags: ['Organic SEO', 'AEO', 'Content Systems', 'Dealer Marketing'],
    metrics: [
      { value: '+312%', label: 'Organic traffic',  color: '#10b981' },
      { value: '9mo',   label: 'Time to result',   color: '#4b6bff' },
      { value: '#1',    label: 'Category keywords', color: '#c026d3' },
    ],
    chartBars: [20, 25, 30, 42, 55, 70, 88, 110],
  },
  {
    id: 'ofis-square',
    num: '03',
    name: 'Ofis Square',
    industry: 'Coworking · B2B',
    tag: 'Coworking · B2B',
    headline: 'Replaced cold outreach with an AI-driven inbound engine — pipeline tripled without more ad spend.',
    desc: 'Built LinkedIn + content + AEO stack targeting workspace decision-makers. Automated lead qualification via WhatsApp + CRM integration. Full-stack attribution across 6 channels.',
    tags: ['B2B Content', 'LinkedIn', 'CRM Automation', 'AEO'],
    metrics: [
      { value: '3×',   label: 'Pipeline growth',  color: '#4b6bff' },
      { value: '−55%', label: 'Cost per lead',    color: '#10b981' },
      { value: '6',    label: 'Channels unified', color: '#c026d3' },
    ],
    chartBars: [25, 28, 35, 48, 58, 72, 88, 100],
  },
];

/* Simple SVG bar chart */
function BarChart({ bars }: { bars: number[] }) {
  const max = Math.max(...bars);
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', height: '80px' }}>
      {bars.map((h, i) => {
        const pct = (h / max) * 100;
        const isAfter = i >= Math.floor(bars.length / 2);
        return (
          <div key={i} style={{
            flex: 1, borderRadius: '4px 4px 0 0',
            height: `${pct}%`,
            background: isAfter
              ? 'linear-gradient(180deg, #8b5cf6, #4b6bff)'
              : 'var(--bg-3)',
            transition: 'height 0.6s ease',
          }} />
        );
      })}
    </div>
  );
}

export function CaseStudies() {
  const [active, setActive] = useState(0);
  const cs = CASES[active];

  return (
    <section style={{ padding: 'clamp(72px,10vw,112px) 0', backgroundColor: 'var(--bg-0)', borderTop: '1px solid var(--line)' }}>
      <div className="shell">

        {/* Header row */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '24px', marginBottom: '48px', flexWrap: 'wrap' }}>
          <div>
            <Reveal direction="up" delay={0.05}>
              <p style={{ fontSize: '0.68rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--brand-blue)', marginBottom: '12px' }}>
                06 · CASE STUDIES
              </p>
            </Reveal>
            <Reveal direction="up" delay={0.1}>
              <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.03em', color: 'var(--fg-0)' }}>
                Real brands.<br />
                <span style={{ color: 'var(--fg-2)' }}>Real growth math.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal direction="up" delay={0.12}>
            <Link href="/case-studies" style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              padding: '10px 18px', borderRadius: '8px',
              border: '1px solid var(--line-strong)', color: 'var(--fg-1)',
              fontSize: '0.875rem', fontWeight: '500', textDecoration: 'none',
              transition: 'all 0.2s', whiteSpace: 'nowrap', marginTop: '8px',
            }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--brand-blue)'; e.currentTarget.style.color = 'var(--brand-blue)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--line-strong)'; e.currentTarget.style.color = 'var(--fg-1)'; }}>
              All case studies
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2 6.5h9M7 3l3.5 3.5L7 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
          </Reveal>
        </div>

        {/* Tab selector */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--line)', marginBottom: '32px', gap: '0' }}>
          {CASES.map((c, i) => (
            <button key={c.id} onClick={() => setActive(i)}
              style={{
                flex: 1, padding: '16px 20px', textAlign: 'left', border: 'none',
                cursor: 'pointer', backgroundColor: 'transparent',
                borderBottom: `2px solid ${i === active ? 'var(--brand-blue)' : 'transparent'}`,
                marginBottom: '-1px', transition: 'all 0.2s',
              }}>
              <p style={{ fontSize: '0.65rem', color: 'var(--fg-3)', marginBottom: '4px', fontWeight: '600' }}>{c.num}</p>
              <p style={{ fontWeight: '700', fontSize: '0.95rem', color: i === active ? 'var(--fg-0)' : 'var(--fg-2)', lineHeight: 1.2 }}>{c.name}</p>
              <p style={{ fontSize: '0.75rem', color: 'var(--fg-3)', marginTop: '2px' }}>{c.industry}</p>
            </button>
          ))}
        </div>

        {/* Case study card */}
        <div key={cs.id} style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px',
          backgroundColor: 'var(--bg-1)', border: '1px solid var(--line)',
          borderRadius: '20px', padding: 'clamp(28px, 4vw, 44px)',
          animation: 'fadeSlide 0.3s ease',
        }} className="cs-card">

          {/* Left */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '24px' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '5px 12px', borderRadius: '20px', backgroundColor: 'var(--bg-3)', border: '1px solid var(--line)', marginBottom: '20px' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#4b6bff' }} />
                <span style={{ fontSize: '0.72rem', color: 'var(--fg-2)', fontWeight: '500' }}>{cs.tag}</span>
              </div>
              <h3 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.75rem)', fontWeight: '800', lineHeight: 1.2, letterSpacing: '-0.025em', color: 'var(--fg-0)', marginBottom: '16px' }}>
                {cs.headline}
              </h3>
              <p style={{ fontSize: '0.875rem', lineHeight: 1.7, color: 'var(--fg-2)', marginBottom: '20px' }}>{cs.desc}</p>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {cs.tags.map(t => (
                <span key={t} style={{ fontSize: '0.72rem', fontWeight: '500', padding: '4px 10px', borderRadius: '4px', backgroundColor: 'var(--bg-3)', border: '1px solid var(--line)', color: 'var(--fg-2)' }}>{t}</span>
              ))}
            </div>
          </div>

          {/* Right — metrics dashboard */}
          <div style={{ backgroundColor: 'var(--bg-2)', borderRadius: '14px', border: '1px solid var(--line)', overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ fontSize: '0.6rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--fg-3)', marginBottom: '2px' }}>
                  {cs.name.toUpperCase()} · BEFORE VS AFTER
                </p>
                <p style={{ fontSize: '0.78rem', fontWeight: '600', color: 'var(--fg-1)' }}>Last 6 months</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '4px 10px', borderRadius: '20px', backgroundColor: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10b981', animation: 'pulse-dot 2s ease infinite' }} />
                <span style={{ fontSize: '0.7rem', fontWeight: '600', color: '#10b981' }}>Live</span>
              </div>
            </div>

            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Metric chips */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '10px' }}>
                {cs.metrics.map(m => (
                  <div key={m.label} style={{ backgroundColor: 'var(--bg-3)', borderRadius: '10px', padding: '12px' }}>
                    <p style={{ fontSize: '1.3rem', fontWeight: '800', color: m.color, letterSpacing: '-0.03em', lineHeight: 1 }}>{m.value}</p>
                    <p style={{ fontSize: '0.68rem', color: 'var(--fg-3)', marginTop: '4px' }}>{m.label}</p>
                  </div>
                ))}
              </div>

              {/* Bar chart */}
              <div>
                <BarChart bars={cs.chartBars} />
                <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <div style={{ width: '10px', height: '3px', backgroundColor: 'var(--bg-3)', borderRadius: '2px' }} />
                    <span style={{ fontSize: '0.65rem', color: 'var(--fg-3)' }}>Before DT</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <div style={{ width: '10px', height: '3px', background: 'linear-gradient(90deg, #8b5cf6, #4b6bff)', borderRadius: '2px' }} />
                    <span style={{ fontSize: '0.65rem', color: 'var(--fg-3)' }}>After DT</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        @keyframes fadeSlide { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
        @keyframes pulse-dot { 0%,100% { opacity:1; } 50% { opacity:0.4; } }
        @media (max-width: 768px) { .cs-card { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
