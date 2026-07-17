import { Metadata } from 'next';
import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';
import { Footer } from '@/components/Footer';
import { buildPageMetadata } from '@/lib/seo';

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata('/solutions/performance', {
    title: 'Performance Marketing — Meta, Google, Amazon Ads',
    description: 'AI-assisted media buying with creative strategy. Meta Ads, Google Ads, Amazon PPC, server-side tracking, and attribution that actually shows what\'s working.',
  });
}

const CHANNELS = [
  {
    icon: 'Ⓜ',
    title: 'Meta Ads',
    desc: 'Advantage+ and manual campaigns run in parallel. Creative testing at scale — we build 30–60 ad variants per month and let data eliminate the losers.',
    tags: ['Advantage+ Campaigns', 'CAPI Integration', 'Creative Testing', 'Lookalike Audiences'],
    color: '#4b6bff',
  },
  {
    icon: 'G',
    title: 'Google Ads',
    desc: 'PMax, branded search, shopping, and YouTube. We build negative keyword lists, proper campaign structures, and bid strategies tied to real revenue — not CPC.',
    tags: ['Performance Max', 'Google Shopping', 'YouTube Ads', 'Smart Bidding'],
    color: '#10b981',
  },
  {
    icon: 'A',
    title: 'Amazon Ads',
    desc: 'Sponsored Products, Sponsored Brands, and DSP for D2C brands on Amazon. We combine keyword strategy with listing optimization to maximize ACOS.',
    tags: ['Sponsored Products', 'Amazon DSP', 'ACOS Optimization', 'Listing SEO'],
    color: '#f59e0b',
  },
  {
    icon: '▶',
    title: 'YouTube & Video',
    desc: 'Video ad creative strategy, media buying, and audience targeting on YouTube. We produce, test, and optimize — from 6-second bumpers to 3-minute conversion drivers.',
    tags: ['In-Stream Ads', 'Video Creative', 'Audience Targeting', 'Retargeting'],
    color: '#c026d3',
  },
  {
    icon: '↗',
    title: 'Server-Side Tracking',
    desc: 'First-party data architecture using Meta CAPI, Google Ads enhanced conversions, and GA4 server-side events. Accurate attribution in a cookieless world.',
    tags: ['Meta CAPI', 'Enhanced Conversions', 'GA4 Server-Side', 'First-Party Data'],
    color: '#8b5cf6',
  },
  {
    icon: '◉',
    title: 'Creative Strategy',
    desc: 'Performance creative is a system, not a one-off. We build a creative engine that produces, tests, and refreshes ad content at the speed of the algorithm.',
    tags: ['Hook Testing', 'UGC Ads', 'Static + Video', 'Creative Refresh'],
    color: '#e11d8a',
  },
];

const RESULTS = [
  { value: '4.2×', label: 'Blended ROAS achieved', brand: 'Portronics' },
  { value: '-38%', label: 'CAC reduction', brand: 'D2C portfolio avg' },
  { value: '₹18Cr', label: 'Revenue driven via paid', brand: '6-month period' },
  { value: '72hr', label: 'Time to first live campaign', brand: 'Onboarding SLA' },
];

const PROCESS = [
  { step: '01', title: 'Account & Tracking Audit', desc: 'We audit your ad accounts, pixel events, and attribution setup before spending a rupee. Garbage data in = garbage decisions.' },
  { step: '02', title: 'Audience Intelligence', desc: 'First-party data analysis, lookalike construction, and competitor research to map your highest-intent audience segments.' },
  { step: '03', title: 'Campaign Architecture', desc: 'Campaign structures built for scale — proper segmentation, budget allocation, and automated rules that prevent wastage.' },
  { step: '04', title: 'Creative Sprint', desc: 'Week 1: 8–12 ad variants live. Each creative tests a different hook, format, or audience. Data decides the winners.' },
  { step: '05', title: 'Weekly Optimization', desc: 'Every week: winning creatives scaled, losers killed, bids adjusted, audiences refreshed. No "set and forget."' },
  { step: '06', title: 'Attribution & Reporting', desc: 'Custom dashboard showing MER, blended ROAS, platform-level ROAS, and new vs. returning customer split — updated daily.' },
];

