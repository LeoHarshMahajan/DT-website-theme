import { Metadata } from 'next';
import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';
import { Footer } from '@/components/Footer';
import { buildPageMetadata } from '@/lib/seo';

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata('/solutions/retention', {
    title: 'Retention & Lifecycle Marketing — Turn Buyers Into Brand Advocates',
    description: 'WhatsApp automation, CRM workflows, email & SMS sequences, and win-back campaigns. We build the systems that turn one-time buyers into repeat customers and brand advocates.',
  });
}

const SERVICES = [
  {
    icon: '💬',
    title: 'WhatsApp Lifecycle Automation',
    desc: 'Official WhatsApp Business API flows for post-purchase journeys, cart recovery, order updates, review requests, and re-engagement. Personalized at scale.',
    tags: ['WhatsApp Business API', 'Cart Recovery', 'Order Updates', 'Re-engagement'],
    color: '#10b981',
  },
  {
    icon: '◎',
    title: 'CRM Segmentation & Workflows',
    desc: 'RFM segmentation, behavioural triggers, and lifecycle stage-based flows in Klaviyo, HubSpot, or your existing CRM. Every customer gets a journey suited to where they are.',
    tags: ['RFM Segmentation', 'Behavioural Triggers', 'Klaviyo', 'HubSpot'],
    color: '#4b6bff',
  },
  {
    icon: '✉',
    title: 'Email & SMS Sequences',
    desc: 'Welcome series, post-purchase education, replenishment reminders, upsell flows, and win-back campaigns. Built with high-converting copy and A/B-tested subject lines.',
    tags: ['Welcome Flow', 'Post-Purchase', 'Win-Back', 'Replenishment'],
    color: '#8b5cf6',
  },
  {
    icon: '✦',
    title: 'Loyalty & Referral Programs',
    desc: 'Point systems, VIP tiers, and referral mechanics that make customers feel rewarded for sticking around — and motivated to bring friends. Integrated into your existing tech stack.',
    tags: ['Loyalty Programs', 'VIP Tiers', 'Referral Mechanics', 'Points Systems'],
    color: '#e11d8a',
  },
  {
    icon: '◈',
    title: 'Customer Health Scoring',
    desc: 'Predictive models that identify at-risk customers before they churn. We build early-warning dashboards and intervention flows that act automatically when health scores drop.',
    tags: ['Churn Prediction', 'Health Scoring', 'At-Risk Alerts', 'Intervention Flows'],
    color: '#f59e0b',
  },
  {
    icon: '⊕',
    title: 'Review & UGC Generation',
    desc: 'Automated post-purchase flows that request reviews at the right moment, redirect positive reviewers to Google/Trustpilot, and collect UGC content for your ad pipeline.',
    tags: ['Review Automation', 'Google Reviews', 'UGC Collection', 'Social Proof'],
    color: '#c026d3',
  },
];

const LIFECYCLE_STAGES = [
  {
    stage: 'Day 0–1',
    title: 'First Purchase',
    actions: ['Order confirmation + brand welcome', 'Product unboxing expectations set', 'Community / WhatsApp group invite'],
    color: '#10b981',
  },
  {
    stage: 'Day 3–7',
    title: 'Onboarding',
    actions: ['Usage tips and product education', 'Founder story / brand values content', 'Review request at peak satisfaction'],
    color: '#4b6bff',
  },
  {
    stage: 'Day 14–30',
    title: 'Engagement',
    actions: ['Complementary product suggestions', 'Referral program introduction', 'Loyalty points status update'],
    color: '#8b5cf6',
  },
  {
    stage: 'Day 60+',
    title: 'Retention & LTV',
    actions: ['Replenishment reminder (usage-based)', 'Win-back if no second purchase', 'VIP tier unlock for high-value customers'],
    color: '#e11d8a',
  },
];

const RESULTS = [
  { value: '38%', label: 'Repeat purchase lift', brand: 'WhatsApp automation' },
  { value: '2.4×', label: 'LTV improvement', brand: 'Avg at 12 months' },
  { value: '-42%', label: 'Churn rate reduction', brand: 'Health scoring system' },
  { value: '60 day', label: 'Full lifecycle live', brand: 'Setup SLA' },
];

