import { requireAuth } from "@/lib/rbac";
import { LayoutDashboard, Users, FileText, Grid, Tag } from "lucide-react";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const session = await requireAuth(["ADMIN", "WRITER"]);
  
  // Fetch real counts if possible
  const [userCount, postCount, categoryCount, tagCount] = await Promise.all([
    db.user.count(),
    db.post.count(),
    db.category.count(),
    db.tag.count(),
  ]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-bold">Início</h1>
        <p className="text-muted-foreground">Bem-vindo, {session.user.name}. Gerencie o conteúdo do seu blog aqui.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-3xl bg-background border border-border shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-3 mb-4 text-muted-foreground">
            <FileText className="h-5 w-5" />
            <h3 className="font-semibold text-sm uppercase tracking-wider">Postagens</h3>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-serif font-bold">{postCount}</span>
          </div>
          <p className="text-xs text-muted-foreground mt-2 border-t pt-2 border-border/50">
            Total de artigos publicados ou rascunhos
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-background border border-border shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-3 mb-4 text-muted-foreground">
            <Grid className="h-5 w-5" />
            <h3 className="font-semibold text-sm uppercase tracking-wider">Categorias</h3>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-serif font-bold">{categoryCount}</span>
          </div>
          <p className="text-xs text-muted-foreground mt-2 border-t pt-2 border-border/50">
            Organização principal por temas
          </p>
        </div>

        {session.user.role === "ADMIN" && (
          <div className="p-6 rounded-3xl bg-background border border-border shadow-sm flex flex-col justify-between">
            <div className="flex items-center gap-3 mb-4 text-muted-foreground">
              <Users className="h-5 w-5" />
              <h3 className="font-semibold text-sm uppercase tracking-wider">Usuários</h3>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-serif font-bold">{userCount}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2 border-t pt-2 border-border/50">
              Gerencie quem pode acessar o painel
            </p>
          </div>
        )}

        <div className="p-6 rounded-3xl bg-background border border-border shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-3 mb-4 text-muted-foreground">
            <Tag className="h-5 w-5" />
            <h3 className="font-semibold text-sm uppercase tracking-wider">Tags</h3>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-serif font-bold">{tagCount}</span>
          </div>
          <p className="text-xs text-muted-foreground mt-2 border-t pt-2 border-border/50">
            Total de etiquetas cadastradas
          </p>
        </div>
      </div>

      <div className="bg-muted/30 rounded-3xl p-12 flex flex-col items-center justify-center text-center border-2 border-dashed border-border/50">
        <LayoutDashboard className="h-16 w-16 text-muted-foreground mb-6 opacity-20" />
        <h2 className="text-xl font-bold mb-2">Painel Administrativo CBMaq</h2>
        <p className="text-muted-foreground max-w-sm">
          Utilize o menu lateral para gerenciar suas postagens, categorias e usuários. Todas as alterações são feitas em tempo real.
        </p>
      </div>
    </div>
  );
}
