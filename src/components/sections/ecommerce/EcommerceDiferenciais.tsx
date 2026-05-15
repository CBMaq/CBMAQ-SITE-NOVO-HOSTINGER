"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const items = [
  {
    icon: "ec-dif-icon1.png",
    title: "Estoque Robusto",
    desc: "Mais de 20.000 itens pronto para entrega em toda a rede de distribuição."
  },
  {
    icon: "ec-dif-icon2.png",
    title: "Tecnologia PDA",
    desc: "Gestão inteligente de estoque com bipes e etiquetas para máxima agilidade e controle."
  },
  {
    icon: "ec-dif-icon-3.png",
    title: "Entrega Super Rápida",
    desc: "Logística própria com entrega em 24-72h para quase todo o Brasil."
  }
];

export function EcommerceDiferenciais() {
  const baseUrl = "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/";

  return (
    <section className="bg-white section-padding">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="text-[2.25rem] md:text-[2.75rem] font-bold text-[#0A2A5E] tracking-tight">
            Diferenciais
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0 relative">
          {items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex flex-col items-center text-center px-8 relative h-full"
            >
              {/* Vertical Divisor for Desktop — Matching Consultoria style */}
              {idx < items.length - 1 && (
                <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-[100px]">
                  <Image 
                    src="https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/consult-number-divisor.svg"
                    alt=""
                    width={1}
                    height={100}
                    className="w-full h-full object-contain opacity-40"
                  />
                </div>
              )}

              <div className="mb-8 w-14 h-14 relative group">
                <Image 
                  src={`${baseUrl}${item.icon}`} 
                  alt="" 
                  fill 
                  className="object-contain transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <h3 className="text-[1.25rem] md:text-[1.5rem] font-bold text-[#0A2A5E] mb-4">
                {item.title}
              </h3>

              <p className="text-[#4D5C7E] text-[0.9375rem] md:text-[1rem] leading-relaxed max-w-[280px] font-medium opacity-90">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
