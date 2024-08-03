import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SortButtonSkeleton from "./SortButtonSkeleton";

const UserTableSkeleton = () => {
  return (
    <div className="text-center animate-pulse">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">
              <div className="animate-pulse bg-gray-200 h-4 w-3/4 mx-auto rounded"></div>
            </TableHead>
            <TableHead className="text-center">
              <div className="animate-pulse bg-gray-200 h-4 w-1/2 mx-auto rounded"></div>
            </TableHead>
            <TableHead className="text-center">
              <SortButtonSkeleton />
            </TableHead>
            <TableHead className="text-center">
              <div className="animate-pulse bg-gray-200 h-4 w-1/2 mx-auto rounded"></div>
            </TableHead>
            <TableHead className="text-center">
              <div className="animate-pulse bg-gray-200 h-4 w-1/4 mx-auto rounded"></div>
            </TableHead>
            <TableHead className="text-center">
              <div className="animate-pulse bg-gray-200 h-4 w-1/4 mx-auto rounded"></div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...Array(5)].map((_, index) => (
            <TableRow key={index}>
              <TableCell className="text-center">
                <div className="bg-gray-200 h-4 w-8 rounded mx-auto"></div>
              </TableCell>
              <TableCell className="text-center">
                <div className="flex items-center justify-center">
                  <div className="bg-gray-200 h-6 w-6 rounded mr-2"></div>
                  <div className="bg-gray-200 h-4 w-24 rounded"></div>
                </div>
              </TableCell>
              <TableCell className="text-center">
                <div className="bg-gray-200 h-4 w-16 rounded mx-auto"></div>
              </TableCell>
              <TableCell className="text-center">
                <div className="bg-gray-200 h-4 w-16 rounded mx-auto"></div>
              </TableCell>
              <TableCell className="text-center">
                <div className="bg-gray-200 h-4 w-8 rounded mx-auto"></div>
              </TableCell>
              <TableCell className="text-center">
                <div className="bg-gray-200 h-6 w-6 rounded mx-auto"></div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserTableSkeleton;
