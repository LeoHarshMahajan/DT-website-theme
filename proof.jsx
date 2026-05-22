/* global React, Icon, Reveal, StatusPill, AnimatedNumber, useInView */
const { useState, useEffect, useRef } = React;

/* ------------------------------------------------------------------
   METRICS / RESULTS bar
------------------------------------------------------------------ */
const Metrics = () => {
  const [ref, inView] = useInView();
  const items = [
    { v: 312, suf: "%", k: "Avg organic traffic growth" },
    { v: 4.8, suf: "×", k: "Blended ROAS across portfolio", dec: 1 },
    { v: 38, suf: "%", k: "Avg repeat-rate lift" },
    { v: 120, suf: "hr", k: "Saved per brand per month" },
    { v: 62, suf: "%", k: "Avg conversion-rate lift" },
  ];
  return (
    <section style={{ padding: "80px 0", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }} ref={ref}>
      <div className="shell">
        <div className="metrics-head">
          <span className="eyebrow">05 · Results</span>
          <h2 className="h-section" style={{ maxWidth: 16 + "ch" }}>The numbers that <span className="grad-text">actually move the business.</span></h2>
        </div>
        <div className="metrics-grid">
          {items.map((it, i) => (
            <div className="metric" key={i}>
              <div className="metric-val">
                <AnimatedNumber to={it.v} duration={1800} suffix={it.suf} decimals={it.dec || 0} start={inView} />
              </div>
              <div className="metric-k">{it.k}</div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .metrics-head { display: flex; align-items: flex-end; justify-content: space-between; gap: 24px; margin-bottom: 56px; flex-wrap: wrap; }
        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 0;
          border-top: 1px solid var(--line);
        }
        .metric {
          padding: 32px 24px;
          border-right: 1px solid var(--line);
          display: flex; flex-direction: column; gap: 10px;
        }
        .metric:last-child { border-right: 0; }
        .metric-val {
          font-size: clamp(36px, 5vw, 64px);
          font-weight: 500;
          letter-spacing: -0.03em;
          line-height: 1;
          background: linear-gradient(135deg, var(--fg-0), var(--fg-2));
          -webkit-background-clip: text; background-clip: text;
          color: transparent;
        }
        .metric:nth-child(1) .metric-val,
        .metric:nth-child(3) .metric-val { background: var(--grad-brand); -webkit-background-clip: text; background-clip: text; color: transparent; }
        .metric-k { font-size: 13px; color: var(--fg-2); }
        @media (max-width: 900px) {
          .metrics-grid { grid-template-columns: repeat(2, 1fr); }
          .metric { border-bottom: 1px solid var(--line); }
          .metric:nth-child(2n) { border-right: 0; }
        }
      `}</style>
    </section>
  );
};

/* ------------------------------------------------------------------
   CASE STUDIES — Portronics, Kajaria, Ofis Square
------------------------------------------------------------------ */
const CASES = [
  {
    id: "portronics",
    brand: "Portronics",
    category: "Consumer Tech · D2C",
    headline: "Re-engineered performance growth across Meta, Google, Amazon — and built an AI creative engine.",
    blurb: "Replaced fragmented agency stack with a unified AI-orchestrated growth system. 14 ad variants per launch, server-side tracking, and a creative model that learns from every result.",
    metrics: [
      { v: "+4.2×", k: "Blended ROAS" },
      { v: "−41%", k: "CAC" },
      { v: "2.8×", k: "Revenue, 6 mo" },
    ],
    tags: ["Performance", "AI Creative", "Marketplace", "Amazon SEO"],
    accent: "blue",
  },
  {
    id: "kajaria",
    brand: "Kajaria",
    category: "Building Materials · Enterprise",
    headline: "Engineered an AEO + programmatic-SEO machine for Asia's largest tile maker.",
    blurb: "Built a 12,000-page programmatic SEO architecture mapped to dealer geographies and product categories. Optimized for AI answer engines (ChatGPT, Perplexity) — not just Google.",
    metrics: [
      { v: "+318%", k: "Organic sessions" },
      { v: "Rank 1", k: "On 1,840 keywords" },
      { v: "+82%", k: "Dealer leads" },
    ],
    tags: ["Enterprise SEO", "AEO / GEO", "Programmatic", "Local"],
    accent: "violet",
  },
  {
    id: "ofis",
    brand: "Ofis Square",
    category: "Coworking · B2B",
    headline: "Built a lifecycle + WhatsApp commerce engine that doubled tour bookings.",
    blurb: "Replaced a fragmented funnel with a single AI-orchestrated lifecycle: WhatsApp-first lead nurture, CRM workflows, and a CRO sprint on the booking flow.",
    metrics: [
      { v: "2.1×", k: "Tour bookings" },
      { v: "+58%", k: "Booking-to-close" },
      { v: "−34%", k: "Cost per lead" },
    ],
    tags: ["Lifecycle", "WhatsApp", "CRO", "B2B Funnel"],
    accent: "magenta",
  },
];

const CaseStudies = () => {
  const [active, setActive] = useState(0);
  const c = CASES[active];
  return (
    <section id="cases">
      <div className="shell">
        <div className="section-head" style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", maxWidth: "100%", flexWrap: "wrap", gap: 24 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 720 }}>
            <span className="eyebrow">06 · Case studies</span>
            <h2 className="h-section">Real brands.<br/><span className="text-fg-2">Real growth math.</span></h2>
          </div>
          <a href="#cases" className="btn btn-ghost">All case studies <Icon name="arrow-right" size={14} className="btn-arrow" /></a>
        </div>

        <div className="case-tabs">
          {CASES.map((cc, i) => (
            <button key={cc.id} className={`case-tab ${active === i ? "case-tab-active" : ""}`} onClick={() => setActive(i)}>
              <span className="mono case-tab-num">{String(i + 1).padStart(2, "0")}</span>
              <span className="case-tab-brand">{cc.brand}</span>
              <span className="case-tab-cat">{cc.category}</span>
            </button>
          ))}
        </div>

        <Reveal key={c.id}>
          <div className={`case-card case-accent-${c.accent}`}>
            <div className="case-left">
              <StatusPill tone={c.accent}>{c.category}</StatusPill>
              <h3 className="case-headline">{c.headline}</h3>
              <p className="case-blurb">{c.blurb}</p>
              <div className="case-tags">
                {c.tags.map((t) => <span className="chip" key={t}>{t}</span>)}
              </div>
              <a href={`#case-${c.id}`} className="btn btn-ghost" style={{ alignSelf: "flex-start", marginTop: 8 }}>
                Read full case <Icon name="arrow-right" size={14} className="btn-arrow" />
              </a>
            </div>
            <div className="case-right">
              <CaseDashboard caseData={c} />
            </div>
          </div>
        </Reveal>
      </div>

      <style>{`
        .case-tabs {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0;
          border-top: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
          margin-bottom: 32px;
        }
        .case-tab {
          display: flex; flex-direction: column; gap: 6px;
          align-items: flex-start;
          padding: 22px 24px;
          border-right: 1px solid var(--line);
          text-align: left;
          color: var(--fg-2);
          transition: background .2s ease, color .2s ease;
          position: relative;
        }
        .case-tab:last-child { border-right: 0; }
        .case-tab:hover { background: rgba(255,255,255,0.02); }
        .case-tab-active { color: var(--fg-0); background: rgba(255,255,255,0.03); }
        .case-tab-active::after {
          content: "";
          position: absolute; left: 0; right: 0; top: -1px; height: 2px;
          background: var(--grad-brand);
        }
        .case-tab-num { font-size: 10px; color: var(--fg-3); letter-spacing: 0.1em; }
        .case-tab-brand { font-size: 20px; font-weight: 500; letter-spacing: -0.02em; color: inherit; }
        .case-tab-cat { font-size: 12px; color: var(--fg-2); }

        .case-card {
          display: grid; grid-template-columns: 0.95fr 1.05fr;
          gap: 0;
          background: var(--bg-1);
          border: 1px solid var(--line);
          border-radius: var(--radius-xl);
          overflow: hidden;
          position: relative;
        }
        .case-card::before {
          content: "";
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(75,107,255,0.08), transparent 50%);
          pointer-events: none;
        }
        .case-accent-violet::before { background: linear-gradient(135deg, rgba(139,92,246,0.10), transparent 50%); }
        .case-accent-magenta::before { background: linear-gradient(135deg, rgba(192,38,211,0.10), transparent 50%); }

        .case-left { padding: 40px; display: flex; flex-direction: column; gap: 20px; position: relative; }
        .case-headline { font-size: clamp(24px, 2.6vw, 34px); font-weight: 500; letter-spacing: -0.025em; line-height: 1.15; }
        .case-blurb { color: var(--fg-2); font-size: 14.5px; line-height: 1.6; }
        .case-tags { display: flex; flex-wrap: wrap; gap: 6px; }
        .case-right {
          padding: 32px;
          background:
            linear-gradient(180deg, rgba(255,255,255,0.02), transparent),
            radial-gradient(circle at 80% 20%, rgba(139,92,246,0.10), transparent 50%);
          border-left: 1px solid var(--line);
          display: flex; align-items: center;
        }
        @media (max-width: 900px) {
          .case-tabs { grid-template-columns: 1fr; }
          .case-tab { border-right: 0; border-bottom: 1px solid var(--line); }
          .case-tab-active::after { display: none; }
          .case-tab-active::before { content: ""; position: absolute; top:0; bottom:0; left: 0; width: 2px; background: var(--grad-brand); }
          .case-card { grid-template-columns: 1fr; }
          .case-right { border-left: 0; border-top: 1px solid var(--line); }
        }
        @media (max-width: 640px) {
          .case-left { padding: 24px; }
          .case-right { padding: 20px; }
          .case-headline { font-size: 22px; }
          .case-dash-metrics { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
};

/* Mini dashboard inside case card */
const CaseDashboard = ({ caseData }) => {
  const bars = useRefBars(caseData.id);
  return (
    <div className="case-dash">
      <div className="case-dash-head">
        <div>
          <div className="mono" style={{ fontSize: 10, color: "var(--fg-3)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{caseData.brand} · Before vs After</div>
          <div style={{ fontSize: 14, fontWeight: 500, marginTop: 4 }}>Last 6 months</div>
        </div>
        <StatusPill tone="green">Live</StatusPill>
      </div>
      <div className="case-dash-metrics">
        {caseData.metrics.map((m, i) => (
          <div key={i} className="case-dash-m">
            <div className="case-dash-v grad-text">{m.v}</div>
            <div className="case-dash-k">{m.k}</div>
          </div>
        ))}
      </div>
      <div className="case-dash-chart">
        <svg viewBox="0 0 320 120" preserveAspectRatio="none" style={{ width: "100%", height: 120 }}>
          <defs>
            <linearGradient id={`bar-${caseData.id}`} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="var(--brand-blue)" />
              <stop offset="1" stopColor="var(--brand-magenta)" />
            </linearGradient>
          </defs>
          {[0, 30, 60, 90].map((y) => <line key={y} x1="0" x2="320" y1={y} y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />)}
          {bars.map((h, i) => (
            <rect key={i} x={i * 14 + 4} y={120 - h} width="8" height={h} rx="2" fill={i > 14 ? `url(#bar-${caseData.id})` : "rgba(255,255,255,0.12)"}>
              <animate attributeName="height" from="0" to={h} dur="0.8s" fill="freeze" />
              <animate attributeName="y" from="120" to={120 - h} dur="0.8s" fill="freeze" />
            </rect>
          ))}
        </svg>
        <div className="case-dash-legend">
          <span><span style={{ width: 8, height: 2, background: "rgba(255,255,255,0.3)", display: "inline-block", marginRight: 6 }} />Before DT</span>
          <span><span style={{ width: 8, height: 2, background: "var(--grad-brand)", display: "inline-block", marginRight: 6 }} />After DT</span>
        </div>
      </div>
      <style>{`
        .case-dash {
          width: 100%;
          background: var(--bg-2);
          border: 1px solid var(--line);
          border-radius: var(--radius-lg);
          padding: 24px;
          display: flex; flex-direction: column; gap: 20px;
          box-shadow: 0 30px 60px -20px rgba(0,0,0,0.6);
        }
        .case-dash-head { display: flex; justify-content: space-between; align-items: flex-start; padding-bottom: 14px; border-bottom: 1px solid var(--line); }
        .case-dash-metrics { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .case-dash-m { padding: 14px; background: var(--bg-1); border: 1px solid var(--line); border-radius: 12px; }
        .case-dash-v { font-size: clamp(22px, 2.4vw, 28px); font-weight: 500; letter-spacing: -0.02em; line-height: 1; }
        .case-dash-k { font-size: 11px; color: var(--fg-2); margin-top: 6px; }
        .case-dash-chart { background: var(--bg-1); border: 1px solid var(--line); border-radius: 12px; padding: 14px; }
        .case-dash-legend { display: flex; gap: 16px; margin-top: 8px; font-size: 10px; color: var(--fg-2); font-family: var(--font-mono); }
      `}</style>
    </div>
  );
};

const useRefBars = (seed) => {
  return React.useMemo(() => {
    let s = 0;
    for (let i = 0; i < seed.length; i++) s += seed.charCodeAt(i);
    const rand = () => {
      s = (s * 9301 + 49297) % 233280;
      return s / 233280;
    };
    return Array.from({ length: 22 }, (_, i) => {
      const base = i < 14 ? 20 + rand() * 14 : 30 + (i - 14) * 8 + rand() * 14;
      return Math.min(110, base);
    });
  }, [seed]);
};

/* ------------------------------------------------------------------
   INDUSTRIES — 6 featured + link to all
------------------------------------------------------------------ */
const INDUSTRIES = [
  { id: "d2c", label: "D2C Brands", desc: "Founder-led brands scaling from ₹1Cr to ₹100Cr.", icon: "bolt" },
  { id: "ecom", label: "Ecommerce", desc: "Shopify, custom, marketplaces.", icon: "layers" },
  { id: "saas", label: "SaaS & Startups", desc: "Product-led growth + paid acquisition.", icon: "code" },
  { id: "luxury", label: "Luxury & Lifestyle", desc: "Premium brands across India, GCC, EU.", icon: "sparkles" },
  { id: "fashion", label: "Fashion & Beauty", desc: "Reels-first attention + retention systems.", icon: "wand" },
  { id: "b2b", label: "Enterprise B2B", desc: "Long-cycle pipelines, AEO, ABM.", icon: "shield" },
];

const Industries = () => {
  return (
    <section id="industries" style={{ background: "var(--bg-1)" }}>
      <div className="shell">
        <div className="section-head">
          <span className="eyebrow">07 · Industries we power</span>
          <h2 className="h-section">Built for modern<br/><span className="text-fg-2">commerce categories.</span></h2>
          <p className="lead">We work deepest with D2C, ecommerce, founder-led brands, and modern B2B —
          where speed, AI leverage, and unit economics matter most.</p>
        </div>

        <div className="ind-grid">
          {INDUSTRIES.map((ind, i) => (
            <Reveal key={ind.id} delay={i * 50}>
              <a href={`#${ind.id}`} className="ind-card card card-hover">
                <span className="ind-icon"><Icon name={ind.icon} size={18} /></span>
                <div>
                  <div className="ind-label">{ind.label}</div>
                  <div className="ind-desc">{ind.desc}</div>
                </div>
                <Icon name="arrow-up-right" size={16} />
              </a>
            </Reveal>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 40 }}>
          <a href="#industries" className="btn btn-ghost">See all 12 industries <Icon name="arrow-right" size={14} className="btn-arrow" /></a>
        </div>
      </div>

      <style>{`
        .ind-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px;
        }
        .ind-card {
          padding: 22px; display: flex; align-items: center; gap: 16px;
          color: var(--fg-0);
          background: var(--bg-2);
        }
        .ind-card:hover { background: var(--bg-3); transform: translateY(-1px); }
        .ind-icon {
          width: 40px; height: 40px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          background: rgba(255,255,255,0.05);
          border: 1px solid var(--line);
          border-radius: 10px;
        }
        .ind-card:hover .ind-icon { background: var(--grad-brand); border-color: transparent; color: #fff; }
        .ind-label { font-size: 16px; font-weight: 500; letter-spacing: -0.015em; }
        .ind-desc { font-size: 12.5px; color: var(--fg-2); margin-top: 2px; }
        @media (max-width: 900px) { .ind-grid { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  );
};

/* ------------------------------------------------------------------
   TESTIMONIALS
------------------------------------------------------------------ */
const TESTIMONIALS = [
  {
    q: "Within 90 days they replaced three agencies and a dashboard our team hated. The AI workflow alone saves us a full headcount.",
    name: "VP Marketing",
    co: "Consumer Tech · D2C",
  },
  {
    q: "They don't sell services — they sell systems. Our ROAS hasn't moved below 4× in eight months, and we finally know why.",
    name: "Founder",
    co: "Fashion · Premium D2C",
  },
  {
    q: "The AEO play was the unlock. We started showing up in ChatGPT answers and our pipeline doubled without spending more.",
    name: "Growth Lead",
    co: "B2B SaaS",
  },
];

const Testimonials = () => {
  return (
    <section>
      <div className="shell">
        <div className="section-head">
          <span className="eyebrow">08 · What founders say</span>
          <h2 className="h-section">Less agency talk.<br/><span className="text-fg-2">More business math.</span></h2>
        </div>

        <div className="t-grid">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={i} delay={i * 80}>
              <figure className={`t-card card ${i === 0 ? "t-feat" : ""}`}>
                <svg width="22" height="18" viewBox="0 0 22 18" style={{ color: "var(--brand-violet)", opacity: 0.7 }}><path fill="currentColor" d="M0 18V8.4Q0 4.8 1.9 2.8T7.4 0v3.6q-1.8 0-2.8 1T3.6 7.6h3.8V18zm12.4 0V8.4q0-3.6 1.9-5.6T19.8 0v3.6q-1.8 0-2.8 1t-1 3h3.8V18z"/></svg>
                <blockquote>{t.q}</blockquote>
                <figcaption>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div className="t-avatar" />
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 500 }}>{t.name}</div>
                      <div style={{ fontSize: 12, color: "var(--fg-2)" }}>{t.co}</div>
                    </div>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
      <style>{`
        .t-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .t-card {
          padding: 28px;
          display: flex; flex-direction: column; gap: 18px;
          background: var(--bg-1);
          min-height: 280px;
        }
        .t-feat { background: linear-gradient(135deg, rgba(75,107,255,0.08), rgba(192,38,211,0.06)); border-color: rgba(139,92,246,0.2); }
        .t-card blockquote { margin: 0; font-size: 17px; line-height: 1.45; letter-spacing: -0.012em; color: var(--fg-0); flex: 1; }
        .t-avatar {
          width: 36px; height: 36px; border-radius: 99px;
          background: var(--grad-brand);
          border: 2px solid var(--bg-1);
        }
        @media (max-width: 900px) { .t-grid { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  );
};

/* ------------------------------------------------------------------
   PRICING — Packages vs Enterprise toggle
------------------------------------------------------------------ */
const PACKAGES = [
  {
    name: "Launch",
    desc: "For early-stage brands building their first AI growth stack.",
    price: "₹1.2L",
    suffix: "/mo",
    features: ["1 core system (SEO or Performance)", "AI research + creative systems", "Bi-weekly strategy sessions", "GA4 + GTM + basic dashboards", "WhatsApp channel + automation"],
    cta: "Start with Launch",
  },
  {
    name: "Scale",
    desc: "For brands scaling past ₹5Cr ARR — needs the full engine.",
    price: "₹3.4L",
    suffix: "/mo",
    features: ["Up to 4 systems orchestrated", "Full AI system suite (6 systems)", "Weekly performance war-room", "Attribution + cohort dashboards", "Dedicated creative pod (14 ads/mo)", "Lifecycle + WhatsApp commerce"],
    cta: "Choose Scale",
    featured: true,
  },
  {
    name: "Compound",
    desc: "For category leaders running on AI-orchestrated growth.",
    price: "₹6.8L",
    suffix: "/mo",
    features: ["All 7 systems · always-on", "Custom AI systems + martech build", "Embedded growth strategist", "Programmatic SEO + AEO + GEO", "On-call creative + motion team", "Quarterly board-grade reporting"],
    cta: "Talk to us",
  },
];

const Pricing = () => {
  const [mode, setMode] = useState("packages");
  return (
    <section id="pricing">
      <div className="shell">
        <div className="section-head">
          <span className="eyebrow">09 · Pricing</span>
          <h2 className="h-section">Choose the engine,<br/><span className="text-fg-2">not the deliverable.</span></h2>
          <p className="lead">Three productized packages for D2C and emerging brands. Custom enterprise engagements for category leaders and global brands.</p>
        </div>

        <div className="price-switch">
          <button className={mode === "packages" ? "ps-active" : ""} onClick={() => setMode("packages")}>Growth packages</button>
          <button className={mode === "enterprise" ? "ps-active" : ""} onClick={() => setMode("enterprise")}>Enterprise</button>
        </div>

        {mode === "packages" ? (
          <div className="price-grid">
            {PACKAGES.map((p) => (
              <div key={p.name} className={`price-card card ${p.featured ? "price-feat" : ""}`}>
                {p.featured && <span className="price-badge">Most chosen</span>}
                <div className="price-head">
                  <div className="price-name">{p.name}</div>
                  <p className="price-desc">{p.desc}</p>
                </div>
                <div className="price-num">
                  <span className="grad-text" style={{ fontSize: 42, fontWeight: 500, letterSpacing: "-0.03em" }}>{p.price}</span>
                  <span style={{ color: "var(--fg-2)", marginLeft: 4 }}>{p.suffix}</span>
                </div>
                <a href="#contact" className={`btn ${p.featured ? "btn-grad" : "btn-ghost"}`} style={{ width: "100%", justifyContent: "center" }}>{p.cta}</a>
                <ul className="price-feats">
                  {p.features.map((f) => (
                    <li key={f}><span className="price-check"><Icon name="check" size={11} /></span>{f}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <div className="enterprise card">
            <div className="enterprise-left">
              <span className="chip"><Icon name="sparkles" size={11} /> Custom</span>
              <h3 style={{ fontSize: 32, letterSpacing: "-0.02em", fontWeight: 500 }}>Enterprise growth engagements</h3>
              <p style={{ color: "var(--fg-1)", fontSize: 15, lineHeight: 1.6 }}>For category leaders, global brands, and PE-backed portfolios. We build dedicated AI growth pods, custom martech, and embedded strategist teams.</p>
              <a href="#contact" className="btn btn-grad" style={{ alignSelf: "flex-start" }}>Talk to leadership <Icon name="arrow-right" size={14} className="btn-arrow" /></a>
            </div>
            <ul className="enterprise-list">
              {[
                "Dedicated 8–14 person growth pod",
                "Custom AI systems wired into your stack",
                "Strategist embedded with your CMO",
                "Programmatic SEO + AEO + GEO at scale",
                "Multi-market: India · GCC · US · UK",
                "Quarterly board reporting + roadmaps",
              ].map((f) => (
                <li key={f}><span className="price-check"><Icon name="check" size={11} /></span>{f}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <style>{`
        .price-switch {
          display: inline-flex;
          padding: 4px;
          background: var(--bg-2);
          border: 1px solid var(--line);
          border-radius: 999px;
          margin-bottom: 48px;
        }
        .price-switch button {
          padding: 9px 20px;
          font-size: 13px;
          color: var(--fg-2);
          border-radius: 999px;
          transition: all .2s;
        }
        .ps-active { background: var(--fg-0); color: var(--bg-0) !important; }

        .price-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;
        }
        .price-card {
          padding: 32px;
          display: flex; flex-direction: column; gap: 20px;
          background: var(--bg-1);
          position: relative;
        }
        .price-feat {
          background: linear-gradient(180deg, rgba(75,107,255,0.08), rgba(192,38,211,0.05) 80%, transparent);
          border-color: rgba(139,92,246,0.3);
          box-shadow: 0 0 60px -20px rgba(139,92,246,0.4);
        }
        .price-badge {
          position: absolute; top: -10px; right: 24px;
          background: var(--grad-brand);
          color: #fff;
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.06em;
          padding: 4px 10px;
          border-radius: 99px;
        }
        .price-name { font-size: 22px; font-weight: 500; letter-spacing: -0.02em; }
        .price-desc { font-size: 13.5px; color: var(--fg-2); margin: 4px 0 0; }
        .price-num { padding: 16px 0; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); display: flex; align-items: baseline; }
        .price-feats { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; }
        .price-feats li { display: flex; gap: 10px; align-items: flex-start; font-size: 13.5px; color: var(--fg-1); }
        .price-check {
          width: 18px; height: 18px;
          display: flex; align-items: center; justify-content: center;
          border-radius: 99px;
          background: rgba(75,107,255,0.18);
          color: var(--brand-blue-soft);
          flex-shrink: 0;
          margin-top: 1px;
        }
        .enterprise {
          display: grid; grid-template-columns: 1fr 1fr; gap: 32px;
          padding: 40px;
          background: linear-gradient(135deg, rgba(75,107,255,0.06), rgba(192,38,211,0.05));
          border-color: rgba(139,92,246,0.25);
        }
        .enterprise-left { display: flex; flex-direction: column; gap: 16px; align-items: flex-start; }
        .enterprise-list { list-style: none; padding: 0; margin: 0; display: grid; gap: 12px; }
        .enterprise-list li { display: flex; gap: 10px; align-items: flex-start; font-size: 14px; color: var(--fg-1); }
        @media (max-width: 1024px) { .price-grid { grid-template-columns: 1fr; } .enterprise { grid-template-columns: 1fr; } }
        @media (max-width: 640px) {
          .price-card { padding: 24px; }
          .enterprise { padding: 28px; gap: 20px; }
          .price-switch button { padding: 8px 14px; font-size: 12px; }
        }
      `}</style>
    </section>
  );
};

Object.assign(window, { Metrics, CaseStudies, Industries, Testimonials, Pricing });

