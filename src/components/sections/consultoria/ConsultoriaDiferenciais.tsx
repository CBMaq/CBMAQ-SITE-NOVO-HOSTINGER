"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const items = [
  {
    title: "Desempenho Operacional",
    description: "Sua máquina está produzindo abaixo do esperado? Identificamos gargalos na operação e maximizamos o rendimento do seu equipamento."
  },
  {
    title: "Consumo e Custos",
    description: "Combustível alto sem explicação? Analisamos o consumo real da sua frota e encontramos onde você está perdendo dinheiro."
  },
  {
    title: "Gestão de Operadores",
    description: "Operador sem treinamento custa caro. Orientamos a equipe para operar com mais eficiência, segurança e menos desgaste na máquina."
  },
  {
    title: "Direcionamento de Equipamento",
    description: "Máquina errada para a função errada gera prejuízo. Indicamos o equipamento ideal para cada tipo de operação, garantindo o máximo de aproveitamento."
  }
];

export function ConsultoriaDiferenciais() {
  return (
    <section className="bg-[#F9F8F4] overflow-hidden section-padding">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-stretch">
          
          {/* Left Column — Content List */}
          <div className="w-full order-2 lg:order-1 pt-2 flex flex-col justify-center">
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[2rem] md:text-[3.25rem] font-bold text-[#053474] mb-12 md:mb-20 tracking-tight"
            >
              Diferenciais
            </motion.h2>
            
            <div className="relative pl-10 md:pl-16">
              {/* Vertical Decorative Bar — Inverted Gradient & Thicker (8px) */}
              <div className="absolute left-0 top-[12px] bottom-[30px] w-[8px] bg-gradient-to-b from-transparent via-[#0A4EE4]/50 to-[#053474] rounded-full" />

              <div className="space-y-14 md:space-y-16">
                {items.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex gap-5 md:gap-7 relative"
                  >
                    {/* Bullet — Aligned perfectly with title line-height */}
                    <div className="h-[38.8px] flex items-center shrink-0">
                       <Image 
                         src="https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/consul-seta.svg"
                         alt="seta"
                         width={16}
                         height={16}
                         className="object-contain"
                       />
                    </div>
                    
                    <div>
                      <h3 className="text-[1.5rem] md:text-[1.8rem] font-extrabold text-[#053474] mb-2 leading-tight md:leading-[38.8px]">
                        {item.title}
                      </h3>
                      <p className="text-[#053474] text-[1rem] md:text-[1.15rem] leading-relaxed font-normal opacity-95">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column — Image with Overlapping Seal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative w-full order-1 lg:order-2 mb-20 lg:mb-0"
          >
            {/* Image Container — Using a taller aspect-ratio for better framing on mobile/tablet */}
            <div className="relative w-full aspect-[3/4] lg:aspect-auto lg:h-full min-h-[500px] rounded-[40px] md:rounded-[60px] overflow-hidden bg-white border border-[#E6EDF8] shadow-sm">
               <Image 
                 src="https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/consultoria-especializada-logo-ajustada-copy.webp"
                 alt="Consultoria Diferenciais"
                 fill
                 className="object-cover object-top"
                 sizes="(max-width: 768px) 100vw, 50vw"
                 priority
               />
            </div>
            
            {/* Seal 24h — Continuous subtle animation to draw attention */}
            <motion.div 
              animate={{ 
                y: [0, -8, 0],
                scale: [1, 1.02, 1]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="absolute z-20 bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2 lg:bottom-[calc(12%+80px)] lg:left-[-12%] lg:translate-x-0"
            >
               <Image 
                 src="https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/consult-dif-selo.png"
                 alt="24h Resposta garantida"
                 width={320}
                 height={120}
                 className="w-[200px] sm:w-[240px] md:w-[280px] lg:w-[320px] h-auto select-none pointer-events-none drop-shadow-xl"
               />
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
