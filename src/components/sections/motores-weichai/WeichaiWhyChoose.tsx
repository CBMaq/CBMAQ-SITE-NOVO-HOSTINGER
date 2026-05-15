"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const reasons = [
  {
    icon: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/wheichai-motors-why-choose-1.png",
    title: "Recorde Mundial",
    description: "53.09% de eficiência térmica - maior do mundo em motores diesel comerciais."
  },
  {
    icon: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/wheichai-motors-why-choose-2.png",
    title: "Economia de Combustível",
    description: "Tecnologia que reduz significativamente o consumo operacional."
  },
  {
    icon: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/wheichai-motors-why-choose-3.png",
    title: "Alta Potência",
    description: "Performance superior para aplicações pesadas e exigentes."
  },
  {
    icon: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/wheichai-motors-why-choose-4.png",
    title: "Presença Global",
    description: "Fundada em 1946, presente em mais de 150 países."
  }
];

export function WeichaiWhyChoose() {
  return (
    <section className="section-padding bg-white">
      <div className="section-container">
        <motion.h3 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[1.75rem] md:text-[2.25rem] font-bold text-[#053474] text-center mb-16"
        >
          Por que escolher Weichai
        </motion.h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              {/* Icon Container - No background/border as per reference */}
              <div className="w-16 h-16 flex items-center justify-center mb-6">
                <div className="relative w-12 h-12">
                  <Image 
                    src={reason.icon}
                    alt={reason.title}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Title - Reduced to fit in one line */}
              <h4 className="text-[18px] md:text-[20px] leading-tight font-semibold text-[#053474] mb-3 whitespace-nowrap">
                {reason.title}
              </h4>

              {/* Divisor SVG */}
              <div className="relative w-full h-[1px] mb-4">
                <Image 
                  src="https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/weichai-motors-why-divisor.svg"
                  alt="divisor"
                  fill
                  className="object-contain"
                />
              </div>

              {/* Description - Slightly reduced for balance */}
              <p className="text-[15px] md:text-[16px] leading-relaxed font-normal text-[#053474]">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
