import { Metadata } from 'next';
import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Case Studies',
  description: "Real results from real brands. See how Digital Triangle's AI-powered growth systems drive measurable outcomes.",
};

const CASES = [
  {
    id: 'portronics',
    num: '01',
    name: 'Portronics',
    industry: 'Consumer Tech · D2C',
    headline: 'Re-engineered performance growth across Meta, Google, Amazon — built an AI creative engine.',
    desc: 'Replaced fragmented agency stack with a unified AI-orchestrated growth system. 14 ad variants per launch, server-side tracking, and a creative model that learns from every result.',
    tags: ['Performance', 'AI Creative', 'Marketplace', 'Amazon SEO'],
    metrics: [
      { value: '+4.2×', label: 'Blended ROAS', color: '#4b6bff' },
      { value: '−41%', label: 'CAC', color: '#c026d3' },
      { value: '2.8×', label: 'Revenue, 6 mo', color: '#4b6bff' },
    ],
    color: '#4b6bff',
  },
  {
    id: 'kajaria',
    num: '02',
    name: 'Kajaria',
    industry: 'Building Materials · Enterprise',
    headline: 'Built an AI content engine that dominates category search — 312% organic growth in 9 months.',
    desc: 'Full-funnel SEO + AEO strategy targeting product, brand, and comparison keywords. Combined with programmatic content at scale and GEO targeting for dealer networks.',
    tags: ['Organic SEO', 'AEO', 'Content Systems', 'Dealer Marketing'],
    metrics: [
      { value: '+312%', label: 'Organic traffic', color: '#10b981' },
      { value: '9mo', label: 'Time to result', color: '#4b6bff' },
      { value: '#1', label: 'Category keywords', color: '#c026d3' },
    ],
    color: '#10b981',
  },
  {
    id: 'ofis-square',
    num: '03',
    name: 'Ofis Square',
    industry: 'Coworking · B2B',
    headline: 'Replaced cold outreach with an AI-driven inbound engine — pipeline tripled without more ad spend.',
    desc: 'Built LinkedIn + content + AEO stack targeting workspace decision-makers. Automated lead qualification via WhatsApp + CRM integration. Full-stack attribution across 6 channels.',
    tags: ['B2B Content', 'LinkedIn', 'CRM Automation', 'AEO'],
    metrics: [
      { value: '3×', label: 'Pipeline growth', color: '#4b6bff' },
      { value: '−55%', label: 'Cost per lead', color: '#10b981' },
      { value: '6', label: 'Channels unified', color: '#c026d3' },
    ],
    color: '#8b5cf6',
  },
  {
    id: 'd2c-fashion',
    num: '04',
    name: 'Premium Fashion Brand',
    industry: 'Fashion · Premium D2C',
    headline: 'ROAS held above 4× for 8 consecutive months with AI-optimized creative rotation.',
    desc: 'Full Meta + Google stack rebuilt from scratch. AI creative briefs, weekly refresh cycles, and a retention system that lifted repeat purchase rate to 38%.',
    tags: ['Meta Ads', 'AI Creative', 'Retention', 'LTV'],
    metrics: [
      { value: '4×+', label: 'ROAS — 8 months', color: '#4b6bff' },
      { value: '38%', label: 'Repeat purchase', color: '#c026d3' },
      { value: '2.3×', label: 'LTV improvement', color: '#10b981' },
    ],
    color: '#c026d3',
  },
  {
    id: 'b2b-saas',
    num: '05',
    name: 'B2B SaaS Company',
    industry: 'SaaS · B2B',
    headline: 'AEO strategy put brand inside ChatGPT answers — pipeline doubled in 5 months.',
    desc: 'Zero-budget AEO play: structured brand content, FAQ schema, and answer-optimized blog cluster. Result: brand started appearing in top-3 AI results for 40+ category queries.',
    tags: ['AEO', 'Content Strategy', 'Brand', 'Pipeline'],
    metrics: [
      { value: '2×', label: 'Pipeline in 5 mo', color: '#4b6bff' },
      { value: '40+', label: 'AI answer placements', color: '#8b5cf6' },
      { value: '0₹', label: 'Paid budget used', color: '#10b981' },
    ],
    color: '#6366f1',
  },
  {
    id: 'marketplace',
    num: '06',
    name: 'Marketplace Brand',
    industry: 'Ecommerce · Amazon',
    headline: 'Amazon SEO + performance stack drove category dominance — 3 top-10 keywords in 6 months.',
    desc: 'Combined Amazon SEO, A+ content, PPC automation, and off-platform Meta retargeting. Created a flywheel where organic ranking improved CAC across both channels.',
    tags: ['Amazon SEO', 'PPC', 'A+ Content', 'Meta'],
    metrics: [
      { value: '3', label: 'Top-10 keywords', color: '#4b6bff' },
      { value: '−38%', label: 'ACOS', color: '#10b981' },
      { value: '5.2×', label: 'Revenue growth', color: '#c026d3' },
    ],
    color: '#e11d8a',
  },
];

