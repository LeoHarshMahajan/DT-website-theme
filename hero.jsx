/* global React, Icon, Reveal, StatusPill, AnimatedNumber */
const { useState, useEffect, useRef } = React;

/* ------------------------------------------------------------------
   HERO — three variant centerpieces
   variant: "workflow" | "dashboard" | "stack"
------------------------------------------------------------------ */

/* Variant A: AI Workflow Graph — animated nodes + edges */
const HeroWorkflow = () => {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1500);
    return () => clearInterval(id);
  }, []);
  const nodes = [
    { id: "in", x: 60, y: 220, label: "Signal", sub: "Ads · SEO · Social", tone: "blue" },
    { id: "ai", x: 280, y: 140, label: "AI System", sub: "Claude · GPT · Gemini", tone: "violet", featured: true },
    { id: "ai2", x: 280, y: 300, label: "Research", sub: "Market intel", tone: "violet" },
    { id: "auto", x: 500, y: 200, label: "Automation", sub: "Workflows", tone: "magenta" },
    { id: "out1", x: 720, y: 120, label: "Performance", sub: "ROAS 4.8×", tone: "blue" },
    { id: "out2", x: 720, y: 220, label: "Content", sub: "Creator engine", tone: "violet" },
    { id: "out3", x: 720, y: 320, label: "Lifecycle", sub: "WhatsApp · CRM", tone: "magenta" },
  ];
  const edges = [
    ["in", "ai"], ["in", "ai2"], ["ai", "auto"], ["ai2", "auto"],
    ["auto", "out1"], ["auto", "out2"], ["auto", "out3"],
  ];
  const tones = { blue: "var(--brand-blue)", violet: "var(--brand-violet)", magenta: "var(--brand-magenta)" };
  return (
    <div className="hero-visual hero-workflow">
      <svg viewBox="0 0 820 440" preserveAspectRatio="xMidYMid meet" style={{ width: "100%", height: "100%" }}>
        <defs>
          <linearGradient id="edge" x1="0" x2="1">
            <stop offset="0" stopColor="rgba(75,107,255,0.5)" />
            <stop offset="1" stopColor="rgba(192,38,211,0.5)" />
          </linearGradient>
          <radialGradient id="glow-b" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="rgba(75,107,255,0.5)" />
            <stop offset="1" stopColor="rgba(75,107,255,0)" />
          </radialGradient>
          <filter id="softglow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>

        {/* grid */}
        <g opacity="0.18">
          {Array.from({ length: 9 }).map((_, i) => (
            <line key={`gv${i}`} x1={i * 100} y1="0" x2={i * 100} y2="440" stroke="rgba(255,255,255,0.18)" strokeWidth="0.5" />
          ))}
          {Array.from({ length: 5 }).map((_, i) => (
            <line key={`gh${i}`} x1="0" y1={i * 100} x2="820" y2={i * 100} stroke="rgba(255,255,255,0.18)" strokeWidth="0.5" />
          ))}
        </g>

        {/* edges */}
        {edges.map(([a, b], i) => {
          const A = nodes.find((n) => n.id === a);
          const B = nodes.find((n) => n.id === b);
          return (
            <g key={i}>
              <path d={`M${A.x},${A.y} C${(A.x + B.x) / 2},${A.y} ${(A.x + B.x) / 2},${B.y} ${B.x},${B.y}`} stroke="url(#edge)" strokeWidth="1.2" fill="none" />
              {/* animated dot */}
              <circle r="3" fill="#fff">
                <animateMotion dur={`${2.6 + i * 0.2}s`} repeatCount="indefinite" path={`M${A.x},${A.y} C${(A.x + B.x) / 2},${A.y} ${(A.x + B.x) / 2},${B.y} ${B.x},${B.y}`} />
              </circle>
            </g>
          );
        })}

        {/* nodes */}
        {nodes.map((n) => (
          <g key={n.id} transform={`translate(${n.x},${n.y})`}>
            {n.featured && (
              <circle r="58" fill="url(#glow-b)" opacity="0.7">
                <animate attributeName="r" values="50;62;50" dur="3s" repeatCount="indefinite" />
              </circle>
            )}
            <rect x="-62" y="-26" width="124" height="52" rx="14" fill="var(--bg-2)" stroke={n.featured ? tones[n.tone] : "var(--line-strong)"} strokeWidth={n.featured ? 1.4 : 1} />
            <circle cx="-46" cy="0" r="5" fill={tones[n.tone]}>
              {n.featured && <animate attributeName="opacity" values="1;0.4;1" dur="1.6s" repeatCount="indefinite" />}
            </circle>
            <text x="-32" y="-3" fill="var(--fg-0)" fontSize="11" fontFamily="var(--font-sans)" fontWeight="500">{n.label}</text>
            <text x="-32" y="12" fill="var(--fg-2)" fontSize="9" fontFamily="var(--font-mono)">{n.sub}</text>
          </g>
        ))}
      </svg>

      <style>{`
        .hero-workflow { padding: 16px; }
      `}</style>
    </div>
  );
};

