'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';

const FOOTER_COLUMNS = [
  {
    title: 'Solutions',
    links: [
      { label: 'Performance Marketing', href: '/solutions/performance' },
      { label: 'Organic Growth & SEO',  href: '/solutions/organic-growth' },
      { label: 'Content & Social',      href: '/solutions/content-social' },
      { label: 'AI & Automation',       href: '/solutions/ai-automation' },
      { label: 'Analytics & CRO',       href: '/solutions/analytics' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us',     href: '/about' },
      { label: 'Blog',         href: '/blog' },
      { label: 'Insights',     href: '/insights' },
      { label: 'Contact',      href: '/contact' },
      { label: 'Case Studies', href: '/case-studies' },
    ],
  },
  {
    title: 'Services',
    links: [
      { label: 'Industries',          href: '/industries' },
      { label: 'Pricing',             href: '/pricing' },
      { label: 'Free Growth Audit',   href: '/free-growth-audit' },
      { label: 'Book Consultation',   href: '/book-consultation' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy',    href: '#' },
      { label: 'Terms of Service',  href: '#' },
      { label: 'Cookie Policy',     href: '#' },
    ],
  },
];

const SOCIAL_LINKS = [
  { label: 'Twitter / X', icon: '𝕏', href: 'https://twitter.com' },
  { label: 'LinkedIn', icon: 'in', href: 'https://linkedin.com' },
  { label: 'GitHub', icon: '⌥', href: 'https://github.com' },
];

export function Footer() {
  const year = new Date().getFullYear();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <footer
      style={{
        backgroundColor: 'var(--bg-0)',
        borderTop: '1px solid var(--line)',
      }}
    >
      {/* ── Links grid ── */}
      <div style={{ padding: 'clamp(40px, 6vw, 72px) 0 clamp(32px, 5vw, 56px)' }}>
        <div className="shell">
          <div
            className="footer-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
              gap: '32px',
              marginBottom: '48px',
            }}
          >
            {FOOTER_COLUMNS.map((col) => (
              <div key={col.title}>
                <p
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: 'var(--fg-3)',
                    marginBottom: '16px',
                  }}
                >
                  {col.title}
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        style={{
                          fontSize: '0.875rem',
                          color: 'var(--fg-2)',
                          textDecoration: 'none',
                          transition: 'color 0.15s',
                          lineHeight: 1.5,
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--fg-0)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--fg-2)'; }}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* ── Bottom bar ── */}
          <div
            className="footer-bottom"
            style={{
              borderTop: '1px solid var(--line)',
              paddingTop: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '24px',
              flexWrap: 'wrap',
            }}
          >
            {/* Logo + copyright */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
              <Link href="/" style={{ textDecoration: 'none' }}>
                <div style={{
                  display: 'inline-flex',
                  padding: mounted && theme === 'light' ? '3px 7px' : '0',
                  background: mounted && theme === 'light' ? '#0d0d12' : 'transparent',
                  borderRadius: '7px',
                }}>
                  <img src="/logo.png" alt="Digital Triangle" style={{ height: '28px', width: 'auto', display: 'block' }} />
                </div>
              </Link>
              <span style={{ fontSize: '0.8rem', color: 'var(--fg-3)' }}>
                © {year} Digital Triangle. All rights reserved.
              </span>
            </div>

            {/* Social icons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  style={{
                    width: '34px', height: '34px', borderRadius: '999px',
                    backgroundColor: 'var(--bg-2)',
                    border: '1px solid var(--line)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '13px', fontWeight: '700',
                    color: 'var(--fg-2)',
                    textDecoration: 'none',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(75,107,255,0.4)';
                    e.currentTarget.style.color = 'var(--brand-blue)';
                    e.currentTarget.style.backgroundColor = 'rgba(75,107,255,0.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--line)';
                    e.currentTarget.style.color = 'var(--fg-2)';
                    e.currentTarget.style.backgroundColor = 'var(--bg-2)';
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px)  { .footer-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 480px)  { .footer-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 600px)  { .footer-bottom { flex-direction: column; align-items: flex-start !important; } }
      `}</style>
    </footer>
  );
}
