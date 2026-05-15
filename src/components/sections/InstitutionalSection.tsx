"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Target, ShieldCheck, Eye, Handshake as HandshakeIcon } from "lucide-react";

const institutionalCards = [
  {
    title: "Propósito",
    description: "Cultivar a confiança que agrega valor ao negócio dos nossos clientes.",
    icon: <Target className="w-6 h-6 text-[#195ab2]" />
  },
  {
    title: "Missão",
    description: "Disponibilizar soluções inovadoras para o agronegócio e a infraestrutura do Brasil, contribuindo para o crescimento sustentável de todos.",
    icon: <ShieldCheck className="w-6 h-6 text-[#195ab2]" />
  },
  {
    title: "Visão",
    description: "Ser, até 2030, o principal braço comercial do Shandong Group no Brasil e referência em soluções para a América Latina.",
    icon: <Eye className="w-6 h-6 text-[#195ab2]" />
  },
  {
    title: "Valores",
    description: "Ética · Respeito · Responsabilidade · Excelência · Senso de dono · Inovação contínua",
    icon: <HandshakeIcon className="w-6 h-6 text-[#195ab2]" />
  }
];

const values = [
  {
    label: "Nossa História",
    title: "Liderando há gerações.\nInovação desde 1965.",
    description: "Desde 1965, a CBMaq constrói um ecossistema completo de soluções da importação à consultoria, da venda de máquinas à gestão operacional para impulsionar o crescimento do seu negócio com inteligência e eficiência.\n\nSão 5 unidades regionais e mais de 100 colaboradores. Quando a operação exige confiança, a CBMaq está presente.",
    icon: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/icon1.png",
    image: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/novo-selo-crop.webp",
    alt: "CBMaq 60 anos — Inovação desde 1965"
  },
  {
    label: "Propósito · Missão ·\nVisão · Valores",
    title: "Nosso Propósito:\nSua Operação Não Parar.",
    description: "Nossa missão é ser a ponte estratégica entre a tecnologia global e o produtor brasileiro. Atuamos com transparência e expertise técnica para garantir que cada máquina entregue seja sinônimo de produtividade.\n\nNossa visão é consolidar a liderança absoluta em consultoria de máquinas pesadas no Brasil até 2030, fundamentada em valores de confiança e agilidade.",
    icon: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/icon2.png",
    image: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/eco-1.png",
    alt: "Missão e Valores CBMaq"
  },
  {
    label: "Nossos Diferenciais",
    title: "11 Soluções Integradas\nPonta a Ponta.",
    description: "11 soluções integradas em um único ecossistema: da compra da máquina à peça de reposição, do consórcio à telemetria, do seguro à assistência técnica. Tudo que a sua operação precisa, em um só lugar.",
    icon: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/icon3.png",
    image: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/banner-slide-show-copy.webp",
    alt: "Diferenciais CBMaq"
  },
  {
    label: "Nossa Equipe",
    title: "Capital Humano Especializado\ne Comprometido.",
    description: "Mais de 100 colaboradores dedicados, sendo 30+ técnicos certificados pelas fabricantes.\nEngenheiros, especialistas comerciais e profissionais de campo, prontos para atender com precisão no DF, GO e TO.",
    icon: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/icon4.png",
    image: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/cbmaqquemsomos.webp",
    alt: "Equipe CBMaq"
  },
];

