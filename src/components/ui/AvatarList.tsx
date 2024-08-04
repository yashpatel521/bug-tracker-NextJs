import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { UserProject } from "@/types";
import { getInitials } from "@/lib/utils";

const AvatarList = ({ avatarList }: { avatarList: UserProject[] }) => {
  const maxAvatars = 4;

  return (
    <div>
      <div className="flex">
        {avatarList.slice(0, maxAvatars).map((avatar, index) => (
          <Avatar
            key={index}
            className={`relative ${
              index !== 0 ? "-ml-4" : ""
            } border border-white`}
            style={{ zIndex: avatarList.length - index }}
          >
            {avatar.user.profile ? (
              <AvatarImage
                src={avatar.user.profile}
                alt={avatar.user.profile}
              />
            ) : (
              <AvatarFallback>
                {getInitials(
                  `${avatar.user.firstName} ${avatar.user.lastName}`
                )}
              </AvatarFallback>
            )}
          </Avatar>
        ))}
        {avatarList.length > maxAvatars && (
          <Avatar
            className="relative -ml-3 border border-white bg-gray-200 text-gray-600"
            style={{ zIndex: 0 }}
          >
            <AvatarFallback>+{avatarList.length - maxAvatars}</AvatarFallback>
          </Avatar>
        )}
      </div>
    </div>
  );
};

export default AvatarList;
