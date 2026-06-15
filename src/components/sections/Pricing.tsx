'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';

const PLANS = [
  {
    name: 'Launch',
    price: '₹1.2L',
    desc: 'For early-stage brands building their first AI growth stack.',
    features: ['2 Growth Systems', 'Dedicated strategist', 'Monthly reporting', 'WhatsApp support', 'AI content (20 pieces/mo)'],
    cta: 'Start with Launch',
    featured: false,
    href: '/contact?plan=launch',
  },
  {
    name: 'Scale',
    price: '₹3.4L',
    desc: 'For brands scaling past ₹5Cr ARR — needs the full engine.',
    features: ['5 Growth Systems', 'AI + human team', 'Weekly strategy calls', '24/7 monitoring', 'AI content (100 pieces/mo)', 'CRM automation', 'Attribution dashboard'],
    cta: 'Choose Scale',
    featured: true,
    badge: 'Most Chosen',
    href: '/contact?plan=scale',
  },
  {
    name: 'Compound',
    price: '₹6.8L',
    desc: 'For category leaders running on AI-orchestrated growth.',
    features: ['All 8 Growth Systems', 'Embedded growth team', 'Daily ops + reporting', 'Custom AI models', 'Unlimited content', 'Enterprise CRM', 'Custom attribution'],
    cta: 'Talk to us',
    featured: false,
    href: '/contact?plan=compound',
  },
];

const ENTERPRISE_FEATURES = [
  'Custom system architecture',
  'Dedicated AI infrastructure',
  'Multi-market deployment',
  'SLA-backed performance',
  'Board-level reporting',
  'Direct founder access',
];

