import { Metadata } from 'next';
import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Search Engine Optimization (SEO) Services',
  description: 'End-to-end SEO services — On-Page, Off-Page, Technical, Local, International, and eCommerce SEO. Win Google, ChatGPT, Perplexity, and Gemini with Digital Triangle.',
};

const SEO_SERVICES = [
  {
    icon: '◎',
    title: 'On-Page SEO',
    desc: 'Unique content creation, headline optimization, HTML tag tuning, and high-resolution image utilization — every element aligned to search intent.',
  },
  {
    icon: '⊕',
    title: 'Off-Page SEO',
    desc: 'Social signals, authority link building, and influencer-driven credibility campaigns that tell Google your brand belongs at the top.',
  },
  {
    icon: '⚙',
    title: 'Technical SEO',
    desc: 'Page speed, Core Web Vitals, crawlability, structured data, and back-end optimizations that make your site easy for search engines to understand.',
  },
  {
    icon: '📍',
    title: 'Local SEO',
    desc: '64% of customers search for local businesses online. Google Business Profile optimization, reputation management, and local citation building.',
  },
  {
    icon: '🌐',
    title: 'International SEO',
    desc: 'Hreflang implementation, geo-targeting, and multilingual content strategy — built for brands expanding across India, GCC, US, and UK.',
  },
  {
    icon: '🏪',
    title: 'Franchise SEO',
    desc: 'Scalable SEO architecture for multi-location businesses — consistent brand presence across every geography without keyword cannibalization.',
  },
  {
    icon: '🛒',
    title: 'eCommerce SEO',
    desc: 'Product page optimization, category architecture, marketplace SEO (Amazon, Flipkart), and mobile & voice search optimization.',
  },
  {
    icon: '✦',
    title: 'AEO / GEO — AI Answer Engine',
    desc: 'Win citations in ChatGPT, Perplexity, and Gemini. We build structured content that AI models surface as authoritative answers.',
  },
  {
    icon: '◈',
    title: 'Content & Keyword Strategy',
    desc: 'Competitive keyword research, content gap analysis, and SEO-optimized blog production that compounds organic traffic month over month.',
  },
];

const METHODOLOGY = [
  {
    num: '01',
    title: 'Discover',
    desc: 'Stakeholder meetings, site review, KPI identification, conversion path analysis, and in-depth keyword research tailored to your business.',
  },
  {
    num: '02',
    title: 'Analyze',
    desc: 'Competitive benchmarking, full site audit, analytics deep-dive, and link risk assessment to establish a clear baseline.',
  },
  {
    num: '03',
    title: 'Strategize',
    desc: '60-day Strategic Online Marketing Plan with campaign goals, channel priorities, and month-by-month timelines.',
  },
  {
    num: '04',
    title: 'Execute',
    desc: 'On-page optimization, site structure improvements, business listing management, and multi-channel content deployment.',
  },
  {
    num: '05',
    title: 'Measure',
    desc: 'Continuous tracking of organic traffic, keyword rankings, bounce rates, conversion rates, and click-through rates.',
  },
  {
    num: '06',
    title: 'Report',
    desc: 'Monthly consultations with full performance overviews, KPI trends, traffic summaries, and transparent ranking updates.',
  },
  {
    num: '07',
    title: 'Adjust',
    desc: 'Algorithm-aware strategy adjustments and continuous optimization — so your rankings don\'t stagnate when Google updates.',
  },
];

const WHY = [
  {
    title: '15+ Years of SEO Experience',
    desc: 'Serving brands across every industry — from D2C startups to enterprise manufacturers. Our team has been in search marketing since before social media mattered.',
  },
  {
    title: 'White-Hat Only',
    desc: 'We never spam, never buy links from link farms, and never game the algorithm. Clean, sustainable SEO that protects your brand long-term.',
  },
  {
    title: 'AI-First Discovery',
    desc: 'Most agencies optimize for Google. We also optimize for ChatGPT, Perplexity, and Gemini — so you win traffic from the next wave of search.',
  },
  {
    title: 'Transparent Reporting',
    desc: '24/7 portal access, monthly video summaries, keyword ranking updates, and full GA4 reporting — no black boxes.',
  },
];

