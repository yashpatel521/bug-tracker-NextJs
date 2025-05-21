// UserPage.tsx (or similar)

import React from "react";
import BreadCrumb from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { ChatsSideBar } from "@/components/chats/ChatsSideBar";
import { Messages } from "@/components/chats/Messages";

const UserPage = () => {
  const breadcrumbItems = [{ title: "Chats", link: "/dashboard/chats" }];

  return (
    <div className="flex flex-col h-screen overflow-none">
      <header className="pt-4 px-4 ">
        <BreadCrumb items={breadcrumbItems} />
        <Separator />
      </header>
      <main className="flex flex-1  overflow-hidden gap-4 p-2 mb-20">
        <ChatsSideBar />
        <Messages />
      </main>
    </div>
  );
};

export default UserPage;
