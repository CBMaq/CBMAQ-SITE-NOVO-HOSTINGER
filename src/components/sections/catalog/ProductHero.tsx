"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Phone, ChevronLeft, ChevronRight } from "lucide-react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";

interface ProductHeroProps {
  product: any;
}

export function ProductHero({ product }: ProductHeroProps) {
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [thumbnailOffset, setThumbnailOffset] = useState(0);
  const [zoomStyles, setZoomStyles] = useState({ opacity: 0, backgroundPosition: "0% 0%" });
  const [isMobileZoomed, setIsMobileZoomed] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const containerRef = useRef<HTMLDivElement>(null);
  const thumbsContainerRef = useRef<HTMLDivElement>(null);

  const allImages = [
    product.mainImage,
    ...(product.galleryImages || [])
  ].filter(Boolean);

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (!thumbsContainerRef.current) return;
      const width = thumbsContainerRef.current.clientWidth;
      const count = Math.floor(width / 96);
      setItemsPerPage(Math.max(1, count));
    };
    
    const timer = setTimeout(updateItemsPerPage, 100);
    window.addEventListener('resize', updateItemsPerPage);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateItemsPerPage);
    };
  }, [allImages.length]);

  const canPrevThumb = thumbnailOffset > 0;
  const canNextThumb = thumbnailOffset + itemsPerPage < allImages.length;

  const prevThumbs = () => {
    setThumbnailOffset((prev) => Math.max(0, prev - 1));
  };
  const nextThumbs = () => {
    setThumbnailOffset((prev) => Math.min(allImages.length - itemsPerPage, prev + 1));
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - (top + window.scrollY)) / height) * 100;
    
    setZoomStyles({
      opacity: 1,
      backgroundPosition: `${x}% ${y}%`
    });
  };

  const handleMouseLeave = () => {
    setZoomStyles({ opacity: 0, backgroundPosition: "0% 0%" });
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const touch = e.touches[0];
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = ((touch.pageX - left) / width) * 100;
    const y = ((touch.pageY - (top + window.scrollY)) / height) * 100;
    
    setZoomStyles({
      opacity: 1,
      backgroundPosition: `${x}% ${y}%`
    });
  };

  const handleMobileToggle = () => {
    setIsMobileZoomed(!isMobileZoomed);
    if (isMobileZoomed) {
      setZoomStyles({ opacity: 0, backgroundPosition: "0% 0%" });
    }
  };

  const nextImage = () => {
    setActiveImageIdx((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setActiveImageIdx((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  const getIconUrl = (name: string) => {
    return supabase.storage.from("service_images").getPublicUrl(name).data.publicUrl;
  };

  const specCards = [
    {
      label: "Peso",
      value: product.weight || "N/A",
      icon: getIconUrl("product-icon-peso.png"),
    },
    {
      label: "Potência",
      value: product.power || "N/A",
      icon: getIconUrl("product-icon-potencia.png"),
    },
    {
      label: "Caçamba",
      value: product.bucketCapacity || "N/A",
      icon: getIconUrl("product-icon-cacamba.png"),
    },
  ];

  const scrollToForm = () => {
    document.getElementById("proposta")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="pt-12 md:pt-32 pb-16 bg-white overflow-hidden">
      <div className="section-container">
        <Link
          href={product.productType === "engine" ? "/catalogo?t=motores" : "/catalogo?t=tratores"}
          className="flex items-center gap-2 text-[#0A2A5E]/40 hover:text-[#0A4EE4] transition-colors mb-12 font-medium text-sm group w-fit"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Voltar ao Catálogo
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          <div className="flex flex-col gap-6">
            <div className="relative group">
              <div
                ref={containerRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onTouchMove={handleTouchMove}
                onClick={() => {
                  if (window.innerWidth < 1024) {
                    handleMobileToggle();
                  }
                }}
                className="relative aspect-square md:aspect-[4/5] lg:aspect-square rounded-[2rem] bg-white overflow-hidden border border-[#E0E4EB] flex items-center justify-center shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)] cursor-crosshair touch-none"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeImageIdx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={allImages[activeImageIdx]}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Magnifier Overlay */}
                <div 
                  className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-20"
                  style={{ 
                    opacity: isMobileZoomed ? 1 : zoomStyles.opacity,
                    backgroundImage: `url(${allImages[activeImageIdx]})`,
                    backgroundPosition: zoomStyles.backgroundPosition,
                    backgroundSize: "250%",
                    backgroundRepeat: "no-repeat",
                    backgroundColor: "white"
                  }}
                />

                {allImages.length > 1 && (
                  <>
                    <button 
                      onClick={(e) => { e.stopPropagation(); prevImage(); }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-lg border border-[#E0E4EB] flex items-center justify-center text-[#0A2A5E] opacity-0 group-hover:opacity-100 transition-opacity z-30 hover:bg-[#0A2A5E] hover:text-white"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); nextImage(); }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-lg border border-[#E0E4EB] flex items-center justify-center text-[#0A2A5E] opacity-0 group-hover:opacity-100 transition-opacity z-30 hover:bg-[#0A2A5E] hover:text-white"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                  </>
                )}
              </div>
            </div>

            {allImages.length > 1 && (
              <div className="relative flex items-center gap-2 w-full">
                <button 
                  onClick={prevThumbs}
                  disabled={!canPrevThumb}
                  className={`flex-shrink-0 w-10 h-10 rounded-full border flex items-center justify-center transition-all z-20 ${!canPrevThumb ? 'opacity-40 border-[#E0E4EB] text-[#0A2A5E]/30 bg-white cursor-not-allowed' : 'border-[#0A2A5E] text-[#0A2A5E] bg-white shadow-sm hover:bg-[#0A2A5E] hover:text-white'}`}
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                <div className="flex-1 relative group/thumbs overflow-hidden">
                  {/* Dynamic Fades */}
                  <div 
                    className={`absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none transition-opacity duration-300 ${thumbnailOffset > 0 ? 'opacity-100' : 'opacity-0'}`} 
                  />
                  <div 
                    className={`absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none transition-opacity duration-300 ${thumbnailOffset + 4 < allImages.length ? 'opacity-100' : 'opacity-0'}`} 
                  />

                  <div 
                    ref={thumbsContainerRef}
                    className="touch-pan-x overflow-hidden"
                  >
                    <motion.div 
                      className="flex gap-4 cursor-grab active:cursor-grabbing py-2 px-1 pr-12 w-max"
                      drag="x"
                      dragConstraints={thumbsContainerRef}
                      dragElastic={0.1}
                      animate={{ x: -(thumbnailOffset * 96) }} 
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                      {allImages.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveImageIdx(idx)}
                          className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${activeImageIdx === idx ? 'border-[#0A2A5E] shadow-md' : 'border-[#E0E4EB] opacity-60 hover:opacity-100'}`}
                        >
                          <Image
                            src={img}
                            alt={`Thumbnail ${idx}`}
                            fill
                            className="object-cover pointer-events-none"
                          />
                        </button>
                      ))}
                    </motion.div>
                  </div>
                </div>

                <button 
                  onClick={nextThumbs}
                  disabled={!canNextThumb}
                  className={`flex-shrink-0 w-10 h-10 rounded-full border flex items-center justify-center transition-all z-20 ${!canNextThumb ? 'opacity-40 border-[#E0E4EB] text-[#0A2A5E]/30 bg-white cursor-not-allowed' : 'border-[#0A2A5E] text-[#0A2A5E] bg-white shadow-sm hover:bg-[#0A2A5E] hover:text-white'}`}
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <div className="mb-4">
              <span className="px-3 py-1.5 rounded-full bg-[#E9F0FF] text-[#0A2A5E]/80 text-xs font-bold">
                {product.category?.name || "Equipamento"}
              </span>
            </div>

            <div className="mb-6">
              <h1 className="text-3xl md:text-6xl font-extrabold text-[#0A2A5E] mb-2 tracking-tight">
                {product.name}
              </h1>
              <p className="text-xl md:text-2xl font-bold text-[#0A2A5E]">
                <span className="uppercase">{product.brand?.name || "Lovol"}</span>
              </p>
            </div>

            <p className="text-base text-[#495057] leading-relaxed mb-10 max-w-xl">
              {product.shortDescription || "Alta performance e tecnologia de ponta para sua operação industrial e infraestrutura."}
            </p>

            <div className="grid grid-cols-3 gap-4 mb-12">
              {specCards.map((card, idx) => (
                <div 
                  key={idx} 
                  className="bg-[#F8F9FA] rounded-2xl p-5 flex flex-col items-center text-center transition-all border border-[#E0E4EB]"
                >
                  <div className="h-10 w-10 mb-3 flex items-center justify-center">
                    <img 
                      src={card.icon} 
                      alt={card.label}
                      className="w-full h-full object-contain opacity-80"
                    />
                  </div>
                  <span className="text-[11px] font-medium text-[#6C757D] mb-1">{card.label}</span>
                  <span className="text-xs md:text-sm font-bold text-[#0A2A5E]">{card.value}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={scrollToForm}
                className="w-full sm:flex-[2] h-16 md:h-14 rounded-[8px] bg-[#0A2A5E] text-white font-normal text-[13.1px] leading-[20px] tracking-normal hover:bg-[#051C42] transition-all flex items-center justify-center shadow-lg shadow-[#0A2A5E]/10"
              >
                Solicitar Proposta
              </button>
              
              <Link
                href="/#atendimento"
                className="w-full sm:flex-[1.5] h-16 md:h-14 rounded-[8px] bg-transparent border-2 border-[#0A2A5E] text-[#0A2A5E] font-normal text-[13.1px] leading-[20px] tracking-normal hover:bg-[#0A2A5E]/5 transition-all flex items-center justify-center gap-3"
              >
                <Phone className="h-4 w-4" />
                Falar com Especialista
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
