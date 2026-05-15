"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function AssistenciaHero() {


  return (
    <section className="relative w-full h-[600px] md:h-[700px] lg:h-[780px] flex items-center overflow-hidden">
      {/* Background Image — Literal 1:1 reproduction */}
      <Image
        src="https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/assistencia-tecnica-especializada.webp"
        alt="Assistência Técnica CBMaq"
        fill
        className="object-cover object-center"
        priority
        quality={100}
      />

      {/* Overlay: Exact same as EquipmentHero for consistency */}
      <div 
        className="absolute inset-0 z-10 transition-all duration-500
                   bg-[linear-gradient(to_bottom,#053474_0%,rgba(5,52,116,0.4)_50%,rgba(5,52,116,0.1)_100%)] 
                   md:bg-[linear-gradient(90deg,#053474_0%,rgba(5,52,116,0)_70%)]"
      />

      {/* Content Container */}
      <div className="section-container relative z-20 w-full h-full flex flex-col justify-center">
        <motion.div
           initial={{ opacity: 0, x: -30 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 1, ease: "easeOut" }}
           className="max-w-[840px] mt-16 md:mt-0"
        >
          {/* Main Title: Exact from Foto 2 */}
          <h1 className="text-[2rem] md:text-[3rem] lg:text-[4.5rem] leading-[1.1] font-bold text-white mb-6 tracking-tight max-w-[800px]">
             Assistência Técnica <br />
             Especializada
          </h1>

          {/* Description Text: Exact from Foto 2 */}
          <p className="text-[1.125rem] md:text-[1.375rem] font-light text-white/95 leading-relaxed max-w-[540px] mb-12">
            Equipe altamente qualificada e treinada para manter sua frota operando com máxima eficiência. Atendemos todas as marcas de máquinas pesadas.
          </p>

          <a
            href="#quote-assistance"
            className="group inline-flex h-[3.75rem] px-10 rounded-full bg-[#0A4EE4] text-white items-center justify-center gap-3 font-bold text-[1rem] transition-all hover:bg-[#083DB4] shadow-xl hover:-translate-y-1"
          >
            Nossos Serviços
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
