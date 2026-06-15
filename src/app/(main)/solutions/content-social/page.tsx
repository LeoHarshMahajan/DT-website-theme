import { Metadata } from 'next';
import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Content & Social Media Marketing',
  description: 'Reels, founder branding, UGC programs, and a content engine that produces at the speed of social — without losing brand quality.',
};

const SERVICES = [
  {
    icon: '▶',
    title: 'Instagram & Reels Strategy',
    desc: 'Daily Reels production with hooks tested weekly. We manage script, shoot direction, editing, caption, and distribution — you approve and post.',
    tags: ['Daily Reels', 'Hook Testing', 'Trending Audio', 'Reach Optimization'],
    color: '#c026d3',
  },
  {
    icon: '⬡',
    title: 'YouTube Content',
    desc: 'Long-form authority content and YouTube Shorts that rank. SEO-optimized scripts, thumbnail A/B testing, and end-screen funnels to capture subscribers.',
    tags: ['YouTube SEO', 'Shorts Strategy', 'Thumbnail Testing', 'Channel Growth'],
    color: '#e11d8a',
  },
  {
    icon: '◈',
    title: 'Founder & Personal Brand',
    desc: 'LinkedIn strategy for founders: original thought pieces, industry commentary, and story-driven content that builds audiences and generates inbound leads.',
    tags: ['LinkedIn Growth', 'Thought Leadership', 'Content Calendar', 'Inbound Leads'],
    color: '#4b6bff',
  },
  {
    icon: '◎',
    title: 'UGC Creator Programs',
    desc: 'Build an army of authentic brand advocates. We recruit, brief, and manage UGC creators who produce content that converts better than polished ads.',
    tags: ['Creator Recruitment', 'Brief Creation', 'UGC for Ads', 'Creator Network'],
    color: '#10b981',
  },
  {
    icon: '✦',
    title: 'Brand Voice & AI Content',
    desc: 'We train a brand-specific AI model on your tone, vocabulary, and style. Then deploy it across channels for consistent, fast content generation.',
    tags: ['Brand-Trained AI', 'Consistent Voice', 'Scale Without Loss', 'Content Operations'],
    color: '#8b5cf6',
  },
  {
    icon: '≋',
    title: 'Community & Engagement',
    desc: 'Comment management, DM strategy, community building, and engagement loops that tell algorithms your content deserves more reach.',
    tags: ['Comment Strategy', 'DM Automation', 'Community Building', 'Engagement Rate'],
    color: '#f59e0b',
  },
];

const RESULTS = [
  { value: '8.4M+', label: 'Monthly reach built', brand: 'D2C portfolio avg' },
  { value: '320%', label: 'Follower growth (6mo)', brand: 'Avg across clients' },
  { value: '2.8×', label: 'ROAS from UGC vs. polished ads', brand: 'Meta campaigns' },
  { value: '60+', label: 'Content assets per month', brand: 'Per brand output' },
];

const PROCESS = [
  { step: '01', title: 'Brand Voice Audit', desc: 'We analyze your existing content, competitive landscape, and audience to define a precise brand voice document — the foundation everything is built on.' },
  { step: '02', title: 'Content Architecture', desc: 'Channel-by-channel strategy with content pillars, posting cadence, format mix (Reels vs. carousels vs. stories), and monthly theme mapping.' },
  { step: '03', title: 'Content Production', desc: 'Scripts, briefs, creative direction, editing — all handled by our team. For video: remote shoot direction or on-site days depending on engagement level.' },
  { step: '04', title: 'Publishing & Distribution', desc: 'Scheduled posting at peak audience times. Platform-native formatting — we don\'t just repurpose one piece; each platform gets optimized content.' },
  { step: '05', title: 'Weekly Performance Review', desc: 'Engagement rate, reach, saves, shares, and follower quality analyzed weekly. What works gets replicated; what doesn\'t gets killed fast.' },
  { step: '06', title: 'Monthly Strategy Review', desc: 'Full content audit, trend integration, and quarterly theme planning. Social moves fast — our strategy moves faster.' },
];