export default function CaseStudiesPage() {
  return (
    <>
      <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-0)', paddingTop: '64px' }}>

        {/* Header */}
        <section className="page-hero" style={{ padding: 'clamp(64px, 10vw, 100px) 0', borderBottom: '1px solid var(--line)' }}>
          <div className="hero-orb-l" style={{ background: 'radial-gradient(circle, rgba(75,107,255,0.18), transparent 65%)' }} />
          <div className="hero-orb-r" style={{ background: 'radial-gradient(circle, rgba(192,38,211,0.12), transparent 65%)' }} />
          <div className="grid-bg" />
          <div className="shell" style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
              <div style={{ maxWidth: '680px' }}>
                <Reveal direction="up" delay={0.05}>
                  <span className="section-tag" style={{ color: 'var(--brand-blue)', marginBottom: '20px', display: 'inline-flex' }}>Case Studies</span>
                </Reveal>
                <Reveal direction="up" delay={0.1}>
                  <h1 style={{ fontSize: 'clamp(2.6rem, 5.5vw, 4.2rem)', fontWeight: 800, lineHeight: 1.0, letterSpacing: '-0.035em', color: 'var(--fg-0)', marginBottom: '24px' }}>
                    Real brands. <span className="grad-text">Real growth math.</span>
                  </h1>
                </Reveal>
                <Reveal direction="up" delay={0.15}>
                  <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--fg-1)' }}>
                    Every case study has a number. No before/after photography — just revenue, ROAS, CAC, and pipeline metrics verified against actuals.
                  </p>
                </Reveal>
              </div>
              <Reveal direction="up" delay={0.12}>
                <Link href="/contact" style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  padding: '12px 24px', borderRadius: '999px',
                  background: 'linear-gradient(135deg, #4b6bff, #8b5cf6)',
                  color: 'white', fontWeight: '600', fontSize: '0.875rem', textDecoration: 'none',
                }}>
                  Get your free audit →
                </Link>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Cases grid */}
        <section style={{ padding: 'clamp(48px, 8vw, 80px) 0' }}>
          <div className="shell">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {CASES.map((cs, i) => (
                <Reveal key={cs.id} direction="up" delay={0.05 * i}>
                  <div
                    className="case-row"
                    style={{
                      backgroundColor: 'var(--bg-1)', border: '1px solid var(--line)',
                      borderRadius: '20px', padding: 'clamp(24px, 3vw, 40px)',
                      display: 'grid', gridTemplateColumns: '1fr auto', gap: '32px', alignItems: 'center',
                      transition: 'border-color 0.2s',
                      '--hover-border': cs.color + '44',
                    } as React.CSSProperties}
                  >
                    {/* Left */}
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                        <span className="grad-num" style={{ fontSize: '1.1rem', fontWeight: '800', letterSpacing: '-0.03em' }}>{cs.num}</span>
                        <span style={{
                          display: 'inline-flex', alignItems: 'center', gap: '6px',
                          padding: '4px 12px', borderRadius: '20px',
                          backgroundColor: 'var(--bg-3)', border: '1px solid var(--line)',
                        }}>
                          <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: cs.color }} />
                          <span style={{ fontSize: '0.72rem', color: 'var(--fg-2)', fontWeight: '500' }}>{cs.industry}</span>
                        </span>
                        <span style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--fg-0)' }}>{cs.name}</span>
                      </div>
                      <h2 style={{ fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', fontWeight: '700', lineHeight: 1.25, letterSpacing: '-0.02em', color: 'var(--fg-0)', marginBottom: '12px', maxWidth: '640px' }}>
                        {cs.headline}
                      </h2>
                      <p style={{ fontSize: '0.875rem', lineHeight: 1.7, color: 'var(--fg-2)', marginBottom: '16px', maxWidth: '560px' }}>{cs.desc}</p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {cs.tags.map(t => (
                          <span key={t} style={{
                            fontSize: '0.72rem', fontWeight: '500', padding: '4px 10px',
                            borderRadius: '4px', backgroundColor: 'var(--bg-3)',
                            border: '1px solid var(--line)', color: 'var(--fg-2)',
                          }}>{t}</span>
                        ))}
                      </div>
                    </div>

                    {/* Right — metrics */}
                    <div style={{ display: 'flex', gap: '24px', flexShrink: 0 }} className="case-metrics">
                      {cs.metrics.map(m => (
                        <div key={m.label} style={{ textAlign: 'center', minWidth: '88px' }}>
                          <p style={{ fontSize: '2rem', fontWeight: '800', color: m.color, letterSpacing: '-0.04em', lineHeight: 1 }}>{m.value}</p>
                          <p style={{ fontSize: '0.75rem', color: 'var(--fg-3)', marginTop: '8px', lineHeight: 1.3 }}>{m.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section style={{ padding: 'clamp(48px, 8vw, 80px) 0', borderTop: '1px solid var(--line)', textAlign: 'center', backgroundColor: 'var(--bg-1)' }}>
          <div className="shell">
            <Reveal direction="up" delay={0.05}>
              <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 700, letterSpacing: '-0.025em', color: 'var(--fg-0)', marginBottom: '16px' }}>
                Your brand could be next.
              </h2>
              <p style={{ fontSize: '1rem', color: 'var(--fg-2)', marginBottom: '32px', maxWidth: '420px', margin: '0 auto 32px' }}>
                Get a free audit. We'll show you exactly what's holding back your growth.
              </p>
              <Link href="/contact" style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '14px 32px', borderRadius: '999px',
                background: 'linear-gradient(135deg, #4b6bff, #8b5cf6)',
                color: 'white', fontWeight: '600', fontSize: '1rem', textDecoration: 'none',
              }}>
                Book Free Growth Audit →
              </Link>
            </Reveal>
          </div>
        </section>
      </div>
      <Footer />

      <style>{`
        .case-row:hover { border-color: var(--hover-border) !important; }
        @media (max-width: 768px) {
          .case-row { grid-template-columns: 1fr !important; }
          .case-metrics { flex-wrap: wrap !important; justify-content: flex-start; }
        }
      `}</style>
    </>
  );
}
