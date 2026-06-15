'use client';

import React from 'react';
import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';

/* ─────────────────────────────────────────────────────────
   WorkflowMockup — browser-window with a node-graph inside
───────────────────────────────────────────────────────── */
function WorkflowMockup() {
  const nodes = [
    { id: 'ai',      label: 'AI Systems',    x: 90,  y: 60,  color: '#4b6bff' },
    { id: 'perf',    label: 'Performance',   x: 270, y: 60,  color: '#8b5cf6' },
    { id: 'signal',  label: 'Signal',        x: 180, y: 110, color: '#c026d3', center: true },
    { id: 'content', label: 'Content',       x: 270, y: 160, color: '#e11d8a' },
    { id: 'seo',     label: 'SEO',           x: 90,  y: 160, color: '#10b981' },
    { id: 'life',    label: 'Lifecycle',     x: 180, y: 210, color: '#f59e0b' },
  ];

  const edges = [
    ['ai','signal'], ['perf','signal'], ['signal','content'],
    ['signal','seo'], ['content','life'], ['seo','life'],
  ];

  return (
    <div style={{
      borderRadius: '14px', overflow: 'hidden',
      border: '1px solid rgba(255,255,255,0.1)',
      boxShadow: '0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)',
      backgroundColor: '#0c0c12',
      maxWidth: '680px', margin: '0 auto',
    }}>
      {/* Browser chrome */}
      <div style={{
        backgroundColor: '#131318', padding: '10px 16px',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        display: 'flex', alignItems: 'center', gap: '10px',
      }}>
        <div style={{ display: 'flex', gap: '5px' }}>
          {['#ff5f57','#febc2e','#28c840'].map((c,i) => (
            <div key={i} style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: c }} />
          ))}
        </div>
        <div style={{
          flex: 1, backgroundColor: '#0c0c10', borderRadius: '5px',
          padding: '4px 12px', fontSize: '0.7rem', color: 'rgba(255,255,255,0.35)',
          fontFamily: 'monospace', textAlign: 'center',
        }}>
          growth.digitaltriangle.in
        </div>
        <div style={{
          fontSize: '0.62rem', fontWeight: '700', letterSpacing: '0.08em',
          color: '#4b6bff', backgroundColor: 'rgba(75,107,255,0.12)',
          padding: '3px 8px', borderRadius: '4px', border: '1px solid rgba(75,107,255,0.2)',
        }}>
          AI WORKFLOW
        </div>
      </div>

      {/* Node graph canvas */}
      <div style={{ padding: '24px 32px 28px', position: 'relative' }}>
        <svg width="100%" viewBox="0 0 360 270" style={{ overflow: 'visible' }}>
          <defs>
            {nodes.map(n => (
              <radialGradient key={`rg-${n.id}`} id={`rg-${n.id}`} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={n.color} stopOpacity="0.3" />
                <stop offset="100%" stopColor={n.color} stopOpacity="0.05" />
              </radialGradient>
            ))}
          </defs>

          {/* Edge lines */}
          {edges.map(([a, b], i) => {
            const na = nodes.find(n => n.id === a)!;
            const nb = nodes.find(n => n.id === b)!;
            return (
              <line key={i}
                x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
                stroke="rgba(255,255,255,0.08)" strokeWidth="1.5"
                strokeDasharray="4 4" />
            );
          })}

          {/* Animated flow dots on edges */}
          {edges.map(([a, b], i) => {
            const na = nodes.find(n => n.id === a)!;
            const nb = nodes.find(n => n.id === b)!;
            return (
              <circle key={`dot-${i}`} r="2.5" fill="#4b6bff" opacity="0.8">
                <animateMotion dur={`${2 + i * 0.4}s`} repeatCount="indefinite" path={`M${na.x},${na.y} L${nb.x},${nb.y}`} />
              </circle>
            );
          })}

          {/* Node circles */}
          {nodes.map(n => (
            <g key={n.id}>
              {/* Glow */}
              <circle cx={n.x} cy={n.y} r={n.center ? 28 : 22} fill={`url(#rg-${n.id})`} />
              {/* Border ring */}
              <circle cx={n.x} cy={n.y} r={n.center ? 22 : 17}
                fill={n.center ? 'rgba(75,107,255,0.15)' : 'rgba(255,255,255,0.04)'}
                stroke={n.color} strokeWidth={n.center ? 1.5 : 1} strokeOpacity="0.5" />
              {/* Label */}
              <text x={n.x} y={n.y + 4} textAnchor="middle"
                fill={n.center ? 'white' : 'rgba(255,255,255,0.75)'}
                fontSize={n.center ? '7' : '6.5'} fontWeight={n.center ? '700' : '500'}
                fontFamily="system-ui, sans-serif">
                {n.label}
              </text>
            </g>
          ))}
        </svg>

        {/* Bottom status bar */}
        <div style={{
          display: 'flex', gap: '16px', marginTop: '12px',
          paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.06)',
        }}>
          {[
            { dot: '#10b981', text: '12 signals active' },
            { dot: '#4b6bff', text: '3 campaigns optimizing' },
            { dot: '#f59e0b', text: 'Real-time sync' },
          ].map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: s.dot, flexShrink: 0 }} />
              <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', whiteSpace: 'nowrap' }}>{s.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   Main Hero
