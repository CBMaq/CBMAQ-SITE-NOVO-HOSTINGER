import { 
  getCatalogProductById, 
  getCatalogCategories, 
  getCatalogBrands, 
  getCatalogProducts 
} from "@/app/actions/catalog";
import { CatalogProductForm } from "@/components/admin/catalog/CatalogProductForm";
import { Truck } from "lucide-react";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

interface EditarProdutoPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditarProdutoPage({ params }: EditarProdutoPageProps) {
  const { id } = await params;
  const product = await getCatalogProductById(id);
  
  if (!product) {
    notFound();
  }

  const categories = await getCatalogCategories();
  const brands = await getCatalogBrands();
  const allProducts = await getCatalogProducts();

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-primary/10 rounded-2xl">
          <Truck className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-serif font-bold">Editar Máquina</h1>
          <p className="text-muted-foreground">Atualize as informações do equipamento no catálogo.</p>
        </div>
      </div>

      <CatalogProductForm 
        initialData={product}
        categories={categories} 
        brands={brands} 
        allProducts={allProducts} 
      />
    </div>
  );
}
