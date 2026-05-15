"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const motivos = [
  {
    icon: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/vendasaogoverno-02.png",
    title: "Atas de Registro de Preço",
    desc: "Equipamentos já registrados em atas válidas para adesão imediata por órgãos públicos.",
  },
  {
    icon: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/vendasaogoverno-03.png",
    title: "Marcas Homologadas",
    desc: "Produtos LOVOL, AMMANN e WEICHAI que atendem todas as exigências de editais.",
  },
  {
    icon: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/vendasaogoverno-04.png",
    title: "Garantia Estendida",
    desc: "Até 6 anos de garantia com assistência técnica especializada em todo o território.",
  },
  {
    icon: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/vendasaogoverno-05.png",
    title: "Empresa Registrada",
    desc: "SICAF ativo, certificados atualizados e documentação completa para contratação.",
  },
];

export function PorqueContratarSection() {
  return (
    <section className="bg-[#F4F3ED] pt-8 lg:pt-12 pb-16 lg:pb-24">
      <div className="section-container max-w-[1100px] mx-auto px-4 md:px-8">
        
        {/* Container Principal */}
        <div className="bg-white rounded-[32px] shadow-[0_4px_24px_rgba(0,0,0,0.04)] p-12 md:p-16 w-full">
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[2rem] md:text-[2.75rem] font-bold text-[#0A2A5E] text-center mb-16 leading-tight tracking-tight"
          >
            Por que contratar a CBMaq
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {motivos.map((motivo, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex flex-col items-center text-center p-8 rounded-[20px] border border-[#053474]/20 bg-white transition-all hover:shadow-md hover:border-[#053474]/40"
              >
                <div className="w-16 h-16 relative mb-6">
                  <Image 
                    src={motivo.icon} 
                    alt={motivo.title} 
                    fill 
                    className="object-contain" 
                  />
                </div>
                
                <h3 className="text-[1.125rem] font-bold text-[#0A2A5E] mb-3 leading-tight min-h-[44px] flex items-center justify-center">
                  {motivo.title}
                </h3>
                
                <p className="text-[0.8125rem] md:text-[0.875rem] font-regular text-[#4D5C7E] leading-relaxed">
                  {motivo.desc}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
