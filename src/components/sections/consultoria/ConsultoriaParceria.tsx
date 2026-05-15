"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const benefits = [
  "Acompanhamento contínuo do desempenho da frota",
  "Suporte técnico especializado disponível",
  "Acesso a condições exclusivas de financiamento",
  "Treinamento de operadores incluído",
  "Planejamento de manutenção preventiva",
  "Relatórios periódicos de performance"
];
export function ConsultoriaParceria() {
  const scrollToForm = () => {
    const section = document.getElementById("contato");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="bg-[#f8f8f8] overflow-hidden section-padding">
      <div className="section-container flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        
        {/* Left Side — Benefits List */}
        <div className="flex-1 w-full order-2 lg:order-1">
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[2rem] md:text-[3.25rem] font-bold text-[#053474] mb-12 md:mb-16 tracking-tight"
          >
            Parceria de confiança
          </motion.h2>
          
          <div className="relative pl-10 md:pl-16">
            {/* Vertical Decorative Bar — Spans only the benefits list */}
            <div className="absolute left-0 top-[12px] bottom-[16px] w-[8px] bg-gradient-to-b from-transparent via-[#0A4EE4]/50 to-[#053474] rounded-full" />

            <div className="space-y-8 md:space-y-10">
              {benefits.map((benefit, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-start gap-5 md:gap-7 relative"
                >
                  {/* Bullet — SVG embedded to allow custom color #4B97BA */}
                  <div className="h-[32px] flex items-center shrink-0">
                     <svg width="16" height="16" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.5 4.60108C11.8333 5.37088 11.8333 7.29538 10.5 8.06518L3 12.3953C1.66666 13.1651 0 12.2029 0 10.6633V2.003C0 0.463399 1.66667 -0.498848 3 0.270952L10.5 4.60108Z" fill="#4B97BA"/>
                     </svg>
                  </div>
                  
                  <h3 className="text-[#053474] text-[1.125rem] md:text-[1.5rem] font-bold leading-[32px]">
                    {benefit}
                  </h3>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA Button — Outside the bar container to allow bar to end at last item */}
          <div className="pl-10 md:pl-16 mt-12 md:mt-16">
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              onClick={scrollToForm}
              className="flex items-center gap-3 px-10 py-5 bg-[#0A4EE4] hover:bg-[#053474] text-white rounded-full font-bold text-[1.125rem] transition-all duration-300 shadow-lg shadow-blue-600/20 group"
            >
              Iniciar Parceria
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>
        </div>

        {/* Right Side — Organic Image Composition */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex-1 relative w-full flex justify-center lg:justify-end order-1 lg:order-2"
        >
          <div className="relative w-full max-w-[640px] aspect-[4/3] lg:aspect-[5/6]">
             {/* Using the specialized asset provided for this section */}
             <Image 
               src="https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/consult-parceria-img.webp"
               alt="Parceria de Confiança CBMaq"
               fill
               className="object-contain"
               priority
             />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
