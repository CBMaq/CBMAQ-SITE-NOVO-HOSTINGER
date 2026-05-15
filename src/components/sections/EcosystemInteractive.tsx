"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";

const ecosystemCards = [
  {
    id: "finance",
    title: "Consórcios",
    description: "Crédito planejado para renovação e expansão de frota com condições exclusivas para as melhores marcas.",
    cta: "Simular financiamento",
    image: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/1-6.webp",
    alt: "Consórcio CBMaq",
    link: "/consorcios"
  },
  {
    id: "insurance",
    title: "Seguros Especializados",
    description: "Proteção completa para seu maquinário contra danos e roubos, garantindo a continuidade do seu negócio.",
    cta: "Cotar Seguro",
    image: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/1-1.webp",
    alt: "Seguros CBMaq",
    link: "/seguros"
  },
  {
    id: "import",
    title: "Importação & Comércio Exterior",
    description: "Conectamos sua empresa ao mundo com soluções ágeis de importação e transporte intermodal de ponta a ponta.",
    cta: "Ver Detalhes",
    image: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/eco-1.png",
    alt: "Comércio Exterior CBMaq",
    link: "/importacao"
  },
  {
    id: "gov",
    title: "Vendas para o Governo",
    description: "Especialistas em licitações e fornecimento de máquinas pesadas para infraestrutura pública e municípios.",
    cta: "Ver Licitações",
    image: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/1-8.webp",
    alt: "Licitações CBMaq",
    link: "/vendas-ao-governo"
  },
  {
    id: "sales",
    title: "Máquinas e Tratores",
    description: "Distribuição multimarcas das maiores fabricantes mundiais. Robustez para Agro, Infra e Mineração.",
    cta: "Ver Máquinas",
    image: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/maquinas-copy.webp",
    alt: "Venda de máquinas CBMaq",
    link: "/maquinas"
  },
  {
    id: "ecommerce",
    title: "E-Commerce de Peças",
    description: "Loja digital completa com peças genuínas Lovol e Weichai para reposição imediata em todo o Brasil.",
    cta: "Acessar Loja",
    image: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/1-3.webp",
    alt: "E-commerce CBMaq",
    link: "/ecommerce"
  },
  {
    id: "consulting",
    title: "Consultoria Especializada",
    description: "Diagnóstico especializado para maximizar o ROI da sua frota e otimizar processos operacionais complexos.",
    cta: "Solicitar Diagnóstico",
    image: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/consultoria-especializada-logo-ajustada-copy.webp",
    alt: "Consultoria CBMaq",
    link: "/consultoria"
  },
  {
    id: "assistance",
    title: "Assistência Técnica",
    description: "Suporte especializado e oficina móvel para que sua operação nunca pare de gerar resultados extraordinários.",
    cta: "Ver Assistência",
    image: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/1-4.webp",
    alt: "Assistência Técnica CBMaq",
    link: "/assistencia-tecnica"
  },
  {
    id: "weichai",
    title: "Peças e Motores Weichai",
    description: "Exclusividade técnica da maior fabricante de motores diesel do mundo. Potência e durabilidade garantidas.",
    cta: "Ver Motores",
    image: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/eco-weichai.png",
    alt: "Motores Weichai CBMaq",
    link: "/motores-weichai"
  },
  {
    id: "multibrand",
    title: "Peças Multimarcas",
    description: "A maior pronta entrega de peças para máquinas pesadas do país, com garantia de qualidade e procedência.",
    cta: "Solicitar Peça",
    image: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/1-2.webp",
    alt: "Peças CBMaq",
    link: "/pecas-multimarcas"
  },
  {
    id: "telemetry",
    title: "Telemetria & Rastreamento",
    description: "Dados em tempo real sobre consumo, localização e saúde das máquinas para uma gestão de alta performance.",
    cta: "Conhecer Gestão",
    image: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/eco-telemetry.png",
    alt: "Telemetria CBMaq",
    link: "/telemetria"
  }
];

// Triplicamos a lista para criar o efeito de loop infinito suave
const tripleCards = [...ecosystemCards, ...ecosystemCards, ...ecosystemCards];

