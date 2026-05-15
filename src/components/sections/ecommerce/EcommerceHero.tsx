"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";

const badges = [
  { icon: "ec-hero-icon1.png", label: "Entrega 24–72h" },
  { icon: "ec-hero-icon2.png", label: "Compra segura" },
  { icon: "ec-hero-icon3.png", label: "6x sem juros" },
];

export function EcommerceHero() {
  const baseUrl = "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/";

  return (
    <section className="relative w-full min-h-[750px] md:h-[750px] lg:h-[820px] flex items-center overflow-hidden section-padding">
      {/* Background Image — 100% Fidelity */}
      <Image
        src={`${baseUrl}ec-hero-bg-img.webp`}
        alt="E-commerce CBMaq"
        fill
        className="object-cover object-center"
        priority
        quality={100}
      />

      {/* Blue Lateral Overlay for readability */}
      <div
        className="absolute inset-0 z-10 transition-all duration-500
                   bg-[linear-gradient(to_bottom,#053474_0%,rgba(5,52,116,0.3)_50%,rgba(5,52,116,0.1)_100%)] 
                   md:bg-[linear-gradient(90deg,#053474_0%,rgba(5,52,116,0.3)_40%,rgba(5,52,116,0)_80%)]"
      />

      <div className="section-container relative z-20 w-full h-full flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-[840px] mt-16 md:mt-0"
        >
          {/* Vertical Badges/Chips — Figma Sync */}
          <div className="flex flex-wrap gap-4 mb-8">
            {badges.map((badge, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + idx * 0.1 }}
                className="flex items-center gap-4 px-2 py-2 rounded-full bg-white/10 backdrop-blur-md border border-[#74C5FF]"
              >
                {/* Icon Container with Natural Scale from Flex Layout */}
                <div className="relative w-[48px] h-[48px] md:w-[56px] md:h-[56px] flex items-center justify-center shrink-0">
                  <Image
                    src={`${baseUrl}${badge.icon}`}
                    alt=""
                    fill
                    className="object-contain translate-y-[2px]"
                  />
                </div>
                <span className="text-white text-[1rem] md:text-[1.125rem] font-medium pr-6">
                  {badge.label}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Main Title */}
          <h1 className="text-[1.875rem] md:text-[2.75rem] lg:text-[4.25rem] leading-[1.1] font-bold text-white mb-6 tracking-tight max-w-[800px]">
            Mais de 20.000 itens em estoque. Entrega em 24–72h para todo o Brasil.
          </h1>

          {/* Subtitle */}
          <p className="text-[1rem] md:text-[1.25rem] font-light text-white/95 leading-relaxed max-w-[540px] mb-8 md:mb-12">
            Peças genuínas para suas máquinas rodoviárias, construção civil e mineração.
          </p>

          <a
            href="https://www.lojacbmaq.com.br/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex h-[3.5rem] md:h-[3.75rem] px-8 md:px-10 rounded-full bg-[#0A4EE4] text-white items-center justify-center gap-3 font-bold text-[0.938rem] md:text-[1rem] transition-all hover:bg-[#083DB4] shadow-xl hover:-translate-y-1"
          >
            Acessar Loja Online
            <ShoppingCart className="w-5 h-5 transition-transform group-hover:scale-110" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
