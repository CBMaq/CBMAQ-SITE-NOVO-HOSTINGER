"use client";

import { motion } from "framer-motion";
import { Gauge, Wrench, Hourglass, ClipboardCheck } from "lucide-react";
import Image from "next/image";

const beneficios = [
  {
    icon: Gauge,
    title: "15% Redução\nde Custos",
    desc: "Até 15% de economia\nem combustível com\ncontrole de ociosidade.",
  },
  {
    icon: Wrench,
    title: "70% Manutenção\nPreditiva",
    desc: "Alertas antecipados\nevitam paradas não\nplanejadas.",
  },
  {
    icon: Hourglass,
    title: "-40% Tempo\nOcioso",
    desc: "Identificação e\nredução de máquina\nligada sem produzir.",
  },
  {
    icon: ClipboardCheck,
    title: "+25% Vida Útil",
    desc: "Aumento da\ndurabilidade dos\nequipamentos.",
  },
];

export function TelemetriaBeneficios() {
  const baseUrl = "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/";

  return (
    <section className="bg-[#F4F3ED] section-padding">
      <div className="section-container max-w-[1250px] mx-auto px-4 md:px-8">
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[2.25rem] md:text-[2.75rem] font-bold text-[#0A2A5E] text-center mb-12 leading-tight tracking-tight"
        >
          Benefícios mensuráveis
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-0">
          {beneficios.map((beneficio, index) => {
            const IconComponent = beneficio.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex flex-col relative px-4 lg:px-10"
              >
                {/* Divisor com Imagem (telemetria-04.png) */}
                {index !== 0 && (
                  <div className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-[80%]">
                    <Image 
                      src={`${baseUrl}telemetria-04.png`}
                      alt="divider"
                      fill
                      className="object-contain"
                    />
                  </div>
                )}

                <div className="mb-6">
                  <IconComponent className="w-10 h-10 text-[#0A2A5E]" strokeWidth={1.5} />
                </div>
                <h3 className="text-[1.375rem] md:text-[1.425rem] font-bold text-[#0A2A5E] whitespace-pre-line leading-[1.2] mb-4">
                  {beneficio.title}
                </h3>
                <p className="text-[#4D5C7E] font-medium text-[0.9375rem] md:text-[1rem] whitespace-pre-line leading-relaxed">
                  {beneficio.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
