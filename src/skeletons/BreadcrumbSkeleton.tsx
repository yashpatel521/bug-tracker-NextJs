import React from "react";

export default function BreadCrumbSkeleton() {
  return (
    <div className="mb-4 flex items-center space-x-1 text-sm text-gray-500 animate-pulse">
      <div className="bg-gray-200 h-4 w-24 rounded"></div>
      <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
        <path d="M9 5l7 7-7 7" />
      </svg>
      <div className="bg-gray-200 h-4 w-24 rounded"></div>
    </div>
  );
}
