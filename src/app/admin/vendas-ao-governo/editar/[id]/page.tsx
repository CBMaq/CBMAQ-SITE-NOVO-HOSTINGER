import { AtaForm } from "@/components/admin/vendas-ao-governo/AtaForm";
import { getAtaById } from "@/app/actions/vendas-ao-governo";
import { FileText } from "lucide-react";
import { notFound } from "next/navigation";

export default async function EditarAtaPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  const ata = await getAtaById(id);

  if (!ata) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-primary/10 rounded-2xl">
          <FileText className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-serif font-bold">Editar Ata</h1>
          <p className="text-muted-foreground">Atualize as informações da ata de registro de preços.</p>
        </div>
      </div>

      <AtaForm initialData={ata} />
    </div>
  );
}
