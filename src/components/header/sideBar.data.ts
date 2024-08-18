import { NavItem, User } from "@/types";

export const navItemsData: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: "dashboard",
    label: "Dashboard",
    access: ["all"],
  },
  {
    title: "Projects",
    href: "/dashboard/projects",
    icon: "FolderGit2",
    label: "Projects",
    access: ["all"],
  },
  {
    title: "User",
    href: "/dashboard/user",
    icon: "user",
    label: "user",
    access: ["admin"],
  },
  {
    title: "Roles & SubRoles",
    href: "/dashboard/role",
    icon: "Role",
    label: "Role",
    access: ["admin"],
  },
  {
    title: "Track Live Project",
    href: "/dashboard/trackliveProject",
    icon: "gitlab",
    label: "liveProject",
    access: ["all"],
  },
  {
    title: "Profile",
    href: "/dashboard/user/profile",
    icon: "user",
    label: "Profile",
    access: ["all"],
  },
];

export const navItems = (user: User) => {
  if (user) {
    let sidebarData;
    sidebarData = navItemsData.filter((item) => {
      if (item.access.includes("all")) return true;
      if (
        item.access.includes(user.role?.name.toLowerCase() || "") ||
        item.access.includes(user.subRole?.name.toLowerCase() || "")
      )
        return true;
    });
    return sidebarData;
  } else return [];
};
