import { Metadata } from 'next';
import { Pricing } from '@/components/sections/Pricing';
import { Footer } from '@/components/Footer';
import { Reveal } from '@/components/ui/Reveal';

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Three productised packages for D2C and emerging brands. Custom enterprise engagements for category leaders.',
};

const FAQ = [
  {
    q: "What's the minimum engagement?",
    a: 'We work on monthly retainers with a minimum 3-month commitment. This gives us enough time to build, test, and compound results.',
  },
  {
    q: 'Do you work with international brands?',
    a: 'Yes. We have active engagements in India, UAE, UK, and US. Pricing is in INR but we can invoice in USD/AED on request.',
  },
  {
    q: `What's included in the "Growth Audit"?`,
    a: 'A full audit of your paid accounts, organic footprint, content setup, and conversion funnel — with a prioritised action plan. Free for qualifying brands.',
  },
  {
    q: 'Can we start with one system and add more?',
    a: 'Yes. Most brands start with Performance or SEO, then layer in AI systems and lifecycle as they scale. The Launch plan is designed for this.',
  },
  {
    q: 'What platforms do you work across?',
    a: 'Meta, Google, Amazon, YouTube, LinkedIn, WhatsApp, Shopify, WooCommerce, GA4, GTM, Klaviyo, and custom stacks via API.',
  },
  {
    q: 'Is there a setup fee?',
    a: 'No setup fee. The first month includes onboarding, audit, system setup, and a 30-day growth plan. After that, monthly billing applies.',
  },
];

export default function PricingPage() {
  return (
    <>
      <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-0)', paddingTop: '64px' }}>

        {/* Hero */}
        <section className="page-hero" style={{ padding: 'clamp(64px, 10vw, 100px) 0 0', textAlign: 'center' }}>
          <div className="hero-orb-l" style={{ background: 'radial-gradient(circle, rgba(75,107,255,0.18), transparent 65%)' }} />
          <div className="hero-orb-r" style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.12), transparent 65%)' }} />
          <div className="grid-bg" />
          <div className="shell" style={{ position: 'relative', zIndex: 1 }}>
            <Reveal direction="up" delay={0.05}>
              <span className="section-tag" style={{ color: 'var(--brand-blue)', marginBottom: '20px', display: 'inline-flex', justifyContent: 'center' }}>Pricing</span>
            </Reveal>
            <Reveal direction="up" delay={0.1}>
              <h1 style={{ fontSize: 'clamp(2.6rem, 5.5vw, 4.2rem)', fontWeight: 800, lineHeight: 1.0, letterSpacing: '-0.035em', color: 'var(--fg-0)', marginBottom: '24px' }}>
                Choose the engine,<br />
                <span className="grad-text">not the deliverable.</span>
              </h1>
            </Reveal>
            <Reveal direction="up" delay={0.15}>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--fg-1)', maxWidth: '540px', margin: '0 auto' }}>
                Three productised packages for D2C and emerging brands. Custom enterprise
                engagements for category leaders and global brands.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Pricing component (reused from homepage — header hidden, page has its own hero) */}
        <Pricing hideHeader />

        {/* FAQ */}
        <section style={{ padding: 'clamp(48px, 8vw, 80px) 0', borderTop: '1px solid var(--line)', backgroundColor: 'var(--bg-1)' }}>
          <div className="shell">
            <div style={{ maxWidth: '720px', margin: '0 auto' }}>
              <Reveal direction="up" delay={0.05}>
                <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 700, letterSpacing: '-0.025em', color: 'var(--fg-0)', marginBottom: '40px', textAlign: 'center' }}>
                  Frequently asked questions
                </h2>
              </Reveal>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {FAQ.map((item, i) => (
                  <Reveal key={i} direction="up" delay={0.05 * i}>
                    <div style={{
                      backgroundColor: 'var(--bg-2)', border: '1px solid var(--line)',
                      borderRadius: '14px', padding: '24px 28px',
                    }}>
                      <p style={{ fontWeight: '700', fontSize: '1rem', color: 'var(--fg-0)', marginBottom: '10px' }}>{item.q}</p>
                      <p style={{ fontSize: '0.9rem', lineHeight: 1.7, color: 'var(--fg-2)', margin: 0 }}>{item.a}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: 'clamp(48px, 8vw, 80px) 0', textAlign: 'center' }}>
          <div className="shell">
            <Reveal direction="up" delay={0.05}>
              <p style={{ fontSize: '0.7rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--fg-3)', marginBottom: '12px' }}>Not sure which plan is right?</p>
              <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 700, letterSpacing: '-0.025em', color: 'var(--fg-0)', marginBottom: '16px' }}>
                Start with a free audit.
              </h2>
              <p style={{ fontSize: '1rem', color: 'var(--fg-2)', marginBottom: '32px', maxWidth: '420px', margin: '0 auto 32px' }}>
                We'll review your brand and recommend the right plan — no sales pressure, just honest advice.
              </p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <a href="/contact" style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  padding: '14px 32px', borderRadius: '999px',
                  background: 'linear-gradient(135deg, #4b6bff, #8b5cf6)',
                  color: 'white', fontWeight: '600', fontSize: '1rem', textDecoration: 'none',
                }}>
                  Get Free Audit →
                </a>
                <a href="https://wa.me/918077042525" style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  padding: '14px 32px', borderRadius: '999px',
                  border: '1px solid var(--line-strong)',
                  color: 'var(--fg-1)', fontWeight: '500', fontSize: '1rem', textDecoration: 'none',
                }}>
                  💬 WhatsApp us
                </a>
              </div>
            </Reveal>
          </div>
        </section>

      </div>
      <Footer />
    </>
  );
}
