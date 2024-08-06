import RoleHeader from "@/components/role/RoleHeader";
import RoleTable from "@/components/role/RoleTable";
import SubRoleTable from "@/components/role/SubRoleTable";
import BreadCrumb from "@/components/ui/breadcrumb";
import RoleTableSkeleton from "@/skeletons/RoleTableSkeleton";
import React, { Suspense } from "react";

const RolePage = () => {
  const breadcrumbItems = [
    { title: "Roles & SubRole", link: "/dashboard/role" },
  ];
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <BreadCrumb items={breadcrumbItems} />
      <RoleHeader />
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <Suspense fallback={<RoleTableSkeleton />}>
          <RoleTable />
        </Suspense>
        <Suspense fallback={<RoleTableSkeleton />}>
          <SubRoleTable />
        </Suspense>
      </div>
    </div>
  );
};

export default RolePage;
