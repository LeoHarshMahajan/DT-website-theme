'use client';

import React, { useState } from 'react';
import { Reveal } from '@/components/ui/Reveal';
import { Footer } from '@/components/Footer';

const TIME_SLOTS = [
  '9:00 AM – 10:00 AM IST',
  '11:00 AM – 12:00 PM IST',
  '2:00 PM – 3:00 PM IST',
  '4:00 PM – 5:00 PM IST',
  '6:00 PM – 7:00 PM IST',
];

const GOALS = [
  'Scale paid revenue',
  'Improve organic traffic',
  'Build retention system',
  'Launch AI workflows',
  'Fix analytics & tracking',
  'Full growth strategy',
];

const AGENDA = [
  {
    time: '0–5 min',
    title: 'Brand snapshot',
    desc: 'Quick overview of where you are — channels, revenue, team size, and current challenges.',
  },
  {
    time: '5–15 min',
    title: 'Gap diagnosis',
    desc: 'We identify the 2–3 highest-leverage areas where growth is being left on the table.',
  },
  {
    time: '15–25 min',
    title: 'Growth architecture',
    desc: 'We sketch the system — paid, organic, lifecycle, and data — tailored to your brand stage.',
  },
  {
    time: '25–30 min',
    title: 'Next steps',
    desc: "You leave with a prioritised action list and, if there's a fit, a proposal timeline.",
  },
];

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '11px 14px', borderRadius: '10px',
  border: '1px solid var(--line)', backgroundColor: 'var(--bg-2)',
  color: 'var(--fg-0)', fontSize: '0.9rem', outline: 'none',
  transition: 'border-color 0.2s', boxSizing: 'border-box',
  fontFamily: 'inherit',
};

