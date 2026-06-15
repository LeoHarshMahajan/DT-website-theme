'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Reveal } from '@/components/ui/Reveal';

const AI_SYSTEMS = [
  {
    id: 'research',
    num: '01',
    name: 'Research System',
    sub: 'Perplexity + Claude',
    color: '#6366f1',
    desc: 'Pulls live competitor SERP data, ad creatives, audience signals, and trend deltas — synthesized into a daily brief.',
    whatItDoes: [
      'Scans 40+ competitors',
      'Reads 500+ ads/day',
      'Surfaces TAM shifts',
      'Detects new keyword waves',
    ],
    sampleOutput: [
      'Audience: HVC 25-34, Tier-1 metros',
      'Trend: GLP-1 wellness +218% MoM',
      'Gap: zero category share on AEO',
    ],
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="7.5" cy="7.5" r="5" stroke="white" strokeWidth="1.5"/>
        <path d="M11.5 11.5L15 15" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'strategy',
    num: '02',
    name: 'Strategy System',
    sub: 'Claude · GPT-4o',
    color: '#8b5cf6',
    desc: 'Builds full-funnel growth strategies — channel mix, messaging, positioning — updated monthly based on data.',
    whatItDoes: [
      'Full-funnel strategy docs',
      'Channel prioritization matrix',
      'ICP & positioning refresh',
      'Quarterly growth roadmap',
    ],
    sampleOutput: [
      'Priority: Meta Reels > Google PMax',
      'ICP shift: Tier-2 cities +40%',
      'Hero message: "Your unfair advantage"',
    ],
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M9 3v4M9 11v4M3 9h4M11 9h4" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="9" cy="9" r="2" fill="white" opacity="0.8"/>
      </svg>
    ),
  },
  {
    id: 'creative',
    num: '03',
    name: 'Creative System',
    sub: 'Image · Video · Copy',
    color: '#c026d3',
    desc: 'Produces ad creatives, landing pages, and video scripts at scale — trained on your brand voice.',
    whatItDoes: [
      '60+ ad variants / week',
      'Reels scripts & storyboards',
      'Landing page copy & design',
      'A/B test matrix generation',
    ],
    sampleOutput: [
      'Creative batch: 12 Reels scripts ready',
      'Hook winner: "Before vs After" +34% CTR',
      'New LP variant live for split test',
    ],
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M3.5 14.5l3.5-1L14 7a1.41 1.41 0 00-2-2L5 11.5l-1.5 3z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'launch',
    num: '04',
    name: 'Launch System',
    sub: 'Meta · Google · GA4',
    color: '#e11d8a',
    desc: 'Deploys and monitors campaigns across paid channels — self-optimizing on ROAS and CAC targets.',
    whatItDoes: [
      'Cross-channel campaign setup',
      'Automated budget allocation',
      'Real-time ROAS monitoring',
      'Creative rotation & testing',
    ],
    sampleOutput: [
      'Meta ROAS: 4.2× (target: 3.5×)',
      'Budget shifted: +₹40K to top adset',
      'New creative live: "Proof" angle',
    ],
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M9 3L15 9M15 9L9 15M15 9H3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'optimization',
    num: '05',
    name: 'Optimization System',
    sub: 'Always-on',
    color: '#f59e0b',
    desc: 'Continuously monitors performance signals and adjusts bids, budgets, and creative mixes automatically.',
    whatItDoes: [
      '24/7 bid management',
      'Frequency cap enforcement',
      'Audience refresh signals',
      'Anomaly detection & alerts',
    ],
    sampleOutput: [
      'Alert: CPM spike +28% — paused adset',
      'Audience fatigue: Refreshed lookalike',
      'Bid floor adjusted: ₹12 → ₹9',
    ],
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="9" r="6" stroke="white" strokeWidth="1.5"/>
        <circle cx="9" cy="9" r="2" fill="white" opacity="0.8"/>
        <path d="M9 3v2M9 13v2M3 9h2M13 9h2" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'lifecycle',
    num: '06',
    name: 'Lifecycle System',
    sub: 'WhatsApp · CRM · Email',
    color: '#10b981',
    desc: 'Automates post-purchase CRM, re-engagement, and upsell flows across email and WhatsApp.',
    whatItDoes: [
      'Post-purchase flow (7-touch)',
      'Win-back sequences',
      'LTV cohort segmentation',
      'WhatsApp broadcast automation',
    ],
    sampleOutput: [
      'Flow triggered: 142 users in Day-3 nurture',
      'Win-back open rate: 38% (vs 18% avg)',
      'LTV segment: VIP tier up 22 users',
    ],
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M3 4h12v9a1 1 0 01-1 1H4a1 1 0 01-1-1V4z" stroke="white" strokeWidth="1.5"/>
        <path d="M3 4l6 5 6-5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
];

