import { getAllRole } from "@/action/role";
import CreateNewRoleForm from "@/components/role/CreateNewRoleForm";
import CreateNewSubRoleForm from "@/components/role/CreateNewSubRoleForm";
import BreadCrumb from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import React from "react";

const CreateNewRolePage = async () => {
  const breadcrumbItems = [
    { title: "Roles & SubRole", link: "/dashboard/role" },
    { title: "Create New Role/Sub Role", link: "/dashboard/role/add" },
  ];
  const roleData = await getAllRole();
  return (
    <div className="min-h-screen ">
      <div className="space-y-4 p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <Separator />
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          <CreateNewRoleForm />
          <CreateNewSubRoleForm roleData={roleData} />
        </div>
      </div>
    </div>
  );
};

export default CreateNewRolePage;
