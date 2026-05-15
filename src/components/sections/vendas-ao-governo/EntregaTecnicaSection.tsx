"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Play } from "lucide-react";

export function EntregaTecnicaSection() {
  const baseUrl = "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/";

  const items = [
    {
      title: "Treinamento Operacional",
      desc: "Capacitação completa para operadores do órgão público."
    },
    {
      title: "Suporte Técnico Contínuo",
      desc: "Equipe disponível para atendimento e manutenção."
    },
    {
      title: "Peças de Reposição",
      desc: "Estoque nacional para atendimento rápido."
    }
  ];

  return (
    <section className="bg-[#F4F3ED] section-padding">
      <div className="section-container max-w-[1200px] mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          
          {/* Imagem Esquerda (Mulher com Headset) */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-[45%] relative h-[350px] md:h-[450px] lg:h-[500px] rounded-[32px] overflow-hidden"
          >
            <Image 
              src={`${baseUrl}vendasaogoverno-08.png`} 
              alt="Entrega técnica completa" 
              fill
              className="object-cover"
            />
          </motion.div>

          {/* Divisor Vertical (Imagem) - Oculto no Mobile */}
          <div className="hidden lg:block w-[40px] h-[450px] relative shrink-0">
            <Image 
              src={`${baseUrl}vendasaogoverno-07.png`} 
              alt="Divisor" 
              fill
              className="object-contain"
            />
          </div>

          {/* Texto Direita */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 flex flex-col justify-center"
          >
            <h2 className="text-[2rem] md:text-[2.75rem] font-bold text-[#0A2A5E] mb-6 leading-[1.1] tracking-tight">
              Entrega técnica completa
            </h2>
            
            <p className="text-[1rem] md:text-[1.125rem] font-medium text-[#4D5C7E] leading-relaxed mb-10 max-w-[580px]">
              Não basta entregar o equipamento. A CBMaq realiza a entrega técnica completa, com treinamento operacional para os servidores, orientação sobre manutenção preventiva e suporte contínuo durante toda a vida útil da máquina.
            </p>

            <div className="space-y-8">
              {items.map((item, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="pt-1.5 shrink-0">
                    <Play className="w-4 h-4 fill-[#0A2A5E] text-[#0A2A5E]" />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-[1.125rem] md:text-[1.25rem] font-bold text-[#0A2A5E] leading-tight mb-1">
                      {item.title}
                    </h3>
                    <p className="text-[0.9375rem] font-regular text-[#4D5C7E]">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