export default function ContentSocialPage() {
  return (
    <>
      <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-0)', paddingTop: '64px' }}>

        <section className="page-hero" style={{ padding: 'clamp(72px, 11vw, 120px) 0 clamp(48px, 7vw, 80px)', borderBottom: '1px solid var(--line)' }}>
          <div className="hero-orb-l" style={{ background: 'radial-gradient(circle, rgba(192,38,211,0.18), transparent 65%)' }} />
          <div className="hero-orb-r" style={{ background: 'radial-gradient(circle, rgba(225,29,138,0.12), transparent 65%)' }} />
          <div className="grid-bg" />
          <div className="shell" style={{ position: 'relative', zIndex: 1 }}>
            <Reveal direction="up" delay={0.04}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <span className="section-tag" style={{ color: '#c026d3' }}>Content & Social</span>
                <span style={{ fontSize: '0.65rem', color: 'var(--fg-3)' }}>·</span>
                <span style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--fg-3)' }}>REELS · FOUNDER BRAND · UGC</span>
              </div>
            </Reveal>
            <Reveal direction="up" delay={0.08}>
              <h1 style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)', fontWeight: 800, lineHeight: 1.0, letterSpacing: '-0.035em', color: 'var(--fg-0)', marginBottom: '24px', maxWidth: '780px' }}>
                Content that earns<br />
                <span style={{ backgroundImage: 'linear-gradient(135deg, #c026d3, #e11d8a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  attention. Then revenue.
                </span>
              </h1>
            </Reveal>
            <Reveal direction="up" delay={0.12}>
              <p style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', lineHeight: 1.7, color: 'var(--fg-1)', maxWidth: '620px', marginBottom: '36px' }}>
                A content engine built for speed, consistency, and conversion. Reels, YouTube, LinkedIn, UGC programs — produced by our team, trained on your brand voice, distributed on your channels.
              </p>
            </Reveal>
            <Reveal direction="up" delay={0.16}>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '13px 26px', borderRadius: '999px', background: 'linear-gradient(135deg, #c026d3, #e11d8a)', color: 'white', fontWeight: '700', fontSize: '0.95rem', textDecoration: 'none' }}>
                  Start Content Engine →
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
                    <p style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1, backgroundImage: 'linear-gradient(135deg, #c026d3, #e11d8a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{r.value}</p>
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
                <p style={{ fontSize: '0.68rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#c026d3', marginBottom: '12px' }}>WHAT WE BUILD</p>
                <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.03em', color: 'var(--fg-0)' }}>
                  Six content disciplines,<br />
                  <span style={{ color: 'var(--fg-2)' }}>one brand presence.</span>
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

        <section style={{ padding: 'clamp(64px, 9vw, 100px) 0', borderBottom: '1px solid var(--line)', backgroundColor: 'var(--bg-1)' }}>
          <div className="shell">
            <div style={{ marginBottom: '52px' }}>
              <Reveal direction="up">
                <p style={{ fontSize: '0.68rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#c026d3', marginBottom: '12px' }}>HOW IT WORKS</p>
                <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.03em', color: 'var(--fg-0)' }}>
                  Content engine<br />
                  <span style={{ color: 'var(--fg-2)' }}>setup in 30 days.</span>
                </h2>
              </Reveal>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }} className="process-grid">
              {PROCESS.map((p, i) => (
                <Reveal key={p.step} direction="up" delay={0.07 * i}>
                  <div style={{ backgroundColor: 'var(--bg-2)', border: '1px solid var(--line)', borderRadius: '16px', padding: '28px', display: 'flex', gap: '20px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', flexShrink: 0, background: 'linear-gradient(135deg, #c026d3, #e11d8a)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', fontWeight: '800', color: 'white', fontFamily: 'var(--font-mono)' }}>{p.step}</div>
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

        <section style={{ padding: 'clamp(72px, 10vw, 112px) 0', textAlign: 'center', background: 'radial-gradient(ellipse 80% 50% at 50% 100%, rgba(192,38,211,0.07), transparent)' }}>
          <div className="shell">
            <Reveal direction="up">
              <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.03em', color: 'var(--fg-0)', marginBottom: '16px' }}>
                Ready to build a content<br />engine for your brand?
              </h2>
              <p style={{ fontSize: '1.05rem', color: 'var(--fg-1)', marginBottom: '36px', maxWidth: '440px', margin: '0 auto 36px' }}>
                Tell us your brand, platforms, and goals. We'll design a content system that produces, tests, and compounds — without draining your team.
              </p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '15px 32px', borderRadius: '999px', background: 'linear-gradient(135deg, #c026d3, #e11d8a)', color: 'white', fontWeight: '700', fontSize: '1rem', textDecoration: 'none' }}>
                  Build My Content Engine →
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
          .services-grid, .process-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .results-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 560px) {
          .services-grid, .process-grid, .results-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
