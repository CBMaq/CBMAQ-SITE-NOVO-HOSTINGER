"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const metrics = [
  { value: "+20", label: "Anos de Experiência" },
  { value: "PDA", label: "Gestão Inteligente" },
  { value: "24–72h", label: "Entrega Expressa" },
];

export function PecasMetricsSection() {
  return (
    <section className="bg-white overflow-hidden section-padding">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Image Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[300px] md:h-[450px] rounded-[2rem] overflow-hidden"
          >
            <Image
              src="https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/pecas-second-sec-img.webp"
              alt="Estoque de Peças CBMaq"
              fill
              className="object-cover"
            />
          </motion.div>

          {/* Text & Metrics Right */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center lg:pr-8 relative pl-6 md:pl-8"
          >
            {/* Gradient Left Line */}
            <div className="absolute left-0 top-0 bottom-0 w-[5px] bg-gradient-to-b from-transparent via-[#0A4EE4]/60 to-[#0A4EE4] rounded-full" />

            <p className="text-[1.125rem] md:text-[1.35rem] leading-[1.6] text-[#053474] mb-12">
              Com mais de 60 anos de experiência, oferecemos o maior e mais organizado estoque de peças da região. Tecnologia de ponta com coletores móveis PDA para precisão absoluta em cada operação. Sua peça é localizada e separada com agilidade, garantindo entrega super rápida em qualquer lugar do Brasil.
            </p>

            {/* Metrics Row */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-10 md:gap-8">
              {metrics.map((m, idx) => (
                <div key={idx} className="flex items-center gap-8 md:gap-8">
                  <div className="flex flex-col">
                    <span className="text-[1.75rem] lg:text-[2.25rem] font-black text-[#053474] leading-none mb-1.5 tracking-tight whitespace-nowrap">
                      {m.value}
                    </span>
                    <span className="text-[0.75rem] lg:text-[0.875rem] text-[#053474]/80 leading-tight whitespace-nowrap">
                      {m.label}
                    </span>
                  </div>
                  {idx < metrics.length - 1 && (
                    <div className="hidden md:block h-[45px] flex-shrink-0 opacity-80">
                       <img 
                         src="https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/pecas-divisor1.svg" 
                         alt="" 
                         className="h-full w-auto" 
                       />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
