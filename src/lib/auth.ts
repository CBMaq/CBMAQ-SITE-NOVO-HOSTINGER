import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "@/lib/db";
import bcrypt from "bcrypt";

// Diagnostic deploy: 2026-04-13T17:05

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db as any) as any,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("[AUTH_DEBUG] Login attempt for:", credentials?.email);
        
        if (!credentials?.email || !credentials?.password) {
          console.warn("[AUTH_DEBUG] Missing email or password");
          throw new Error("Invalid credentials");
        }

        try {
          const user = await db.user.findUnique({
            where: { email: credentials.email },
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
              password: true,
              role: true,
              isActive: true,
              permissions: true,
            },
          });

          console.log("[AUTH_DEBUG] User found in DB:", !!user);

          if (!user || !user.password) {
            console.warn("[AUTH_DEBUG] User not found or has no password");
            throw new Error("Invalid credentials");
          }

          const isCorrectPassword = await bcrypt.compare(
            credentials.password,
            user.password
          );

          console.log("[AUTH_DEBUG] Password match result:", isCorrectPassword);

          if (!isCorrectPassword) {
            console.warn("[AUTH_DEBUG] Password mismatch for:", credentials.email);
            throw new Error("Invalid credentials");
          }

          console.log("[AUTH_DEBUG] Login successful for:", user.email);
          return {
            ...user,
            permissions: (user.permissions as string[]) ?? [],
          } as any;
        } catch (error) {
          console.error("[AUTH_DEBUG] CRITICAL ERROR during authorize:", error);
          throw error;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
        token.permissions = (user as any).permissions ?? [];
      }
      if (trigger === "update" && session?.name) {
        token.name = session.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as any).role = token.role;
        (session.user as any).id = token.id as string;
        (session.user as any).permissions = token.permissions ?? [];
      }
      return session;
    },
  },
};
