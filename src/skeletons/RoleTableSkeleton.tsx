import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
const RoleTableSkeleton = () => {
  return (
    <div>
      <Table className="p-0 m-0 border">
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Index</TableHead>
            <TableHead>Roles</TableHead>
            <TableHead className="text-center">Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...Array(2)].map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <div className="bg-gray-200 h-4 rounded mx-auto"></div>
              </TableCell>
              <TableCell>
                <div className="bg-gray-200 h-4 rounded mx-auto"></div>
              </TableCell>
              <TableCell>
                <div className="bg-gray-200 h-4 rounded mx-auto"></div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RoleTableSkeleton;
