'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';
import Link from 'next/link';

/* ── Data ─────────────────────────────────────────────────── */
const SOLUTIONS = [
  {
    eyebrow: 'SEO · AEO · GEO',
    title: 'Organic Growth',
    desc: 'Win search, answer engines, and AI-driven discovery.',
    href: '/solutions/organic-growth',
    featured: false,
    links: ['Shopify SEO', 'AEO Strategy', 'Programmatic SEO', 'GEO Targeting'],
    icon: 'search',
  },
  {
    eyebrow: 'PAID ACQUISITION',
    title: 'Performance Growth',
    desc: 'Meta, Google, YouTube, Amazon — built for ROAS.',
    href: '/solutions/performance',
    featured: false,
    links: ['Meta Ads', 'Google Ads', 'Performance Creative', 'CAC Optimization'],
    icon: 'target',
  },
  {
    eyebrow: 'ATTENTION SYSTEMS',
    title: 'Content & Social',
    desc: 'Reels, founder branding, viral content, UGC.',
    href: '/solutions/content-social',
    featured: false,
    links: ['Instagram Management', 'LinkedIn Growth', 'Founder Branding', 'Reels Strategy'],
    icon: 'play',
  },
  {
    eyebrow: 'AI MARKETING SYSTEMS',
    title: 'AI & Automation',
    desc: 'AI systems, LLMs, workflows, and martech stack.',
    href: '/solutions/ai-automation',
    featured: true,
    links: ['AI Workflow Automation', 'AI Content Systems', 'AI Systems For Marketing', 'Martech Stack'],
    icon: 'brain',
  },
  {
    eyebrow: 'IDENTITY THAT CONVERTS',
    title: 'Brand & Creative',
    desc: 'Brand systems, ad creative, UI/UX, video.',
    href: '/solutions/brand-creative',
    featured: false,
    links: ['Brand Strategy', 'Brand Identity', 'Ad Creative Systems', 'UI/UX Design'],
    icon: 'wand',
  },
  {
    eyebrow: 'DATA + DECISIONS',
    title: 'Analytics & Conversion',
    desc: 'GA4, attribution, dashboards, CRO.',
    href: '/solutions/analytics',
    featured: false,
    links: ['CRO', 'GA4 / GTM', 'Attribution Systems', 'Dashboard Systems'],
    icon: 'chart',
  },
  {
    eyebrow: 'REPEAT REVENUE',
    title: 'Retention & Lifecycle',
    desc: 'WhatsApp, CRM workflows, lifecycle automation.',
    href: '/solutions/retention',
    featured: false,
    links: ['WhatsApp Automation', 'CRM Workflows', 'Email & SMS', 'Cart Recovery'],
    icon: 'chat',
  },
];

/* ── SVG Icons (stroke-based, matches design) ─────────────── */
function NavIcon({ name, size = 16 }: { name: string; size?: number }) {
  const p = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  switch (name) {
    case 'search':    return <svg {...p}><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>;
    case 'target':    return <svg {...p}><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/></svg>;
    case 'play':      return <svg {...p}><polygon points="6 4 20 12 6 20"/></svg>;
    case 'brain':     return <svg {...p}><path d="M12 5a3 3 0 0 0-3 3v0a3 3 0 0 0-3 3v0a3 3 0 0 0 0 6v0a3 3 0 0 0 3 3h0a3 3 0 0 0 3-3v-12z"/><path d="M12 5a3 3 0 0 1 3 3v0a3 3 0 0 1 3 3v0a3 3 0 0 1 0 6v0a3 3 0 0 1-3 3h0a3 3 0 0 1-3-3"/></svg>;
    case 'wand':      return <svg {...p}><path d="M15 4 4 15l3 3L18 7zM18 4l1 1M21 7l1 1M14 11l1 1"/></svg>;
    case 'chart':     return <svg {...p}><path d="M3 3v18h18"/><path d="m7 14 4-4 4 4 5-7"/></svg>;
    case 'chat':      return <svg {...p}><path d="M21 12a8 8 0 0 1-8 8H7l-4 3v-11a8 8 0 0 1 8-8h2a8 8 0 0 1 8 8z"/></svg>;
    case 'chevron-down': return <svg {...p}><path d="m6 9 6 6 6-6"/></svg>;
    case 'chevron-right': return <svg {...p}><path d="m9 6 6 6-6 6"/></svg>;
    case 'arrow-right': return <svg {...p}><path d="M5 12h14M13 6l6 6-6 6"/></svg>;
    case 'sparkles': return <svg {...p}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8"/></svg>;
    case 'menu': return <svg {...p}><path d="M3 6h18M3 12h18M3 18h18"/></svg>;
    case 'x':    return <svg {...p}><path d="M6 6l12 12M18 6 6 18"/></svg>;
    case 'moon': return <svg {...p}><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>;
    case 'sun':  return <svg {...p}><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>;
    default: return null;
  }
}

