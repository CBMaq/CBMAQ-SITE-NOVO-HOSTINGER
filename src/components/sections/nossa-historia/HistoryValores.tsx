"use client";
import { motion } from "framer-motion";
import { Target, ShieldCheck, Eye, Handshake } from "lucide-react";

const valoresData = [
  {
    icon: <Target className="w-8 h-8 md:w-10 md:h-10 text-[#053474]" />,
    title: "Propósito",
    text: "Cultivar a confiança que agrega valor ao negócio dos nossos clientes.",
  },
  {
    icon: <ShieldCheck className="w-8 h-8 md:w-10 md:h-10 text-[#053474]" />,
    title: "Missão",
    text: "Disponibilizar soluções inovadoras para o agronegócio e a infraestrutura do Brasil, contribuindo para o crescimento sustentável de todos.",
  },
  {
    icon: <Eye className="w-8 h-8 md:w-10 md:h-10 text-[#053474]" />,
    title: "Visão",
    text: "Ser, até 2030, o principal braço comercial do Shandong Group no Brasil e referência em soluções para a América Latina.",
  },
  {
    icon: <Handshake className="w-8 h-8 md:w-10 md:h-10 text-[#053474]" />,
    title: "Valores",
    text: "Ética · Respeito · Responsabilidade · Excelência · Senso de dono · Inovação contínua",
  },
];

export function HistoryValores() {
  return (
    <section className="bg-white section-padding">
      <div className="section-container">
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[2.25rem] md:text-[3.5rem] font-bold text-[#053474] text-center mb-10 md:mb-16 tracking-tight"
        >
          Propósito, Missão,<br /> Visão e Valores
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-4">
          {valoresData.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white px-5 py-10 md:px-6 md:py-12 rounded-[20px] border border-[#053474]/30 flex flex-col items-center text-center hover:border-[#053474]/60 transition-colors h-full"
            >
              <div className="mb-5 flex items-center justify-center">
                {item.icon}
              </div>
              <h3 className="text-[1.375rem] font-bold text-[#053474] mb-3">
                {item.title}
              </h3>
              <p className="text-[0.9rem] md:text-[0.95rem] text-[#053474] font-medium leading-snug">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

