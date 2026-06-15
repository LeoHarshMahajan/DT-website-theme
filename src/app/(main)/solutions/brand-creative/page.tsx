import { Metadata } from 'next';
import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Brand & Creative — Identity That Converts',
  description: 'Brand strategy, identity systems, performance ad creative, UI/UX design, and video production. Creative that doesn\'t just look good — it converts.',
};

const SERVICES = [
  {
    icon: '◈',
    title: 'Brand Strategy',
    desc: 'Before a single logo is drawn: positioning, audience archetypes, competitive differentiation, brand story, and the strategic foundation that makes everything else coherent.',
    tags: ['Positioning', 'Brand Archetypes', 'Messaging Framework', 'Tone of Voice'],
    color: '#e11d8a',
  },
  {
    icon: '✦',
    title: 'Brand Identity System',
    desc: 'Logo, typography, colour system, iconography, photography style, and brand guidelines — built as a living system, not a static PDF.',
    tags: ['Logo Design', 'Colour System', 'Typography', 'Brand Guidelines'],
    color: '#c026d3',
  },
  {
    icon: '⊕',
    title: 'Performance Ad Creative',
    desc: 'Creative isn\'t decoration — it\'s 70% of your ad performance. We produce 30–60 ad variants monthly: static, video, UGC, and carousels, each with a testable hypothesis.',
    tags: ['Static Ads', 'Video Ads', 'UGC Creative', 'Carousel Ads'],
    color: '#8b5cf6',
  },
  {
    icon: '◎',
    title: 'Landing Page & UI/UX Design',
    desc: 'High-conversion landing pages built on CRO principles. Hero, proof, offer, CTA — every element is designed to reduce friction and push visitors to act.',
    tags: ['CRO Design', 'Landing Pages', 'A/B Test Ready', 'Mobile First'],
    color: '#4b6bff',
  },
  {
    icon: '▶',
    title: 'Video Production',
    desc: 'Brand films, product demos, founder stories, and Reels. We handle concept, script, shoot direction, editing, and platform-specific cuts — end-to-end.',
    tags: ['Brand Films', 'Product Videos', 'Reels Editing', 'Motion Graphics'],
    color: '#f59e0b',
  },
  {
    icon: '≋',
    title: 'Packaging & Print',
    desc: 'D2C product packaging that drives unboxing content, shelf presence, and brand recall. Designed for both physical impact and social sharing.',
    tags: ['Product Packaging', 'Box Design', 'Unboxing Experience', 'Social-Ready'],
    color: '#10b981',
  },
];

const PROCESS = [
  { step: '01', title: 'Discovery & Research', desc: 'We study your category, competitors, target customers, and the gap in the market. Brand strategy starts with understanding what currently exists — and what\'s missing.' },
  { step: '02', title: 'Positioning Workshop', desc: 'A 90-minute session with your founding team to align on: who you\'re for, what you stand for, what you stand against, and how you\'re different from every other option.' },
  { step: '03', title: 'Strategy Deck', desc: 'A 40-60 page document covering brand positioning, audience profiles, messaging hierarchy, tone of voice, and personality. This becomes your team\'s north star.' },
  { step: '04', title: 'Identity Design', desc: 'Three distinct brand directions explored, refined into one final system. Logo, type, colour, and photography style — all built to function across digital and physical.' },
  { step: '05', title: 'Creative Production', desc: 'Once identity is locked, we enter production mode: ad creative, landing pages, social templates, packaging, or video — depending on your immediate priorities.' },
  { step: '06', title: 'Brand Guidelines & Handover', desc: 'A comprehensive brand manual covering usage rules, do\'s and don\'ts, and asset library. Your team and future agencies can build from this without losing consistency.' },
];

const RESULTS = [
  { value: '3×', label: 'ROAS lift after creative refresh', brand: 'D2C client' },
  { value: '60+', label: 'Ad variants produced monthly', brand: 'Per brand avg' },
  { value: '92%', label: 'Brand consistency score', brand: 'Post-implementation' },
  { value: '4 wk', label: 'Identity system delivery', brand: 'Avg turnaround' },
];

