'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { AuthLayout } from '@/components/forms/AuthLayout';
import { FormInput } from '@/components/forms/FormInput';
import { Icon } from '@/components/ui/Icon';

const registerSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
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

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      // TODO: Implement actual registration
      // For now, this is a placeholder
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
        }),
      });

      if (!response.ok) {
        const result = await response.json();
        setError(result.message || 'Registration failed. Please try again.');
        return;
      }

      // Redirect to login after successful registration
      router.push('/auth/login');
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create Account"
      description="Join Digital Triangle today"
      footerLink={{
        text: 'Already have an account?',
        href: '/auth/login',
        linkText: 'Sign in',
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Error Message */}
        {error && (
          <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 flex gap-3">
            <Icon name="x" size={16} className="text-red-500 flex-shrink-0" />
            <p className="text-sm text-red-200">{error}</p>
          </div>
        )}

        {/* Name */}
        <FormInput
          label="Full Name"
          type="text"
          placeholder="John Doe"
          {...register('name')}
          error={errors.name}
        />

        {/* Email */}
        <FormInput
          label="Email Address"
          type="email"
          placeholder="you@example.com"
          {...register('email')}
          error={errors.email}
        />

        {/* Password */}
        <FormInput
          label="Password"
          type="password"
          placeholder="••••••••"
          {...register('password')}
          error={errors.password}
          helperText="At least 8 characters, 1 uppercase letter, and 1 number"
        />

        {/* Confirm Password */}
        <FormInput
          label="Confirm Password"
          type="password"
          placeholder="••••••••"
          {...register('confirmPassword')}
          error={errors.confirmPassword}
        />

        {/* Terms Checkbox */}
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            required
            className="mt-1 rounded-md"
          />
          <span className="text-xs text-[var(--fg-2)]">
            I agree to the{' '}
            <a href="#" className="text-[var(--brand-blue)] hover:underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-[var(--brand-blue)] hover:underline">
              Privacy Policy
            </a>
          </span>
        </label>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="btn btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Creating account...' : 'Create Account'}
        </button>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[var(--line)]" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-[var(--bg-2)] text-[var(--fg-3)]">
              Or sign up with
            </span>
          </div>
        </div>

        {/* Social Login (Placeholder) */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            className="btn btn-secondary"
            disabled
          >
            <Icon name="globe" size={16} />
            Google
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            disabled
          >
            <Icon name="code" size={16} />
            GitHub
          </button>
        </div>
      </form>
    </AuthLayout>
  );
}
