'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { AuthLayout } from '@/components/forms/AuthLayout';
import { FormInput } from '@/components/forms/FormInput';
import { Icon } from '@/components/ui/Icon';

// Step 1: Request password reset
const requestResetSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

// Step 2: Reset password with token
const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type RequestResetData = z.infer<typeof requestResetSchema>;
type ResetPasswordData = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordPage() {
  const [step, setStep] = useState<'request' | 'reset'>('request');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [email, setEmail] = useState<string>('');

  // Request reset form
  const requestForm = useForm<RequestResetData>({
    resolver: zodResolver(requestResetSchema),
  });

  // Reset password form
  const resetForm = useForm<ResetPasswordData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const handleRequestReset = async (data: RequestResetData) => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // TODO: Implement actual password reset request
      const response = await fetch('/api/auth/request-reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const result = await response.json();
        setError(result.message || 'Failed to send reset email.');
        return;
      }

      setEmail(data.email);
      setSuccess(
        'Check your email for a link to reset your password. The link expires in 24 hours.'
      );
      requestForm.reset();
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (data: ResetPasswordData) => {
    setIsLoading(true);
    setError(null);

    try {
      // TODO: Implement actual password reset with token from URL
      const token = new URLSearchParams(window.location.search).get('token');

      if (!token) {
        setError('Invalid reset link. Please request a new one.');
        return;
      }

      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token,
          password: data.password,
        }),
      });

      if (!response.ok) {
        const result = await response.json();
        setError(result.message || 'Failed to reset password.');
        return;
      }

      setSuccess('Password reset successfully. Redirecting to login...');
      setTimeout(() => {
        window.location.href = '/auth/login';
      }, 2000);
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Check if we have a reset token
  const hasToken =
    typeof window !== 'undefined' &&
    new URLSearchParams(window.location.search).has('token');

  if (hasToken) {
    return (
      <AuthLayout
        title="Reset Password"
        description="Enter your new password"
        footerLink={{
          text: 'Remember your password?',
          href: '/auth/login',
          linkText: 'Sign in',
        }}
      >
        <form onSubmit={resetForm.handleSubmit(handleResetPassword)} className="space-y-6">
          {/* Error Message */}
          {error && (
            <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 flex gap-3">
              <Icon name="x" size={16} className="text-red-500 flex-shrink-0" />
              <p className="text-sm text-red-200">{error}</p>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="bg-emerald-500/20 border border-emerald-500/30 rounded-lg p-4 flex gap-3">
              <Icon name="check" size={16} className="text-emerald-500 flex-shrink-0" />
              <p className="text-sm text-emerald-200">{success}</p>
            </div>
          )}

          {/* Password */}
          <FormInput
            label="New Password"
            type="password"
            placeholder="••••••••"
            {...resetForm.register('password')}
            error={resetForm.formState.errors.password}
            helperText="At least 8 characters, 1 uppercase letter, and 1 number"
          />

          {/* Confirm Password */}
          <FormInput
            label="Confirm Password"
            type="password"
            placeholder="••••••••"
            {...resetForm.register('confirmPassword')}
            error={resetForm.formState.errors.confirmPassword}
          />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Resetting password...' : 'Reset Password'}
          </button>
        </form>
      </AuthLayout>
    );
  }

  // Request reset form (default view)
  return (
    <AuthLayout
      title="Reset Password"
      description="Enter your email to receive a password reset link"
      footerLink={{
        text: 'Remember your password?',
        href: '/auth/login',
        linkText: 'Sign in',
      }}
    >
      <form onSubmit={requestForm.handleSubmit(handleRequestReset)} className="space-y-6">
        {/* Error Message */}
        {error && (
          <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 flex gap-3">
            <Icon name="x" size={16} className="text-red-500 flex-shrink-0" />
            <p className="text-sm text-red-200">{error}</p>
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="bg-emerald-500/20 border border-emerald-500/30 rounded-lg p-4 flex gap-3">
            <Icon name="check" size={16} className="text-emerald-500 flex-shrink-0" />
            <p className="text-sm text-emerald-200">{success}</p>
          </div>
        )}

        {/* Email */}
        <FormInput
          label="Email Address"
          type="email"
          placeholder="you@example.com"
          {...requestForm.register('email')}
          error={requestForm.formState.errors.email}
        />

        {/* Info */}
        <div className="bg-[var(--bg-3)] border border-[var(--line)] rounded-lg p-4">
          <p className="text-xs text-[var(--fg-2)]">
            <Icon name="sparkles" size={14} className="inline mr-2" />
            We'll send you an email with a link to reset your password. The link expires
            in 24 hours.
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="btn btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Sending reset link...' : 'Send Reset Link'}
        </button>
      </form>
    </AuthLayout>
  );
}
