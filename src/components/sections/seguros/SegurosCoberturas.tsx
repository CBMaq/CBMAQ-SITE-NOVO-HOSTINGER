"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const baseUrl = "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/";

const coberturas = [
  {
    icon: `${baseUrl}seguros-cobertura-icon1.png`,
    title: "Roubo e Furto",
    description: "Proteção contra perda total por roubo ou furto qualificado em qualquer local.",
  },
  {
    icon: `${baseUrl}seguros-cobertura-icon2.png`,
    title: "Acidentes Operacionais",
    description: "Cobertura para danos por colisões, capotamentos, tombamentos e erros de operação.",
  },
  {
    icon: `${baseUrl}seguros-cobertura-icon3.png`,
    title: "Danos Materiais",
    description: "Proteção contra incêndio, raio, explosão, fenômenos naturais e vandalismo.",
  },
  {
    icon: `${baseUrl}seguros-cobertura-icon4.png`, // Assuming icon for transport
    title: "Cobertura em Transporte",
    description: "Proteção durante o transporte terrestre do equipamento entre obras.",
  },
  {
    icon: `${baseUrl}seguros-cobertura-icon5.png`, // Assuming icon for paralization
    title: "Paralisação de Equipamento",
    description: "Indenização pela paralisação durante o período de reparo.",
  },
  {
    icon: `${baseUrl}seguros-cobertura-icon6.png`,
    title: "Responsabilidade Civil",
    description: "Responsabilidade para danos causados a terceiros durante a operação.",
  },
];

export function SegurosCoberturas() {
  return (
    <section className="bg-[#fcfcfc] section-padding">
      <div className="section-container text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[1.875rem] md:text-[2.5rem] font-bold text-[#053474] tracking-tight"
        >
          Coberturas disponíveis
        </motion.h2>
      </div>

      <div className="section-container max-w-[1140px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {coberturas.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              style={{
                boxShadow: "-4.06px 4.06px 8.93px rgba(0, 0, 0, 0.06)",
              }}
              className="bg-white px-8 py-12 rounded-[24px] border-[1px] border-[#053474] flex flex-col items-center text-center transition-all hover:shadow-2xl hover:-translate-y-1"
            >
              <div className="mb-8 w-[64px] h-[64px] md:w-[80px] md:h-[80px] relative">
                <Image
                  src={item.icon}
                  alt=""
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="text-[1.25rem] md:text-[1.625rem] font-bold text-[#053474] mb-4 leading-tight tracking-[-0.04em]">
                {item.title}
              </h3>
              <p className="text-[#053474]/70 text-[0.9375rem] md:text-[1.06rem] leading-[1.5] font-medium">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
