import { Metadata } from 'next';
import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Organic Growth — SEO, AEO & GEO',
  description: 'AI-first SEO strategies that compound over time. Technical SEO, content clusters, AEO for AI answer engines, and programmatic SEO at scale.',
};

const SERVICES = [
  {
    icon: '⚙',
    title: 'Technical SEO',
    desc: 'Core Web Vitals, crawlability, schema markup, site architecture, and index hygiene. We fix the foundation so everything else compounds.',
    tags: ['Core Web Vitals', 'Schema Markup', 'Crawl Budget', 'Page Speed'],
  },
  {
    icon: '✦',
    title: 'Content Clusters & Strategy',
    desc: 'Topical authority built around your products. We map buyer intent, identify content gaps, and publish AI-assisted, human-edited content at scale.',
    tags: ['Topical Authority', 'Intent Mapping', 'Content Calendar', 'Pillar Pages'],
  },
  {
    icon: '◎',
    title: 'Answer Engine Optimisation (AEO)',
    desc: 'Rank in ChatGPT, Perplexity, Google SGE, and Gemini. We structure your content so AI answer engines cite your brand as the definitive source.',
    tags: ['ChatGPT Citations', 'Google SGE', 'Perplexity Rankings', 'Featured Snippets'],
  },
  {
    icon: '⊕',
    title: 'Programmatic SEO',
    desc: 'Thousands of hyper-targeted landing pages built from structured data. Ideal for D2C, SaaS, and multi-location businesses at scale.',
    tags: ['Location Pages', 'Product SEO', 'Data-Driven Pages', 'Internal Linking'],
  },
  {
    icon: '◈',
    title: 'GEO Targeting',
    desc: 'Local SEO for dealer networks, franchises, and city-level presence. Google Business Profile, local citations, and hyperlocal content strategy.',
    tags: ['Google Business Profile', 'Local Citations', 'NAP Consistency', 'Hyperlocal Content'],
  },
  {
    icon: '≋',
    title: 'Link Authority & Digital PR',
    desc: 'White-hat link building through editorial placements, HARO, and brand mentions. Domain authority that compounds, never penalized.',
    tags: ['Editorial Links', 'Digital PR', 'Brand Mentions', 'HARO Pitching'],
  },
];

const PROCESS = [
  { step: '01', title: 'Technical SEO Audit', desc: '200-point audit covering architecture, speed, indexing, schema, and content quality. You get a ranked punch list with impact scores.' },
  { step: '02', title: 'Keyword + Intent Mapping', desc: 'We map your entire keyword universe — short-tail, long-tail, competitor gaps, and AI answer engine queries — into a 90-day plan.' },
  { step: '03', title: 'Content Architecture', desc: 'Pillar pages, cluster articles, and AEO-structured FAQ content built around your buyer journey and product ecosystem.' },
  { step: '04', title: 'AI-Assisted Publishing', desc: 'Our brand-trained AI drafts content; human editors refine for accuracy, tone, and entity depth. 4–8× faster than traditional agencies.' },
  { step: '05', title: 'Link Building & Authority', desc: 'Monthly white-hat link campaigns — editorial placements, resource pages, digital PR, and thought leadership syndication.' },
  { step: '06', title: 'Monthly Reporting', desc: 'Live dashboard showing keyword movement, traffic change, AEO citations, and ROI. No vanity metrics — only numbers tied to revenue.' },
];

const RESULTS = [
  { value: '+312%', label: 'Organic traffic growth', brand: 'Kajaria Ceramics' },
  { value: '1,840+', label: 'Keywords ranked Page 1', brand: 'Kajaria Ceramics' },
  { value: '+82%', label: 'Organic leads increase', brand: 'Kajaria Ceramics' },
  { value: '9 mo', label: 'Time to measurable ROI', brand: 'Avg across portfolio' },
];

const FAQS = [
  {
    q: 'How long before SEO shows results?',
    a: 'Technical fixes and quick wins appear in 60–90 days. Compounding traffic growth — where rankings build on rankings — typically hits Month 4–6 and accelerates through Month 12. SEO is a compounding asset, not a switch.',
  },
  {
    q: 'Do you handle AEO separately from traditional SEO?',
    a: 'AEO (Answer Engine Optimisation) is embedded in everything we do — schema markup, structured FAQ content, and entity-first writing are standard in all our content deliverables. You don\'t pay extra for AI visibility.',
  },
  {
    q: 'What industries do you have the most SEO experience in?',
    a: 'D2C and e-commerce, B2B SaaS, real estate, hospitality, manufacturing, and education. We\'ve ranked in 14+ verticals, so we bring pattern recognition across categories.',
  },
  {
    q: 'Do you write the content or do we?',
    a: 'We write everything. Our AI-assisted editorial team handles briefs, first drafts, optimization, and publishing coordination. You review and approve before anything goes live.',
  },
  {
    q: 'Can SEO work alongside our paid ads?',
    a: 'Yes — and it\'s the most efficient stack. Paid ads validate keywords before you invest heavily in organic; organic rankings reduce your paid dependency over 12–18 months. We run both for several clients.',
  },
];

