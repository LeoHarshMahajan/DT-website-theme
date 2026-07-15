import { Metadata } from 'next';
import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';
import { Footer } from '@/components/Footer';
import { CATEGORY_BY_LABEL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Insights — Growth Intelligence for D2C & Emerging Brands',
  description: 'Industry benchmarks, growth frameworks, and strategic playbooks from the Digital Triangle team. Data-led intelligence for modern brand builders.',
};

const BENCHMARKS = [
  { value: '5×', label: 'Cost to acquire vs retain', note: 'Avg across D2C verticals' },
  { value: '28%', label: 'Avg CRO lift per cycle', note: 'Post A/B programme' },
  { value: '3.7×', label: 'WhatsApp vs email open rate', note: 'Industry benchmark' },
  { value: '62%', label: 'Revenue from repeat buyers', note: 'Mature D2C brands' },
];

const FRAMEWORKS = [
  {
    icon: '◎',
    title: 'The D2C Growth Flywheel',
    desc: 'Acquisition fuels awareness. Retention fuels LTV. Data fuels both. Our flywheel connects paid, organic, lifecycle, and analytics into one compounding system.',
    tags: ['Acquisition', 'Retention', 'Analytics'],
    color: '#4b6bff',
  },
  {
    icon: '≋',
    title: 'Lifecycle Architecture',
    desc: 'Day 0 to Day 90 — every post-purchase touchpoint mapped, automated, and optimised. Built around RFM segments, WhatsApp flows, and predictive churn scoring.',
    tags: ['Email', 'WhatsApp', 'CRM'],
    color: '#8b5cf6',
  },
  {
    icon: '⬡',
    title: 'Full-Funnel Attribution',
    desc: 'Multi-touch attribution that credits every channel fairly — from first impression to final purchase. Built with GA4, sGTM, and custom SQL models.',
    tags: ['GA4', 'Attribution', 'Dashboards'],
    color: '#c026d3',
  },
  {
    icon: '✦',
    title: 'Content Compound Engine',
    desc: 'SEO-anchored content that earns rankings over time, feeds social distribution, and powers nurture sequences — creating compounding returns from one creation effort.',
    tags: ['SEO', 'Content', 'Distribution'],
    color: '#e11d8a',
  },
  {
    icon: '◈',
    title: 'AI-First Creative System',
    desc: 'Generative AI for ideation and copy drafts, performance data to identify winning angles, and human editors to ensure brand voice. Speed without sacrifice.',
    tags: ['AI', 'Creative', 'Performance'],
    color: '#4b6bff',
  },
  {
    icon: '⊕',
    title: 'Category Intelligence Loop',
    desc: 'Continuous competitor monitoring, share-of-voice tracking, and search trend analysis — so your brand strategy responds to market shifts before your competitors do.',
    tags: ['Research', 'Competitive', 'Strategy'],
    color: '#8b5cf6',
  },
];

const SIGNALS = [
  {
    quarter: 'Q2 2025',
    title: 'AI Adoption in D2C Marketing',
    insight: '67% of D2C brands now use AI tools in their content workflow. Brands integrating AI at the strategy layer — not just the execution layer — see 2.1× higher output efficiency.',
    tag: 'AI Marketing',
    color: '#4b6bff',
  },
  {
    quarter: 'Q1 2025',
    title: 'WhatsApp Commerce Benchmark',
    insight: 'WhatsApp open rates average 91% vs 22% for email. D2C brands running WhatsApp lifecycle automations see 38% higher repeat purchase rate within 90 days.',
    tag: 'Retention',
    color: '#8b5cf6',
  },
  {
    quarter: 'Q4 2024',
    title: 'SEO vs Paid: Long-Term ROI',
    insight: 'Organic search delivers a 5.3× ROI over 24 months vs 2.1× for paid-only strategies. Brands that invest in both see 7.8× ROI — channel synergy is the multiplier.',
    tag: 'SEO',
    color: '#c026d3',
  },
  {
    quarter: 'Q3 2024',
    title: 'Creative Fatigue Cycle',
    insight: 'Ad creatives in Meta peak at day 7–14 before fatigue sets in. Brands refreshing every 10 days with data-driven variants sustain 34% lower CPMs over 90 days.',
    tag: 'Performance',
    color: '#e11d8a',
  },
];

