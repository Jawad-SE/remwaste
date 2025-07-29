"use client";

import { Patient } from "@/types/patient";
import PatientRow from "./PatientRow";
import PaginationBar from "./PaginationBar";
import { useRole } from "@/hooks/useRole";

export default function PatientsTable({
  patients,
  onSelect,
  onDelete,
  currentPage,
  totalPages,
  setCurrentPage,
  pageSize,
  setPageSize,
}: {
  patients: Patient[];
  onSelect: (patient: Patient) => void;
  onDelete: (id: number) => void;
  onEdit: (patient: Patient) => void;
  currentPage: number;
  totalPages: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  pageSize: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
}) {
  const role = useRole();

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              ID
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              First Name
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Last Name
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Email
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Phone
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              DOB
            </th>
            {role === 'admin' && (
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {patients.length === 0 ? (
            <tr>
              <td colSpan={role === 'admin' ? 7 : 6} className="py-4 text-center text-gray-500">
                No patients found.
              </td>
            </tr>
          ) : (
            patients.map((p, idx) => (
              <PatientRow
                key={p.id}
                patient={p}
                onClick={() => onSelect(p)}
                onDelete={onDelete}
                rowIndex={idx}
              />
            ))
          )}
        </tbody>
      </table>

      <PaginationBar
        pageSize={pageSize}
        setPageSize={setPageSize}
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
