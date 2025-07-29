"use client";

import { useState, useMemo } from "react";
import { usePatients, useDeletePatient } from "@/hooks/usePatients";
import { Patient } from "@/types/patient";
import PatientModal from "@/components/PatientModal";
import PatientsControls from "@/components/patients/PatientsControls";
import PatientsTable from "@/components/patients/PatientsTable";
import Breadcrumbs from "@/components/Breadcrumbs";
import DeleteConfirmationModal from "@/components/patients/DeleteConfirmationModal";
import { toast } from "react-toastify";

export default function PatientsPage() {
  const { data: patients = [], isLoading } = usePatients();
  const deleteMutation = useDeletePatient();

  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<keyof Patient>("firstName");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selected, setSelected] = useState<Patient | null>(null);

  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const filtered = useMemo(
    () =>
      patients.filter((p) =>
        `${p.firstName} ${p.lastName} ${p.email}`
          .toLowerCase()
          .includes(search.toLowerCase())
      ),
    [patients, search]
  );

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      const aVal = String(a[sortField]).toLowerCase();
      const bVal = String(b[sortField]).toLowerCase();
      if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
      if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }, [filtered, sortField, sortOrder]);

  const totalPages = Math.ceil(sorted.length / pageSize);
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sorted.slice(start, start + pageSize);
  }, [sorted, currentPage, pageSize]);

  const confirmDelete = (id: number) => setDeleteTargetId(id);
  const performDelete = () => {
    if (deleteTargetId === null) return;
    deleteMutation.mutate(deleteTargetId, {
      onSuccess: () => toast.success("Deleted!"),
      onError: () => toast.error("Error deleting!"),
    });
    setDeleteTargetId(null);
  };

  const handleEdit = (patient: Patient) => {
    toast.info(`Edit patient: ${patient.firstName} ${patient.lastName}`);
  };

  if (isLoading) {
    return (
      <p className="p-6 text-center text-gray-600 text-lg">Loading patients…</p>
    );
  }

  return (
    <div className="space-y-4">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Patients", href: "/patients" },
        ]}
      />

      <PatientsControls
        search={search}
        setSearch={setSearch}
        sortField={sortField}
        setSortField={setSortField}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />

      <PatientsTable
        patients={paginated}
        onSelect={setSelected}
        onDelete={confirmDelete}
        onEdit={handleEdit}
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
      />

      {selected && (
        <PatientModal patient={selected} onClose={() => setSelected(null)} />
      )}

      <DeleteConfirmationModal
        isOpen={deleteTargetId !== null}
        onClose={() => setDeleteTargetId(null)}
        onConfirm={performDelete}
      />
    </div>
  );
}
