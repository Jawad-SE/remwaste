'use client';

import UserMenu from '@/components/UserMenu';

export default function Navbar({ title }: { title?: string }) {
  return (
    <header className="flex items-center justify-between bg-white border-b h-16 px-6 shadow-sm">
      <h1 className="text-xl font-bold text-gray-800">{title || 'Dashboard'}</h1>
      <UserMenu />
    </header>
  );
}
