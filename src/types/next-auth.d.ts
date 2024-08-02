// next-auth.d.ts
import "next-auth";

declare module "next-auth" {
  interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    profile: string;
    status: string;
    role: Role;
    subRole: SubRole;
  }

  interface Session {
    user: User;
  }
}
