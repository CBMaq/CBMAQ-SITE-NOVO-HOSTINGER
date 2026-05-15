"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const segmentos = [
  "Construção Civil",
  "Mineração",
  "Agronegócio",
  "Energia",
  "Transportes",
];

export function TelemetriaSegmentos() {
  const baseUrl = "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/";

  return (
    <section className="bg-[#F4F3ED] section-padding">
      <div className="section-container max-w-[1250px] mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Imagens à Esquerda */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 flex items-center justify-center gap-4 lg:gap-6"
          >
            <div className="relative w-[30%] aspect-[1/2.2] rounded-[100px] overflow-hidden shadow-xl">
              <Image 
                src={`${baseUrl}telemetria-05.png`} 
                alt="Segmento 1" 
                fill
                className="object-cover"
              />
            </div>
            <div className="relative w-[30%] aspect-[1/2.2] rounded-[100px] overflow-hidden shadow-xl">
              <Image 
                src={`${baseUrl}telemetria-06.png`} 
                alt="Segmento 2" 
                fill
                className="object-cover"
              />
            </div>
            <div className="relative w-[30%] aspect-[1/2.2] rounded-[100px] overflow-hidden shadow-xl">
              <Image 
                src={`${baseUrl}telemetria-07.png`} 
                alt="Segmento 3" 
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          {/* Chips à Direita */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-1/2 flex flex-col items-center lg:items-start"
          >
            <h2 className="text-[2.25rem] md:text-[3rem] font-bold text-[#0A2A5E] mb-12 leading-[1.1] tracking-tight text-center lg:text-left w-full">
              Segmentos atendidos
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-[500px]">
              {segmentos.map((seg, idx) => (
                <div 
                  key={idx}
                  className="px-6 py-4 rounded-[12px] border border-[#0A4EE4]/40 text-[#0A2A5E] font-bold text-[1.125rem] text-center bg-white/50 backdrop-blur-sm shadow-sm"
                >
                  {seg}
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
