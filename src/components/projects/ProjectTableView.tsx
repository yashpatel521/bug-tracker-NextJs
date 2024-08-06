import { ProjectDetails } from "@/types";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import Image from "next/image";
import AvatarList from "../ui/AvatarList";
import Link from "next/link";
import { Icons } from "../ui/icons";

const ProjectTableView = ({ data }: { data: ProjectDetails[] }) => {
  const EyeIcon = Icons["Eye"];
  return (
    <Table className="border">
      <TableHeader>
        <TableRow>
          <TableHead>App ID</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Developers Account</TableHead>
          <TableHead>Team Members</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.id}</TableCell>
            <TableCell className="font-medium">
              <div className="flex  items-center gap-2">
                <Image
                  src={item.appIcon}
                  width={40}
                  height={40}
                  alt="icon"
                  className="rounded-full w-10 h-10"
                  unoptimized={true}
                />
                <div className="capitalize">{item.title}</div>
              </div>
            </TableCell>
            <TableCell>{item.developer || "-"}</TableCell>
            <TableCell>
              <AvatarList
                avatarList={item.userProjects?.map((i) => i.user) ?? []}
              />
            </TableCell>
            <TableCell>
              <Link href={`./projects/${item.id}`}>
                <EyeIcon />
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ProjectTableView;
