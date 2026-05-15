"use client";

import { motion } from "framer-motion";
import { Target, LineChart, Gauge } from "lucide-react";

const EngineIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
    stroke="currentColor" 
    strokeWidth="1.8" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    {/* Bloco Principal */}
    {/* Bloco Principal */}
    <path d="M2 10h15v10H2z" />
    {/* Escapamento Vertical */}
    <path d="M5 10V2h3" />
    <path d="M4 2h5" />
    {/* Cabeçote */}
    <path d="M2 10V8h15v2" />
    {/* Detalhe lateral */}
    <path d="M17 12h5l1 2v4h-6" />
    <circle cx="20" cy="11" r="1.8" />
    {/* Linhas de Detalhe */}
    <path d="M5 13h10" />
    <path d="M5 15h10" />
    <path d="M5 17h10" />
  </svg>
);

const motivos = [
  {
    icon: Target,
    title: "Localização:",
    desc: "GPS em tempo real,\nHistórico de trajetos, Cercas\nvirtuais, Desvios de rota",
  },
  {
    icon: EngineIcon,
    title: "Motor:",
    desc: "RPM e temperatura, Pressão\nde óleo, Códigos de falha,\nHoras de operação",
  },
  {
    icon: LineChart,
    title: "Consumo:",
    desc: "Combustível em tempo real,\nMédia por hora/km,\nAbastecimentos, Consumo\npor operador",
  },
  {
    icon: Gauge,
    title: "Operação:",
    desc: "Tempo produtivo, Tempo\nocioso, Velocidade,\nPadrões de uso",
  },
];

export function TelemetriaPorqueComprar() {
  return (
    <section className="bg-[#F4F3ED] section-padding">
      <div className="section-container max-w-[1250px] mx-auto px-4 md:px-8">
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[2.25rem] md:text-[2.75rem] font-bold text-[#0A2A5E] text-center mb-12 leading-tight tracking-tight"
        >
          Por que comprar conosco
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-center">
          {motivos.map((motivo, index) => {
            const IconComponent = motivo.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex flex-col items-center"
              >
                <div className="mb-6">
                  <IconComponent className="w-8 h-8 text-[#0A2A5E]" strokeWidth={1.5} />
                </div>
                <h3 className="text-[1.125rem] md:text-[1.25rem] font-bold text-[#0A2A5E] mb-3">
                  {motivo.title}
                </h3>
                <p className="text-[#4D5C7E] font-medium text-[0.875rem] md:text-[0.9375rem] whitespace-pre-line leading-relaxed">
                  {motivo.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
