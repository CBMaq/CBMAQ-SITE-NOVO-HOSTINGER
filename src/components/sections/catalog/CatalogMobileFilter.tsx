"use client";

import { useState } from "react";
import { SlidersHorizontal, X, Check, ChevronDown } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface CatalogMobileFilterProps {
  categories: any[];
  brands: any[];
}

export function CatalogMobileFilter({ categories, brands }: CatalogMobileFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);

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
    params.set("page", "1");
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2 bg-[#0A2A5E] text-white px-6 py-3 rounded-2xl text-xs font-bold shadow-lg active:scale-95 transition-all">
          <SlidersHorizontal className="h-4 w-4" /> Filtrar {searchParams.get("t") === "motores" ? "Motores" : "Máquinas"}
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-[90vw] w-[400px] h-[85vh] rounded-[2rem] flex flex-col p-0 overflow-hidden border-none shadow-2xl">
        <DialogHeader className="p-6 border-b border-cbmaq-gray-100 flex-row items-center justify-between">
          <DialogTitle className="text-xl font-serif font-bold text-cbmaq-navy">
            Filtrar {searchParams.get("t") === "motores" ? "Motores" : "Máquinas"}
          </DialogTitle>
          <button onClick={() => setOpen(false)} className="p-2 hover:bg-slate-100 rounded-full">
            <X className="h-5 w-5" />
          </button>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* Marcas */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-cbmaq-navy">Marcas</h3>
            <div className="grid grid-cols-1 gap-3">
              {brands.map((brand) => {
                const isActive = currentBrands.includes(brand.slug);
                return (
                  <button
                    key={brand.id}
                    onClick={() => toggleFilter("marca", brand.slug)}
                    className={cn(
                      "flex items-center gap-4 p-4 rounded-2xl border transition-all text-left",
                      isActive ? "border-primary" : "border-cbmaq-gray-100"
                    )}
                  >
                    <div className={cn(
                      "h-6 w-6 rounded-lg border-2 flex items-center justify-center shrink-0 transition-all",
                      isActive ? "bg-white border-primary text-primary" : "border-cbmaq-gray-200"
                    )}>
                      {isActive && <Check className="h-3.5 w-3.5 stroke-[3px]" />}
                    </div>
                    <div className={cn(
                      "relative h-8 w-24 transition-all duration-300 rounded-lg flex items-center justify-center overflow-hidden px-2",
                      isActive ? "bg-slate-100" : "group-hover:bg-slate-100"
                    )}>
                       <Image 
                        src={brand.logo} 
                        alt={brand.name} 
                        fill 
                        className={cn(
                          "object-contain object-left transition-all duration-300 p-0.5", 
                          isActive ? "brightness-100 opacity-100 scale-110" : "brightness-0 opacity-40 group-hover:brightness-100 group-hover:opacity-100"
                        )} 
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Categorias */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-cbmaq-navy">Categorias</h3>
            <div className="flex flex-col">
              {categories.map((cat) => {
                const isActive = currentCategories.includes(cat.slug);
                return (
                  <button
                    key={cat.id}
                    onClick={() => toggleFilter("categoria", cat.slug)}
                    className={cn(
                      "flex items-center gap-4 py-4 border-b border-cbmaq-gray-100 transition-all text-left last:border-0",
                      isActive ? "text-primary" : "text-[#0A2A5E]"
                    )}
                  >
                    <div className={cn(
                      "h-6 w-6 rounded-lg border-2 flex items-center justify-center shrink-0 transition-all",
                      isActive ? "bg-white border-primary text-primary" : "border-cbmaq-gray-200"
                    )}>
                      {isActive && <Check className="h-3.5 w-3.5 stroke-[3px]" />}
                    </div>
                    <span className="text-sm font-bold">{cat.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-cbmaq-gray-100 bg-slate-50 flex gap-3">
          <button 
            onClick={() => {
                const t = searchParams.get("t");
                router.push(t ? `?t=${t}` : "?");
                setOpen(false);
            }}
            className="flex-1 border border-cbmaq-gray-200 py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest text-cbmaq-gray-500 bg-white"
          >
            Limpar
          </button>
          <button 
            onClick={() => setOpen(false)}
            className="flex-[2] bg-primary text-white py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest shadow-lg"
          >
            Ver Resultados
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
