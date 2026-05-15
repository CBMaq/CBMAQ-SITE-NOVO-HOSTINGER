"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const services = [
  {
    title: "Manutenção Preventiva",
    description: "Programas de manutenção planejada para evitar paradas não programadas e maximizar a vida útil dos equipamentos.",
    image: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/servico-tecnico1.webp",
  },
  {
    title: "Manutenção Corretiva",
    description: "Atendimento rápido para resolver problemas e minimizar o tempo de parada, com diagnóstico preciso e solução definitiva.",
    image: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/servico-tecnico2.webp",
  },
  {
    title: "Recondicionamento de Motores",
    description: "Recondicionamento total de motores, transmissões e sistemas hidráulicos com peças genuínas e mão de obra especializada.",
    image: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/servico-tecnico3.webp",
  },
  {
    title: "Atendimento em Campo",
    description: "Equipe de especialistas com unidades móveis totalmente equipadas para atender sua máquina onde ela estiver.",
    image: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/servico-tecnico4.webp",
  },
];

export function ServicesSection() {
  return (
    <section className="bg-white section-padding">
      <div className="section-container text-center mb-16">
        <h2 className="text-[2.25rem] md:text-[2.75rem] font-bold text-[#0a2a5e]">
          Serviços técnicos
        </h2>
      </div>

      <div className="section-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((s, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
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
            {/* Overlay Gradient as seen in specialties reference */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            <div className="absolute inset-x-0 bottom-0 p-8">
              <h3 className="text-white text-[1.25rem] font-bold leading-tight mb-3">
                {s.title}
              </h3>
              
              <div className="mb-4">
                <Image 
                  src="https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/at-divblue.svg"
                  alt="divisor"
                  width={240}
                  height={2}
                  className="w-full max-w-[200px] h-auto"
                />
              </div>

              <p className="text-white/80 text-[0.8125rem] leading-snug">
                {s.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
