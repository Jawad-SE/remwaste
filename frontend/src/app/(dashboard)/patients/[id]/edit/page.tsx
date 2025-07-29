"use client";

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { usePatient, useEditPatient } from "@/hooks/usePatients";
import { PatientFormData } from "@/types/patient";
import { toast } from "react-toastify";
import Breadcrumbs from "@/components/Breadcrumbs";
import PatientForm from "@/components/patients/PatientForm";
import { useAdminGuard } from "@/hooks/useAdminGuard";

export default function EditPatientPage() {
  const { id } = useParams<{ id: string }>();
  const patientId = Number(id);
  const router = useRouter();

  const { data: patient, isLoading } = usePatient(patientId);
  const { mutate } = useEditPatient();

  const role = useAdminGuard();

  // Redirect if not admin
  useEffect(() => {
    if (role && role !== "admin") {
      toast.error("Not authorized");
      router.replace("/patients");
    }
  }, [role, router]);

  if (role && role !== "admin") {
    // Optionally render nothing while redirecting
    return null;
  }

  const handleSave = (data: PatientFormData) => {
    mutate(
      { id: patientId, data },
      {
        onSuccess: () => {
          toast.success("Patient updated!");
          router.push("/patients");
        },
        onError: (error) => {
          console.error(error);
          toast.error("Error updating patient");
        },
      }
    );
  };

  return (
    <div className="space-y-4">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Patients", href: "/patients" },
          { label: "Edit Patient" },
        ]}
      />

      <div className="max-w-2xl mx-auto">
        <div className="bg-gradient-to-br from-white via-blue-50 to-blue-100 p-8 rounded-xl shadow-lg transition-all duration-300">
          <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
            Edit Patient
          </h1>

          {isLoading ? (
            <p className="text-center text-gray-500">Loading patient...</p>
          ) : patient ? (
            <PatientForm initialData={patient} onSubmit={handleSave} />
          ) : (
            <p className="text-center text-red-500">Patient not found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
