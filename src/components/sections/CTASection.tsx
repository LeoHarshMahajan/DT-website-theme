'use client';

import React from 'react';
import Link from 'next/link';

export function CTASection() {
  return (
    <section
      style={{
        padding: 'clamp(64px, 10vw, 112px) 0',
        background: 'linear-gradient(135deg, var(--brand-blue) 0%, var(--brand-violet) 50%, var(--brand-magenta) 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Orb overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(circle at 70% 50%, rgba(255,255,255,0.08) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />

      <div className="shell" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <p style={{
          fontSize: '0.7rem', fontWeight: '700',
          letterSpacing: '0.1em', textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.65)', marginBottom: '16px',
        }}>
          Ready to scale?
        </p>
        <h2 className="h-lg" style={{ color: 'white', marginBottom: '16px' }}>
          Start growing smarter today.
        </h2>
        <p style={{
          fontSize: '1.1rem', lineHeight: 1.6,
          color: 'rgba(255,255,255,0.8)',
          maxWidth: '520px', margin: '0 auto 40px',
        }}>
          Join 50+ brands using Digital Triangle's AI-powered growth
          infrastructure to scale faster with less guesswork.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link
            href="/contact"
            className="cta-btn-primary"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '14px 28px', borderRadius: '999px',
              backgroundColor: 'white', color: 'var(--brand-blue)',
              fontWeight: '700', fontSize: '0.95rem', textDecoration: 'none',
              transition: 'all 0.2s', boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 28px rgba(0,0,0,0.25)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)';
            }}
          >
            Book a Growth Consultation
          </Link>
          <Link
            href="/about"
            style={{
              display: 'inline-flex', alignItems: 'center',
              padding: '14px 28px', borderRadius: '999px',
              border: '1px solid rgba(255,255,255,0.35)',
              color: 'white', fontWeight: '600', fontSize: '0.95rem',
              textDecoration: 'none', transition: 'all 0.2s',
              backgroundColor: 'rgba(255,255,255,0.1)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.18)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'; }}
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
}
