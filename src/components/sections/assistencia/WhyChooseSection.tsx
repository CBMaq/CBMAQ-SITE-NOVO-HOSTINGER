"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function WhyChooseSection() {
  const advantages = [
    {
      icon: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/at-icon1.png",
      title: "Técnicos Certificados",
      description: "Profissionais treinados nas fábricas e com certificações internacionais.",
    },
    {
      icon: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/at-icon2.png",
      title: "Resposta em 24h",
      description: "Diagnóstico e proposta em até 24 horas úteis após o chamado.",
    },
    {
      icon: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/at-icon3.png",
      title: "Garantia Total",
      description: "Todos os serviços com garantia de mão de obra e peças aplicadas.",
    },
    {
      icon: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/at-icon4.png",
      title: "Suporte 24/7",
      description: "Plantão técnico para emergências, inclusive finais de semana.",
    },
    {
      icon: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/at-icon5.png",
      title: "Peças Genuínas",
      description: "Componentes originais com rastreabilidade e procedência garantida.",
    },
    {
      icon: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/at-icon6.png",
      title: "Consultoria Técnica",
      description: "Análise de falhas e recomendações para otimização da sua frota.",
    },
  ];

  return (
    <section className="relative bg-white overflow-hidden section-padding">
      {/* Decorative EF Elements - Refined with padding and asimmetry */}
      <div className="absolute left-[10px] top-[15%] pointer-events-none opacity-20 hidden lg:block">
        <Image src="https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/ef.svg" alt="" width={80} height={200} className="h-auto" />
      </div>
      <div className="absolute right-[10px] top-[55%] pointer-events-none opacity-20 hidden lg:block rotate-180">
        <Image src="https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/ef.svg" alt="" width={80} height={200} className="h-auto" />
      </div>

      <div className="section-container relative z-10 text-center mb-20 px-6">
        <h2 className="text-[2rem] md:text-[2.75rem] font-bold text-[#0A2A5E] tracking-tight">
          Porque escolher a CBMaq
        </h2>
      </div>

      <div className="section-container relative z-10">
        {/* Decorative Big Divisor Line - Replacing the simple line for a premium look */}
        <div className="absolute top-[46%] left-1/2 -translate-x-1/2 w-full max-w-[1200px] pointer-events-none hidden md:block px-6">
          <Image 
            src="https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/big-divisor-line.svg" 
            alt="Divisor" 
            width={1200} 
            height={4} 
            className="w-full h-auto opacity-80"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-16 md:gap-y-32">
          {advantages.map((adv, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05, duration: 0.5 }}
              className="flex flex-col items-center text-center px-4"
            >
              {/* Loose Icon - No circle, no shadow as per strict instruction */}
              <div className="mb-6 h-[48px] flex items-center justify-center">
                <Image 
                  src={adv.icon} 
                  alt="" 
                  width={56} 
                  height={56} 
                  className="object-contain w-auto h-full"
                />
              </div>
              
              <h3 className="text-[1.25rem] font-bold text-[#0A2A5E] mb-4 leading-tight">
                {adv.title}
              </h3>
              
              <p className="text-[#4D5C7E] text-[0.875rem] md:text-[0.9375rem] leading-relaxed max-w-[280px] font-medium opacity-90">
                {adv.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
