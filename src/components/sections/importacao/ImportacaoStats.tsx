"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function ImportacaoStats() {
  const baseUrl = "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/";

  const stats = [
    { value: "+500", label: "Equipamentos Importados" },
    { value: "+15", label: "Anos de Experiência" },
    { value: "3", label: "Marcas Representadas" },
    { value: "100+", label: "Taxa de Sucesso" },
  ];

  return (
    <section className="bg-white section-padding overflow-hidden">
      <div className="section-container">
        <div className="flex flex-col lg:flex-row items-stretch gap-16 lg:gap-24">
          
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2"
          >
            <div className="relative w-full aspect-[4/3] lg:aspect-auto lg:h-full rounded-[24px] overflow-hidden shadow-2xl">
              <Image
                src={`${baseUrl}mask-group-copy.webp`}
                alt="Logística de Importação CBMaq"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          {/* Right: Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 flex flex-col relative"
          >
            {/* Divider Gradient Line */}
            <div className="hidden lg:block absolute left-[calc(-2rem-1px)] top-[5%] bottom-[5%] w-[4px] bg-gradient-to-b from-transparent to-[#0A4EE4] rounded-full" />

            <div className="grid grid-cols-2 lg:flex lg:flex-col gap-x-4 gap-y-10 lg:gap-10">
              {stats.map((stat, idx) => (
                <div key={idx} className="flex flex-col lg:pl-0">
                  <span className="text-[2.25rem] md:text-[4rem] font-extrabold text-[#053474] leading-none mb-2 tracking-tight">
                    {stat.value}
                  </span>
                  <span className="text-[0.875rem] md:text-[1.375rem] text-[#3E4A66] font-medium leading-snug">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
