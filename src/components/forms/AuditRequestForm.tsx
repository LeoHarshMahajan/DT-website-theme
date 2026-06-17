'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';
import { Footer } from '@/components/Footer';

const AUDIT_AREAS = [
  {
    icon: '⬡',
    title: 'Paid Media Efficiency',
    desc: 'Meta, Google, and Amazon ad accounts — ROAS, CPM, creative fatigue, audience overlap, bidding strategy.',
    color: '#4b6bff',
  },
  {
    icon: '≋',
    title: 'Organic & SEO Health',
    desc: 'Keyword rankings, technical SEO issues, backlink profile, content gaps, and missed search opportunities.',
    color: '#8b5cf6',
  },
  {
    icon: '◎',
    title: 'Conversion Funnel',
    desc: 'Landing page performance, checkout drop-off, CTA effectiveness, page speed, and A/B test opportunities.',
    color: '#c026d3',
  },
  {
    icon: '◈',
    title: 'Analytics & Tracking',
    desc: 'GA4 setup accuracy, event tracking gaps, attribution model, dashboard quality, and data blind spots.',
    color: '#4b6bff',
  },
  {
    icon: '✉',
    title: 'Lifecycle & Retention',
    desc: 'Email and WhatsApp flow coverage, segmentation quality, repeat purchase rate vs. industry benchmark.',
    color: '#8b5cf6',
  },
];

const DELIVERABLES = [
  { icon: '📄', label: 'Audit Report', desc: '10–15 page PDF with findings across all 5 channels.' },
  { icon: '⚡', label: 'Priority Actions', desc: 'Top 5 quick wins ranked by impact and ease of execution.' },
  { icon: '📊', label: 'Benchmark Comparison', desc: 'Your metrics vs. industry averages for your category.' },
  { icon: '🗺', label: 'Growth Roadmap', desc: '90-day action plan with channel recommendations and sequence.' },
];

const BUDGETS = [
  '< ₹50K / mo',
  '₹50K – ₹1L / mo',
  '₹1L – ₹3L / mo',
  '₹3L+ / mo',
  'Not sure yet',
];

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '11px 14px', borderRadius: '10px',
  border: '1px solid var(--line)', backgroundColor: 'var(--bg-2)',
  color: 'var(--fg-0)', fontSize: '0.9rem', outline: 'none',
  transition: 'border-color 0.2s', boxSizing: 'border-box',
  fontFamily: 'inherit',
};

