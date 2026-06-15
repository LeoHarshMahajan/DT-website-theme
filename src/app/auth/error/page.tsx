'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';

const ERROR_MESSAGES: Record<string, { title: string; message: string }> = {
  access_denied: {
    title: 'Access Denied',
    message: 'You do not have permission to access this resource.',
  },
  invalid_grant: {
    title: 'Invalid Credentials',
    message: 'Your email or password is incorrect. Please try again.',
  },
  callback_error: {
    title: 'Authentication Error',
    message: 'An error occurred during authentication. Please try again.',
  },
  signin_error: {
    title: 'Sign In Error',
    message: 'An error occurred while signing in. Please try again.',
  },
  oauthsignin: {
    title: 'OAuth Error',
    message: 'An error occurred with OAuth sign in. Please try again.',
  },
  oauthcallback: {
    title: 'OAuth Callback Error',
    message: 'An error occurred in the OAuth callback. Please try again.',
  },
  emailsignin: {
    title: 'Email Sign In Error',
    message: 'The email sign in link is invalid or has expired.',
  },
  sessioncallback: {
    title: 'Session Error',
    message: 'An error occurred while establishing your session.',
  },
};

function ErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const errorInfo = ERROR_MESSAGES[error || ''] || {
    title: 'Authentication Error',
    message: 'An unexpected error occurred. Please try again.',
  };

  return (
    <>
      <Reveal direction="up">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-4">
            <Icon name="x" size={32} className="text-red-500" />
          </div>
          <h1 className="text-2xl font-bold text-[var(--fg-0)] mb-2">
            {errorInfo.title}
          </h1>
          <p className="text-[var(--fg-2)]">{errorInfo.message}</p>
        </div>
      </Reveal>

      <Reveal direction="up" delay={0.1}>
        <div className="card mb-6">
          <div className="space-y-3">
            <p className="text-sm text-[var(--fg-1)]">What you can try:</p>
            <ul className="space-y-2 text-sm text-[var(--fg-2)]">
              <li className="flex gap-2">
                <Icon name="arrow-right" size={16} className="text-[var(--brand-blue)] flex-shrink-0" />
                Check your email and password are correct
              </li>
              <li className="flex gap-2">
                <Icon name="arrow-right" size={16} className="text-[var(--brand-blue)] flex-shrink-0" />
                Try clearing your browser cookies
              </li>
              <li className="flex gap-2">
                <Icon name="arrow-right" size={16} className="text-[var(--brand-blue)] flex-shrink-0" />
                Try again in a few moments
              </li>
            </ul>
          </div>
        </div>
      </Reveal>
    </>
  );
}

export default function AuthErrorPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-0)] flex items-center justify-center py-12 px-4 mt-24">
      <div className="w-full max-w-md">
        <Suspense fallback={
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-4">
              <Icon name="x" size={32} className="text-red-500" />
            </div>
            <h1 className="text-2xl font-bold text-[var(--fg-0)] mb-2">Authentication Error</h1>
            <p className="text-[var(--fg-2)]">An error occurred. Please try again.</p>
          </div>
        }>
          <ErrorContent />
        </Suspense>

        <Reveal direction="up" delay={0.2}>
          <div className="flex flex-col gap-3">
            <Link href="/auth/login" className="btn btn-primary">
              Back to Sign In
            </Link>
            <Link href="/auth/reset-password" className="btn btn-secondary">
              Reset Password
            </Link>
            <Link href="/" className="btn btn-ghost">
              Go Home
            </Link>
          </div>
        </Reveal>

        <Reveal direction="up" delay={0.3}>
          <p className="text-center text-xs text-[var(--fg-3)] mt-6">
            Need help?{' '}
            <a href="mailto:support@digitaltriangle.in" className="text-[var(--brand-blue)] hover:underline">
              Contact support
            </a>
          </p>
        </Reveal>
      </div>
    </div>
  );
}
