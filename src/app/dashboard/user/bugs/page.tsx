import BreadCrumb from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/authConfig";
import UserProfile from "@/components/user/UserProfile";
import { getUserprofile } from "@/action/user";
import ChangePasswordForm from "@/components/user/ChangePasswordForm";
import { UserBugs } from "@/components/projects/Bug/UserBugs";

const ProfilePage = async () => {
  const data = await getServerSession(authConfig);
  const userProfile = await getUserprofile(data?.user.id);
  const breadcrumbItems = [{ title: "Bugs", link: "/dashboard/user/bugs" }];
  return (
    <div className="space-y-4 p-4 pt-6 md:p-8">
      <BreadCrumb items={breadcrumbItems} />
      <Separator />
      <UserBugs />
    </div>
  );
};

export default ProfilePage;
