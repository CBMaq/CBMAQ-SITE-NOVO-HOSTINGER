import { getUsers } from "@/app/actions/users";
import { UserManager } from "@/components/admin/blog/UserManager";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Users as UsersIcon, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function UsuariosPage() {
  const session = await getServerSession(authOptions);
  
  if (!session || (session.user as any).role !== "ADMIN") {
    redirect("/admin/dashboard");
  }

  const users = await getUsers();

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild className="rounded-full">
          <Link href="/admin/dashboard">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div className="p-3 bg-primary/10 rounded-2xl">
          <UsersIcon className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-serif font-bold">Gerenciar Usuários</h1>
          <p className="text-muted-foreground">Controle quem pode acessar o painel administrativo.</p>
        </div>
      </div>

      <UserManager 
        initialUsers={users as any} 
        currentUserId={(session.user as any).id} 
      />
    </div>
  );
}
