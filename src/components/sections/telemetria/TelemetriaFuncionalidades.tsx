"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Play } from "lucide-react";

const funcionalidades = [
  {
    title: "Rastreamento em Tempo Real",
    desc: "Localização precisa via GPS e satélite.",
  },
  {
    title: "Monitoramento de Performance",
    desc: "Dados de operação, consumo e produtividade.",
  },
  {
    title: "Alertas Inteligentes",
    desc: "Notificações de manutenção, uso indevido e cercas virtuais.",
  },
  {
    title: "Relatórios Gerenciais",
    desc: "KPIs e dashboards para tomada de decisão.",
  },
  {
    title: "Gestão de Operadores",
    desc: "Monitoramento de padrões de condução e uso.",
  },
  {
    title: "Prevenção de Falhas",
    desc: "Identificação antecipada de problemas mecânicos.",
  },
];

export function TelemetriaFuncionalidades() {
  const baseUrl = "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/";

  return (
    <section className="bg-[#F4F3ED] section-padding">
      <div className="section-container max-w-[1250px] mx-auto px-4 md:px-8">
        {/* Container Principal */}
        <div className="bg-white rounded-[32px] shadow-[0_4px_30px_rgba(0,0,0,0.05)] p-8 md:p-12 lg:p-16 w-full relative">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full lg:w-[55%] flex flex-col justify-center"
            >
              <h2 className="text-[2.25rem] md:text-[3rem] font-bold text-[#0A2A5E] mb-12 leading-[1.1] tracking-tight">
                Funcionalidades<br />do sistema
              </h2>
              
              <div className="relative pl-8 md:pl-10">
                {/* Imagem do Divisor (telemetria-03.png) - Agora ao lado do texto */}
                <div className="absolute left-0 top-0 bottom-0 w-[2px] md:w-[3px] z-20">
                  <Image 
                      src={`${baseUrl}telemetria-03.png`} 
                      alt="list-divider" 
                      fill
                      className="object-cover"
                    />
                </div>

                <div className="grid grid-cols-1 gap-y-8">
                {funcionalidades.map((func, index) => (
                  <div key={index} className="flex items-start gap-4 group">
                    <div className="pt-1.5 shrink-0">
                      <div className="w-[18px] h-[18px] flex items-center justify-center">
                        <Play className="w-[12px] h-[12px] fill-[#0A4EE4] text-[#0A4EE4]" />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <h3 className="text-[1.125rem] md:text-[1.25rem] font-bold text-[#0A2A5E] leading-tight mb-2">
                        {func.title}
                      </h3>
                      <p className="text-[0.9375rem] md:text-[1rem] font-medium text-[#4D5C7E] leading-relaxed">
                        {func.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

            {/* Direita: Imagem Principal */}
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full lg:w-[45%] relative min-h-[450px] lg:min-h-[550px] rounded-[32px] overflow-hidden shadow-xl"
            >
              <Image 
                src={`${baseUrl}telemetria-solicite-proposta-copy.webp`} 
                alt="Caminhão em rodovia ilustrando rastreamento" 
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
