"use client";
import React, { useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "../ui/input";

interface User {
  id: number;
  name: string;
}
const mockUsers: User[] = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
  { id: 4, name: "You" },
  { id: 5, name: "David" },
  { id: 6, name: "Eve" },
  { id: 7, name: "Frank" },
  { id: 8, name: "Grace" },
  { id: 9, name: "Heidi" },
  { id: 10, name: "Ivan" },
];

export const ChatsSideBar = () => {
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredUsers = mockUsers.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col w-64 h-full">
      {" "}
      {/* full height of flex parent */}
      <Card
        className="flex flex-col p-0 overflow-y-auto scrollbar-none flex-1"
        style={{
          scrollbarWidth: "none", // Firefox
          msOverflowStyle: "none", // IE and Edge
        }}
      >
        {/* Sticky Search bar */}
        <div className="sticky top-0 p-4 border-b z-10 bg-white dark:bg-[#09090b]">
          <Input
            placeholder="Search by Name..."
            className="max-w-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <CardContent className="p-4">
          <ul className="space-y-2">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <li
                  key={user.id}
                  className="p-2 rounded border cursor-pointer flex items-center gap-2"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      {user.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  {user.name}
                </li>
              ))
            ) : (
              <li className="p-2 text-center text-gray-500">No users found.</li>
            )}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};
