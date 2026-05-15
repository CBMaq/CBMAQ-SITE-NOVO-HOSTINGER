"use client";

import { motion } from "framer-motion";

export function ImportacaoModalidades() {
  const cards = [
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 10V38H34V18L26 10H14Z" stroke="#053474" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M26 10V18H34" stroke="#053474" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M18 10V6H38V34H34" stroke="#053474" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "Sem Burocracia",
      desc: "A gente cuida de toda a documentação por você."
    },
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 16V10H16" stroke="#053474" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M32 10H38V16" stroke="#053474" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M38 32V38H32" stroke="#053474" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16 38H10V32" stroke="#053474" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="24" cy="24" r="6" stroke="#053474" strokeWidth="2.5"/>
          <path d="M14 24C14 24 18 17 24 17C30 17 34 24 34 24C34 24 30 31 24 31C18 31 14 24 14 24Z" stroke="#053474" strokeWidth="2.5"/>
        </svg>
      ),
      title: "Sem RADAR",
      desc: "Você não precisa ter RADAR. Nós importamos por você."
    },
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M24 6L6 14V34L24 42L42 34V14L24 6Z" stroke="#053474" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M6 14L24 22L42 14" stroke="#053474" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M24 22V42" stroke="#053474" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M15 10L33 18" stroke="#053474" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "Sem Estresse",
      desc: "Do fornecedor até você, sem complicação nenhuma."
    },
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 14H32V34H4V14Z" stroke="#053474" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M32 18H40L44 24V34H32" stroke="#053474" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="12" cy="38" r="4" stroke="#053474" strokeWidth="2.5"/>
          <circle cx="36" cy="38" r="4" stroke="#053474" strokeWidth="2.5"/>
          <path d="M32 24H44" stroke="#053474" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M10 18H20" stroke="#053474" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8 24H22" stroke="#053474" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "Entrega",
      desc: "Seu produto da China direto no seu endereço."
    }
  ];

  return (
    <section className="bg-white py-10 md:py-12">
      <div className="section-container">
        
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-[2.25rem] md:text-[3.25rem] font-bold text-[#053474] tracking-tight">
            Importar nunca foi tão simples com a CBMaq
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-[24px] p-8 md:p-10 border border-[#053474] shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col items-center text-center group hover:shadow-[0_8px_30px_rgb(5,52,116,0.08)] transition-all duration-300"
            >
              <div className="mb-8 flex items-center justify-center">
                {card.icon}
              </div>
              
              <h3 className="text-[1.375rem] font-bold text-[#053474] mb-3">
                {card.title}
              </h3>
              
              <p className="text-[#4D5C7E] text-[1rem] leading-relaxed font-medium">
                {card.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

