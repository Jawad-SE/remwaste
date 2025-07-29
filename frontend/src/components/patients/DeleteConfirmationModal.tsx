'use client';

import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Trash2 } from 'lucide-react';

export default function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-50">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" aria-hidden="true" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel
              className="relative max-w-sm w-full rounded-2xl border border-red-100 shadow-xl
              bg-gradient-to-br from-white via-red-50 to-white p-6 transition-all duration-300
              hover:from-white hover:via-red-100 hover:to-white"
            >
              {/* Trash icon in gradient circle */}
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center shadow-lg">
                <Trash2 className="w-8 h-8 text-white" />
              </div>

              <Dialog.Title className="text-xl font-bold text-center text-gray-800 mb-2">
                Confirm Deletion
              </Dialog.Title>

              <Dialog.Description className="text-sm text-center text-gray-600 mb-6">
                Are you sure you want to delete this patient? This action cannot be undone.
              </Dialog.Description>

              <div className="flex justify-center gap-4">
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 shadow-sm transition"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    onConfirm();
                    onClose();
                  }}
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-red-500 to-red-600 text-white font-medium shadow hover:from-red-600 hover:to-red-700 transition"
                >
                  Delete
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
