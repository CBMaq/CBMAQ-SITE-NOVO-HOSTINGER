"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function ImportacaoSegmentos() {
  const cards = [
    {
      title: "Importação para Pessoa Física",
      text: "Quer trazer um produto do exterior? A gente resolve. Importamos para pessoa física com total transparência, cuidando da documentação, impostos e logística por você.",
      image: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/group-19-copy.webp",
    },
    {
      title: "Importação para Empresas",
      text: "Sua empresa merece os melhores produtos do mundo. Oferecemos soluções completas de importação para negócios de todos os tamanhos, com agilidade, custos competitivos e total conformidade fiscal.",
      image: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/group-62-copy.webp",
    },
  ];

  return (
    <section className="bg-white pt-16 pb-10 md:pt-24 md:pb-12">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative h-[400px] md:h-[500px] rounded-[32px] overflow-hidden shadow-xl"
            >
              {/* Background Image */}
              <Image
                src={card.image}
                alt={card.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              
              {/* Content */}
              <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end">
                <h3 className="text-[1.75rem] md:text-[2.125rem] font-bold text-white mb-4 tracking-tight">
                  {card.title}
                </h3>
                <p className="text-white/90 text-[0.9375rem] md:text-[1rem] leading-relaxed max-w-[460px]">
                  {card.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
