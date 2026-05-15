"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft } from "lucide-react";
import Link from "next/link";

const STATIC_BRANDS = [
  {
    id: "ammann",
    name: "AMMANN",
    slug: "ammann",
    logo: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/marca-parceira-ammann.png",
    coverImage: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/mask-group-copy-2.webp",
    description: "Líder global em usinas de asfalto e equipamentos de compactação com tecnologia suíça.",
  },
  {
    id: "lovol",
    name: "LOVOL",
    slug: "lovol",
    logo: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/logolovol.png",
    coverImage: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/zyc-8762-copy.webp",
    description: "Excelência em tratores e máquinas agrícolas com alto desempenho e economia.",
  },
  {
    id: "mahindra",
    name: "MAHINDRA",
    slug: "mahindra",
    logo: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/marca-parceira-mahindra.png",
    coverImage: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/marca-parceira-mahindra1.webp",
    description: "A força da maior fabricante de tratores do mundo presente na sua operação.",
  },
  {
    id: "muller",
    name: "MULLER",
    slug: "muller",
    logo: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/logo-muller-branca.png",
    coverImage: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/mullermaquina.webp",
    description: "Referência nacional em máquinas pesadas, com tradição, robustez e alta performance em obras por todo o Brasil.",
  },
];

export function BrandsSection() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const brands = STATIC_BRANDS;

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <section className="section-padding bg-white overflow-hidden">
      <div className="section-container relative">
        <div className="text-center mb-20">
           <motion.h2 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="text-[2.25rem] md:text-[2.75rem] font-bold text-[#0A2A5E] tracking-tight"
           >
             Marcas parceiras
           </motion.h2>
        </div>

        {/* Carousel Controls */}
        {brands.length > 0 && (
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
          className="flex gap-6 overflow-x-auto no-scrollbar pb-8 snap-x snap-mandatory px-0 -mx-0 md:px-0 md:mx-0"
        >
          {brands.map((brand, idx) => (
            <Link
              key={brand.id}
              href={`/catalogo?marca=${brand.slug}&t=tratores`}
              className="block min-w-full md:min-w-[calc(50%-12px)] lg:min-w-[calc(25%-18px)] snap-start"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="relative aspect-[3/5] rounded-[24px] overflow-hidden group shadow-lg cursor-pointer transition-all duration-500 h-full"
              >
                {/* Background Image */}
                <Image 
                  src={brand.coverImage || "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/marca-parceira-lovol1.webp"}
                  alt={brand.name}
                  fill
                  className={cn(
                    "object-cover transition-all duration-700",
                    hoveredIdx === idx ? "scale-110 blur-[2px] brightness-50" : "scale-100"
                  )}
                />

                {/* Default Gradient Overlay */}
                <div className={cn(
                  "absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500",
                  hoveredIdx === idx ? "opacity-0" : "opacity-100"
                )} />
                
                {/* Interactive Content Overlay */}
                <div className="absolute inset-0 p-8 flex flex-col items-center text-center">
                  {/* Default Brand Logo (Bottom) - Fades out */}
                  <motion.div
                    animate={{ 
                      opacity: hoveredIdx === idx ? 0 : 1,
                      y: hoveredIdx === idx ? -20 : 0,
                      scale: hoveredIdx === idx ? 0.9 : 1
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[80%] h-12 flex items-center justify-center z-10"
                  >
                    <Image 
                      src={brand.logo} 
                      alt={`Logo ${brand.name}`} 
                      width={140} 
                      height={56} 
                      className={cn(
                        "object-contain brightness-0 invert",
                        (brand.name.toUpperCase() === "MÜLLER" || brand.name.toUpperCase() === "MULLER") && "brightness-0 invert"
                      )}
                    />
                  </motion.div>

                  {/* Active Brand Logo (Top) - Fades in and slides up */}
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ 
                      opacity: hoveredIdx === idx ? 1 : 0,
                      y: hoveredIdx === idx ? 32 : 40,
                      scale: 0.8
                    }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-12 flex items-center justify-center z-20 pointer-events-none"
                  >
                    <Image 
                      src={brand.logo} 
                      alt={`Logo active ${brand.name}`} 
                      width={140} 
                      height={56} 
                      className={cn(
                        "object-contain brightness-0 invert",
                        (brand.name.toUpperCase() === "MÜLLER" || brand.name.toUpperCase() === "MULLER") && "brightness-0 invert",
                        "drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                      )}
                    />
                  </motion.div>

                  {/* Brand Info - Fades in */}
                  <AnimatePresence>
                    {hoveredIdx === idx && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ delay: 0.1 }}
                        className="absolute top-[42%] left-0 right-0 px-6"
                      >
                        <p className="text-white/90 text-sm md:text-base leading-relaxed font-medium line-clamp-4">
                          {brand.description}
                        </p>
                        
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          className="mt-8"
                        >
                          <Button 
                            variant="outline" 
                            className="bg-white text-[#0A2A5E] hover:bg-white/90 border-none rounded-lg px-6 font-semibold flex items-center gap-2 group/btn mx-auto shadow-lg"
                          >
                            Ver Máquinas
                            <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                          </Button>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                 {/* Solid Plus Icon - Rotates on hover */}
                 <motion.div 
                   animate={{ 
                     rotate: hoveredIdx === idx ? 45 : 0,
                     opacity: hoveredIdx === idx ? 0 : 1,
                     scale: hoveredIdx === idx ? 0.5 : 1
                   }}
                   className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-[0px_4px_12px_rgba(0,0,0,0.25)] z-10"
                 >
                    <Image 
                      src="https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/plus.svg" 
                      alt="Ver mais" 
                      width={26} 
                      height={26} 
                      className="object-contain"
                    />
                 </motion.div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