───────────────────────────────────────────────────────── */
export function HeroWorkflow() {
  return (
    <section style={{
      position: 'relative', overflow: 'hidden',
      padding: 'clamp(72px, 10vw, 120px) 0 clamp(56px, 8vw, 96px)',
      backgroundColor: 'var(--bg-0)',
    }}>
      {/* Grid bg */}
      <div className="grid-bg" style={{ position: 'absolute', inset: 0, zIndex: 0 }} />

      {/* Glow orbs */}
      <div className="glow-orb glow-orb-pulse" style={{
        position: 'absolute', top: '-180px', left: '-100px',
        background: 'rgba(75,107,255,0.5)', zIndex: 0,
      }} />
      <div className="glow-orb glow-orb-pulse" style={{
        position: 'absolute', bottom: '-180px', right: '-100px',
        background: 'rgba(192,38,211,0.45)', zIndex: 0, animationDelay: '2s',
      }} />

      <div className="shell" style={{ position: 'relative', zIndex: 1 }}>

        {/* ── Centered text block ── */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto' }}>

          {/* Badge */}
          <Reveal direction="down" delay={0.05}>
            <div className="badge" style={{ display: 'inline-flex', marginBottom: '28px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10b981', flexShrink: 0 }} />
              NEW · AI systems for performance marketing
            </div>
          </Reveal>

          {/* Title */}
          <Reveal direction="up" delay={0.1}>
            <h1 style={{
              fontSize: 'clamp(2.4rem, 5.5vw, 4rem)',
              fontWeight: 700, lineHeight: 1.08, letterSpacing: '-0.03em',
              color: 'var(--fg-0)', marginBottom: '24px',
            }}>
              AI-powered growth<br />
              infrastructure for{' '}
              <span className="grad-text">modern brands.</span>
            </h1>
          </Reveal>

          {/* Description */}
          <Reveal direction="up" delay={0.18}>
            <p style={{
              fontSize: 'clamp(1rem, 1.6vw, 1.2rem)', lineHeight: 1.65,
              color: 'var(--fg-1)', marginBottom: '40px',
              maxWidth: '640px', margin: '0 auto 40px',
            }}>
              Digital Triangle combines AI, automation, performance marketing, SEO,
              content systems, analytics, and creative strategy — so brands scale
              smarter, faster, and with less guesswork.
            </p>
          </Reveal>

          {/* CTAs */}
          <Reveal direction="up" delay={0.26}>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '48px' }}>
              <Link href="/contact"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  padding: '14px 28px', borderRadius: '999px',
                  background: 'linear-gradient(135deg, #4b6bff, #8b5cf6)',
                  color: 'white', fontWeight: '600', fontSize: '0.95rem',
                  textDecoration: 'none', transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'none'; }}>
                Book growth consultation
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>

              <Link href="/solutions"
                style={{
                  display: 'inline-flex', alignItems: 'center',
                  padding: '14px 28px', borderRadius: '999px',
                  border: '1.5px solid var(--line-strong)',
                  color: 'var(--fg-1)', fontWeight: '500', fontSize: '0.95rem',
                  textDecoration: 'none', transition: 'all 0.2s',
                  backgroundColor: 'transparent',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--brand-blue)'; e.currentTarget.style.color = 'var(--fg-0)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--line-strong)'; e.currentTarget.style.color = 'var(--fg-1)'; }}>
                Explore growth systems
              </Link>
            </div>
          </Reveal>

          {/* Trust bar */}
          <Reveal direction="up" delay={0.34}>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: '0', flexWrap: 'wrap',
              borderTop: '1px solid var(--line)',
              paddingTop: '28px', marginBottom: '64px',
            }}>
              {[
                { icon: '✦', text: 'Built on Claude · GPT · Gemini' },
                { icon: '◎', text: '2.1Cr+ AI-assisted decisions/mo' },
                { icon: '⊕', text: 'India · GCC · US · UK' },
              ].map((item, i) => (
                <React.Fragment key={i}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '7px', padding: '6px 20px' }}>
                    <span style={{ color: 'var(--brand-blue)', fontSize: '11px' }}>{item.icon}</span>
                    <span style={{ fontSize: '0.78rem', color: 'var(--fg-3)', whiteSpace: 'nowrap' }}>
                      {item.text}
                    </span>
                  </div>
                  {i < 2 && <div style={{ width: '1px', height: '14px', backgroundColor: 'var(--line-strong)' }} />}
                </React.Fragment>
              ))}
            </div>
          </Reveal>
        </div>

        {/* ── Browser mockup ── */}
        <Reveal direction="up" delay={0.42} threshold={0.05}>
          <WorkflowMockup />
        </Reveal>
      </div>
    </section>
  );
}

/* Keep these exports so other files don't break */
export function HeroDashboard() { return <HeroWorkflow />; }
export function HeroStack()     { return <HeroWorkflow />; }
export type HeroVariant = 'workflow' | 'dashboard' | 'stack';
