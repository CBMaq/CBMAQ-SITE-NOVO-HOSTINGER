import { getCatalogCategories, getCatalogBrands, getCatalogProducts } from "@/app/actions/catalog";
import { CatalogProductForm } from "@/components/admin/catalog/CatalogProductForm";
import { Truck } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function NovoProdutoPage() {
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
          <h1 className="text-3xl font-serif font-bold">Novo Motor</h1>
          <p className="text-muted-foreground">Cadastre um novo motor no catálogo.</p>
        </div>
      </div>

      <CatalogProductForm 
        categories={categories} 
        brands={brands} 
        allProducts={allProducts}
        productType="engine"
        basePath="/admin/catalogo/motores"
      />
    </div>
  );
}
