import { deleteRole, getAllRole } from "@/action/role";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Role } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Icons } from "../ui/icons";
const RoleTable = async () => {
  const rolesData = await getAllRole();
  const Trash2Icon = Icons["trash2"];
  return (
    <ScrollArea className="h-full max-h-96 w-full">
      <Table className="p-0 m-0 border">
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Index</TableHead>
            <TableHead>Roles</TableHead>
            <TableHead className="text-center">Created At</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rolesData.map((item: Role, index: number) => (
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
              <TableCell className="flex justify-center align-middle py-0 items-center cursor-pointer">
                <Dialog>
                  <DialogTrigger asChild>
                    <Trash2Icon className=" text-red-600 mx-auto" />
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Delete</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to delete the Role ?
                      </DialogDescription>
                    </DialogHeader>
                    <form action={deleteRole}>
                      <input type="hidden" name="versionId" value={item.id} />
                      <Button type="submit" variant="destructive">
                        Delete
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
};

export default RoleTable;
