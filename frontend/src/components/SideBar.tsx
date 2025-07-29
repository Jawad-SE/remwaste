'use client';

import Link from 'next/link';
import { User, ChevronLeft } from 'lucide-react';
import { useState } from 'react';

const NAV_ITEMS = [
  { label: 'Patients', href: '/patients', icon: User },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`flex flex-col bg-white border-r transition-all ${
        collapsed ? 'w-16' : 'w-56'
      }`}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b">
        {!collapsed && <span className="text-xl font-bold text-blue-600">REMWASTE</span>}
        <button
          onClick={() => setCollapsed((c) => !c)}
          className="p-1 rounded hover:bg-gray-100"
        >
          <ChevronLeft
            className={`w-5 h-5 transform transition-transform ${
              collapsed ? 'rotate-180' : ''
            }`}
          />
        </button>
      </div>

      <nav className="flex-1 px-2 py-4 space-y-1">
        {NAV_ITEMS.map(({ label, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`
              flex items-center gap-3 px-3 py-2 rounded
              hover:bg-gray-100 transition
              ${collapsed ? 'justify-center' : ''}
            `}
          >
            <Icon className="w-5 h-5 text-gray-600" />
            {!collapsed && <span className="text-gray-800">{label}</span>}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
