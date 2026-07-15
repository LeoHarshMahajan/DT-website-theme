'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Reveal } from '@/components/ui/Reveal';

const SYSTEMS = [
  { id: 'ai',       name: 'AI',        label: 'AI Systems',    angle: 0,   color: '#4b6bff', desc: 'Core intelligence that learns across every campaign, funnel, and touchpoint.' },
  { id: 'seo',      name: 'SEO',       label: 'Search',        angle: 45,  color: '#8b5cf6', desc: 'Organic authority engine — keyword strategy, content, link-building, and SERP domination.' },
  { id: 'paid',     name: 'Paid',      label: 'Performance',   angle: 90,  color: '#c026d3', desc: 'AI-optimized paid acquisition across Meta, Google, and programmatic channels.' },
  { id: 'content',  name: 'Content',   label: 'Content',       angle: 135, color: '#e11d8a', desc: 'Brand-trained AI that creates content at scale, on-voice, on-brief.' },
  { id: 'lifecycle',name: 'Lifecycle', label: 'Lifecycle',     angle: 180, color: '#f59e0b', desc: 'CRM, email, and retention systems that turn customers into advocates.' },
  { id: 'analytics',name: 'Analytics', label: 'Analytics',    angle: 225, color: '#10b981', desc: 'Real-time attribution, dashboards, and predictive models for smarter decisions.' },
  { id: 'creative', name: 'Creative',  label: 'Creative',      angle: 270, color: '#06b6d4', desc: 'Design, video, and UGC systems that convert across every channel.' },
  { id: 'auto',     name: 'Automation',label: 'Automation',    angle: 315, color: '#6366f1', desc: 'Cross-channel workflow automation so your marketing runs while you sleep.' },
];

const RADIUS = 205; // orbit radius in px
const CENTER = 250; // center of the SVG container

