"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const categories = [
  {
    icon: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/weichai-motors-linha-01.png",
    title: "Construção",
    description: "Carregadeiras, escavadeiras, guindastes e rolos.",
    potencia: "36.8 kW a 566 kW",
    cilindrada: "2.3L a 17L"
  },
  {
    icon: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/weichai-motors-linha-02.png",
    title: "Agrícola",
    description: "Tratores, colheitadeiras e implementos.",
    potencia: "25 kW a 400 kW",
    cilindrada: "2.0L a 13L"
  },
  {
    icon: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/weichai-motors-linha-03.png",
    title: "Caminhões",
    description: "Veículos comerciais pesados e semipesados.",
    potencia: "100 kW a 480 kW",
    cilindrada: "4.0L a 15L"
  },
  {
    icon: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/weichai-motors-linha-04.png",
    title: "Marítimo",
    description: "Embarcações comerciais e de lazer.",
    potencia: "150 kW a 1000 kW",
    cilindrada: "6.0L a 27L"
  },
  {
    icon: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/weichai-motors-linha-05.png",
    title: "Industrial",
    description: "Geradores, compressores e bombas.",
    potencia: "20 kW a 800 kW",
    cilindrada: "2.0L a 20L"
  }
];

export function WeichaiCategorias() {
  return (
    <section className="bg-white section-padding">
      <div className="section-container">
        <motion.h3 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[1.75rem] md:text-[2.25rem] font-bold text-[#053474] text-center mb-16"
        >
          Linhas de motores por aplicação
        </motion.h3>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
          {categories.map((cat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#F3F3F3] p-3 md:p-4 rounded-2xl flex flex-col items-center text-center shadow-[-5px_6px_14.8px_rgba(0,0,0,0.12)] transition-all hover:-translate-y-2"
            >
              <div className={`relative ${cat.title === "Caminhões" ? "w-14 md:w-16 h-14 md:h-16 mb-1" : "w-12 h-12 mb-4"}`}>
                <Image 
                  src={cat.icon}
                  alt={cat.title}
                  fill
                  className="object-contain"
                />
              </div>
              
              <h4 className="text-[1.25rem] md:text-[1.18rem] leading-tight font-semibold text-[#053474] mb-2">
                {cat.title}
              </h4>
              
              <p className="text-[1rem] md:text-[0.81rem] text-[#053474] leading-relaxed mb-5 h-auto md:h-[40px] flex items-center justify-center">
                {cat.description}
              </p>

              {/* Specs Box */}
              <div className="mt-auto w-full p-4 md:p-3 rounded-xl border border-[#053474]/10 bg-white/40 space-y-2 md:space-y-1 text-left">
                <p className="text-[0.875rem] md:text-[0.68rem] text-[#053474] leading-none">
                  <span className="font-bold">Potência:</span> {cat.potencia}
                </p>
                <p className="text-[0.875rem] md:text-[0.68rem] text-[#053474] leading-none">
                  <span className="font-bold">Cilindrada:</span> {cat.cilindrada}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
