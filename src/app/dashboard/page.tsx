import { requireAuth } from "@/lib/rbac";
import { redirect } from "next/navigation";

export default async function GenericDashboardRedirect() {
  const session = await requireAuth();

  if (session.user.role === "ADMIN" || session.user.role === "WRITER") {
    redirect("/admin/dashboard");
  }

  // Generic fallback since specific roles routes were removed
  redirect("/");
}
