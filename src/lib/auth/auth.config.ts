/**
 * NextAuth.js Configuration
 * Sets up JWT-based authentication with Prisma adapter
 */

import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/db/prisma";
import bcrypt from "bcryptjs";
import { USER_ROLES } from "@/lib/constants";

export const authConfig: NextAuthConfig = {
  providers: [
    Credentials({
      name: "Email & Password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log("[AUTH DEBUG] missing email or password");
          throw new Error("Invalid credentials");
        }

        const email = (credentials.email as string).trim().toLowerCase();
        console.log("[AUTH DEBUG] login attempt for:", JSON.stringify(email), "pwd length:", (credentials.password as string).length);

        const user = await prisma.user.findUnique({
          where: { email },
        });

        console.log("[AUTH DEBUG] user found:", !!user, "has password:", !!user?.password);

        if (!user || !user.password) {
          throw new Error("Invalid credentials");
        }

        const passwordMatch = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        console.log("[AUTH DEBUG] passwordMatch:", passwordMatch);

        if (!passwordMatch) {
          throw new Error("Invalid credentials");
        }

        if (!user.isActive) {
          throw new Error("Account is disabled");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          image: user.avatar,
        };
      },
    }),
    // Add Google OAuth provider if credentials are provided
    // import GoogleProvider from "next-auth/providers/google";
    // GoogleProvider({
    //   clientId: process.env.AUTH_GOOGLE_ID!,
    //   clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    // }),
  ],

  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },

  callbacks: {
    // JWT callback - includes role in token
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.id = user.id;
      }
      return token;
    },

    // Session callback - includes role in session
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id as string;
        (session.user as any).role = token.role as string;
      }
      return session;
    },

    // Authorized callback - RBAC checks
    async authorized({ request, auth }) {
      const { pathname } = request.nextUrl;
      const adminRoles = [USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN] as string[];

      // Admin routes
      if (pathname.startsWith("/admin")) {
        if (!auth?.user) return false;
        return adminRoles.includes((auth.user as any).role as string);
      }

      // Protected API routes
      if (pathname.startsWith("/api/admin")) {
        if (!auth?.user) return false;
        return adminRoles.includes((auth.user as any).role as string);
      }

      return true;
    },
  },

  events: {},

  // Session configuration
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },

  // JWT configuration — secret comes from AUTH_SECRET env var automatically in v5
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  // Debug mode
  debug: process.env.NODE_ENV === "development",

  // Trust host
  trustHost: true,
};
