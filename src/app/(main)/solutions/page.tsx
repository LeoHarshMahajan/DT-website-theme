import { Metadata } from 'next';
import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';
import { Footer } from '@/components/Footer';
import { buildPageMetadata } from '@/lib/seo';

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata('/solutions', {
    title: 'Growth Solutions',
    description: 'Six AI-powered growth systems: Organic Growth, Performance, Content & Social, AI & Automation, Brand & Creative, Analytics & Conversion.',
  });
}

const SOLUTIONS = [
  {
    num: '01',
    slug: 'organic-growth',
    title: 'Organic Growth',
    eyebrow: 'SEO · AEO · GEO',
    headline: 'Win Google, ChatGPT, Perplexity, and Gemini.',
    desc: 'The old SEO playbook is dead. We build AI-first organic systems: technical SEO, content clusters, AEO structures for AI answer engines, and GEO targeting for dealer/franchise networks.',
    features: [
      'Technical SEO audit + implementation',
      'Content strategy & AI-assisted publishing',
      'Answer Engine Optimisation (AEO)',
      'Programmatic SEO at scale',
      'International & GEO targeting',
    ],
    caseLink: '/case-studies',
    caseText: '+312% organic traffic — Kajaria',
    color: '#4b6bff',
    href: '/solutions/organic-growth',
  },
  {
    num: '02',
    slug: 'performance',
    title: 'Performance Growth',
    eyebrow: 'PAID ACQUISITION',
    headline: 'Meta, Google, YouTube, Amazon — built for ROAS.',
    desc: 'AI-assisted media buying with creative strategy baked in. We don\'t just manage budgets — we build creative systems, server-side tracking, and attribution models that compound over time.',
    features: [
      'Meta Ads (Advantage+ + manual)',
      'Google Ads (PMax + campaigns)',
      'Amazon PPC + DSP',
      'Server-side tracking (GA4 / CAPI)',
      'Creative strategy + iteration',
    ],
    caseLink: '/case-studies',
    caseText: '4.2× blended ROAS — Portronics',
    color: '#8b5cf6',
    href: '/solutions/performance',
  },
  {
    num: '03',
    slug: 'content-social',
    title: 'Content & Social',
    eyebrow: 'ATTENTION SYSTEMS',
    headline: 'Reels, founder branding, UGC — built to compound.',
    desc: 'A content engine that produces at the speed of social: daily Reels, founder-led LinkedIn, UGC programs, and a brand voice trained into our AI systems for scale without quality loss.',
    features: [
      'Instagram & YouTube Reels strategy',
      'Founder / personal brand development',
      'UGC creator programs',
      'LinkedIn B2B content',
      'AI content generation (brand-trained)',
    ],
    caseLink: '/case-studies',
    caseText: '8.4M+ monthly reach built',
    color: '#c026d3',
    href: '/solutions/content-social',
  },
  {
    num: '04',
    slug: 'ai-automation',
    title: 'AI & Automation',
    eyebrow: 'AI MARKETING SYSTEMS',
    headline: 'AI systems, LLMs, workflows, and martech stack.',
    desc: 'We wire Claude, GPT, Gemini, and open-source models into your marketing operations: research systems, creative briefing, campaign monitoring, and CRM flows — all automated.',
    features: [
      'AI research & intelligence systems',
      'Automated content briefing',
      'Martech stack integration',
      'AI-powered chatbots & WhatsApp flows',
      'Custom model fine-tuning (brand voice)',
    ],
    caseLink: '/case-studies',
    caseText: '120hr/month saved per brand',
    color: '#6366f1',
    href: '/solutions/ai-automation',
    featured: true,
  },
  {
    num: '05',
    slug: 'brand-creative',
    title: 'Brand & Creative',
    eyebrow: 'IDENTITY THAT CONVERTS',
    headline: 'Brand systems, ad creative, UI/UX, video.',
    desc: 'Creative that performs, not just looks good. From brand identity to performance ad creative — we build systems that produce 60+ variants per week without diluting the brand.',
    features: [
      'Brand strategy & identity',
      'Performance ad creative (static + video)',
      'UI/UX design (landing pages)',
      'Video production & motion',
      'AI creative generation systems',
    ],
    caseLink: '/case-studies',
    caseText: 'ROAS lift via creative refresh',
    color: '#e11d8a',
    href: '/solutions/brand-creative',
  },
  {
    num: '06',
    slug: 'analytics',
    title: 'Analytics & Conversion',
    eyebrow: 'DATA + DECISIONS',
    headline: 'GA4, attribution, dashboards, CRO.',
    desc: 'You can\'t grow what you can\'t measure. We implement GA4, build custom attribution models, create live dashboards, and run systematic CRO programs — so every decision is data-backed.',
    features: [
      'GA4 + GTM implementation',
      'Custom attribution models',
      'Real-time growth dashboards',
      'CRO (A/B testing, landing pages)',
      'Multi-channel ROI reporting',
    ],
    caseLink: '/case-studies',
    caseText: '360° attribution built',
    color: '#10b981',
    href: '/solutions/analytics',
  },
];

