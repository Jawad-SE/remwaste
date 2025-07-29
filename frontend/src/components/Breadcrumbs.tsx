"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function Breadcrumbs({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <nav
      className="flex items-center text-sm text-gray-600 mb-6"
      aria-label="Breadcrumb"
    >
      {items.map((item, idx) => (
        <span key={idx} className="flex items-center">
          {idx > 0 && (
            <ChevronRight
              data-testid="chevron-right"
              className="w-4 h-4 mx-1 text-gray-400"
            />
          )}
          {item.href ? (
            <Link href={item.href} className="hover:underline text-blue-600">
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-800">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
