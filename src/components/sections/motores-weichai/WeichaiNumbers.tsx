"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const stats = [
  {
    icon: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/whichai-motors-number-icon1.png",
    value: "+100.000",
    label: "Colaboradores"
  },
  {
    icon: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/whichai-motors-number-icon2.png",
    value: "+10",
    label: "Empresas Do Grupo"
  },
  {
    icon: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/whichai-motors-number-icon3.png",
    value: "+14",
    label: "Prêmios Internacionais"
  },
  {
    icon: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/whichai-motors-number-icon4.png",
    value: "+150",
    label: "Países Atendidos"
  }
];

export function WeichaiNumbers() {
  return (
    <section className="bg-white section-padding">
      <div className="section-container">
        <motion.h3 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[2rem] md:text-[2.25rem] font-bold text-[#053474] text-center mb-16"
        >
          Weichai em números
        </motion.h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center text-center relative"
            >
              <div className="mb-4 relative w-12 h-12">
                <Image 
                  src={stat.icon} 
                  alt={stat.label}
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-[2.5rem] md:text-[3.593rem] leading-none font-extrabold text-[#053474] tracking-[-0.06em] mb-2">
                {stat.value}
              </span>
              <span className="text-[1.125rem] md:text-[1.46rem] leading-snug font-normal text-[#053474] whitespace-pre-line">
                {stat.label}
              </span>

              {/* Divider - Hidden on mobile, visible from lg up, not on last item */}
              {index < stats.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 -right-6 md:-right-8 w-[1px] h-20 opacity-30">
                  <Image 
                    src="https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/weichai-motors-divisor-num.svg"
                    alt="divisor"
                    fill
                    className="object-contain"
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