const FAQS = [
  {
    q: 'How much ad budget do you need to manage our campaigns?',
    a: 'We work with budgets from ₹1L/month up to ₹50L+ / month. Smaller budgets get focused campaign structures; larger ones get full multi-channel architectures. We\'re transparent about the minimum viable scale for each platform.',
  },
  {
    q: 'Do you charge a percentage of ad spend or a flat fee?',
    a: 'We charge a management fee (flat monthly), not a percentage of ad spend. This removes the conflict of interest where agencies are incentivized to increase your spend, not your returns.',
  },
  {
    q: 'How quickly can we see results?',
    a: 'With a well-structured account, you\'ll see directional data in 2–3 weeks. Meaningful ROAS improvement typically shows up in Week 4–6 as creative learnings compound. We set clear 30/60/90 day expectations at kickoff.',
  },
  {
    q: 'Can you take over existing campaigns without disrupting performance?',
    a: 'Yes. We follow a "keep the machine running" handover protocol — we audit, document, and run shadow campaigns before making structural changes. No performance cliff.',
  },
  {
    q: 'What makes your approach different from a typical media buying agency?',
    a: 'We treat creative and media as one system, not two departments. Our creative testing cadence (30–60 variants/month) combined with proper tracking and weekly iteration creates compounding returns that typical media buyers can\'t replicate.',
  },
];

