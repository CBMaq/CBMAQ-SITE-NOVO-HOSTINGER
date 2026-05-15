"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function SegurosHero() {
  return (
    <section className="relative w-full h-[600px] md:h-[700px] lg:h-[780px] flex items-center overflow-hidden">
      {/* Background Image */}
      <Image
        src="https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/seguros-topo-copy.webp"
        alt="Seguros para Equipamentos CBMaq"
        fill
        className="object-cover object-center"
        priority
        quality={100}
      />

      {/* Overlay: Blue Gradient */}
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
          {/* Main Title */}
          <h1 className="text-[2.25rem] md:text-[3.5rem] lg:text-[4.5rem] leading-[1.1] font-bold text-white mb-8 tracking-tight max-w-[900px]">
             Seguro para Equipamentos, <br />
             Linha Amarela e Implementos
          </h1>

          {/* Description Text */}
          <p className="text-[1.125rem] md:text-[1.375rem] font-light text-white/95 leading-relaxed max-w-[580px] mb-12">
            Proteção completa para seu maquinário e continuidade da sua operação com as melhores taxas do mercado.
          </p>

          <a
            href="#seguros-contato"
            className="group inline-flex h-[3.75rem] px-10 rounded-full bg-[#0A4EE4] text-white items-center justify-center gap-3 font-bold text-[1rem] transition-all hover:bg-[#083DB4] shadow-xl hover:-translate-y-1"
          >
            Faça uma Cotação
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
