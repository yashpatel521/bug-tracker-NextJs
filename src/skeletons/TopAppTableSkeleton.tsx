import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Icons } from "@/components/ui/icons";

const TopAppTableSkeleton = () => {
  const PlayStoreIcon = Icons["PlayStore"];
  return (
    <Table className="p-0 m-0 border">
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">Index</TableHead>
          <TableHead>Title</TableHead>
          <TableHead className="text-center">App Id</TableHead>
          <TableHead className="text-center">Devloper</TableHead>
          <TableHead className="text-center">Rating</TableHead>
          <TableHead className="text-center">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[...Array(5)].map((_, index: number) => (
          <TableRow key={index}>
            <TableCell className="capitalize text-center">{++index}</TableCell>
            <TableCell className="text-center font-medium flex items-center align-middle gap-2 capitalize">
              <Avatar className="h-9 w-9">
                <AvatarImage src="" alt="FB" />
                <AvatarFallback>FB</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground flex gap-2 ">
                  <PlayStoreIcon className="w-4 h-4" />
                </p>
              </div>
            </TableCell>
            <TableCell className="capitalize text-center">
              <div className="bg-gray-200 h-4 rounded mx-auto"></div>
            </TableCell>
            <TableCell className="capitalize text-center">
              <div className="bg-gray-200 h-4 rounded mx-auto"></div>
            </TableCell>
            <TableCell className="capitalize text-center">
              <div className="bg-gray-200 h-4 rounded mx-auto"></div>
            </TableCell>
            <TableCell className="capitalize text-center">
              <div className="bg-gray-200 h-4 rounded mx-auto"></div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TopAppTableSkeleton;
