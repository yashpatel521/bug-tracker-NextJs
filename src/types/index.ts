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
  accessToken: string;
  refreshToken: string;
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

export interface ContentProps {
  title: string;
  svg: string;
  value: number;
  description: string;
}
export interface PinProject {
  id: number;
  project: ProjectDetails;
}

export interface ProjectDetails {
  id: number;
  title: string;
  summary: string;
  score: number;
  scoreText: string;
  description: string;
  descriptionHTML: string;
  appId: string;
  appUrl: string;
  appIcon: string;
  developer: string;
  developerId: string;
  developerEmail: string;
  firebaseAccount: string;
  privacyPolicyUrl: string;
  status: "complete" | "inprogress" | "onhold" | "inreview";
  LiveUpdatedAt: string;
  createdAt: string;
  updatedAt: string;
  userProjects?: UserProject[];
  dailyStats?: DailyStats[];
  versions?: Version[];
  maxInstalls: number;
  ratings: number;
  reviews: number;
  isPinned: boolean;
}

export interface DailyStats {
  id: number;
  installCount: string;
  ratingCount: string;
  reviewCount: string;
  date: string;
}

export interface Version {
  id: number;
  versionNumber: string;
  repositoryUrl: string;
  liveUrl: string;
  createdAt: string;
  createdBy: User;
}

export interface UserProject {
  id: number;
  user: User;
}
