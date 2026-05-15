"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface MachineCardProps {
  product: any;
}

export function MachineCard({ product }: MachineCardProps) {
  const gallery = Array.isArray(product.galleryImages) ? product.galleryImages : [];
  const hoverImage = gallery.length > 0 ? gallery[0] : null;

  return (
    <Link 
      href={`/catalogo/${product.slug}`}
      className="group bg-white rounded-[3rem] border-2 border-[#0A2A5E] overflow-hidden transition-all duration-500 flex flex-col h-full relative p-8 md:p-10 hover:shadow-2xl hover:border-[#0A4EE4] hover:-translate-y-1"
    >
      
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        {/* Brand Logo Box */}
        <div className="bg-[#E9ECEF] rounded-xl px-3 py-2 flex items-center justify-center h-10 w-24">
          {product.brand?.logo && (
            <div className="relative w-full h-full">
              <Image 
                src={product.brand.logo} 
                alt={product.brand.name} 
                fill 
                className="object-contain" 
                sizes="100px"
              />
            </div>
          )}
        </div>

        {/* Badge de Classificação */}
        <div className={cn(
          "px-4 py-2 rounded-xl text-[10px] font-bold text-white uppercase tracking-wider",
          product.classification === "Leve" ? "bg-[#00D121]" : 
          product.classification === "Médio" ? "bg-amber-500" : "bg-red-500"
        )}>
          {product.classification || "Leve"}
        </div>
      </div>

      {/* Imagem Principal com efeito de Hover (E-commerce style) */}
      <div className="relative aspect-square -mx-4 md:-mx-6 mb-8 rounded-2xl overflow-hidden">
        <Image 
          src={product.mainImage || "/placeholder-machine.png"} 
          alt={product.name} 
          fill 
          className={cn(
            "object-cover transition-all duration-700",
            hoverImage ? "opacity-100 group-hover:opacity-0" : "group-hover:scale-105"
          )}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {hoverImage && (
          <Image 
            src={hoverImage} 
            alt={`${product.name} - Vista alternativa`} 
            fill 
            className="object-cover transition-all duration-700 opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
      </div>

      {/* Conteúdo Informativo */}
      <div className="flex flex-col flex-1">
        <div className="mb-4">
          <span className="text-[10px] font-bold text-[#0A2A5E] uppercase tracking-[0.2em] block leading-tight mb-2 opacity-60">
            {product.category?.name || "Máquina"}
          </span>
          <h3 className="text-2xl md:text-3xl font-bold text-[#0A2A5E] leading-tight tracking-tight line-clamp-2 transition-colors group-hover:text-[#0A4EE4]">
            {product.name}
          </h3>
        </div>

        {/* Especificações Técnicas */}
        <div className="space-y-1 mb-8">
          <p className="text-base text-[#0A2A5E] font-medium flex items-baseline gap-2">
            Peso: <span className="font-normal opacity-70">{product.weight || "---"}</span>
          </p>
          <p className="text-base text-[#0A2A5E] font-medium flex items-baseline gap-2">
            Potência: <span className="font-normal opacity-70">{product.power || "---"}</span>
          </p>
          <p className="text-base text-[#0A2A5E] font-medium flex items-baseline gap-2">
            Caçamba: <span className="font-normal opacity-70">{product.bucketCapacity || "---"}</span>
          </p>
        </div>

        {/* Botão Visual (O card inteiro agora é o link) */}
        <div className="mt-auto">
          <div className="w-full border-2 border-[#0A2A5E] text-[#0A2A5E] group-hover:bg-[#0A2A5E] group-hover:text-white py-5 rounded-[1.5rem] text-xs font-bold uppercase tracking-[0.2em] text-center transition-all duration-300 shadow-sm group-hover:shadow-xl">
            Ver detalhes
          </div>
        </div>
      </div>
    </Link>
  );
}
