"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ImageIcon } from "lucide-react";

interface ProductGalleryProps {
  product: any;
}

export function ProductGallery({ product }: ProductGalleryProps) {
  const images = [product.mainImage, ...(product.galleryImages || [])].filter(Boolean);
  const [activeImage, setActiveImage] = useState(images[0]);

  if (images.length === 0) return null;

  return (
    <section className="section-padding bg-[#F8F9FA]">
      <div className="section-container">
        <div className="flex flex-col items-center mb-16 text-center">
          <span className="text-[10px] font-bold text-[#0A4EE4] uppercase tracking-[0.3em] mb-4 block">Visão Detalhada</span>
          <h2 className="text-3xl md:text-[2.5rem] font-bold text-[#0A2A5E] tracking-tight">Galeria do Equipamento</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Thumbnails - Horizontal on Mobile, Vertical on Desktop */}
          <div className="lg:col-span-2 order-2 lg:order-1 flex lg:flex-col gap-4 overflow-x-auto lg:overflow-y-auto lg:max-h-[500px] no-scrollbar pb-2 lg:pb-0">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(img)}
                className={cn(
                  "relative aspect-square w-20 lg:w-full shrink-0 rounded-[1.2rem] border-2 transition-all overflow-hidden bg-white p-3 shadow-sm",
                  activeImage === img 
                    ? "border-[#0A4EE4] shadow-lg shadow-[#0A4EE4]/10" 
                    : "border-[#E9ECEF] hover:border-[#0A4EE4]/30"
                )}
              >
                <Image src={img} alt={`${product.name} thumbnail ${idx}`} fill className="object-contain p-2" />
              </button>
            ))}
          </div>

          {/* Main View */}
          <div className="lg:col-span-10 order-1 lg:order-2 aspect-[16/9] relative bg-white rounded-[2rem] md:rounded-[2.5rem] border border-[#E9ECEF] shadow-sm overflow-hidden group">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeImage}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.4 }}
                className="relative w-full h-full"
              >
                <Image 
                  src={activeImage} 
                  alt={product.name} 
                  fill 
                  className="object-contain p-8 md:p-12 group-hover:scale-105 transition-transform duration-1000"
                />
              </motion.div>
            </AnimatePresence>
            
            {/* Overlay Gradient for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A2A5E]/5 to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
