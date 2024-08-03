import React from "react";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const SortButtonSkeleton = () => {
  return (
    <div className="animate-pulse">
      <Button
        variant="ghost"
        className="bg-transparent hover:bg-transparent opacity-50 cursor-default"
      >
        <div className="flex items-center">
          <div className="h-4 w-24 bg-gray-300 rounded"></div>
          <ArrowUpDown className="ml-2 h-4 w-4 text-gray-300" />
        </div>
      </Button>
    </div>
  );
};

export default SortButtonSkeleton;