export default function SolutionsPage() {
  return (
    <>
      <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-0)', paddingTop: '64px' }}>

        {/* Header */}
        <section className="page-hero" style={{ padding: 'clamp(64px, 10vw, 100px) 0', borderBottom: '1px solid var(--line)' }}>
          <div className="hero-orb-l" style={{ background: 'radial-gradient(circle, rgba(75,107,255,0.18), transparent 65%)' }} />
          <div className="hero-orb-r" style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.12), transparent 65%)' }} />
          <div className="grid-bg" />
          <div className="shell" style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ maxWidth: '720px' }}>
              <Reveal direction="up" delay={0.05}>
                <span className="section-tag" style={{ color: 'var(--brand-blue)', marginBottom: '20px', display: 'inline-flex' }}>Growth Solutions</span>
              </Reveal>
              <Reveal direction="up" delay={0.1}>
                <h1 style={{ fontSize: 'clamp(2.6rem, 5.5vw, 4.2rem)', fontWeight: 800, lineHeight: 1.0, letterSpacing: '-0.035em', color: 'var(--fg-0)', marginBottom: '24px' }}>
                  Six systems.<br />
                  <span className="grad-text">One connected engine.</span>
                </h1>
              </Reveal>
              <Reveal direction="up" delay={0.15}>
                <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--fg-1)', maxWidth: '600px' }}>
                  Each system is plug-and-play and outcome-linked. Use one or wire them all together
                  for compounding leverage across acquisition, retention, and intelligence.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Solutions list */}
        <section style={{ padding: 'clamp(48px, 8vw, 80px) 0' }}>
          <div className="shell">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {SOLUTIONS.map((sol, i) => (
                <Reveal key={sol.slug} direction="up" delay={0.05 * i}>
                  <div style={{
                    backgroundColor: sol.featured ? 'var(--bg-2)' : 'var(--bg-1)',
                    border: `1px solid ${sol.featured ? 'rgba(99,102,241,0.35)' : 'var(--line)'}`,
                    borderRadius: '20px', padding: 'clamp(28px, 3.5vw, 44px)',
                    display: 'grid', gridTemplateColumns: '1fr 280px', gap: '40px', alignItems: 'start',
                    boxShadow: sol.featured ? '0 0 60px rgba(99,102,241,0.08)' : 'none',
                    position: 'relative',
                  }}
                    className="sol-row"
                  >
                    {sol.featured && (
                      <div style={{
                        position: 'absolute', top: '-12px', left: '28px',
                        padding: '4px 14px', borderRadius: '20px',
                        background: 'linear-gradient(135deg, #4b6bff, #8b5cf6)',
                        fontSize: '0.68rem', fontWeight: '700', color: 'white',
                      }}>
                        ⚡ AI-Native
                      </div>
                    )}

                    {/* Left */}
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                        <span style={{ fontSize: '0.65rem', fontWeight: '700', color: 'var(--fg-3)', fontFamily: 'monospace' }}>{sol.num}</span>
                        <span style={{ fontSize: '0.65rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', color: sol.color }}>{sol.eyebrow}</span>
                      </div>
                      <Link href={sol.href} className="sol-title-link" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: '700', letterSpacing: '-0.025em', color: 'var(--fg-0)', marginBottom: '10px' }}>
                          {sol.title}
                        </h2>
                      </Link>
                      <p style={{ fontSize: '1rem', fontWeight: '500', color: 'var(--fg-1)', marginBottom: '16px', lineHeight: 1.5 }}>{sol.headline}</p>
                      <p style={{ fontSize: '0.9rem', lineHeight: 1.7, color: 'var(--fg-2)', marginBottom: '20px' }}>{sol.desc}</p>
                      <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', listStyle: 'none', padding: 0 }}>
                        {sol.features.map(f => (
                          <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{
                              width: '16px', height: '16px', borderRadius: '50%', flexShrink: 0,
                              backgroundColor: sol.color + '20',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}>
                              <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                                <path d="M1 4l2 2 4-4" stroke={sol.color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </div>
                            <span style={{ fontSize: '0.875rem', color: 'var(--fg-1)' }}>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Right */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      {/* Case proof */}
                      <div style={{
                        backgroundColor: 'var(--bg-3)', border: '1px solid var(--line)',
                        borderRadius: '12px', padding: '16px 18px',
                      }}>
                        <p style={{ fontSize: '0.65rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--fg-3)', marginBottom: '6px' }}>PROOF</p>
                        <p style={{ fontSize: '0.9rem', fontWeight: '600', color: sol.color }}>{sol.caseText}</p>
                        <Link href={sol.caseLink} style={{ fontSize: '0.78rem', color: 'var(--fg-3)', textDecoration: 'none', marginTop: '4px', display: 'block' }}>
                          View case study →
                        </Link>
                      </div>
                      {/* CTA */}
                      <Link href="/contact" style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                        padding: '12px', borderRadius: '999px',
                        background: sol.featured ? 'linear-gradient(135deg, #4b6bff, #8b5cf6)' : 'transparent',
                        border: sol.featured ? 'none' : '1px solid var(--line-strong)',
                        color: sol.featured ? 'white' : 'var(--fg-0)',
                        fontWeight: '600', fontSize: '0.875rem', textDecoration: 'none',
                        transition: 'all 0.2s',
                      }}>
                        Get started with {sol.title}
                      </Link>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

      </div>
      <Footer />

      <style>{`
        @media (max-width: 768px) { .sol-row { grid-template-columns: 1fr !important; } }
        .sol-title-link h2 { transition: color 0.15s; }
        .sol-title-link:hover h2 { color: var(--brand-blue); }
      `}</style>
    </>
  );
}
