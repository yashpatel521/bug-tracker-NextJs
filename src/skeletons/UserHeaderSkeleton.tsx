import React from "react";
import { Separator } from "@/components/ui/separator";

export const UserHeaderSkeleton = () => {
  return (
    <>
      <div className="flex items-center justify-between animate-pulse">
        <div>
          <div className="bg-gray-200 h-6 w-32 mb-2 rounded"></div>
          <div className="bg-gray-200 h-4 w-24 rounded"></div>
        </div>
        <div className="bg-gray-200 h-10 w-10 rounded"></div>
      </div>
      <Separator />
    </>
  );
};
