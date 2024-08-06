import React, { useState, useRef, useEffect } from "react";
import { CheckIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import { User } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

interface MultiSelectProps {
  users: User[];
  selectedUsers: User[];
  onChange: (selected: User[]) => void;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  users,
  selectedUsers,
  onChange,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<User[]>(selectedUsers);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSelect = (user: User) => {
    let newSelected;
    if (selectedOptions.some((selected) => selected.id === user.id)) {
      newSelected = selectedOptions.filter((item) => item.id !== user.id);
    } else {
      newSelected = [...selectedOptions, user];
    }
    setSelectedOptions(newSelected);
    onChange(newSelected);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleClickOutside = (event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full" ref={containerRef}>
      <div className="w-full">
        <Input
          type="text"
          placeholder="Search and Select..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          className="w-full"
        />
      </div>
      {isOpen && (
        <div className="absolute w-full mt-1 border rounded-md shadow-lg dark:border-gray-600 z-10">
          <ScrollArea className="h-60 w-full bg-background border border-black rounded-sm mt-[1px]">
            <ul className="text-base focus:outline-none sm:text-sm">
              {filteredUsers.map((user) => (
                <li
                  key={user.id}
                  className={`${
                    selectedOptions.some((selected) => selected.id === user.id)
                      ? "bg-primary text-primary-foreground"
                      : "text-gray-900 dark:text-gray-200 bg-background"
                  } cursor-default select-none relative py-2 pl-10 pr-4`}
                  onClick={() => handleSelect(user)}
                >
                  <div className="flex items-center">
                    <Avatar className="mr-2">
                      <AvatarImage src={user.profile} alt={user.profile} />
                      <AvatarFallback>
                        {getInitials(`${user.firstName} ${user.lastName}`)}
                      </AvatarFallback>
                    </Avatar>
                    <span
                      className={`${
                        selectedOptions.some(
                          (selected) => selected.id === user.id
                        )
                          ? "font-medium"
                          : "font-normal"
                      } block truncate`}
                    >
                      {user.firstName} {user.lastName}
                    </span>
                    {selectedOptions.some(
                      (selected) => selected.id === user.id
                    ) && (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <CheckIcon className="w-5 h-5" aria-hidden="true" />
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </ScrollArea>
        </div>
      )}
      <div className="mt-2 flex flex-wrap">
        {selectedOptions.map((user) => (
          <span
            key={user.id}
            className="flex items-center px-2 py-1 mr-2 mb-2 text-sm rounded-md bg-primary text-primary-foreground dark:bg-primary-dark"
          >
            <Avatar className="mr-2">
              <AvatarImage src={user.profile} alt={user.profile} />
              <AvatarFallback>
                {getInitials(`${user.firstName} ${user.lastName}`)}
              </AvatarFallback>
            </Avatar>
            {user.firstName} {user.lastName}
            <button
              type="button"
              className="ml-1 text-xs hover:text-gray-400"
              onClick={() => handleSelect(user)}
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default MultiSelect;
