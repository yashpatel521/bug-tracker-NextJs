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

        if (response.success === false) {
          throw new Error("Invalid email or password");
        }

        const user = {
          ...response.data.user,
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
        };

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
        token = { ...user, token };
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = token as any;
      }
      return session;
    },
  },
};
