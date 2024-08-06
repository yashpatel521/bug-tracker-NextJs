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
import TogglePinProjectButton from "../TogglePinProjectButton";

const ProjectTableView = ({ data }: { data: ProjectDetails[] }) => {
  return (
    <Table className="border">
      <TableHeader>
        <TableRow>
          <TableHead>App ID</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Developers Account</TableHead>
          <TableHead>Team Members</TableHead>
          <TableHead className="text-center">Pin/UnPin</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.id}</TableCell>
            <TableCell className="font-medium">
              <Link href={`./projects/${item.id}`}>
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
              </Link>
            </TableCell>
            <TableCell>{item.developer || "-"}</TableCell>
            <TableCell>
              <AvatarList
                avatarList={item.userProjects?.map((i) => i.user) ?? []}
              />
            </TableCell>
            <TableCell className="text-center">
              <TogglePinProjectButton id={+item.id} isPinned={!item.isPinned} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ProjectTableView;
