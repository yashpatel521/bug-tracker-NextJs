"use client";

import { getBugDetailsData } from "@/action/bug";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Bug, UserProject } from "@/types";
import React, { useEffect, useState } from "react";
import BugDetailsHeader from "./BugDetailsHeader";
import BugDetailsForm from "./BugDetailsForm";

const BugSheet = ({
  id,
  userProjects,
}: {
  id: number;
  userProjects: UserProject[];
}) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [bugData, setBugData] = useState<Bug>();

  useEffect(() => {
    const fetchBugData = async () => {
      const data = await getBugDetailsData(id);
      setBugData(data);
    };

    if (isSheetOpen) {
      fetchBugData();
    }
  }, [isSheetOpen, id]);
  return (
    <Sheet
      onOpenChange={(e) => {
        setIsSheetOpen(e);
      }}
    >
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="bg-teal-400 mx-auto"
          aria-label={`View details for bug ${id}`}
        >
          Edit
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="md:rounded-lg md:shadow-lg md:w-2/3 sm:w-full"
      >
        <ScrollArea className="h-full w-full">
          <div className="h-full w-full p-2">
            {bugData && (
              <>
                <SheetHeader className="border-b pb-4">
                  <BugDetailsHeader bugDetails={bugData} />
                </SheetHeader>
                <BugDetailsForm bugData={bugData} userProjects={userProjects} />
              </>
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default BugSheet;
