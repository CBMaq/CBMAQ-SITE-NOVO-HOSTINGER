"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const officialBrands = [
  { logo: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/logo-lovol2.png", name: "LOVOL" },
  { logo: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/marca-parceira-ammann.png", name: "AMMANN" },
  { logo: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/logo-machinda-rise.png", name: "MAHINDRA" },
  { logo: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/logo-muller-branca.png", name: "MULLER" },
  { logo: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/marca-parceira-weichai.png", name: "WEICHAI" },
];

const brandRow1 = [
  { url: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/michelin-logo-blue-2x-1.png", scale: "h-11 scale-110" },
  { url: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/casmo-logo.png", scale: "h-10" },
  { url: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/mobil-logo-svg-1.png", scale: "h-11" },
  { url: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/fleetguard-logo-png-transparent-fix.png", scale: "h-11" },
  { url: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/cropped-logo-1.png", scale: "h-10" },
  { url: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/logo-caterpillar.png", scale: "h-8" },
];

const brandRow2 = [
  { url: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/logo-komatsu.png", scale: "h-8" },
  { url: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/logo-new-holland.png", scale: "h-8" },
  { url: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/dynapac-fayat-group-logo-vector-svg-1.png", scale: "h-10" },
  { url: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/logo-xcmg.png", scale: "h-9" },
  { url: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/manitou-group-logo-svg-1.png", scale: "h-9" },
  { url: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/logo-jcb.png", scale: "h-9" },
  { url: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/donaldson-company-1-1.png", scale: "h-10" },
];

export function EcommerceMarcas() {
  return (
    <section className="bg-[#F8F9FB] section-padding overflow-hidden">
      <div className="section-container text-center mb-16">
        <h2 className="text-[2.5rem] md:text-[3rem] font-bold text-[#0A2A5E] mb-20 tracking-tight">
          Marcas disponíveis
        </h2>
        
        <p className="text-[1.5rem] md:text-[36.46px] md:leading-[43.8px] font-medium text-[#053474] mb-10 flex items-center justify-center gap-4">
          <span className="h-[1px] w-12 bg-cbmaq-gray-300 hidden md:block" />
          Distribuidor Oficial:
          <span className="h-[1px] w-12 bg-cbmaq-gray-300 hidden md:block" />
        </p>
      </div>

      {/* Tier 1: Official */}
      <div className="section-container mb-24">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
          {officialBrands.map((brand, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="bg-[#0A2A5E] h-[90px] md:h-[110px] rounded-[18px] flex items-center justify-center p-5 shadow-lg shadow-cbmaq-navy/10 transition-transform hover:scale-[1.03]"
            >
              <div className={cn(
                "relative w-full flex items-center justify-center h-[60%]"
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

      <div className="section-container text-center mb-10">
        <p className="text-[1.75rem] md:text-[36px] leading-[44px] font-medium text-[#053474] mb-10">
          Peças Originais e Compatíveis:
        </p>
      </div>

      {/* Tier 2: Compatible - 2 Rows strictly */}
      <div className="section-container space-y-4">
        {/* Row 1: 6 columns on large screens */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {brandRow1.map((brand, idx) => (
            <motion.div
              key={`row1-${idx}`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.03 }}
              className="bg-white border-[1.5px] border-[#CBD5E1] h-[75px] rounded-[12px] flex items-center justify-center p-4 shadow-sm transition-all hover:shadow-md hover:border-cbmaq-blue-100/50"
            >
              <Image 
                src={brand.url} 
                alt="Marca compatível" 
                width={110} 
                height={40} 
                className={cn(
                  "object-contain w-auto",
                  brand.scale
                )}
              />
            </motion.div>
          ))}
        </div>

        {/* Row 2: 7 columns on large screens (will center or wrap as needed) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
          {brandRow2.map((brand, idx) => (
            <motion.div
              key={`row2-${idx}`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.03 }}
              className="bg-white border-[1.5px] border-[#CBD5E1] h-[75px] rounded-[12px] flex items-center justify-center p-4 shadow-sm transition-all hover:shadow-md hover:border-cbmaq-blue-100/50"
            >
              <Image 
                src={brand.url} 
                alt="Marca compatível" 
                width={110} 
                height={40} 
                className={cn(
                  "object-contain w-auto",
                  brand.scale
                )}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