export default function BrandCreativePage() {
  return (
    <>
      <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-0)', paddingTop: '64px' }}>

        <section className="page-hero" style={{ padding: 'clamp(72px, 11vw, 120px) 0 clamp(48px, 7vw, 80px)', borderBottom: '1px solid var(--line)' }}>
          <div className="hero-orb-l" style={{ background: 'radial-gradient(circle, rgba(225,29,138,0.18), transparent 65%)' }} />
          <div className="hero-orb-r" style={{ background: 'radial-gradient(circle, rgba(192,38,211,0.12), transparent 65%)' }} />
          <div className="grid-bg" />
          <div className="shell" style={{ position: 'relative', zIndex: 1 }}>
            <Reveal direction="up" delay={0.04}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <span className="section-tag" style={{ color: '#e11d8a' }}>Brand & Creative</span>
                <span style={{ fontSize: '0.65rem', color: 'var(--fg-3)' }}>·</span>
                <span style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--fg-3)' }}>IDENTITY · AD CREATIVE · UI/UX</span>
              </div>
            </Reveal>
            <Reveal direction="up" delay={0.08}>
              <h1 style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)', fontWeight: 800, lineHeight: 1.0, letterSpacing: '-0.035em', color: 'var(--fg-0)', marginBottom: '24px', maxWidth: '780px' }}>
                Creative that makes<br />
                <span style={{ backgroundImage: 'linear-gradient(135deg, #e11d8a, #c026d3)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  people stop. Then buy.
                </span>
              </h1>
            </Reveal>
            <Reveal direction="up" delay={0.12}>
              <p style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', lineHeight: 1.7, color: 'var(--fg-1)', maxWidth: '620px', marginBottom: '36px' }}>
                Brand strategy, identity systems, performance ad creative, and video — all built as a performance system. We don't separate brand from performance. Great brand work drives better ad results. Always.
              </p>
            </Reveal>
            <Reveal direction="up" delay={0.16}>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '13px 26px', borderRadius: '999px', background: 'linear-gradient(135deg, #e11d8a, #c026d3)', color: 'white', fontWeight: '700', fontSize: '0.95rem', textDecoration: 'none' }}>
                  Start Brand Project →
                </Link>
                <Link href="/case-studies" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '13px 26px', borderRadius: '999px', border: '1px solid var(--line-strong)', color: 'var(--fg-1)', fontWeight: '500', fontSize: '0.95rem', textDecoration: 'none' }}>
                  View Work
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
                    <p style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1, backgroundImage: 'linear-gradient(135deg, #e11d8a, #c026d3)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{r.value}</p>
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
                <p style={{ fontSize: '0.68rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#e11d8a', marginBottom: '12px' }}>CAPABILITIES</p>
                <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.03em', color: 'var(--fg-0)' }}>
                  From strategy to shelf.<br />
                  <span style={{ color: 'var(--fg-2)' }}>Every creative touchpoint.</span>
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
                <p style={{ fontSize: '0.68rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#e11d8a', marginBottom: '12px' }}>OUR PROCESS</p>
                <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.03em', color: 'var(--fg-0)' }}>
                  Strategy first.<br />
                  <span style={{ color: 'var(--fg-2)' }}>Creative follows.</span>
                </h2>
              </Reveal>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }} className="process-grid">
              {PROCESS.map((p, i) => (
                <Reveal key={p.step} direction="up" delay={0.07 * i}>
                  <div style={{ backgroundColor: 'var(--bg-2)', border: '1px solid var(--line)', borderRadius: '16px', padding: '28px', display: 'flex', gap: '20px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', flexShrink: 0, background: 'linear-gradient(135deg, #e11d8a, #c026d3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', fontWeight: '800', color: 'white', fontFamily: 'var(--font-mono)' }}>{p.step}</div>
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

        <section style={{ padding: 'clamp(72px, 10vw, 112px) 0', textAlign: 'center', background: 'radial-gradient(ellipse 80% 50% at 50% 100%, rgba(225,29,138,0.07), transparent)' }}>
          <div className="shell">
            <Reveal direction="up">
              <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.03em', color: 'var(--fg-0)', marginBottom: '16px' }}>
                Ready to build a brand<br />people remember?
              </h2>
              <p style={{ fontSize: '1.05rem', color: 'var(--fg-1)', marginBottom: '36px', maxWidth: '440px', margin: '0 auto 36px' }}>
                Whether you're starting fresh or refreshing an existing brand, let's build something that earns attention and converts it into revenue.
              </p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '15px 32px', borderRadius: '999px', background: 'linear-gradient(135deg, #e11d8a, #c026d3)', color: 'white', fontWeight: '700', fontSize: '1rem', textDecoration: 'none' }}>
                  Start Brand Project →
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
