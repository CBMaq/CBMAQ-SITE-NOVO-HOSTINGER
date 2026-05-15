"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const baseUrl = "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/";

const steps = [
  {
    icon: `${baseUrl}seguros-comofunciona-1.png`,
    title: "Solicitação",
    desc: "Você nos informa os dados do equipamento e necessidades de cobertura.",
  },
  {
    icon: `${baseUrl}seguros-comofunciona-2.png`,
    title: "Análise e Cotação",
    desc: "Analisamos seu perfil e negociamos as melhores condições com as seguradoras.",
  },
  {
    icon: `${baseUrl}seguros-comofunciona-3.png`,
    title: "Vistoria",
    desc: "Vistoria rápida em até 48 horas.\nCotação competitiva de mais de 15 seguradoras.",
  },
  {
    icon: `${baseUrl}seguros-comofunciona-4.png`,
    title: "Contratação",
    desc: "Documentação assinada e cobertura ativada. Pague em até 10x sem juros no cartão.",
  },
];

export function SegurosComoFunciona() {
  return (
    <section className="bg-white section-padding overflow-hidden">
      <div className="section-container text-center mb-12 md:mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[1.875rem] md:text-[2.75rem] font-bold text-[#053474] tracking-tight"
        >
          Como funciona o processo
        </motion.h2>
      </div>

      <div className="max-w-[1020px] mx-auto px-4 md:px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 md:gap-x-8 gap-y-10 md:gap-y-0">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex flex-col items-start w-full relative"
            >
              {/* Header: Icon + Centered Line Container */}
              <div className="flex items-center w-full mb-3 md:mb-5 h-[40px] md:h-[60px] relative">
                <div className="w-[80px] md:w-[110px] h-full relative shrink-0">
                  <Image
                    src={step.icon}
                    alt={step.title}
                    fill
                    className="object-contain object-left"
                  />
                </div>
                
                {/* Centered Line Container - Spans from end of icon to start of next block */}
                {idx < steps.length - 1 && (
                  <div className="hidden md:flex absolute left-[110px] right-[-32px] top-0 bottom-0 items-center justify-center pointer-events-none">
                    <div className="w-[60px] lg:w-[100px] h-[1px] bg-[#0091FF]" />
                  </div>
                )}
              </div>

              {/* Text: Aligned left exactly with the icon start */}
              <div className="w-full">
                <h3 className="text-[1.125rem] md:text-[1.375rem] font-bold text-[#053474] mb-2 leading-tight tracking-tight">
                  {step.title}
                </h3>
                <p className="text-[#053474]/80 text-[0.85rem] md:text-[0.9375rem] leading-[1.4] font-medium whitespace-pre-line">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
