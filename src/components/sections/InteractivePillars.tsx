"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { EnergyVisual } from "./EnergyVisual";

const pillars = [
  {
    number: "01",
    title: "Presença Nacional",
    description: "Unidades estratégicas em todo o Brasil para atender sua operação com agilidade.",
  },
  {
    number: "02",
    title: "Portfólio Completo",
    description: "11 soluções integradas que cobrem toda a cadeia de importação e logística.",
  },
  {
    number: "03",
    title: "Time Técnico Qualificado",
    description: "Profissionais especializados com décadas de experiência no mercado.",
  },
  {
    number: "04",
    title: "Relacionamento de Longo Prazo",
    description: "Parcerias sólidas construídas ao longo de mais de 60 anos de atuação.",
  },
];

export function InteractivePillars() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Responsive check for indicator logic
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Calculate indicator position depending on layout
  const getIndicatorX = (index: number) => {
    if (isMobile) {
        // Mobile 2x2: 0/2 are Left, 1/3 are Right
        return (index % 2) * 50;
    }
    // Desktop: 0, 25, 50, 75
    return index * 25;
  };

  const getIndicatorWidth = () => {
    return isMobile ? "50%" : "25%";
  };

  return (
    <div 
        className="w-full relative pt-12 md:pt-16 lg:pt-24 pb-36 md:pb-52 lg:pb-60"
        onMouseLeave={() => setActiveIndex(null)}
    >
      <div className="section-container relative z-20">
        {/* Header and Animated Line */}
        <div className="text-center mb-16 md:mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-sans text-[1.75rem] md:text-[2.75rem] lg:text-[3.25rem] font-bold text-white mb-12 max-w-4xl mx-auto leading-tight"
          >
            Quatro pilares que sustentam cada operação dos nossos clientes.
          </motion.h2>

          {/* Separation Line with Mobile-Aware Moving Glow */}
          <div className="relative w-full max-w-[1240px] mx-auto px-4 md:px-8">
            <div className="relative w-full h-[1px] bg-white/10">
              {/* The "Subtle Square Light Beam" Indicator */}
              <AnimatePresence>
                  {activeIndex !== null && (
                      <motion.div
                          layoutId="topGlowIndicator"
                          initial={{ opacity: 0 }}
                          animate={{ 
                                opacity: 1, 
                                left: `${getIndicatorX(activeIndex)}%`,
                                width: getIndicatorWidth()
                          }}
                          exit={{ opacity: 0 }}
                          transition={{
                              type: "spring",
                              stiffness: 100,
                              damping: 24,
                              mass: 1,
                          }}
                          className="absolute inset-y-[-1px] z-10 flex justify-center items-center"
                      >
                           {/* Intensely Directed Horizontal Beam */}
                           <div className="w-full h-full max-w-[240px] mx-auto bg-[#60A5FA] opacity-80 blur-[6px] rounded-full shadow-[0_0_25px_4px_rgba(96,165,250,0.6)]" />
                           
                           {/* High-Intensity Laser Core */}
                           <div className="absolute inset-y-0 w-full max-w-[180px] h-[2px] my-auto bg-white opacity-90 blur-[2px] shadow-[0_0_15px_#fff]" />
                           
                           {/* Atmospheric Bloom */}
                           <div className="absolute inset-x-0 -top-4 h-8 bg-[#60A5FA]/10 blur-[20px] pointer-events-none" />
                      </motion.div>
                  )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-10 md:gap-x-16 lg:gap-x-24 gap-y-16 md:gap-y-24">
          {pillars.map((pillar, index) => {
            const isActive = activeIndex === index;
            return (
              <motion.div
                key={pillar.number}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "group relative cursor-pointer flex flex-col items-center transition-all duration-700",
                  activeIndex === null ? "opacity-100" : (isActive ? "opacity-100 scale-[1.05]" : "opacity-40")
                )}
              >
                {/* Large Number */}
                <div className="relative mb-6">
                    <motion.span
                        animate={{
                            scale: isActive ? 1.05 : 1,
                        }}
                        className={cn(
                            "font-sans block text-[6rem] sm:text-[10rem] lg:text-[13rem] font-bold leading-none select-none transition-all duration-700",
                            "bg-clip-text text-transparent bg-gradient-to-b",
                            isActive 
                                ? "from-[#60A5FA] to-transparent" 
                                : "from-[#0A63DB] to-transparent"
                        )}
                    >
                        {pillar.number}
                    </motion.span>
                    
                    {/* Background Bloom */}
                    <AnimatePresence>
                        {isActive && (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 0.25, scale: 1.3 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-x-[-20%] inset-y-[-10%] bg-[#60A5FA] blur-[60px] pointer-events-none"
                            />
                        )}
                    </AnimatePresence>
                </div>

                {/* Content */}
                <motion.div
                    animate={{ y: isActive ? -15 : 0 }}
                    transition={{ type: "spring", damping: 15 }}
                    className="relative z-10 -mt-12 md:-mt-16 lg:-mt-20 px-2 flex flex-col items-center"
                >
                    <h3 className={cn(
                        "text-[1.25rem] md:text-[1.5rem] font-bold mb-3 tracking-tight transition-colors duration-500 text-center leading-tight",
                        isActive ? "text-white" : "text-white/90"
                    )}>
                        {pillar.title}
                    </h3>

                    <p className={cn(
                        "text-[0.9375rem] leading-[1.6] text-center transition-all duration-500 max-w-[280px]",
                        isActive ? "text-white/90" : "text-white/50"
                    )}>
                        {pillar.description}
                    </p>
                </motion.div>

                {/* Active Indicator Underline */}
                {isActive && (
                    <motion.div 
                        layoutId="navUnderline"
                        className="absolute -bottom-8 w-20 h-[3px] bg-[#60A5FA] shadow-[0_0_20px_#60A5FA]"
                    />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Full-width Refined Energy Visual */}
      <EnergyVisual activeIndex={activeIndex} />
    </div>
  );
}
