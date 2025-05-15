import BreadCrumb from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { UserBugs } from "@/components/projects/Bug/UserBugs";

const ProfilePage = async ({
  searchParams,
}: {
  searchParams: {
    query?: string;
    currentPage?: string;
    sortBy?: string;
    sortOrder?: string;
  };
}) => {
  const breadcrumbItems = [{ title: "Bugs", link: "/dashboard/user/bugs" }];
  return (
    <div className="space-y-4 p-4 pt-6 md:p-8">
      <BreadCrumb items={breadcrumbItems} />
      <Separator />
      <UserBugs searchParams={searchParams} />
    </div>
  );
};

export default ProfilePage;
