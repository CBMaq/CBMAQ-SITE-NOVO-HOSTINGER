"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function OuvidoriaHero() {
  const scrollToForm = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const formSection = document.getElementById("ouvidoria-form");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full h-[600px] md:h-[700px] lg:h-[780px] flex items-center overflow-hidden">
      {/* Background Image - Using a generic corporate or customer service image */}
      <Image
        src="https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/cbmaqouvidoria1.webp"
        alt="Ouvidoria CBMaq"
        fill
        className="object-cover object-center"
        priority
        quality={100}
      />

      <div 
        className="absolute inset-0 z-10 transition-all duration-500
                   bg-[linear-gradient(to_bottom,rgba(5,52,116,0.8)_0%,rgba(5,52,116,0.6)_50%,rgba(5,52,116,0.3)_100%)] 
                   md:bg-[linear-gradient(90deg,#053474_0%,rgba(5,52,116,0)_70%)]"
      />

      {/* Content Container */}
      <div className="section-container relative z-20 w-full h-full flex flex-col justify-center items-start">
        <motion.div
           initial={{ opacity: 0, x: -30 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 1, ease: "easeOut" }}
           className="max-w-[840px] mt-16 md:mt-0 text-left"
        >
          <h1 className="text-[2rem] md:text-[3rem] lg:text-[3.5rem] leading-[1.15] font-semibold text-white mb-6 tracking-tight max-w-[800px] mx-0">
            Ouvidoria
          </h1>

          <p className="text-[1.125rem] md:text-[1.25rem] font-light text-white/90 leading-relaxed max-w-[480px] mb-12 mx-0">
            Um canal direto, sigiloso e transparente para você registrar elogios, sugestões, reclamações ou denúncias.
          </p>

          <a
            href="#ouvidoria-form"
            onClick={scrollToForm}
            className="group inline-flex h-[3.75rem] px-10 rounded-full bg-[#0A4EE4] text-white items-center justify-center gap-3 font-bold text-[1rem] transition-all hover:bg-[#083DB4] shadow-xl hover:-translate-y-1"
          >
            Fazer uma Manifestação
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
