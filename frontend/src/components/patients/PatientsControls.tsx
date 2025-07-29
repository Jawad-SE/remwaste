'use client';

import Link from 'next/link';
import { Patient } from '@/types/patient';
import { ArrowUp, ArrowDown, ChevronDown, Check, Plus } from 'lucide-react';
import { Listbox, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useRole } from '@/hooks/useRole';

const SORT_FIELDS: { value: keyof Patient; label: string }[] = [
  { value: 'firstName', label: 'First Name' },
  { value: 'lastName', label: 'Last Name' },
  { value: 'email', label: 'Email' },
];

export default function PatientsControls({
  search,
  setSearch,
  sortField,
  setSortField,
  sortOrder,
  setSortOrder,
}: {
  search: string;
  setSearch: (val: string) => void;
  sortField: keyof Patient;
  setSortField: (f: keyof Patient) => void;
  sortOrder: 'asc' | 'desc';
  setSortOrder: React.Dispatch<React.SetStateAction<'asc' | 'desc'>>;
}) {
  const role = useRole();

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
      <h1 className="text-3xl font-bold text-gray-800">Patients</h1>

      <div className="flex flex-wrap items-center gap-3 bg-white p-4 rounded-xl shadow-sm border border-gray-100 transition hover:shadow-md">
        <input
          type="text"
          placeholder="Search by name or email"
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm w-64"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="relative w-48">
          <Listbox value={sortField} onChange={setSortField}>
            <div className="relative">
              <Listbox.Button className="relative w-full border border-gray-300 rounded-md px-3 py-2 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 flex justify-between items-center text-sm bg-white">
                <span>
                  {SORT_FIELDS.find((f) => f.value === sortField)?.label}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </Listbox.Button>

              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto focus:outline-none">
                  {SORT_FIELDS.map((field) => (
                    <Listbox.Option
                      key={field.value}
                      value={field.value}
                      className={({ active }) =>
                        `cursor-pointer select-none relative px-4 py-2 ${
                          active ? 'bg-blue-50 text-blue-900' : 'text-gray-900'
                        }`
                      }
                    >
                      {({ selected }) => (
                        <div className="flex items-center justify-between">
                          <span className={selected ? 'font-semibold' : 'font-normal'}>
                            {field.label}
                          </span>
                          {selected && <Check className="w-4 h-4 text-blue-600" />}
                        </div>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>

        <button
          onClick={() => setSortOrder((o) => (o === 'asc' ? 'desc' : 'asc'))}
          className="inline-flex items-center justify-center border border-gray-300 rounded-md px-2 py-2 hover:bg-gray-50 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Toggle sort order"
        >
          {sortOrder === 'asc' ? (
            <ArrowUp className="w-4 h-4 text-gray-600" />
          ) : (
            <ArrowDown className="w-4 h-4 text-gray-600" />
          )}
        </button>
        {role === 'admin' && (
          <Link
            href="/patients/create"
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition text-sm font-medium ml-auto"
          >
            <Plus className="w-4 h-4" />
            Add Patient
          </Link>
        )}
      </div>
    </div>
  );
}
