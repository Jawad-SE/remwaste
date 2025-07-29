'use client';

import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';
import { FieldError } from 'react-hook-form';

export default function PatientPhoneInput({
  value,
  onChange,
  error,
}: {
  value: string;
  onChange: (val: string) => void;
  error?: FieldError;
}) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">
        Phone Number
      </label>

      <PhoneInput
        country={'us'}
        value={value}
        onChange={onChange}
        enableSearch={false}
        inputStyle={{
          width: '100%',
          height: '48px',
          borderRadius: '0.5rem',
          border: '1px solid #d1d5db',
          paddingLeft: '80px',
          fontSize: '0.875rem',
          boxShadow: 'none',
        }}
        buttonStyle={{
          borderRight: '1px solid #d1d5db',
          backgroundColor: '#ffffff',
          borderTopLeftRadius: '0.5rem',
          borderBottomLeftRadius: '0.5rem',
          padding: '0 12px',
        }}
        containerStyle={{
          width: '100%',
          borderRadius: '0.5rem',
          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
        }}
        dropdownStyle={{
          maxHeight: '300px',
          borderRadius: '0.5rem',
          overflowY: 'auto',
          zIndex: 9999,
          width: '280px',
        }}
      />

      {error && <p className="text-red-500 text-xs">{error.message}</p>}
    </div>
  );
}
