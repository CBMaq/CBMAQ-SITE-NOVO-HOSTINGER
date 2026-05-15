"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { cbmaqEasing } from "@/lib/motion";

const SLIDES = [
  {
    id: 1,
    type: "video",
    videoSrc: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/videomaquinas.mp4",
    title: (
      <>
        Máquinas e Tratores para<br className="hidden md:block" /> agricultura, construção,<br className="hidden md:block" /> mineração e<br className="hidden md:block" /> infraestrutura.
      </>
    ),
    description: "Distribuidor oficial das principais marcas internacionais. Há mais de 60 anos oferecendo as melhores soluções em máquinas pesadas.",
    buttonText: "Ver Catálogo",
    href: "/catalogo?t=tratores",
    duration: 12000,
  },
  {
    id: 2,
    type: "image",
    image: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/mahindra-copy.webp",
    title: "Forte ao seu Lado",
    description: "Excelência e durabilidade em cada componente, garantindo o máximo desempenho da sua operação.",
    buttonText: "Conheça os Modelos",
    href: "/catalogo?t=tratores",
    duration: 6000,
  },
  {
    id: 3,
    type: "image",
    image: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/usinas-copy.webp",
    title: "Usinas de Asfalto e Misturadoras de concreto",
    description: "A mais avançada tecnologia global em infraestrutura rodoviária e construção pesada.",
    buttonText: "Ver mais",
    href: "/catalogo?t=tratores",
    duration: 6000,
  }
];

export function EquipmentHero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
    setProgress(0);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
    setProgress(0);
  }, []);

  useEffect(() => {
    if (isPaused) return;

    const currentDuration = SLIDES[currentIndex].duration;
    const interval = 100;
    const step = (interval / currentDuration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextSlide();
          return 0;
        }
        return prev + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [isPaused, nextSlide, currentIndex]);

  const handleBarClick = (index: number) => {
    setCurrentIndex(index);
    setProgress(0);
  };

  return (
    <section 
      className="relative w-full h-[600px] md:h-[700px] lg:h-[780px] flex items-center overflow-hidden bg-[#053474]"
      onPointerDown={() => setIsPaused(true)}
      onPointerUp={() => setIsPaused(false)}
      onPointerCancel={() => setIsPaused(false)}
    >
      {/* Background Slides */}
      <motion.div
        className="absolute inset-0 z-0 cursor-grab active:cursor-grabbing"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragEnd={(_, info) => {
          const swipeThreshold = 50;
          if (info.offset.x < -swipeThreshold) {
            nextSlide();
          } else if (info.offset.x > swipeThreshold) {
            prevSlide();
          }
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            {SLIDES[currentIndex].type === "video" ? (
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              >
                <source src={SLIDES[currentIndex].videoSrc} type="video/mp4" />
              </video>
            ) : (
              <Image
                src={SLIDES[currentIndex].image!}
                alt={typeof SLIDES[currentIndex].title === 'string' ? (SLIDES[currentIndex].title as string) : "CBMaq Slide"}
                fill
                className="object-cover object-center pointer-events-none"
                priority
                quality={100}
              />
            )}
            
            {/* Intelligent Responsive Overlay */}
            <div 
              className="absolute inset-0 z-10 transition-all duration-500
                         bg-[linear-gradient(to_bottom,#053474_0%,rgba(5,52,116,0.4)_50%,rgba(5,52,116,0.1)_100%)] 
                         md:bg-[linear-gradient(90deg,#053474_0%,rgba(5,52,116,0.1)_70%)]"
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Content Container */}
      <div className="section-container relative z-20 w-full h-full flex flex-col justify-center items-start">
        <AnimatePresence mode="wait">
          <motion.div
             key={currentIndex}
             initial={{ opacity: 0, x: -30 }}
             animate={{ opacity: 1, x: 0 }}
             exit={{ opacity: 0, x: 30 }}
             transition={{ duration: 0.8, ease: cbmaqEasing }}
             className="max-w-[840px] mt-16 md:mt-0 text-left pointer-events-none"
          >
            <h1 className="text-[2rem] md:text-[3rem] lg:text-[3.5rem] leading-[1.15] font-semibold text-white mb-6 tracking-tight max-w-[800px]">
              {SLIDES[currentIndex].title}
            </h1>

            <p className="text-[1.125rem] md:text-[1.25rem] font-light text-white/90 leading-relaxed max-w-[520px] mb-12">
              {SLIDES[currentIndex].description}
            </p>

            <Link
              href={SLIDES[currentIndex].href}
              className="group inline-flex h-[3.75rem] px-10 rounded-full bg-[#0A4EE4] text-white items-center justify-center gap-3 font-bold text-[1rem] transition-all hover:bg-[#083DB4] shadow-xl hover:-translate-y-1 pointer-events-auto"
            >
              {SLIDES[currentIndex].buttonText}
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          prevSlide();
        }}
        className="absolute left-4 md:left-8 z-40 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all hidden md:flex items-center justify-center border border-white/10 backdrop-blur-sm group"
        aria-label="Slide anterior"
      >
        <ChevronLeft className="w-6 h-6 transition-transform group-hover:-translate-x-0.5" />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          nextSlide();
        }}
        className="absolute right-4 md:right-8 z-40 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all hidden md:flex items-center justify-center border border-white/10 backdrop-blur-sm group"
        aria-label="Próximo slide"
      >
        <ChevronRight className="w-6 h-6 transition-transform group-hover:translate-x-0.5" />
      </button>

      {/* Progress Counters */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => handleBarClick(idx)}
            className="group relative w-16 md:w-32 h-1 bg-white/20 rounded-full overflow-hidden transition-all hover:bg-white/30"
            aria-label={`Ir para slide ${idx + 1}`}
          >
            <div
              className="absolute top-0 left-0 h-full bg-[#3B82F6] transition-none rounded-full"
              style={{
                width: idx === currentIndex ? `${progress}%` : idx < currentIndex ? "100%" : "0%",
                boxShadow: idx === currentIndex ? "0 0 10px #3B82F6, 0 0 20px #3B82F6" : "none",
              }}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
