"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const steps = [
  {
    icon: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/sejarevendedorcbmaq-08.png",
    title: "Entre em contato",
    desc: "Preencha o formulário abaixo ou ligue para nossa central de atendimento.",
  },
  {
    icon: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/sejarevendedorcbmaq-09.png",
    title: "Seja aprovado",
    desc: "Avaliação da sua empresa para garantir que você esteja alinhado com nossos valores e metas.",
  },
  {
    icon: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/sejarevendedorcbmaq-10.png",
    title: "Receba seu kit de revenda",
    desc: "Inclui treinamento, acesso ao sistema de pedidos, materiais de marketing e muito mais.",
  },
];

export function RevendedorComoFunciona() {
  return (
    <section className="bg-[#F8F9FA] pb-16 lg:pb-24 overflow-hidden">
      <div className="section-container">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[2rem] md:text-[2.5rem] font-bold text-[#0A2A5E] text-center mb-16 leading-tight"
        >
          Como Funciona?
        </motion.h2>
        
        <div className="relative max-w-[1000px] mx-auto px-4">
          {/* Connecting Line (Desktop) */}
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="hidden md:block absolute top-[75px] left-[75px] right-[75px] h-[3px] bg-[#D1D9E6] z-0 shadow-sm origin-left" 
          />
          
          {/* Connecting Line (Mobile) */}
          <motion.div 
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="md:hidden absolute top-[75px] bottom-[75px] left-1/2 -translate-x-1/2 w-[3px] bg-[#D1D9E6] z-0 origin-top" 
          />
          
          <div className="flex flex-col md:flex-row justify-between gap-16 md:gap-8 relative z-10">
            {steps.map((step, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="flex flex-col items-center text-center md:max-w-[280px] mx-auto group"
              >
                <div className="w-[150px] h-[150px] relative mb-6 transition-transform duration-500 group-hover:scale-105">
                  <Image 
                    src={step.icon} 
                    alt={step.title} 
                    fill 
                    className="object-contain" 
                  />
                </div>
                
                <h3 className="text-[1.25rem] font-bold text-[#0A2A5E] mb-3 leading-tight">
                  {step.title}
                </h3>
                <p className="text-[0.9375rem] font-medium text-[#4D5C7E] leading-[1.6]">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
