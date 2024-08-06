import React from "react";
import { Icons } from "@/components/ui/icons";
import { Bug } from "@/types";

const BugDetailsHeader = ({ bugDetails }: { bugDetails: Bug }) => {
  const CalendarDaysIcon = Icons["CalendarDaysIcon"];

  return (
    <div className="flex flex-col items-baseline md:flex-row justify-between">
      <div>
        <div className="flex items-center justify-between md:justify-start">
          <span className="font-semibold text-2xl md:text-4xl text-slate-500">
            {bugDetails.title}
          </span>
          <span className="mx-5 inline-flex items-center rounded-md bg-transparent px-2 py-1 text-xs font-medium text-pink-700 ring-1 ring-inset ring-pink-700/10">
            {bugDetails.priority}
          </span>
        </div>
        <div className="flex flex-row items-baseline gap-1 mt-2 md:mt-0">
          <span className="text-xs text-slate-600">Created By</span>
          <span className="capitalize text-sm text-slate-400">
            {bugDetails.reportedBy.firstName} {bugDetails.reportedBy.lastName}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-4 md:mt-0">
        <div className="flex items-center gap-2">
          <CalendarDaysIcon className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">
            {new Date(bugDetails.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BugDetailsHeader;
