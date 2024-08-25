import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { login, providersAuth } from "@/action/auth";
import GithubProvider from "next-auth/providers/github";
import {
  GITHUB_ID,
  GITHUB_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
} from "./constants";
import GoogleProvider from "next-auth/providers/google";

export const authConfig: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: GITHUB_ID,
      clientSecret: GITHUB_SECRET,
      async profile(profile) {
        const userData = {
          githubId: profile.id,
          name: profile.name,
          email: profile.email,
          profile: profile.avatar_url,
        };
        const response = await providersAuth(userData);

        if (response.success === false) {
          throw new Error("Error authenticating with Github");
        }
        const user = {
          ...response.data.user,
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
        };

        return user;
      },
    }),
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      async profile(profile) {
        const userData = {
          googleId: profile.sub,
          name: profile.name,
          email: profile.email,
          profile: profile.picture,
        };
        const response = await providersAuth(userData);

        if (response.success === false) {
          throw new Error("Error authenticating with Github");
        }
        const user = {
          ...response.data.user,
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
        };

        return user;
      },
    }),
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
