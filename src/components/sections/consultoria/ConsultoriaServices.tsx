"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const services = [
  {
    icon: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/consult-icon-1.png",
    title: "Dimensionamento de Frota",
    desc: "Análise para determinar quantidade e tipos ideais de equipamentos. Otimização de custos, aumento de produtividade, redução de ociosidade."
  },
  {
    icon: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/consult-icon-2.png",
    title: "Análise de Viabilidade",
    desc: "Estudos técnicos e financeiros para decisões de investimento. ROI detalhado, comparativo de opções, projeções financeiras."
  },
  {
    icon: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/consult-icon-3.png",
    title: "Renovação de Frota",
    desc: "Modernização e substituição estratégica. Timing ideal, valorização residual, novas tecnologias."
  },
  {
    icon: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/consult-icon-4.png",
    title: "Consultoria de Campo",
    desc: "Visitas técnicas ao canteiro para avaliação in loco. Diagnóstico preciso, recomendações práticas."
  }
];

export function ConsultoriaServices() {
  return (
    <section className="bg-[#f8f8f8] section-padding">
      <div className="section-container text-center mb-20 md:mb-24">
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[2rem] md:text-[3.25rem] font-bold text-[#053474] tracking-tight"
        >
          Nossos serviços
        </motion.h2>
      </div>

      <div className="section-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 px-4 lg:px-0 auto-rows-fr">
        {services.map((s, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="px-5 py-5 md:px-6 md:py-6 rounded-[32px] bg-white border border-[#053474]/10 flex flex-col items-start text-left hover:border-[#053474]/30 transition-all duration-300 shadow-[-3.68px_3.68px_8.09px_0px_rgba(0,0,0,0.06)]"
          >
            {/* Icon — Clean, no background box as requested */}
            <div className="mb-4 w-12 h-12 flex items-center justify-start">
              <Image 
                src={s.icon}
                alt={s.title}
                width={48}
                height={48}
                className="object-contain"
              />
            </div>
            
            <h3 className="text-[19.5px] font-extrabold text-[#053474] mb-2 leading-[28px]">
              {s.title}
            </h3>
            
            <p className="text-[#053474] text-[13px] leading-[18px] font-normal opacity-90">
              {s.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