export function Pricing({ hideHeader }: { hideHeader?: boolean } = {}) {
  const [tab, setTab] = useState<'packages' | 'enterprise'>('packages');

  return (
    <section style={{ padding: 'clamp(72px,10vw,112px) 0', backgroundColor: 'var(--bg-0)', borderTop: '1px solid var(--line)' }}>
      <div className="shell">

        {/* Header — hidden on standalone /pricing page which has its own hero */}
        {!hideHeader && (
          <div style={{ marginBottom: '48px', maxWidth: '640px' }}>
            <Reveal direction="up" delay={0.05}>
              <p style={{ fontSize: '0.68rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--brand-blue)', marginBottom: '14px' }}>
                09 · PRICING
              </p>
            </Reveal>
            <Reveal direction="up" delay={0.1}>
              <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.03em', color: 'var(--fg-0)', marginBottom: '16px' }}>
                Choose the engine,<br />
                <span style={{ color: 'var(--fg-2)' }}>not the deliverable.</span>
              </h2>
            </Reveal>
            <Reveal direction="up" delay={0.14}>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--fg-1)' }}>
                Three productized packages for D2C and emerging brands. Custom enterprise
                engagements for category leaders and global brands.
              </p>
            </Reveal>
          </div>
        )}

        {/* Tab toggle */}
        <Reveal direction="up" delay={0.16}>
          <div style={{ display: 'inline-flex', backgroundColor: 'var(--bg-2)', border: '1px solid var(--line)', borderRadius: '24px', padding: '4px', marginBottom: '40px' }}>
            {(['packages', 'enterprise'] as const).map(t => (
              <button key={t} onClick={() => setTab(t)}
                style={{
                  padding: '8px 20px', borderRadius: '20px', border: 'none',
                  cursor: 'pointer', fontSize: '0.875rem', fontWeight: '600',
                  transition: 'all 0.2s', fontFamily: 'inherit',
                  backgroundColor: tab === t ? 'var(--fg-0)' : 'transparent',
                  color: tab === t ? 'var(--bg-0)' : 'var(--fg-2)',
                }}>
                {t === 'packages' ? 'Growth packages' : 'Enterprise'}
              </button>
            ))}
          </div>
        </Reveal>

        {tab === 'packages' ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px' }} className="pricing-grid">
            {PLANS.map((plan, i) => (
              <Reveal key={plan.name} direction="up" delay={0.08 * i}>
                <div style={{
                  position: 'relative', borderRadius: '18px', padding: '32px 28px',
                  display: 'flex', flexDirection: 'column', gap: '20px', height: '100%', boxSizing: 'border-box',
                  backgroundColor: plan.featured ? 'var(--bg-2)' : 'var(--bg-1)',
                  border: `1px solid ${plan.featured ? 'rgba(139,92,246,0.4)' : 'var(--line)'}`,
                  boxShadow: plan.featured ? '0 0 40px rgba(139,92,246,0.1)' : 'none',
                }}>
                  {plan.badge && (
                    <div style={{
                      position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)',
                      padding: '4px 14px', borderRadius: '20px',
                      background: 'linear-gradient(135deg, #4b6bff, #c026d3)',
                      fontSize: '0.7rem', fontWeight: '700', color: 'white', whiteSpace: 'nowrap',
                    }}>
                      {plan.badge}
                    </div>
                  )}

                  <div>
                    <p style={{ fontWeight: '700', fontSize: '1.2rem', color: 'var(--fg-0)', marginBottom: '6px' }}>{plan.name}</p>
                    <p style={{ fontSize: '0.85rem', color: 'var(--fg-2)', lineHeight: 1.5 }}>{plan.desc}</p>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                    <span style={{ fontSize: '2.4rem', fontWeight: '800', color: 'var(--brand-blue)', letterSpacing: '-0.04em' }}>{plan.price}</span>
                    <span style={{ fontSize: '0.875rem', color: 'var(--fg-3)', fontWeight: '500' }}>/mo</span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flexGrow: 1 }}>
                    {plan.features.map(f => (
                      <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '16px', height: '16px', borderRadius: '50%', flexShrink: 0,
                          backgroundColor: 'rgba(75,107,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                            <path d="M1 4l2 2 4-4" stroke="#4b6bff" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <span style={{ fontSize: '0.82rem', color: 'var(--fg-1)' }}>{f}</span>
                      </div>
                    ))}
                  </div>

                  <Link href={plan.href}
                    style={{
                      display: 'block', textAlign: 'center', padding: '13px',
                      borderRadius: '999px', fontWeight: '600', fontSize: '0.9rem',
                      textDecoration: 'none', transition: 'all 0.2s',
                      ...(plan.featured
                        ? { background: 'linear-gradient(135deg, #4b6bff, #c026d3)', color: 'white' }
                        : { backgroundColor: 'var(--bg-3)', border: '1px solid var(--line)', color: 'var(--fg-0)' }),
                    }}
                    onMouseEnter={(e) => { if (!plan.featured) e.currentTarget.style.borderColor = 'var(--brand-blue)'; else e.currentTarget.style.opacity = '0.88'; }}
                    onMouseLeave={(e) => { if (!plan.featured) e.currentTarget.style.borderColor = 'var(--line)'; else e.currentTarget.style.opacity = '1'; }}>
                    {plan.cta}
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal direction="up" delay={0.1}>
            <div style={{
              backgroundColor: 'var(--bg-1)', border: '1px solid var(--line)', borderRadius: '20px', padding: '48px',
              display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center',
            }} className="ent-grid">
              <div>
                <h3 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: '700', letterSpacing: '-0.025em', color: 'var(--fg-0)', marginBottom: '16px' }}>
                  Custom engagement.<br />Category-defining results.
                </h3>
                <p style={{ fontSize: '1rem', lineHeight: 1.7, color: 'var(--fg-2)', marginBottom: '28px' }}>
                  For brands doing ₹50Cr+ ARR or operating across multiple markets. We build a bespoke growth architecture — staffed, operated, and scaled by DT.
                </p>
                <Link href="/contact?plan=enterprise"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px',
                    padding: '13px 24px', borderRadius: '999px',
                    background: 'linear-gradient(135deg, #4b6bff, #8b5cf6)',
                    color: 'white', fontWeight: '600', fontSize: '0.9rem', textDecoration: 'none' }}>
                  Talk to us →
                </Link>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {ENTERPRISE_FEATURES.map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 16px', borderRadius: '10px', backgroundColor: 'var(--bg-2)', border: '1px solid var(--line)' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--brand-blue)', flexShrink: 0 }} />
                    <span style={{ fontSize: '0.875rem', color: 'var(--fg-1)', fontWeight: '500' }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        )}

      </div>
      <style>{`
        @media (max-width: 900px) { .pricing-grid { grid-template-columns: 1fr !important; } }
        @media (min-width: 560px) and (max-width: 900px) { .pricing-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 700px) { .ent-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
