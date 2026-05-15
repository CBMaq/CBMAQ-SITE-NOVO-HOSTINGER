"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function RevendedorHero() {
  return (
    <section className="relative w-full h-[600px] md:h-[700px] lg:h-[780px] flex items-center overflow-hidden">
      {/* Background Image */}
      <Image
        src="https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/seja-um-revendedor-hero-bg-img.webp"
        alt="Seja um Revendedor CBMaq"
        fill
        className="object-cover object-center"
        priority
        quality={100}
      />

      {/* Overlay - matching other heroes */}
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
          <h1 className="text-[2rem] md:text-[3rem] lg:text-[3.5rem] leading-[1.15] font-semibold text-white mb-6 tracking-tight max-w-[800px]">
            Seja um<br className="hidden md:block" /> Revendedor<br className="hidden md:block" /> CBMaq
          </h1>

          <p className="text-[1.125rem] md:text-[1.25rem] font-light text-white/90 leading-relaxed max-w-[480px] mb-12">
            Transforme a sua empresa com a força de uma líder no mercado de máquinas e equipamentos.
          </p>

        </motion.div>
      </div>
    </section>
  );
}
