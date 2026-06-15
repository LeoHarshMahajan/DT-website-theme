import { Metadata } from 'next';
import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Analytics & Conversion Rate Optimisation (CRO)',
  description: 'GA4 implementation, custom attribution models, real-time dashboards, and systematic CRO programs. Make every data-backed decision with confidence.',
};

const SERVICES = [
  {
    icon: '◉',
    title: 'GA4 + GTM Implementation',
    desc: 'Clean, accurate GA4 setup with Google Tag Manager. Every event, conversion, and user property mapped to your business objectives — not just pageviews.',
    tags: ['GA4 Configuration', 'GTM Setup', 'Event Tracking', 'E-commerce Tracking'],
    color: '#10b981',
  },
  {
    icon: '≋',
    title: 'Custom Attribution Modeling',
    desc: 'Multi-touch attribution that shows which channels actually drive revenue — not just last-click. Built with Northbeam, Triple Whale, or custom SQL models.',
    tags: ['Multi-Touch Attribution', 'MER Calculation', 'Channel ROI', 'Data-Driven Models'],
    color: '#4b6bff',
  },
  {
    icon: '⬡',
    title: 'Real-Time Dashboards',
    desc: 'Executive and operational dashboards built in Looker Studio, Power BI, or Metabase. Live data, mobile-accessible, updated every 15 minutes.',
    tags: ['Looker Studio', 'Power BI', 'Live Data', 'Mobile Dashboards'],
    color: '#8b5cf6',
  },
  {
    icon: '✦',
    title: 'CRO & A/B Testing',
    desc: 'Systematic conversion rate optimisation — landing page testing, checkout flow analysis, heatmap insights, and session recording review with a structured test calendar.',
    tags: ['A/B Testing', 'Heatmaps', 'Session Recording', 'Landing Page CRO'],
    color: '#c026d3',
  },
  {
    icon: '◎',
    title: 'Server-Side Analytics',
    desc: 'First-party data architecture. Server-side tagging via sGTM, Meta CAPI, and Google Ads enhanced conversions so your data survives iOS 14+ and ad blockers.',
    tags: ['Server-Side GTM', 'First-Party Data', 'iOS 14+ Ready', 'Data Accuracy'],
    color: '#f59e0b',
  },
  {
    icon: '⊕',
    title: 'Funnel & Cohort Analysis',
    desc: 'Deep-dive into where users drop off, which cohorts retain, and what the highest-LTV customer looks like. Analysis that drives decisions, not just reports.',
    tags: ['Funnel Analysis', 'Cohort Reports', 'LTV Modeling', 'Churn Analysis'],
    color: '#e11d8a',
  },
];

const DASHBOARDS = [
  { name: 'Growth Command Centre', desc: 'Revenue, ROAS, CAC, LTV, MER — all channels in one view. Updated daily.' },
  { name: 'Paid Media Dashboard', desc: 'Spend, CPC, CTR, ROAS by campaign, ad set, and creative across Meta + Google.' },
  { name: 'SEO Performance Tracker', desc: 'Keyword rankings, organic traffic, impressions, clicks — by URL and topic cluster.' },
  { name: 'Content Analytics Board', desc: 'Engagement rate, reach, saves, shares, and follower growth by channel and format.' },
  { name: 'E-commerce Funnel View', desc: 'Add-to-cart, checkout, purchase rates, and abandonment reasons by device and source.' },
  { name: 'Customer Cohort Report', desc: 'Repeat purchase rate, LTV by acquisition channel, and product affinity mapping.' },
];

const RESULTS = [
  { value: '360°', label: 'Attribution visibility built', brand: 'Full-funnel view' },
  { value: '+28%', label: 'Avg conversion rate lift', brand: 'Post-CRO implementation' },
  { value: '14 KPIs', label: 'Avg tracked per brand', brand: 'Custom per business' },
  { value: '15 min', label: 'Dashboard refresh interval', brand: 'Live data standard' },
];