export function AuditRequestForm() {
  const [form, setForm] = useState({
    name: '', email: '', company: '', website: '',
    phone: '', budget: '', challenge: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'AUDIT',
          name: form.name,
          email: form.email,
          company: form.company,
          website: form.website,
          phone: form.phone,
          budget: form.budget,
          message: form.challenge,
          source: '/free-growth-audit',
        }),
      });
      if (!res.ok) throw new Error('failed');
      setStatus('success');
    } catch {
      setStatus('idle');
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <>
      <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-0)', paddingTop: '64px' }}>

        {/* Hero */}
        <section className="page-hero" style={{ padding: 'clamp(64px, 10vw, 100px) 0 clamp(40px, 6vw, 64px)', borderBottom: '1px solid var(--line)' }}>
          <div className="hero-orb-l" style={{ background: 'radial-gradient(circle, rgba(192,38,211,0.16), transparent 65%)' }} />
          <div className="hero-orb-r" style={{ background: 'radial-gradient(circle, rgba(75,107,255,0.14), transparent 65%)' }} />
          <div className="grid-bg" />
          <div className="shell" style={{ position: 'relative', zIndex: 1 }}>
            <Reveal direction="up" delay={0.04}>
              <span className="section-tag" style={{ color: 'var(--brand-magenta)', marginBottom: '16px', display: 'inline-flex' }}>Free Growth Audit</span>
            </Reveal>
            <Reveal direction="up" delay={0.08}>
              <h1 style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4rem)', fontWeight: 800, lineHeight: 1.0, letterSpacing: '-0.035em', color: 'var(--fg-0)', marginBottom: '20px', maxWidth: '760px' }}>
                Find exactly where<br />
                <span style={{ backgroundImage: 'linear-gradient(135deg, #c026d3, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>your growth is leaking.</span>
              </h1>
            </Reveal>
            <Reveal direction="up" delay={0.12}>
              <p style={{ fontSize: 'clamp(1rem, 2vw, 1.15rem)', lineHeight: 1.7, color: 'var(--fg-1)', maxWidth: '580px', marginBottom: '28px' }}>
                We audit your paid media, SEO, conversion funnel, analytics, and lifecycle systems — then deliver a prioritised action plan with your biggest quick wins and a 90-day growth roadmap.
              </p>
            </Reveal>
            <Reveal direction="up" delay={0.16}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#c026d3', display: 'inline-block' }} />
                  <span style={{ fontSize: '0.85rem', color: 'var(--fg-2)' }}>100% free</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#8b5cf6', display: 'inline-block' }} />
                  <span style={{ fontSize: '0.85rem', color: 'var(--fg-2)' }}>Delivered in 48 hours</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#4b6bff', display: 'inline-block' }} />
                  <span style={{ fontSize: '0.85rem', color: 'var(--fg-2)' }}>No commitment required</span>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* What we audit strip */}
        <section style={{ borderBottom: '1px solid var(--line)', backgroundColor: 'var(--bg-1)', padding: 'clamp(48px, 7vw, 72px) 0' }}>
          <div className="shell">
            <Reveal direction="up">
              <p style={{ fontSize: '0.68rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--brand-magenta)', marginBottom: '12px' }}>WHAT WE AUDIT</p>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.03em', color: 'var(--fg-0)', marginBottom: '40px' }}>
                Five systems. One comprehensive review.
              </h2>
            </Reveal>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px' }} className="audit-areas-grid">
              {AUDIT_AREAS.map((a, i) => (
                <Reveal key={a.title} direction="up" delay={0.06 * i}>
                  <div style={{ backgroundColor: 'var(--bg-2)', border: '1px solid var(--line)', borderRadius: '14px', padding: '20px', height: '100%' }}>
                    <div style={{ fontSize: '1.3rem', color: a.color, marginBottom: '10px' }}>{a.icon}</div>
                    <p style={{ fontWeight: '700', fontSize: '0.9rem', color: 'var(--fg-0)', marginBottom: '8px', lineHeight: 1.3 }}>{a.title}</p>
                    <p style={{ fontSize: '0.78rem', lineHeight: 1.6, color: 'var(--fg-2)' }}>{a.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Form + deliverables */}
        <section style={{ padding: 'clamp(48px, 8vw, 80px) 0' }}>
          <div className="shell">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '64px', alignItems: 'start' }} className="audit-grid">

              {/* Form */}
              <Reveal direction="up" delay={0.08}>
                {status === 'success' ? (
                  <div style={{ backgroundColor: 'var(--bg-2)', border: '1px solid var(--line)', borderRadius: '20px', padding: '64px 48px', textAlign: 'center' }}>
                    <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'linear-gradient(135deg, rgba(192,38,211,0.15), rgba(139,92,246,0.15))', border: '1px solid rgba(192,38,211,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: '1.8rem' }}>✓</div>
                    <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: 'var(--fg-0)', marginBottom: '12px' }}>Audit request received.</h2>
                    <p style={{ color: 'var(--fg-2)', lineHeight: 1.7, maxWidth: '380px', margin: '0 auto 24px' }}>
                      Our team will begin your audit immediately. Expect your full report — findings, benchmarks, and 90-day roadmap — within 48 hours.
                    </p>
                    <Link href="/insights" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.88rem', color: 'var(--brand-violet)', textDecoration: 'none', fontWeight: '600' }}>
                      Explore growth insights while you wait →
                    </Link>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div>
                      <h2 style={{ fontSize: '1.4rem', fontWeight: '700', color: 'var(--fg-0)', marginBottom: '6px', letterSpacing: '-0.02em' }}>Request your free audit</h2>
                      <p style={{ fontSize: '0.875rem', color: 'var(--fg-2)', lineHeight: 1.6 }}>We need a few details to tailor the audit to your brand and channels.</p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-row">
                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: 'var(--fg-2)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Your Name *</label>
                        <input required type="text" value={form.name} onChange={e => set('name', e.target.value)} placeholder="Rahul Sharma" style={inputStyle}
                          onFocus={e => (e.currentTarget.style.borderColor = 'var(--brand-magenta)')}
                          onBlur={e => (e.currentTarget.style.borderColor = 'var(--line)')} />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: 'var(--fg-2)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Work Email *</label>
                        <input required type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="rahul@brand.com" style={inputStyle}
                          onFocus={e => (e.currentTarget.style.borderColor = 'var(--brand-magenta)')}
                          onBlur={e => (e.currentTarget.style.borderColor = 'var(--line)')} />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-row">
                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: 'var(--fg-2)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Brand / Company *</label>
                        <input required type="text" value={form.company} onChange={e => set('company', e.target.value)} placeholder="Acme Inc" style={inputStyle}
                          onFocus={e => (e.currentTarget.style.borderColor = 'var(--brand-magenta)')}
                          onBlur={e => (e.currentTarget.style.borderColor = 'var(--line)')} />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: 'var(--fg-2)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Website URL *</label>
                        <input required type="url" value={form.website} onChange={e => set('website', e.target.value)} placeholder="https://yourbrand.com" style={inputStyle}
                          onFocus={e => (e.currentTarget.style.borderColor = 'var(--brand-magenta)')}
                          onBlur={e => (e.currentTarget.style.borderColor = 'var(--line)')} />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-row">
                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: 'var(--fg-2)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Phone / WhatsApp</label>
                        <input type="tel" value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+91 98765 43210" style={inputStyle}
                          onFocus={e => (e.currentTarget.style.borderColor = 'var(--brand-magenta)')}
                          onBlur={e => (e.currentTarget.style.borderColor = 'var(--line)')} />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: 'var(--fg-2)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Monthly Marketing Budget</label>
                        <select value={form.budget} onChange={e => set('budget', e.target.value)} style={{ ...inputStyle, appearance: 'none' }}>
                          <option value="">Select range</option>
                          {BUDGETS.map(b => <option key={b} value={b}>{b}</option>)}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: 'var(--fg-2)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Current Biggest Challenge</label>
                      <textarea value={form.challenge} onChange={e => set('challenge', e.target.value)}
                        placeholder="e.g. Rising CAC, poor ROAS, low repeat purchase rate, no analytics visibility..."
                        rows={4} style={{ ...inputStyle, resize: 'vertical' }}
                        onFocus={e => (e.currentTarget.style.borderColor = 'var(--brand-magenta)')}
                        onBlur={e => (e.currentTarget.style.borderColor = 'var(--line)')} />
                    </div>

                    <button type="submit" disabled={status === 'sending'} style={{
                      width: '100%', padding: '15px', borderRadius: '999px', border: 'none',
                      background: 'linear-gradient(135deg, #c026d3, #8b5cf6)',
                      color: 'white', fontWeight: '700', fontSize: '1rem',
                      cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                      opacity: status === 'sending' ? 0.75 : 1,
                      transition: 'opacity 0.2s', fontFamily: 'inherit',
                    }}>
                      {status === 'sending' ? 'Submitting...' : 'Get My Free Audit →'}
                    </button>
                    <p style={{ fontSize: '0.78rem', color: 'var(--fg-3)', textAlign: 'center' }}>
                      Free. No commitment. Full report delivered in 48 hours.
                    </p>
                  </form>
                )}
              </Reveal>

              {/* Deliverables sidebar */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <Reveal direction="up" delay={0.1}>
                  <div style={{ backgroundColor: 'var(--bg-2)', border: '1px solid var(--line)', borderRadius: '18px', padding: '28px' }}>
                    <p style={{ fontSize: '0.68rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--brand-magenta)', marginBottom: '20px' }}>WHAT YOU RECEIVE</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                      {DELIVERABLES.map(d => (
                        <div key={d.label} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                          <span style={{ fontSize: '1.2rem', flexShrink: 0 }}>{d.icon}</span>
                          <div>
                            <p style={{ fontWeight: '700', fontSize: '0.9rem', color: 'var(--fg-0)', marginBottom: '3px' }}>{d.label}</p>
                            <p style={{ fontSize: '0.82rem', color: 'var(--fg-2)', lineHeight: 1.55 }}>{d.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>

                <Reveal direction="up" delay={0.15}>
                  <div style={{ backgroundColor: 'var(--bg-2)', border: '1px solid var(--line)', borderRadius: '18px', padding: '24px' }}>
                    <p style={{ fontSize: '0.68rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--fg-3)', marginBottom: '16px' }}>DELIVERY TIMELINE</p>
                    {[
                      { label: 'Audit begins', time: 'Within 2 hours' },
                      { label: 'Draft findings', time: 'Day 1' },
                      { label: 'Full report delivered', time: 'Within 48 hours' },
                      { label: 'Walkthrough call', time: 'Optional — you choose' },
                    ].map((t, i) => (
                      <div key={t.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: i < 3 ? '1px solid var(--line)' : 'none' }}>
                        <span style={{ fontSize: '0.85rem', color: 'var(--fg-1)' }}>{t.label}</span>
                        <span style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: 'var(--brand-magenta)', fontWeight: '600' }}>{t.time}</span>
                      </div>
                    ))}
                  </div>
                </Reveal>

                <Reveal direction="up" delay={0.2}>
                  <div style={{ background: 'linear-gradient(135deg, rgba(192,38,211,0.1), rgba(139,92,246,0.07))', border: '1px solid rgba(192,38,211,0.2)', borderRadius: '18px', padding: '24px' }}>
                    <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                      {[{ value: '50+', label: 'Audits done' }, { value: '48hr', label: 'Delivery SLA' }, { value: '0₹', label: 'Cost to you' }].map(s => (
                        <div key={s.label}>
                          <p style={{ fontSize: '1.5rem', fontWeight: '800', color: '#c026d3', letterSpacing: '-0.03em', lineHeight: 1 }}>{s.value}</p>
                          <p style={{ fontSize: '0.75rem', color: 'var(--fg-3)', marginTop: '4px' }}>{s.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
      <style>{`
        @media (max-width: 1100px) { .audit-areas-grid { grid-template-columns: repeat(3, 1fr) !important; } }
        @media (max-width: 900px) {
          .audit-grid { grid-template-columns: 1fr !important; }
          .audit-areas-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 560px) {
          .form-row { grid-template-columns: 1fr !important; }
          .audit-areas-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
