'use client';

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleStart = () => {
    router.push('/patients');
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-4">Welcome to Patient Manager</h1>
      <p className="mb-8 text-gray-700 text-center">
        Easily manage patient records, add new patients, and keep everything organized in one place.
      </p>
      <button
        onClick={handleStart}
        className="px-6 py-3 bg-blue-600 text-white rounded-xl text-lg font-semibold hover:bg-blue-700 transition"
      >
        Start Managing Patients
      </button>
    </main>
  );
}
