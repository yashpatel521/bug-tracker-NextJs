import { TableCell, TableRow } from "@/components/ui/table";
import React from "react";

export default function BugSkeletonTable() {
  return (
    <>
      {Array.from({ length: 10 }, (_, index) => (
        <TableRow key={index}>
          <TableCell>
            <div className="h-4 bg-gray-400 rounded animate-pulse"></div>
          </TableCell>
          <TableCell>
            <div className="w-[400px] h-4 bg-gray-400 rounded animate-pulse"></div>
          </TableCell>
          <TableCell>
            <div className="h-4 bg-gray-400 rounded animate-pulse"></div>
          </TableCell>
          <TableCell>
            <div className="h-4 bg-gray-400 rounded animate-pulse"></div>
          </TableCell>
          <TableCell>
            <div className="h-4 bg-gray-400 rounded animate-pulse"></div>
          </TableCell>
          <TableCell>
            <div className="h-4 bg-gray-400 rounded animate-pulse"></div>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}
