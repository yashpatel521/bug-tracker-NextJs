import { getAllSubRole } from "@/action/role";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SubRole } from "@/types";
const SubRoleTable = async () => {
  const subRolesData = await getAllSubRole();
  return (
    <ScrollArea className="h-96 w-full">
      <Table className="p-0 m-0 border">
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Index</TableHead>
            <TableHead>Sub Roles</TableHead>
            <TableHead className="text-center">Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subRolesData.map((item: SubRole, index: number) => (
            <TableRow key={item.id}>
              <TableCell className="capitalize text-center">
                {++index}
              </TableCell>
              <TableCell className="text-center font-medium flex items-center align-middle gap-2 capitalize">
                {item.name}
              </TableCell>
              <TableCell className="capitalize text-center">
                {new Date(item.createdAt).toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
};

export default SubRoleTable;