/* ── Typing animation hook ── */
function useTypewriter(text: string, speed = 28, active = true) {
  const [displayed, setDisplayed] = useState('');
  useEffect(() => {
    if (!active) { setDisplayed(text); return; }
    setDisplayed('');
    let i = 0;
    const t = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(t);
    }, speed);
    return () => clearInterval(t);
  }, [text, active]);
  return displayed;
}

/* ── Typewriter output lines ── */
function TypewriterLines({ lines, active }: { lines: string[]; active: boolean }) {
  const [visibleCount, setVisibleCount] = useState(0);
  useEffect(() => {
    if (!active) { setVisibleCount(lines.length); return; }
    setVisibleCount(0);
    let i = 0;
    const t = setInterval(() => {
      i++;
      setVisibleCount(i);
      if (i >= lines.length) clearInterval(t);
    }, 700);
    return () => clearInterval(t);
  }, [lines, active]);

  return (
    <div style={{ fontFamily: 'monospace', display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {lines.slice(0, visibleCount).map((line, i) => (
        <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
          <span style={{ fontSize: '0.65rem', color: 'var(--fg-3)', minWidth: '16px', marginTop: '2px' }}>
            {String(i + 1).padStart(2, '0')}
          </span>
          <span style={{ fontSize: '0.8rem', color: 'var(--fg-1)', lineHeight: 1.5 }}>{line}</span>
        </div>
      ))}
      {visibleCount < lines.length && (
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.25)', minWidth: '16px' }}>
            {String(visibleCount + 1).padStart(2, '0')}
          </span>
          <span style={{
            display: 'inline-block', width: '8px', height: '14px',
            backgroundColor: 'rgba(99,102,241,0.8)',
            animation: 'blink 1s step-end infinite',
          }} />
        </div>
      )}
    </div>
  );
}

export function AISystemsPanel() {
  const [activeId, setActiveId] = useState('research');
  const [animKey, setAnimKey] = useState(0);
  const active = AI_SYSTEMS.find(s => s.id === activeId) ?? AI_SYSTEMS[0];

  const select = (id: string) => {
    setActiveId(id);
    setAnimKey(k => k + 1);
  };

  return (
    <section style={{ padding: 'clamp(72px, 10vw, 112px) 0', backgroundColor: 'var(--bg-1)', borderTop: '1px solid var(--line)' }}>
      <div className="shell">

        {/* Header */}
        <div style={{ marginBottom: '52px', maxWidth: '640px' }}>
          <Reveal direction="up" delay={0.05}>
            <h2 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.2rem)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: '20px', color: 'var(--fg-0)' }}>
              Six AI systems.<br />
              <span style={{ color: 'var(--fg-2)' }}>One growth team.</span>
            </h2>
          </Reveal>
          <Reveal direction="up" delay={0.12}>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--fg-1)' }}>
              Tap any system to see what it does. Together they replace the dozens of dashboards
              and spreadsheets your team is stuck in — and run 24/7.
            </p>
          </Reveal>
        </div>

        {/* Two-column panel */}
        <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '16px', alignItems: 'start' }} className="ai-panel-grid">

          {/* ── Left: system list ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {AI_SYSTEMS.map(sys => {
              const isActive = sys.id === activeId;
              return (
                <button
                  key={sys.id}
                  onClick={() => select(sys.id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '14px',
                    padding: '14px 16px', borderRadius: '12px', border: 'none',
                    cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s',
                    backgroundColor: isActive ? 'rgba(99,102,241,0.12)' : 'transparent',
                    borderLeft: `3px solid ${isActive ? sys.color : 'transparent'}`,
                    width: '100%',
                  }}
                  onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.backgroundColor = 'var(--bg-2)'; }}
                  onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.backgroundColor = 'transparent'; }}
                >
                  {/* Number */}
                  <span style={{ fontSize: '0.72rem', fontWeight: '700', color: isActive ? sys.color : 'var(--fg-3)', minWidth: '20px', fontFamily: 'monospace' }}>
                    {sys.num}
                  </span>

                  {/* Icon */}
                  <div style={{
                    width: '34px', height: '34px', borderRadius: '8px', flexShrink: 0,
                    backgroundColor: isActive ? sys.color : 'var(--bg-3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'background 0.2s',
                  }}>
                    <div style={{ color: isActive ? 'white' : 'var(--fg-2)', filter: isActive ? 'none' : 'brightness(0.6)' }}>
                      {sys.icon}
                    </div>
                  </div>

                  {/* Name + sub */}
                  <div>
                    <p style={{ fontWeight: '600', fontSize: '0.9rem', color: isActive ? 'var(--fg-0)' : 'var(--fg-1)', margin: 0, lineHeight: 1.3 }}>
                      {sys.name}
                    </p>
                    <p style={{ fontSize: '0.72rem', color: 'var(--fg-3)', margin: 0, lineHeight: 1.3 }}>
                      {sys.sub}
                    </p>
                  </div>

                  {/* Arrow on active */}
                  {isActive && (
                    <div style={{ marginLeft: 'auto', color: 'var(--fg-3)' }}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M4 7h6M7 4l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* ── Right: detail panel ── */}
          <div key={animKey} style={{
            backgroundColor: 'var(--bg-2)', border: '1px solid var(--line)',
            borderRadius: '16px', overflow: 'hidden',
            animation: 'fadeSlideIn 0.25s ease',
          }}>
            {/* Panel header */}
            <div style={{
              padding: '20px 24px', borderBottom: '1px solid var(--line)',
              display: 'flex', alignItems: 'center', gap: '14px',
            }}>
              <div style={{
                width: '40px', height: '40px', borderRadius: '10px',
                backgroundColor: active.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                {active.icon}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '0.62rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--fg-3)', margin: '0 0 3px' }}>
                  SYSTEM · {active.num} / 06
                </p>
                <p style={{ fontWeight: '700', fontSize: '1.1rem', color: 'var(--fg-0)', margin: 0, lineHeight: 1.2 }}>
                  {active.name}
                </p>
              </div>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '6px 12px', borderRadius: '20px',
                backgroundColor: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)',
              }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10b981', animation: 'pulse-dot 2s ease infinite' }} />
                <span style={{ fontSize: '0.72rem', fontWeight: '600', color: '#10b981' }}>Running</span>
              </div>
            </div>

            {/* Description */}
            <div style={{ padding: '20px 24px 0' }}>
              <p style={{ fontSize: '0.92rem', lineHeight: 1.7, color: 'var(--fg-1)' }}>
                {active.desc}
              </p>
            </div>

            {/* Two-col detail */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0', padding: '20px 24px 24px' }} className="detail-cols">
              {/* What it does */}
              <div style={{ paddingRight: '20px', borderRight: '1px solid var(--line)' }}>
                <p style={{ fontSize: '0.62rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--fg-3)', marginBottom: '12px' }}>
                  WHAT IT DOES
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {active.whatItDoes.map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <div style={{
                        width: '16px', height: '16px', borderRadius: '4px', flexShrink: 0, marginTop: '1px',
                        backgroundColor: `${active.color}22`, border: `1px solid ${active.color}44`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                          <path d="M1 4l2 2 4-4" stroke={active.color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <span style={{ fontSize: '0.82rem', color: 'var(--fg-1)', lineHeight: 1.5 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sample output */}
              <div style={{ paddingLeft: '20px' }}>
                <p style={{ fontSize: '0.62rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--fg-3)', marginBottom: '12px' }}>
                  SAMPLE OUTPUT
                </p>
                <div style={{
                  backgroundColor: 'var(--bg-1)', borderRadius: '8px',
                  border: '1px solid var(--line)', padding: '14px',
                  minHeight: '110px',
                }}>
                  <TypewriterLines lines={active.sampleOutput} active={true} key={animKey} />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.4; }
        }
        @media (max-width: 768px) {
          .ai-panel-grid  { grid-template-columns: 1fr !important; }
          .detail-cols    { grid-template-columns: 1fr !important; }
          .detail-cols > div:first-child { border-right: none !important; border-bottom: 1px solid var(--line); padding-right: 0 !important; padding-bottom: 16px; margin-bottom: 16px; }
          .detail-cols > div:last-child  { padding-left: 0 !important; }
        }
      `}</style>
    </section>
  );
}
