import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";

export default function BugSkeletonTable() {
  return (
    <>
      <Table className="border">
        <TableHeader>
          <TableRow>
            <TableHead>
              <div className="h-4 bg-gray-400 rounded animate-pulse"></div>
            </TableHead>
            <TableHead className="text-left">
              <div className="h-4 bg-gray-400 rounded animate-pulse"></div>
            </TableHead>
            <TableHead className="text-center">
              <div className="h-4 bg-gray-400 rounded animate-pulse"></div>
            </TableHead>
            <TableHead className="text-center">
              <div className="h-4 bg-gray-400 rounded animate-pulse"></div>
            </TableHead>
            <TableHead className="text-center">
              <div className="h-4 bg-gray-400 rounded animate-pulse"></div>
            </TableHead>
            <TableHead className="text-center">
              <div className="h-4 bg-gray-400 rounded animate-pulse"></div>
            </TableHead>
            <TableHead className="text-center">
              <div className="h-4 bg-gray-400 rounded animate-pulse"></div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 5 }, (_, index) => (
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
        </TableBody>
        <TableCaption>
          <div className="h-4 bg-gray-400 rounded animate-pulse"></div>
        </TableCaption>
      </Table>
    </>
  );
}