export function ConsultationForm() {
  const [form, setForm] = useState({
    name: '', email: '', company: '', phone: '',
    slot: '', goals: [] as string[], challenge: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));
  const toggleGoal = (g: string) => setForm(f => ({
    ...f,
    goals: f.goals.includes(g) ? f.goals.filter(x => x !== g) : [...f.goals, g],
  }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    await new Promise(r => setTimeout(r, 1200));
    setStatus('success');
  };

  return (
    <>
      <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-0)', paddingTop: '64px' }}>

        {/* Hero */}
        <section className="page-hero" style={{ padding: 'clamp(64px, 10vw, 100px) 0 clamp(40px, 6vw, 64px)', borderBottom: '1px solid var(--line)' }}>
          <div className="hero-orb-l" style={{ background: 'radial-gradient(circle, rgba(75,107,255,0.18), transparent 65%)' }} />
          <div className="hero-orb-r" style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.12), transparent 65%)' }} />
          <div className="grid-bg" />
          <div className="shell" style={{ position: 'relative', zIndex: 1 }}>
            <Reveal direction="up" delay={0.04}>
              <span className="section-tag" style={{ color: 'var(--brand-blue)', marginBottom: '16px', display: 'inline-flex' }}>Book a Call</span>
            </Reveal>
            <Reveal direction="up" delay={0.08}>
              <h1 style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4rem)', fontWeight: 800, lineHeight: 1.0, letterSpacing: '-0.035em', color: 'var(--fg-0)', marginBottom: '20px', maxWidth: '700px' }}>
                30 minutes to your<br />
                <span className="grad-text">custom growth plan.</span>
              </h1>
            </Reveal>
            <Reveal direction="up" delay={0.12}>
              <p style={{ fontSize: 'clamp(1rem, 2vw, 1.15rem)', lineHeight: 1.7, color: 'var(--fg-1)', maxWidth: '560px' }}>
                A focused strategy call with our growth team. No sales pitch — just an honest assessment of where your brand is and how to get it where you want it to go.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Main grid */}
        <section style={{ padding: 'clamp(48px, 8vw, 80px) 0' }}>
          <div className="shell">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: '64px', alignItems: 'start' }} className="consult-grid">

              {/* Form */}
              <Reveal direction="up" delay={0.08}>
                {status === 'success' ? (
                  <div style={{ backgroundColor: 'var(--bg-2)', border: '1px solid var(--line)', borderRadius: '20px', padding: '64px 48px', textAlign: 'center' }}>
                    <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'linear-gradient(135deg, rgba(75,107,255,0.15), rgba(139,92,246,0.15))', border: '1px solid rgba(75,107,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: '1.8rem' }}>📅</div>
                    <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: 'var(--fg-0)', marginBottom: '12px' }}>Call request received.</h2>
                    <p style={{ color: 'var(--fg-2)', lineHeight: 1.7, maxWidth: '380px', margin: '0 auto' }}>
                      We'll confirm your slot within 4 hours via email and WhatsApp. See you on the call.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-row">
                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: 'var(--fg-2)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Your Name *</label>
                        <input required type="text" value={form.name} onChange={e => set('name', e.target.value)} placeholder="Rahul Sharma" style={inputStyle}
                          onFocus={e => (e.currentTarget.style.borderColor = 'var(--brand-blue)')}
                          onBlur={e => (e.currentTarget.style.borderColor = 'var(--line)')} />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: 'var(--fg-2)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Work Email *</label>
                        <input required type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="rahul@brand.com" style={inputStyle}
                          onFocus={e => (e.currentTarget.style.borderColor = 'var(--brand-blue)')}
                          onBlur={e => (e.currentTarget.style.borderColor = 'var(--line)')} />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-row">
                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: 'var(--fg-2)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Brand / Company</label>
                        <input type="text" value={form.company} onChange={e => set('company', e.target.value)} placeholder="Acme Inc" style={inputStyle}
                          onFocus={e => (e.currentTarget.style.borderColor = 'var(--brand-blue)')}
                          onBlur={e => (e.currentTarget.style.borderColor = 'var(--line)')} />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: 'var(--fg-2)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Phone / WhatsApp</label>
                        <input type="tel" value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+91 98765 43210" style={inputStyle}
                          onFocus={e => (e.currentTarget.style.borderColor = 'var(--brand-blue)')}
                          onBlur={e => (e.currentTarget.style.borderColor = 'var(--line)')} />
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: 'var(--fg-2)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Preferred Time Slot (IST)</label>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {TIME_SLOTS.map(s => (
                          <button key={s} type="button" onClick={() => set('slot', s)} style={{
                            padding: '8px 14px', borderRadius: '8px', border: '1px solid', fontSize: '0.82rem',
                            fontWeight: '500', cursor: 'pointer', transition: 'all 0.15s', fontFamily: 'inherit',
                            borderColor: form.slot === s ? 'var(--brand-blue)' : 'var(--line)',
                            backgroundColor: form.slot === s ? 'rgba(75,107,255,0.1)' : 'transparent',
                            color: form.slot === s ? 'var(--brand-blue)' : 'var(--fg-2)',
                          }}>{s}</button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: 'var(--fg-2)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Primary Goal</label>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {GOALS.map(g => (
                          <button key={g} type="button" onClick={() => toggleGoal(g)} style={{
                            padding: '8px 14px', borderRadius: '8px', border: '1px solid', fontSize: '0.82rem',
                            fontWeight: '500', cursor: 'pointer', transition: 'all 0.15s', fontFamily: 'inherit',
                            borderColor: form.goals.includes(g) ? 'var(--brand-violet)' : 'var(--line)',
                            backgroundColor: form.goals.includes(g) ? 'rgba(139,92,246,0.1)' : 'transparent',
                            color: form.goals.includes(g) ? 'var(--brand-violet)' : 'var(--fg-2)',
                          }}>{g}</button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: 'var(--fg-2)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Biggest Growth Challenge</label>
                      <textarea value={form.challenge} onChange={e => set('challenge', e.target.value)}
                        placeholder="Tell us the #1 thing holding your brand back right now..."
                        rows={4} style={{ ...inputStyle, resize: 'vertical' }}
                        onFocus={e => (e.currentTarget.style.borderColor = 'var(--brand-blue)')}
                        onBlur={e => (e.currentTarget.style.borderColor = 'var(--line)')} />
                    </div>

                    <button type="submit" disabled={status === 'sending'} style={{
                      width: '100%', padding: '15px', borderRadius: '999px', border: 'none',
                      background: 'linear-gradient(135deg, #4b6bff, #8b5cf6)',
                      color: 'white', fontWeight: '700', fontSize: '1rem',
                      cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                      opacity: status === 'sending' ? 0.75 : 1,
                      transition: 'opacity 0.2s', fontFamily: 'inherit',
                    }}>
                      {status === 'sending' ? 'Booking...' : 'Book My Strategy Call →'}
                    </button>
                    <p style={{ fontSize: '0.78rem', color: 'var(--fg-3)', textAlign: 'center' }}>
                      Free. No commitment. Confirmed within 4 hours.
                    </p>
                  </form>
                )}
              </Reveal>

              {/* Sidebar */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

                {/* Call agenda */}
                <Reveal direction="up" delay={0.1}>
                  <div style={{ backgroundColor: 'var(--bg-2)', border: '1px solid var(--line)', borderRadius: '18px', padding: '28px' }}>
                    <p style={{ fontSize: '0.68rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--brand-blue)', marginBottom: '20px' }}>30-MIN CALL AGENDA</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                      {AGENDA.map((a, i) => (
                        <div key={a.title} style={{ display: 'flex', gap: '14px' }}>
                          <div style={{ width: '60px', flexShrink: 0 }}>
                            <span style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: 'var(--brand-blue)', fontWeight: '700', backgroundColor: 'rgba(75,107,255,0.1)', padding: '3px 6px', borderRadius: '4px', whiteSpace: 'nowrap' }}>{a.time}</span>
                          </div>
                          <div>
                            <p style={{ fontWeight: '700', fontSize: '0.9rem', color: 'var(--fg-0)', marginBottom: '3px' }}>{a.title}</p>
                            <p style={{ fontSize: '0.82rem', color: 'var(--fg-2)', lineHeight: 1.55 }}>{a.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>

                {/* Direct contact */}
                <Reveal direction="up" delay={0.15}>
                  <div style={{ backgroundColor: 'var(--bg-2)', border: '1px solid var(--line)', borderRadius: '18px', padding: '28px' }}>
                    <p style={{ fontSize: '0.68rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--fg-3)', marginBottom: '16px' }}>PREFER TO REACH DIRECTLY?</p>
                    {[
                      { icon: '💬', label: 'WhatsApp', value: '+91 80770 42525', href: 'https://wa.me/918077042525' },
                      { icon: '✉', label: 'Email', value: 'info@digitaltriangle.in', href: 'mailto:info@digitaltriangle.in' },
                    ].map(c => (
                      <div key={c.label} style={{ display: 'flex', gap: '12px', marginBottom: '14px', alignItems: 'flex-start' }}>
                        <span style={{ fontSize: '1rem', flexShrink: 0, marginTop: '2px' }}>{c.icon}</span>
                        <div>
                          <p style={{ fontSize: '0.72rem', color: 'var(--fg-3)', marginBottom: '2px' }}>{c.label}</p>
                          <a href={c.href} style={{ fontSize: '0.88rem', color: 'var(--brand-blue)', fontWeight: '500', textDecoration: 'none' }}>{c.value}</a>
                        </div>
                      </div>
                    ))}
                  </div>
                </Reveal>

                {/* Trust strip */}
                <Reveal direction="up" delay={0.2}>
                  <div style={{ background: 'linear-gradient(135deg, rgba(75,107,255,0.1), rgba(139,92,246,0.07))', border: '1px solid rgba(75,107,255,0.2)', borderRadius: '18px', padding: '24px' }}>
                    <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                      {[
                        { value: '50+', label: 'Brands scaled' },
                        { value: '4hr', label: 'Avg confirmation' },
                        { value: '100%', label: 'Free, always' },
                      ].map(s => (
                        <div key={s.label}>
                          <p style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--brand-blue)', letterSpacing: '-0.03em', lineHeight: 1 }}>{s.value}</p>
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
        @media (max-width: 900px) { .consult-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 560px) { .form-row { grid-template-columns: 1fr !important; } }
      `}</style>
    </>
  );
}
