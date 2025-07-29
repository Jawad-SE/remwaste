'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md text-center bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-5xl font-bold text-blue-600 mb-4">404</h1>
        <p className="text-gray-700 text-lg mb-6">
          Oops! The page you&apos;re looking for does not exist.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 transition"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </button>
          <Link
            href="/"
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