export default function OrganicGrowthPage() {
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
                <span className="section-tag" style={{ color: 'var(--brand-blue)' }}>Organic Growth</span>
                <span style={{ fontSize: '0.65rem', color: 'var(--fg-3)' }}>·</span>
                <span style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--fg-3)' }}>SEO · AEO · GEO</span>
              </div>
            </Reveal>
            <Reveal direction="up" delay={0.08}>
              <h1 style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)', fontWeight: 800, lineHeight: 1.0, letterSpacing: '-0.035em', color: 'var(--fg-0)', marginBottom: '24px', maxWidth: '780px' }}>
                Win Google, ChatGPT,<br />
                <span className="grad-text">Perplexity, and Gemini.</span>
              </h1>
            </Reveal>
            <Reveal direction="up" delay={0.12}>
              <p style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', lineHeight: 1.7, color: 'var(--fg-1)', maxWidth: '620px', marginBottom: '36px' }}>
                The old SEO playbook is dead. Search is now split across 5+ channels — Google, ChatGPT, Perplexity, Gemini, and YouTube. We build AI-first organic systems that capture demand everywhere buyers are looking.
              </p>
            </Reveal>
            <Reveal direction="up" delay={0.16}>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '13px 26px', borderRadius: '999px', background: 'linear-gradient(135deg, #4b6bff, #8b5cf6)', color: 'white', fontWeight: '700', fontSize: '0.95rem', textDecoration: 'none' }}>
                  Get Free SEO Audit →
                </Link>
                <Link href="/case-studies" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '13px 26px', borderRadius: '999px', border: '1px solid var(--line-strong)', color: 'var(--fg-1)', fontWeight: '500', fontSize: '0.95rem', textDecoration: 'none' }}>
                  See Case Studies
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Results bar */}
        <section style={{ borderBottom: '1px solid var(--line)', backgroundColor: 'var(--bg-1)' }}>
          <div className="shell">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px', backgroundColor: 'var(--line)' }} className="results-grid">
              {RESULTS.map((r, i) => (
                <Reveal key={r.label} direction="up" delay={0.05 * i}>
                  <div style={{ backgroundColor: 'var(--bg-1)', padding: '28px 20px', textAlign: 'center' }}>
                    <p style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1, backgroundImage: 'var(--grad-brand)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{r.value}</p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--fg-2)', margin: '4px 0 2px' }}>{r.label}</p>
                    <p style={{ fontSize: '0.7rem', color: 'var(--fg-3)', fontFamily: 'var(--font-mono)' }}>{r.brand}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section style={{ padding: 'clamp(64px, 9vw, 100px) 0', borderBottom: '1px solid var(--line)' }}>
          <div className="shell">
            <div style={{ marginBottom: '52px' }}>
              <Reveal direction="up" delay={0.05}>
                <p style={{ fontSize: '0.68rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--brand-blue)', marginBottom: '12px' }}>WHAT WE DO</p>
              </Reveal>
              <Reveal direction="up" delay={0.1}>
                <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.03em', color: 'var(--fg-0)' }}>
                  Six organic growth disciplines,<br />
                  <span style={{ color: 'var(--fg-2)' }}>one interconnected system.</span>
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
                        <span key={t} style={{ padding: '3px 10px', borderRadius: '999px', backgroundColor: 'rgba(75,107,255,0.1)', border: '1px solid rgba(75,107,255,0.2)', fontSize: '0.72rem', color: 'var(--brand-blue)', fontWeight: '500' }}>{t}</span>
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
                <p style={{ fontSize: '0.68rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--brand-blue)', marginBottom: '12px' }}>HOW WE WORK</p>
              </Reveal>
              <Reveal direction="up" delay={0.1}>
                <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.03em', color: 'var(--fg-0)' }}>
                  6-step organic<br />
                  <span style={{ color: 'var(--fg-2)' }}>growth engine.</span>
                </h2>
              </Reveal>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }} className="process-grid">
              {PROCESS.map((p, i) => (
                <Reveal key={p.step} direction="up" delay={0.07 * i}>
                  <div style={{ backgroundColor: 'var(--bg-2)', border: '1px solid var(--line)', borderRadius: '16px', padding: '28px', display: 'flex', gap: '20px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', flexShrink: 0, background: 'linear-gradient(135deg, #4b6bff, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', fontWeight: '800', color: 'white', fontFamily: 'var(--font-mono)' }}>{p.step}</div>
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
                <p style={{ fontSize: '0.68rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--brand-blue)', marginBottom: '12px' }}>COMMON QUESTIONS</p>
                <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.03em', color: 'var(--fg-0)', marginBottom: '40px' }}>
                  SEO questions, answered.
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
        <section style={{ padding: 'clamp(72px, 10vw, 112px) 0', textAlign: 'center', background: 'radial-gradient(ellipse 80% 50% at 50% 100%, rgba(75,107,255,0.07), transparent)' }}>
          <div className="shell">
            <Reveal direction="up" delay={0.05}>
              <p style={{ fontSize: '0.68rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--brand-blue)', marginBottom: '16px' }}>START GROWING</p>
              <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.03em', color: 'var(--fg-0)', marginBottom: '16px' }}>
                Ready to own organic<br />search in your category?
              </h2>
              <p style={{ fontSize: '1.05rem', color: 'var(--fg-1)', marginBottom: '36px', maxWidth: '440px', margin: '0 auto 36px' }}>
                We'll audit your current SEO, identify the biggest gaps, and show you exactly what it takes to dominate — free, no strings.
              </p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '15px 32px', borderRadius: '999px', background: 'linear-gradient(135deg, #4b6bff, #8b5cf6)', color: 'white', fontWeight: '700', fontSize: '1rem', textDecoration: 'none' }}>
                  Book Free Audit →
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
          .services-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .process-grid  { grid-template-columns: 1fr !important; }
          .results-grid  { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 560px) {
          .services-grid { grid-template-columns: 1fr !important; }
          .results-grid  { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
