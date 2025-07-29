'use client';

import Sidebar from '@/components/SideBar';
import Navbar from '@/components/NavBar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-auto">
        <Navbar />
        <main className="p-6 bg-gray-50 flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
