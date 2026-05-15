"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const results = [
  {
    title: "Até 35% de Economia",
    desc: "Redução comprovada em custos operacionais.",
    img: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/consult-resultado-1.webp"
  },
  {
    title: "Payback Acelerado",
    desc: "Retorno do investimento em menor tempo.",
    img: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/consult-resultado-2.webp"
  },
  {
    title: "Risco Minimizado",
    desc: "Análise prévia reduz erros de investimento.",
    img: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/consult-resultado-3.webp"
  }
];

const areas = [
  "Construção Civil", "Mineração", "Agronegócio", "Infraestrutura",
  "Pavimentação", "Obras Públicas", "Indústria", "Terraplanagem"
];

export function ConsultoriaResultados() {
  return (
    <section className="bg-[#f8f8f8] section-padding">
      <div className="section-container">
        {/* Main box container as seen in Photo 2 */}
        <div className="bg-white rounded-[40px] p-8 md:p-16 lg:p-24 border border-[#E6EDF8] shadow-sm">
          
          {/* Section: Resultados Comprovados */}
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[2.25rem] md:text-[3.5rem] font-bold text-[#053474] tracking-tight"
            >
              Resultados comprovados
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
            {results.map((res, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative h-[380px] rounded-[32px] overflow-hidden group shadow-md"
              >
                <Image 
                  src={res.img}
                  alt={res.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Dark Gradient for Text Legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                
                <div className="absolute inset-x-0 bottom-0 p-8">
                  <h3 className="text-white text-[1.5rem] font-bold mb-3 leading-tight">
                    {res.title}
                  </h3>
                  <p className="text-white/80 text-[1.125rem] leading-snug font-medium">
                    {res.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Section: Áreas de atuação */}
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[2rem] md:text-[3.25rem] font-bold text-[#053474] tracking-tight"
            >
              Áreas de atuação
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {areas.map((area, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="flex items-center justify-center h-[64px] rounded-xl border-2 border-[#053474] text-[#053474] font-bold text-[1rem] md:text-[1.125rem] hover:bg-[#053474] hover:text-white transition-all duration-300 cursor-default"
              >
                {area}
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
