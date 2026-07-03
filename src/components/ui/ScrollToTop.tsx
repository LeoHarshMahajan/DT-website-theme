'use client';

import { useState, useEffect } from 'react';

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
      style={{
        position: 'fixed',
        bottom: '28px',
        right: '28px',
        width: '44px',
        height: '44px',
        borderRadius: '50%',
        border: '1px solid var(--line-strong)',
        backgroundColor: 'var(--bg-2)',
        color: 'var(--fg-1)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
        transition: 'background-color 0.2s, border-color 0.2s, transform 0.2s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--brand-blue)';
        e.currentTarget.style.borderColor = 'var(--brand-blue)';
        e.currentTarget.style.color = '#fff';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--bg-2)';
        e.currentTarget.style.borderColor = 'var(--line-strong)';
        e.currentTarget.style.color = 'var(--fg-1)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </button>
  );
}
