import { Icons } from "@/components/ui/icons";

export interface ResponseType {
  success: boolean;
  message?: string;
  data: any;
}

export interface Role {
  id: number;
  name: string;
  createdAt: string;
}

export interface SubRole {
  id: number;
  name: string;
  createdAt: string;
}

export interface User {
  accessToken?: string;
  refreshToken?: string;
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  profile: string;
  password?: string;
  status: string;
  createdAt?: string;
  role: Role;
  subRole: SubRole;
}

export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
  label?: string;
  description?: string;
  access: string[];
}

export interface SidebarProps {
  className?: string;
}
