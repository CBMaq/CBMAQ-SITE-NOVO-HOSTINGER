"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const baseUrl = "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/";

const timelineData = [
  {
    year: "1965",
    text: "Fundação do Grupo no mercado de máquinas pesadas.",
  },
  {
    year: "1973",
    text: "Representação Dynapac, líder mundial em compactação.",
  },
  {
    year: "1976",
    text: "Parceria Schneider Logemann, incorporada pela John Deere.",
  },
  {
    year: "1995",
    text: "Expansão para o agronegócio com a New Holland.",
  },
  {
    year: "2012",
    text: "Parceria com a Michelin, líder mundial em pneus.",
  },
  {
    year: "2023",
    text: "Distribuidor oficial Weichai e Lovol, presentes em 177 países.",
  },
  {
    year: "2026",
    text: "Em 2026, aprimoramos ainda mais nossas soluções integradas para atender clientes e parceiros com mais eficiência, qualidade e atenção a cada detalhe.",
  },
];

export function HistoryTimeline() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % timelineData.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section 
      className="relative pt-32 pb-10 md:pt-48 md:pb-12 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src={`${baseUrl}historia-carrosselhero-slide1965-bg.webp`}
          alt=""
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Top Right Effect */}
      <div className="absolute top-0 right-0 w-[200px] h-[200px] md:w-[450px] md:h-[450px] z-20 pointer-events-none">
        <img
          src={`${baseUrl}historia-carrosselhero-top-right-ef.svg`}
          alt=""
          className="w-full h-full object-contain object-top object-right"
        />
      </div>

      <div className="section-container relative z-10 flex flex-col items-start">
        {/* Wrapper to align everything to the same left edge */}
        <div className="w-full max-w-[1000px] flex flex-col">
          
          {/* Header Text */}
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[1.75rem] md:text-[2.25rem] text-left text-[#053474] mb-8 md:mb-12 leading-tight font-medium"
          >
            Uma empresa familiar que constrói <br className="hidden md:block" />
            referência nacional desde <span className="font-extrabold">1965.</span>
          </motion.h2>

          {/* Big Year + Text */}
          <div className="flex flex-col md:flex-row items-start md:justify-start w-full mb-10 md:mb-14 gap-8 md:gap-16">
            {/* Year */}
            <div className="flex flex-col items-start justify-center md:w-[280px]">
              <span className="text-[#0095FF] font-semibold text-[1rem] md:text-[1.125rem] relative md:left-[5px] mb-[-10px] md:mb-[-20px]">Ano</span>
              <div className="relative inline-block -skew-x-[8deg]">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={timelineData[activeIdx].year}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="text-[5.5rem] md:text-[8.5rem] font-extrabold block text-[#0095FF] leading-none tracking-tighter"
                  >
                    {timelineData[activeIdx].year}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>

            {/* Vertical Separator */}
            <div 
              className="hidden md:block w-[5px] h-[120px] rounded-full flex-shrink-0" 
              style={{ background: 'linear-gradient(to bottom, #0A4EE4 0%, #4B97BA 35%, #FAFAF7 85%, #FFFFFF 100%)' }}
            />

            {/* Text */}
            <div className="flex flex-col justify-center text-left max-w-[450px] mx-0">
              <AnimatePresence mode="wait">
                <motion.p
                  key={timelineData[activeIdx].text}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="text-[1.125rem] md:text-[1.5rem] font-medium text-[#053474] leading-tight"
                >
                  {timelineData[activeIdx].text}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          {/* Timeline Bar */}
          <div className="relative w-full h-[64px] md:h-[84px] mb-6 md:mb-8">
            {/* Background Box Asset */}
            <div className="absolute inset-y-0 w-full md:w-[110%] md:-left-[5%] z-0">
              <img 
                src={`${baseUrl}historia-retangulo-gradiente-caixa-dos-anos.svg`}
                alt=""
                className="w-full h-full object-fill"
              />
            </div>

            <div className="absolute inset-0 z-10 flex items-center justify-between px-2 sm:px-4 md:px-10">
              {timelineData.map((item, idx) => {
                const isActive = activeIdx === idx;
                return (
                  <button
                    key={item.year}
                    onClick={() => setActiveIdx(idx)}
                    className="relative flex flex-col items-center group"
                  >
                    {/* Active Triangle Indicator */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          layoutId="timeline-triangle"
                          className="absolute -top-[14px] md:-top-[30px]"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        >
                          <img 
                            src={`${baseUrl}historia-carrosselhero-seletor-de-ano.svg`} 
                            alt="" 
                            className="w-[16px] md:w-[20px] h-auto drop-shadow-sm"
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <span 
                      className={cn(
                        "text-[0.65rem] sm:text-[0.875rem] md:text-[1.125rem] italic text-[#0095FF] transition-all duration-300",
                        isActive ? "font-extrabold" : "font-medium"
                      )}
                    >
                      {item.year}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Footer Text */}
          <div className="w-full text-left px-0">
            <p className="text-[1rem] md:text-[1.125rem] text-[#053474] font-medium leading-relaxed max-w-[950px] mx-0">
              Ao longo de seis décadas, muita coisa evoluiu tecnologia, mercado, demandas. Mas uma base permaneceu sólida: a dedicação da CBMaq em gerar resultados consistentes e impulsionar o crescimento de quem confia na marca.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
