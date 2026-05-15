"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cbmaqEasing } from "@/lib/motion";

export function MotoresWeichaiHero() {
  const handleAction = () => {
    const section = document.getElementById("modelos");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section 
      className="relative w-full h-[600px] md:h-[700px] lg:h-[800px] flex items-center overflow-hidden bg-[#053474]"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/weichai-cbmaq-copy-1.webp"
          alt="Motores Weichai"
          fill
          className="object-cover object-center"
          priority
          quality={100}
        />
        {/* Responsive Overlay */}
        <div 
          className="absolute inset-0 z-10 transition-all duration-500
                     bg-[linear-gradient(to_bottom,#053474_0%,rgba(5,52,116,0.4)_50%,rgba(5,52,116,0.1)_100%)] 
                     md:bg-[linear-gradient(90deg,#053474_0%,rgba(5,52,116,0.2)_70%)]"
        />
      </div>

      {/* Content Container */}
      <div className="section-container relative z-20 w-full">
        <motion.div
           initial={{ opacity: 0, x: -30 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.8, ease: cbmaqEasing }}
           className="max-w-[800px] text-left mt-16 md:mt-0"
        >
          <h1 className="text-[2.25rem] md:text-[3.5rem] lg:text-[4rem] leading-[1.1] font-bold text-white mb-6 tracking-tight">
            Motores Weichai
          </h1>
          <p className="text-[1.125rem] md:text-[1.375rem] font-light text-white/95 leading-relaxed max-w-[580px] mb-10">
            Tecnologia de ponta em motores diesel de alta potência e alta durabilidade para diversos segmentos.
          </p>

          <button
            onClick={handleAction}
            className="group inline-flex h-[3.75rem] px-10 rounded-full bg-[#0A4EE4] text-white items-center justify-center gap-3 font-bold text-[1rem] transition-all hover:bg-[#083DB4] shadow-xl hover:-translate-y-1"
          >
            Ver Catálogo
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