export function EcosystemInteractive() {
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const cardCount = ecosystemCards.length;
  // Iniciamos o slider no primeiro item do segundo conjunto (o do meio)
  const [currentIndex, setCurrentIndex] = useState(cardCount);
  const [isAnimating, setIsAnimating] = useState(false);
  const targetIndexRef = useRef(currentIndex);
  const [isDragging, setIsDragging] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Detecção de mobile para ajuste de offset
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // No Sincro-Paginador, o activeIndex é sempre amarrado ao currentIndex
  const activeIndex = currentIndex;

  const slideToIndex = useCallback(async (newIndex: number) => {
    // Definimos o alvo imediatamente para resposta instantânea da UI
    targetIndexRef.current = newIndex;
    setCurrentIndex(newIndex);
    setIsAnimating(true);
    
    const baseWidth = isMobile ? 15 : 20;
    const offset = -(newIndex * baseWidth);

    try {
      // Iniciamos o movimento X
      await controls.start({
        x: `${offset}%`,
        transition: { 
          type: "spring", 
          stiffness: 160, 
          damping: 26,
          mass: 1 
        }
      });

      // Normalização Silenciosa (Teletransporte)
      let normalizedIndex = newIndex;
      if (newIndex >= cardCount * 2) {
        normalizedIndex = newIndex - cardCount;
      } else if (newIndex < cardCount) {
        normalizedIndex = newIndex + cardCount;
      }

      if (normalizedIndex !== newIndex) {
        // Teletransporte instantâneo: como as posições são matematicamente idênticas, 
        // o usuário não percebe a mudança.
        targetIndexRef.current = normalizedIndex;
        setCurrentIndex(normalizedIndex);
        const normOffset = -(normalizedIndex * baseWidth);
        controls.set({ x: `${normOffset}%` });
      }
    } catch (error) {
      // Falhas silenciosas se cancelado
    } finally {
      // Liberamos para a próxima animação (autoplay ou clique)
      setIsAnimating(false);
    }
  }, [controls, cardCount, isMobile]);

  const handleNext = useCallback(() => slideToIndex(currentIndex + 1), [currentIndex, slideToIndex]);
  const handlePrev = useCallback(() => slideToIndex(currentIndex - 1), [currentIndex, slideToIndex]);

  // Autoplay Logic
  useEffect(() => {
    if (isPlaying && !isAnimating && !isDragging && !isHovered) {
      intervalRef.current = setInterval(() => {
        handleNext();
      }, 5000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, isAnimating, isDragging, isHovered, handleNext]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  // Efeito para garantir a posição correta ao trocar entre mobile/desktop
  useEffect(() => {
    const baseWidth = isMobile ? 15 : 20;
    const offset = -(currentIndex * baseWidth);
    controls.set({ x: `${offset}%` });
  }, [isMobile, controls]); // Re-calcula apenas quando o viewport muda de categoria

  return (
    <div className="w-full h-full flex flex-col">
      {/* Setas no topo (Navegação Superior) */}
      <div className="flex justify-center lg:justify-end gap-3 mb-6 lg:mb-8 lg:pr-6 items-center">
        <button 
          onClick={handlePrev}
          className="w-12 h-12 rounded-full border border-[#053474]/20 flex items-center justify-center hover:bg-[#053474] hover:text-white transition-all group"
          aria-label="Anterior"
        >
          <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
        </button>

        {/* Play/Pause Button */}
        <button 
          onClick={togglePlay}
          className="w-12 h-12 rounded-full border border-[#053474]/20 flex items-center justify-center hover:bg-[#053474] hover:text-white transition-all group"
          aria-label={isPlaying ? "Pausar" : "Reproduzir"}
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 transition-transform group-hover:scale-110" strokeWidth={1.5} />
          ) : (
            <Play className="w-5 h-5 ml-0.5 transition-transform group-hover:scale-110" strokeWidth={1.5} />
          )}
        </button>

        <button 
          onClick={handleNext}
          className="w-12 h-12 rounded-full border border-[#053474]/20 flex items-center justify-center hover:bg-[#053474] hover:text-white transition-all group"
          aria-label="Próximo"
        >
          <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
        </button>
      </div>

      {/* Slider Section - Sincro-Paginador (Desktop & Mobile) */}
      <div 
        className="flex h-full min-h-[480px] lg:min-h-0 overflow-hidden relative" 
        ref={containerRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div 
          className="flex h-full w-full"
          drag="x"
          dragMomentum={false}
          dragConstraints={{ left: -20000, right: 20000 }}
          dragElastic={0.05}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={(e, info) => {
            setIsDragging(false);
            const moveThreshold = 40;
            const dragOffset = info.offset.x;

            if (Math.abs(dragOffset) > moveThreshold) {
              const shift = dragOffset > 0 ? -1 : 1;
              slideToIndex(currentIndex + shift);
            } else {
              // Se não passou do threshold, volta pra posição atual
              slideToIndex(currentIndex);
            }
          }}
          animate={controls}
          initial={{ x: isMobile ? `-${cardCount * 15}%` : `-${cardCount * 20}%` }}
          style={{ cursor: isDragging ? "grabbing" : "grab" }}
        >
          {tripleCards.map((card, index) => {
            const isActive = activeIndex === index;
            
            const handleCardClick = () => {
              if (isDragging) return;
              
              // Lógica de Caminho Mais Curto (Shortest Path)
              const originalIndex = index % cardCount;
              const targets = [originalIndex, originalIndex + cardCount, originalIndex + cardCount * 2];
              
              const nearestTarget = targets.reduce((prev, curr) => 
                Math.abs(curr - currentIndex) < Math.abs(prev - currentIndex) ? curr : prev
              );

              slideToIndex(nearestTarget);
            };

            return (
              <motion.div
                key={`${card.id}-${index}`}
                onClick={handleCardClick}
                className={cn(
                  "relative overflow-hidden h-full transition-all duration-700 shrink-0 px-1.5 lg:px-2 cursor-pointer",
                  isActive ? "rounded-[40px] lg:rounded-[80px]" : "rounded-[80px] lg:rounded-[160px]"
                )}
                initial={false}
                animate={{ 
                  // Matemática estável: 
                  // Desktop: 1 Ativo (40%) + 3 Inativos (20% cada) = 100%
                  // Mobile: 1 Ativo (85%) + 1 Inativo (15%) = 100%
                  width: isMobile 
                    ? (isActive ? "85%" : "15%") 
                    : (isActive ? "40%" : "20%"),
                }}
                transition={{ type: "spring", stiffness: 180, damping: 25 }}
              >
                <div className="relative w-full h-full overflow-hidden rounded-inherit">
                  {/* Imagem de Fundo */}
                  <div className="absolute inset-0">
                    <Image
                      src={card.image}
                      alt={card.alt}
                      fill
                      className="object-cover"
                      loading="lazy"
                      quality={90}
                      sizes="40vw"
                    />
                    <div 
                      className="absolute inset-0 transition-opacity duration-700" 
                      style={{
                        background: isActive 
                          ? "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 25%, rgba(0,0,0,0) 50%)"
                          : "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 40%)"
                      }}
                    />
                  </div>

                  {/* Texto Vertical (Inativo) */}
                  <AnimatePresence mode="popLayout">
                    {!isActive && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
                      >
                        <span 
                          className="text-white text-[0.7rem] lg:text-[0.875rem] font-bold tracking-[0.1em] uppercase whitespace-nowrap rotate-180"
                          style={{ 
                            writingMode: 'vertical-rl',
                            textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                          }}
                        >
                          {card.title}
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Conteúdo Ativo */}
                  <AnimatePresence mode="wait">
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.98, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.98, y: 20 }}
                        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                        className="absolute inset-0 z-30 p-6 lg:p-12 flex flex-col justify-end items-start"
                      >
                        <h3 className="font-sans text-[1.4rem] lg:text-[1.8rem] font-bold text-white mb-2 leading-[1.2] tracking-tight">
                          {card.title}
                        </h3>
                        <p className="text-white/90 text-[0.8125rem] lg:text-[0.875rem] leading-[1.5] mb-6 max-w-[260px] lg:max-w-[320px]">
                          {card.description}
                        </p>
                        
                        <Link href={card.link} className="flex items-center gap-2 bg-[#0A4EE4] hover:bg-[#083DB4] text-white text-[0.75rem] lg:text-[0.8125rem] font-medium px-6 lg:px-7 py-2.5 lg:py-3 rounded-full transition-all group">
                          {card.cta}
                          <svg width="16" height="16" viewBox="0 0 20 20" fill="none" className="transition-transform group-hover:translate-x-1">
                            <path d="M4 10h12m0 0l-5-5m5 5l-5 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>


    </div>
  );
}
