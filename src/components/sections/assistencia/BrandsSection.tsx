"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const authorizedBrands = [
  { logo: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/logo-lovol2.png", name: "LOVOL" },
  { logo: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/marca-parceira-ammann.png", name: "AMMANN" },
  { logo: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/logo-machinda-rise.png", name: "MAHINDRA" },
  { logo: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/logo-muller-branca.png", name: "MULLER" },
  { logo: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/marca-parceira-weichai.png", name: "WEICHAI" },
];

const row1Brands = [
  { url: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/logo-bobcat.png", scale: "h-11" },
  { url: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/logo-caterpillar.png", scale: "h-8" },
  { url: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/logo-komatsu.png", scale: "h-8" },
  { url: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/logo-john-deere.png", scale: "h-10" },
  { url: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/logo-case.png", scale: "h-10" },
  { url: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/logo-new-holland.png", scale: "h-8" },
];

const row2Brands = [
  { url: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/logo-volvo.png", scale: "h-9" },
  { url: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/hyundai-logo2.png", scale: "h-14 scale-125" },
  { url: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/logo-xcmg.png", scale: "h-9" },
  { url: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/logo-liugong.png", scale: "h-10" },
  { url: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/logo-sany.png", scale: "h-11" },
  { url: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/logo-jcb.png", scale: "h-9" },
];

export function BrandsSection() {
  return (
    <section className="bg-white section-padding">
      <div className="section-container text-center mb-16">
        <h2 className="text-[2.5rem] md:text-[3rem] font-bold text-[#0a2a5e] mb-4">
          Atendemos todas as marcas
        </h2>
        <p className="text-[28px] md:text-[37.28px] font-semibold text-[#0a2a5e] leading-[1.2] md:leading-[50px]">
          Marcas com suporte prioritário:
        </p>
      </div>

      {/* Tier 1: Authorized (Dark Cards) */}
      <div className="section-container mb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {authorizedBrands.map((brand, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="bg-[#0a2a5e] h-[100px] rounded-[16px] flex items-center justify-center p-4 transition-transform hover:scale-[1.03]"
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

      <div className="section-container text-center mb-12">
        <p className="text-[28px] md:text-[37.28px] font-semibold text-[#0a2a5e] leading-[1.2] md:leading-[50px]">
          Outras marcas atendidas:
        </p>
      </div>

      {/* Tier 2: Multibrand Support (Light Grid - 2 Rows) */}
      <div className="section-container space-y-4">
        {/* Row 1: 6 items */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {row1Brands.map((brand, idx) => (
            <motion.div
              key={`r1-${idx}`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.03 }}
              className="bg-white border-[1.5px] border-[#CBD5E1] h-[75px] rounded-[10px] flex items-center justify-center p-4 shadow-sm"
            >
              <Image 
                src={brand.url} 
                alt="Marca suportada" 
                width={120} 
                height={50} 
                className={cn(
                  "object-contain w-auto",
                  brand.scale
                )}
              />
            </motion.div>
          ))}
        </div>

        {/* Row 2: 7 items */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
          {row2Brands.map((brand, idx) => (
            <motion.div
              key={`r2-${idx}`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.03 }}
              className="bg-white border-[1.5px] border-[#CBD5E1] h-[75px] rounded-[10px] flex items-center justify-center p-4 shadow-sm"
            >
              <Image 
                src={brand.url} 
                alt="Marca suportada" 
                width={120} 
                height={50} 
                className={cn(
                  "object-contain w-auto",
                  brand.scale
                )}
              />
            </motion.div>
          ))}

          {/* "+ Outras marcas" card */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="border-[1.5px] border-[#CBD5E1] bg-white h-[75px] rounded-[10px] flex items-center justify-center p-4 shadow-sm"
          >
            <span className="text-[#0a2a5e] font-sans font-bold text-[1.125rem] md:text-[1.25rem] leading-tight text-center">
              + Outras <br /> marcas
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
