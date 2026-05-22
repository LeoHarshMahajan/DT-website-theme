/* global React, Icon, Reveal, StatusPill */
const { useState, useEffect, useRef } = React;

/* ------------------------------------------------------------------
   NAV — sticky top, with mega-menu Solutions dropdown
------------------------------------------------------------------ */
const SOLUTIONS_MENU = [
  {
    title: "Organic Growth",
    eyebrow: "SEO / AEO / GEO",
    desc: "Win search, answer engines, and AI-driven discovery.",
    items: ["Shopify SEO", "Ecommerce SEO", "Technical SEO", "AEO (Answer Engine)", "GEO (Generative Engine)", "Programmatic SEO"],
    icon: "search",
  },
  {
    title: "Performance Growth",
    eyebrow: "Paid acquisition",
    desc: "Meta, Google, YouTube, Amazon — built for ROAS.",
    items: ["Meta Ads", "Google Ads", "YouTube Ads", "Performance Creative", "Funnel Optimization", "CAC Optimization"],
    icon: "target",
  },
  {
    title: "Content & Social",
    eyebrow: "Attention systems",
    desc: "Reels, founder branding, viral content, UGC.",
    items: ["Instagram Management", "LinkedIn Growth", "Founder Branding", "Reels Strategy", "Influencer Marketing", "Short-form Video"],
    icon: "play",
  },
  {
    title: "AI & Automation",
    eyebrow: "AI marketing systems",
    desc: "AI systems, LLMs, workflows, and martech stack consulting.",
    items: ["AI Workflow Automation", "AI Content Systems", "AI Systems For Marketing", "AI Analytics", "Chatbot Systems", "Martech Stack"],
    icon: "brain",
    featured: true,
  },
  {
    title: "Retention & Lifecycle",
    eyebrow: "Repeat revenue",
    desc: "WhatsApp, CRM workflows, lifecycle automation.",
    items: ["WhatsApp Automation", "WhatsApp Commerce", "CRM Workflows", "Email & SMS", "Cart Recovery", "Loyalty Systems"],
    icon: "chat",
  },
  {
    title: "Brand & Creative",
    eyebrow: "Identity that converts",
    desc: "Brand systems, ad creative, UI/UX, video.",
    items: ["Brand Strategy", "Brand Identity", "Ad Creative Systems", "UI/UX Design", "Landing Pages", "Video Production"],
    icon: "wand",
  },
  {
    title: "Analytics & Conversion",
    eyebrow: "Data → decisions",
    desc: "GA4, attribution, dashboards, CRO.",
    items: ["CRO", "GA4 / GTM", "Attribution Systems", "Dashboard Systems", "Funnel Analytics", "Revenue Tracking"],
    icon: "chart",
  },
];

