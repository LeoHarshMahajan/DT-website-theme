'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Floating scroll navigation.
 *  • Auto    — a top progress bar tracks reading position, and an auto-scroll
 *              play/pause smoothly advances the page (stops itself at the end).
 *  • Manual  — jump-to-top / jump-to-bottom controls.
 * Appears once the user has scrolled past the fold.
 */
export function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [atBottom, setAtBottom] = useState(false);
  const [autoScrolling, setAutoScrolling] = useState(false);
  const rafRef = useRef<number | null>(null);
  const toggleBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const y = window.scrollY;
      setVisible(y > 400);
      setProgress(max > 0 ? Math.min(1, y / max) : 0);
      setAtBottom(max - y < 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const stopAuto = useCallback(() => {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    setAutoScrolling(false);
  }, []);

  const startAuto = useCallback(() => {
    setAutoScrolling(true);
    const step = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      if (window.scrollY >= max - 1) {
        stopAuto();
        return;
      }
      window.scrollBy(0, 1.4); // steady, readable pace (~84px/s)
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
  }, [stopAuto]);

  // Any manual wheel/touch interaction cancels auto-scroll — except a tap on
  // the toggle button itself, whose touchstart would otherwise stop it a
  // beat before its own click handler restarts it (stop → click → resume).
  useEffect(() => {
    if (!autoScrolling) return;
    const cancel = (e: Event) => {
      if (e.target instanceof Node && toggleBtnRef.current?.contains(e.target)) return;
      stopAuto();
    };
    window.addEventListener('wheel', cancel, { passive: true });
    window.addEventListener('touchstart', cancel, { passive: true });
    window.addEventListener('keydown', cancel);
    return () => {
      window.removeEventListener('wheel', cancel);
      window.removeEventListener('touchstart', cancel);
      window.removeEventListener('keydown', cancel);
    };
  }, [autoScrolling, stopAuto]);

  useEffect(() => () => { if (rafRef.current !== null) cancelAnimationFrame(rafRef.current); }, []);

  const toTop = () => { stopAuto(); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const toBottom = () => { stopAuto(); window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' }); };
  const toggleAuto = () => (autoScrolling ? stopAuto() : startAuto());

  const btnBase: React.CSSProperties = {
    width: '44px', height: '44px', borderRadius: '50%',
    border: '1px solid var(--line-strong)', backgroundColor: 'var(--bg-2)',
    color: 'var(--fg-1)', cursor: 'pointer', display: 'flex',
    alignItems: 'center', justifyContent: 'center',
    boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
    transition: 'background-color 0.2s, border-color 0.2s, transform 0.2s, color 0.2s',
  };
  const hoverOn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = 'var(--brand-blue)';
    e.currentTarget.style.borderColor = 'var(--brand-blue)';
    e.currentTarget.style.color = '#fff';
    e.currentTarget.style.transform = 'translateY(-2px)';
  };
  const hoverOff = (e: React.MouseEvent<HTMLButtonElement>, active = false) => {
    e.currentTarget.style.backgroundColor = active ? 'var(--brand-blue)' : 'var(--bg-2)';
    e.currentTarget.style.borderColor = active ? 'var(--brand-blue)' : 'var(--line-strong)';
    e.currentTarget.style.color = active ? '#fff' : 'var(--fg-1)';
    e.currentTarget.style.transform = 'translateY(0)';
  };

  // Progress ring geometry for the top button.
  const R = 20, C = 2 * Math.PI * R;

  return (
    <>
      {/* Auto: reading-progress bar pinned to the top of the viewport */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '3px', zIndex: 9998, pointerEvents: 'none' }}>
        <div style={{
          height: '100%', width: `${progress * 100}%`,
          background: 'linear-gradient(90deg, var(--brand-blue), var(--brand-violet), var(--brand-magenta))',
          transition: 'width 0.1s linear',
        }} />
      </div>

      {/* Manual + auto controls */}
      <div style={{
        position: 'fixed', bottom: '28px', right: '28px', zIndex: 9999,
        display: 'flex', flexDirection: 'column', gap: '10px',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(12px)',
        pointerEvents: visible ? 'auto' : 'none',
        transition: 'opacity 0.25s, transform 0.25s',
      }}>
        {/* Auto-scroll toggle */}
        <button
          ref={toggleBtnRef}
          onClick={toggleAuto}
          aria-label={autoScrolling ? 'Stop auto-scroll' : 'Start auto-scroll'}
          title={autoScrolling ? 'Stop auto-scroll' : 'Auto-scroll'}
          style={{
            ...btnBase,
            backgroundColor: autoScrolling ? 'var(--brand-blue)' : 'var(--bg-2)',
            borderColor: autoScrolling ? 'var(--brand-blue)' : 'var(--line-strong)',
            color: autoScrolling ? '#fff' : 'var(--fg-1)',
          }}
          onMouseEnter={hoverOn}
          onMouseLeave={(e) => hoverOff(e, autoScrolling)}
        >
          {autoScrolling ? (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>
          ) : (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
          )}
        </button>

        {/* Manual: to top (with progress ring) / to bottom */}
        <button
          onClick={atBottom ? toBottom : toTop}
          aria-label={atBottom ? 'Scroll to bottom' : 'Scroll to top'}
          title={atBottom ? 'Scroll to bottom' : 'Scroll to top'}
          style={{ ...btnBase, position: 'relative' }}
          onMouseEnter={hoverOn}
          onMouseLeave={(e) => hoverOff(e)}
        >
          <svg width="44" height="44" viewBox="0 0 44 44" style={{ position: 'absolute', inset: 0, transform: 'rotate(-90deg)' }}>
            <circle cx="22" cy="22" r={R} fill="none" stroke="var(--brand-blue)" strokeWidth="2"
              strokeDasharray={C} strokeDashoffset={C * (1 - progress)} strokeLinecap="round" style={{ transition: 'stroke-dashoffset 0.1s linear' }} />
          </svg>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'relative' }}>
            <path d={atBottom ? 'M6 9l6 6 6-6' : 'M18 15l-6-6-6 6'} />
          </svg>
        </button>
      </div>
    </>
  );
}
