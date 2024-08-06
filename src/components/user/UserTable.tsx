import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import SortButton from "../ui/sortButton";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { Icons } from "../ui/icons";
import { User } from "@/types";

const UserTable = async ({ users }: { users: User[] }) => {
  const EyeIcon = Icons["Eye"];
  return (
    <Table className="text-center border">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">User ID</TableHead>
          <TableHead className="text-center w-[400px]">Name</TableHead>
          <TableHead className="text-center w-[400px]">Email</TableHead>
          <TableHead className="text-center">
            <SortButton title="Role" sortKey="role" />
          </TableHead>
          <TableHead className="text-center">
            <SortButton title="SubRole" sortKey="subRole" />
          </TableHead>
          <TableHead className="text-center">
            <SortButton title="status" sortKey="status" />
          </TableHead>
          <TableHead className="text-center">Projects Assigned</TableHead>
          <TableHead className="text-center">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((item: User) => (
          <TableRow key={item.id}>
            <TableCell>{item.id}</TableCell>
            <TableCell className="flex items-center justify-center">
              <Avatar className="h-6 w-6 my-2">
                <AvatarImage src={item.profile} alt={"avatar"} />
                <AvatarFallback>
                  {item.firstName} {item.lastName}
                </AvatarFallback>
              </Avatar>
              <div className="ml-2">
                {item.firstName} {item.lastName}
              </div>
            </TableCell>
            <TableCell>{item.email}</TableCell>
            <TableCell>{item.role?.name}</TableCell>
            <TableCell>{item.subRole?.name}</TableCell>
            <TableCell>{item.status}</TableCell>
            <TableCell>{item.projectAssigned}</TableCell>
            <TableCell className="flex justify-center">
              <Link href={`./user/${item.id}`}>
                <EyeIcon />
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UserTable;
