"use client";

import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

export default function PaginationBar({
  currentPage,
  totalPages,
  setCurrentPage,
  pageSize,
  setPageSize,
}: {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (val: number) => void;
  pageSize: number;
  setPageSize: (val: number) => void;
}) {
  const PAGE_SIZE_OPTIONS = [5, 10, 20, 50];

  const getPages = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, "...", totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(
          1,
          "...",
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }
    return pages;
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center border-t bg-gray-50 px-4 py-3 text-sm rounded-b-lg">
      <div className="flex items-center gap-2 mb-2 sm:mb-0">
        <span className="text-gray-600">Rows per page:</span>
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
          className="border border-gray-300 bg-white rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {PAGE_SIZE_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          className={`flex items-center gap-1 px-3 py-1 border rounded-md text-sm transition ${
            currentPage === 1
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </button>

        {getPages().map((p, idx) =>
          typeof p === "number" ? (
            <button
              key={idx}
              onClick={() => setCurrentPage(p)}
              className={`px-3 py-1 rounded-md border transition ${
                p === currentPage
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {p}
            </button>
          ) : (
            <span key={idx} className="px-3 py-1 text-gray-500">
              <MoreHorizontal className="w-4 h-4" data-testid="ellipsis" />
            </span>
          )
        )}

        <button
          onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
          className={`flex items-center gap-1 px-3 py-1 border rounded-md text-sm transition ${
            currentPage === totalPages
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
