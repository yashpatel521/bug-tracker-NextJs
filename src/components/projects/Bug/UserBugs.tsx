"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { useDebouncedCallback } from "use-debounce";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SortButton from "@/components/ui/sortButton";
import { getUserBugs } from "@/action/bug";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { getInitials, truncateWords } from "@/lib/utils";
import { FeatureBadge, PriorityBadge, StatusBadge } from "./tableProps";
import AvatarList from "@/components/ui/AvatarList";

export const UserBugs = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [userbugs, setUserBugs] = useState([]);
  const currentPage = parseInt(searchParams?.get("currentPage") || "1", 10);

  const params = new URLSearchParams(searchParams.toString());

  const handleSearch = useDebouncedCallback((term: string) => {
    params.set("currentPage", "1");
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const handlePrevious = () => {
    const page = currentPage;
    if (page > 1) {
      params.set("currentPage", (page - 1).toString());
      replace(`${pathname}?${params.toString()}`);
    }
  };

  const handleNext = () => {
    const page = currentPage;
    if (page < 10) {
      params.set("currentPage", (page + 1).toString());
      replace(`${pathname}?${params.toString()}`);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const bugsData = await getUserBugs(); // Make sure this respects searchParams
      setUserBugs(bugsData);
    };
    fetchData();
  }, [searchParams]);

  return (
    <>
      <div className="flex items-center justify-between">
        <Input
          placeholder="Search bugs..."
          className="max-w-sm"
          onChange={(e) => handleSearch(e.target.value)}
          defaultValue={searchParams?.get("query")?.toString()}
        />
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrevious}
            disabled={currentPage <= 1}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNext}
            disabled={currentPage >= 10}
          >
            Next
          </Button>
        </div>
      </div>

      <Table className="border">
        <TableHeader>
          <TableRow>
            <TableHead>
              <SortButton title="ID" sortKey="id" />
            </TableHead>
            <TableHead className="text-left">Title</TableHead>
            <TableHead className="text-center">Type</TableHead>
            <TableHead className="text-center">
              <SortButton title="Status" sortKey="status" />
            </TableHead>
            <TableHead className="text-center">
              <SortButton title="Priority" sortKey="priority" />
            </TableHead>
            <TableHead className="text-center">Created By</TableHead>
            <TableHead className="text-center">Assigned To</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {userbugs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center text-gray-500">
                No bugs found.
              </TableCell>
            </TableRow>
          ) : (
            userbugs.map((bug: any, i: number) => (
              <TableRow key={bug.id}>
                <TableCell>{++i}</TableCell>
                <TableCell>
                  <div className="flex">
                    <span className="sm:max-w-[100px] md:max-w-96 font-medium break-words">
                      {truncateWords(bug.title)}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <FeatureBadge s={bug.type} />
                </TableCell>
                <TableCell>
                  <StatusBadge s={bug.status} />
                </TableCell>
                <TableCell>
                  <PriorityBadge s={bug.priority} />
                </TableCell>
                <TableCell className="font-medium flex items-center justify-center gap-2 capitalize">
                  <Avatar className="h-6 w-6 my-2">
                    <AvatarImage
                      src={bug.reportedBy.profile}
                      alt={`${bug.reportedBy.firstName} ${bug.reportedBy.lastName}`}
                    />
                    <AvatarFallback>
                      {getInitials(
                        bug.reportedBy.firstName,
                        bug.reportedBy.lastName
                      )}
                    </AvatarFallback>
                  </Avatar>
                  {bug.reportedBy.firstName} {bug.reportedBy.lastName}
                </TableCell>
                <TableCell>
                  <div className="flex justify-center">
                    <AvatarList avatarList={bug.assignedTo ?? []} />
                  </div>
                </TableCell>
                <TableCell className="flex justify-center">
                  {/* <BugSheet id={bug.id} userProjects={[]} /> */}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
        <TableCaption>{`Page ${currentPage}`}</TableCaption>
      </Table>
    </>
  );
};
