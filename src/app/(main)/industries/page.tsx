import { Metadata } from 'next';
import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Industries',
  description: 'Digital Triangle builds AI-powered growth systems for D2C brands, ecommerce, SaaS, fashion, luxury, and B2B companies.',
};

const INDUSTRIES = [
  {
    icon: '⚡',
    name: 'D2C Brands',
    tagline: 'From ₹1Cr to ₹100Cr.',
    desc: 'Founder-led brands scaling DTC need a full-funnel engine: paid acquisition, SEO, retention, and creative systems that don\'t require an army of agencies.',
    href: '/contact',
    metrics: ['4.2× avg ROAS', '−40% CAC', '3× revenue in 9mo'],
    color: '#4b6bff',
  },
  {
    icon: '◈',
    name: 'Ecommerce',
    tagline: 'Shopify, custom, marketplaces.',
    desc: 'Multi-channel ecommerce brands need unified attribution, marketplace SEO, and creative systems that can keep pace with product launches.',
    href: '/contact',
    metrics: ['Amazon SEO dominance', 'Unified attribution', 'AI creative at scale'],
    color: '#8b5cf6',
  },
  {
    icon: '</>',
    name: 'SaaS & Startups',
    tagline: 'Product-led growth + paid acquisition.',
    desc: 'SaaS companies need a combination of AEO (Answer Engine Optimisation), content systems, LinkedIn B2B reach, and performance loops to grow MRR efficiently.',
    href: '/contact',
    metrics: ['AEO for AI visibility', 'Pipeline systems', 'CAC efficiency'],
    color: '#c026d3',
  },
  {
    icon: '✦',
    name: 'Luxury & Lifestyle',
    tagline: 'Premium brands across India, GCC, EU.',
    desc: 'Luxury brands need growth without compromising brand equity. Precision targeting, curated content, and attribution that accounts for long sales cycles.',
    href: '/contact',
    metrics: ['Precision targeting', 'Brand equity preserved', 'GCC + EU expansion'],
    color: '#e11d8a',
  },
  {
    icon: '✏',
    name: 'Fashion & Beauty',
    tagline: 'Reels-first attention + retention systems.',
    desc: 'Fast-moving categories need constant creative refresh, trend-aware content strategy, and retention systems that convert first-time buyers into advocates.',
    href: '/contact',
    metrics: ['60+ creatives/week', 'Reels strategy', '38% repeat purchase'],
    color: '#f59e0b',
  },
  {
    icon: '⊕',
    name: 'Enterprise B2B',
    tagline: 'Long-cycle pipelines, AEO, ABM.',
    desc: 'B2B brands with long sales cycles need a different playbook: AEO to win AI answer engines, ABM for high-value accounts, and content that educates at every stage.',
    href: '/contact',
    metrics: ['AEO + ABM', 'Pipeline tripled', '−55% cost per lead'],
    color: '#10b981',
  },
  {
    icon: '🏥',
    name: 'Healthcare & Edtech',
    tagline: 'Trust-first content + compliant growth.',
    desc: 'Regulated industries need growth frameworks that comply with advertising guidelines while still building organic reach and conversion at scale.',
    href: '/contact',
    metrics: ['Compliant growth', 'Organic-first', 'Trust building'],
    color: '#06b6d4',
  },
  {
    icon: '🏦',
    name: 'Fintech & BFSI',
    tagline: 'Regulated yet fast-moving.',
    desc: 'Fintech brands compete on trust and speed. We build content systems, AEO strategies, and performance stacks that respect compliance while driving rapid acquisition.',
    href: '/contact',
    metrics: ['AEO visibility', 'Trust content', 'Performance at scale'],
    color: '#6366f1',
  },
  {
    icon: '🍽',
    name: 'Food & Beverage',
    tagline: 'D2C food brands scaling on Reels + SEO.',
    desc: 'Food brands need content that makes people hungry and performance ads that close. We combine UGC systems, Reels strategy, and marketplace SEO for D2C food.',
    href: '/contact',
    metrics: ['UGC at scale', 'Reels-first', 'Marketplace SEO'],
    color: '#ef4444',
  },
  {
    icon: '🏠',
    name: 'Real Estate & Co-living',
    tagline: 'Long-cycle, high-value buyer journeys.',
    desc: 'Property brands need content that nurtures long buying cycles, AEO for intent queries, and CRM automation that keeps leads warm over months.',
    href: '/contact',
    metrics: ['AEO for property', 'CRM automation', 'Lead nurture'],
    color: '#84cc16',
  },
  {
    icon: '👗',
    name: 'Founders & Personal Brand',
    tagline: 'Turn founders into category authorities.',
    desc: 'Founder-led brands have an unfair advantage: a real person. We build LinkedIn presence, Reels strategy, and thought-leadership content that converts attention into customers.',
    href: '/contact',
    metrics: ['LinkedIn growth', 'Founder brand', 'Pipeline from content'],
    color: '#f472b6',
  },
  {
    icon: '🎮',
    name: 'Gaming & Entertainment',
    tagline: 'Community-driven growth systems.',
    desc: 'Gaming and entertainment brands live in communities. We build community management systems, creator partnerships, and performance loops tuned for high-engagement audiences.',
    href: '/contact',
    metrics: ['Community systems', 'Creator networks', 'LTV-focused'],
    color: '#a855f7',
  },
];

