'use client';

import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

export default function FormInput({
  type = 'text',
  placeholder,
  register,
  error,
}: {
  type?: string;
  placeholder: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
}) {
  return (
    <div className="space-y-1">
      <input
        type={type}
        placeholder={placeholder}
        {...register}
        className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ${
          error ? 'border-red-400' : 'border-gray-300'
        }`}
      />
      {error && <p className="text-red-500 text-xs">{error.message}</p>}
    </div>
  );
}
