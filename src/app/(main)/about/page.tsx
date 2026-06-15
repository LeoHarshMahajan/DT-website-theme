import { Metadata } from 'next';
import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'About Digital Triangle — We Build Brands That Compound',
  description: 'We are a growth intelligence company built on one belief: that great brands are not made in campaigns — they are engineered over time with strategy, data, and creative that compounds.',
};

const VALUES = [
  {
    icon: '⚡',
    title: 'Speed over process',
    desc: 'Brand-building is not a six-week strategy exercise. We ship, test, learn, and refine — weekly. Every iteration is a data point that shapes the next creative decision.',
  },
  {
    icon: '◎',
    title: 'Outcome-linked, always',
    desc: 'We measure brand health in revenue metrics, not impressions. ROAS, CAC payback, LTV, and repeat rate — these are the real indicators of a brand that\'s taking root.',
  },
  {
    icon: '✦',
    title: 'AI-native by design',
    desc: 'We use Claude, GPT, Gemini, and custom models in every workflow — for research, creative briefing, campaign monitoring, and audience intelligence. AI is our unfair advantage.',
  },
  {
    icon: '⊕',
    title: 'Systems, not campaigns',
    desc: 'A campaign ends. A system compounds. We build brand infrastructure — content engines, creative pipelines, automation stacks — that keep producing value long after launch.',
  },
  {
    icon: '◈',
    title: 'Positioning before pixels',
    desc: 'We don\'t touch ad accounts or social feeds until we understand what the brand stands for and who it\'s truly for. Brand positioning is the lever that moves everything else.',
  },
  {
    icon: '≋',
    title: 'The whole funnel',
    desc: 'Great brands don\'t separate awareness from acquisition from retention. We look at the full customer journey — from first impression to repeat purchase — as one connected story.',
  },
];

const STATS = [
  { value: '50+', label: 'Brands built and scaled' },
  { value: '₹500Cr+', label: 'Revenue attributed' },
  { value: '4.8×', label: 'Average blended ROAS' },
  { value: '3', label: 'Countries served' },
];

const TEAM = [
  { initials: 'HM', name: 'Harsh Mahajan',    role: 'Founder & Growth Architect',  color: '#4b6bff' },
  { initials: 'DA', name: 'Deepika Agarwal',  role: 'Associate Director, BD',      color: '#8b5cf6' },
  { initials: 'JV', name: 'Jatin Verma',      role: 'Motion Graphic Lead',          color: '#c026d3' },
  { initials: 'VS', name: 'Vinesh Singh',     role: 'Video Editor',                 color: '#e11d8a' },
  { initials: 'NS', name: 'Nishant Singh',    role: 'SEO Lead',                     color: '#10b981' },
  { initials: 'NI', name: 'Nisha',            role: 'Graphic Designer',             color: '#f59e0b' },
];

const BRAND_PRINCIPLES = [
  {
    number: '01',
    title: 'A brand is a promise held consistently over time.',
    body: 'The brands that win — Mamaearth, boAt, Sugar, Boat — all built something memorable not in one campaign, but in thousands of consistent interactions. Consistency of tone, visual identity, and value delivery is what transforms a product into a brand people seek out.',
  },
  {
    number: '02',
    title: 'Attention is rented. Equity is owned.',
    body: 'Paid media buys attention. Brand equity earns it. The smartest brands we\'ve worked with invest in both: paid channels for immediate revenue, brand-building for the long tail of organic recall, word of mouth, and pricing power that doesn\'t depend on discounts.',
  },
  {
    number: '03',
    title: 'Creative is strategy made visible.',
    body: 'The best ad is one that doesn\'t look like an ad — because it\'s saying something true about who the brand is. Creative that converts doesn\'t happen in isolation. It comes from a clear brand position, deep audience empathy, and a system for testing what resonates.',
  },
  {
    number: '04',
    title: 'Data tells you what happened. Insight tells you why.',
    body: 'We use analytics to diagnose, not just report. The gap between a brand that plateaus and one that compounds is almost always an insight gap — a missed pattern in cohort behavior, a misread of acquisition channel quality, a creative angle that unlocked a new segment.',
  },
];

