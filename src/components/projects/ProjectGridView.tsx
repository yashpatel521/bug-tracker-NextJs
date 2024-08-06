import { ProjectDetails } from "@/types";
import React from "react";
import Image from "next/image";
import { Separator } from "../ui/separator";
import Link from "next/link";
import AvatarList from "../ui/AvatarList";
import TogglePinProjectButton from "../TogglePinProjectButton";

const ProjectGridView = ({ data }: { data: ProjectDetails[] }) => {
  return (
    <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {data.map((appData, index) => (
        <div
          className="m-1 shadow-lg border rounded-3xl dark:shadow-none"
          key={index}
        >
          <div className="min-h-42 min-w-64 p-4 flex flex-col gap-3">
            <div className="flex justify-between">
              <Link href={`./projects/${appData.id}`}>
                <div className="flex gap-1">
                  <Image
                    src={appData.appIcon}
                    alt={appData.title}
                    width={50}
                    height={60}
                    className="rounded-2xl h-[58px] w-[58px]"
                  />
                  <div className="text-left mt-1 w-full">
                    <p className="text-[14px]">{appData.title}</p>
                    <p className="font-thin text-[12px]">{appData.developer}</p>
                  </div>
                </div>
              </Link>
              <TogglePinProjectButton
                id={+appData.id}
                isPinned={!appData.isPinned}
              />
            </div>
            <Separator />
            <div className="w-full flex items-center justify-between">
              <AvatarList
                avatarList={appData.userProjects?.map((i) => i.user) ?? []}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectGridView;
