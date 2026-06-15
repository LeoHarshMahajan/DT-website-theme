/* global React, Icon, Reveal, StatusPill */
const { useState, useEffect, useRef } = React;

/* ------------------------------------------------------------------
   PREMIUM CTA
------------------------------------------------------------------ */
const CTA = () => {
  return (
    <section id="contact">
      <div className="shell">
        <div className="cta-card">
          <div className="cta-glow" />
          <div className="cta-grid-bg" />
          <Reveal>
            <span className="eyebrow" style={{ position: "relative", zIndex: 2 }}>10 · Get started</span>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="h-section cta-title">Ready to scale on<br/><span className="grad-text">AI-powered infrastructure?</span></h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="lead cta-lead">Book a 30-minute growth consultation. We'll audit your funnel, ROAS, and content
              systems — and show you exactly what an AI-orchestrated stack would unlock.</p>
          </Reveal>
          <Reveal delay={240}>
            <div className="cta-row">
              <a href="#book" className="btn btn-primary">Book growth consultation <Icon name="arrow-right" size={14} className="btn-arrow" /></a>
              <a href="#audit" className="btn btn-ghost">Request free audit</a>
              <a href="#whatsapp" className="cta-wa">
                <Icon name="whatsapp" size={16} /> WhatsApp +91 · instant
              </a>
            </div>
          </Reveal>
          <Reveal delay={320}>
            <div className="cta-meta">
              <div className="cta-meta-item"><Icon name="check" size={13} /> 30-minute strategy call</div>
              <div className="cta-meta-item"><Icon name="check" size={13} /> Free audit deliverable</div>
              <div className="cta-meta-item"><Icon name="check" size={13} /> No pitch deck, no fluff</div>
            </div>
          </Reveal>
        </div>
      </div>

      <style>{`
        .cta-card {
          position: relative;
          background: var(--bg-1);
          border: 1px solid rgba(139,92,246,0.3);
          border-radius: var(--radius-xl);
          padding: clamp(48px, 7vw, 80px);
          overflow: hidden;
          text-align: center;
          display: flex; flex-direction: column; align-items: center;
        }
        .cta-glow {
          position: absolute; bottom: -200px; left: 50%; transform: translateX(-50%);
          width: 800px; height: 400px;
          background: radial-gradient(ellipse, rgba(139,92,246,0.35), rgba(75,107,255,0.18) 40%, transparent 70%);
          pointer-events: none;
        }
        .cta-grid-bg {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px);
          background-size: 48px 48px;
          mask-image: radial-gradient(ellipse 50% 50% at 50% 50%, #000 30%, transparent 80%);
          pointer-events: none;
        }
        .cta-title { position: relative; z-index: 2; max-width: 18ch; margin-top: 18px; margin-bottom: 20px; }
        .cta-lead { position: relative; z-index: 2; max-width: 60ch; margin-bottom: 28px; }
        .cta-row { position: relative; z-index: 2; display: flex; flex-wrap: wrap; gap: 12px; justify-content: center; align-items: center; margin-bottom: 24px; }
        .cta-wa {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 11px 16px; border-radius: 999px;
          font-size: 13px; color: #34d399;
          border: 1px solid rgba(52,211,153,0.3);
          background: rgba(52,211,153,0.06);
          transition: background .2s;
        }
        .cta-wa:hover { background: rgba(52,211,153,0.12); }
        .cta-meta { position: relative; z-index: 2; display: flex; gap: 24px; flex-wrap: wrap; justify-content: center; color: var(--fg-2); font-size: 13px; }
        .cta-meta-item { display: flex; align-items: center; gap: 6px; }
        .cta-meta-item :first-child { color: var(--brand-blue-soft); }
      `}</style>
    </section>
  );
};

/* ------------------------------------------------------------------
   FOOTER
------------------------------------------------------------------ */
const FOOTER_COLS = [
  { title: "Solutions", links: [
    "Organic Growth & SEO",
    "Performance Marketing",
    "Content & Social",
    "AI Marketing Systems",
    "Retention & Lifecycle",
    "Brand & Creative",
    "Analytics & Conversion",
  ]},
  { title: "Specialties", links: [
    "AEO · Answer Engine",
    "GEO · Generative Engine",
    "Programmatic SEO",
    "WhatsApp Commerce",
    "AI Systems",
    "Martech Stack",
    "Marketplace SEO",
  ]},
  { title: "Industries", links: [
    "D2C Brands",
    "Ecommerce",
    "SaaS & Startups",
    "Luxury & Lifestyle",
    "Fashion & Beauty",
    "Enterprise B2B",
    "All 12 industries →",
  ]},
  { title: "Company", links: [
    "About",
    "Case studies",
    "Insights",
    "Pricing",
    "Careers",
    "Contact",
    "Press kit",
  ]},
];

