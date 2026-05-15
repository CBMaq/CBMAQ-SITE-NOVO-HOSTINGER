"use client";

import { motion } from "framer-motion";
import { ConsorcioEnergyVisual } from "../consorcios/ConsorcioEnergyVisual";

const steps = [
  {
    num: "01",
    title: "Planejamento",
    desc: "Definição de objetivos e mapeamento de processos iniciais."
  },
  {
    num: "02",
    title: "Diagnóstico Técnico",
    desc: "Avaliação detalhada da frota e performance em campo."
  },
  {
    num: "03",
    title: "Análise Computacional",
    desc: "Processamento de dados para identificar gargalos e ganhos."
  },
  {
    num: "04",
    title: "Plano de Ação",
    desc: "Entrega de estratégia completa com metas e ROI projetado."
  }
];

export function ConsultoriaComoTrabalhamos() {
  return (
    <section className="relative bg-[linear-gradient(135deg,#001647_0%,#002C8D_100%)] overflow-hidden section-padding">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-[radial-gradient(circle,rgba(10,78,228,0.2)_0%,transparent_70%)] z-0 pointer-events-none" />
      
      {/* Unified Trail filaments from Consórcios infrastructure */}
      <ConsorcioEnergyVisual />

      <div className="section-container relative z-10">
        <div className="text-center mb-28">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-[2.25rem] md:text-[3.5rem] font-bold text-white mb-6 tracking-tight">
              Como trabalhamos
            </h2>
            <div className="w-16 h-1.5 bg-[#0095FF] mx-auto rounded-full shadow-[0_0_15px_rgba(0,149,255,0.4)]" />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-8 px-4 lg:px-0">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.12 }}
              className="flex flex-col items-center lg:items-start text-center lg:text-left group relative"
            >
              <div className="mb-10 block">
                <span className="text-[3.5rem] md:text-[5rem] font-bold text-[#0095FF] leading-none drop-shadow-[0_0_12px_rgba(0,149,255,0.4)] group-hover:drop-shadow-[0_0_20px_rgba(0,149,255,0.6)] transition-all duration-500 font-sans">
                  {step.num}
                </span>
              </div>

              <div className="max-w-[280px]">
                <h3 className="text-[1.5rem] font-bold text-white mb-4 leading-tight tracking-tight">
                  {step.title}
                </h3>
                <p className="text-white/70 text-[1.125rem] leading-relaxed font-medium">
                  {step.desc}
                </p>
              </div>

              {/* Connector lines (Desktop) — Consistent with HowItWorks */}
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute top-[40px] left-[140px] w-full max-w-[120px] h-[1.5px] bg-[#0095FF]/30" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
