"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function ConsultoriaMetrics() {
  const metrics = [
    { value: "500+", label: "Projetos\nConsultados" },
    { value: "98%", label: "Clientes\nSatisfeitos" },
    { value: "25+", label: "Anos de\nExpertise" },
    { value: "R$ 2Bi+", label: "Em\nInvestimentos" },
  ];

  return (
    <section className="relative bg-white section-padding overflow-hidden">
      <div className="section-container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 lg:gap-y-0 relative">
          {metrics.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex flex-col items-center text-center relative"
            >
              <div className="flex flex-col items-center">
                <span className="text-[2.25rem] md:text-[3.25rem] font-bold text-[#053474] leading-none mb-3">
                  {item.value}
                </span>
                <span className="text-[0.875rem] md:text-[1.125rem] font-semibold text-[#4D5C7E] whitespace-pre-line">
                  {item.label}
                </span>
              </div>
              
              {/* Vertical Divider — Desktop only — Using the refined asset with correct scale */}
              {idx < metrics.length - 1 && (
                <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-[100px]">
                  <Image 
                    src="https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/consult-number-divisor.svg"
                    alt=""
                    width={1}
                    height={100}
                    className="w-full h-full object-contain opacity-40"
                  />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
