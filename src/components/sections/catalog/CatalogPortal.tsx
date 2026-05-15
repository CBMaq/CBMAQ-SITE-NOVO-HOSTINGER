"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import { cn } from "@/lib/utils";

interface CatalogPortalProps {
  categories: any[];
  brands: any[];
}

export function CatalogPortal({ categories, brands }: CatalogPortalProps) {
  const catScrollRef = useRef<HTMLDivElement>(null);
  const brandScrollRef = useRef<HTMLDivElement>(null);

  const scroll = (ref: React.RefObject<HTMLDivElement | null>, direction: "left" | "right") => {
    if (ref.current) {
      const { scrollLeft, clientWidth } = ref.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2;
      ref.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className="py-20 space-y-32 overflow-hidden">
      {/* Seção Categorias */}
      <section className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-12">
          <div className="space-y-2">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#0A2A5E]">
              Categorias de Máquinas
            </h2>
            <div className="h-1.5 w-24 bg-primary rounded-full" />
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={() => scroll(catScrollRef, "left")}
              className="p-3 rounded-full border border-border hover:bg-primary hover:text-white transition-all shadow-sm"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button 
              onClick={() => scroll(catScrollRef, "right")}
              className="p-3 rounded-full border border-border hover:bg-primary hover:text-white transition-all shadow-sm"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div 
          ref={catScrollRef}
          className="flex gap-6 overflow-x-auto no-scrollbar pb-8 scroll-smooth"
        >
          {categories.map((cat, idx) => {
            // Pegar logos únicos das marcas que têm produtos nesta categoria
            const brandLogos = Array.from(new Set(cat.products.map((p: any) => p.brand?.logo).filter(Boolean)));

            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="min-w-[300px] md:min-w-[400px] group relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-xl"
              >
                <Image 
                  src={cat.coverImage || "/placeholder-cat.webp"} 
                  alt={cat.name} 
                  fill 
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                    {cat.name}
                  </h3>
                  <p className="text-white/80 text-sm md:text-base mb-6 line-clamp-3">
                    {cat.description}
                  </p>
                  
                  <div className="flex items-center gap-4 mt-auto">
                    <div className="flex -space-x-3 overflow-hidden">
                      {brandLogos.slice(0, 3).map((logo: any, bidx) => (
                        <div key={bidx} className="relative h-10 w-20 rounded-lg bg-white/90 backdrop-blur p-1.5 border border-white/20">
                          <Image src={logo} alt="brand" fill className="object-contain p-1" />
                        </div>
                      ))}
                    </div>
                    
                    <Link 
                      href={`/maquinas?categoria=${cat.slug}`}
                      className="ml-auto p-4 bg-white text-primary rounded-2xl hover:bg-primary hover:text-white transition-all shadow-lg"
                    >
                      <Plus className="h-6 w-6" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Seção Marcas */}
      <section className="bg-slate-50 section-padding">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-12">
            <div className="space-y-2">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#0A2A5E]">
                Marcas Parceiras
              </h2>
              <div className="h-1.5 w-24 bg-primary rounded-full" />
            </div>
            
            <div className="flex gap-2">
              <button 
                onClick={() => scroll(brandScrollRef, "left")}
                className="p-3 rounded-full border border-border hover:bg-primary hover:text-white transition-all shadow-sm bg-white"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button 
                onClick={() => scroll(brandScrollRef, "right")}
                className="p-3 rounded-full border border-border hover:bg-primary hover:text-white transition-all shadow-sm bg-white"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
          </div>

          <div 
            ref={brandScrollRef}
            className="flex gap-6 overflow-x-auto no-scrollbar pb-8 scroll-smooth"
          >
            {brands.map((brand, idx) => (
              <motion.div
                key={brand.id}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="min-w-[280px] md:min-w-[320px] group relative aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-2xl bg-[#0A2A5E]"
              >
                <Image 
                  src={brand.coverImage || "/placeholder-brand.webp"} 
                  alt={brand.name} 
                  fill 
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover opacity-60 transition-all duration-700 group-hover:scale-110 group-hover:opacity-40"
                />
                
                {/* Overlay de Conteúdo (estilo Muller na foto 2) */}
                <div className="absolute inset-0 p-8 flex flex-col items-center text-center justify-between">
                   <div className="w-full">
                      <div className="relative h-16 w-32 mx-auto mb-6">
                        <Image 
                          src={brand.logo || ""} 
                          alt={brand.name} 
                          fill 
                          className="object-contain"
                        />
                      </div>
                   </div>

                   <div className="space-y-4 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      <p className="text-white text-sm font-medium leading-relaxed line-clamp-4">
                        {brand.description || `Confira as melhores máquinas da ${brand.name} na CBMaq.`}
                      </p>
                      <Link 
                        href={`/maquinas?marca=${brand.slug}`}
                        className="inline-flex items-center gap-2 bg-white text-primary px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-primary hover:text-white transition-all"
                      >
                        Ver Máquinas <ChevronRight className="h-4 w-4" />
                      </Link>
                   </div>

                   {/* Logo estático no rodapé quando não está em hover (estilo Ammann/Lovol na foto 2) */}
                   <div className="w-full mt-auto group-hover:opacity-0 transition-opacity duration-300">
                      <div className="relative h-10 w-24 mx-auto">
                        <Image 
                          src={brand.logo || ""} 
                          alt={brand.name} 
                          fill 
                          className="object-contain brightness-0 invert"
                        />
                      </div>
                   </div>

                   <div className="absolute top-8 right-8">
                      <div className="p-2 bg-white/20 backdrop-blur rounded-full text-white border border-white/30">
                        <Plus className="h-5 w-5" />
                      </div>
                   </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