const FAQS = [
  {
    q: 'Which brands benefit most from retention marketing?',
    a: 'Any brand where the cost of acquiring a new customer is higher than what they spend on first purchase — which is almost every D2C brand. If your CAC is ₹600 and your AOV is ₹800, retention is the only path to sustainable margins.',
  },
  {
    q: "Do you work with brands that don't have a CRM yet?",
    a: 'Yes. We help brands select and implement the right CRM for their stage, then build the retention architecture on top of it. We work with Klaviyo, HubSpot, Zoho, WebEngage, and custom setups.',
  },
  {
    q: 'How long before we see results?',
    a: 'Basic flows (welcome series, cart recovery) go live in 2–3 weeks and show results within 30 days. Full lifecycle architecture — segmentation, scoring, loyalty — takes 60–90 days to build and 3–6 months to fully compound.',
  },
  {
    q: 'Can you integrate with our existing tools?',
    a: 'Yes. We connect your e-commerce platform (Shopify, WooCommerce, Magento), CRM, ad platforms, and analytics into a unified data layer. No more siloed systems — every action informs every flow.',
  },
  {
    q: "What's the difference between retention marketing and just sending emails?",
    a: "Batch-and-blast emails are not retention marketing. Retention is understanding where a customer is in their lifecycle, what their behavior signals about intent, and delivering the right message at the right moment through the right channel. It's systematic, not broadcast.",
  },
];

