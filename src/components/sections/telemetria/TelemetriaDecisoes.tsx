"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function TelemetriaDecisoes() {
  const baseUrl = "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/";

  return (
    <section className="bg-white section-padding">
      <div className="section-container max-w-[1250px] mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* Texto à esquerda */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1"
          >
            <h2 className="text-[2.25rem] md:text-[3rem] font-bold text-[#0A2A5E] mb-8 leading-[1.1] tracking-tight max-w-[500px]">
              Transforme dados em decisões assertivas
            </h2>
            
            <p className="text-[1rem] md:text-[1.125rem] font-medium text-[#4D5C7E] leading-relaxed mb-10 max-w-[580px]">
              Nossa solução opera em regiões remotas onde o sinal de celular é inexistente, utilizando conectividade híbrida com tecnologia satelital. Seja em minas subterrâneas, fazendas isoladas ou frentes de infraestrutura, você terá total visibilidade da operação.
            </p>

            <div className="flex flex-col items-start gap-4">
              <span className="inline-flex items-center px-8 py-3 rounded-full border border-[#0A4EE4]/20 text-[#0A2A5E] font-bold text-[0.9375rem] bg-[#F1F6FF]">
                Conectividade: GPRS/4G + Satelital.
              </span>
              <span className="inline-flex items-center px-8 py-3 rounded-full border border-[#0A4EE4]/20 text-[#0A2A5E] font-bold text-[0.9375rem] bg-[#F1F6FF]">
                Visibilidade: 100% da operação.
              </span>
            </div>
          </motion.div>

          {/* Imagem à direita */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-[50%] relative"
          >
            <div className="relative w-full aspect-[1.3/1] rounded-[24px] overflow-hidden shadow-2xl">
              <Image 
                src={`${baseUrl}telemetria-dashboard-copy.webp`} 
                alt="Painel de Telemetria no Tablet" 
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