export default function PerformancePage() {
  return (
    <>
      <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-0)', paddingTop: '64px' }}>

        {/* Hero */}
        <section className="page-hero" style={{ padding: 'clamp(72px, 11vw, 120px) 0 clamp(48px, 7vw, 80px)', borderBottom: '1px solid var(--line)' }}>
          <div className="hero-orb-l" style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.2), transparent 65%)' }} />
          <div className="hero-orb-r" style={{ background: 'radial-gradient(circle, rgba(192,38,211,0.14), transparent 65%)' }} />
          <div className="grid-bg" />
          <div className="shell" style={{ position: 'relative', zIndex: 1 }}>
            <Reveal direction="up" delay={0.04}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <span className="section-tag" style={{ color: '#8b5cf6' }}>Performance Marketing</span>
                <span style={{ fontSize: '0.65rem', color: 'var(--fg-3)' }}>·</span>
                <span style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--fg-3)' }}>META · GOOGLE · AMAZON</span>
              </div>
            </Reveal>
            <Reveal direction="up" delay={0.08}>
              <h1 style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)', fontWeight: 800, lineHeight: 1.0, letterSpacing: '-0.035em', color: 'var(--fg-0)', marginBottom: '24px', maxWidth: '780px' }}>
                Paid media that pays<br />
                <span style={{ backgroundImage: 'linear-gradient(135deg, #8b5cf6, #c026d3)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  for itself. Then doubles.
                </span>
              </h1>
            </Reveal>
            <Reveal direction="up" delay={0.12}>
              <p style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', lineHeight: 1.7, color: 'var(--fg-1)', maxWidth: '620px', marginBottom: '36px' }}>
                We don't just manage ad accounts — we build media machines. AI-assisted buying, creative strategy baked in, and server-side tracking so you know exactly what's working. Built for ROAS, not impressions.
              </p>
            </Reveal>
            <Reveal direction="up" delay={0.16}>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '13px 26px', borderRadius: '999px', background: 'linear-gradient(135deg, #8b5cf6, #c026d3)', color: 'white', fontWeight: '700', fontSize: '0.95rem', textDecoration: 'none' }}>
                  Get Free Ad Audit →
                </Link>
                <Link href="/case-studies" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '13px 26px', borderRadius: '999px', border: '1px solid var(--line-strong)', color: 'var(--fg-1)', fontWeight: '500', fontSize: '0.95rem', textDecoration: 'none' }}>
                  View Results
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Results */}
        <section style={{ borderBottom: '1px solid var(--line)', backgroundColor: 'var(--bg-1)' }}>
          <div className="shell">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px', backgroundColor: 'var(--line)' }} className="results-grid">
              {RESULTS.map((r, i) => (
                <Reveal key={r.label} direction="up" delay={0.05 * i}>
                  <div style={{ backgroundColor: 'var(--bg-1)', padding: '28px 20px', textAlign: 'center' }}>
                    <p style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1, backgroundImage: 'linear-gradient(135deg, #8b5cf6, #c026d3)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{r.value}</p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--fg-2)', margin: '4px 0 2px' }}>{r.label}</p>
                    <p style={{ fontSize: '0.7rem', color: 'var(--fg-3)', fontFamily: 'var(--font-mono)' }}>{r.brand}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Channels */}
        <section style={{ padding: 'clamp(64px, 9vw, 100px) 0', borderBottom: '1px solid var(--line)' }}>
          <div className="shell">
            <div style={{ marginBottom: '52px' }}>
              <Reveal direction="up" delay={0.05}>
                <p style={{ fontSize: '0.68rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#8b5cf6', marginBottom: '12px' }}>CHANNELS & CAPABILITIES</p>
              </Reveal>
              <Reveal direction="up" delay={0.1}>
                <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.03em', color: 'var(--fg-0)' }}>
                  Every paid channel.<br />
                  <span style={{ color: 'var(--fg-2)' }}>One unified strategy.</span>
                </h2>
              </Reveal>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }} className="channels-grid">
              {CHANNELS.map((c, i) => (
                <Reveal key={c.title} direction="up" delay={0.06 * i}>
                  <div style={{ backgroundColor: 'var(--bg-1)', border: '1px solid var(--line)', borderRadius: '16px', padding: '28px', height: '100%' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: c.color + '20', border: `1px solid ${c.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '1rem', color: c.color, marginBottom: '14px' }}>{c.icon}</div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--fg-0)', marginBottom: '10px' }}>{c.title}</h3>
                    <p style={{ fontSize: '0.875rem', lineHeight: 1.65, color: 'var(--fg-2)', marginBottom: '16px' }}>{c.desc}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {c.tags.map(t => (
                        <span key={t} style={{ padding: '3px 10px', borderRadius: '999px', backgroundColor: c.color + '15', border: `1px solid ${c.color}30`, fontSize: '0.72rem', color: c.color, fontWeight: '500' }}>{t}</span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section style={{ padding: 'clamp(64px, 9vw, 100px) 0', borderBottom: '1px solid var(--line)', backgroundColor: 'var(--bg-1)' }}>
          <div className="shell">
            <div style={{ marginBottom: '52px' }}>
              <Reveal direction="up" delay={0.05}>
                <p style={{ fontSize: '0.68rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#8b5cf6', marginBottom: '12px' }}>OUR PROCESS</p>
              </Reveal>
              <Reveal direction="up" delay={0.1}>
                <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.03em', color: 'var(--fg-0)' }}>
                  How we build your<br />
                  <span style={{ color: 'var(--fg-2)' }}>paid growth machine.</span>
                </h2>
              </Reveal>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }} className="process-grid">
              {PROCESS.map((p, i) => (
                <Reveal key={p.step} direction="up" delay={0.07 * i}>
                  <div style={{ backgroundColor: 'var(--bg-2)', border: '1px solid var(--line)', borderRadius: '16px', padding: '28px', display: 'flex', gap: '20px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', flexShrink: 0, background: 'linear-gradient(135deg, #8b5cf6, #c026d3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', fontWeight: '800', color: 'white', fontFamily: 'var(--font-mono)' }}>{p.step}</div>
                    <div>
                      <h3 style={{ fontWeight: '700', fontSize: '1rem', color: 'var(--fg-0)', marginBottom: '6px' }}>{p.title}</h3>
                      <p style={{ fontSize: '0.875rem', lineHeight: 1.65, color: 'var(--fg-2)' }}>{p.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ padding: 'clamp(64px, 9vw, 100px) 0', borderBottom: '1px solid var(--line)' }}>
          <div className="shell">
            <div style={{ maxWidth: '760px', margin: '0 auto' }}>
              <Reveal direction="up" delay={0.05}>
                <p style={{ fontSize: '0.68rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#8b5cf6', marginBottom: '12px' }}>COMMON QUESTIONS</p>
                <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.03em', color: 'var(--fg-0)', marginBottom: '40px' }}>
                  Paid media questions, answered.
                </h2>
              </Reveal>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                {FAQS.map((faq, i) => (
                  <Reveal key={i} direction="up" delay={0.05 * i}>
                    <div style={{ borderBottom: '1px solid var(--line)', padding: '24px 0' }}>
                      <h3 style={{ fontWeight: '700', fontSize: '1rem', color: 'var(--fg-0)', marginBottom: '10px' }}>{faq.q}</h3>
                      <p style={{ fontSize: '0.9rem', lineHeight: 1.7, color: 'var(--fg-2)' }}>{faq.a}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: 'clamp(72px, 10vw, 112px) 0', textAlign: 'center', background: 'radial-gradient(ellipse 80% 50% at 50% 100%, rgba(139,92,246,0.07), transparent)' }}>
          <div className="shell">
            <Reveal direction="up" delay={0.05}>
              <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.03em', color: 'var(--fg-0)', marginBottom: '16px' }}>
                Ready to build a paid<br />channel that compounds?
              </h2>
              <p style={{ fontSize: '1.05rem', color: 'var(--fg-1)', marginBottom: '36px', maxWidth: '440px', margin: '0 auto 36px' }}>
                Get a free audit of your current ad accounts. We'll show you exactly where budget is leaking and how to fix it.
              </p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '15px 32px', borderRadius: '999px', background: 'linear-gradient(135deg, #8b5cf6, #c026d3)', color: 'white', fontWeight: '700', fontSize: '1rem', textDecoration: 'none' }}>
                  Get Free Ad Audit →
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
          .channels-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .process-grid  { grid-template-columns: 1fr !important; }
          .results-grid  { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 560px) {
          .channels-grid { grid-template-columns: 1fr !important; }
          .results-grid  { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