export default function RetentionPage() {
  return (
    <>
      <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-0)', paddingTop: '64px' }}>

        <section className="page-hero" style={{ padding: 'clamp(72px, 11vw, 120px) 0 clamp(48px, 7vw, 80px)', borderBottom: '1px solid var(--line)' }}>
          <div className="hero-orb-l" style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.2), transparent 65%)' }} />
          <div className="hero-orb-r" style={{ background: 'radial-gradient(circle, rgba(192,38,211,0.14), transparent 65%)' }} />
          <div className="grid-bg" />
          <div className="shell" style={{ position: 'relative', zIndex: 1 }}>
            <Reveal direction="up" delay={0.04}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <span className="section-tag" style={{ color: 'var(--brand-violet)' }}>Retention & Lifecycle</span>
                <span style={{ fontSize: '0.65rem', color: 'var(--fg-3)' }}>·</span>
                <span style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--fg-3)' }}>WHATSAPP · CRM · EMAIL & SMS</span>
              </div>
            </Reveal>
            <Reveal direction="up" delay={0.08}>
              <h1 style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)', fontWeight: 800, lineHeight: 1.0, letterSpacing: '-0.035em', color: 'var(--fg-0)', marginBottom: '24px', maxWidth: '820px' }}>
                The second sale is worth<br />
                <span style={{ backgroundImage: 'linear-gradient(135deg, #8b5cf6, #c026d3)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  more than the first.
                </span>
              </h1>
            </Reveal>
            <Reveal direction="up" delay={0.12}>
              <p style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', lineHeight: 1.7, color: 'var(--fg-1)', maxWidth: '640px', marginBottom: '36px' }}>
                Acquiring a new customer costs 5× more than keeping an existing one. We build the lifecycle systems — WhatsApp automation, CRM workflows, email and SMS sequences — that turn first-time buyers into loyal repeat customers and brand advocates.
              </p>
            </Reveal>
            <Reveal direction="up" delay={0.16}>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '13px 26px', borderRadius: '999px', background: 'linear-gradient(135deg, #8b5cf6, #c026d3)', color: 'white', fontWeight: '700', fontSize: '0.95rem', textDecoration: 'none' }}>
                  Build My Retention System →
                </Link>
                <Link href="/case-studies" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '13px 26px', borderRadius: '999px', border: '1px solid var(--line-strong)', color: 'var(--fg-1)', fontWeight: '500', fontSize: '0.95rem', textDecoration: 'none' }}>
                  View Case Studies
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Results strip */}
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

        {/* Services */}
        <section style={{ padding: 'clamp(64px, 9vw, 100px) 0', borderBottom: '1px solid var(--line)' }}>
          <div className="shell">
            <div style={{ marginBottom: '52px' }}>
              <Reveal direction="up">
                <p style={{ fontSize: '0.68rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--brand-violet)', marginBottom: '12px' }}>WHAT WE BUILD</p>
                <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.03em', color: 'var(--fg-0)' }}>
                  Six systems that keep<br />
                  <span style={{ color: 'var(--fg-2)' }}>customers coming back.</span>
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

        {/* Lifecycle Stages */}
        <section style={{ padding: 'clamp(64px, 9vw, 100px) 0', borderBottom: '1px solid var(--line)', backgroundColor: 'var(--bg-1)' }}>
          <div className="shell">
            <div style={{ marginBottom: '52px' }}>
              <Reveal direction="up">
                <p style={{ fontSize: '0.68rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--brand-violet)', marginBottom: '12px' }}>THE LIFECYCLE ARCHITECTURE</p>
                <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.03em', color: 'var(--fg-0)' }}>
                  Day 0 to day 60.<br />
                  <span style={{ color: 'var(--fg-2)' }}>Every touchpoint mapped.</span>
                </h2>
              </Reveal>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }} className="lifecycle-grid">
              {LIFECYCLE_STAGES.map((stage, i) => (
                <Reveal key={stage.stage} direction="up" delay={0.07 * i}>
                  <div style={{ backgroundColor: 'var(--bg-2)', border: '1px solid var(--line)', borderRadius: '16px', padding: '24px', height: '100%' }}>
                    <div style={{ marginBottom: '12px' }}>
                      <span style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: stage.color, fontWeight: '700' }}>{stage.stage}</span>
                    </div>
                    <div style={{ width: '36px', height: '3px', borderRadius: '2px', backgroundColor: stage.color, marginBottom: '14px' }} />
                    <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--fg-0)', marginBottom: '14px' }}>{stage.title}</h3>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {stage.actions.map(action => (
                        <li key={action} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                          <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: stage.color, flexShrink: 0, marginTop: '6px' }} />
                          <span style={{ fontSize: '0.82rem', color: 'var(--fg-2)', lineHeight: 1.5 }}>{action}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section style={{ padding: 'clamp(64px, 9vw, 100px) 0', borderBottom: '1px solid var(--line)' }}>
          <div className="shell">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'start' }} className="faq-grid">
              <Reveal direction="up" delay={0.05}>
                <div>
                  <p style={{ fontSize: '0.68rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--brand-violet)', marginBottom: '12px' }}>COMMON QUESTIONS</p>
                  <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.025em', color: 'var(--fg-0)' }}>
                    Everything you need<br />to know.
                  </h2>
                </div>
              </Reveal>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                {FAQS.map((faq, i) => (
                  <Reveal key={i} direction="up" delay={0.06 * i}>
                    <div style={{ padding: '22px 0', borderBottom: '1px solid var(--line)' }}>
                      <h3 style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--fg-0)', marginBottom: '10px' }}>{faq.q}</h3>
                      <p style={{ fontSize: '0.875rem', lineHeight: 1.7, color: 'var(--fg-2)' }}>{faq.a}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: 'clamp(72px, 10vw, 112px) 0', textAlign: 'center', background: 'radial-gradient(ellipse 80% 50% at 50% 100%, rgba(139,92,246,0.08), transparent)' }}>
          <div className="shell">
            <Reveal direction="up">
              <p style={{ fontSize: '0.68rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--brand-violet)', marginBottom: '16px' }}>START BUILDING</p>
              <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.03em', color: 'var(--fg-0)', maxWidth: '660px', margin: '0 auto 16px' }}>
                Stop leaving repeat<br />revenue on the table.
              </h2>
              <p style={{ fontSize: '1.05rem', color: 'var(--fg-1)', maxWidth: '460px', margin: '0 auto 36px' }}>
                We'll audit your current post-purchase journey, identify the highest-value lifecycle gaps, and design a retention architecture for your brand — in a free call.
              </p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '15px 32px', borderRadius: '999px', background: 'linear-gradient(135deg, #8b5cf6, #c026d3)', color: 'white', fontWeight: '700', fontSize: '1rem', textDecoration: 'none' }}>
                  Get Free Retention Audit →
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
        @media (max-width: 1024px) {
          .lifecycle-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 900px) {
          .services-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .results-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .faq-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
        @media (max-width: 560px) {
          .services-grid, .lifecycle-grid, .results-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