const Footer = () => {
  const [signup, setSignup] = useState("");
  const [done, setDone] = useState(false);
  return (
    <footer className="footer">
      <div className="shell">
        <div className="footer-top">
          <div className="footer-brand">
            <img src={`${window.DT_THEME_URL}/uploads/final_DT%20white.png`} alt="Digital Triangle" style={{ height: 32 }} />
            <p style={{ marginTop: 18, color: "var(--fg-2)", fontSize: 14, lineHeight: 1.55, maxWidth: "36ch" }}>
              AI-powered growth infrastructure for modern brands. Built with performance, automation,
              and intelligence at the core.
            </p>

            <form className="footer-form" onSubmit={(e) => { e.preventDefault(); setDone(true); }}>
              <input type="email" placeholder="your@email.com" required value={signup} onChange={(e) => setSignup(e.target.value)} />
              <button className="btn btn-primary" type="submit" style={{ padding: "8px 12px", fontSize: 12 }}>
                {done ? "Subscribed ✓" : <>Subscribe <Icon name="arrow-right" size={12} className="btn-arrow" /></>}
              </button>
            </form>
            <div style={{ color: "var(--fg-3)", fontSize: 11, marginTop: 8 }}>The Growth Brief — weekly. AI, performance, D2C.</div>
          </div>

          <div className="footer-cols">
            {FOOTER_COLS.map((c) => (
              <div key={c.title} className="footer-col">
                <div className="footer-col-title mono">{c.title}</div>
                <ul>
                  {c.links.map((l) => <li key={l}><a href="#">{l}</a></li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="footer-divider" />

        <div className="footer-bot">
          <div className="footer-meta">
            <span>© 2026 Digital Triangle. All rights reserved.</span>
            <span>·</span>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Security</a>
          </div>
          <div className="footer-social">
            <a href="#" aria-label="LinkedIn"><Icon name="arrow-up-right" size={13} /> LinkedIn</a>
            <a href="#" aria-label="Instagram"><Icon name="arrow-up-right" size={13} /> Instagram</a>
            <a href="#" aria-label="YouTube"><Icon name="arrow-up-right" size={13} /> YouTube</a>
            <a href="#" aria-label="X"><Icon name="arrow-up-right" size={13} /> X</a>
          </div>
        </div>

        <div className="footer-mark">
          <div className="footer-mark-text">DIGITAL · TRIANGLE</div>
        </div>
      </div>

      <style>{`
        .footer {
          background: var(--bg-1);
          border-top: 1px solid var(--line);
          padding: 80px 0 0;
          position: relative;
          overflow: hidden;
        }
        .footer-top {
          display: grid;
          grid-template-columns: 1.1fr 2.5fr;
          gap: 64px;
          padding-bottom: 56px;
        }
        .footer-form {
          display: flex; gap: 8px;
          margin-top: 24px;
          padding: 6px;
          background: var(--bg-2);
          border: 1px solid var(--line);
          border-radius: 999px;
          max-width: 360px;
        }
        .footer-form input {
          flex: 1;
          background: transparent;
          border: 0; outline: 0;
          padding: 0 12px;
          font-size: 13px;
          color: var(--fg-0);
        }
        .footer-form input::placeholder { color: var(--fg-3); }
        .footer-cols {
          display: grid; grid-template-columns: repeat(4, 1fr); gap: 32px;
        }
        .footer-col-title {
          font-size: 11px;
          color: var(--fg-3);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 16px;
        }
        .footer-col ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; }
        .footer-col a { color: var(--fg-1); font-size: 13.5px; transition: color .15s; }
        .footer-col a:hover { color: var(--fg-0); }
        .footer-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--line-strong) 30%, var(--line-strong) 70%, transparent);
        }
        .footer-bot {
          display: flex; justify-content: space-between; align-items: center;
          padding: 24px 0;
          flex-wrap: wrap; gap: 16px;
        }
        .footer-meta, .footer-social {
          display: flex; gap: 16px;
          font-size: 12px; color: var(--fg-3);
        }
        .footer-social a { display: inline-flex; align-items: center; gap: 4px; color: var(--fg-1); }
        .footer-social a:hover { color: var(--fg-0); }

        .footer-mark {
          position: relative;
          overflow: hidden;
          padding: 8px 0 0;
          -webkit-mask-image: linear-gradient(180deg, #000 0%, #000 60%, transparent 100%);
          mask-image: linear-gradient(180deg, #000 0%, #000 60%, transparent 100%);
        }
        .footer-mark-text {
          font-size: clamp(60px, 16vw, 240px);
          font-weight: 500;
          letter-spacing: -0.05em;
          line-height: 0.9;
          background: linear-gradient(180deg, rgba(255,255,255,0.06), transparent 80%);
          -webkit-background-clip: text; background-clip: text;
          color: transparent;
          text-align: center;
          font-family: var(--font-sans);
        }
        @media (max-width: 1024px) {
          .footer-top { grid-template-columns: 1fr; gap: 40px; }
          .footer-cols { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .footer { padding-top: 56px; }
          .footer-cols { grid-template-columns: repeat(2, 1fr); gap: 28px 20px; }
          .footer-bot { flex-direction: column; align-items: flex-start; }
          .footer-meta, .footer-social { flex-wrap: wrap; }
        }
      `}</style>
    </footer>
  );
};

Object.assign(window, { CTA, Footer });

