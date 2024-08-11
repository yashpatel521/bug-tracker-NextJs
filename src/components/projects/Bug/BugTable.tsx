import { getProjectBugsData } from "@/action/projects";
import { Bug, ProjectDetails, UserProject } from "@/types";
import React from "react";
import BugTableHeader from "./BugTableHeader";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getInitials, truncateWords } from "@/lib/utils";
import { FeatureBadge, PriorityBadge, StatusBadge } from "./tableProps";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AvatarList from "@/components/ui/AvatarList";
import SortButton from "@/components/ui/sortButton";
import BugSheet from "./BugSheet";

const BugTable = async ({
  projectData,
  searchParams,
  userProjects,
}: {
  projectData: ProjectDetails;
  userProjects: UserProject[];
  searchParams: {
    query?: string;
    currentPage?: string;
    sortBy?: string;
    sortOrder?: string;
    versionId?: string;
  };
}) => {
  let versionId =
    searchParams.versionId ?? projectData.versions?.[0]?.id.toString() ?? "";
  let bugsData;
  if (versionId) {
    bugsData = await getProjectBugsData(
      projectData.id,
      +versionId,
      searchParams.query,
      searchParams.currentPage,
      searchParams.sortBy,
      searchParams.sortOrder
    );
  }
  return (
    <div>
      <BugTableHeader
        versionList={projectData.versions ?? []}
        selectedVersion={+versionId}
        totalPages={versionId && bugsData ? bugsData.totalPages : 0}
      />

      <Table className="border">
        <TableHeader>
          <TableRow>
            <TableHead>
              <SortButton title="id" sortKey="id" />
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
          {!versionId ||
            (bugsData.bugs.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-gray-500">
                  No bugs found.
                </TableCell>
              </TableRow>
            ))}
          {versionId &&
            bugsData.bugs.map((bug: Bug, i: number) => (
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
                <TableCell className="font-medium flex items-center align-middle justify-center m-auto gap-2 capitalize">
                  <Avatar className="h-6 w-6 my-2 ">
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
                  <div className="flex align-middle justify-center">
                    <AvatarList avatarList={bug.assignedTo ?? []} />
                  </div>
                </TableCell>
                <TableCell className="mx-auto flex  justify-center my-0">
                  <BugSheet id={bug.id} userProjects={userProjects} />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
        <TableCaption>{`Page ${searchParams.currentPage ?? 1} of ${
          versionId && bugsData ? bugsData.totalPages : 0
        } `}</TableCaption>
      </Table>
    </div>
  );
};

export default BugTable;
