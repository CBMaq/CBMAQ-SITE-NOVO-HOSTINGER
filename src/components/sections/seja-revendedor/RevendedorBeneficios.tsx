"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const beneficios = [
  {
    icon: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/sejarevendedorcbmaq-05.png",
    title: "Suporte Local",
    desc: "Oferecemos suporte técnico e comercial de proximidade, garantindo atendimento rápido e eficiente para suas demandas.",
  },
  {
    icon: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/sejarevendedorcbmaq-06.png",
    title: "Ferramentas de Marketing",
    desc: "Acesso a materiais de divulgação, estratégias de marketing digital e PDV para fortalecer a visibilidade da sua revenda.",
  },
  {
    icon: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/sejarevendedorcbmaq-07.png",
    title: "Rede de Parcerias",
    desc: "Faça parte de um ecossistema de parceiros estratégicos e amplie suas oportunidades de negócio no setor.",
  },
];

export function RevendedorBeneficios() {
  return (
    <section className="bg-[#F8F9FA] pb-16 lg:pb-24">
      <div className="section-container">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[2rem] md:text-[2.5rem] font-bold text-[#0A2A5E] text-center mb-16 leading-tight"
        >
          Benefícios Exclusivos
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[1100px] mx-auto">
          {beneficios.map((beneficio, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="flex flex-col items-center text-center p-10 rounded-[24px] border border-[#053474] bg-white transition-all hover:shadow-xl hover:border-[#053474]/80 min-h-[300px] justify-start"
            >
              <div className="w-16 h-16 relative mb-8">
                <Image 
                  src={beneficio.icon} 
                  alt={beneficio.title} 
                  fill 
                  className="object-contain" 
                />
              </div>
              <h3 className="text-[1.25rem] font-bold text-[#0A2A5E] mb-4">
                {beneficio.title}
              </h3>
              <p className="text-[0.875rem] font-medium text-[#4D5C7E] leading-[1.6]">
                {beneficio.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
