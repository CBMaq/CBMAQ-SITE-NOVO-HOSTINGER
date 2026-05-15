"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const units = [
  { label: "Unidade Brasília — Sede" },
  { label: "Unidade Goiânia - Filial" },
];

export function PecasLocationsSection() {
  return (
    <section className="bg-white section-padding overflow-hidden">
      <div className="section-container">
        <div className="flex flex-col lg:flex-row lg:items-stretch items-center gap-8 lg:gap-24">

          {/* Left: Smartphone Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-[1/2] xl:w-[600px] flex justify-center"
          >
            <div className="relative w-full max-w-[300px] md:max-w-[400px] aspect-[4/5] lg:aspect-square">
              <Image
                src="https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/pecas-smartphone.webp"
                alt="Peças CBMaq no Celular"
                fill
                className="object-contain"
              />
            </div>
          </motion.div>

          {/* Right: Units */}
          <div className="flex-1 w-full flex flex-col justify-center">
            <h2 className="text-[2.25rem] md:text-[3rem] font-bold text-[#053474] mb-12 tracking-tight">
              Onde encontrar
            </h2>

            <div className="flex flex-col gap-6">
              {units.map((unit, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="w-full max-w-[540px] bg-white rounded-full py-4 px-6 md:py-5 md:px-6 flex flex-row items-center gap-6 border border-[#0A4EE4]/30 shadow-sm hover:border-[#0A4EE4]/60 hover:shadow-md transition-all group cursor-pointer"
                >
                  <div className="shrink-0 relative flex items-center justify-center">
                    <Image
                      src="https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/pecas-map-pin.png"
                      alt="Localização"
                      width={72}
                      height={72}
                      className="object-contain transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <span className="text-[1.25rem] md:text-[1.5rem] font-semibold text-[#053474]">
                      {unit.label}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