export default function AnalyticsPage() {
  return (
    <>
      <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-0)', paddingTop: '64px' }}>

        <section className="page-hero" style={{ padding: 'clamp(72px, 11vw, 120px) 0 clamp(48px, 7vw, 80px)', borderBottom: '1px solid var(--line)' }}>
          <div className="hero-orb-l" style={{ background: 'radial-gradient(circle, rgba(75,107,255,0.2), transparent 65%)' }} />
          <div className="hero-orb-r" style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.14), transparent 65%)' }} />
          <div className="grid-bg" />
          <div className="shell" style={{ position: 'relative', zIndex: 1 }}>
            <Reveal direction="up" delay={0.04}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <span className="section-tag" style={{ color: 'var(--brand-blue)' }}>Analytics & CRO</span>
                <span style={{ fontSize: '0.65rem', color: 'var(--fg-3)' }}>·</span>
                <span style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--fg-3)' }}>GA4 · ATTRIBUTION · DASHBOARDS</span>
              </div>
            </Reveal>
            <Reveal direction="up" delay={0.08}>
              <h1 style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)', fontWeight: 800, lineHeight: 1.0, letterSpacing: '-0.035em', color: 'var(--fg-0)', marginBottom: '24px', maxWidth: '780px' }}>
                Know what's working.<br />
                <span className="grad-text">Fix what isn't.</span>
              </h1>
            </Reveal>
            <Reveal direction="up" delay={0.12}>
              <p style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', lineHeight: 1.7, color: 'var(--fg-1)', maxWidth: '620px', marginBottom: '36px' }}>
                You can't grow what you can't measure. We implement GA4, build custom attribution models, create live dashboards, and run systematic CRO programs — so every growth decision is data-backed, not gut-based.
              </p>
            </Reveal>
            <Reveal direction="up" delay={0.16}>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '13px 26px', borderRadius: '999px', background: 'linear-gradient(135deg, #4b6bff, #8b5cf6)', color: 'white', fontWeight: '700', fontSize: '0.95rem', textDecoration: 'none' }}>
                  Get Analytics Audit →
                </Link>
                <Link href="/case-studies" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '13px 26px', borderRadius: '999px', border: '1px solid var(--line-strong)', color: 'var(--fg-1)', fontWeight: '500', fontSize: '0.95rem', textDecoration: 'none' }}>
                  View Case Studies
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        <section style={{ borderBottom: '1px solid var(--line)', backgroundColor: 'var(--bg-1)' }}>
          <div className="shell">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px', backgroundColor: 'var(--line)' }} className="results-grid">
              {RESULTS.map((r, i) => (
                <Reveal key={r.label} direction="up" delay={0.05 * i}>
                  <div style={{ backgroundColor: 'var(--bg-1)', padding: '28px 20px', textAlign: 'center' }}>
                    <p className="grad-num" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1 }}>{r.value}</p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--fg-2)', margin: '4px 0 2px' }}>{r.label}</p>
                    <p style={{ fontSize: '0.7rem', color: 'var(--fg-3)', fontFamily: 'var(--font-mono)' }}>{r.brand}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section style={{ padding: 'clamp(64px, 9vw, 100px) 0', borderBottom: '1px solid var(--line)' }}>
          <div className="shell">
            <div style={{ marginBottom: '52px' }}>
              <Reveal direction="up">
                <p style={{ fontSize: '0.68rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--brand-blue)', marginBottom: '12px' }}>CAPABILITIES</p>
                <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.03em', color: 'var(--fg-0)' }}>
                  Six analytics disciplines.<br />
                  <span style={{ color: 'var(--fg-2)' }}>One clear picture.</span>
                </h2>
              </Reveal>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }} className="services-grid">
              {SERVICES.map((s, i) => (
                <Reveal key={s.title} direction="up" delay={0.06 * i}>
                  <div style={{ backgroundColor: 'var(--bg-1)', border: '1px solid var(--line)', borderRadius: '16px', padding: '28px', height: '100%' }}>
                    <div style={{ fontSize: '1.5rem', marginBottom: '14px' }}>{s.icon}</div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--fg-0)', marginBottom: '10px' }}>{s.title}</h3>
                    <p style={{ fontSize: '0.875rem', lineHeight: 1.65, color: 'var(--fg-2)', marginBottom: '16px' }}>{s.desc}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {s.tags.map(t => (
                        <span key={t} style={{ padding: '3px 10px', borderRadius: '999px', backgroundColor: s.color + '15', border: `1px solid ${s.color}30`, fontSize: '0.72rem', color: s.color, fontWeight: '500' }}>{t}</span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Dashboard examples */}
        <section style={{ padding: 'clamp(64px, 9vw, 100px) 0', borderBottom: '1px solid var(--line)', backgroundColor: 'var(--bg-1)' }}>
          <div className="shell">
            <div style={{ marginBottom: '52px' }}>
              <Reveal direction="up">
                <p style={{ fontSize: '0.68rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--brand-blue)', marginBottom: '12px' }}>DASHBOARDS WE BUILD</p>
                <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.03em', color: 'var(--fg-0)' }}>
                  Six dashboards every<br />
                  <span style={{ color: 'var(--fg-2)' }}>growth team needs.</span>
                </h2>
              </Reveal>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }} className="dashboards-grid">
              {DASHBOARDS.map((d, i) => (
                <Reveal key={d.name} direction="up" delay={0.06 * i}>
                  <div style={{ backgroundColor: 'var(--bg-2)', border: '1px solid var(--line)', borderRadius: '14px', padding: '22px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--brand-blue)', flexShrink: 0 }} />
                      <p style={{ fontWeight: '700', fontSize: '0.95rem', color: 'var(--fg-0)' }}>{d.name}</p>
                    </div>
                    <p style={{ fontSize: '0.82rem', lineHeight: 1.6, color: 'var(--fg-2)' }}>{d.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section style={{ padding: 'clamp(72px, 10vw, 112px) 0', textAlign: 'center', background: 'radial-gradient(ellipse 80% 50% at 50% 100%, rgba(75,107,255,0.07), transparent)' }}>
          <div className="shell">
            <Reveal direction="up">
              <p style={{ fontSize: '0.68rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--brand-blue)', marginBottom: '16px' }}>START WITH DATA</p>
              <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.03em', color: 'var(--fg-0)', maxWidth: '660px', margin: '0 auto 16px' }}>
                Stop flying blind.<br />Start growing with data.
              </h2>
              <p style={{ fontSize: '1.05rem', color: 'var(--fg-1)', maxWidth: '440px', margin: '0 auto 36px' }}>
                We'll audit your current tracking setup, identify what's missing, and show you what a clean analytics architecture looks like — in a free call.
              </p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '15px 32px', borderRadius: '999px', background: 'linear-gradient(135deg, #4b6bff, #8b5cf6)', color: 'white', fontWeight: '700', fontSize: '1rem', textDecoration: 'none' }}>
                  Get Free Analytics Audit →
                </Link>
                <Link href="/solutions" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '15px 32px', borderRadius: '999px', border: '1px solid var(--line-strong)', color: 'var(--fg-1)', fontWeight: '500', fontSize: '1rem', textDecoration: 'none' }}>
                  All Solutions
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

      </div>
      <Footer />
      <style>{`
        @media (max-width: 900px) {
          .services-grid, .dashboards-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .results-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 560px) {
          .services-grid, .dashboards-grid, .results-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
