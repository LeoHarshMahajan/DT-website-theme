'use client';

import React, { useState } from 'react';
import { Reveal } from '@/components/ui/Reveal';
import { Footer } from '@/components/Footer';

const BUDGETS = [
  '₹50K – ₹1L / mo',
  '₹1L – ₹3L / mo',
  '₹3L – ₹5L / mo',
  '₹5L+ / mo',
  'Not sure yet',
];

const SERVICES = [
  'Performance Marketing',
  'SEO / AEO / GEO',
  'AI & Automation',
  'Content & Social',
  'Analytics & BI',
  'Brand & Creative',
  'Full Growth Stack',
];

const PROCESS = [
  { step: '01', title: 'Discovery Call', desc: '30-min call to understand your brand, goals, and current stack.' },
  { step: '02', title: 'Growth Audit', desc: 'We audit your paid, organic, content, and conversion setup.' },
  { step: '03', title: 'Custom Proposal', desc: 'We present a tailored growth architecture and engagement plan.' },
  { step: '04', title: 'Kickoff', desc: 'Onboard within 7 days. First results in 30 days.' },
];

export function ContactForm() {
  const [form, setForm] = useState({
    name: '', email: '', company: '', phone: '',
    budget: '', services: [] as string[], message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));
  const toggleService = (s: string) => setForm(f => ({
    ...f,
    services: f.services.includes(s) ? f.services.filter(x => x !== s) : [...f.services, s],
  }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('submission failed');
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '11px 14px', borderRadius: '10px',
    border: '1px solid var(--line)', backgroundColor: 'var(--bg-2)',
    color: 'var(--fg-0)', fontSize: '0.9rem', outline: 'none',
    transition: 'border-color 0.2s', boxSizing: 'border-box',
    fontFamily: 'inherit',
  };

  return (
    <>
      <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-0)', paddingTop: '64px' }}>

        {/* Hero */}
        <section style={{ padding: 'clamp(64px, 10vw, 100px) 0 clamp(40px, 6vw, 64px)', borderBottom: '1px solid var(--line)' }}>
          <div className="shell">
            <Reveal direction="up" delay={0.05}>
              <p style={{ fontSize: '0.68rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--brand-blue)', marginBottom: '14px' }}>
                GET IN TOUCH
              </p>
            </Reveal>
            <Reveal direction="up" delay={0.1}>
              <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 700, lineHeight: 1.08, letterSpacing: '-0.03em', color: 'var(--fg-0)', marginBottom: '20px', maxWidth: '720px' }}>
                Let's build your<br />
                <span style={{ color: 'var(--fg-2)' }}>growth engine together.</span>
              </h1>
            </Reveal>
            <Reveal direction="up" delay={0.15}>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--fg-1)', maxWidth: '560px' }}>
                Tell us about your brand and goals. We'll send a free audit + custom growth proposal within 48 hours.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Main grid */}
        <section style={{ padding: 'clamp(48px, 8vw, 80px) 0' }}>
          <div className="shell">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '64px', alignItems: 'start' }} className="contact-grid">

              {/* ── Form ── */}
              <Reveal direction="up" delay={0.08}>
                {status === 'error' ? (
                  <div style={{
                    backgroundColor: 'var(--bg-2)', border: '1px solid rgba(239,68,68,0.3)',
                    borderRadius: '20px', padding: '40px 32px', textAlign: 'center',
                  }}>
                    <p style={{ fontSize: '1.4rem', marginBottom: '12px' }}>⚠️</p>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--fg-0)', marginBottom: '12px' }}>
                      Something went wrong.
                    </h2>
                    <p style={{ color: 'var(--fg-2)', lineHeight: 1.7, marginBottom: '20px' }}>
                      Please try again or reach us directly at{' '}
                      <a href="mailto:info@digitaltriangle.in" style={{ color: 'var(--brand-blue)' }}>info@digitaltriangle.in</a>.
                    </p>
                    <button
                      onClick={() => setStatus('idle')}
                      style={{
                        padding: '10px 24px', borderRadius: '999px', border: 'none',
                        background: 'linear-gradient(135deg, #4b6bff, #8b5cf6)',
                        color: 'white', fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit',
                      }}
                    >
                      Try Again
                    </button>
                  </div>
                ) : status === 'success' ? (
                  <div style={{
                    backgroundColor: 'var(--bg-2)', border: '1px solid var(--line)',
                    borderRadius: '20px', padding: '64px 48px', textAlign: 'center',
                  }}>
                    <div style={{
                      width: '64px', height: '64px', borderRadius: '50%',
                      backgroundColor: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.3)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      margin: '0 auto 24px', fontSize: '1.8rem',
                    }}>✓</div>
                    <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: 'var(--fg-0)', marginBottom: '12px' }}>
                      You're in the queue.
                    </h2>
                    <p style={{ color: 'var(--fg-2)', lineHeight: 1.7, maxWidth: '380px', margin: '0 auto' }}>
                      We've received your brief. Expect a free growth audit + proposal in your inbox within 48 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {/* Name + Email */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-row">
                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: 'var(--fg-2)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                          Your Name *
                        </label>
                        <input
                          required type="text" value={form.name}
                          onChange={e => set('name', e.target.value)}
                          placeholder="Rahul Sharma"
                          style={inputStyle}
                          onFocus={e => (e.currentTarget.style.borderColor = 'var(--brand-blue)')}
                          onBlur={e => (e.currentTarget.style.borderColor = 'var(--line)')}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: 'var(--fg-2)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                          Work Email *
                        </label>
                        <input
                          required type="email" value={form.email}
                          onChange={e => set('email', e.target.value)}
                          placeholder="rahul@brand.com"
                          style={inputStyle}
                          onFocus={e => (e.currentTarget.style.borderColor = 'var(--brand-blue)')}
                          onBlur={e => (e.currentTarget.style.borderColor = 'var(--line)')}
                        />
                      </div>
                    </div>

                    {/* Company + Phone */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-row">
                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: 'var(--fg-2)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                          Brand / Company
                        </label>
                        <input
                          type="text" value={form.company}
                          onChange={e => set('company', e.target.value)}
                          placeholder="Acme Inc"
                          style={inputStyle}
                          onFocus={e => (e.currentTarget.style.borderColor = 'var(--brand-blue)')}
                          onBlur={e => (e.currentTarget.style.borderColor = 'var(--line)')}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: 'var(--fg-2)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                          Phone / WhatsApp
                        </label>
                        <input
                          type="tel" value={form.phone}
                          onChange={e => set('phone', e.target.value)}
                          placeholder="+91 98765 43210"
                          style={inputStyle}
                          onFocus={e => (e.currentTarget.style.borderColor = 'var(--brand-blue)')}
                          onBlur={e => (e.currentTarget.style.borderColor = 'var(--line)')}
                        />
                      </div>
                    </div>

                    {/* Budget */}
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: 'var(--fg-2)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Monthly Budget
                      </label>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {BUDGETS.map(b => (
                          <button
                            key={b} type="button"
                            onClick={() => set('budget', b)}
                            style={{
                              padding: '8px 14px', borderRadius: '8px', border: '1px solid',
                              fontSize: '0.82rem', fontWeight: '500', cursor: 'pointer',
                              transition: 'all 0.15s', fontFamily: 'inherit',
                              borderColor: form.budget === b ? 'var(--brand-blue)' : 'var(--line)',
                              backgroundColor: form.budget === b ? 'rgba(75,107,255,0.1)' : 'transparent',
                              color: form.budget === b ? 'var(--brand-blue)' : 'var(--fg-2)',
                            }}
                          >
                            {b}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Services */}
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: 'var(--fg-2)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Services You Need
                      </label>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {SERVICES.map(s => (
                          <button
                            key={s} type="button"
                            onClick={() => toggleService(s)}
                            style={{
                              padding: '8px 14px', borderRadius: '8px', border: '1px solid',
                              fontSize: '0.82rem', fontWeight: '500', cursor: 'pointer',
                              transition: 'all 0.15s', fontFamily: 'inherit',
                              borderColor: form.services.includes(s) ? 'var(--brand-blue)' : 'var(--line)',
                              backgroundColor: form.services.includes(s) ? 'rgba(75,107,255,0.1)' : 'transparent',
                              color: form.services.includes(s) ? 'var(--brand-blue)' : 'var(--fg-2)',
                            }}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: 'var(--fg-2)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Brief / Message
                      </label>
                      <textarea
                        value={form.message}
                        onChange={e => set('message', e.target.value)}
                        placeholder="Tell us about your brand, current challenges, and what growth looks like to you..."
                        rows={5}
                        style={{ ...inputStyle, resize: 'vertical' }}
                        onFocus={e => (e.currentTarget.style.borderColor = 'var(--brand-blue)')}
                        onBlur={e => (e.currentTarget.style.borderColor = 'var(--line)')}
                      />
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      style={{
                        width: '100%', padding: '15px', borderRadius: '999px', border: 'none',
                        background: 'linear-gradient(135deg, #4b6bff, #8b5cf6)',
                        color: 'white', fontWeight: '700', fontSize: '1rem',
                        cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                        opacity: status === 'sending' ? 0.75 : 1,
                        transition: 'opacity 0.2s', fontFamily: 'inherit',
                      }}
                    >
                      {status === 'sending' ? 'Sending...' : 'Send Brief & Get Free Audit →'}
                    </button>

                    <p style={{ fontSize: '0.78rem', color: 'var(--fg-3)', textAlign: 'center' }}>
                      No commitment. Free audit + proposal in 48 hours.
                    </p>
                  </form>
                )}
              </Reveal>

              {/* ── Sidebar ── */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

                {/* Process */}
                <Reveal direction="up" delay={0.1}>
                  <div style={{ backgroundColor: 'var(--bg-2)', border: '1px solid var(--line)', borderRadius: '18px', padding: '28px' }}>
                    <p style={{ fontSize: '0.68rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--brand-blue)', marginBottom: '20px' }}>
                      WHAT HAPPENS NEXT
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                      {PROCESS.map((p, i) => (
                        <div key={p.step} style={{ display: 'flex', gap: '16px' }}>
                          <div style={{
                            width: '32px', height: '32px', borderRadius: '8px', flexShrink: 0,
                            background: 'linear-gradient(135deg, #4b6bff, #8b5cf6)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '0.65rem', fontWeight: '800', color: 'white',
                          }}>
                            {p.step}
                          </div>
                          <div>
                            <p style={{ fontWeight: '700', fontSize: '0.9rem', color: 'var(--fg-0)', marginBottom: '3px' }}>{p.title}</p>
                            <p style={{ fontSize: '0.82rem', color: 'var(--fg-2)', lineHeight: 1.55 }}>{p.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>

                {/* Quick contact */}
                <Reveal direction="up" delay={0.15}>
                  <div style={{ backgroundColor: 'var(--bg-2)', border: '1px solid var(--line)', borderRadius: '18px', padding: '28px' }}>
                    <p style={{ fontSize: '0.68rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--fg-3)', marginBottom: '16px' }}>
                      DIRECT CONTACT
                    </p>
                    {[
                      { icon: '✉', label: 'Email', value: 'info@digitaltriangle.in', href: 'mailto:info@digitaltriangle.in' },
                      { icon: '💬', label: 'WhatsApp', value: '+91 80770 42525', href: 'https://wa.me/918077042525' },
                      { icon: '📍', label: 'Location', value: 'Plot A41, 2nd Floor, Ofis Square, The Iconic Corenthum, Sector 62, Noida, UP 201301', href: 'https://maps.google.com/?q=Ofis+Square+Corenthum+Sector+62+Noida' },
                    ].map(c => (
                      <div key={c.label} style={{ display: 'flex', gap: '12px', marginBottom: '14px', alignItems: 'flex-start' }}>
                        <span style={{ fontSize: '1rem', flexShrink: 0, marginTop: '2px' }}>{c.icon}</span>
                        <div>
                          <p style={{ fontSize: '0.72rem', color: 'var(--fg-3)', marginBottom: '2px' }}>{c.label}</p>
                          {c.href ? (
                            <a href={c.href} style={{ fontSize: '0.88rem', color: 'var(--brand-blue)', fontWeight: '500', textDecoration: 'none' }}>
                              {c.value}
                            </a>
                          ) : (
                            <p style={{ fontSize: '0.88rem', color: 'var(--fg-1)', fontWeight: '500', margin: 0 }}>{c.value}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </Reveal>

                {/* Social proof */}
                <Reveal direction="up" delay={0.2}>
                  <div style={{
                    background: 'linear-gradient(135deg, rgba(75,107,255,0.12), rgba(139,92,246,0.08))',
                    border: '1px solid rgba(75,107,255,0.2)',
                    borderRadius: '18px', padding: '24px',
                  }}>
                    <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                      {[
                        { value: '50+', label: 'Brands scaled' },
                        { value: '4.8×', label: 'Avg ROAS' },
                        { value: '48hr', label: 'First response' },
                      ].map(s => (
                        <div key={s.label}>
                          <p style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--brand-blue)', letterSpacing: '-0.03em', lineHeight: 1 }}>{s.value}</p>
                          <p style={{ fontSize: '0.75rem', color: 'var(--fg-3)', marginTop: '4px' }}>{s.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>

                {/* Google Map */}
                <Reveal direction="up" delay={0.25}>
                  <div style={{ borderRadius: '18px', overflow: 'hidden', border: '1px solid var(--line)' }}>
                    <iframe
                      src="https://maps.google.com/maps?q=Ofis+Square+The+Iconic+Corenthum+Sector+62+Noida+UP+201301&output=embed"
                      width="100%"
                      height="220"
                      style={{ border: 0, display: 'block' }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Digital Triangle Office — Ofis Square, Sector 62, Noida"
                    />
                  </div>
                </Reveal>
              </div>

            </div>
          </div>
        </section>
      </div>
      <Footer />

      <style>{`
        @media (max-width: 900px) { .contact-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 560px) { .form-row { grid-template-columns: 1fr !important; } }
      `}</style>
    </>
  );
}
