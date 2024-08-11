import { ProjectFilter } from "@/types";
import Image from "next/image";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import { dateToString } from "@/lib/utils";
import { Calendar, Clock } from "lucide-react";

const UserProfile = ({ user }: { user: ProjectFilter }) => {
  return (
    <div>
      <div className="rounded-lg w-full">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 m-5">
          <Card className="border rounded-xl shadow-2xl dark:shadow-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-medium">
                <span>Projects</span>
              </CardTitle>
              <div>
                <span className="text-lg mr-2">{user.projectCount}</span>
              </div>
            </CardHeader>
            <CardContent className="pl-3">
              <span className="text-xs text-muted-foreground">
                Total Projects
              </span>
            </CardContent>
          </Card>
          <Card className="border rounded-xl shadow-2xl dark:shadow-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-medium">
                <span>Version</span>
              </CardTitle>
              <span className="text-lg mr-2">{user.versionCount}</span>
            </CardHeader>
            <CardContent className="pl-3">
              <span className="text-xs text-muted-foreground">
                Total Versions Created
              </span>
            </CardContent>
          </Card>
          <Card className="border rounded-xl shadow-2xl dark:shadow-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-medium">
                <span>Pinned Projects</span>
              </CardTitle>
              <span className="text-lg mr-2">{user.pinnedProjectCount}</span>
            </CardHeader>
            <CardContent className="pl-3">
              <span className="text-xs text-muted-foreground">
                Total Projects Pinned
              </span>
            </CardContent>
          </Card>
          <Card className="border rounded-xl shadow-2xl dark:shadow-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-medium">
                <span>Bugs Reported</span>
              </CardTitle>
              <span className="text-lg mr-2">{user.reportedBugCount}</span>
            </CardHeader>
            <CardContent className="pl-3">
              <span className="text-xs text-muted-foreground">
                Total Bugs Reported
              </span>
            </CardContent>
          </Card>
        </div>
      </div>
      <Separator />
      <div className="m-5 flex justify-between">
        <div className="flex gap-3">
          <Image
            src={user.profile}
            alt={user.firstName}
            width={100}
            height={100}
            className="rounded-md opacity-80"
          />
          <div>
            <div>
              <h3 className="text-xl font-bold">
                {user.firstName} {user.lastName}
              </h3>
              <p className="text-gray-400">{user.email}</p>
              <p className="text-gray-400 capitalize">
                {user.role.name} ({user.subRole.name})
              </p>
              {user.status === "active" ? (
                <span className="inline-flex items-center px-2 py-1 text-xs font-medium leading-5 text-green-800 bg-green-100 rounded-full">
                  Active
                </span>
              ) : (
                <span className="inline-flex items-center px-2 py-1 text-xs font-medium leading-5 text-red-800 bg-red-100 rounded-full">
                  Inactive
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm text-gray-400 flex p-0 m-0 gap-1">
            <Calendar className="w-4 h-4" /> Joined:{" "}
            {dateToString(user.createdAt)}
          </span>
          <span className="text-sm text-gray-400 flex gap-1 ">
            <Clock className="w-4 h-4" />
            Last Updated: {dateToString(user.updatedAt)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
