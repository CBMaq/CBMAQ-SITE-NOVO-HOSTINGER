"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface CatalogSidebarProps {
  categories: any[];
  brands: any[];
}

export function CatalogSidebar({ categories, brands }: CatalogSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Pegar filtros atuais da URL
  const currentBrands = searchParams.get("marca")?.split(",") || [];
  const currentCategories = searchParams.get("categoria")?.split(",") || [];

  const toggleFilter = (type: "marca" | "categoria", slug: string) => {
    const params = new URLSearchParams(searchParams.toString());
    let items = type === "marca" ? [...currentBrands] : [...currentCategories];

    if (items.includes(slug)) {
      items = items.filter(i => i !== slug);
    } else {
      items.push(slug);
    }

    if (items.length > 0) {
      params.set(type, items.join(","));
    } else {
      params.delete(type);
    }

    params.set("page", "1"); // Resetar para página 1 ao filtrar
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const clearFilters = () => {
    const t = searchParams.get("t");
    router.push(t ? `/catalogo?t=${t}` : "/catalogo", { scroll: false });
  };

  return (
    <aside className="w-full h-fit sticky top-28 rounded-[2rem] border border-cbmaq-gray-200 p-8">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-cbmaq-gray-100">
        <h2 className="text-2xl font-serif font-bold text-cbmaq-navy">Filtrar Por</h2>
        {(currentBrands.length > 0 || currentCategories.length > 0) && (
          <button 
            onClick={clearFilters}
            className="text-[10px] uppercase font-bold text-red-500 hover:underline flex items-center gap-1"
          >
            Limpar <X className="h-3 w-3" />
          </button>
        )}
      </div>

      {/* Marcas */}
      <div className="space-y-6 mb-12">
        <h3 className="text-sm font-bold text-cbmaq-navy">Marca</h3>
        <div className="grid gap-4">
          {brands.map((brand) => {
            const isActive = currentBrands.includes(brand.slug);
            return (
              <button
                key={brand.id}
                onClick={() => toggleFilter("marca", brand.slug)}
                className={cn(
                  "flex items-center gap-6 p-4 rounded-2xl border transition-all group w-full",
                  isActive 
                    ? "border-primary" 
                    : "border-cbmaq-gray-100 hover:border-cbmaq-gray-300"
                )}
              >
                {/* Checkbox customizado */}
                <div className={cn(
                  "h-6 w-6 rounded-lg border-2 flex items-center justify-center transition-all shrink-0",
                  isActive 
                    ? "bg-white border-primary text-primary" 
                    : "border-cbmaq-gray-200 group-hover:border-cbmaq-gray-400"
                )}>
                  {isActive && <Check className="h-4 w-4 stroke-[3px]" />}
                </div>

                {/* Logo da Marca */}
                <div className={cn(
                  "relative h-10 w-full transition-all duration-300 rounded-xl flex items-center justify-center overflow-hidden px-2",
                  isActive || "group-hover:bg-[#0A2A5E]/10 group-hover:shadow-inner"
                )}>
                   <Image 
                    src={brand.logo} 
                    alt={brand.name} 
                    fill 
                    className={cn(
                      "object-contain object-left transition-all duration-300 p-1",
                      isActive 
                        ? "grayscale-0 opacity-100 scale-110" 
                        : "brightness-0 opacity-40 group-hover:brightness-100 group-hover:opacity-100 group-hover:grayscale-0"
                    )} 
                    sizes="150px"
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Categorias */}
      <div className="space-y-6">
        <h3 className="text-sm font-bold text-cbmaq-navy">Categoria</h3>
        <div className="flex flex-col">
          {categories.map((cat) => {
            const isActive = currentCategories.includes(cat.slug);
            return (
              <button
                key={cat.id}
                onClick={() => toggleFilter("categoria", cat.slug)}
                className={cn(
                  "flex items-center gap-4 py-4 border-b border-cbmaq-gray-100 transition-all group w-full text-left last:border-0",
                  isActive ? "text-primary" : "text-[#0A2A5E]"
                )}
              >
                {/* Checkbox customizado */}
                <div className={cn(
                  "h-6 w-6 rounded-lg border-2 flex items-center justify-center transition-all shrink-0",
                  isActive 
                    ? "bg-white border-primary text-primary" 
                    : "border-cbmaq-gray-200 group-hover:border-cbmaq-gray-400"
                )}>
                  {isActive && <Check className="h-4 w-4 stroke-[3px]" />}
                </div>
                <span className={cn(
                  "text-sm font-bold transition-colors",
                  isActive ? "text-primary" : "group-hover:text-primary"
                )}>
                  {cat.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Botão Aplicar (Opcional, pois é reativo, mas bom para UX) */}
      <div className="mt-10 pt-6 border-t border-cbmaq-gray-100">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-full bg-[#0A2A5E] text-white py-4 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-primary transition-all shadow-md"
        >
          Aplicar Filtros
        </button>
      </div>
    </aside>
  );
}
