"use client";

import { motion } from "framer-motion";
import { TrendingUp, Users, Gift } from "lucide-react";

export function WhyWorkSection() {
  const benefits = [
    {
      title: "Crescimento",
      description: "Desenvolvimento profissional contínuo",
      icon: <TrendingUp className="w-10 h-10 text-[#053474]" />,
    },
    {
      title: "Equipe Unida",
      description: "Time comprometido e apaixonado",
      icon: <Users className="w-10 h-10 text-[#053474]" />,
    },
    {
      title: "Benefícios",
      description: "Pacote competitivo para você",
      icon: <Gift className="w-10 h-10 text-[#053474]" />,
    },
  ];

  return (
    <section className="section-padding bg-[#F8F9FA] overflow-hidden">
      <div className="section-container max-w-[1200px]">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-[#053474] text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Por que trabalhar na CBMaq?
          </h2>
          <p className="text-[#4d5c7e] text-[1.125rem] max-w-[600px] mx-auto">
            Ambiente acolhedor, oportunidades de crescimento e uma equipe que valoriza cada colaborador.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="bg-white rounded-[30px] p-12 text-center flex flex-col items-center border border-[#053474]/20 shadow-[0_10px_30px_rgba(5,52,116,0.03)] hover:border-[#053474]/40 transition-all group"
            >
              <div className="mb-8 transition-transform group-hover:scale-110 duration-300">
                {benefit.icon}
              </div>
              <h3 className="text-[#053474] text-xl font-bold mb-4">
                {benefit.title}
              </h3>
              <p className="text-[#4d5c7e] font-medium leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
