"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function ConsorcioDigital() {
  const features = [
    "Acompanhamento em tempo real",
    "Oferta de lances pelo aplicativo",
    "Extrato e boletos na palma da mão",
    "Notificações de contemplação"
  ];

  return (
    <section className="relative z-20 bg-[#F8F8F8] flex items-end">
      <div className="section-container">
        <div className="flex flex-col lg:flex-row items-center lg:items-end gap-16 md:gap-32">
          
          {/* Left Side — Phone Mockup with Overlap Elevation */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative w-full max-w-[420px] mx-auto lg:mx-0 -mt-32 lg:-mt-64 z-30 mb-0"
          >
            <div className="relative w-full aspect-[4/5] lg:aspect-auto lg:h-[720px]">
              <Image 
                src="https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/cons-phone.webp"
                alt="Consórcio Digital CBMaq"
                fill
                className="object-contain object-bottom"
              />
              
              {/* Floating Badge */}
              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[calc(25%+30px)] -right-4 lg:-right-8 bg-white p-4 rounded-2xl shadow-2xl hidden md:flex items-center gap-4 border border-blue-50"
              >
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="text-green-600 w-6 h-6" />
                </div>
                <div>
                  <p className="text-[0.75rem] font-bold text-[#0A2A5E] uppercase opacity-50">App CBMaq</p>
                  <p className="text-[0.875rem] font-bold text-[#0A2A5E]">Plano realizado!</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Side — Text Content */}
          <div className="flex-1 text-center lg:text-left pt-12 lg:pt-0 self-center">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-[2.25rem] md:text-[51.18px] font-bold text-[#053474] leading-tight md:leading-[68.6px] mb-10 tracking-tight">
                Consórcio Digital, <br className="hidden lg:block" /> de verdade!
              </h2>
              <p className="text-[1.125rem] md:text-[32.61px] text-[#053474] leading-relaxed md:leading-[43.7px] max-w-[700px] mx-auto lg:mx-0 font-medium opacity-100">
                Seu consórcio na palma da mão. <br className="hidden lg:block" /> Faça ofertas de lances e confira o resultado das assembleias.
              </p>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