/* Variant B: Growth Dashboard mockup */
const HeroDashboard = () => {
  const [revenue, setRevenue] = useState(248430);
  const [roas, setRoas] = useState(4.82);
  useEffect(() => {
    const id = setInterval(() => {
      setRevenue((v) => v + Math.floor(Math.random() * 240 + 80));
      setRoas((v) => Math.max(3.2, Math.min(6.5, v + (Math.random() - 0.45) * 0.08)));
    }, 1600);
    return () => clearInterval(id);
  }, []);
  // sparkline path
  const spark = useMemoSpark();
  return (
    <div className="hero-visual hero-dash">
      <div className="dash-head">
        <div className="flex gap-2 items-center">
          <span style={{ width: 9, height: 9, borderRadius: 99, background: "#34d399", boxShadow: "0 0 10px #34d399" }} />
          <span className="mono" style={{ fontSize: 11, letterSpacing: "0.06em" }}>LIVE · growth.dt</span>
        </div>
        <span className="mono" style={{ fontSize: 11, color: "var(--fg-3)" }}>30D · auto-refresh</span>
      </div>
      <div className="dash-body">
        <div className="dash-kpi">
          <div className="mono" style={{ fontSize: 10, color: "var(--fg-3)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Revenue</div>
          <div className="dash-val">₹{revenue.toLocaleString("en-IN")}</div>
          <div className="dash-delta dash-up">+24.8% vs prev</div>
        </div>
        <div className="dash-kpi">
          <div className="mono" style={{ fontSize: 10, color: "var(--fg-3)", letterSpacing: "0.1em", textTransform: "uppercase" }}>ROAS</div>
          <div className="dash-val">{roas.toFixed(2)}×</div>
          <div className="dash-delta dash-up">+1.4× vs prev</div>
        </div>
        <div className="dash-kpi">
          <div className="mono" style={{ fontSize: 10, color: "var(--fg-3)", letterSpacing: "0.1em", textTransform: "uppercase" }}>CAC</div>
          <div className="dash-val">₹312</div>
          <div className="dash-delta dash-up">−38% vs prev</div>
        </div>
        <div className="dash-chart" style={{ gridColumn: "span 3" }}>
          <div className="flex justify-between items-center" style={{ marginBottom: 12 }}>
            <span className="mono" style={{ fontSize: 11, color: "var(--fg-2)" }}>BLENDED ROAS · BY CHANNEL</span>
            <div className="flex gap-3" style={{ fontSize: 10, color: "var(--fg-2)" }}>
              <span className="flex items-center gap-1"><span style={{ width: 8, height: 2, background: "var(--brand-blue)" }}/>Meta</span>
              <span className="flex items-center gap-1"><span style={{ width: 8, height: 2, background: "var(--brand-violet)" }}/>Google</span>
              <span className="flex items-center gap-1"><span style={{ width: 8, height: 2, background: "var(--brand-magenta)" }}/>Organic</span>
            </div>
          </div>
          <svg viewBox="0 0 600 160" preserveAspectRatio="none" style={{ width: "100%", height: 140 }}>
            <defs>
              <linearGradient id="fillA" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="rgba(75,107,255,0.35)" />
                <stop offset="1" stopColor="rgba(75,107,255,0)" />
              </linearGradient>
            </defs>
            {[0, 40, 80, 120, 160].map((y) => <line key={y} x1="0" x2="600" y1={y} y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />)}
            <path d={spark.fill1} fill="url(#fillA)" />
            <path d={spark.line1} stroke="var(--brand-blue)" strokeWidth="1.6" fill="none" />
            <path d={spark.line2} stroke="var(--brand-violet)" strokeWidth="1.6" fill="none" strokeDasharray="3 3" opacity="0.85" />
            <path d={spark.line3} stroke="var(--brand-magenta)" strokeWidth="1.6" fill="none" opacity="0.85" />
          </svg>
        </div>
      </div>
      <style>{`
        .hero-dash {
          padding: 16px;
          display: flex; flex-direction: column; gap: 14px;
        }
        .dash-head { display: flex; justify-content: space-between; align-items: center; padding-bottom: 12px; border-bottom: 1px solid var(--line); }
        .dash-body { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; flex: 1; }
        .dash-kpi {
          background: rgba(255,255,255,0.02);
          border: 1px solid var(--line);
          border-radius: 12px;
          padding: 14px;
        }
        .dash-val { font-size: clamp(20px, 2.4vw, 28px); margin-top: 6px; letter-spacing: -0.02em; font-weight: 500; }
        .dash-delta { font-family: var(--font-mono); font-size: 11px; margin-top: 4px; }
        .dash-up { color: #34d399; }
        .dash-chart {
          background: rgba(255,255,255,0.02);
          border: 1px solid var(--line);
          border-radius: 12px;
          padding: 14px;
        }
      `}</style>
    </div>
  );
};

const useMemoSpark = () => {
  return React.useMemo(() => {
    const gen = (seed, amp, base) => {
      let pts = [];
      let v = base;
      for (let i = 0; i <= 30; i++) {
        v += (Math.sin(i * seed) + Math.cos(i * seed * 0.7)) * amp * 0.4 + (Math.random() - 0.5) * amp * 0.3;
        v = Math.max(20, Math.min(140, v));
        pts.push([i * 20, v]);
      }
      return pts;
    };
    const toLine = (pts) => "M " + pts.map(([x, y]) => `${x},${y}`).join(" L ");
    const toFill = (pts) => toLine(pts) + ` L ${pts[pts.length - 1][0]},160 L 0,160 Z`;
    const a = gen(0.5, 8, 110);
    const b = gen(0.8, 6, 80);
    const c = gen(1.2, 5, 50);
    return { line1: toLine(a), fill1: toFill(a), line2: toLine(b), line3: toLine(c) };
  }, []);
};

/* Variant C: Layered SaaS cards drifting */
const HeroStack = () => {
  return (
    <div className="hero-visual hero-stack">
      <div className="stack-card stack-back">
        <div className="flex justify-between items-center" style={{ marginBottom: 12 }}>
          <span className="mono" style={{ fontSize: 10, color: "var(--fg-3)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Audience signals</span>
          <Icon name="layers" size={14} />
        </div>
        {[
          ["Returning HVC", "12,408", "var(--brand-blue)"],
          ["Cart abandoners", "3,842", "var(--brand-violet)"],
          ["WhatsApp opt-ins", "28,116", "var(--brand-magenta)"],
        ].map(([k, v, c]) => (
          <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderTop: "1px solid var(--line)", fontSize: 12 }}>
            <span style={{ color: "var(--fg-2)", display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 6, height: 6, borderRadius: 99, background: c }} />{k}</span>
            <span className="mono" style={{ color: "var(--fg-0)" }}>{v}</span>
          </div>
        ))}
      </div>
      <div className="stack-card stack-mid">
        <div className="flex justify-between items-center" style={{ marginBottom: 14 }}>
          <div>
            <div className="mono" style={{ fontSize: 10, color: "var(--fg-3)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Campaign</div>
            <div style={{ fontSize: 14, fontWeight: 500, marginTop: 2 }}>Diwali · Performance Burst</div>
          </div>
          <StatusPill tone="green">Live</StatusPill>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {[["Spend", "₹4.2L"], ["Revenue", "₹20.3L"], ["ROAS", "4.82×"], ["Orders", "1,438"]].map(([k, v]) => (
            <div key={k} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--line)", borderRadius: 10, padding: 10 }}>
              <div className="mono" style={{ fontSize: 9, color: "var(--fg-3)", letterSpacing: "0.1em" }}>{k.toUpperCase()}</div>
              <div style={{ fontSize: 18, fontWeight: 500, marginTop: 4 }}>{v}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="stack-card stack-front">
        <div className="flex items-center gap-2" style={{ marginBottom: 10 }}>
          <span style={{ width: 24, height: 24, borderRadius: 8, background: "var(--grad-brand)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}><Icon name="sparkles" size={12} /></span>
          <span style={{ fontWeight: 500, fontSize: 13 }}>AI System · Creative</span>
          <span style={{ marginLeft: "auto" }} className="mono" >
            <span style={{ width: 6, height: 6, borderRadius: 99, background: "#34d399", display: "inline-block", marginRight: 6 }} />
            <span style={{ fontSize: 10, color: "var(--fg-2)" }}>thinking</span>
          </span>
        </div>
        <div style={{ fontSize: 12.5, color: "var(--fg-1)", lineHeight: 1.55 }}>
          Generated 14 ad variants for <span style={{ color: "var(--fg-0)" }}>Diwali · Performance Burst</span>. Top performer: <span style={{ color: "var(--brand-blue-soft)" }}>"Made for Bharat. Built for global."</span> — predicted CTR <span className="mono" style={{ color: "var(--fg-0)" }}>4.18%</span>.
        </div>
        <div style={{ marginTop: 12, display: "flex", gap: 6 }}>
          <span className="chip" style={{ fontSize: 10 }}>Reels · 9:16</span>
          <span className="chip" style={{ fontSize: 10 }}>Static · 1:1</span>
          <span className="chip" style={{ fontSize: 10 }}>UGC script</span>
        </div>
      </div>

      <style>{`
        .hero-stack {
          position: relative;
          padding: 24px;
        }
        .stack-card {
          position: absolute;
          background: var(--bg-2);
          border: 1px solid var(--line-strong);
          border-radius: 14px;
          padding: 14px;
          box-shadow: 0 30px 60px -20px rgba(0,0,0,0.7);
        }
        .stack-back { top: 8%; left: 4%; width: 46%; transform: rotate(-3deg); }
        .stack-mid { top: 26%; right: 6%; width: 52%; transform: rotate(2deg); }
        .stack-front { bottom: 8%; left: 18%; width: 64%; border-color: rgba(139,92,246,0.3); }
        .stack-front::before {
          content: "";
          position: absolute; inset: -1px;
          border-radius: 14px;
          background: var(--grad-brand);
          opacity: 0.15;
          z-index: -1;
        }
      `}</style>
    </div>
  );
};

/* ------------------------------------------------------------------
   HERO main
------------------------------------------------------------------ */
const Hero = ({ variant = "workflow", headline }) => {
  const Visual = variant === "dashboard" ? HeroDashboard : variant === "stack" ? HeroStack : HeroWorkflow;
  return (
    <section className="hero" id="top">
      <div className="grid-bg" />
      <div className="glow-orb" style={{ top: "-200px", left: "-100px", background: "var(--brand-blue)" }} />
      <div className="glow-orb" style={{ top: "-150px", right: "-100px", background: "var(--brand-magenta)" }} />

      <div className="shell hero-shell">
        <Reveal>
          <div className="hero-pill">
            <span style={{ width: 6, height: 6, borderRadius: 99, background: "#34d399", boxShadow: "0 0 8px #34d399" }} />
            <span className="mono" style={{ fontSize: 11, letterSpacing: "0.08em" }}>NEW · AI systems for performance marketing</span>
            <Icon name="arrow-right" size={11} />
          </div>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="h-display hero-title">
            {headline || (
              <>
                AI-powered growth<br />
                infrastructure for <span className="grad-text">modern brands.</span>
              </>
            )}
          </h1>
        </Reveal>

        <Reveal delay={160}>
          <p className="lead hero-lead">
            Digital Triangle combines AI, automation, performance marketing, SEO, content
            systems, analytics, and creative strategy — so brands scale smarter, faster, and with less guesswork.
          </p>
        </Reveal>

        <Reveal delay={240}>
          <div className="hero-cta">
            <a href="#contact" className="btn btn-primary">Book growth consultation <Icon name="arrow-right" size={14} className="btn-arrow" /></a>
            <a href="#systems" className="btn btn-ghost">Explore growth systems</a>
          </div>
        </Reveal>

        <Reveal delay={320}>
          <div className="hero-meta">
            <div className="hero-meta-item">
              <Icon name="sparkles" size={14} />
              <span>Built on Claude · GPT · Gemini</span>
            </div>
            <div className="hero-meta-sep" />
            <div className="hero-meta-item">
              <Icon name="shield" size={14} />
              <span>2.1Cr+ AI-assisted decisions/mo</span>
            </div>
            <div className="hero-meta-sep" />
            <div className="hero-meta-item">
              <Icon name="globe" size={14} />
              <span>India · GCC · US · UK</span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={400}>
          <div className="hero-frame">
            <div className="hero-frame-chrome">
              <span className="dot" /><span className="dot" /><span className="dot" />
              <span className="mono" style={{ fontSize: 11, marginLeft: 12, color: "var(--fg-2)" }}>growth.digitaltriangle.in</span>
              <span style={{ marginLeft: "auto", fontSize: 10 }} className="mono">{
                variant === "dashboard" ? "Dashboard" : variant === "stack" ? "Campaign view" : "AI workflow"
              }</span>
            </div>
            <Visual />
          </div>
        </Reveal>
      </div>

      <style>{`
        .hero { padding-top: 140px; padding-bottom: 80px; overflow: hidden; }
        .hero-shell { position: relative; z-index: 2; display: flex; flex-direction: column; align-items: center; text-align: center; }
        .hero-pill {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 6px 14px; border-radius: 999px;
          background: rgba(255,255,255,0.04);
          border: 1px solid var(--line-strong);
          color: var(--fg-1);
          margin-bottom: 28px;
          backdrop-filter: blur(8px);
        }
        .hero-title { max-width: 16ch; margin-bottom: 24px; }
        .hero-lead { max-width: 60ch; margin-bottom: 36px; }
        .hero-cta { display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; margin-bottom: 32px; }
        .hero-meta {
          display: flex; align-items: center; gap: 18px; flex-wrap: wrap; justify-content: center;
          font-size: 12.5px; color: var(--fg-2); margin-bottom: 64px;
        }
        .hero-meta-item { display: flex; align-items: center; gap: 8px; }
        .hero-meta-sep { width: 1px; height: 12px; background: var(--line-strong); }
        .hero-frame {
          width: 100%;
          max-width: 1100px;
          background: var(--bg-1);
          border: 1px solid var(--line-strong);
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 60px 120px -40px rgba(0,0,0,0.8), 0 0 80px -20px rgba(75,107,255,0.25), 0 0 120px -40px rgba(192,38,211,0.18);
          position: relative;
        }
        .hero-frame::before {
          content: ""; position: absolute; inset: 0; border-radius: 18px;
          background: linear-gradient(135deg, rgba(75,107,255,0.06), rgba(192,38,211,0.05));
          pointer-events: none;
        }
        .hero-frame-chrome {
          height: 36px; display: flex; align-items: center; gap: 6px;
          padding: 0 16px;
          border-bottom: 1px solid var(--line);
          background: rgba(255,255,255,0.02);
          position: relative; z-index: 2;
        }
        .hero-frame-chrome .dot { width: 10px; height: 10px; border-radius: 99px; background: rgba(255,255,255,0.1); }
        .hero-frame-chrome .dot:nth-child(1) { background: #ff5f57; }
        .hero-frame-chrome .dot:nth-child(2) { background: #febc2e; }
        .hero-frame-chrome .dot:nth-child(3) { background: #28c840; }
        .hero-visual {
          position: relative; z-index: 1;
          aspect-ratio: 16 / 9;
          background: radial-gradient(ellipse at top, rgba(75,107,255,0.06), transparent 60%);
        }
        @media (max-width: 768px) {
          .hero-meta { gap: 10px; }
          .hero-meta-sep { display: none; }
        }
        @media (max-width: 640px) {
          .hero { padding-top: 100px; padding-bottom: 40px; }
          .hero-title { font-size: 38px; line-height: 1.02; }
          .hero-lead { font-size: 15px; }
          .hero-pill { font-size: 11px; padding: 5px 11px; }
          .hero-pill .mono { font-size: 10px; }
          .hero-cta .btn { width: 100%; justify-content: center; }
          .hero-cta { width: 100%; max-width: 320px; }
          .hero-frame-chrome { height: 30px; padding: 0 10px; }
          .hero-frame-chrome .mono { font-size: 9px; }
        }
      `}</style>
    </section>
  );
};

/* ------------------------------------------------------------------
   TRUSTED BRANDS marquee
------------------------------------------------------------------ */
const TrustedBrands = () => {
  const brands = [
    "Portronics", "Kajaria", "Ofis Square", "Bombay Shaving", "Bewakoof", "Mamaearth",
    "Boat", "Wakefit", "Sleepyhead", "Pilgrim", "Mokobara", "The Whole Truth",
  ];
  return (
    <section style={{ padding: "60px 0", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
      <div className="shell" style={{ textAlign: "center", marginBottom: 24 }}>
        <span className="mono" style={{ fontSize: 11, letterSpacing: "0.16em", color: "var(--fg-3)", textTransform: "uppercase" }}>
          Growth partner to modern brands — D2C, ecommerce, founders
        </span>
      </div>
      <div className="marquee">
        <div className="marquee-track">
          {[...brands, ...brands].map((b, i) => (
            <div key={i} className="brand-mark">
              {b}
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .brand-mark {
          font-size: clamp(20px, 2.4vw, 28px);
          letter-spacing: -0.025em;
          color: var(--fg-2);
          opacity: 0.7;
          font-weight: 500;
          white-space: nowrap;
          transition: opacity .2s, color .2s;
        }
        .brand-mark:hover { opacity: 1; color: var(--fg-0); }
      `}</style>
    </section>
  );
};

Object.assign(window, { Hero, TrustedBrands });

