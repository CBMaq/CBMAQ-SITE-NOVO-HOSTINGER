"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const baseUrl = "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/";

const items = [
  { icon: `${baseUrl}seguros-frotas-icon1.png`, text: "Cobertura para máquinas novas e usadas" },
  { icon: `${baseUrl}seguros-frotas-icon2.png`, text: "Proteção durante transporte terrestre" },
  { icon: `${baseUrl}seguros-frotas-icon3.png`, text: "Assistência 24 horas em todo o Brasil" },
  { icon: `${baseUrl}seguros-frotas-icon4.png`, text: "Franquia reduzida para clientes CBMaq" },
  { icon: `${baseUrl}seguros-frotas-icon5.png`, text: "Indenização por valor de mercado atualizado" },
  { icon: `${baseUrl}seguros-frotas-icon6.png`, text: "Cobertura para equipamentos importados" },
];

export function SegurosFrotas() {
  return (
    <section className="bg-white section-padding">
      <div className="section-container text-center mb-12 md:mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[1.875rem] md:text-[2.75rem] font-bold text-[#053474] tracking-tight"
        >
          Processo para frotas
        </motion.h2>
      </div>

      <div className="section-container max-w-[1200px]">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-16">
          {/* Left: Image (Mirroring the structure) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-[42%]"
          >
            <div className="relative w-full h-[300px] md:h-[420px] rounded-[32px] overflow-hidden">
              <Image
                src={`${baseUrl}seguros-frotas-img.webp`}
                alt="Seguro para Frotas CBMaq"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          {/* Right: Content with Gradient Divider */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-[58%] relative pl-8 md:pl-12 py-2"
          >
            {/* Vertical Gradient Line — 4px wide, transparent to blue */}
            <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-gradient-to-b from-transparent via-[#0091FF] to-[#0091FF] rounded-full" />

            {/* Intro Text */}
            <p className="text-[#053474] text-[1.125rem] md:text-[1.25rem] leading-[1.5] font-medium mb-10 max-w-[500px]">
              Condições especiais para empresas com múltiplos equipamentos. Quanto maior sua frota, melhores são as condições de seguro.
            </p>

            {/* Grid of 2 Columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8 md:gap-y-10">
              {items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className="shrink-0 w-[42px] h-[42px] md:w-[48px] md:h-[48px] relative">
                    <Image 
                      src={item.icon} 
                      alt="" 
                      fill 
                      className="object-contain" 
                    />
                  </div>
                  <p className="text-[#053474] text-[0.875rem] md:text-[0.9375rem] font-semibold leading-[1.3] max-w-[180px]">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