const TOPICS = [
  { label: 'D2C Strategy', count: 8, color: '#c026d3', icon: '◎' },
  { label: 'AI Marketing', count: 4, color: '#4b6bff', icon: '✦' },
  { label: 'SEO & Organic', count: 5, color: '#8b5cf6', icon: '≋' },
  { label: 'Email & Lifecycle', count: 6, color: '#e11d8a', icon: '✉' },
  { label: 'Analytics & CRO', count: 3, color: '#4b6bff', icon: '⬡' },
  { label: 'Social & Content', count: 4, color: '#c026d3', icon: '◈' },
  { label: 'WhatsApp & Retention', count: 4, color: '#8b5cf6', icon: '💬' },
  { label: 'Paid Advertising', count: 3, color: '#e11d8a', icon: '⊕' },
];

const FEATURED = [
  {
    title: 'The Complete Vibe Marketing Revolution: AI-Driven Emotional Branding for 2025',
    desc: 'How AI-driven emotional branding is reshaping how brands connect with audiences at scale.',
    tags: ['AI Marketing', 'Branding'],
    date: 'Apr 10, 2025',
    color: '#4b6bff',
    href: 'https://thedigitaltriangle.com/the-complete-vibe-marketing-revolution-ai-driven-emotional-branding-for-2025/',
  },
  {
    title: 'How Tier-2 D2C Brands Compete with Unicorns Using Smart Funnels',
    desc: 'How smaller D2C brands punch above their weight by leveraging conversion architecture.',
    tags: ['D2C', 'Growth Strategy'],
    date: 'Mar 22, 2025',
    color: '#c026d3',
    href: 'https://thedigitaltriangle.com/how-tier-2-d2c-brands-compete-with-unicorns-using-kyde-funnels/',
  },
  {
    title: 'Email Marketing For D2C: Proven Strategies To Drive Sales',
    desc: 'Advanced email strategies for D2C — from welcome flows to win-back campaigns that compound revenue.',
    tags: ['Email Marketing', 'D2C'],
    date: 'Dec 10, 2024',
    color: '#8b5cf6',
    href: 'https://thedigitaltriangle.com/email-marketing-for-d2c-proven-strategies-to-drive-sales-in-2024/',
  },
  {
    title: 'Top 10 WhatsApp Business API Providers in India',
    desc: 'A ranked overview of WhatsApp Business API providers — capabilities, pricing, and best fit by brand type.',
    tags: ['WhatsApp', 'Automation'],
    date: 'Sep 8, 2024',
    color: '#e11d8a',
    href: 'https://thedigitaltriangle.com/top-10-whatsapp-business-api-in-india/',
  },
  {
    title: 'The Ultimate Guide to Checking Website Traffic',
    desc: 'Which marketing efforts bring the most visitors, which pages convert, and where to double down.',
    tags: ['Analytics', 'SEO'],
    date: 'Mar 5, 2025',
    color: '#4b6bff',
    href: 'https://thedigitaltriangle.com/the-ultimate-guide-to-checking-website-traffic-for-businesses/',
  },
  {
    title: 'The Ultimate Guide to Building and Scaling a D2C Brand',
    desc: 'How to build, launch, and scale your D2C brand profitably — from zero to category presence.',
    tags: ['D2C', 'Brand Building'],
    date: 'Sep 25, 2024',
    color: '#8b5cf6',
    href: 'https://thedigitaltriangle.com/the-ultimate-guide-to-build-d2c-brand/',
  },
];

