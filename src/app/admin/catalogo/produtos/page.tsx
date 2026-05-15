import { getCatalogProducts, getCatalogCategories, getCatalogBrands } from "@/app/actions/catalog";
import { Button } from "@/components/ui/button";
import { Plus, Truck, Search, Edit3, ExternalLink, ImageIcon, Star, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { DeleteProductButton } from "@/components/admin/catalog/DeleteProductButton";
import { CatalogProductTable } from "@/components/admin/catalog/CatalogProductTable";
import Image from "next/image";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function ProdutosCatalogoPage() {
  const products = await getCatalogProducts("machine");

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild className="rounded-full">
            <Link href="/admin/dashboard">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div className="p-3 bg-primary/10 rounded-2xl">
            <Truck className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-serif font-bold">Produtos / Máquinas</h1>
            <p className="text-muted-foreground">Gerencie o catálogo dinâmico de equipamentos da CBMaq.</p>
          </div>
        </div>

        <Button asChild className="h-11 rounded-xl px-6 gap-2 shadow-lg hover:shadow-primary/20 transition-all bg-primary text-white font-bold">
          <Link href="/admin/catalogo/produtos/novo">
            <Plus className="h-5 w-5" />
            Cadastrar Máquina
          </Link>
        </Button>
      </div>

      <CatalogProductTable initialProducts={products} />
    </div>
  );
}
