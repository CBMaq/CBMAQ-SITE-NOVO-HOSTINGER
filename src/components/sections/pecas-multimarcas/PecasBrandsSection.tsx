"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const authorizedBrands = [
  { logo: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/logo-lovol2.png", name: "LOVOL" },
  { logo: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/logo-machinda-rise.png", name: "MAHINDRA" },
  { logo: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/logo-muller-branca.png", name: "MULLER" },
  { logo: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/marca-parceira-weichai.png", name: "WEICHAI" },
];

const multibrandsRow1 = [
  { url: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/logo-bobcat.png", scale: "h-9 md:h-11" },
  { url: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/logo-liugong.png", scale: "h-8 md:h-10" },
  { url: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/cropped-logo-1.png", scale: "h-8 md:h-10 scale-125" },
  { url: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/michelin-logo-blue-2x-1.png", scale: "h-9 md:h-11 scale-110" },
  { url: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/casmo-logo.png", scale: "h-8 md:h-10" },
  { url: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/logo-caterpillar.png", scale: "h-6 md:h-8" },
  { url: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/fleetguard-logo-png-transparent-fix.png", scale: "h-9 md:h-11" },
];

const multibrandsRow2 = [
  { url: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/mobil-logo-svg-1.png", scale: "h-9 md:h-11" },
  { url: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/logo-new-holland.png", scale: "h-6 md:h-8" },
  { url: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/logo-komatsu.png", scale: "h-6 md:h-8" },
  { url: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/logo-jcb.png", scale: "h-7 md:h-9" },
  { url: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/manitou-group-logo-svg-1.png", scale: "h-7 md:h-9" },
  { url: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/logo-xcmg.png", scale: "h-7 md:h-9" },
  { url: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/donaldson-company-1-1.png", scale: "h-8 md:h-10" },
  { url: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/dynapac-fayat-group-logo-vector-svg-1.png", scale: "h-8 md:h-10" },
];

export function PecasBrandsSection() {
  return (
    <section className="bg-white section-padding">
      <div className="section-container text-center mb-10">
        <h2 className="text-[2rem] md:text-[2.75rem] font-bold text-[#0a2a5e] mb-2 tracking-tight">
          Distribuidor Oficial:
        </h2>
      </div>

      {/* Tier 1: Authorized (Dark Cards) */}
      <div className="section-container mb-20 max-w-[1000px]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {authorizedBrands.map((brand, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="bg-[#0a2a5e] h-[80px] md:h-[100px] rounded-[16px] flex items-center justify-center p-4 transition-transform hover:scale-[1.03]"
              style={{
                boxShadow: "-2px 4px 6px 0px rgba(0, 0, 0, 0.25)"
              }}
            >
              <div className={cn(
                "relative w-full flex items-center justify-center",
                brand.name === "MULLER" ? "h-[85%]" : "h-[60%]"
              )}>
                <Image 
                  src={brand.logo} 
                  alt={brand.name} 
                  fill
                  className="object-contain"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Sub-title between tiers */}
      <div className="section-container text-center mb-8">
        <h3 className="text-[1.5rem] md:text-[36.46px] md:leading-[43.8px] font-medium text-[#053474]">
          Peças Originais e Compatíveis:
        </h3>
      </div>

      {/* Tier 2: Other Brands (Grid on Desktop, Slider on Mobile) */}
      <div className="section-container max-w-[1200px] relative px-4 md:px-0">
        
        {/* Mobile/Tablet Slider (Hidden on Desktop) */}
        <div className="lg:hidden relative group">
          {/* Navigation Arrows */}
          <button 
            onClick={() => {
              const el = document.getElementById("brands-slider");
              if (el) el.scrollBy({ left: -200, behavior: "smooth" });
            }}
            className="absolute -left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center border border-gray-100 text-[#0a2a5e]"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          
          <button 
            onClick={() => {
              const el = document.getElementById("brands-slider");
              if (el) el.scrollBy({ left: 200, behavior: "smooth" });
            }}
            className="absolute -right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center border border-gray-100 text-[#0a2a5e]"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>

          <div 
            id="brands-slider"
            className="flex gap-3 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {[...multibrandsRow1, ...multibrandsRow2].map((brand, idx) => (
              <div 
                key={idx}
                className="min-w-[calc(50%-6px)] snap-center bg-white border-[1.5px] border-[#CBD5E1] h-[70px] rounded-[12px] flex items-center justify-center p-3 shadow-sm"
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image 
                    src={brand.url} 
                    alt="Marca" 
                    fill 
                    className={cn("object-contain", brand.scale)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop View (Hidden on Mobile) */}
        <div className="hidden lg:flex flex-col gap-4 w-full">
          {/* Row 1 */}
          <div className="flex w-full justify-between gap-4">
            {multibrandsRow1.map((brand, idx) => (
              <motion.div
                key={`r1-${idx}`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.03 }}
                className="flex-1 bg-white border-[1.5px] border-[#CBD5E1] h-[70px] rounded-[12px] flex items-center justify-center p-3 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image 
                    src={brand.url} 
                    alt="Marca" 
                    fill 
                    className={cn("object-contain", brand.scale)}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Row 2 */}
          <div className="flex w-full justify-between gap-4">
            {multibrandsRow2.map((brand, idx) => (
              <motion.div
                key={`r2-${idx}`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.03 }}
                className="flex-1 bg-white border-[1.5px] border-[#CBD5E1] h-[70px] rounded-[12px] flex items-center justify-center p-3 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image 
                    src={brand.url} 
                    alt="Marca" 
                    fill
                    className={cn("object-contain", brand.scale)}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
