"use client";

import { Fragment } from "react";
import { Patient } from "@/types/patient";
import { Menu, Transition } from "@headlessui/react";
import { MoreVertical, Edit2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRole } from "@/hooks/useRole";

export default function PatientRow({
  patient,
  onClick,
  onDelete,
  rowIndex,
}: {
  patient: Patient;
  onClick: () => void;
  onDelete: (id: number) => void;
  rowIndex: number;
}) {
  const router = useRouter();
  const role = useRole();

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/patients/${patient.id}/edit`);
  };

  return (
    <tr
      className={`${
        rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"
      } hover:bg-gradient-to-r from-blue-50 via-white to-blue-50 transition-all duration-200 cursor-pointer rounded-lg`}
      onClick={onClick}
    >
      <td className="px-4 py-3 text-sm font-medium text-gray-800">
        {patient.id}
      </td>
      <td className="px-4 py-3 text-sm text-gray-900">{patient.firstName}</td>
      <td className="px-4 py-3 text-sm text-gray-900">{patient.lastName}</td>
      <td className="px-4 py-3 text-sm text-blue-700 underline">
        {patient.email}
      </td>
      <td className="px-4 py-3 text-sm text-gray-700">{patient.phoneNumber}</td>
      <td className="px-4 py-3 text-sm text-gray-700">
        {new Date(patient.dob).toLocaleDateString()}
      </td>

      {role === "admin" && (
        <td className="px-4 py-3 text-right">
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button
                onClick={(e) => e.stopPropagation()}
                aria-label="Actions"
                className="inline-flex justify-center items-center w-8 h-8 rounded-full hover:bg-gray-200 transition"
              >
                <MoreVertical className="w-5 h-5 text-gray-600" />
              </Menu.Button>
              ˝
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-50 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={handleEdit}
                        className={`${
                          active ? "bg-blue-50 text-blue-700" : "text-gray-700"
                        } flex items-center gap-2 w-full px-4 py-2 text-sm`}
                      >
                        <Edit2 className="w-4 h-4" /> Edit
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete(patient.id);
                        }}
                        className={`${
                          active ? "bg-red-50 text-red-700" : "text-red-600"
                        } flex items-center gap-2 w-full px-4 py-2 text-sm`}
                      >
                        <Trash2 className="w-4 h-4" /> Delete
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </td>
      )}
    </tr>
  );
}
