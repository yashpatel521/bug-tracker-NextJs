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
import { DeleteRoleDialog } from "./DeleteDialog";
const SubRoleTable = async () => {
  const subRolesData = await getAllSubRole();
  return (
    <ScrollArea className="h-96 w-full">
      <Table className="p-0 m-0 border">
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Index</TableHead>
            <TableHead>Roles</TableHead>
            <TableHead>Sub Roles</TableHead>
            <TableHead className="text-center">Created At</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subRolesData.map((item: SubRole, index: number) => (
            <TableRow key={item.id}>
              <TableCell className="capitalize text-center">
                {++index}
              </TableCell>
              <TableCell className="text-center capitalize">
                {item.role.name}
              </TableCell>
              <TableCell className="text-center capitalize">
                {item.name}
              </TableCell>
              <TableCell className="capitalize text-center">
                {new Date(item.createdAt).toLocaleString()}
              </TableCell>
              <TableCell className="flex justify-center align-middle  items-center cursor-pointer">
                <DeleteRoleDialog id={+item.id} type="subRole" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
};

export default SubRoleTable;
