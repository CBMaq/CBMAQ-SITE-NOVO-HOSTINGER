"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PARTNER_LOGOS = [
  "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/banco-do-brasil-logo-svg-1.png",
  "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/bradesco-1.png",
  "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/logo-sicoob-1.png",
  "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/apice-1.png",
  "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/logo-consorcio-magalu-1.png",
  "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/hs-consorcio-1.png",
];

const credentials = [
  {
    icon: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/credenciais-icon1.png",
    title: "Autorizado pelo Banco Central",
    desc: "Administradora regulamentada e fiscalizada pelo BACEN."
  },
  {
    icon: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/credenciais-icon2.png",
    title: "60+ Anos de Experiência",
    desc: "Tradição e confiança no mercado brasileiro."
  },
  {
    icon: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/credenciais-icon3.png",
    title: "Milhares de Contemplados",
    desc: "Clientes satisfeitos em todo o Brasil."
  },
  {
    icon: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/credenciais-icon4.png",
    title: "Atendimento Humanizado",
    desc: "Suporte dedicado em todas as etapas."
  }
];

export function CredenciaisSection() {
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (sliderRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          sliderRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
        }
      }
    }, 4000);

    return () => clearInterval(interval);
  }, []);
  return (
    <section className="bg-[linear-gradient(to_bottom,#F2F0E8_0%,#F8F7F2_100%)] section-padding border-y border-gray-100/30">
      <div className="section-container">
        <h2 className="text-center text-[2.5rem] font-bold text-[#0A2A5E] mb-12 tracking-tight">
          Parceiros CBMaq
        </h2>

        {/* Partner Logos Slider */}
        <div className="relative group mb-32">
          <div className="flex items-center gap-4">
            {/* Left Arrow */}
            <button 
              id="prev-partner"
              className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-white border border-gray-200 shadow-sm text-[#0A2A5E] hover:bg-[#0A2A5E] hover:text-white transition-all z-10"
              onClick={() => {
                const slider = document.getElementById("partner-track");
                if (slider) slider.scrollLeft -= 300;
              }}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div 
              ref={sliderRef}
              id="partner-track"
              className="flex-1 overflow-x-auto no-scrollbar scroll-smooth cursor-grab active:cursor-grabbing"
              style={{ scrollSnapType: 'x mandatory' }}
            >
              <div className="flex items-center gap-12 md:gap-20 py-4 px-4 min-w-max">
                {[...PARTNER_LOGOS, ...PARTNER_LOGOS].map((logo, index) => (
                  <motion.div
                    key={index}
                    style={{ scrollSnapAlign: 'center' }}
                    className="relative w-[140px] h-[40px] md:w-[180px] md:h-[50px] grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                  >
                    <Image
                      src={logo}
                      alt="Logo Parceiro"
                      fill
                      unoptimized
                      className="object-contain pointer-events-none"
                    />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right Arrow */}
            <button 
              id="next-partner"
              className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-white border border-gray-100 shadow-sm text-[#0A2A5E] hover:bg-[#0A2A5E] hover:text-white transition-all z-10"
              onClick={() => {
                const slider = document.getElementById("partner-track");
                if (slider) slider.scrollLeft += 300;
              }}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Auto-scroll behavior implemented via useEffect in component */}
        </div>
        <div className="flex flex-col lg:flex-row items-stretch justify-between lg:px-4">
          {credentials.map((item, idx) => (
            <div key={idx} className="flex-1 flex items-stretch">
              {/* Item Content */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex-1 flex flex-col items-start text-left pl-8 pr-12 mb-16 lg:mb-0 group"
              >
                <div className="relative w-12 h-12 mb-10 transition-transform duration-500 group-hover:scale-105">
                  <Image 
                    src={item.icon}
                    alt={item.title}
                    fill
                    className="object-contain" // Icons now fully blue/vibrant as in reference
                  />
                </div>
                
                <h4 className="text-[1.5rem] font-bold text-[#0A2A5E] mb-4 leading-tight tracking-tight">
                  {item.title}
                </h4>
                
                <p className="text-[0.9375rem] text-[#4D5C7E] leading-relaxed font-medium">
                  {item.desc}
                </p>
              </motion.div>

              {/* Official Divisor Asset — Visible ONLY between elements on large screens */}
              {idx < credentials.length - 1 && (
                <div className="hidden lg:flex items-center px-2">
                  <Image 
                    src="https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/credenciais-divisor.svg"
                    alt="divisor"
                    width={3}
                    height={200}
                    className="h-[180px] w-auto object-contain opacity-80"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
