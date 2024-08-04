import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Icons } from "@/components/ui/icons";
import { Version } from "@/types";
import { dateToString, getInitials } from "@/lib/utils";
import Link from "next/link";

const ProjectVersionHistoryTable = ({
  versions,
  projectId,
}: {
  versions: Version[];
  projectId: number;
}) => {
  const VersionIcon = Icons["FilePlus"];
  const DownloadIcon = Icons["download"];
  return (
    <div className="m-1 col-span-2">
      <Card>
        <CardHeader className="mb-0">
          <CardTitle>
            <div className="flex justify-between items-center mb-2">
              Versions History
              <Link href={`./${projectId}/addVersion`}>
                <VersionIcon className="h-10 w-10" />
              </Link>
            </div>
          </CardTitle>
          <Separator />
        </CardHeader>
        <CardContent className="">
          <ScrollArea className="h-96 w-full">
            <Table className="p-0 m-0">
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center">Index</TableHead>
                  <TableHead>Uploaded By</TableHead>
                  <TableHead className="text-center">Version Name</TableHead>
                  <TableHead className="text-center">Release Date</TableHead>
                  <TableHead className="text-center">Download</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {versions.map((version: Version, index) => (
                  <TableRow key={index}>
                    <TableCell className="capitalize text-center">
                      {++index}
                    </TableCell>
                    <TableCell className="text-center font-medium flex items-center align-middle gap-2 capitalize">
                      <Avatar className="h-6 w-6 my-2 ">
                        <AvatarImage
                          src={version.createdBy.profile}
                          alt={version.createdBy.profile}
                        />
                        <AvatarFallback>
                          {getInitials(
                            `${version.createdBy.firstName} ${version.createdBy.lastName}`
                          )}
                        </AvatarFallback>
                      </Avatar>
                      {`${version.createdBy.firstName} ${version.createdBy.lastName}`}
                    </TableCell>
                    <TableCell className="text-center capitalize">
                      {version.versionNumber}
                    </TableCell>
                    <TableCell className="capitalize text-center">
                      {dateToString(version.createdAt)}
                    </TableCell>
                    <TableCell className="text-center flex justify-center">
                      <a href={version.liveUrl} download target="_blank">
                        <DownloadIcon className="h-8 w-8" />
                      </a>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectVersionHistoryTable;