const STATS = [
  { value: '+312%', label: 'Avg organic traffic growth' },
  { value: '1,840+', label: 'Keywords ranked #1' },
  { value: '+82%', label: 'Avg dealer/lead lift' },
  { value: '9mo', label: 'Avg time to scale results' },
];

export default function SEOPage() {
  return (
    <>
      <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-0)', paddingTop: '64px' }}>

        {/* Hero */}
        <section style={{ padding: 'clamp(72px, 10vw, 120px) 0 clamp(48px, 7vw, 80px)', borderBottom: '1px solid var(--line)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-200px', left: '-100px', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(75,107,255,0.08), transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(192,38,211,0.06), transparent 70%)', pointerEvents: 'none' }} />
          <div className="shell" style={{ position: 'relative', zIndex: 1 }}>
            <Reveal direction="up" delay={0.05}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '5px 14px', borderRadius: '999px', background: 'rgba(75,107,255,0.08)', border: '1px solid rgba(75,107,255,0.2)', marginBottom: '24px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#34d399', boxShadow: '0 0 8px #34d399' }} />
                <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', color: 'var(--brand-blue)' }}>SEO · AEO · GEO — AI-first organic growth</span>
              </div>
            </Reveal>
            <Reveal direction="up" delay={0.1}>
              <h1 style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4.2rem)', fontWeight: 700, lineHeight: 1.06, letterSpacing: '-0.03em', color: 'var(--fg-0)', marginBottom: '24px', maxWidth: '800px' }}>
                Search Engine Optimization<br />
                <span style={{ background: 'linear-gradient(135deg, var(--brand-blue), var(--brand-magenta))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  built for AI-first discovery.
                </span>
              </h1>
            </Reveal>
            <Reveal direction="up" delay={0.15}>
              <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: 'var(--fg-1)', maxWidth: '620px', marginBottom: '40px' }}>
                We don't chase vanity metrics. We map buyer intent, analyze competitors, and build organic systems that drive relevant traffic — across Google, ChatGPT, Perplexity, and Gemini.
              </p>
            </Reveal>
            <Reveal direction="up" delay={0.2}>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '13px 28px', borderRadius: '999px', background: 'linear-gradient(135deg, #4b6bff, #8b5cf6)', color: 'white', fontWeight: '600', fontSize: '0.95rem', textDecoration: 'none' }}>
                  Get Free SEO Audit →
                </Link>
                <Link href="/case-studies" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '13px 28px', borderRadius: '999px', border: '1px solid var(--line-strong)', color: 'var(--fg-1)', fontWeight: '500', fontSize: '0.95rem', textDecoration: 'none' }}>
                  See Case Studies
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Stats bar */}
        <section style={{ borderBottom: '1px solid var(--line)' }}>
          <div className="shell">
            <div className="seo-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
              {STATS.map((s, i) => (
                <div key={i} style={{ padding: '32px 24px', borderRight: i < STATS.length - 1 ? '1px solid var(--line)' : 'none', textAlign: 'center' }}>
                  <div style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', fontWeight: 700, letterSpacing: '-0.03em', background: 'linear-gradient(135deg, var(--brand-blue), var(--brand-magenta))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', lineHeight: 1 }}>
                    {s.value}
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--fg-3)', marginTop: '8px' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services grid */}
        <section style={{ padding: 'clamp(64px, 10vw, 100px) 0', borderBottom: '1px solid var(--line)' }}>
          <div className="shell">
            <Reveal direction="up" delay={0.05}>
              <div style={{ marginBottom: '52px' }}>
                <p style={{ fontSize: '0.68rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--brand-blue)', marginBottom: '14px' }}>OUR SEO SERVICES</p>
                <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.025em', color: 'var(--fg-0)', maxWidth: '20ch' }}>
                  Nine SEO systems.<br />
                  <span style={{ color: 'var(--fg-2)' }}>One organic growth engine.</span>
                </h2>
              </div>
            </Reveal>
            <div className="seo-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              {SEO_SERVICES.map((s, i) => (
                <Reveal key={s.title} direction="up" delay={0.05 * i}>
                  <div className="seo-card" style={{ backgroundColor: 'var(--bg-1)', border: '1px solid var(--line)', borderRadius: '16px', padding: '28px', height: '100%', transition: 'border-color 0.2s, background 0.2s' }}>
                    <div style={{ fontSize: '1.4rem', marginBottom: '14px' }}>{s.icon}</div>
                    <h3 style={{ fontWeight: '700', fontSize: '1rem', color: 'var(--fg-0)', marginBottom: '10px' }}>{s.title}</h3>
                    <p style={{ fontSize: '0.875rem', lineHeight: 1.65, color: 'var(--fg-2)' }}>{s.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Agile Methodology */}
        <section style={{ padding: 'clamp(64px, 10vw, 100px) 0', backgroundColor: 'var(--bg-1)', borderBottom: '1px solid var(--line)' }}>
          <div className="shell">
            <Reveal direction="up" delay={0.05}>
              <div style={{ marginBottom: '52px' }}>
                <p style={{ fontSize: '0.68rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--brand-blue)', marginBottom: '14px' }}>OUR METHODOLOGY</p>
                <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.025em', color: 'var(--fg-0)' }}>
                  Agile SEO in 7 steps.<br />
                  <span style={{ color: 'var(--fg-2)' }}>No guesswork. No vanity metrics.</span>
                </h2>
              </div>
            </Reveal>
            <div className="method-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
              {METHODOLOGY.map((m, i) => (
                <Reveal key={m.num} direction="up" delay={0.06 * i}>
                  <div style={{ backgroundColor: 'var(--bg-2)', border: '1px solid var(--line)', borderRadius: '16px', padding: '24px', height: '100%' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--brand-blue)', letterSpacing: '0.1em', marginBottom: '12px' }}>{m.num}</div>
                    <h3 style={{ fontWeight: '700', fontSize: '1rem', color: 'var(--fg-0)', marginBottom: '10px' }}>{m.title}</h3>
                    <p style={{ fontSize: '0.82rem', lineHeight: 1.65, color: 'var(--fg-2)' }}>{m.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Why DT */}
        <section style={{ padding: 'clamp(64px, 10vw, 100px) 0', borderBottom: '1px solid var(--line)' }}>
          <div className="shell">
            <div className="why-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
              <div>
                <Reveal direction="up" delay={0.05}>
                  <p style={{ fontSize: '0.68rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--brand-blue)', marginBottom: '14px' }}>WHY DIGITAL TRIANGLE</p>
                </Reveal>
                <Reveal direction="up" delay={0.1}>
                  <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.025em', color: 'var(--fg-0)', marginBottom: '20px' }}>
                    SEO that compounds.<br />
                    <span style={{ color: 'var(--fg-2)' }}>Not campaigns that expire.</span>
                  </h2>
                </Reveal>
                <Reveal direction="up" delay={0.15}>
                  <p style={{ fontSize: '1rem', lineHeight: 1.75, color: 'var(--fg-1)', marginBottom: '32px' }}>
                    We understand your business objectives, map your buyer's journey, and study your competitors — so every optimization drives qualified traffic that converts, not just impressions.
                  </p>
                </Reveal>
                <Reveal direction="up" delay={0.2}>
                  <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '13px 28px', borderRadius: '999px', background: 'linear-gradient(135deg, #4b6bff, #8b5cf6)', color: 'white', fontWeight: '600', fontSize: '0.95rem', textDecoration: 'none' }}>
                    Book Free SEO Consultation →
                  </Link>
                </Reveal>
              </div>

              <Reveal direction="up" delay={0.12}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {WHY.map((w, i) => (
                    <div key={i} style={{ display: 'flex', gap: '16px', padding: '20px', backgroundColor: 'var(--bg-1)', border: '1px solid var(--line)', borderRadius: '14px' }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'linear-gradient(135deg, #4b6bff, #8b5cf6)', flexShrink: 0, marginTop: '6px' }} />
                      <div>
                        <p style={{ fontWeight: '700', fontSize: '0.95rem', color: 'var(--fg-0)', marginBottom: '6px' }}>{w.title}</p>
                        <p style={{ fontSize: '0.85rem', lineHeight: 1.6, color: 'var(--fg-2)' }}>{w.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Case Study callout — Kajaria */}
        <section style={{ padding: 'clamp(64px, 10vw, 100px) 0', backgroundColor: 'var(--bg-1)', borderBottom: '1px solid var(--line)' }}>
          <div className="shell">
            <Reveal direction="up" delay={0.05}>
              <div style={{ background: 'linear-gradient(135deg, rgba(75,107,255,0.08), rgba(192,38,211,0.06))', border: '1px solid rgba(139,92,246,0.2)', borderRadius: '20px', padding: 'clamp(32px, 5vw, 56px)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center' }} className="case-banner">
                <div>
                  <p style={{ fontSize: '0.68rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--brand-violet)', marginBottom: '14px' }}>CASE STUDY · ENTERPRISE SEO</p>
                  <h3 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.025em', color: 'var(--fg-0)', marginBottom: '16px' }}>
                    How we drove +318% organic sessions for Kajaria — Asia's largest tile maker.
                  </h3>
                  <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--fg-1)', marginBottom: '28px' }}>
                    We built a 12,000-page programmatic SEO architecture mapped to dealer geographies and product categories. Then optimized for AI answer engines — not just Google.
                  </p>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '28px' }}>
                    {['Enterprise SEO', 'AEO / GEO', 'Programmatic', 'Local SEO'].map(t => (
                      <span key={t} style={{ padding: '4px 12px', borderRadius: '999px', border: '1px solid var(--line)', fontSize: '12px', color: 'var(--fg-2)' }}>{t}</span>
                    ))}
                  </div>
                  <Link href="/case-studies" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '11px 22px', borderRadius: '999px', border: '1px solid var(--line-strong)', color: 'var(--fg-1)', fontWeight: '500', fontSize: '0.9rem', textDecoration: 'none' }}>
                    Read full case study →
                  </Link>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  {[
                    { v: '+318%', k: 'Organic sessions' },
                    { v: 'Rank #1', k: 'On 1,840 keywords' },
                    { v: '+82%', k: 'Dealer lead volume' },
                    { v: '12,000', k: 'Programmatic pages' },
                  ].map((m, i) => (
                    <div key={i} style={{ backgroundColor: 'var(--bg-2)', border: '1px solid var(--line)', borderRadius: '12px', padding: '20px' }}>
                      <div style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)', fontWeight: 700, letterSpacing: '-0.02em', background: 'linear-gradient(135deg, var(--brand-blue), var(--brand-magenta))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{m.v}</div>
                      <div style={{ fontSize: '12px', color: 'var(--fg-3)', marginTop: '6px' }}>{m.k}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: 'clamp(64px, 10vw, 100px) 0', textAlign: 'center' }}>
          <div className="shell">
            <Reveal direction="up" delay={0.05}>
              <p style={{ fontSize: '0.68rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--brand-blue)', marginBottom: '14px' }}>GET STARTED</p>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.03em', color: 'var(--fg-0)', marginBottom: '16px' }}>
                Ready to win organic?<br />
                <span style={{ color: 'var(--fg-2)' }}>Let's audit your SEO stack.</span>
              </h2>
              <p style={{ fontSize: '1.05rem', color: 'var(--fg-1)', marginBottom: '40px', maxWidth: '480px', margin: '0 auto 40px' }}>
                Free 30-minute SEO audit. We'll show you exactly what's holding your organic growth back and what to fix first.
              </p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 32px', borderRadius: '999px', background: 'linear-gradient(135deg, #4b6bff, #8b5cf6)', color: 'white', fontWeight: '600', fontSize: '0.95rem', textDecoration: 'none' }}>
                  Get Free SEO Audit →
                </Link>
                <Link href="/pricing" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 28px', borderRadius: '999px', border: '1px solid var(--line-strong)', color: 'var(--fg-1)', fontWeight: '500', fontSize: '0.95rem', textDecoration: 'none' }}>
                  See Pricing
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

      </div>
      <Footer />

      <style>{`
        .seo-card:hover { border-color: rgba(75,107,255,0.3) !important; background-color: var(--bg-2) !important; }
        @media (max-width: 900px) {
          .seo-stats { grid-template-columns: repeat(2, 1fr) !important; }
          .seo-stats > div:nth-child(2n) { border-right: none !important; }
          .seo-stats > div { border-bottom: 1px solid var(--line); }
          .seo-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .method-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .why-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .case-banner { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 560px) {
          .seo-stats { grid-template-columns: 1fr !important; }
          .seo-grid { grid-template-columns: 1fr !important; }
          .method-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