export default function IndustriesPage() {
  return (
    <>
      <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-0)', paddingTop: '64px' }}>

        {/* Header */}
        <section className="page-hero" style={{ padding: 'clamp(64px, 10vw, 100px) 0', borderBottom: '1px solid var(--line)' }}>
          <div className="hero-orb-l" style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.18), transparent 65%)' }} />
          <div className="hero-orb-r" style={{ background: 'radial-gradient(circle, rgba(75,107,255,0.12), transparent 65%)' }} />
          <div className="grid-bg" />
          <div className="shell" style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ maxWidth: '720px' }}>
              <Reveal direction="up" delay={0.05}>
                <span className="section-tag" style={{ color: 'var(--brand-violet)', marginBottom: '20px', display: 'inline-flex' }}>Industries</span>
              </Reveal>
              <Reveal direction="up" delay={0.1}>
                <h1 style={{ fontSize: 'clamp(2.6rem, 5.5vw, 4.2rem)', fontWeight: 800, lineHeight: 1.0, letterSpacing: '-0.035em', color: 'var(--fg-0)', marginBottom: '24px' }}>
                  Built for modern<br />
                  <span className="grad-text">commerce categories.</span>
                </h1>
              </Reveal>
              <Reveal direction="up" delay={0.15}>
                <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--fg-1)' }}>
                  We work deepest with D2C, ecommerce, founder-led brands, and modern B2B — where speed,
                  AI leverage, and unit economics matter most.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Industries grid */}
        <section style={{ padding: 'clamp(48px, 8vw, 80px) 0' }}>
          <div className="shell">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }} className="ind-full-grid">
              {INDUSTRIES.map((ind, i) => (
                <Reveal key={ind.name} direction="up" delay={0.05 * i}>
                  <Link href={ind.href} style={{ display: 'block', textDecoration: 'none', height: '100%' }}>
                    <div
                      className="ind-card"
                      style={{
                        height: '100%', backgroundColor: 'var(--bg-2)', border: '1px solid var(--line)',
                        borderRadius: '16px', padding: '28px',
                        display: 'flex', flexDirection: 'column', gap: '16px',
                        transition: 'all 0.2s', boxSizing: 'border-box',
                        '--hover-border': ind.color + '44',
                      } as React.CSSProperties}
                    >
                      {/* Icon + name */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{
                          width: '44px', height: '44px', borderRadius: '12px',
                          background: `${ind.color}18`, border: `1px solid ${ind.color}30`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: '1.1rem', flexShrink: 0,
                        }}>{ind.icon}</div>
                        <div>
                          <p style={{ fontWeight: '700', fontSize: '1rem', color: 'var(--fg-0)', margin: 0, lineHeight: 1.2 }}>{ind.name}</p>
                          <p style={{ fontSize: '0.75rem', color: 'var(--fg-3)', margin: '2px 0 0 0' }}>{ind.tagline}</p>
                        </div>
                      </div>

                      {/* Desc */}
                      <p style={{ fontSize: '0.85rem', lineHeight: 1.65, color: 'var(--fg-2)', flexGrow: 1 }}>{ind.desc}</p>

                      {/* Metrics */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', paddingTop: '16px', borderTop: '1px solid var(--line)' }}>
                        {ind.metrics.map(m => (
                          <div key={m} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: ind.color, flexShrink: 0 }} />
                            <span style={{ fontSize: '0.78rem', color: 'var(--fg-2)' }}>{m}</span>
                          </div>
                        ))}
                      </div>

                      {/* CTA */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: ind.color, fontSize: '0.82rem', fontWeight: '600' }}>
                        Let's Talk
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: 'clamp(48px, 8vw, 80px) 0', borderTop: '1px solid var(--line)', textAlign: 'center', backgroundColor: 'var(--bg-1)' }}>
          <div className="shell">
            <Reveal direction="up" delay={0.05}>
              <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 700, letterSpacing: '-0.025em', color: 'var(--fg-0)', marginBottom: '16px' }}>
                Don't see your industry?
              </h2>
              <p style={{ fontSize: '1rem', color: 'var(--fg-2)', marginBottom: '32px', maxWidth: '440px', margin: '0 auto 32px' }}>
                We've worked with 30+ brand categories. If you sell something, we've probably grown something like it.
              </p>
              <Link href="/contact" style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '14px 32px', borderRadius: '999px',
                background: 'linear-gradient(135deg, #4b6bff, #8b5cf6)',
                color: 'white', fontWeight: '600', fontSize: '1rem', textDecoration: 'none',
              }}>
                Talk to us anyway →
              </Link>
            </Reveal>
          </div>
        </section>

      </div>
      <Footer />

      <style>{`
        @media (max-width: 900px) { .ind-full-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 560px) { .ind-full-grid { grid-template-columns: 1fr !important; } }
        .ind-card:hover {
          border-color: var(--hover-border) !important;
          transform: translateY(-3px);
          box-shadow: 0 12px 32px rgba(0,0,0,0.1);
        }
      `}</style>
    </>
  );
}
