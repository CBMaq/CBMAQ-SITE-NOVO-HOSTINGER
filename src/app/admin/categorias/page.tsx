import { getCategories } from "@/app/actions/blog";
import { CategoryManager } from "@/components/admin/blog/CategoryManager";
import { Grid, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function CategoriasPage() {
  const categories = await getCategories();

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild className="rounded-full">
          <Link href="/admin/dashboard">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div className="p-3 bg-primary/10 rounded-2xl">
          <Grid className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-serif font-bold">Categorias</h1>
          <p className="text-muted-foreground">Organize suas postagens por temas principais.</p>
        </div>
      </div>

      <CategoryManager initialCategories={categories} />
    </div>
  );
}
