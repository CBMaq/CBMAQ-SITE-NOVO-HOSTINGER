"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function ConsorcioStats() {
  const stats = [
    {
      value: "13%",
      label: "Taxa administrativa total",
      sublabel: "A menor do mercado"
    },
    {
      value: "R$ 1M+",
      label: "Crédito máximo",
      sublabel: "Para grandes frotas"
    },
    {
      value: "230",
      label: "Prazo em meses",
      sublabel: "Parcelas que cabem no bolso"
    }
  ];

  return (
    <section className="section-padding bg-white overflow-hidden">
      <div className="section-container flex flex-col lg:flex-row items-center justify-between gap-16 md:gap-24">
        
        {/* Left Side — Circular Images Composite */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative w-full max-w-[580px] aspect-[4/3]"
        >
          {/* Using the composite image provided in the assets */}
          <div className="relative w-full h-full">
            <Image 
              src="https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/cons-sec2-img.webp"
              alt="Especialistas em Consórcio"
              fill
              className="object-contain"
            />
          </div>
        </motion.div>

        {/* Right Side — Big Numbers */}
        <div className="flex flex-col gap-12 md:gap-16 w-full lg:max-w-[400px]">
          {stats.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex flex-col items-center lg:items-start text-center lg:text-left"
            >
              <span className="text-[3.5rem] md:text-[4.50rem] font-bold text-[#0A2A5E] leading-none mb-2">
                {item.value}
              </span>
              <h3 className="text-[1.125rem] font-bold text-[#0A2A5E] mb-1">
                {item.label}
              </h3>
              <p className="text-[#4D5C7E] text-[0.9375rem] font-medium opacity-80">
                {item.sublabel}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
