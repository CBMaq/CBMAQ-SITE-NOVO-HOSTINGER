"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const reasons = [
  {
    icon: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/cons-why-icon1.png",
    title: "Taxa Reduzida",
    desc: "Taxa de administração competitiva. Planejamento financeiro inteligente."
  },
  {
    icon: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/cons-why-icon2.png",
    title: "Lances Equilibrados",
    desc: "Sistema justo que garante oportunidades iguais para todos os participantes."
  },
  {
    icon: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/cons-why-icon3.png",
    title: "Parcelas Flexíveis",
    desc: "Grupos de 36 a 180 meses com parcelas no fluxo de caixa da sua empresa."
  }
];

export function WhyChooseConsorcio() {
  return (
    <section className="section-padding bg-[linear-gradient(to_bottom,#F8F7F2_0%,#FFFFFF_100%)]">
      <div className="section-container">
        <h2 className="text-center text-[2.25rem] md:text-[2.75rem] font-bold text-[#0A2A5E] mb-20">
          Por que escolher
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {reasons.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="p-10 lg:p-14 rounded-[32px] border border-[#053474]/20 bg-white flex flex-col items-center text-center group transition-all"
              style={{
                boxShadow: "-4.06px 4.06px 8.93px 0px rgba(0, 0, 0, 0.06)"
              }}
            >
              <div className="relative w-16 h-16 mb-10 transition-transform duration-700 group-hover:scale-110">
                <Image 
                  src={item.icon}
                  alt={item.title}
                  fill
                  className="object-contain"
                />
              </div>

              <h3 className="text-[1.5rem] font-bold text-[#0A2A5E] mb-6 tracking-tight">
                {item.title}
              </h3>
              
              <p className="text-[0.9375rem] text-[#4D5C7E] leading-relaxed font-medium opacity-80 max-w-[240px]">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