export default function InsightsPage() {
  return (
    <>
      <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-0)', paddingTop: '64px' }}>

        {/* Hero */}
        <section className="page-hero" style={{ padding: 'clamp(72px, 11vw, 120px) 0 clamp(48px, 7vw, 80px)', borderBottom: '1px solid var(--line)' }}>
          <div className="hero-orb-l" style={{ background: 'radial-gradient(circle, rgba(75,107,255,0.2), transparent 65%)' }} />
          <div className="hero-orb-r" style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.14), transparent 65%)' }} />
          <div className="grid-bg" />
          <div className="shell" style={{ position: 'relative', zIndex: 1 }}>
            <Reveal direction="up" delay={0.04}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <span className="section-tag" style={{ color: 'var(--brand-blue)' }}>Insights</span>
                <span style={{ fontSize: '0.65rem', color: 'var(--fg-3)' }}>·</span>
                <span style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--fg-3)' }}>FRAMEWORKS · SIGNALS · PLAYBOOKS</span>
              </div>
            </Reveal>
            <Reveal direction="up" delay={0.08}>
              <h1 style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)', fontWeight: 800, lineHeight: 1.0, letterSpacing: '-0.035em', color: 'var(--fg-0)', marginBottom: '24px', maxWidth: '820px' }}>
                Growth intelligence<br />
                <span className="grad-text">built for brand builders.</span>
              </h1>
            </Reveal>
            <Reveal direction="up" delay={0.12}>
              <p style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', lineHeight: 1.7, color: 'var(--fg-1)', maxWidth: '620px', marginBottom: '36px' }}>
                Industry benchmarks, the frameworks we use with every client, quarterly market signals, and deep-dive playbooks — everything you need to make sharper decisions faster.
              </p>
            </Reveal>
            <Reveal direction="up" delay={0.16}>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <Link href="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '13px 26px', borderRadius: '999px', background: 'linear-gradient(135deg, #4b6bff, #8b5cf6)', color: 'white', fontWeight: '700', fontSize: '0.95rem', textDecoration: 'none' }}>
                  Read All Articles →
                </Link>
                <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '13px 26px', borderRadius: '999px', border: '1px solid var(--line-strong)', color: 'var(--fg-1)', fontWeight: '500', fontSize: '0.95rem', textDecoration: 'none' }}>
                  Get a Free Audit
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Benchmarks strip */}
        <section style={{ borderBottom: '1px solid var(--line)', backgroundColor: 'var(--bg-1)' }}>
          <div className="shell">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px', backgroundColor: 'var(--line)' }} className="benchmarks-grid">
              {BENCHMARKS.map((b, i) => (
                <Reveal key={b.label} direction="up" delay={0.05 * i}>
                  <div style={{ backgroundColor: 'var(--bg-1)', padding: '28px 20px', textAlign: 'center' }}>
                    <p className="grad-num" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1 }}>{b.value}</p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--fg-2)', margin: '4px 0 2px' }}>{b.label}</p>
                    <p style={{ fontSize: '0.7rem', color: 'var(--fg-3)', fontFamily: 'var(--font-mono)' }}>{b.note}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Market Signals */}
        <section style={{ padding: 'clamp(64px, 9vw, 100px) 0', borderBottom: '1px solid var(--line)' }}>
          <div className="shell">
            <div style={{ marginBottom: '52px' }}>
              <Reveal direction="up">
                <p style={{ fontSize: '0.68rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--brand-blue)', marginBottom: '12px' }}>MARKET SIGNALS</p>
                <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.03em', color: 'var(--fg-0)' }}>
                  What the data is<br />
                  <span style={{ color: 'var(--fg-2)' }}>telling us right now.</span>
                </h2>
              </Reveal>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }} className="signals-grid">
              {SIGNALS.map((s, i) => (
                <Reveal key={s.title} direction="up" delay={0.07 * i}>
                  <div style={{ backgroundColor: 'var(--bg-1)', border: '1px solid var(--line)', borderRadius: '16px', padding: '28px', height: '100%' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                      <span style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: s.color, fontWeight: '700', padding: '3px 9px', borderRadius: '4px', backgroundColor: s.color + '15', border: `1px solid ${s.color}30` }}>{s.quarter}</span>
                      <span style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: 'var(--fg-3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{s.tag}</span>
                    </div>
                    <div style={{ width: '32px', height: '3px', borderRadius: '2px', backgroundColor: s.color, marginBottom: '14px' }} />
                    <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--fg-0)', marginBottom: '12px', lineHeight: 1.3 }}>{s.title}</h3>
                    <p style={{ fontSize: '0.875rem', lineHeight: 1.7, color: 'var(--fg-2)' }}>{s.insight}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Frameworks */}
        <section style={{ padding: 'clamp(64px, 9vw, 100px) 0', borderBottom: '1px solid var(--line)', backgroundColor: 'var(--bg-1)' }}>
          <div className="shell">
            <div style={{ marginBottom: '52px' }}>
              <Reveal direction="up">
                <p style={{ fontSize: '0.68rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--brand-violet)', marginBottom: '12px' }}>GROWTH FRAMEWORKS</p>
                <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.03em', color: 'var(--fg-0)' }}>
                  How we build<br />
                  <span style={{ color: 'var(--fg-2)' }}>compounding growth.</span>
                </h2>
              </Reveal>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }} className="frameworks-grid">
              {FRAMEWORKS.map((f, i) => (
                <Reveal key={f.title} direction="up" delay={0.06 * i}>
                  <div style={{ backgroundColor: 'var(--bg-2)', border: '1px solid var(--line)', borderRadius: '16px', padding: '28px', height: '100%' }}>
                    <div style={{ fontSize: '1.4rem', marginBottom: '14px', color: f.color }}>{f.icon}</div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--fg-0)', marginBottom: '10px' }}>{f.title}</h3>
                    <p style={{ fontSize: '0.875rem', lineHeight: 1.65, color: 'var(--fg-2)', marginBottom: '18px' }}>{f.desc}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {f.tags.map(t => (
                        <span key={t} style={{ padding: '3px 10px', borderRadius: '999px', backgroundColor: f.color + '15', border: `1px solid ${f.color}30`, fontSize: '0.72rem', color: f.color, fontWeight: '500' }}>{t}</span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Topic categories */}
        <section style={{ padding: 'clamp(64px, 9vw, 100px) 0', borderBottom: '1px solid var(--line)' }}>
          <div className="shell">
            <div style={{ marginBottom: '52px' }}>
              <Reveal direction="up">
                <p style={{ fontSize: '0.68rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--brand-magenta)', marginBottom: '12px' }}>TOPICS</p>
                <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.03em', color: 'var(--fg-0)' }}>
                  Find what you need,<br />
                  <span style={{ color: 'var(--fg-2)' }}>by topic.</span>
                </h2>
              </Reveal>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }} className="topics-grid">
              {TOPICS.map((t, i) => {
                const catSlug = CATEGORY_BY_LABEL[t.label.toLowerCase()]?.slug;
                const href = catSlug ? `/blog?category=${catSlug}` : '/blog';
                return (
                <Reveal key={t.label} direction="up" delay={0.05 * i}>
                  <Link href={href} style={{ display: 'flex', flexDirection: 'column', gap: '12px', backgroundColor: 'var(--bg-1)', border: '1px solid var(--line)', borderRadius: '14px', padding: '22px', textDecoration: 'none', transition: 'border-color 0.2s' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '1.3rem' }}>{t.icon}</span>
                      <span style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: t.color, fontWeight: '700', backgroundColor: t.color + '15', border: `1px solid ${t.color}30`, padding: '2px 8px', borderRadius: '4px' }}>{t.count} articles</span>
                    </div>
                    <p style={{ fontWeight: '700', fontSize: '0.95rem', color: 'var(--fg-0)', lineHeight: 1.3 }}>{t.label}</p>
                  </Link>
                </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* Featured articles */}
        <section style={{ padding: 'clamp(64px, 9vw, 100px) 0', borderBottom: '1px solid var(--line)', backgroundColor: 'var(--bg-1)' }}>
          <div className="shell">
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '52px', flexWrap: 'wrap', gap: '16px' }}>
              <Reveal direction="up">
                <p style={{ fontSize: '0.68rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--brand-blue)', marginBottom: '12px' }}>FEATURED READS</p>
                <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.03em', color: 'var(--fg-0)' }}>
                  Start with<br />
                  <span style={{ color: 'var(--fg-2)' }}>these six.</span>
                </h2>
              </Reveal>
              <Reveal direction="up" delay={0.08}>
                <Link href="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '10px 20px', borderRadius: '999px', border: '1px solid var(--line-strong)', color: 'var(--fg-1)', fontWeight: '500', fontSize: '0.875rem', textDecoration: 'none' }}>
                  View all articles →
                </Link>
              </Reveal>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }} className="featured-grid">
              {FEATURED.map((f, i) => (
                <Reveal key={f.title} direction="up" delay={0.06 * i}>
                  <Link href={f.href} target="_blank" rel="noopener noreferrer" className="blog-card" style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-2)', border: '1px solid var(--line)', borderRadius: '16px', overflow: 'hidden', textDecoration: 'none' }}>
                    <div style={{ height: '3px', background: `linear-gradient(90deg, ${f.color}, transparent)`, flexShrink: 0 }} />
                    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '14px' }}>
                        {f.tags.map(tag => (
                          <span key={tag} style={{ padding: '3px 9px', borderRadius: '999px', fontSize: '0.68rem', fontWeight: '600', fontFamily: 'var(--font-mono)', letterSpacing: '0.04em', textTransform: 'uppercase', backgroundColor: f.color + '15', border: `1px solid ${f.color}30`, color: f.color }}>{tag}</span>
                        ))}
                      </div>
                      <h3 style={{ fontSize: '1rem', fontWeight: '700', lineHeight: 1.4, color: 'var(--fg-0)', marginBottom: '10px', flex: 1, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {f.title}
                      </h3>
                      <p style={{ fontSize: '0.82rem', lineHeight: 1.65, color: 'var(--fg-2)', marginBottom: '18px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {f.desc}
                      </p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '14px', borderTop: '1px solid var(--line)' }}>
                        <time style={{ fontSize: '0.75rem', color: 'var(--fg-3)', fontFamily: 'var(--font-mono)' }}>{f.date}</time>
                        <span style={{ fontSize: '0.75rem', color: f.color, fontWeight: '600' }}>Read →</span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section style={{ padding: 'clamp(72px, 10vw, 112px) 0', textAlign: 'center', background: 'radial-gradient(ellipse 80% 50% at 50% 100%, rgba(75,107,255,0.07), transparent)' }}>
          <div className="shell">
            <Reveal direction="up">
              <p style={{ fontSize: '0.68rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--brand-blue)', marginBottom: '16px' }}>PUT IT INTO PRACTICE</p>
              <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.03em', color: 'var(--fg-0)', maxWidth: '660px', margin: '0 auto 16px' }}>
                Intelligence is only useful<br />when you act on it.
              </h2>
              <p style={{ fontSize: '1.05rem', color: 'var(--fg-1)', maxWidth: '460px', margin: '0 auto 36px' }}>
                Take what you've read and apply it to your brand — with a free growth audit from our team.
              </p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '15px 32px', borderRadius: '999px', background: 'linear-gradient(135deg, #4b6bff, #8b5cf6)', color: 'white', fontWeight: '700', fontSize: '1rem', textDecoration: 'none' }}>
                  Get Free Growth Audit →
                </Link>
                <Link href="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '15px 32px', borderRadius: '999px', border: '1px solid var(--line-strong)', color: 'var(--fg-1)', fontWeight: '500', fontSize: '1rem', textDecoration: 'none' }}>
                  Browse All Articles
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

      </div>
      <Footer />
      <style>{`
        @media (max-width: 900px) {
          .benchmarks-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .signals-grid { grid-template-columns: 1fr !important; }
          .frameworks-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .topics-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .featured-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 560px) {
          .benchmarks-grid, .frameworks-grid, .topics-grid, .featured-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
