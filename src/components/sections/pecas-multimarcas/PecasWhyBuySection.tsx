"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const reasons = [
  {
    icon: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/pecas-why-buy-icon1.png",
    title: "+20.000 itens",
    description: "Estoque organizado e disponível para pronta entrega.",
  },
  {
    icon: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/pecas-why-buy-icon2.png",
    title: "100% Rastreável",
    description: "Tecnologia PDA para controle preciso de entrada, saída e localização.",
  },
  {
    icon: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/pecas-why-buy-icon3.png",
    title: "24–72h",
    description: "Logística própria com entrega expressa para todo o Brasil.",
  },
  {
    icon: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/pecas-why-buy-icon4.png",
    title: "Até 40% off",
    description: "Condições especiais para frotas, revendedores e grandes volumes.",
  },
];

export function PecasWhyBuySection() {
  return (
    <section className="bg-[#f8f9fa] section-padding">
      <div className="section-container">
        <div className="bg-white rounded-[24px] md:rounded-[32px] shadow-[-4.06px_4.06px_8.93px_0px_rgba(0,0,0,0.06)] border border-[#F1F5F9] px-6 py-12 md:py-20 md:px-12 w-full max-w-[1200px] mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-[2rem] md:text-[2.75rem] font-bold text-[#053474]">
              Por que comprar conosco
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">
            {reasons.map((reason, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex flex-col items-center text-center group"
              >
                <div className="mb-6 w-[56px] h-[56px] md:w-[64px] md:h-[64px] relative">
                  <Image 
                    src={reason.icon} 
                    alt="" 
                    fill 
                    className="object-contain transition-transform duration-500 group-hover:scale-110" 
                  />
                </div>
                <h3 className="text-[1.25rem] font-bold text-[#053474] mb-3">
                  {reason.title}
                </h3>
                <p className="text-[#053474]/70 text-[0.9375rem] leading-relaxed max-w-[260px] mx-auto">
                  {reason.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
