'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';

const SYSTEMS = [
  {
    id: 'organic',
    href: '/solutions/organic-growth',
    eyebrow: 'SEO · AEO · GEO',
    category: 'ORGANIC GROWTH',
    title: 'Organic Growth',
    desc: 'Win Google, ChatGPT, Perplexity, and Gemini. Built for AI-first discovery.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="8.5" cy="8.5" r="5.5" stroke="currentColor" strokeWidth="1.6"/>
        <path d="M13 13l3.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
      </svg>
    ),
    tags: ['Shopify SEO', 'Programmatic SEO', 'AEO', 'GEO', 'International SEO'],
    metric: '+312% organic / 9mo',
    featured: false,
  },
  {
    id: 'performance',
    href: '/solutions/performance',
    eyebrow: 'PAID ACQUISITION',
    category: 'PERFORMANCE GROWTH',
    title: 'Performance Growth',
    desc: 'Meta, Google, YouTube, Amazon — engineered for ROAS, not impressions.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.6"/>
        <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.6"/>
        <circle cx="10" cy="10" r="1" fill="currentColor"/>
      </svg>
    ),
    tags: ['Meta Ads', 'Google Ads', 'Creative Strategy', 'CAC Optimization'],
    metric: '4.8× blended ROAS',
    featured: false,
  },
  {
    id: 'ai',
    href: '/solutions/ai-automation',
    eyebrow: 'MARKETING INTELLIGENCE',
    category: 'AI & AUTOMATION',
    title: 'AI & Automation',
    desc: 'AI systems that research, write, plan, optimize — wired into your stack.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 3v3M10 14v3M3 10h3M14 10h3M5.05 5.05l2.12 2.12M12.83 12.83l2.12 2.12M14.95 5.05l-2.12 2.12M7.17 12.83l-2.12 2.12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
        <circle cx="10" cy="10" r="2.5" fill="currentColor" opacity="0.8"/>
      </svg>
    ),
    tags: ['AI Systems', 'Workflows', 'Martech Stack', 'Chatbots', 'AI Research'],
    metric: '120hr/mo saved per brand',
    featured: true,
  },
  {
    id: 'content',
    href: '/solutions/content-social',
    eyebrow: 'ATTENTION SYSTEMS',
    category: 'CONTENT & SOCIAL',
    title: 'Content & Social',
    desc: 'Reels, founder branding, UGC, creator engines — built to compound.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M7 4l9 6-9 6V4z" fill="currentColor" opacity="0.9"/>
      </svg>
    ),
    tags: ['Reels', 'Founder Branding', 'UGC', 'Influencer'],
    metric: '8.4M+ monthly reach',
    featured: false,
  },
  {
    id: 'analytics',
    href: '/solutions/analytics',
    eyebrow: 'DATA & INTELLIGENCE',
    category: 'ANALYTICS',
    title: 'Analytics & BI',
    desc: 'Real-time dashboards, attribution models, and predictive growth signals.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M3 15l4-5 3 3 4-6 3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    tags: ['Dashboards', 'Attribution', 'Forecasting', 'Cohort Analysis'],
    metric: '360° growth visibility',
    featured: false,
  },
  {
    id: 'lifecycle',
    href: '/solutions/retention',
    eyebrow: 'RETENTION & CRM',
    category: 'LIFECYCLE',
    title: 'Lifecycle & CRM',
    desc: 'Email, WhatsApp, and CRM flows that convert, retain, and reactivate.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M3 5h14v10a1 1 0 01-1 1H4a1 1 0 01-1-1V5z" stroke="currentColor" strokeWidth="1.6"/>
        <path d="M3 5l7 6 7-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
      </svg>
    ),
    tags: ['Email Flows', 'WhatsApp CRM', 'Reactivation', 'LTV Optimization'],
    metric: '3.2× customer LTV',
    featured: false,
  },
  {
    id: 'creative',
    href: '/solutions/brand-creative',
    eyebrow: 'BRAND & DESIGN',
    category: 'CREATIVE SYSTEMS',
    title: 'Creative Systems',
    desc: 'Ad creatives, brand assets, and video — produced at scale by AI.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M4 16l4-1 8-8a1.41 1.41 0 00-2-2L6 13l-2 3z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    tags: ['Ad Creatives', 'Motion Design', 'Brand Kit', 'A/B Variants'],
    metric: '60+ creatives / week',
    featured: false,
  },
];

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M2 12L12 2M12 2H5M12 2v7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export function SystemsGrid() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section style={{ padding: 'clamp(72px, 10vw, 112px) 0', backgroundColor: 'var(--bg-0)', overflow: 'hidden' }}>
      <div className="shell">

        {/* Header */}
        <div style={{ marginBottom: '52px', maxWidth: '680px' }}>
          <Reveal direction="up" delay={0.05}>
            <p style={{ fontSize: '0.68rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--brand-blue)', marginBottom: '14px' }}>
              US · GROWTH SYSTEMS
            </p>
          </Reveal>
          <Reveal direction="up" delay={0.12}>
            <h2 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 700, lineHeight: 1.08, letterSpacing: '-0.03em', marginBottom: '20px', color: 'var(--fg-0)' }}>
              Seven systems.<br />
              <span style={{ color: 'var(--fg-2)' }}>One growth engine.</span>
            </h2>
          </Reveal>
          <Reveal direction="up" delay={0.18}>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--fg-1)', maxWidth: '580px' }}>
              Each system is plug-and-play and outcome-linked. Engage one — or wire them
              together for compounding leverage across acquisition, retention, and intelligence.
            </p>
          </Reveal>
        </div>

        {/* Horizontal scroll cards */}
        <div
          ref={scrollRef}
          style={{
            display: 'flex', gap: '16px',
            overflowX: 'auto', paddingBottom: '16px',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            cursor: 'grab',
            userSelect: 'none',
          }}
        >
          {SYSTEMS.map((sys, i) => (
            <Link
              key={sys.id}
              href={sys.href}
              style={{
                flexShrink: 0,
                width: 'clamp(240px, 26vw, 290px)',
                borderRadius: '16px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '0',
                cursor: 'pointer',
                textDecoration: 'none',
                transition: 'all 0.25s ease',
                border: '1px solid',
                ...(sys.featured
                  ? {
                      background: 'linear-gradient(145deg, rgba(99,102,241,0.35) 0%, rgba(139,92,246,0.2) 50%, rgba(75,107,255,0.15) 100%)',
                      borderColor: 'rgba(139,92,246,0.4)',
                      boxShadow: '0 0 60px rgba(99,102,241,0.15)',
                    }
                  : {
                      backgroundColor: 'var(--bg-2)',
                      borderColor: 'var(--line)',
                    }),
              }}
              onMouseEnter={(e) => {
                if (!sys.featured) {
                  e.currentTarget.style.borderColor = 'rgba(75,107,255,0.3)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.2)';
                }
              }}
              onMouseLeave={(e) => {
                if (!sys.featured) {
                  e.currentTarget.style.borderColor = 'var(--line)';
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = 'none';
                }
              }}
            >
              {/* Top row: icon + arrow */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div style={{
                  width: '40px', height: '40px', borderRadius: '10px',
                  backgroundColor: sys.featured ? 'rgba(99,102,241,0.4)' : 'var(--bg-3)',
                  border: `1px solid ${sys.featured ? 'rgba(139,92,246,0.5)' : 'var(--line)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: sys.featured ? 'white' : 'var(--fg-2)',
                }}>
                  {sys.icon}
                </div>
                <div style={{ color: sys.featured ? 'rgba(255,255,255,0.5)' : 'var(--fg-3)' }}>
                  <ArrowIcon />
                </div>
              </div>

              {/* Eyebrow */}
              <p style={{
                fontSize: '0.6rem', fontWeight: '700', textTransform: 'uppercase',
                letterSpacing: '0.08em', marginBottom: '8px',
                color: sys.featured ? 'rgba(139,92,246,0.8)' : 'var(--fg-3)',
              }}>
                {sys.eyebrow}
              </p>

              {/* Title */}
              <h3 style={{
                fontSize: '1.2rem', fontWeight: '700', color: sys.featured ? 'white' : 'var(--fg-0)',
                marginBottom: '10px', lineHeight: 1.25, letterSpacing: '-0.02em',
              }}>
                {sys.title}
              </h3>

              {/* Desc */}
              <p style={{
                fontSize: '0.85rem', lineHeight: 1.6,
                color: sys.featured ? 'rgba(255,255,255,0.6)' : 'var(--fg-2)',
                marginBottom: '18px', flexGrow: 1,
              }}>
                {sys.desc}
              </p>

              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                {sys.tags.map(tag => (
                  <span key={tag} style={{
                    fontSize: '0.68rem', fontWeight: '500', padding: '3px 8px',
                    borderRadius: '4px',
                    backgroundColor: sys.featured ? 'rgba(255,255,255,0.1)' : 'var(--bg-3)',
                    border: `1px solid ${sys.featured ? 'rgba(255,255,255,0.12)' : 'var(--line)'}`,
                    color: sys.featured ? 'rgba(255,255,255,0.7)' : 'var(--fg-2)',
                    fontFamily: 'monospace',
                  }}>
                    {tag}
                  </span>
                ))}
              </div>

              {/* Metric */}
              <div style={{ borderTop: `1px solid ${sys.featured ? 'rgba(255,255,255,0.1)' : 'var(--line)'}`, paddingTop: '16px' }}>
                <p style={{ fontSize: '0.6rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', color: sys.featured ? 'rgba(255,255,255,0.35)' : 'var(--fg-3)', marginBottom: '4px' }}>
                  TYPICAL
                </p>
                <p style={{ fontSize: '0.95rem', fontWeight: '700', color: sys.featured ? 'white' : 'var(--fg-0)', letterSpacing: '-0.01em' }}>
                  {sys.metric}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Scroll hint */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '24px' }}>
          {SYSTEMS.map((_, i) => (
            <div key={i} style={{
              width: i === 2 ? '20px' : '6px', height: '6px', borderRadius: '3px',
              backgroundColor: i === 2 ? 'var(--brand-blue)' : 'var(--bg-3)',
              transition: 'width 0.2s',
            }} />
          ))}
        </div>
      </div>

      <style>{`
        div::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
}
