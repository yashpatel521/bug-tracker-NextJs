import BreadCrumb from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/authConfig";
import UserProfile from "@/components/user/UserProfile";
import { User } from "@/types";
import { getUserprofile } from "@/action/user";
import ChangePasswordForm from "@/components/user/ChangePasswordForm";

const ProfilePage = async () => {
  const data = await getServerSession(authConfig);
  const userProfile = await getUserprofile(data?.user.id);
  const breadcrumbItems = [
    { title: "Profile", link: "/dashboard/user/profile" },
  ];
  return (
    <div className="space-y-4 p-4 pt-6 md:p-8">
      <BreadCrumb items={breadcrumbItems} />
      <Separator />
      <UserProfile user={userProfile} />
      <ChangePasswordForm />
    </div>
  );
};

export default ProfilePage;
