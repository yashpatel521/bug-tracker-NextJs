import { Metadata } from "next";

import { SidebarProvider } from "@/components/header/useSidebar";
import Header from "@/components/header/Header";
import Sidebar from "@/components/header/Sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function DashboardPage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <Header />
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <main className="w-full pb-14">
          <ScrollArea className="h-full">{children}</ScrollArea>
        </main>
      </div>
    </SidebarProvider>
  );
}
