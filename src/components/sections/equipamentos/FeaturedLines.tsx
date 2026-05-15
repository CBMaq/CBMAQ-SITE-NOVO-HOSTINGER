"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";

interface FeaturedLinesProps {
  products: any[];
}

export function FeaturedLines({ products }: FeaturedLinesProps) {
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

  if (!products || products.length === 0) return null;

  return (
    <section className="bg-white section-padding overflow-hidden">
      <div className="section-container relative">
        <h2 className="text-[2.25rem] md:text-[3rem] font-bold text-[#0A2A5E] text-center mb-16 tracking-tight">
          Linhas em destaque
        </h2>

        {/* Carousel Controls - Only visible on desktop if many items */}
        {products.length > 0 && (
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
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className={`flex gap-6 overflow-x-auto no-scrollbar pb-8 snap-x snap-mandatory px-0 -mx-0 md:px-0 md:mx-0 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        >
          {products.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="min-w-full md:min-w-[calc(50%-12px)] lg:min-w-[calc(25%-18px)] bg-white border border-[#E9ECEF] rounded-[24px] flex flex-col transition-all hover:shadow-xl hover:-translate-y-1 group snap-start select-none overflow-hidden"
            >
              {/* Image Container - Now edge-to-edge */}
              <div className="relative w-full aspect-[4/3] pointer-events-none overflow-hidden">
                <Image
                  src={product.mainImage || "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/lovol-td1304.webp"}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Content Container - With padding */}
              <div className="px-6 py-8 flex flex-col items-center text-center flex-1">
                <div className="mb-8 flex-1">
                  <span className="text-[10px] font-bold text-[#0A4EE4] uppercase tracking-widest mb-1 block">
                    {product.brand?.name}
                  </span>
                  <h3 className="text-[1.25rem] font-bold text-[#0A2A5E]">
                    {product.name}
                  </h3>
                </div>

                <Link
                  href={`/catalogo/${product.slug}`}
                  onClick={handleLinkClick}
                  className="inline-flex h-[3.25rem] px-8 rounded-full bg-[#0A4EE4] text-white items-center justify-center gap-2 font-bold text-[0.875rem] transition-all hover:bg-[#083DB4] group-hover:scale-105 shadow-lg shadow-[#0A4EE4]/20"
                >
                  Ver mais
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

