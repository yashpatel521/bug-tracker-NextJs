"use client";
import { ProjectDetails, User } from "@/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "../ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import EditProjectMembers from "./EditProjectMembers";
import { useState } from "react";
import { updateProjectMember } from "@/action/projects";
import { customToast } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const ProjectMemberTable = ({
  projectData,
  allUser,
}: {
  projectData: ProjectDetails;
  allUser: {
    totalPages: number;
    users: User[];
  };
}) => {
  const { data } = useSession();
  const router = useRouter();
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>(
    projectData.userProjects?.map((userProject) =>
      userProject.user.id.toString()
    ) ?? []
  );
  if (!data) return null;
  const user = data.user;

  const handleCheckChange = (e: React.FormEvent<HTMLButtonElement>) => {
    const userId = e.currentTarget.value;
    const isChecked = selectedUserIds.includes(userId);

    if (!isChecked) {
      setSelectedUserIds((prev) => [...prev, userId]);
    } else {
      setSelectedUserIds((prev) => prev.filter((id) => id !== userId));
    }
  };

  const handleAddMembers = async () => {
    try {
      await updateProjectMember(projectData.id, selectedUserIds);
      customToast("Members added successfully", "success");
      router.replace(`/dashboard/projects/${projectData.id}`);
    } catch (error: any) {
      customToast(error.message, "error");
    }
  };

  return (
    <>
      <EditProjectMembers
        totalPages={allUser.totalPages}
        handleAddMembers={handleAddMembers}
      />
      <ScrollArea className="max-h-[500px] border">
        <Table className="p-0 m-0 border">
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Index</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allUser.users.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-gray-500">
                  No User Found
                </TableCell>
              </TableRow>
            )}
            {allUser.users &&
              allUser.users.map((item: User, index: number) => {
                const isUserAssigned = selectedUserIds.includes(
                  item.id.toString()
                );
                return (
                  <TableRow key={item.id}>
                    <TableCell className="capitalize text-center">
                      {index + 1}
                    </TableCell>
                    <TableCell className="text-center font-medium flex items-center align-middle gap-2 capitalize">
                      <Avatar className="h-6 w-6 my-2">
                        <AvatarImage src={item.profile} alt={"avatar"} />
                        <AvatarFallback>
                          {item.firstName[0]}
                          {item.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="ml-2">
                        {item.firstName} {item.lastName}
                      </div>
                    </TableCell>
                    <TableCell className="capitalize text-center">
                      {item.status}
                    </TableCell>
                    <TableCell className="flex justify-center align-middle py-0 items-center cursor-pointer">
                      <Checkbox
                        checked={isUserAssigned}
                        onClick={handleCheckChange}
                        value={item.id.toString()}
                        id={`user-${item.id}`}
                        disabled={user.id === item.id}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </ScrollArea>
    </>
  );
};

export default ProjectMemberTable;
