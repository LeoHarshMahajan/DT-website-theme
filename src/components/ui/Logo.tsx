'use client';
import { useId } from 'react';

export function DTLogo({ height = 36 }: { height?: number }) {
  const raw = useId();
  const uid = raw.replace(/:/g, '');
  const clipId = `dtd-${uid}`;

  const gap      = Math.round(height * 0.28);
  const digital  = Math.round(height * 0.47);
  const triangle = Math.round(height * 0.30);
  const padV     = Math.round(height * 0.07);
  const padH     = Math.round(height * 0.11);
  const mt       = Math.round(height * 0.06);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: gap + 'px' }}>
      {/* Geometric D icon */}
      <svg
        width={height}
        height={height}
        viewBox="0 0 72 72"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style={{ flexShrink: 0 }}
      >
        <defs>
          <clipPath id={clipId}>
            {/* D letterform: left spine + right curve */}
            <path d="M10,4 L10,68 L34,68 Q62,68 68,50 L68,22 Q62,4 34,4 Z" />
          </clipPath>
        </defs>
        {/* Teal upper-left */}
        <polygon points="0,0 72,0 26,72 0,72"         fill="#1d8eb5" clipPath={`url(#${clipId})`} />
        {/* Magenta lower-right */}
        <polygon points="72,0 72,72 26,72"             fill="#c0198b" clipPath={`url(#${clipId})`} />
        {/* White fold highlight */}
        <polygon points="70,0 72,0 30,72 26,72"        fill="rgba(255,255,255,0.52)" clipPath={`url(#${clipId})`} />
      </svg>

      {/* Wordmark */}
      <div style={{ lineHeight: 1, userSelect: 'none' }}>
        <div style={{
          fontSize: digital + 'px',
          fontWeight: 800,
          letterSpacing: '0.07em',
          color: 'var(--fg-0)',
          lineHeight: 1,
        }}>
          DIGITAL
        </div>
        <div style={{
          background: 'linear-gradient(90deg, #7c3aed, #c0198b)',
          padding: `${padV}px ${padH}px`,
          marginTop: mt + 'px',
          borderRadius: '2px',
          display: 'inline-block',
        }}>
          <span style={{
            fontSize: triangle + 'px',
            fontWeight: 700,
            letterSpacing: '0.11em',
            color: '#ffffff',
            display: 'block',
            lineHeight: 1,
          }}>
            TRIANGLE
          </span>
        </div>
      </div>
    </div>
  );
}
