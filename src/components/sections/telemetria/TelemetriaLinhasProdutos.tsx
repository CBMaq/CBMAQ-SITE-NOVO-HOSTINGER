"use client";

import { motion } from "framer-motion";

const produtos = [
  {
    title: "CANLINK –\nTelemetria Avançada",
    desc: "Extração de dados da rede CAN da máquina. Informações sobre tipo de uso, códigos de falha e parâmetros do motor. Leitura da rede CAN, Códigos de falha OEM, Parâmetros do motor, Classificação de uso.",
  },
  {
    title: "ANALOGLINK –\nMotores Mecânicos",
    desc: "Para máquinas mais antigas. Leitura de níveis de combustível, temperatura e pressão via painel. Nível de combustível, temperatura, pressão, Horímetro.",
  },
  {
    title: "ONLINK –\nRastreamento Satelital",
    desc: "Localização sem dependência de sinal GPRS/4G. Ideal para áreas remotas com cobertura 100% via satélite. Localização GPS, Cobertura global, Sem dependência celular.",
  },
];

export function TelemetriaLinhasProdutos() {
  return (
    <section className="bg-[#F4F3ED] section-padding">
      <div className="section-container max-w-[1250px] mx-auto px-4 md:px-8">
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[2.25rem] md:text-[2.75rem] font-bold text-[#0A2A5E] text-center mb-10 leading-tight tracking-tight"
        >
          Linhas de produtos
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {produtos.map((produto, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white p-10 md:p-12 rounded-[32px] shadow-sm border border-[#0A4EE4]/20 flex flex-col"
            >
              <h3 className="text-[1.25rem] md:text-[1.375rem] font-bold text-[#0A2A5E] mb-6 leading-[1.2] whitespace-pre-line">
                {produto.title}
              </h3>
              <p className="text-[#4D5C7E] font-medium text-[0.95rem] leading-relaxed">
                {produto.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
