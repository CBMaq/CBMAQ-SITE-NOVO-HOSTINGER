"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const specialties = [
  {
    title: "Máquinas de Construção",
    description: "Escavadeiras, pás carregadeiras, retroescavadeiras e equipamentos de terraplenagem.",
    image: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/nossas-especialidades1.webp",
  },
  {
    title: "Sistemas Eletrônicos",
    description: "Diagnóstico e reparo de sistemas eletrônicos, sensores e controladores.",
    image: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/nossas-especialidades3.webp",
  },
  {
    title: "Sistemas Hidráulicos",
    description: "Manutenção e reparo de bombas, válvulas, cilindros e circuitos hidráulicos.",
    image: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/nossas-especialidades2.webp",
  },
  {
    title: "Motores Diesel",
    description: "Recondicionamento, reparo e manutenção de motores diesel de alta performance.",
    image: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/nossas-especialidades4.webp",
  },
];

export function SpecialtiesSection() {
  return (
    <section className="bg-white section-padding px-4 md:px-8">
      <div 
        className="max-w-[1400px] mx-auto rounded-[48px] py-16 px-6 md:px-12"
        style={{ background: 'linear-gradient(to bottom, #f3f2ee 0%, #ffffff 100%)' }}
      >
        <div className="text-center mb-16">
          <h2 className="text-[2.25rem] md:text-[2.75rem] font-bold text-[#0a2a5e]">
            Nossas especialidades
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {specialties.map((s, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative h-[380px] rounded-[24px] overflow-hidden group shadow-lg"
            >
              <Image 
                src={s.image}
                alt={s.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Overlay Gradient at the bottom as per reference */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              <div className="absolute inset-x-0 bottom-0 p-8">
                <h3 className="text-white text-[1.25rem] font-bold leading-tight mb-2">
                  {s.title}
                </h3>
                <p className="text-white/80 text-[0.8125rem] leading-snug">
                  {s.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