export default function AboutPage() {
  return (
    <>
      <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-0)', paddingTop: '64px' }}>

        {/* Hero */}
        <section className="page-hero" style={{ padding: 'clamp(64px, 10vw, 112px) 0', borderBottom: '1px solid var(--line)' }}>
          {/* Decorative background */}
          <div className="hero-orb-l" style={{ background: 'radial-gradient(circle, rgba(75,107,255,0.2), transparent 65%)' }} />
          <div className="hero-orb-r" style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.14), transparent 65%)' }} />
          <div className="grid-bg" />

          <div className="shell" style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ maxWidth: '860px' }}>
              <Reveal direction="up" delay={0.05}>
                <span className="section-tag" style={{ color: 'var(--brand-blue)', marginBottom: '20px', display: 'inline-flex' }}>About Digital Triangle</span>
              </Reveal>
              <Reveal direction="up" delay={0.1}>
                <h1 style={{ fontSize: 'clamp(2.6rem, 5.5vw, 4.5rem)', fontWeight: 800, lineHeight: 1.0, letterSpacing: '-0.035em', color: 'var(--fg-0)', marginBottom: '28px' }}>
                  We build brands that<br />
                  <span className="grad-text">compound over time.</span>
                </h1>
              </Reveal>
              <Reveal direction="up" delay={0.15}>
                <p style={{ fontSize: 'clamp(1rem, 1.8vw, 1.2rem)', lineHeight: 1.75, color: 'var(--fg-1)', maxWidth: '680px', marginBottom: '20px' }}>
                  Digital Triangle was built on one belief: that the brands that win in the long run are not the ones with the biggest ad budgets — they are the ones with the clearest identity, the most consistent voice, and the systems to reinforce both at scale.
                </p>
              </Reveal>
              <Reveal direction="up" delay={0.18}>
                <p style={{ fontSize: 'clamp(1rem, 1.8vw, 1.2rem)', lineHeight: 1.75, color: 'var(--fg-1)', maxWidth: '680px' }}>
                  We combine brand strategy, performance marketing, AI-native systems, and deep creative execution into one compounding engine — built for D2C founders, SaaS companies, and modern commerce brands who understand that brand is not a cost centre. It is the highest-leverage investment a business can make.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section style={{ padding: 'clamp(40px, 6vw, 64px) 0', borderBottom: '1px solid var(--line)' }}>
          <div className="shell">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px', backgroundColor: 'var(--line)', border: '1px solid var(--line)', borderRadius: '16px', overflow: 'hidden' }} className="stats-grid">
              {STATS.map((s, i) => (
                <Reveal key={s.label} direction="up" delay={0.06 * i}>
                  <div className="stat-card" style={{ backgroundColor: 'var(--bg-1)', padding: '32px 24px', textAlign: 'center' }}>
                    <p className="grad-num" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: '800', letterSpacing: '-0.04em', lineHeight: 1 }}>{s.value}</p>
                    <p style={{ fontSize: '0.82rem', color: 'var(--fg-3)', marginTop: '8px' }}>{s.label}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Brand Philosophy */}
        <section style={{ padding: 'clamp(64px, 10vw, 112px) 0', borderBottom: '1px solid var(--line)' }}>
          <div className="shell">
            <div style={{ marginBottom: '56px' }}>
              <Reveal direction="up" delay={0.05}>
                <span className="section-tag" style={{ color: 'var(--brand-violet)', marginBottom: '20px', display: 'inline-flex' }}>How We Think About Brands</span>
              </Reveal>
              <Reveal direction="up" delay={0.1}>
                <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.025em', color: 'var(--fg-0)', maxWidth: '680px' }}>
                  Four things we know to be true<br />
                  <span style={{ color: 'var(--fg-2)' }}>about building lasting brands.</span>
                </h2>
              </Reveal>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {BRAND_PRINCIPLES.map((p, i) => (
                <Reveal key={p.number} direction="up" delay={0.07 * i}>
                  <div style={{
                    display: 'grid', gridTemplateColumns: '80px 1fr',
                    gap: '32px', padding: 'clamp(28px, 4vw, 40px) 0',
                    borderBottom: '1px solid var(--line)', alignItems: 'start',
                  }} className="principle-row">
                    <div className="grad-num" style={{ fontFamily: 'var(--font-mono)', fontSize: '1.5rem', fontWeight: '800', paddingTop: '2px' }}>{p.number}</div>
                    <div>
                      <h3 style={{ fontSize: 'clamp(1.05rem, 2vw, 1.25rem)', fontWeight: '700', color: 'var(--fg-0)', marginBottom: '12px', lineHeight: 1.3 }}>{p.title}</h3>
                      <p style={{ fontSize: '0.95rem', lineHeight: 1.75, color: 'var(--fg-2)', maxWidth: '640px' }}>{p.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Mission */}
        <section style={{ padding: 'clamp(64px, 10vw, 112px) 0', borderBottom: '1px solid var(--line)' }}>
          <div className="shell">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }} className="mission-grid">
              <div>
                <Reveal direction="up" delay={0.05}>
                  <span className="section-tag" style={{ color: 'var(--brand-blue)', marginBottom: '20px', display: 'inline-flex' }}>Our Mission</span>
                </Reveal>
                <Reveal direction="up" delay={0.1}>
                  <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.025em', color: 'var(--fg-0)', marginBottom: '20px' }}>
                    Democratize AI-powered brand-building for emerging companies.
                  </h2>
                </Reveal>
                <Reveal direction="up" delay={0.15}>
                  <p style={{ fontSize: '1rem', lineHeight: 1.75, color: 'var(--fg-1)', marginBottom: '16px' }}>
                    Large brands have armies of analysts, agency retainers, brand strategists, and data science teams. We exist to give emerging brands — D2C founders, SaaS companies, modern commerce brands — the same compounding advantage, without the enterprise overhead.
                  </p>
                  <p style={{ fontSize: '1rem', lineHeight: 1.75, color: 'var(--fg-1)' }}>
                    Not by copying enterprise playbooks. By building AI-native systems that understand your brand, your audience, and your market — and that improve automatically over time.
                  </p>
                </Reveal>
              </div>
              <Reveal direction="up" delay={0.12}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {[
                    { label: 'Founded', value: '2022' },
                    { label: 'Headquarters', value: 'Sector 62, Noida, India' },
                    { label: 'Markets', value: 'India · GCC · US · UK' },
                    { label: 'Team size', value: '24 people + AI' },
                    { label: 'Specialization', value: 'AI-native brand & growth infrastructure' },
                    { label: 'Industries', value: 'D2C · SaaS · Retail · Real Estate · Hospitality' },
                  ].map(item => (
                    <div key={item.label} style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      padding: '14px 0', borderBottom: '1px solid var(--line)',
                    }}>
                      <span style={{ fontSize: '0.85rem', color: 'var(--fg-3)' }}>{item.label}</span>
                      <span style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--fg-0)', textAlign: 'right', maxWidth: '220px' }}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* What separates great brands */}
        <section style={{ padding: 'clamp(64px, 10vw, 112px) 0', borderBottom: '1px solid var(--line)', backgroundColor: 'var(--bg-1)' }}>
          <div className="shell">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'start' }} className="mission-grid">
              <Reveal direction="up" delay={0.05}>
                <div>
                  <span className="section-tag" style={{ color: 'var(--brand-magenta)', marginBottom: '20px', display: 'inline-flex' }}>Our Perspective</span>
                  <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.025em', color: 'var(--fg-0)', marginBottom: '24px' }}>
                    What separates brands that grow from brands that plateau.
                  </h2>
                  <p style={{ fontSize: '1rem', lineHeight: 1.8, color: 'var(--fg-1)', marginBottom: '16px' }}>
                    After working with 50+ brands across categories, we see the same gap repeatedly. Brands that plateau are optimizing within a channel. Brands that compound are building an asset — a name people trust, a voice people recognize, a product people recommend without being asked.
                  </p>
                  <p style={{ fontSize: '1rem', lineHeight: 1.8, color: 'var(--fg-1)' }}>
                    The compounding happens at the intersection of strong brand identity and rigorous growth systems. Neither alone is enough. Brand without performance is vanity. Performance without brand is a race to the bottom on CAC.
                  </p>
                </div>
              </Reveal>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  { label: 'Plateauing brands', value: 'Optimizing channel-by-channel', tone: 'var(--fg-3)' },
                  { label: 'Compounding brands', value: 'Building a name people seek out', tone: '#10b981' },
                  { label: 'Plateauing brands', value: 'Chasing ROAS, ignoring brand health', tone: 'var(--fg-3)' },
                  { label: 'Compounding brands', value: 'Measuring LTV, repeat rate, NPS', tone: '#10b981' },
                  { label: 'Plateauing brands', value: 'Running campaigns that expire', tone: 'var(--fg-3)' },
                  { label: 'Compounding brands', value: 'Running systems that compound', tone: '#10b981' },
                  { label: 'Plateauing brands', value: 'Copying what worked for others', tone: 'var(--fg-3)' },
                  { label: 'Compounding brands', value: 'Finding what\'s uniquely true for them', tone: '#10b981' },
                ].map((row, i) => (
                  <Reveal key={i} direction="up" delay={0.04 * i}>
                    <div style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      padding: '14px 16px', borderRadius: '10px',
                      backgroundColor: row.tone === '#10b981' ? 'rgba(16,185,129,0.06)' : 'var(--bg-2)',
                      border: `1px solid ${row.tone === '#10b981' ? 'rgba(16,185,129,0.2)' : 'var(--line)'}`,
                    }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: '600', color: row.tone, textTransform: 'uppercase', letterSpacing: '0.06em', minWidth: '130px' }}>{row.label}</span>
                      <span style={{ fontSize: '0.875rem', color: 'var(--fg-1)', textAlign: 'right' }}>{row.value}</span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section style={{ padding: 'clamp(64px, 10vw, 112px) 0', borderBottom: '1px solid var(--line)' }}>
          <div className="shell">
            <div style={{ marginBottom: '52px' }}>
              <Reveal direction="up" delay={0.05}>
                <span className="section-tag" style={{ color: 'var(--brand-blue)', marginBottom: '20px', display: 'inline-flex' }}>Our Values</span>
              </Reveal>
              <Reveal direction="up" delay={0.1}>
                <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.03em', color: 'var(--fg-0)' }}>
                  How we think<br />
                  <span style={{ color: 'var(--fg-2)' }}>and how we work.</span>
                </h2>
              </Reveal>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }} className="values-grid">
              {VALUES.map((v, i) => {
                const colors = ['#4b6bff','#8b5cf6','#c026d3','#e11d8a','#10b981','#f59e0b'];
                const accent = colors[i % colors.length];
                return (
                  <Reveal key={v.title} direction="up" delay={0.07 * i}>
                    <div className="card-rich" style={{
                      backgroundColor: 'var(--bg-1)', border: '1px solid var(--line)',
                      borderRadius: '16px', overflow: 'hidden',
                    }}>
                      {/* Top accent line */}
                      <div style={{ height: '3px', background: `linear-gradient(90deg, ${accent}, transparent)` }} />
                      <div style={{ padding: '28px' }}>
                        <div style={{
                          width: '44px', height: '44px', borderRadius: '12px',
                          background: `${accent}18`,
                          border: `1px solid ${accent}30`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: '1.2rem', marginBottom: '16px', color: accent,
                        }}>{v.icon}</div>
                        <p style={{ fontWeight: '700', fontSize: '1.05rem', color: 'var(--fg-0)', marginBottom: '8px' }}>{v.title}</p>
                        <p style={{ fontSize: '0.875rem', lineHeight: 1.65, color: 'var(--fg-2)' }}>{v.desc}</p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* Team */}
        <section style={{ padding: 'clamp(64px, 10vw, 112px) 0', borderBottom: '1px solid var(--line)', backgroundColor: 'var(--bg-1)' }}>
          <div className="shell">
            <div style={{ marginBottom: '52px' }}>
              <Reveal direction="up" delay={0.05}>
                <span className="section-tag" style={{ color: 'var(--brand-blue)', marginBottom: '20px', display: 'inline-flex' }}>The Team</span>
              </Reveal>
              <Reveal direction="up" delay={0.1}>
                <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.03em', color: 'var(--fg-0)', marginBottom: '16px' }}>
                  Operators, not consultants.
                </h2>
              </Reveal>
              <Reveal direction="up" delay={0.13}>
                <p style={{ fontSize: '1rem', lineHeight: 1.7, color: 'var(--fg-2)', maxWidth: '560px' }}>
                  Every person on our team has done the work — run campaigns, shot content, built dashboards, written briefs. No account managers relaying feedback. You work directly with the people doing the work.
                </p>
              </Reveal>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }} className="team-grid">
              {TEAM.map((member, i) => (
                <Reveal key={member.name} direction="up" delay={0.07 * i}>
                  <div
                    className="team-card"
                    style={{
                      backgroundColor: 'var(--bg-2)', border: '1px solid var(--line)',
                      borderRadius: '16px', padding: '28px 24px', textAlign: 'center',
                      transition: 'all 0.2s',
                      '--hover-border': member.color + '44',
                    } as React.CSSProperties}
                  >
                    <div style={{
                      width: '64px', height: '64px', borderRadius: '50%',
                      backgroundColor: member.color,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontWeight: '800', fontSize: '1.2rem', color: 'white',
                      margin: '0 auto 16px',
                    }}>{member.initials}</div>
                    <p style={{ fontWeight: '700', fontSize: '1rem', color: 'var(--fg-0)', marginBottom: '4px' }}>{member.name}</p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--fg-3)' }}>{member.role}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: 'clamp(64px, 10vw, 112px) 0', textAlign: 'center' }}>
          <div className="shell">
            <Reveal direction="up" delay={0.05}>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.03em', color: 'var(--fg-0)', marginBottom: '16px' }}>
                Ready to build a brand<br />
                <span style={{ color: 'var(--fg-2)' }}>that compounds?</span>
              </h2>
            </Reveal>
            <Reveal direction="up" delay={0.1}>
              <p style={{ fontSize: '1.05rem', color: 'var(--fg-1)', maxWidth: '520px', margin: '0 auto 40px', lineHeight: 1.7 }}>
                We'll audit your current brand and growth setup, identify where the biggest leverage is, and show you what a compounding brand engine looks like for your business — in a free call.
              </p>
            </Reveal>
            <Reveal direction="up" delay={0.15}>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/contact" style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  padding: '14px 28px', borderRadius: '999px',
                  background: 'linear-gradient(135deg, #4b6bff, #8b5cf6)',
                  color: 'white', fontWeight: '600', fontSize: '0.95rem', textDecoration: 'none',
                }}>
                  Book Free Brand Audit →
                </Link>
                <Link href="/case-studies" style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  padding: '14px 28px', borderRadius: '999px',
                  border: '1px solid var(--line-strong)',
                  color: 'var(--fg-1)', fontWeight: '500', fontSize: '0.95rem', textDecoration: 'none',
                }}>
                  See Our Work
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

      </div>
      <Footer />

      <style>{`
        .team-card:hover {
          border-color: var(--hover-border) !important;
          transform: translateY(-3px);
        }
        @media (max-width: 1024px) {
          .values-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media (max-width: 900px) {
          .mission-grid  { grid-template-columns: 1fr !important; gap: 40px !important; }
          .team-grid     { grid-template-columns: repeat(2,1fr) !important; }
          .stats-grid    { grid-template-columns: repeat(2,1fr) !important; }
          .values-grid   { grid-template-columns: repeat(2,1fr) !important; }
          .principle-row { grid-template-columns: 40px 1fr !important; gap: 16px !important; }
        }
        @media (max-width: 560px) {
          .team-grid { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: 1fr !important; }
          .values-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
