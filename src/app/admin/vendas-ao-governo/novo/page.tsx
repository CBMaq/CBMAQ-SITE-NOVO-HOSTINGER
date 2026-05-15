import { AtaForm } from "@/components/admin/vendas-ao-governo/AtaForm";
import { FileText } from "lucide-react";

export default function NovaAtaPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-primary/10 rounded-2xl">
          <FileText className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-serif font-bold">Nova Ata</h1>
          <p className="text-muted-foreground">Cadastre uma nova ata de registro de preços.</p>
        </div>
      </div>

      <AtaForm />
    </div>
  );
}
