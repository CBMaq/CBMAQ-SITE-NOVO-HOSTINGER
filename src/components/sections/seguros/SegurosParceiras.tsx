"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const baseUrl = "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/";

// Exact filenames from the Media Gallery screenshot
const row1 = [
  { name: "Itaú Seguros", logo: `${baseUrl}seguros-logo-itau-1.png` },
  { name: "Bradesco Seguros", logo: `${baseUrl}seguros-logo-bradesco-seguros-1.png` },
  { name: "BB Seguros", logo: `${baseUrl}seguros-logo-bb-seguros-1.png` },
  { name: "Porto Seguro", logo: `${baseUrl}seguros-logo-porto-seguro-1.png` },
  { name: "Caixa Seguradora", logo: `${baseUrl}seguros-logo-caixa-1.png` },
];

const row2 = [
  { name: "Allianz", logo: `${baseUrl}seguros-logo-allianz-1.png` },
  { name: "HDI Seguros", logo: `${baseUrl}seguros-logo-hdi-seguros-1.png` },
  { name: "Mapfre", logo: `${baseUrl}seguros-logo-logomapfre-1.png` },
  { name: "Tokio Marine", logo: `${baseUrl}seguros-logo-tokio-1.png` },
  { name: "Zurich", logo: `${baseUrl}seguros-logo-zurich-1.png` },
  { name: "SulAmérica", logo: `${baseUrl}seguros-logo-sulamerica-1.png` },
];

export function SegurosParceiras() {
  return (
    <section className="bg-gradient-to-b from-[#FCFCFC] to-[#FBFBFB] section-padding">
      <div className="section-container text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[1.75rem] md:text-[2.25rem] font-bold text-[#053474] tracking-tight leading-tight max-w-[700px] mx-auto"
        >
          Somos parceiros das principais seguradoras do Brasil:
        </motion.h2>
      </div>

      <div className="section-container max-w-[1200px]">
        {/* Row 1: 5 logos */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4 mb-3 md:mb-4">
          {row1.map((brand, idx) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white border-[1px] border-[#053474]/30 rounded-[12px] h-[80px] md:h-[100px] flex items-center justify-center p-4 md:p-6"
            >
              <div className="relative w-full h-full">
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

        {/* Row 2: 6 logos */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 md:gap-4">
          {row2.map((brand, idx) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: (idx + 5) * 0.05 }}
              className="bg-white border-[1px] border-[#053474]/30 rounded-[12px] h-[80px] md:h-[100px] flex items-center justify-center p-4 md:p-6"
            >
              <div className="relative w-full h-full">
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
    </section>
  );
}
