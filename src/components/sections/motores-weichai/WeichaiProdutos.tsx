"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

const fallbackProducts = [
  {
    slug: "wp10-9-7l",
    image: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/weichai-motors-wp10-9-7l.png",
    title: "WP10 - 9.7L",
    tags: ["Escavadeiras e guindastes", "230 a 380 HP"],
    feature: "Torque elevado, resposta rápida, manutenção facilitada."
  },
  {
    slug: "wp7-7-5l",
    image: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/weichai-motors-wp7-7-5l.png",
    title: "WP7 - 7.5L",
    tags: ["Carregadeiras de 5 a 7 Ton.", "180 a 280 HP"],
    feature: "Compacto, eficiente, versátil."
  },
  {
    slug: "wp6-6-2l",
    image: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/weichai-motors-wp6-6-2l.png",
    title: "WP6 - 6.2L",
    tags: ["Tratores e colheitadeiras", "120 a 220 HP"],
    feature: "Ideal para agricultura, economia de diesel, baixa emissão."
  }
];

export function WeichaiProdutos({ initialProducts = [] }: { initialProducts?: any[] }) {
  const displayProducts = initialProducts.length > 0 
    ? initialProducts.map(p => ({
        slug: p.slug,
        image: p.mainImage || "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/weichai-motors-wp10-9-7l.png",
        title: p.name,
        tags: [p.engineCode, p.classification].filter(Boolean),
        feature: p.shortDescription || ""
      }))
    : fallbackProducts;

  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);
  const [dragMoved, setDragMoved] = useState(false);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setDragMoved(false);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeftState(scrollRef.current.scrollLeft);
    
    // Temporariamente desabilita snap e behavior suave para arrasto livre
    scrollRef.current.style.scrollBehavior = 'auto';
    scrollRef.current.style.scrollSnapType = 'none';
  };

  const handleMouseLeave = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (scrollRef.current) {
      scrollRef.current.style.scrollBehavior = 'smooth';
      scrollRef.current.style.scrollSnapType = 'x mandatory';
    }
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (scrollRef.current) {
      scrollRef.current.style.scrollBehavior = 'smooth';
      scrollRef.current.style.scrollSnapType = 'x mandatory';
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Ajuste de sensibilidade
    if (Math.abs(walk) > 10) setDragMoved(true);
    scrollRef.current.scrollLeft = scrollLeftState - walk;
  };

  const handleLinkClick = (e: React.MouseEvent) => {
    if (dragMoved) {
      e.preventDefault();
    }
  };

  return (
    <section id="modelos" className="section-padding bg-white overflow-hidden">
      <div className="section-container relative">
        <motion.h3 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[2.25rem] md:text-[2.5rem] font-bold text-[#053474] text-center mb-16"
        >
          Modelos de Motores
        </motion.h3>

        {/* Carousel Controls */}
        {displayProducts.length > 0 && (
          <div className="flex absolute top-1/2 left-2 right-2 md:-left-4 md:-right-4 -translate-y-1/2 justify-between pointer-events-none z-20">
            <button 
              onClick={() => scroll("left")}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-xl border border-[#E9ECEF] flex items-center justify-center text-[#053474] hover:bg-[#F8F9FA] transition-all pointer-events-auto active:scale-95"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <button 
              onClick={() => scroll("right")}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-xl border border-[#E9ECEF] flex items-center justify-center text-[#053474] hover:bg-[#F8F9FA] transition-all pointer-events-auto active:scale-95"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>
        )}

        {/* SLIDER / CAROUSEL */}
        <div 
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className={cn(
            "flex overflow-x-auto snap-x snap-mandatory gap-6 md:gap-8 pb-8 no-scrollbar px-4 md:px-0 select-none",
            isDragging ? "cursor-grabbing" : "cursor-grab"
          )}
        >
          {displayProducts.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-[1.5rem] overflow-hidden shadow-md border border-[#053474]/10 flex flex-col p-6 md:p-8 min-w-[320px] md:min-w-[400px] flex-shrink-0 snap-center"
            >
              {/* Image Area */}
              <div className="relative aspect-[4/3] mb-8 pointer-events-none">
                <Image 
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-contain drop-shadow-xl"
                />
              </div>

              {/* Title */}
              <h4 className="text-[28px] md:text-[34px] font-bold text-[#053474] text-center mb-8">
                {product.title}
              </h4>

              {/* Box Layout Area */}
              <div className="space-y-4 flex-1 flex flex-col justify-end">
                {/* Descrição Curta (Apenas se existir) */}
                {product.feature && (
                  <div className="flex items-center justify-center p-5 rounded-xl bg-slate-50 border border-[#053474]/10 min-h-[90px] text-center mb-6">
                    <span className="text-[14px] md:text-[15px] text-[#053474] font-medium leading-relaxed italic">
                      "{product.feature}"
                    </span>
                  </div>
                )}

                <Button 
                  asChild 
                  className="w-full h-14 rounded-full bg-[#0A4EE4] hover:bg-[#053474] text-white font-bold transition-all shadow-lg shadow-primary/20 group text-sm md:text-base"
                >
                  <Link href={`/catalogo/${product.slug}`} onClick={handleLinkClick}>
                    Ver Mais Informações
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Button 
            asChild
            variant="outline"
            className="h-14 px-10 rounded-full border-2 border-[#0A4EE4] text-[#0A4EE4] hover:bg-[#0A4EE4] hover:text-white font-bold transition-all"
          >
            <Link href="/catalogo?t=motores">
              Ver Catálogo Completo de Motores
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
