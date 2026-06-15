'use client';

import React from 'react';

type StatusTone = 'blue' | 'violet' | 'magenta' | 'green' | 'amber' | 'red';

interface StatusPillProps {
  children: React.ReactNode;
  tone?: StatusTone;
  className?: string;
}

const toneMap: Record<StatusTone, string> = {
  blue: 'bg-blue-500/20 text-blue-200 border-blue-500/30',
  violet: 'bg-violet-500/20 text-violet-200 border-violet-500/30',
  magenta: 'bg-magenta-500/20 text-magenta-200 border-magenta-500/30',
  green: 'bg-emerald-500/20 text-emerald-200 border-emerald-500/30',
  amber: 'bg-amber-500/20 text-amber-200 border-amber-500/30',
  red: 'bg-red-500/20 text-red-200 border-red-500/30',
};

export function StatusPill({ children, tone = 'blue', className = '' }: StatusPillProps) {
  return (
    <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium border ${toneMap[tone]} ${className}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-80" />
      {children}
    </span>
  );
}
