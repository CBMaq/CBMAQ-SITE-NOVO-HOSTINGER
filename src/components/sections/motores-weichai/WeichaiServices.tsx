"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

const services = [
  "Venda de motores novos",
  "Retrofit e repotenciamento",
  "Manutenção preventiva e corretiva",
  "Peças originais Weichai",
  "Suporte técnico especializado",
  "Treinamento de operadores",
  "Diagnóstico computadorizado",
  "Garantia estendida"
];

export function WeichaiServices() {
  return (
    <section className="section-padding bg-white overflow-hidden">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          {/* Content Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col max-w-xl"
          >
            <h2 className="text-[2.25rem] md:text-[2.75rem] font-bold text-[#053474] leading-[1.1] mb-12">
              Nossos Serviços
            </h2>
            
            <div className="relative pl-10">
              {/* Vertical Gradient Line - 5px thick, inverted gradient */}
              <div className="absolute left-0 top-2 bottom-2 w-[5px] bg-gradient-to-t from-[#053474] to-transparent opacity-90 rounded-full" />

              <ul className="space-y-6">
                {services.map((service, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-4 text-[1.1rem] md:text-[1.25rem] text-[#053474] font-medium group cursor-default"
                  >
                    <Play 
                      className="w-3 h-3 text-[#053474] fill-[#053474] transition-transform duration-300 group-hover:translate-x-1" 
                    />
                    {service}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Image Right */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[400px] md:h-[600px] rounded-[3rem] md:rounded-[4rem] overflow-hidden"
          >
            <Image
              src="https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/weichai-motors-nossos-servicos.webp"
              alt="Serviços Weichai"
              fill
              className="object-cover"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
