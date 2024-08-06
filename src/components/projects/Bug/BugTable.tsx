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
  const versionId = searchParams.versionId || projectData.versions?.[0].id;
  if (!versionId) return null;

  const bugsData = await getProjectBugsData(
    projectData.id,
    +versionId,
    searchParams.query,
    searchParams.currentPage,
    searchParams.sortBy,
    searchParams.sortOrder
  );
  return (
    <div>
      <BugTableHeader
        versionList={projectData.versions ?? []}
        selectedVersion={+versionId}
        totalPages={bugsData.totalPages}
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
          </TableRow>
        </TableHeader>
        <TableBody>
          {bugsData.bugs.map((bug: Bug) => (
            <TableRow key={bug.id}>
              <TableCell>
                <BugSheet id={bug.id} userProjects={userProjects} />
              </TableCell>

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
            </TableRow>
          ))}
        </TableBody>
        <TableCaption>{`Page ${searchParams.currentPage ?? 1} of ${
          bugsData.totalPages
        } `}</TableCaption>
      </Table>
    </div>
  );
};

export default BugTable;
