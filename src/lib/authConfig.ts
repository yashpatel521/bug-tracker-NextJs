import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { login } from "@/action/auth";

export const authConfig: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error("No credentials provided");
        }

        const { email, password } = credentials;
        const response = await login(email, password);

        console.log("Login response:", response);

        if (response.success === false) {
          throw new Error("Invalid email or password");
        }

        const user = response.data.user;

        console.log("Authorized User:", user); // Log user data to inspect

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.email = user.email;
        token.profile = user.profile;
        token.status = user.status;
        token.role = user.role;
        token.subRole = user.subRole;
      }
      return token;
    },
    async session({ session, token }) {
      console.log("Session User:", token); // Log user data to inspect
      if (token) {
        session.user = token as any;
      }
      return session;
    },
  },
};
