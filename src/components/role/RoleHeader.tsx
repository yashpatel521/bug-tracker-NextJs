import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import React from "react";
import { Heading } from "../ui/heading";

const RoleHeader = () => {
  const AddUser = Icons["UserPlus"];

  return (
    <div>
      <div className="flex items-center justify-between pb-2">
        <Heading
          title="Roles & Sub Roles"
          description="Manage Roles and Sub Roles "
        />
        <Button className="text-xs md:text-sm  hover:bg-transparent bg-transparent">
          <Link href="./role/add">
            <AddUser height="40" width="40" />
          </Link>
        </Button>
      </div>
      <Separator />
    </div>
  );
};

export default RoleHeader;
