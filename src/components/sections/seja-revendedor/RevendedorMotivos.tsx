"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Cpu, Handshake, ShieldCheck, TrendingUp, DollarSign } from "lucide-react";

const motivos = [
  {
    icon: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/sejarevendedorcbmaq-02.png",
    title: "Liderança no Mercado",
    desc: <>Representamos grandes marcas do setor de <strong>maquinário pesado</strong>, como <strong>Mahindra, Lovol, Muller e Weichai.</strong></>,
  },
  {
    icon: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/sejarevendedorcbmaq-03.png",
    title: "Apoio e Treinamento",
    desc: "Oferecemos treinamento contínuo e suporte técnico especializado para garantir o sucesso das suas vendas e satisfação dos seus clientes.",
  },
  {
    icon: "tech",
    title: "Tecnologia Avançada:",
    desc: "Produtos de última geração em máquinas agrícolas, empilhadeiras, tratores, e muito mais.",
  },
  {
    icon: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/sejarevendedorcbmaq-04.png",
    title: "Condições Comerciais Exclusivas:",
    desc: "Condições especiais para revendedores, com descontos exclusivos, promoções sazonais e financiamentos facilitado.",
  },
];

export function RevendedorMotivos() {
  return (
    <section className="bg-[#F8F9FA] section-padding">
      <div className="section-container">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-[32px] p-10 lg:p-16 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
        >
          <h2 className="text-[2rem] md:text-[2.5rem] font-bold text-[#0A2A5E] text-center mb-16 leading-tight">
            Por que se tornar um<br /> Revendedor CBMaq?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {motivos.map((motivo, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex flex-col items-center text-center p-8 rounded-[24px] border border-[#053474] bg-white transition-all hover:shadow-lg hover:border-[#053474]/80 min-h-[340px] justify-start"
              >
                <div className="w-16 h-16 relative mb-8 flex items-center justify-center">
                  {motivo.icon === "tech" ? (
                    <Cpu className="w-12 h-12 text-[#053474]" strokeWidth={1.5} />
                  ) : (
                    <Image 
                      src={motivo.icon as string} 
                      alt={typeof motivo.title === 'string' ? motivo.title : 'Icon'} 
                      fill 
                      className="object-contain" 
                    />
                  )}
                </div>
                <h3 className="text-[1.25rem] font-bold text-[#0A2A5E] mb-4 leading-[1.2]">
                  {motivo.title}
                </h3>
                <p className="text-[0.875rem] font-medium text-[#4D5C7E] leading-[1.6]">
                  {motivo.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
