'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { PatientFormData } from '@/types/patient';
import FormInput from './FormInput';
import PatientPhoneInput from './PatientPhoneInput';

export default function PatientForm({
  initialData,
  onSubmit,
}: {
  initialData?: PatientFormData;
  onSubmit: (data: PatientFormData) => void;
}) {
  const formatDateForInput = (isoDate: string | undefined) => {
    if (!isoDate) return '';
    return new Date(isoDate).toISOString().split('T')[0];
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<PatientFormData>({
    defaultValues: {
      ...initialData,
      dob: initialData?.dob ? formatDateForInput(initialData.dob) : '',
    },
  });

  const [phoneNumber, setPhoneNumber] = useState(initialData?.phoneNumber || '');

  useEffect(() => {
    if (initialData) {
      setValue('firstName', initialData.firstName);
      setValue('lastName', initialData.lastName);
      setValue('email', initialData.email);
      setValue('dob', formatDateForInput(initialData.dob));
      setPhoneNumber(initialData.phoneNumber || '');
    }
  }, [initialData, setValue]);

  const handleFormSubmit = (data: PatientFormData) => {
    const fullData = {
      ...data,
      phoneNumber,
      dob: new Date(data.dob).toISOString(),
    };
    onSubmit(fullData);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
      <FormInput
        placeholder="First Name"
        register={register('firstName', { required: 'First name is required' })}
        error={errors.firstName}
      />

      <FormInput
        placeholder="Last Name"
        register={register('lastName', { required: 'Last name is required' })}
        error={errors.lastName}
      />

      <FormInput
        type="email"
        placeholder="Email"
        register={register('email', { required: 'Email is required' })}
        error={errors.email}
      />

      <PatientPhoneInput
        value={phoneNumber}
        onChange={setPhoneNumber}
        error={errors.phoneNumber}
      />

      <FormInput
        type="date"
        placeholder="Date of Birth"
        register={register('dob', { required: 'Date of birth is required' })}
        error={errors.dob}
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold shadow hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
      >
        {isSubmitting
          ? initialData
            ? 'Saving…'
            : 'Creating…'
          : initialData
          ? 'Save Changes'
          : 'Create Patient'}
      </button>
    </form>
  );
}
