"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function ConsultoriaHero() {
  const scrollToForm = () => {
    const section = document.getElementById("contato");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full h-[600px] md:h-[700px] lg:h-[800px] flex items-center overflow-hidden">
      {/* Background Image */}
      <Image
        src="https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/prancheta-1-2-copy.webp"
        alt="Consultoria Especializada CBMaq"
        fill
        className="object-cover object-center"
        priority
        quality={100}
      />

      {/* Institutional Responsive Overlay — Exact same logic as other heroes */}
      <div 
        className="absolute inset-0 z-10 transition-all duration-500
                   bg-[linear-gradient(to_bottom,#053474_0%,rgba(5,52,116,0.4)_50%,rgba(5,52,116,0.1)_100%)] 
                   md:bg-[linear-gradient(90deg,#053474_0%,rgba(5,52,116,0.2)_70%)]"
      />

      {/* Content Container */}
      <div className="section-container relative z-20 w-full">
        <motion.div
           initial={{ opacity: 0, x: -30 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 1, ease: "easeOut" }}
           className="max-w-[700px] text-center md:text-left mt-16 md:mt-0"
        >
          <h1 className="text-[2.25rem] md:text-[3.5rem] lg:text-[4rem] leading-[1.1] font-bold text-white mb-6 tracking-tight">
            Consultoria Especializada
          </h1>
          <p className="text-[1.125rem] md:text-[1.375rem] font-light text-white/95 leading-relaxed max-w-[540px] mb-10">
            Equipe de especialistas dedicada a encontrar as melhores soluções em equipamentos para seu negócio. Decisões assertivas baseadas 
em análises técnicas e financeiras.

          </p>

          <button
            onClick={scrollToForm}
            className="group inline-flex h-[3.75rem] px-10 rounded-full bg-[#0A4EE4] text-white items-center justify-center gap-3 font-bold text-[1rem] transition-all hover:bg-[#083DB4] shadow-xl hover:-translate-y-1"
          >
            Solicitar agora
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
