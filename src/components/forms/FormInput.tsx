'use client';

import React from 'react';
import { FieldError } from 'react-hook-form';

interface FormInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: FieldError;
  helperText?: string;
  fullWidth?: boolean;
}

export function FormInput({
  label,
  error,
  helperText,
  fullWidth = true,
  className = '',
  ...props
}: FormInputProps) {
  return (
    <div className={fullWidth ? 'w-full' : ''}>
      {label && (
        <label className="block text-sm font-medium text-[var(--fg-0)] mb-2">
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        className={`input ${error ? 'border-red-500 focus:border-red-500' : ''} ${className}`}
        {...props}
      />
      {error && (
        <p className="text-xs text-red-500 mt-1">{error.message}</p>
      )}
      {!error && helperText && (
        <p className="text-xs text-[var(--fg-3)] mt-1">{helperText}</p>
      )}
    </div>
  );
}
