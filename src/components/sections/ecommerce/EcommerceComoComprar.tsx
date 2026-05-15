"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const steps = [
  {
    icon: "ec-como-comprar-1.svg",
    number: "01",
    title: "Busque sua Peça",
    desc: "Use a busca por código, modelo ou descrição para encontrar o que precisa.",
    scale: 1.1
  },
  {
    icon: "ec-como-comprar-2.svg",
    number: "02",
    title: "Adicione ao Carrinho",
    desc: "Selecione a quantidade de peças e adicione ao seu carrinho de compras.",
    scale: 1.15
  },
  {
    icon: "ec-como-comprar-3.svg",
    number: "03",
    title: "Escolha o Pagamento",
    desc: "Finalize sua compra com as melhores condições e toda a segurança.",
    scale: 1.1
  },
  {
    icon: "ec-como-comprar-4.svg",
    number: "04",
    title: "Receba em Casa",
    desc: "Entrega em 24–72h para todo o Brasil com sistema de rastreamento.",
    scale: 1.35
  }
];

export function EcommerceComoComprar() {
  const baseUrl = "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/";

  return (
    <section className="relative section-padding bg-white overflow-hidden">
      <div className="section-container">
        <div className="text-center mb-24">
           <motion.div
             initial={{ opacity: 0, y: 10 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
           >
              <h2 className="text-[2.5rem] md:text-[3.5rem] font-bold text-[#0A2A5E] mb-6 tracking-tight">
                Como comprar
              </h2>
              <div className="w-16 h-1.5 bg-[#0095FF] mx-auto rounded-full"></div>
           </motion.div>
        </div>

        {/* Linear Horizontal Flow — 100% Fidelity (Photos provided) */}
        <div className="relative flex flex-col lg:flex-row items-center lg:items-start justify-between gap-16 lg:gap-8 lg:px-4">
          
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.12 }}
              className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left group relative z-10"
            >
              <div className="flex items-center justify-center lg:justify-start w-full mb-8 relative">
                
                {/* SVG Icon with integrated number — Width/Height adjusted to match SVG viewBox proportions */}
                <div 
                  className="flex-shrink-0 relative w-[120px] h-[64px] transition-all duration-500 group-hover:drop-shadow-[0_0_12px_rgba(0,149,255,0.4)]"
                  style={{
                    backgroundColor: "#0095FF",
                    maskImage: `url(${baseUrl}${step.icon})`,
                    WebkitMaskImage: `url(${baseUrl}${step.icon})`,
                    maskSize: "contain",
                    WebkitMaskSize: "contain",
                    maskRepeat: "no-repeat",
                    WebkitMaskRepeat: "no-repeat",
                    maskPosition: "center",
                    WebkitMaskPosition: "center",
                  }}
                />

                {/* Connector Line — Only for Desktop */}
                {idx < steps.length - 1 && (
                   <div className="hidden lg:block h-[2px] bg-[#0095FF]/30 flex-grow mx-4 translate-y-[2px]" />
                )}
              </div>

              <div className="max-w-[280px]">
                <h3 className="text-[1.375rem] font-bold text-[#0A2A5E] mb-4 leading-tight">
                  {step.title}
                </h3>
                <p className="text-[#3E4A66]/70 text-[1rem] leading-relaxed font-medium">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
