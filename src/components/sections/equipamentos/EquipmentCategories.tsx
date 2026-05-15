"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface EquipmentCategoriesProps {
  categories: any[];
}

export function EquipmentCategories({ categories }: EquipmentCategoriesProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <section 
      id="categories" 
      className="section-padding bg-white overflow-hidden"
    >
      <div className="section-container relative">
        <div className="text-center mb-16">
           <h2 className="text-[2.25rem] md:text-[2.75rem] font-bold text-[#0A2A5E] tracking-tight">
             Categorias de Máquinas
           </h2>
        </div>

        {/* Carousel Controls */}
        {categories.length > 0 && (
          <div className="flex absolute top-1/2 left-2 right-2 md:-left-4 md:-right-4 -translate-y-1/2 justify-between pointer-events-none z-20">
            <button 
              onClick={() => scroll("left")}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-xl border border-[#E9ECEF] flex items-center justify-center text-[#0A2A5E] hover:bg-[#F8F9FA] transition-all pointer-events-auto active:scale-95"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <button 
              onClick={() => scroll("right")}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-xl border border-[#E9ECEF] flex items-center justify-center text-[#0A2A5E] hover:bg-[#F8F9FA] transition-all pointer-events-auto active:scale-95"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>
        )}

        <div 
          ref={scrollRef}
          className="flex gap-6 md:gap-10 overflow-x-auto no-scrollbar pb-8 snap-x snap-mandatory px-0 -mx-0 md:px-0 md:mx-0"
        >
          {categories.map((cat, idx) => {
            return (
              <Link
                key={cat.id}
                href={`/catalogo?categoria=${cat.slug}&t=tratores`}
                className="block group min-w-full md:min-w-[calc(50%-16px)] lg:min-w-[calc(33.333%-20px)] snap-start"
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="card-pill aspect-[4/5] relative h-full flex flex-col justify-end p-8 overflow-hidden"
                >
                  <Image
                    src={cat.coverImage || "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/cat-quadro1.webp"}
                    alt={cat.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  <div 
                    className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent transition-opacity group-hover:opacity-90" 
                  />

                  <div className="relative z-10 transition-transform duration-500 group-hover:-translate-y-2">
                    <h3 className="text-[1.5rem] md:text-[1.75rem] font-bold text-white mb-3">
                      {cat.name}
                    </h3>
                    <p className="text-[0.875rem] md:text-[1rem] leading-relaxed text-white/80 font-medium whitespace-pre-line line-clamp-2">
                      {cat.description}
                    </p>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
