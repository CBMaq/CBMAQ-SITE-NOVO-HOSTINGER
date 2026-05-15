"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function ImportacaoHero() {
  const baseUrl = "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/";

  return (
    <section className="relative w-full h-[650px] md:h-[750px] lg:h-[820px] flex items-center overflow-hidden">
      {/* Background Image */}
      <Image
        src={`${baseUrl}import-hero-bg-img.webp`}
        alt="Importação CBMaq"
        fill
        className="object-cover object-center"
        priority
        quality={100}
      />

      {/* Blue Lateral Overlay for readability */}
      <div 
        className="absolute inset-0 z-10 transition-all duration-500
                   bg-[linear-gradient(to_bottom,#053474_0%,rgba(5,52,116,0.5)_50%,rgba(5,52,116,0.1)_100%)] 
                   md:bg-[linear-gradient(90deg,#053474_0%,rgba(5,52,116,0.6)_40%,rgba(5,52,116,0)_80%)]"
      />

      <div className="section-container relative z-20 w-full h-full flex flex-col justify-center">
        <motion.div
           initial={{ opacity: 0, x: -30 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 1, ease: "easeOut" }}
           className="max-w-[700px] mt-24 md:mt-0"
        >
          <h1 className="text-[2.25rem] md:text-[3.5rem] lg:text-[4.25rem] leading-[1.1] font-bold text-white mb-6 tracking-tight">
            Importação Descomplicada para Você ou sua Empresa
          </h1>

          <p className="text-[1rem] md:text-[1.25rem] font-light text-white/95 leading-relaxed mb-12 max-w-[500px]">
            Soluções completas de comércio exterior do início ao fim. Importamos de qualquer lugar do mundo, com segurança e agilidade.
          </p>

          <a
            href="#cotacao"
            className="group inline-flex h-[3.75rem] px-10 rounded-full bg-[#0A4EE4] text-white items-center justify-center gap-3 font-bold text-[1rem] transition-all hover:bg-[#083DB4] shadow-xl hover:-translate-y-1"
          >
            Solicitar Importação
          </a>
        </motion.div>
      </div>
    </section>
  );
}
