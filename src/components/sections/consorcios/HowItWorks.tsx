"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ConsorcioEnergyVisual } from "./ConsorcioEnergyVisual";

const steps = [
  {
    img: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/como-funciona01.svg",
    title: "Escolha seu Plano",
    desc: "Defina o valor da carta de crédito e o prazo ideal.",
    scale: 1.1
  },
  {
    img: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/como-funciona02.svg",
    title: "Entre no Grupo",
    desc: "Faça sua adesão e participe das assembleias mensais.",
    scale: 1.15
  },
  {
    img: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/como-funciona03.svg",
    title: "Seja Contemplado",
    desc: "Concorra por sorteio ou oferte um lance.",
    scale: 1.1
  },
  {
    img: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/como-funciona04.svg",
    title: "Adquira seu Equipamento",
    desc: "Use sua carta de crédito para comprar qualquer máquina da nossa linha.",
    scale: 1.35
  }
];

export function HowItWorks() {
  return (
    <section className="relative pt-48 pb-40 bg-[linear-gradient(135deg,#001647_0%,#002C8D_100%)] overflow-hidden -mt-24">
      {/* Figma Background Glow — Achievement of Photo 2 depth */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-[radial-gradient(circle,rgba(10,78,228,0.15)_0%,transparent_70%)] z-0 pointer-events-none" />
      
      {/* Background Trail filaments covering the base */}
      <ConsorcioEnergyVisual />

      <div className="section-container relative z-10">
        <div className="text-center mb-28">
           <motion.div
             initial={{ opacity: 0, y: 10 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
           >
              <h2 className="text-[2.75rem] md:text-[3.5rem] font-bold text-white mb-6 tracking-tight">
                Como Funciona
              </h2>
              <div className="w-16 h-1.5 bg-[#0095FF] mx-auto rounded-full shadow-[0_0_15px_rgba(0,149,255,0.4)]"></div>
           </motion.div>
        </div>

        {/* Linear Horizontal Flow — 100% Fidelity to Figma (Photo 2) */}
        <div className="relative flex flex-col lg:flex-row items-center lg:items-start justify-between gap-12 lg:gap-0 lg:px-4">
          
          {/* No background line here to prevent overlap behind SVGs */}

          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.12 }}
              className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left group relative z-10"
            >
              <div className="flex items-center justify-center lg:justify-start w-full mb-10 relative">
                {/* SVG Icon with number — Recolor forcing vibrant Cyan as in Figma */}
                <div 
                  className="flex-shrink-0 relative w-[140px] h-[72px] transition-all duration-500 group-hover:drop-shadow-[0_0_12px_rgba(0,149,255,0.6)]"
                  style={{
                    backgroundColor: "#0095FF",
                    maskImage: `url(${step.img})`,
                    WebkitMaskImage: `url(${step.img})`,
                    maskSize: "contain",
                    WebkitMaskSize: "contain",
                    maskRepeat: "no-repeat",
                    WebkitMaskRepeat: "no-repeat",
                    maskPosition: "center",
                    WebkitMaskPosition: "center",
                    transform: `scale(${step.scale})`
                  }}
                />

                {/* Individual Segment Connector Lines — Perfect resolution/zoom stability for Desktop */}
                {idx < steps.length - 1 && (
                   <div className={`hidden lg:block h-[2px] bg-[#0095FF]/60 flex-grow mx-4 translate-y-[-2px] ${idx === 2 ? 'translate-x-4' : ''}`} />
                )}

                {/* Vertical Connector removed for cleaner Mobile Flow as requested */}
              </div>

              <div className="max-w-[280px] lg:pl-1">
                <h3 className="text-[1.375rem] font-bold text-white mb-4 leading-tight tracking-tight">
                  {step.title}
                </h3>
                <p className="text-white/60 text-[1rem] leading-relaxed font-medium">
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