/* ── Pill Theme Toggle ─────────────────────────────────────── */
function ThemeToggle({ theme, onToggle }: { theme: string; onToggle: () => void }) {
  return (
    <button
      className="theme-toggle"
      onClick={onToggle}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {/* Track left icon: moon */}
      <span className="theme-track-icon" style={{ marginLeft: 0 }}>
        <NavIcon name="moon" size={11} />
      </span>
      {/* Track right icon: sun */}
      <span className="theme-track-icon theme-track-right">
        <NavIcon name="sun" size={11} />
      </span>
      {/* Sliding knob */}
      <span className={`theme-knob ${theme === 'light' ? 'theme-knob-right' : ''}`}>
        <NavIcon name={theme === 'dark' ? 'moon' : 'sun'} size={11} />
      </span>
    </button>
  );
}

/* ── Component ────────────────────────────────────────────── */
export function Navigation() {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen]     = useState(false);
  const [mounted, setMounted]       = useState(false);
  const [isDesktop, setIsDesktop]   = useState(true);
  const { theme, setTheme }         = useTheme();
  const menuTimeout                 = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setMounted(true);
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    const close = () => { setMegaOpen(false); setMobileOpen(false); };
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, []);

  const openMega  = () => { if (menuTimeout.current) clearTimeout(menuTimeout.current); setMegaOpen(true); };
  const closeMega = () => { menuTimeout.current = setTimeout(() => setMegaOpen(false), 120); };
  const stop      = (e: React.MouseEvent) => e.stopPropagation();
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return (
    <>
      <nav
        onClick={stop}
        className={`nav-bar${scrolled ? ' nav-bar-scrolled' : ''}`}
      >
        <div style={{
          maxWidth: '1280px', margin: '0 auto',
          padding: '0 clamp(16px, 3vw, 40px)',
          height: '64px', display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', gap: '12px',
        }}>

          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', flexShrink: 0 }}>
            <div style={{
              display: 'inline-flex',
              padding: mounted && theme === 'light' ? '4px 8px' : '0',
              background: mounted && theme === 'light' ? '#0d0d12' : 'transparent',
              borderRadius: '8px',
            }}>
              <img src="/logo.png" alt="Digital Triangle" style={{ height: '36px', width: 'auto', display: 'block' }} />
            </div>
          </Link>

          {/* Desktop nav links */}
          {isDesktop && (
            <nav style={{ display: 'flex', alignItems: 'center', gap: '2px', flex: 1, justifyContent: 'center' }}>

              {/* Solutions mega menu */}
              <div
                style={{ position: 'relative' }}
                onMouseEnter={openMega}
                onMouseLeave={closeMega}
              >
                <button className={`nav-link${megaOpen ? ' nav-link-active' : ''}`} aria-expanded={megaOpen}>
                  Solutions
                  <NavIcon name="chevron-down" size={14} />
                </button>

                {megaOpen && (
                  <div
                    onMouseEnter={openMega}
                    onMouseLeave={closeMega}
                    style={{
                      position: 'fixed',
                      top: '64px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: 'min(1040px, 94vw)',
                      background: 'color-mix(in srgb, var(--bg-1) 95%, transparent)',
                      backdropFilter: 'blur(20px) saturate(180%)',
                      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                      border: '1px solid var(--line-strong)',
                      borderRadius: '20px',
                      padding: '20px',
                      boxShadow: '0 30px 80px -20px rgba(0,0,0,0.7)',
                      zIndex: 999,
                      animation: 'fadeUp 0.2s ease',
                    }}
                  >
                    {/* 4-col grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '12px' }}>
                      {SOLUTIONS.slice(0, 4).map(sol => (
                        <Link
                          key={sol.title}
                          href={sol.href}
                          onClick={() => setMegaOpen(false)}
                          style={{
                            display: 'flex', flexDirection: 'column',
                            background: sol.featured
                              ? 'linear-gradient(135deg, rgba(75,107,255,0.12), rgba(192,38,211,0.10))'
                              : 'rgba(255,255,255,0.02)',
                            border: `1px solid ${sol.featured ? 'rgba(139,92,246,0.3)' : 'var(--line)'}`,
                            borderRadius: '12px',
                            padding: '16px',
                            textDecoration: 'none',
                            transition: 'background 0.15s, border-color 0.15s, transform 0.15s',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = sol.featured
                              ? 'linear-gradient(135deg, rgba(75,107,255,0.18), rgba(192,38,211,0.16))'
                              : 'rgba(255,255,255,0.05)';
                            e.currentTarget.style.borderColor = sol.featured ? 'rgba(139,92,246,0.5)' : 'var(--line-strong)';
                            e.currentTarget.style.transform = 'translateY(-1px)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = sol.featured
                              ? 'linear-gradient(135deg, rgba(75,107,255,0.12), rgba(192,38,211,0.10))'
                              : 'rgba(255,255,255,0.02)';
                            e.currentTarget.style.borderColor = sol.featured ? 'rgba(139,92,246,0.3)' : 'var(--line)';
                            e.currentTarget.style.transform = 'translateY(0)';
                          }}
                        >
                          {/* Icon + eyebrow */}
                          <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', marginBottom: '6px' }}>
                            <div style={{
                              width: '28px', height: '28px', borderRadius: '8px', flexShrink: 0,
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              background: sol.featured ? 'var(--grad-brand)' : 'rgba(255,255,255,0.06)',
                              border: `1px solid ${sol.featured ? 'transparent' : 'var(--line)'}`,
                              color: sol.featured ? '#fff' : 'var(--fg-0)',
                            }}>
                              <NavIcon name={sol.icon} size={14} />
                            </div>
                            <div>
                              <div style={{ fontSize: '10px', color: 'var(--fg-3)', letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>{sol.eyebrow}</div>
                              <div style={{ fontWeight: '500', fontSize: '14px', color: 'var(--fg-0)' }}>{sol.title}</div>
                            </div>
                          </div>
                          <div style={{ fontSize: '12px', color: 'var(--fg-2)', marginBottom: '10px', lineHeight: 1.5 }}>{sol.desc}</div>
                          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            {sol.links.map(it => (
                              <li key={it} style={{ fontSize: '12px', color: 'var(--fg-2)' }}>{it}</li>
                            ))}
                          </ul>
                        </Link>
                      ))}
                    </div>

                    {/* Second row — remaining 3 */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '12px' }}>
                      {SOLUTIONS.slice(4).map(sol => (
                        <Link
                          key={sol.title}
                          href={sol.href}
                          onClick={() => setMegaOpen(false)}
                          style={{
                            display: 'flex', alignItems: 'center', gap: '10px',
                            background: 'rgba(255,255,255,0.02)',
                            border: '1px solid var(--line)',
                            borderRadius: '12px', padding: '12px 16px',
                            textDecoration: 'none',
                            transition: 'background 0.15s, border-color 0.15s',
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'var(--line-strong)'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; e.currentTarget.style.borderColor = 'var(--line)'; }}
                        >
                          <div style={{
                            width: '28px', height: '28px', borderRadius: '8px', flexShrink: 0,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            background: 'rgba(255,255,255,0.06)', border: '1px solid var(--line)',
                            color: 'var(--fg-1)',
                          }}>
                            <NavIcon name={sol.icon} size={14} />
                          </div>
                          <div>
                            <div style={{ fontWeight: '500', fontSize: '13px', color: 'var(--fg-0)' }}>{sol.title}</div>
                            <div style={{ fontSize: '11px', color: 'var(--fg-3)' }}>{sol.eyebrow}</div>
                          </div>
                        </Link>
                      ))}
                    </div>

                    {/* Footer CTA */}
                    <div style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      paddingTop: '12px', borderTop: '1px solid var(--line)',
                    }}>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '13px', color: 'var(--fg-1)' }}>
                        <NavIcon name="sparkles" size={14} />
                        Not sure where to start? Get a free growth audit.
                      </div>
                      <Link href="/free-growth-audit" onClick={() => setMegaOpen(false)} className="btn btn-ghost" style={{ padding: '8px 14px', fontSize: '13px' }}>
                        Book audit <NavIcon name="arrow-right" size={14} />
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Plain links */}
              {[
                { label: 'Industries',    href: '/industries' },
                { label: 'Case Studies',  href: '/case-studies' },
                { label: 'Insights',      href: '/insights' },
                { label: 'Pricing',       href: '/pricing' },
                { label: 'About',         href: '/about' },
              ].map(item => (
                <Link key={item.label} href={item.href} className="nav-link">
                  {item.label}
                </Link>
              ))}
            </nav>
          )}

          {/* Right actions — desktop */}
          {isDesktop && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
              {mounted && (
                <ThemeToggle theme={theme ?? 'dark'} onToggle={toggleTheme} />
              )}

              <Link href="/auth/login" className="nav-link" style={{ fontSize: '13px' }}>
                Sign in
              </Link>

              <Link
                href="/book-consultation"
                className="btn btn-grad"
                style={{ padding: '9px 18px', fontSize: '13px' }}
              >
                Book consultation <NavIcon name="arrow-right" size={13} />
              </Link>
            </div>
          )}

          {/* Mobile right */}
          {!isDesktop && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {mounted && (
                <ThemeToggle theme={theme ?? 'dark'} onToggle={toggleTheme} />
              )}
              <button
                onClick={(e) => { e.stopPropagation(); setMobileOpen(!mobileOpen); }}
                style={{
                  width: '38px', height: '38px', borderRadius: '999px',
                  background: 'rgba(255,255,255,0.06)', border: '1px solid var(--line-strong)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', color: 'var(--fg-0)',
                }}
              >
                <NavIcon name={mobileOpen ? 'x' : 'menu'} size={20} />
              </button>
            </div>
          )}
        </div>

        {/* Mobile menu */}
        {!isDesktop && mobileOpen && (
          <div onClick={stop} style={{
            position: 'fixed', inset: 0, zIndex: 200,
            background: 'var(--bg-0)',
            display: 'flex', flexDirection: 'column',
          }}>
            {/* Header */}
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              height: '64px', padding: '0 clamp(16px, 4vw, 40px)',
              borderBottom: '1px solid var(--line)',
            }}>
              <Link href="/" onClick={() => setMobileOpen(false)} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                <div style={{
                  display: 'inline-flex',
                  padding: mounted && theme === 'light' ? '3px 7px' : '0',
                  background: mounted && theme === 'light' ? '#0d0d12' : 'transparent',
                  borderRadius: '7px',
                }}>
                  <img src="/logo.png" alt="Digital Triangle" style={{ height: '28px', width: 'auto', display: 'block' }} />
                </div>
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                style={{ color: 'var(--fg-0)', display: 'flex', alignItems: 'center', padding: '4px' }}
              >
                <NavIcon name="x" size={22} />
              </button>
            </div>

            {/* Links */}
            <div style={{ display: 'flex', flexDirection: 'column', padding: '24px clamp(16px, 4vw, 40px)', overflowY: 'auto', flex: 1 }}>
              {[
                { label: 'Solutions',     href: '/solutions' },
                { label: 'Industries',    href: '/industries' },
                { label: 'Case Studies',  href: '/case-studies' },
                { label: 'Insights',      href: '/insights' },
                { label: 'Pricing',       href: '/pricing' },
                { label: 'About',         href: '/about' },
              ].map(item => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '18px 0', fontSize: '18px', fontWeight: '500',
                    borderBottom: '1px solid var(--line)', color: 'var(--fg-0)',
                    textDecoration: 'none',
                  }}
                >
                  {item.label}
                  <NavIcon name="chevron-right" size={16} />
                </Link>
              ))}

              <div style={{ display: 'flex', gap: '10px', marginTop: '24px' }}>
                <Link
                  href="/auth/login"
                  onClick={() => setMobileOpen(false)}
                  style={{
                    flex: 1, padding: '12px', borderRadius: '999px', textAlign: 'center',
                    border: '1px solid var(--line-strong)', color: 'var(--fg-0)',
                    fontSize: '0.9rem', fontWeight: '500', textDecoration: 'none',
                  }}
                >
                  Sign in
                </Link>
                <Link
                  href="/book-consultation"
                  onClick={() => setMobileOpen(false)}
                  className="btn btn-grad"
                  style={{ flex: 1, padding: '12px', justifyContent: 'center', fontSize: '0.9rem' }}
                >
                  Book consultation
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
