'use client';

import React from 'react';
import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';

interface AuthLayoutProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  footerLink?: {
    text: string;
    href: string;
    linkText: string;
  };
}

export function AuthLayout({
  title,
  description,
  children,
  footerLink,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-[var(--bg-0)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 mt-24">
      <div className="w-full max-w-md">
        {/* Header */}
        <Reveal direction="up">
          <div className="text-center mb-12">
            <h1 className="h-lg mb-2">
              <Link href="/" className="hover:text-[var(--brand-blue)] transition-colors">
                Digital Triangle
              </Link>
            </h1>
            <h2 className="text-2xl font-bold text-[var(--fg-0)] mb-2">{title}</h2>
            {description && (
              <p className="text-[var(--fg-2)] text-sm">{description}</p>
            )}
          </div>
        </Reveal>

        {/* Form */}
        <Reveal direction="up" delay={0.1}>
          <div className="card">{children}</div>
        </Reveal>

        {/* Footer Link */}
        {footerLink && (
          <Reveal direction="up" delay={0.2}>
            <p className="text-center text-sm text-[var(--fg-2)] mt-6">
              {footerLink.text}{' '}
              <Link href={footerLink.href} className="text-[var(--brand-blue)] hover:text-[var(--brand-blue-soft)] transition-colors font-medium">
                {footerLink.linkText}
              </Link>
            </p>
          </Reveal>
        )}
      </div>
    </div>
  );
}