function toXY(angle: number, r = RADIUS, cx = CENTER, cy = CENTER) {
  const rad = (angle - 90) * (Math.PI / 180);
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

export function ConnectedStack() {
  const [hovered, setHovered] = useState<string | null>(null);
  const active = SYSTEMS.find(s => s.id === hovered) ?? null;
  const orbitRef = useRef<HTMLDivElement>(null);
  const [orbitVisible, setOrbitVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setOrbitVisible(true); }, { threshold: 0.2 });
    if (orbitRef.current) obs.observe(orbitRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section style={{ padding: 'clamp(72px, 10vw, 120px) 0', backgroundColor: 'var(--bg-0)', position: 'relative', overflow: 'hidden' }}>
      {/* Subtle grid */}
      <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.4 }} />

      <div className="shell" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '64px', alignItems: 'center' }}>

          {/* ── Text header ── */}
          <div style={{ textAlign: 'center', maxWidth: '920px', margin: '0 auto' }}>
            <Reveal direction="up" delay={0.05}>
              <p style={{ fontSize: '0.7rem', fontWeight: '700', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--brand-blue)', marginBottom: '14px' }}>
                THE SYSTEM
              </p>
            </Reveal>
            <Reveal direction="up" delay={0.12}>
              <h2 style={{ fontSize: 'clamp(1.7rem, 3.6vw, 2.9rem)', fontWeight: 700, lineHeight: 1.12, letterSpacing: '-0.03em', color: 'var(--fg-0)', marginBottom: '20px', textWrap: 'balance' }}>
                One connected stack —{' '}
                <span style={{ color: 'var(--fg-2)' }}>not a list of services.</span>
              </h2>
            </Reveal>
            <Reveal direction="up" delay={0.18}>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--fg-1)', maxWidth: '560px', margin: '0 auto' }}>
                Every system feeds the next. AI sits in the middle, learning from every
                campaign, every funnel, every conversation — so growth compounds instead of plateauing.
              </p>
            </Reveal>
          </div>

          {/* ── Orbit + info panel ── */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '40px', flexWrap: 'wrap' }}>

            {/* Orbit diagram */}
            <div ref={orbitRef} className="orbit-diagram" style={{
              position: 'relative', width: `${CENTER * 2}px`, height: `${CENTER * 2}px`, flexShrink: 0,
              opacity: orbitVisible ? 1 : 0,
              transition: 'opacity 0.8s ease',
            }}>

              {/* Orbit rings */}
              <svg width={CENTER * 2} height={CENTER * 2} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
                <circle cx={CENTER} cy={CENTER} r={RADIUS} fill="none" style={{ stroke: 'var(--line)' }} strokeWidth="1" />
                <circle cx={CENTER} cy={CENTER} r={RADIUS - 30} fill="none" style={{ stroke: 'var(--line)' }} strokeWidth="0.5" opacity="0.5" />
                {/* Connecting lines from center to each node */}
                {SYSTEMS.map(s => {
                  const { x, y } = toXY(s.angle);
                  return (
                    <line key={s.id} x1={CENTER} y1={CENTER} x2={x} y2={y}
                      stroke={hovered === s.id ? s.color : 'var(--line)'}
                      strokeWidth={hovered === s.id ? 1.5 : 1}
                      strokeDasharray="3 4"
                      style={{ transition: 'stroke 0.25s, stroke-width 0.25s' }} />
                  );
                })}
              </svg>

              {/* Center node */}
              <div style={{
                position: 'absolute',
                left: `${CENTER}px`, top: `${CENTER}px`,
                transform: 'translate(-50%, -50%)',
                width: '108px', height: '108px', borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(75,107,255,0.25), rgba(139,92,246,0.2))',
                border: '1.5px solid rgba(75,107,255,0.4)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 0 40px rgba(75,107,255,0.25), 0 0 80px rgba(75,107,255,0.1)',
                zIndex: 2,
              }}>
                <span style={{ fontSize: '0.95rem', fontWeight: '800', color: 'var(--fg-0)', letterSpacing: '-0.02em' }}>DT Core</span>
                <span style={{ fontSize: '0.6rem', color: 'var(--fg-3)', letterSpacing: '0.06em', marginTop: '2px' }}>AI orchestration</span>
                {/* Pulse rings */}
                <div style={{
                  position: 'absolute', inset: '-12px', borderRadius: '50%',
                  border: '1px solid rgba(75,107,255,0.2)',
                  animation: 'pulse-ring 2.5s ease-out infinite',
                }} />
                <div style={{
                  position: 'absolute', inset: '-24px', borderRadius: '50%',
                  border: '1px solid rgba(75,107,255,0.1)',
                  animation: 'pulse-ring 2.5s ease-out infinite 0.8s',
                }} />
              </div>

              {/* Satellite nodes */}
              {SYSTEMS.map(s => {
                const { x, y } = toXY(s.angle);
                const isActive = hovered === s.id;
                return (
                  <div key={s.id}
                    onMouseEnter={() => setHovered(s.id)}
                    onMouseLeave={() => setHovered(null)}
                    style={{
                      position: 'absolute',
                      left: `${x}px`, top: `${y}px`,
                      transform: 'translate(-50%, -50%)',
                      width: '64px', height: '64px', borderRadius: '50%',
                      backgroundColor: isActive ? s.color : 'var(--bg-2)',
                      border: `1.5px solid ${isActive ? s.color : 'var(--line-strong)'}`,
                      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                      cursor: 'pointer', zIndex: 3,
                      transition: 'all 0.25s ease',
                      boxShadow: isActive ? `0 0 20px ${s.color}55, 0 0 40px ${s.color}22` : 'none',
                    }}>
                    <span style={{ fontSize: '0.68rem', fontWeight: '700', color: isActive ? 'white' : 'var(--fg-1)', lineHeight: 1.2, textAlign: 'center', padding: '0 4px' }}>
                      {s.name}
                    </span>
                    <span style={{ fontSize: '0.54rem', color: isActive ? 'rgba(255,255,255,0.7)' : 'var(--fg-3)', marginTop: '2px' }}>
                      {s.label}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* ── Info panel ── */}
            <div style={{
              width: '260px', flexShrink: 0,
              backgroundColor: 'var(--bg-2)', border: '1px solid var(--line)',
              borderRadius: '16px', padding: '24px', minHeight: '200px',
              transition: 'border-color 0.3s',
              borderColor: active ? `${active.color}44` : 'var(--line)',
            }}>
              {active ? (
                <>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '10px', marginBottom: '14px',
                    backgroundColor: `${active.color}22`, border: `1px solid ${active.color}44`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: active.color }} />
                  </div>
                  <p style={{ fontSize: '0.6rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', color: active.color, marginBottom: '6px' }}>
                    {active.label}
                  </p>
                  <p style={{ fontWeight: '700', fontSize: '1.05rem', color: 'var(--fg-0)', marginBottom: '10px' }}>
                    {active.name} System
                  </p>
                  <p style={{ fontSize: '0.875rem', lineHeight: 1.65, color: 'var(--fg-2)' }}>
                    {active.desc}
                  </p>
                </>
              ) : (
                <>
                  <p style={{ fontSize: '0.6rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--fg-3)', marginBottom: '10px' }}>
                    HOVER THE ORBIT
                  </p>
                  <p style={{ fontWeight: '700', fontSize: '1.2rem', color: 'var(--fg-0)', marginBottom: '10px' }}>
                    8 connected systems
                  </p>
                  <p style={{ fontSize: '0.875rem', lineHeight: 1.65, color: 'var(--fg-2)', marginBottom: '20px' }}>
                    Each system shares data, audiences, and signals. AI learns across all
                    of them so every campaign starts smarter than the last.
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {['Always-on', 'AI-orchestrated', 'Outcome-linked'].map(tag => (
                      <span key={tag} style={{
                        fontSize: '0.7rem', fontWeight: '600', padding: '4px 10px',
                        borderRadius: '20px', backgroundColor: 'var(--bg-3)',
                        border: '1px solid var(--line)', color: 'var(--fg-2)',
                      }}>
                        ⊕ {tag}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* ── Bottom metric strip ── */}
          <Reveal direction="up" delay={0.1}>
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '1px', backgroundColor: 'var(--line)',
              border: '1px solid var(--line)', borderRadius: '14px',
              overflow: 'hidden',
            }} className="metrics-grid">
              {[
                { value: '8',    unit: 'systems', label: 'Fully connected' },
                { value: '2.1Cr+', unit: '/mo',  label: 'AI decisions made' },
                { value: '40%',  unit: 'avg',     label: 'CAC reduction' },
                { value: '2.5×', unit: 'avg',     label: 'ROI improvement' },
              ].map((m, i) => (
                <div key={i} style={{
                  padding: '24px', backgroundColor: 'var(--bg-1)', textAlign: 'center',
                }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '4px', marginBottom: '4px' }}>
                    <span style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: '800', color: 'var(--fg-0)', letterSpacing: '-0.03em' }}>{m.value}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--brand-blue)', fontWeight: '600' }}>{m.unit}</span>
                  </div>
                  <p style={{ fontSize: '0.78rem', color: 'var(--fg-3)', margin: 0 }}>{m.label}</p>
                </div>
              ))}
            </div>
          </Reveal>

        </div>
      </div>

      <style>{`
        @keyframes pulse-ring {
          0%   { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        @media (max-width: 640px) { .metrics-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 560px) { .orbit-diagram { transform: scale(0.72); margin: -70px 0; } }
        @media (max-width: 400px) { .orbit-diagram { transform: scale(0.6); margin: -100px 0; } }
      `}</style>
    </section>
  );
}
