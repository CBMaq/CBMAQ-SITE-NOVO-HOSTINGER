"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const benefits = [
  {
    icon: "ec-pq-comprar-1.png",
    value: "+20.000 itens",
    desc: "Estoque organizado e disponível para pronta entrega."
  },
  {
    icon: "ec-pq-comprar-2.png",
    value: "100% Rastreável",
    desc: "Tecnologia PDA para controle preciso de entrada, saída e localização."
  },
  {
    icon: "ec-pq-comprar-3.png",
    value: "24-72h",
    desc: "Logística própria com entrega expressa para todo o Brasil."
  },
  {
    icon: "ec-pq-comprar-4.png",
    value: "Até 40% off",
    desc: "Condições especiais para frotas, revendedores e grandes volumes."
  }
];

export function EcommercePorqueComprar() {
  const baseUrl = "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/";

  return (
    <section className="bg-[#F8F9FB] section-padding">
      <div className="section-container">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="bg-white rounded-[2rem] md:rounded-[3rem] p-10 md:p-20 shadow-[0_20px_50px_rgba(0,0,0,0.05)]"
        >
          <div className="text-center mb-16">
            <h2 className="text-[2.25rem] md:text-[2.75rem] font-bold text-[#0A2A5E] tracking-tight">
              Por que comprar conosco
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
            {benefits.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex flex-col items-center text-center group"
              >
                <div className="mb-4 w-12 h-12 relative">
                  <Image 
                    src={`${baseUrl}${item.icon}`} 
                    alt="" 
                    fill 
                    className="object-contain transition-transform group-hover:scale-110"
                  />
                </div>

                <div className="text-[1.5rem] md:text-[29.6px] md:leading-[35.5px] font-extrabold text-[#053474] mb-3 whitespace-nowrap">
                  {item.value}
                </div>

                <p className="text-[#4D5C7E] text-[0.875rem] md:text-[0.9375rem] leading-relaxed max-w-[200px] font-medium opacity-80">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
