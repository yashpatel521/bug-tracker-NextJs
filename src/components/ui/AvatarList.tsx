import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { User } from "@/types";
import { getInitials } from "@/lib/utils";

const AvatarList = ({ avatarList }: { avatarList: User[] }) => {
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
            {avatar.profile ? (
              <AvatarImage src={avatar.profile} alt={avatar.profile} />
            ) : (
              <AvatarFallback>
                {getInitials(`${avatar.firstName} ${avatar.lastName}`)}
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
