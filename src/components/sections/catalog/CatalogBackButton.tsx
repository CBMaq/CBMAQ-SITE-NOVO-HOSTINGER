import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function CatalogBackButton() {
  return (
    <Link
      href="/maquinas"
      className="flex items-center gap-2 text-[#0A2A5E]/60 hover:text-[#0A2A5E] transition-colors mb-6 font-medium text-sm group w-fit cursor-pointer no-underline"
    >
      <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
      Voltar para Máquinas
    </Link>
  );
}
