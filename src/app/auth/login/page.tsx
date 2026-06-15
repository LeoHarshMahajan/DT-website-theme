'use client';

import React, { useState, Suspense } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { AuthLayout } from '@/components/forms/AuthLayout';
import { FormInput } from '@/components/forms/FormInput';
import { Icon } from '@/components/ui/Icon';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  // Validate callbackUrl to prevent open redirect — only allow relative paths
  const rawCallback = searchParams.get('callbackUrl') || '/admin';
  const callbackUrl = rawCallback.startsWith('/') && !rawCallback.startsWith('//') ? rawCallback : '/admin';
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        setError('Invalid email or password. Please try again.');
        return;
      }

      router.push(callbackUrl);
      router.refresh();
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && (
        <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 flex gap-3">
          <Icon name="x" size={16} className="text-red-500 flex-shrink-0" />
          <p className="text-sm text-red-200">{error}</p>
        </div>
      )}

      <FormInput
        label="Email Address"
        type="email"
        placeholder="you@example.com"
        {...register('email')}
        error={errors.email}
      />

      <FormInput
        label="Password"
        type="password"
        placeholder="••••••••"
        {...register('password')}
        error={errors.password}
      />

      <div className="text-right">
        <a
          href="/auth/reset-password"
          className="text-xs text-[var(--brand-blue)] hover:text-[var(--brand-blue-soft)] transition-colors"
        >
          Forgot your password?
        </a>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="btn btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Signing in...' : 'Sign In'}
      </button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[var(--line)]" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-[var(--bg-2)] text-[var(--fg-3)]">Or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button type="button" className="btn btn-secondary" disabled>
          <Icon name="globe" size={16} />
          Google
        </button>
        <button type="button" className="btn btn-secondary" disabled>
          <Icon name="code" size={16} />
          GitHub
        </button>
      </div>

      <p className="text-xs text-center text-[var(--fg-3)]">
        By signing in, you agree to our{' '}
        <a href="#" className="text-[var(--brand-blue)] hover:underline">Terms of Service</a>{' '}
        and{' '}
        <a href="#" className="text-[var(--brand-blue)] hover:underline">Privacy Policy</a>
      </p>
    </form>
  );
}

export default function LoginPage() {
  return (
    <AuthLayout
      title="Sign In"
      description="Access your Digital Triangle account"
      footerLink={{
        text: "Don't have an account?",
        href: '/auth/register',
        linkText: 'Sign up',
      }}
    >
      <Suspense fallback={<div className="h-64 flex items-center justify-center text-[var(--fg-3)] text-sm">Loading...</div>}>
        <LoginForm />
      </Suspense>
    </AuthLayout>
  );
}
