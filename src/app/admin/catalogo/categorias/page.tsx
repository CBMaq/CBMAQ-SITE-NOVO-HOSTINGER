import { getCatalogCategories } from "@/app/actions/catalog";
import { CatalogCategoryManager } from "@/components/admin/catalog/CatalogCategoryManager";
import { FolderTree, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function CategoriasCatalogoPage() {
  const categories = await getCatalogCategories();

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild className="rounded-full">
          <Link href="/admin/dashboard">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div className="p-3 bg-primary/10 rounded-2xl">
          <FolderTree className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-serif font-bold">Categorias de Máquinas</h1>
          <p className="text-muted-foreground">Gerencie as categorias de equipamentos do seu catálogo.</p>
        </div>
      </div>

      <CatalogCategoryManager initialCategories={categories} />
    </div>
  );
}
