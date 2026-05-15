import { requireAuth } from "@/lib/rbac";
import { AdminSidebar } from "@/components/layout/AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireAuth(["ADMIN", "WRITER"]);
  const userRole = (session.user as any).role as string;
  const userPermissions = (session.user as any).permissions as string[] ?? [];

  return (
    <div className="h-screen flex flex-col lg:flex-row bg-muted/20 overflow-hidden">
      <AdminSidebar userRole={userRole} userPermissions={userPermissions} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <main className="flex-1 overflow-y-auto px-4 md:px-8 lg:px-10 py-6 md:py-8">
          <div className="max-w-[1440px] mx-auto w-full pb-20">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