export function InstitutionalSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section
      id="sobre"
      className="relative section-padding"
      style={{ 
        background: "linear-gradient(180deg, #FFFFFF 0%, #F2F0E8 88%)"
      }}
      aria-label="Seção institucional"
    >
      <div className="section-container">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          
          {/* Left Column — Text & Interactive List */}
          <div className="w-full lg:w-[50%] flex flex-col pt-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="font-sans text-[2rem] md:text-[2.25rem] lg:text-[2.5rem] leading-[1.15] font-bold mb-4 text-[#001647] tracking-tight whitespace-pre-line">
                  {values[activeIndex].title}
                </h2>

                <p className="font-sans text-[0.875rem] md:text-[0.9375rem] leading-[1.65] text-[#4d5c7e] font-medium mb-10 max-w-[95%] whitespace-pre-line">
                  {values[activeIndex].description}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Interactive List Container */}
            <div className="relative pl-[52px] flex">
              
              {/* Timeline Track */}
              <div className="absolute left-0 top-0 bottom-0 w-[10px] rounded-full bg-[#E6EDF8] overflow-hidden">
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-white via-[#7BA8F5] to-[#0A4EE4]" />
                
                {/* Floating Highlight inside the track */}
                <motion.div
                  className="absolute left-0 w-full bg-white z-10"
                  initial={false}
                  animate={{
                    top: `${activeIndex * 25}%`,
                    height: "25%",
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  style={{ 
                    boxShadow: "0 0 15px 2px rgba(255,255,255,0.8)",
                    filter: "brightness(1.2)"
                  }}
                />
              </div>

              {/* The Items */}
              <div className="flex flex-col h-[320px] justify-between relative w-full">
                {values.map((item, idx) => {
                  const isActive = activeIndex === idx;
                  return (
                    <div
                      key={idx}
                      className="group flex items-center relative cursor-pointer h-[80px]"
                      onClick={() => setActiveIndex(idx)}
                    >
                       {/* Target Arrow */}
                       <div className="absolute left-[-32px] top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center">
                          <AnimatePresence>
                              {isActive && (
                                <motion.div
                                  initial={{ opacity: 0, x: -5 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  exit={{ opacity: 0, x: -5 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <Image 
                                    src="https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/arrow.svg"
                                    alt="Seta indicadora"
                                    width={20}
                                    height={20}
                                    unoptimized
                                    className="object-contain"
                                  />
                                </motion.div>
                              )}
                          </AnimatePresence>
                       </div>

                       {/* Content Row */}
                       <div className="flex items-center gap-6 w-full pl-2">
                           {/* Icon  */}
                           <div className="w-[36px] h-[36px] flex items-center justify-center shrink-0">
                               <Image 
                                  src={item.icon}
                                  alt={item.label.replace('\n', ' ')}
                                  width={36}
                                  height={36}
                                  unoptimized
                                  className={cn(
                                     "object-contain transition-all duration-300",
                                     isActive ? "opacity-100 scale-110" : "opacity-40 scale-100 group-hover:opacity-70"
                                  )}
                               />
                           </div>
                           
                           {/* Label */}
                           <span className={cn(
                             "font-sans text-[0.9375rem] md:text-[1rem] leading-tight transition-all duration-300 whitespace-pre-line tracking-tight",
                             isActive ? "font-bold text-[#001647]" : "font-medium text-[#4d5c7e] group-hover:text-[#001647]"
                           )}>
                             {item.label}
                           </span>
                       </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Button CTA */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-14 flex justify-center lg:justify-start"
            >
              <Link 
                href="/nossa-historia" 
                className="flex items-center gap-2 bg-[#0A4EE4] hover:bg-[#083DB4] text-white text-[0.75rem] lg:text-[0.8125rem] font-medium px-6 lg:px-7 py-2.5 lg:py-3 rounded-full transition-all group w-fit"
              >
                Conhecer Nossa História completa
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none" className="transition-transform group-hover:translate-x-1">
                  <path d="M4 10h12m0 0l-5-5m5 5l-5 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </motion.div>
          </div>

          {/* Right Column — Image */}
          <div className="w-full lg:w-[50%] flex justify-center lg:justify-end mt-8 lg:mt-0">
             <div className="relative w-full max-w-[550px] aspect-[4/3] group/img">
               {/* Decorative background effects */}
               <div className="absolute -inset-4 bg-gradient-to-tr from-[#0A4EE4]/10 to-transparent rounded-[60px] blur-3xl opacity-0 group-hover/img:opacity-100 transition-opacity duration-1000" />
               <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#0A4EE4]/5 rounded-full blur-2xl" />
               <AnimatePresence mode="wait">
                 <motion.div
                   key={activeIndex}
                   initial={{ opacity: 0, scale: 0.95, rotate: activeIndex % 2 === 0 ? -1 : 1 }}
                   animate={{ opacity: 1, scale: 1, rotate: 0 }}
                   exit={{ opacity: 0, scale: 1.05, rotate: activeIndex % 2 === 0 ? 1 : -1 }}
                   transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                   className={cn(
                     "relative w-full h-full transition-all duration-500 flex items-center justify-center",
                     activeIndex !== 1 && "overflow-hidden",
                     (activeIndex === 0 || activeIndex === 1)
                       ? "bg-transparent shadow-none border-none" 
                       : "rounded-[32px] md:rounded-[48px] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-white/40"
                   )}
                 >
                   {activeIndex === 1 ? (
                      <div className="grid grid-cols-2 gap-4 w-full h-full">
                        {institutionalCards.map((card, i) => (
                          <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 + 0.3 }}
                            className="bg-white rounded-[32px] p-6 flex flex-col items-center text-center shadow-[0_15px_35px_rgba(0,0,0,0.06)] border border-gray-100/60 hover:shadow-[0_20px_45px_rgba(10,78,228,0.1)] transition-all duration-500 group/card"
                          >
                            <div className="w-12 h-12 rounded-full bg-[#0A4EE4]/5 flex items-center justify-center mb-4 group-hover/card:scale-110 transition-transform duration-500">
                              {card.icon}
                            </div>
                            <h4 className="text-[0.9375rem] font-bold text-[#001647] mb-2 tracking-tight">{card.title}</h4>
                            <p className="text-[0.8125rem] text-[#4d5c7e] leading-relaxed line-clamp-3 md:line-clamp-none font-medium">
                              {card.description}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <Image
                        src={values[activeIndex].image}
                        alt={values[activeIndex].alt}
                        fill
                        unoptimized
                        className={cn(
                          "object-cover transition-all duration-700",
                          activeIndex === 0 ? "object-contain" : "group-hover/img:scale-105"
                        )}
                        sizes="(max-width: 1024px) 100vw, 600px"
                        quality={100}
                        priority
                      />
                    )}
                   
                   {activeIndex !== 0 && activeIndex !== 1 && (
                     <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none opacity-60" />
                   )}
                 </motion.div>
               </AnimatePresence>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}
