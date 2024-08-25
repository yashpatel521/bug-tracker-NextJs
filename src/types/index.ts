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
  role: Role;
}

export interface User {
  accessToken: string;
  refreshToken: string;
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  profile: string;
  password?: string | null;
  status: string;
  createdAt?: string;
  role: Role;
  subRole: SubRole;
  projectAssigned?: number;
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
  icon: string;
  url: string;
  repositoryUrl: string;
  appType: "google" | "apple" | "web";
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

export type Bug = {
  id: number;
  title: string;
  description: string;
  status: bugStatus;
  priority: bugPriority;
  type: bugType;
  reportedBy: User;
  assignedTo: User[];
  createdAt: string;
  updatedAt: string;
  images: BugImage[];
};

export type BugImage = {
  id: number;
  src: string;
};

export type bugStatus =
  | "backlog"
  | "todo"
  | "inprogress"
  | "complete"
  | "closed"
  | "assigned"
  | "new";
export const bugStatusArray = [
  {
    value: "backlog",
    label: "Backlog",
  },
  {
    value: "todo",
    label: "Todo",
  },
  {
    value: "inprogress",
    label: "In Progress",
  },
  {
    value: "complete",
    label: "Complete",
  },
  {
    value: "closed",
    label: "Closed",
  },
  {
    value: "assigned",
    label: "Assigned",
  },
  {
    value: "new",
    label: "New",
  },
];

export type bugPriority = "low" | "medium" | "high";
export const bugPriorityArray = [
  {
    value: "low",
    label: "Low",
  },
  {
    value: "medium",
    label: "Medium",
  },
  {
    value: "high",
    label: "High",
  },
];

export type bugType = "bug" | "feature" | "enhancement";
export const bugTypeArray = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "enhancement",
    label: "Enhancement",
  },
];

export interface ProjectFilter {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  profile: string;
  password?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  role: Role;
  subRole: SubRole;
  projectCount: number;
  versionCount: number;
  pinnedProjectCount: number;
  reportedBugCount: number;
}
