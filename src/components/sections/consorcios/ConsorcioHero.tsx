"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function ConsorcioHero() {
  const scrollToSimulator = () => {
    const section = document.getElementById("simulador");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full h-[600px] md:h-[700px] lg:h-[800px] flex items-center overflow-hidden">
      {/* Background Image — Generated specifically for this section */}
      <Image
        src="https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/imagem-do-topo-copy.webp"
        alt="Consórcio CBMaq"
        fill
        unoptimized
        className="object-cover object-center"
        priority
        quality={100}
      />

      {/* Institutional Responsive Overlay */}
      <div 
        className="absolute inset-0 z-10 transition-all duration-500
                   bg-[linear-gradient(to_bottom,#053474_0%,rgba(5,52,116,0.4)_50%,rgba(5,52,116,0.1)_100%)] 
                   md:bg-[linear-gradient(90deg,#053474_0%,rgba(5,52,116,0.1)_60%)]"
      />

      {/* Content Container */}
      <div className="section-container relative z-20 w-full h-full flex flex-col justify-center">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Left Text Content */}
          <motion.div
             initial={{ opacity: 0, x: -30 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 1, ease: "easeOut" }}
             className="max-w-[700px] text-left mt-16 md:mt-0"
          >
            <h1 className="text-[2.25rem] md:text-[3.5rem] lg:text-[4rem] leading-[1.1] font-bold text-white mb-6 tracking-tight">
              Consórcio de Máquinas.
            </h1>
            <p className="text-[1.125rem] md:text-[1.375rem] font-light text-white/95 leading-relaxed max-w-[540px] mb-10">
              A forma mais inteligente de adquirir equipamentos pesados. Sem burocracia e com parcelas que cabem no seu orçamento.
            </p>

            <button
              onClick={scrollToSimulator}
              className="group inline-flex h-[3.75rem] px-10 rounded-full bg-[#0A4EE4] text-white items-center justify-center gap-3 font-bold text-[1rem] transition-all hover:bg-[#083DB4] shadow-xl hover:-translate-y-1"
            >
              Faça uma Cotação
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>

        </div>

        {/* Floating Badge — 35% Discount */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="absolute bottom-6 right-2 md:bottom-12 md:right-12 w-[100px] h-[100px] md:w-[170px] md:h-[170px]"
        >
          <Image 
            src="https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/selo-desconto.webp"
            alt="Até 35% de economia"
            fill
            unoptimized
            className="object-contain"
          />
        </motion.div>
      </div>
    </section>
  );
}
