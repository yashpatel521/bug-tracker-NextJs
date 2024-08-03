import React from "react";

const SearchInputSkeleton = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="bg-gray-400 animate-pulse h-10 w-full max-w-sm rounded"></div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="bg-gray-400 animate-pulse h-8 w-20 rounded"></div>
        <div className="bg-gray-400 animate-pulse h-8 w-20 rounded"></div>
      </div>
    </div>
  );
};

export default SearchInputSkeleton;
