'use client';

import { useEffect } from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import PatientForm from '@/components/patients/PatientForm';
import { useCreatePatient } from '@/hooks/usePatients';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { PatientFormData } from '@/types/patient';
import { useAdminGuard } from '@/hooks/useAdminGuard';

export default function CreatePatientPage() {
  const { mutate } = useCreatePatient();
  const router = useRouter();

  const role = useAdminGuard();

  useEffect(() => {
    if (role && role !== 'admin') {
      toast.error('Not authorized');
      router.replace('/patients'); // Redirect target
    }
  }, [role, router]);

  if (role && role !== 'admin') {
    // While redirecting, render nothing
    return null;
  }

  const handleCreate = (data: PatientFormData) => {
    mutate(data, {
      onSuccess: () => {
        toast.success('Patient created!');
        router.push('/patients');
      },
      onError: () => toast.error('Error creating patient'),
    });
  };

  return (
    <div className="space-y-4">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Patients', href: '/patients' },
          { label: 'Add Patient' },
        ]}
      />

      <div className="max-w-2xl mx-auto">
        <div className="bg-gradient-to-br from-white via-blue-50 to-blue-100 p-8 rounded-xl shadow-lg transition-all duration-300">
          <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
            Add New Patient
          </h1>
          <PatientForm onSubmit={handleCreate} />
        </div>
      </div>
    </div>
  );
}
