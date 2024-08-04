import { ProjectDetails } from "@/types";
import React from "react";
import { Icons } from "../ui/icons";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import ProjectBadge from "../ui/projectBadge";
import { abbreviateNumber } from "@/lib/utils";
import TogglePinProjectButton from "../TogglePinProjectButton";

const PinProjectCard = ({ data }: { data: ProjectDetails }) => {
  const PlayStoreIcon = Icons["PlayStore"];

  return (
    <div className="flex items-center">
      <Link href={`./dashboard/projects/${data.id}`}>
        <Avatar className="h-9 w-9">
          <AvatarImage src={data.appIcon} alt={data.appIcon} />
          <AvatarFallback>{data.title}</AvatarFallback>
        </Avatar>
      </Link>
      <div className="ml-4 space-y-1">
        <p className="text-sm font-medium leading-none">
          <Link href={`./dashboard/projects/${data.id}`}>{data.title}</Link>
        </p>
        <p className="text-sm text-muted-foreground flex gap-2 items-center">
          {data.developer}
          <Link href={data.appUrl} className="mr-2" target="_blank">
            <PlayStoreIcon className="w-4 h-4" />
          </Link>
        </p>
      </div>
      <ProjectBadge status={data.status} />
      <div className="ml-auto font-medium mr-6 text-muted-foreground ">
        {abbreviateNumber(data.maxInstalls)} installs
      </div>
      <TogglePinProjectButton id={data.id} isPinned={false} />
    </div>
  );
};

export default PinProjectCard;
