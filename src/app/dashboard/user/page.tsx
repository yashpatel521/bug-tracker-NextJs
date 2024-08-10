import { getAllUser } from "@/action/user";
import BreadCrumb from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import UserSearchBar from "@/components/user/UserSearchBar";
import UserTable from "@/components/user/UserTable";
import UserSearchBarSkeleton from "@/skeletons/UserSearchBarSkeleton";
import UserTableSkeleton from "@/skeletons/UserTableSkeleton";
import React, { Suspense } from "react";

const UserPage = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    currentPage?: string;
    sortBy?: string;
    sortOrder?: string;
  };
}) => {
  const breadcrumbItems = [{ title: "Users", link: "/dashboard/users" }];
  const usersData = await getAllUser(
    searchParams?.currentPage || "1",
    searchParams?.query || "",
    searchParams?.sortBy || "createdAt",
    searchParams?.sortOrder || "desc"
  );
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <BreadCrumb items={breadcrumbItems} />
      <Separator />
      <Suspense fallback={<UserSearchBarSkeleton />}>
        <UserSearchBar totalPages={usersData.totalPages} />
      </Suspense>
      <Suspense
        fallback={<UserTableSkeleton />}
        key={JSON.stringify(searchParams)}
      >
        <UserTable users={usersData.users} />
      </Suspense>
    </div>
  );
};

export default UserPage;
