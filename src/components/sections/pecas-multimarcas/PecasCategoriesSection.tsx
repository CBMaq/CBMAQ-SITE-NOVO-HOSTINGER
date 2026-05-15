"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const categories = [
  {
    icon: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/pecas-categoria-icon1.png",
    title: "Motor e Componentes",
    description: "Pistões, eixos, juntas, válvulas, Bombas de óleo, Injetores, Peças Weichai.",
  },
  {
    icon: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/pecas-categoria-icon2.png",
    title: "Transmissão Mecânica e Hidráulica",
    description: "Bombas hidráulicas, Válvulas de controle, Cilindros, Mangueiras, Conversores, Embreagens.",
  },
  {
    icon: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/pecas-categoria-icon3.png",
    title: "Sistema Rodante",
    description: "Esteiras, Sapatas, Rolos, Rodas guia, Eixos, Pinos e buchas, Dentes de caçamba.",
  },
];

export function PecasCategoriesSection() {
  return (
    <section className="bg-[#f8f9fa] section-padding">
      <div className="section-container text-center mb-16">
        <h2 className="text-[2rem] md:text-[2.75rem] font-bold text-[#053474]">
          Categorias de peças
        </h2>
      </div>

      <div className="section-container max-w-[1200px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {categories.map((cat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white px-8 py-10 md:py-12 rounded-[20px] md:rounded-[24px] border-[1.5px] border-[#053474] flex flex-col items-center text-center transition-all hover:shadow-lg group"
            >
              <div className="mb-6 w-[100px] h-[100px] md:w-[120px] md:h-[120px] relative">
                <Image 
                  src={cat.icon} 
                  alt="" 
                  fill 
                  className="object-contain transition-transform duration-500 group-hover:scale-105" 
                />
              </div>
              <h3 className="text-[1.25rem] md:text-[1.375rem] font-bold text-[#053474] mb-3 leading-tight">
                {cat.title}
              </h3>
              <p className="text-[#053474] text-[19.19px] leading-[25.7px] font-normal">
                {cat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
