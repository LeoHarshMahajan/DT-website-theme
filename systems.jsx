/* global React, Icon, Reveal, StatusPill */
const { useState, useEffect, useRef, useMemo } = React;

/* ------------------------------------------------------------------
   GROWTH ECOSYSTEM — interconnected systems orbit
------------------------------------------------------------------ */
const ECOSYSTEM_NODES = [
  { id: "ai", label: "AI", desc: "LLMs · models · workflows" },
  { id: "seo", label: "SEO", desc: "Organic · AEO · GEO" },
  { id: "paid", label: "Paid", desc: "Meta · Google · Amazon" },
  { id: "content", label: "Content", desc: "Creators · Reels · Brand" },
  { id: "lifecycle", label: "Lifecycle", desc: "WhatsApp · CRM · Email" },
  { id: "analytics", label: "Analytics", desc: "GA4 · Attribution · CRO" },
  { id: "creative", label: "Creative", desc: "Ad systems · UI/UX · Video" },
  { id: "automation", label: "Automation", desc: "Martech stack · Ops" },
];

const Ecosystem = () => {
  const [hovered, setHovered] = useState(null);
  const radius = 200;
  const cx = 280, cy = 280;
  const positions = ECOSYSTEM_NODES.map((n, i) => {
    const a = (i / ECOSYSTEM_NODES.length) * Math.PI * 2 - Math.PI / 2;
    return { ...n, x: cx + Math.cos(a) * radius, y: cy + Math.sin(a) * radius };
  });

  return (
    <section id="ecosystem">
      <div className="shell">
        <div className="section-head">
          <span className="eyebrow">02 · Growth ecosystem</span>
          <h2 className="h-section">One connected stack —<br /><span className="text-fg-2">not a list of services.</span></h2>
          <p className="lead">Every system feeds the next. AI sits in the middle, learning from every campaign, every funnel,
          every conversation — so growth compounds instead of plateauing.</p>
        </div>

        <Reveal>
          <div className="eco-wrap">
            <svg viewBox="0 0 560 560" preserveAspectRatio="xMidYMid meet" className="eco-svg">
              <defs>
                <radialGradient id="core" cx="50%" cy="50%" r="50%">
                  <stop offset="0" stopColor="rgba(139,92,246,0.5)" />
                  <stop offset="0.6" stopColor="rgba(75,107,255,0.2)" />
                  <stop offset="1" stopColor="rgba(75,107,255,0)" />
                </radialGradient>
                <linearGradient id="ring" x1="0" x2="1">
                  <stop offset="0" stopColor="rgba(75,107,255,0.4)" />
                  <stop offset="1" stopColor="rgba(192,38,211,0.4)" />
                </linearGradient>
              </defs>

              {/* concentric rings */}
              {[80, 140, 200, 260].map((r, i) => (
                <circle key={r} cx={cx} cy={cy} r={r}
                  fill="none" stroke="url(#ring)"
                  strokeWidth={i === 2 ? 0.8 : 0.4}
                  strokeDasharray={i === 2 ? "0" : "3 6"}
                  opacity={0.4 - i * 0.05} />
              ))}

              {/* connecting lines from center */}
              {positions.map((p) => (
                <line key={`l-${p.id}`} x1={cx} y1={cy} x2={p.x} y2={p.y}
                  stroke={hovered === p.id ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.06)"}
                  strokeWidth="0.6" />
              ))}

              {/* core */}
              <circle cx={cx} cy={cy} r="100" fill="url(#core)">
                <animate attributeName="r" values="95;105;95" dur="4s" repeatCount="indefinite" />
              </circle>
              <circle cx={cx} cy={cy} r="50" fill="var(--bg-1)" stroke="rgba(139,92,246,0.5)" strokeWidth="1" />
              <text x={cx} y={cy - 6} textAnchor="middle" fill="var(--fg-0)" fontSize="14" fontWeight="500">DT Core</text>
              <text x={cx} y={cy + 12} textAnchor="middle" fill="var(--fg-2)" fontSize="9" fontFamily="var(--font-mono)">AI orchestration</text>

              {/* orbiting nodes */}
              {positions.map((p) => (
                <g key={p.id} transform={`translate(${p.x},${p.y})`}
                   onMouseEnter={() => setHovered(p.id)} onMouseLeave={() => setHovered(null)}
                   style={{ cursor: "pointer" }}>
                  <circle r="38" fill={hovered === p.id ? "rgba(139,92,246,0.15)" : "transparent"} />
                  <circle r="30" fill="var(--bg-2)" stroke={hovered === p.id ? "var(--brand-violet)" : "var(--line-strong)"} strokeWidth="1" />
                  <text textAnchor="middle" y="-2" fill="var(--fg-0)" fontSize="11" fontWeight="500">{p.label}</text>
                  <text textAnchor="middle" y="14" fill="var(--fg-3)" fontSize="7" fontFamily="var(--font-mono)">{p.id.toUpperCase()}</text>
                </g>
              ))}
            </svg>

            <div className="eco-side">
              <div className="eco-card">
                <div className="mono" style={{ fontSize: 10, letterSpacing: "0.1em", color: "var(--fg-3)", textTransform: "uppercase" }}>{hovered ? "Focused" : "Hover the orbit"}</div>
                <div style={{ fontSize: 22, fontWeight: 500, marginTop: 6 }}>
                  {hovered ? ECOSYSTEM_NODES.find(n => n.id === hovered).label : "8 connected systems"}
                </div>
                <div style={{ color: "var(--fg-1)", marginTop: 8, fontSize: 14 }}>
                  {hovered
                    ? ECOSYSTEM_NODES.find(n => n.id === hovered).desc
                    : "Each system shares data, audiences, and signals. AI learns across all of them so every campaign starts smarter than the last."}
                </div>
                <div className="eco-foot">
                  <span className="chip"><Icon name="bolt" size={11} /> Always-on</span>
                  <span className="chip"><Icon name="brain" size={11} /> AI-orchestrated</span>
                  <span className="chip"><Icon name="chart" size={11} /> Outcome-linked</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <style>{`
        .eco-wrap {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 32px;
          align-items: center;
        }
        .eco-svg { width: 100%; max-width: 580px; aspect-ratio: 1; }
        .eco-side { display: flex; flex-direction: column; gap: 16px; }
        .eco-card {
          background: var(--bg-1);
          border: 1px solid var(--line);
          border-radius: var(--radius-lg);
          padding: 24px;
        }
        .eco-foot { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 18px; }
        @media (max-width: 900px) {
          .eco-wrap { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
};

/* ------------------------------------------------------------------
   GROWTH SYSTEMS — 7 service hubs (bento grid)
------------------------------------------------------------------ */
const SYSTEMS = [
  {
    id: "organic",
    title: "Organic Growth",
    tag: "SEO · AEO · GEO",
    icon: "search",
    blurb: "Win Google, ChatGPT, Perplexity, and Gemini. Built for AI-first discovery.",
    chips: ["Shopify SEO", "Programmatic SEO", "AEO", "GEO", "International SEO"],
    metric: "+312% organic / 9mo",
    span: 2,
  },
  {
    id: "performance",
    title: "Performance Growth",
    tag: "Paid acquisition",
    icon: "target",
    blurb: "Meta, Google, YouTube, Amazon — engineered for ROAS, not impressions.",
    chips: ["Meta Ads", "Google Ads", "Creative Strategy", "CAC Optimization"],
    metric: "4.8× blended ROAS",
  },
  {
    id: "ai",
    title: "AI & Automation",
    tag: "Marketing intelligence",
    icon: "brain",
    blurb: "AI systems that research, write, plan, optimize — wired into your stack.",
    chips: ["AI Systems", "Workflows", "Martech Stack", "Chatbots", "AI Research"],
    metric: "120hr/mo saved per brand",
    featured: true,
    span: 2,
  },
  {
    id: "content",
    title: "Content & Social",
    tag: "Attention systems",
    icon: "play",
    blurb: "Reels, founder branding, UGC, creator engines — built to compound.",
    chips: ["Reels", "Founder Branding", "UGC", "Influencer"],
    metric: "8.4M+ monthly reach",
  },
  {
    id: "lifecycle",
    title: "Retention & Lifecycle",
    tag: "Repeat revenue",
    icon: "chat",
    blurb: "WhatsApp commerce, CRM workflows, cart recovery — close the loop.",
    chips: ["WhatsApp", "CRM", "Email · SMS", "Cart Recovery"],
    metric: "+38% repeat rate",
  },
  {
    id: "creative",
    title: "Brand & Creative",
    tag: "Identity that converts",
    icon: "wand",
    blurb: "Brand systems, ad creative, UI/UX, motion — every asset measured.",
    chips: ["Brand Identity", "Ad Systems", "UI/UX", "Motion"],
    metric: "2,400+ creatives shipped",
  },
  {
    id: "analytics",
    title: "Analytics & Conversion",
    tag: "Data → decisions",
    icon: "chart",
    blurb: "GA4, attribution, dashboards, CRO — see what's working in real time.",
    chips: ["GA4", "GTM", "Attribution", "CRO", "Dashboards"],
    metric: "+62% conversion lift avg",
  },
];

const SystemsGrid = () => {
  return (
    <section id="systems">
      <div className="shell">
        <div className="section-head">
          <span className="eyebrow">03 · Growth systems</span>
          <h2 className="h-section">Seven systems.<br/><span className="text-fg-2">One growth engine.</span></h2>
          <p className="lead">Each system is plug-and-play and outcome-linked. Engage one — or wire them
          together for compounding leverage across acquisition, retention, and intelligence.</p>
        </div>

        <div className="sys-grid">
          {SYSTEMS.map((s, i) => (
            <Reveal key={s.id} delay={i * 60}>
              <a href={`#${s.id}`} className={`card card-hover sys-card ${s.featured ? "sys-featured" : ""}`} style={{ gridColumn: s.span === 2 ? "span 2" : "span 1" }}>
                {s.featured && <div className="sys-glow" />}
                <div className="sys-head">
                  <div className="sys-icon-wrap">
                    <span className={`sys-icon ${s.featured ? "sys-icon-featured" : ""}`}><Icon name={s.icon} size={18} /></span>
                  </div>
                  <Icon name="arrow-up-right" size={16} />
                </div>
                <div className="sys-body">
                  <div className="mono sys-tag">{s.tag}</div>
                  <h3 className="h-card sys-title">{s.title}</h3>
                  <p className="sys-blurb">{s.blurb}</p>
                </div>
                <div className="sys-foot">
                  <div className="sys-chips">
                    {s.chips.map((c) => <span className="chip" key={c}>{c}</span>)}
                  </div>
                  <div className="sys-metric">
                    <span className="mono" style={{ fontSize: 10, color: "var(--fg-3)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Typical</span>
                    <div style={{ fontSize: 14, fontWeight: 500, marginTop: 2 }}>{s.metric}</div>
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>

      <style>{`
        .sys-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        .sys-card {
          padding: 24px;
          display: flex; flex-direction: column;
          gap: 20px;
          min-height: 260px;
          background: var(--bg-1);
        }
        .sys-card:hover { transform: translateY(-2px); background: var(--bg-2); }
        .sys-featured {
          background: linear-gradient(135deg, rgba(75,107,255,0.10), rgba(192,38,211,0.08));
          border-color: rgba(139,92,246,0.25);
          position: relative; overflow: hidden;
        }
        .sys-glow {
          position: absolute; top: -80px; right: -80px;
          width: 280px; height: 280px;
          background: radial-gradient(circle, rgba(139,92,246,0.3), transparent 70%);
          pointer-events: none;
        }
        .sys-head { display: flex; justify-content: space-between; align-items: flex-start; color: var(--fg-2); position: relative; z-index: 1; }
        .sys-icon {
          width: 38px; height: 38px; border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          background: rgba(255,255,255,0.05);
          border: 1px solid var(--line);
          color: var(--fg-0);
        }
        .sys-icon-featured { background: var(--grad-brand); border-color: transparent; box-shadow: 0 0 30px -10px rgba(139,92,246,0.7); }
        .sys-body { flex: 1; position: relative; z-index: 1; }
        .sys-tag { font-size: 11px; color: var(--fg-3); letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 6px; }
        .sys-title { margin-bottom: 8px; }
        .sys-blurb { font-size: 14px; color: var(--fg-2); line-height: 1.5; }
        .sys-foot { display: flex; flex-direction: column; gap: 14px; position: relative; z-index: 1; }
        .sys-chips { display: flex; flex-wrap: wrap; gap: 6px; }
        .sys-metric { padding-top: 14px; border-top: 1px solid var(--line); }
        @media (max-width: 1024px) { .sys-grid { grid-template-columns: repeat(2, 1fr); } .sys-card[style*="span 2"] { grid-column: span 2 !important; } }
        @media (max-width: 640px) { .sys-grid { grid-template-columns: 1fr; } .sys-card { grid-column: span 1 !important; } }
      `}</style>
    </section>
  );
};

/* ------------------------------------------------------------------
   AI WORKFLOW — interactive: click nodes to see what they do
------------------------------------------------------------------ */
const WORKFLOW_STEPS = [
  {
    id: "research",
    label: "Research System",
    sub: "Perplexity + Claude",
    icon: "search",
    title: "Research System",
    description: "Pulls live competitor SERP data, ad creatives, audience signals, and trend deltas — synthesized into a daily brief.",
    actions: ["Scans 40+ competitors", "Reads 500+ ads/day", "Surfaces TAM shifts", "Detects new keyword waves"],
    sample: ["Audience: HVC 25–34, Tier-1 metros", "Trend: GLP-1 wellness +218% MoM", "Gap: zero category share on AEO"],
  },
  {
    id: "strategy",
    label: "Strategy System",
    sub: "Claude · GPT-4o",
    icon: "brain",
    title: "Strategy System",
    description: "Turns the brief into a 30-day growth plan with channel mix, budget split, and creative pillars.",
    actions: ["Builds 30-day roadmap", "Forecasts CAC & ROAS", "Splits budget by channel", "Maps creative pillars"],
    sample: ["Meta 48% · Google 26% · WhatsApp 12%", "Forecast: 4.6× ROAS @ ₹1.8L/day", "3 creative pillars · 14 angles"],
  },
  {
    id: "creative",
    label: "Creative System",
    sub: "Image · Video · Copy",
    icon: "wand",
    title: "Creative System",
    description: "Generates ad creatives, scripts, and landing copy variants — all on-brand, all measurable.",
    actions: ["14 ad variants/brief", "9:16 · 1:1 · 16:9", "On-brand copy", "Auto A/B versions"],
    sample: ["Variant 03 → predicted CTR 4.18%", "Reels script v2 generated", "Static · ₹999 launch · 6 variants"],
  },
  {
    id: "launch",
    label: "Launch System",
    sub: "Meta · Google · GA4",
    icon: "bolt",
    title: "Launch System",
    description: "Pushes campaigns live across channels, wires tracking, and sets up real-time guardrails.",
    actions: ["Publishes campaigns", "Wires GA4 + GTM", "Sets ROAS guardrails", "Auto-pauses underperformers"],
    sample: ["12 campaigns live · 0 errors", "Server-side tracking armed", "Guardrail: pause < 1.8× ROAS"],
  },
  {
    id: "optimize",
    label: "Optimization System",
    sub: "Always-on",
    icon: "sparkles",
    title: "Optimization System",
    description: "Watches every channel 24/7. Rebalances spend, kills losers, scales winners — without waiting for Monday.",
    actions: ["24/7 spend rebalancing", "Auto-bid adjustments", "Creative refresh triggers", "Anomaly detection"],
    sample: ["Reallocated ₹42K → Reels (top 3%)", "Killed 8 underperformers", "Triggered Q4 creative refresh"],
  },
  {
    id: "lifecycle",
    label: "Lifecycle System",
    sub: "WhatsApp · CRM · Email",
    icon: "chat",
    title: "Lifecycle System",
    description: "Closes the loop. Cart recovery, win-back, VIP nudges — personalized at scale.",
    actions: ["WhatsApp commerce flows", "Cart recovery sequences", "Win-back automations", "VIP segmentation"],
    sample: ["+38% repeat rate / 90 days", "Cart recovery → ₹6.2L/mo", "VIP tier auto-assigned"],
  },
];

const Workflow = () => {
  const [active, setActive] = useState("research");
  const step = WORKFLOW_STEPS.find((s) => s.id === active);
  const idx = WORKFLOW_STEPS.findIndex((s) => s.id === active);
  return (
    <section id="workflow" style={{ background: "var(--bg-1)" }}>
      <div className="shell">
        <div className="section-head">
          <span className="eyebrow">04 · AI workflow · interactive</span>
          <h2 className="h-section">Six AI systems.<br/><span className="text-fg-2">One growth team.</span></h2>
          <p className="lead">Tap any system to see what it does. Together they replace the dozens of dashboards
          and spreadsheets your team is stuck in — and run 24/7.</p>
        </div>

        <div className="wf-wrap">
          <div className="wf-rail">
            {WORKFLOW_STEPS.map((s, i) => (
              <button key={s.id}
                className={`wf-node ${active === s.id ? "wf-active" : ""}`}
                onClick={() => setActive(s.id)}>
                <span className="wf-num mono">{String(i + 1).padStart(2, "0")}</span>
                <span className="wf-icon"><Icon name={s.icon} size={16} /></span>
                <span className="wf-node-text">
                  <span className="wf-node-label">{s.label}</span>
                  <span className="wf-node-sub mono">{s.sub}</span>
                </span>
                {active === s.id && <span className="wf-arrow"><Icon name="chevron-right" size={14} /></span>}
              </button>
            ))}
          </div>

          <div className="wf-panel">
            <div className="wf-panel-head">
              <div className="flex items-center gap-3">
                <span className="wf-panel-icon"><Icon name={step.icon} size={20} /></span>
                <div>
                  <div className="mono" style={{ fontSize: 10, color: "var(--fg-3)", letterSpacing: "0.1em" }}>SYSTEM · {String(idx + 1).padStart(2, "0")} / 06</div>
                  <div style={{ fontSize: 22, fontWeight: 500, marginTop: 2 }}>{step.title}</div>
                </div>
              </div>
              <StatusPill tone="green">Running</StatusPill>
            </div>
            <p style={{ color: "var(--fg-1)", marginTop: 16, fontSize: 15, lineHeight: 1.55 }}>{step.description}</p>

            <div className="wf-cols">
              <div>
                <div className="mono" style={{ fontSize: 10, color: "var(--fg-3)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>What it does</div>
                <ul className="wf-list">
                  {step.actions.map((a) => (
                    <li key={a}><span className="wf-check"><Icon name="check" size={11} /></span>{a}</li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="mono" style={{ fontSize: 10, color: "var(--fg-3)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>Sample output</div>
                <div className="wf-sample">
                  {step.sample.map((s, i) => (
                    <div key={i} className="wf-sample-line">
                      <span className="mono" style={{ color: "var(--fg-3)", fontSize: 10 }}>{String(i + 1).padStart(2, "0")}</span>
                      <span className="mono" style={{ fontSize: 12, color: "var(--fg-1)" }}>{s}</span>
                    </div>
                  ))}
                  <div className="wf-cursor mono">▍</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .wf-wrap {
          display: grid;
          grid-template-columns: 320px 1fr;
          gap: 24px;
          align-items: stretch;
        }
        .wf-rail {
          display: flex; flex-direction: column; gap: 8px;
        }
        .wf-node {
          display: grid;
          grid-template-columns: auto auto 1fr auto;
          gap: 12px; align-items: center;
          padding: 14px 16px;
          background: var(--bg-2);
          border: 1px solid var(--line);
          border-radius: 14px;
          text-align: left;
          transition: all .2s ease;
          color: var(--fg-1);
        }
        .wf-node:hover { border-color: var(--line-strong); background: var(--bg-3); }
        .wf-active {
          background: linear-gradient(135deg, rgba(75,107,255,0.10), rgba(192,38,211,0.08));
          border-color: rgba(139,92,246,0.4);
          color: var(--fg-0);
          box-shadow: 0 0 30px -10px rgba(139,92,246,0.4);
        }
        .wf-num { font-size: 10px; color: var(--fg-3); letter-spacing: 0.06em; }
        .wf-active .wf-num { color: var(--brand-blue-soft); }
        .wf-icon {
          width: 32px; height: 32px;
          display: flex; align-items: center; justify-content: center;
          background: rgba(255,255,255,0.05);
          border: 1px solid var(--line);
          border-radius: 8px;
        }
        .wf-active .wf-icon { background: var(--grad-brand); border-color: transparent; color: #fff; }
        .wf-node-text { display: flex; flex-direction: column; }
        .wf-node-label { font-weight: 500; font-size: 14px; }
        .wf-node-sub { font-size: 10px; color: var(--fg-3); letter-spacing: 0.04em; margin-top: 2px; }
        .wf-arrow { color: var(--brand-blue-soft); }

        .wf-panel {
          background: var(--bg-2);
          border: 1px solid var(--line);
          border-radius: 20px;
          padding: 28px;
          position: relative; overflow: hidden;
          min-height: 460px;
        }
        .wf-panel::before {
          content: "";
          position: absolute; top: -120px; right: -120px;
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(139,92,246,0.18), transparent 60%);
          pointer-events: none;
        }
        .wf-panel-head { display: flex; justify-content: space-between; align-items: flex-start; position: relative; }
        .wf-panel-icon {
          width: 44px; height: 44px; border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          background: var(--grad-brand); color: #fff;
          box-shadow: 0 0 30px -10px rgba(139,92,246,0.7);
        }
        .wf-cols {
          display: grid; grid-template-columns: 1fr 1fr; gap: 32px;
          margin-top: 32px;
          padding-top: 28px;
          border-top: 1px solid var(--line);
          position: relative;
        }
        .wf-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; }
        .wf-list li { display: flex; align-items: center; gap: 10px; font-size: 13.5px; color: var(--fg-1); }
        .wf-check {
          width: 18px; height: 18px;
          display: flex; align-items: center; justify-content: center;
          border-radius: 99px;
          background: rgba(75,107,255,0.18);
          color: var(--brand-blue-soft);
          flex-shrink: 0;
        }
        .wf-sample {
          background: var(--bg-1);
          border: 1px solid var(--line);
          border-radius: 12px;
          padding: 16px;
          font-family: var(--font-mono);
          font-size: 12px;
          display: flex; flex-direction: column; gap: 10px;
          min-height: 160px;
        }
        .wf-sample-line { display: flex; gap: 12px; align-items: flex-start; }
        .wf-cursor { color: var(--brand-blue-soft); animation: blink 1s steps(1) infinite; align-self: flex-start; }
        @keyframes blink { 50% { opacity: 0; } }
        @media (max-width: 900px) {
          .wf-wrap { grid-template-columns: 1fr; }
          .wf-cols { grid-template-columns: 1fr; gap: 20px; }
        }
      `}</style>
    </section>
  );
};

Object.assign(window, { Ecosystem, SystemsGrid, Workflow });

