import { authOptions } from "@/lib/auth";

import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { AppError } from "./errors";

export const getSession = async () => {
  return await getServerSession(authOptions);
};

export const requireAuth = async (roles?: string[]) => {
  const session = await getSession();

  if (!session?.user) {
    // Instead of throwing an error that breaks the UI, redirect to login
    redirect("/login");
  }

  if (roles && !roles.includes(session.user.role)) {
    throw new AppError("Access denied. Insufficient permissions.", "FORBIDDEN");
  }

  return session;
};
