"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const benefits = [
  {
    icon: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/eq-icon1.png",
    title: "Alta Qualidade",
    description: "Equipamentos fabricados com materiais de primeira linha, garantindo durabilidade e performance superior.",
  },
  {
    icon: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/eq-icon2.png",
    title: "Máxima Produtividade",
    description: "Tecnologia de ponta que maximiza o rendimento operacional e reduz tempo de inatividade.",
  },
  {
    icon: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/eq-icon3.png",
    title: "Baixo Custo de Reparo",
    description: "Manutenção simplificada e peças acessíveis reduzem significativamente os custos operacionais.",
  },
];

export function BenefitsSection() {
  return (
    <section className="section-padding bg-white">
      <div className="section-container text-center mb-16">
         <h2 className="text-[2.25rem] md:text-[2.75rem] font-bold text-[#0A2A5E] tracking-tight mb-4">
           Vantagens dos nossos equipamentos
         </h2>
      </div>

      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {benefits.map((benefit, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-8 rounded-[24px] shadow-[-1.6px_4.8px_9.35px_0.8px_rgba(0,0,0,0.1)] flex flex-col items-start text-left h-full"
            >
              {/* Header: Icon + Title */}
              <div className="flex items-center gap-4 w-full mb-6">
                <div className="shrink-0 w-12 h-12 flex items-center justify-center">
                  <Image 
                    src={benefit.icon} 
                    alt={benefit.title} 
                    width={40} 
                    height={40} 
                    className="object-contain"
                  />
                </div>
                <h3 className="text-[1.25rem] md:text-[1.375rem] font-bold text-[#0A2A5E] leading-tight">
                  {benefit.title}
                </h3>
              </div>

              {/* Divider Asset */}
              <div className="w-full mb-6">
                <Image 
                  src="https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/divisor2.svg" 
                  alt="divisor" 
                  width={300} 
                  height={1} 
                  className="w-full h-auto object-left"
                />
              </div>

              {/* Description Content */}
              <p className="text-[0.9375rem] md:text-[1rem] leading-[1.6] text-[#4d5c7e] font-normal">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
