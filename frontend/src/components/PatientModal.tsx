"use client";

import { Patient } from "@/types/patient";

export default function PatientModal({
  patient,
  onClose,
}: {
  patient: Patient;
  onClose: () => void;
}) {
  const getInitials = (first: string, last: string) => {
    return `${first[0] ?? ""}${last[0] ?? ""}`.toUpperCase();
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="relative w-96 p-6 rounded-2xl border border-blue-100 shadow-xl bg-gradient-to-br from-white via-blue-50 to-white transition-all duration-300 hover:from-white hover:via-blue-100 hover:to-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-4xl font-bold shadow-lg leading-none tracking-tight">
            {getInitials(patient.firstName, patient.lastName)}
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-3 text-center">
          {patient.firstName} {patient.lastName}
        </h2>

        <div className="w-full space-y-2 text-sm">
          <div className="flex items-center justify-between bg-blue-50/60 px-4 py-2 rounded shadow-sm">
            <span className="font-medium text-gray-700">Email:</span>
            <span className="text-blue-600 break-all">{patient.email}</span>
          </div>

          <div className="flex items-center justify-between bg-green-50/60 px-4 py-2 rounded shadow-sm">
            <span className="font-medium text-gray-700">Phone:</span>
            <span className="text-green-700">{patient.phoneNumber}</span>
          </div>

          <div className="flex items-center justify-between bg-yellow-50/60 px-4 py-2 rounded shadow-sm">
            <span className="font-medium text-gray-700">DOB:</span>
            <span className="text-yellow-700">
              {new Date(patient.dob).toLocaleDateString()}
            </span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full inline-flex justify-center rounded-full border border-blue-600 bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-700 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
}
