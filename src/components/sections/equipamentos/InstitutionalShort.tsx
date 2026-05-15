"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function InstitutionalShort() {
  return (
    <section className="relative w-full py-20 md:py-32 lg:py-48 flex items-center overflow-hidden bg-white">
      {/* Background Image with Lower Opacity Overlay — Making the tractor more visible */}
      <div className="absolute inset-0">
        <Image
          src="https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/eq-sect3-bg-img.webp"
          alt="Tradição CBMaq em máquinas"
          fill
          className="object-cover object-center brightness-[0.98] opacity-100"
          priority
        />
        {/* Lighter Whitish Gradient Overlay to show the tractor more clearly */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/65 to-white/40" />
      </div>

      {/* Content Container */}
      <div className="section-container relative z-10 w-full text-center">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
           className="max-w-[1240px] mx-auto"
        >
          {/* Main Title: Optimized width for 2-line break as per target reference */}
          <h2 className="text-[2rem] md:text-[2.75rem] lg:text-[3.25rem] font-bold text-[#0A2A5E] tracking-tight leading-[1.2] mb-6 max-w-[1100px] mx-auto">
            Há mais de 60 anos oferecendo as melhores<br className="hidden lg:block" />
            soluções em máquinas e tratores.
          </h2>

          {/* Subtext: Suavized color #4d5c7e, accurate Figma content, comfortable line-height */}
          <p className="text-[1rem] md:text-[1.125rem] lg:text-[1.3125rem] font-medium text-[#4d5c7e] leading-[1.55] max-w-[850px] mx-auto mb-10">
            Nossa experiência e compromisso garantem o sucesso do seu projeto.<br className="hidden lg:block" />
            Assistência Técnica Especializada e Garantia de Fábrica.
          </p>

          {/* Buttons Row with Pill shape and Exact colors/icons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 md:gap-8">
            <a
              href="#quote"
              className="group h-[3.5rem] px-10 rounded-full bg-[#0A4EE4] text-white flex items-center justify-center gap-3 font-bold text-[0.9375rem] md:text-[1rem] transition-all hover:bg-[#083DB4] shadow-md hover:shadow-lg"
            >
              Solicitar Proposta
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
            </a>
            
            <a
              href="#contact"
              className="group h-[3.5rem] px-10 rounded-full bg-transparent border-2 border-[#0A4EE4] text-[#0A4EE4] flex items-center justify-center gap-3 font-bold text-[0.9375rem] md:text-[1rem] transition-all hover:bg-[#0A4EE4]/5"
            >
              Falar com Especialista
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-[#0A4EE4]/70" strokeWidth={2.5} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
