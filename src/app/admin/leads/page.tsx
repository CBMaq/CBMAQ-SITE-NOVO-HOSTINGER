import { requireAuth } from "@/lib/rbac";
import { db } from "@/lib/db";
import { LeadList } from "@/components/admin/leads/LeadList";

export const metadata = {
  title: "Gerenciamento de Leads | CBMaq Admin",
};

export default async function LeadsPage() {
  const session = await requireAuth(["ADMIN", "WRITER"]);
  
  // Buscar todos os leads ordenados pelos mais recentes
  const leads = await db.lead.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Leads</h1>
          <p className="text-muted-foreground mt-1">
            Gerencie os contatos, orçamentos e solicitações de assistência.
          </p>
        </div>
      </div>

      <LeadList initialLeads={leads} userRole={session.user.role} />
    </div>
  );
}
