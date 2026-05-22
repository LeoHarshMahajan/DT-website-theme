/* global React */
const { useState, useEffect, useRef, useCallback, useMemo } = React;

/* ------------------------------------------------------------------
   Icons — minimal stroke set, no external deps
------------------------------------------------------------------ */
const Icon = ({ name, size = 16, stroke = 1.6 }) => {
  const p = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: stroke, strokeLinecap: "round", strokeLinejoin: "round" };
  switch (name) {
    case "arrow-right": return <svg {...p}><path d="M5 12h14M13 6l6 6-6 6"/></svg>;
    case "arrow-up-right": return <svg {...p}><path d="M7 17 17 7M8 7h9v9"/></svg>;
    case "check": return <svg {...p}><path d="M20 6 9 17l-5-5"/></svg>;
    case "sparkles": return <svg {...p}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8"/></svg>;
    case "bolt": return <svg {...p}><path d="M13 2 3 14h7l-1 8 10-12h-7z"/></svg>;
    case "search": return <svg {...p}><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>;
    case "target": return <svg {...p}><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/></svg>;
    case "play": return <svg {...p}><polygon points="6 4 20 12 6 20"/></svg>;
    case "brain": return <svg {...p}><path d="M12 5a3 3 0 0 0-3 3v0a3 3 0 0 0-3 3v0a3 3 0 0 0 0 6v0a3 3 0 0 0 3 3h0a3 3 0 0 0 3-3v-12z"/><path d="M12 5a3 3 0 0 1 3 3v0a3 3 0 0 1 3 3v0a3 3 0 0 1 0 6v0a3 3 0 0 1-3 3h0a3 3 0 0 1-3-3"/></svg>;
    case "chat": return <svg {...p}><path d="M21 12a8 8 0 0 1-8 8H7l-4 3v-11a8 8 0 0 1 8-8h2a8 8 0 0 1 8 8z"/></svg>;
    case "chart": return <svg {...p}><path d="M3 3v18h18"/><path d="m7 14 4-4 4 4 5-7"/></svg>;
    case "layers": return <svg {...p}><path d="M12 2 2 8l10 6 10-6-10-6z"/><path d="m2 14 10 6 10-6"/></svg>;
    case "wand": return <svg {...p}><path d="M15 4 4 15l3 3L18 7zM18 4l1 1M21 7l1 1M14 11l1 1"/></svg>;
    case "menu": return <svg {...p}><path d="M3 6h18M3 12h18M3 18h18"/></svg>;
    case "x": return <svg {...p}><path d="M6 6l12 12M18 6 6 18"/></svg>;
    case "plus": return <svg {...p}><path d="M12 5v14M5 12h14"/></svg>;
    case "minus": return <svg {...p}><path d="M5 12h14"/></svg>;
    case "chevron-down": return <svg {...p}><path d="m6 9 6 6 6-6"/></svg>;
    case "chevron-right": return <svg {...p}><path d="m9 6 6 6-6 6"/></svg>;
    case "whatsapp": return <svg {...p}><path d="M21 11.5a8.5 8.5 0 1 1-16.06 4.15L3 21l5.5-1.4A8.5 8.5 0 0 1 21 11.5z"/><path d="M8 10.5c0 3 2.5 5.5 5.5 5.5l1.5-1.5-2-1-1 1c-1 0-2-1-2-2l1-1-1-2-1.5 1z"/></svg>;
    case "globe": return <svg {...p}><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>;
    case "shield": return <svg {...p}><path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3z"/></svg>;
    case "node": return <svg {...p}><circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="6" cy="18" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M8.5 6h7M8.5 18h7M6 8.5v7M18 8.5v7"/></svg>;
    case "code": return <svg {...p}><path d="m8 8-5 4 5 4M16 8l5 4-5 4M14 4l-4 16"/></svg>;
    case "sun": return <svg {...p}><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>;
    case "moon": return <svg {...p}><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>;
    default: return null;
  }
};

/* ------------------------------------------------------------------
   useInView — IntersectionObserver hook for reveal animations
------------------------------------------------------------------ */
const useInView = (opts = { threshold: 0.15, once: true }) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        if (opts.once) io.disconnect();
      } else if (!opts.once) setInView(false);
    }, { threshold: opts.threshold });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return [ref, inView];
};

/* ------------------------------------------------------------------
   AnimatedNumber — counts up when in view
------------------------------------------------------------------ */
const AnimatedNumber = ({ to, duration = 1600, prefix = "", suffix = "", decimals = 0, start = false }) => {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf;
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / duration);
      const e = 1 - Math.pow(1 - p, 3); // ease-out cubic
      setVal(to * e);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, to, duration]);
  return <span>{prefix}{val.toLocaleString(undefined, { maximumFractionDigits: decimals, minimumFractionDigits: decimals })}{suffix}</span>;
};

/* ------------------------------------------------------------------
   Section Reveal wrapper
------------------------------------------------------------------ */
const Reveal = ({ children, delay = 0, as = "div", className = "", ...rest }) => {
  const [ref, inView] = useInView();
  const Tag = as;
  return (
    <Tag ref={ref} className={`reveal ${inView ? "in" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }} {...rest}>
      {children}
    </Tag>
  );
};

/* ------------------------------------------------------------------
   Status pill ("Live", "AI", etc.)
------------------------------------------------------------------ */
const StatusPill = ({ children, dot = true, tone = "blue" }) => {
  const colors = { blue: "var(--brand-blue)", violet: "var(--brand-violet)", magenta: "var(--brand-magenta)", green: "#34d399" };
  return (
    <span className="chip">
      {dot && <span style={{ width: 6, height: 6, borderRadius: 99, background: colors[tone], boxShadow: `0 0 8px ${colors[tone]}` }} />}
      {children}
    </span>
  );
};

/* expose */
Object.assign(window, { Icon, useInView, AnimatedNumber, Reveal, StatusPill });

