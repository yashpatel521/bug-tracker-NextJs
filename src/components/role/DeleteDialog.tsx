"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Icons } from "../ui/icons";
import { customToast } from "@/lib/utils";
import { deleteRole, deleteSubRole } from "@/action/role";

export function DeleteRoleDialog({ id, type }: { id: number; type: string }) {
  const CrossCircleIcon = Icons["CrossCircle"];
  const handleDelete = async () => {
    try {
      if (type == "role") await deleteRole(id);
      if (type == "subRole") await deleteSubRole(id);
      customToast(`Deleted ${type} successfully`, "success");
    } catch (error: any) {
      customToast(error.message, "error");
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <CrossCircleIcon />
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete</DialogTitle>
          <DialogDescription>
            {`Are you sure you want to delete the ${type}?`}
          </DialogDescription>
        </DialogHeader>

        <Button onClick={handleDelete} variant="destructive">
          Delete
        </Button>
      </DialogContent>
    </Dialog>
  );
}
