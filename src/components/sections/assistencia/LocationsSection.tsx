"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const locations = [
  { city: "Brasília DF — Matriz", phone: "(61) 3204-0909" },
  { city: "Goiânia — GO (Filial)", phone: "(62) 3413-0990" },
  { city: "Palmas — TO (Filial)", phone: "(63) 3028-0909" },
  { city: "Parauapebas — PA (Filial)", phone: "(61) 9983-4952" },
  { city: "Cariacica — ES (Filial)", phone: "(61) 9983-4952" },
];

export function LocationsSection() {
  return (
    <section className="bg-white section-padding overflow-hidden">
      <div className="section-container">
        <div className="flex flex-col lg:flex-row lg:items-stretch items-center gap-12 lg:gap-24">

          {/* Image - Dynamic Height on Desktop */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-[1/2] xl:w-[600px] flex"
          >
            <div className="bg-[#EBEBEB] rounded-[40px] md:rounded-[64px] shadow-sm flex-1 overflow-hidden">
              <div className="relative aspect-[4/3] lg:aspect-auto lg:h-full min-h-[300px]">
                <Image
                  src="https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/fachada.webp"
                  alt="Unidade CBMaq"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </motion.div>

          {/* Content - 1:1 Reference Style */}
          <div className="flex-1 w-full">
            <h2 className="text-[2rem] md:text-[2.75rem] font-bold text-[#0a2a5e] mb-10 md:mb-12 tracking-[-0.02em] text-center lg:text-left">
              Onde estamos
            </h2>

            <div className="flex flex-col gap-6 md:gap-8 items-center lg:items-start">
              {locations.map((loc, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="w-full max-w-[500px] min-h-[112px] py-6 bg-[#FBFBFB] rounded-[28px] px-6 md:px-8 flex items-center gap-4 md:gap-8 border border-[#9EC9FF] shadow-[inset_0_4px_10px_rgba(0,0,0,0.06)] group hover:bg-white transition-all"
                >
                  <div className="shrink-0 relative w-[60px] md:w-[100px] h-[50px] md:h-[80px]">
                    <Image
                      src="https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/end-bloco.png"
                      alt="Endereço"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <span className="text-[1.125rem] md:text-[1.5rem] font-bold text-[#082B5B] leading-[1.2] mb-1">
                      {loc.city}
                    </span>
                    <span className="text-[1.375rem] md:text-[1.875rem] text-[#082B5B] font-medium leading-[1.2]">
                      {loc.phone}
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