const NAV_ITEMS = [
  { label: "Solutions", hasMenu: true },
  { label: "Industries", href: "#industries" },
  { label: "Case Studies", href: "#cases" },
  { label: "Insights", href: "#insights" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
];

const ThemeToggle = ({ theme, onToggle }) => (
  <button className="theme-toggle" onClick={onToggle} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`} title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}>
    <span className={`theme-knob ${theme === "light" ? "theme-knob-right" : ""}`}>
      <Icon name={theme === "dark" ? "moon" : "sun"} size={11} />
    </span>
    <span className="theme-track-icon theme-track-left"><Icon name="moon" size={11} /></span>
    <span className="theme-track-icon theme-track-right"><Icon name="sun" size={11} /></span>
  </button>
);

const Nav = ({ theme, onToggleTheme }) => {
  const [open, setOpen] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openMenu = () => {
    clearTimeout(timeoutRef.current);
    setOpen(true);
  };
  const closeMenu = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 120);
  };

  return (
    <header className={`nav ${scrolled ? "nav-scrolled" : ""}`}>
      <div className="nav-inner shell">
        <a href="#top" className="nav-brand" aria-label="Digital Triangle home">
          <img src={`${window.DT_THEME_URL}/assets/logo.png`} alt="Digital Triangle" />
        </a>

        <nav className="nav-links" aria-label="Primary">
          {NAV_ITEMS.map((item) =>
            item.hasMenu ? (
              <div
                key={item.label}
                className="nav-link-wrap"
                onMouseEnter={openMenu}
                onMouseLeave={closeMenu}
              >
                <button className={`nav-link ${open ? "nav-link-active" : ""}`} aria-expanded={open}>
                  {item.label}
                  <Icon name="chevron-down" size={14} />
                </button>
                {open && (
                  <div className="mega-menu" onMouseEnter={openMenu} onMouseLeave={closeMenu}>
                    <div className="mega-inner">
                      <div className="mega-grid">
                        {SOLUTIONS_MENU.map((s) => (
                          <a key={s.title} href="#systems" className={`mega-card ${s.featured ? "mega-featured" : ""}`}>
                            <div className="mega-card-head">
                              <span className="mega-icon"><Icon name={s.icon} size={16} /></span>
                              <div>
                                <div className="mono" style={{ fontSize: 10, color: "var(--fg-3)", letterSpacing: "0.12em", textTransform: "uppercase" }}>{s.eyebrow}</div>
                                <div style={{ fontWeight: 500, fontSize: 14, color: "var(--fg-0)" }}>{s.title}</div>
                              </div>
                            </div>
                            <div style={{ fontSize: 12, color: "var(--fg-2)", marginTop: 6, marginBottom: 10 }}>{s.desc}</div>
                            <ul className="mega-list">
                              {s.items.slice(0, 4).map((it) => <li key={it}>{it}</li>)}
                            </ul>
                          </a>
                        ))}
                      </div>
                      <div className="mega-foot">
                        <div className="flex gap-3 items-center">
                          <Icon name="sparkles" size={14} />
                          <span style={{ fontSize: 13, color: "var(--fg-1)" }}>Not sure where to start? Get a free growth audit.</span>
                        </div>
                        <a href="#contact" className="btn btn-ghost" style={{ padding: "8px 14px", fontSize: 13 }}>
                          Book audit <Icon name="arrow-right" size={14} className="btn-arrow" />
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <a key={item.label} href={item.href} className="nav-link">{item.label}</a>
            )
          )}
        </nav>

        <div className="nav-cta">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <a href="#contact" className="nav-link nav-signin" style={{ fontSize: 13 }}>Sign in</a>
          <a href="#contact" className="btn btn-primary nav-book" style={{ padding: "9px 16px", fontSize: 13 }}>
            Book consultation <Icon name="arrow-right" size={13} className="btn-arrow" />
          </a>
        </div>

        <div className="nav-mobile-right">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <button className="nav-burger" onClick={() => setMobile(true)} aria-label="Open menu">
            <Icon name="menu" size={20} />
          </button>
        </div>
      </div>

      {mobile && (
        <div className="mobile-menu">
          <div className="mobile-head shell">
            <img src={`${window.DT_THEME_URL}/assets/logo.png`} alt="Digital Triangle" style={{ height: 28 }} />
            <button onClick={() => setMobile(false)} aria-label="Close"><Icon name="x" size={22} /></button>
          </div>
          <div className="mobile-body shell">
            {NAV_ITEMS.map((it) => <a key={it.label} className="mobile-link" href={it.href || "#systems"} onClick={() => setMobile(false)}>{it.label}<Icon name="chevron-right" size={16} /></a>)}
            <a className="btn btn-primary" href="#contact" style={{ marginTop: 24, justifyContent: "center" }} onClick={() => setMobile(false)}>
              Book consultation <Icon name="arrow-right" size={14} />
            </a>
          </div>
        </div>
      )}

      <style>{`
        .nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          transition: background .3s ease, backdrop-filter .3s ease, border-color .3s ease;
          border-bottom: 1px solid transparent;
        }
        .nav-scrolled {
          background: color-mix(in srgb, var(--bg-0) 78%, transparent);
          backdrop-filter: blur(16px) saturate(180%);
          -webkit-backdrop-filter: blur(16px) saturate(180%);
          border-bottom-color: var(--line);
        }
        .nav-inner {
          display: flex; align-items: center; justify-content: space-between;
          height: 64px; gap: 32px;
        }
        .nav-brand img { height: 28px; width: auto; }
        .nav-links { display: flex; align-items: center; gap: 4px; flex: 1; justify-content: center; }
        .nav-link {
          padding: 8px 14px;
          font-size: 13.5px;
          color: var(--fg-1);
          border-radius: 999px;
          display: inline-flex; align-items: center; gap: 6px;
          transition: color .15s, background .15s;
        }
        .nav-link:hover, .nav-link-active { color: var(--fg-0); background: rgba(255,255,255,0.04); }
        .nav-link-wrap { position: relative; }
        .nav-cta { display: flex; align-items: center; gap: 12px; }
        .nav-mobile-right { display: none; align-items: center; gap: 12px; }
        .nav-burger { color: var(--fg-0); display: inline-flex; }

        /* Theme toggle */
        .theme-toggle {
          position: relative;
          width: 56px; height: 28px;
          border-radius: 999px;
          background: rgba(255,255,255,0.06);
          border: 1px solid var(--line-strong);
          display: inline-flex; align-items: center;
          padding: 0 4px;
          transition: background .2s, border-color .2s;
          flex-shrink: 0;
        }
        body[data-theme="light"] .theme-toggle {
          background: rgba(10,10,15,0.04);
          border-color: rgba(10,10,15,0.1);
        }
        .theme-toggle:hover { border-color: rgba(255,255,255,0.2); }
        body[data-theme="light"] .theme-toggle:hover { border-color: rgba(10,10,15,0.18); }
        .theme-knob {
          position: absolute;
          left: 3px; top: 50%; transform: translateY(-50%);
          width: 22px; height: 22px;
          border-radius: 99px;
          background: var(--grad-brand);
          color: #fff;
          display: flex; align-items: center; justify-content: center;
          transition: left .25s cubic-bezier(.4,1.4,.6,1), transform .25s;
          box-shadow: 0 4px 12px -2px rgba(0,0,0,0.4);
          z-index: 2;
        }
        .theme-knob-right { left: calc(100% - 25px); }
        .theme-track-icon {
          width: 22px; height: 22px;
          display: flex; align-items: center; justify-content: center;
          color: var(--fg-3);
          z-index: 1;
        }
        .theme-track-left { margin-left: 0; }
        .theme-track-right { margin-left: auto; }

        .mega-menu {
          position: absolute; top: calc(100% + 8px); left: 50%; transform: translateX(-50%);
          width: min(1100px, 92vw);
          background: color-mix(in srgb, var(--bg-1) 95%, transparent);
          backdrop-filter: blur(20px) saturate(180%);
          border: 1px solid var(--line-strong);
          border-radius: var(--radius-lg);
          padding: 20px;
          box-shadow: 0 30px 80px -20px rgba(0,0,0,0.7);
          animation: fadeUp .25s ease;
        }
        .mega-inner { display: flex; flex-direction: column; gap: 16px; }
        .mega-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 8px;
        }
        .mega-card {
          background: rgba(255,255,255,0.02);
          border: 1px solid var(--line);
          border-radius: var(--radius);
          padding: 16px;
          transition: background .15s, border-color .15s, transform .15s;
          display: flex; flex-direction: column;
        }
        .mega-card:hover { background: rgba(255,255,255,0.05); border-color: var(--line-strong); transform: translateY(-1px); }
        .mega-featured {
          background: linear-gradient(135deg, rgba(75,107,255,0.12), rgba(192,38,211,0.10));
          border-color: rgba(139,92,246,0.3);
        }
        .mega-featured:hover { background: linear-gradient(135deg, rgba(75,107,255,0.18), rgba(192,38,211,0.16)); border-color: rgba(139,92,246,0.5); }
        .mega-card-head { display: flex; gap: 10px; align-items: flex-start; }
        .mega-icon {
          width: 28px; height: 28px; border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          background: rgba(255,255,255,0.06);
          border: 1px solid var(--line);
          color: var(--fg-0);
          flex-shrink: 0;
        }
        .mega-featured .mega-icon { background: var(--grad-brand); border-color: transparent; color: #fff; }
        .mega-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 4px; }
        .mega-list li { font-size: 12px; color: var(--fg-2); }
        .mega-foot {
          display: flex; justify-content: space-between; align-items: center;
          padding: 10px 12px; border-top: 1px solid var(--line);
          margin-top: 4px;
        }

        .mobile-menu {
          position: fixed; inset: 0; z-index: 200;
          background: var(--bg-0);
          display: flex; flex-direction: column;
        }
        .mobile-head { display: flex; justify-content: space-between; align-items: center; height: 64px; border-bottom: 1px solid var(--line); color: var(--fg-0); }
        .mobile-body { display: flex; flex-direction: column; padding-top: 24px; }
        .mobile-link {
          display: flex; justify-content: space-between; align-items: center;
          padding: 18px 0; font-size: 18px; border-bottom: 1px solid var(--line);
          color: var(--fg-0);
        }

        @media (max-width: 1024px) {
          .nav-links { display: none; }
          .nav-cta { display: none; }
          .nav-mobile-right { display: inline-flex; }
        }
      `}</style>
    </header>
  );
};

Object.assign(window, { Nav });

