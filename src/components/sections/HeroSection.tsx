"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { cbmaqEasing } from "@/lib/motion";

const SLIDES = [
  {
    id: 1,
    title: (
      <>
        Gestão completa. Muito além da importação: uma operação ponta a ponta
      </>
    ),
    buttonText: "Falar com especialista",
    image: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/importacao-slideshow-copy.webp",
    alt: "Operação logística intermodal com navio, avião e caminhão",
    href: "#contact",
  },
  {
    id: 2,
    title: (
      <>
        Potência que transforma. Equipamentos de alta performance
      </>
    ),
    buttonText: "Nossas Soluções",
    image: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/fundo-jpg-copy.webp",
    alt: "Escavadeira e carregadeira de alta performance em canteiro de obras",
    href: "#solucoes",
  },
  {
    id: 3,
    title: (
      <>
        Seis décadas de solidez. Tradição e inovação para o seu negócio
      </>
    ),
    buttonText: "Conheça a História",
    image: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/banner-slide-show-copy.webp",
    alt: "Equipe CBMaq em frente à sede da empresa com equipamentos pesados",
    href: "/nossa-historia",
  },
];

const SLIDE_DURATION = 6000; // 6 seconds

export function HeroSection() {
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

    const interval = 100; // Update every 100ms
    const step = (interval / SLIDE_DURATION) * 100;

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
  }, [isPaused, nextSlide]);

  const handleBarClick = (index: number) => {
    setCurrentIndex(index);
    setProgress(0);
  };

  return (
    <section
      id="hero"
      className="relative w-full h-[600px] lg:h-[700px] flex items-center overflow-hidden bg-[#061E45]"
      aria-label="Seção principal"
      onPointerDown={() => setIsPaused(true)}
      onPointerUp={() => setIsPaused(false)}
      onPointerCancel={() => setIsPaused(false)}
    >
      {/* Draggable Slide Container */}
      <motion.div
        className="absolute inset-0 z-10 cursor-grab active:cursor-grabbing"
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
        {/* Background Slides */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute inset-0 z-0"
          >
            <Image
              src={SLIDES[currentIndex].image}
              alt={SLIDES[currentIndex].alt}
              fill
              unoptimized
              className="object-cover object-center pointer-events-none"
              priority
              quality={80}
              sizes="100vw"
            />
            {/* Custom Gradient Overlays */}
            <div
              className="absolute inset-0 bg-black/30 pointer-events-none"
              style={{
                background: "linear-gradient(90deg, rgba(6,30,69,0.9) 0%, rgba(10,42,94,0.7) 40%, rgba(26,95,180,0.2) 100%)",
              }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Decorative Pill Outlines */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-8 opacity-40 z-10 hidden md:flex pointer-events-none">
          <div className="w-10 h-40 border-2 border-[#3B82F6] rounded-full" />
          <div className="w-10 h-28 border-2 border-[#3B82F6] rounded-full" />
        </div>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-8 opacity-40 z-10 hidden md:flex pointer-events-none">
          <div className="w-10 h-28 border-2 border-[#3B82F6] rounded-full" />
          <div className="w-10 h-40 border-2 border-[#3B82F6] rounded-full" />
        </div>

        {/* Content */}
        <div className="section-container relative z-20 flex items-center justify-start w-full h-full">
          <div className="w-full max-w-4xl text-left pl-4 lg:pl-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.8, ease: cbmaqEasing }}
                className="pointer-events-none" // Allow drag to pass through text
              >
                <h1 className="font-sans text-[2.25rem] sm:text-[2.75rem] md:text-[3.25rem] lg:text-[4rem] leading-[1.1] font-bold mb-10 text-white tracking-tight">
                  {SLIDES[currentIndex].title}
                </h1>

                <a
                  href={SLIDES[currentIndex].href}
                  className="group inline-flex items-center gap-3 h-[3.75rem] px-10 rounded-full bg-[#0A4EE4] text-white font-bold text-[1rem] transition-all hover:bg-[#083DB4] shadow-xl hover:-translate-y-1 pointer-events-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  {SLIDES[currentIndex].buttonText}
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </a>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Progress Counters (3 segments bottom) */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-30 flex gap-4">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => handleBarClick(idx)}
            className="group relative w-24 md:w-40 h-1.5 bg-white/20 rounded-full overflow-hidden transition-all hover:bg-white/30"
            aria-label={`Ir para slide ${idx + 1}`}
          >
            {/* Progress fill */}
            <div
              className={`absolute top-0 left-0 h-full bg-[#3B82F6] transition-none rounded-full`}
              style={{
                width: idx === currentIndex ? `${progress}%` : idx < currentIndex ? "100%" : "0%",
                boxShadow: idx === currentIndex ? "0 0 10px #3B82F6, 0 0 20px #3B82F6" : "none",
              }}
            />
          </button>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          prevSlide();
        }}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all hidden md:flex items-center justify-center border border-white/10 backdrop-blur-sm group"
        aria-label="Slide anterior"
      >
        <ChevronLeft className="w-6 h-6 transition-transform group-hover:-translate-x-0.5" />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          nextSlide();
        }}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all hidden md:flex items-center justify-center border border-white/10 backdrop-blur-sm group"
        aria-label="Próximo slide"
      >
        <ChevronRight className="w-6 h-6 transition-transform group-hover:translate-x-0.5" />
      </button>


    </section>
  );
}

