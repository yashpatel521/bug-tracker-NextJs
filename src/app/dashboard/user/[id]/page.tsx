import { getUserprofile } from "@/action/user";
import BreadCrumb from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import UserEditForm from "@/components/user/UserEditForm";
import UserProfile from "@/components/user/UserProfile";
import { checkRoleAccess } from "@/lib/utils";
import { getServerSession } from "next-auth";
import React from "react";

const ViewUserPage = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const breadcrumbItems = [
    { title: "Users", link: "/dashboard/user" },
    { title: "User Details", link: `/dashboard/user/${params.id}` },
  ];
  const data = await getServerSession();
  const userData = await getUserprofile(+params.id);
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <BreadCrumb items={breadcrumbItems} />
      <Separator />
      <UserProfile user={userData} />
      {checkRoleAccess(data?.user, ["admin"]) && ""}
      <UserEditForm user={userData} />
    </div>
  );
};

export default ViewUserPage;
