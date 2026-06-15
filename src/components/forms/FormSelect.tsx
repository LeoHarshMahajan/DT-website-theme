'use client';

import React from 'react';
import { FieldError } from 'react-hook-form';

interface SelectOption {
  value: string;
  label: string;
}

interface FormSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: FieldError;
  helperText?: string;
  options: SelectOption[];
  fullWidth?: boolean;
}

export function FormSelect({
  label,
  error,
  helperText,
  options,
  fullWidth = true,
  className = '',
  ...props
}: FormSelectProps) {
  return (
    <div className={fullWidth ? 'w-full' : ''}>
      {label && (
        <label className="block text-sm font-medium text-[var(--fg-0)] mb-2">
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <select
        className={`select ${error ? 'border-red-500 focus:border-red-500' : ''} ${className}`}
        {...props}
      >
        <option value="">Select an option...</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-xs text-red-500 mt-1">{error.message}</p>
      )}
      {!error && helperText && (
        <p className="text-xs text-[var(--fg-3)] mt-1">{helperText}</p>
      )}
    </div>
  );
}
