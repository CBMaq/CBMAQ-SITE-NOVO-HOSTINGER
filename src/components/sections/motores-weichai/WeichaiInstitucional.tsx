"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function WeichaiInstitucional() {
  return (
    <section className="bg-white overflow-hidden section-padding">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Image Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[300px] md:h-[450px] rounded-[2.5rem] overflow-hidden"
          >
            <Image
              src="https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/weichai-motors-fabrica.webp"
              alt="Fábrica Weichai"
              fill
              className="object-cover"
            />
          </motion.div>

          {/* Text Right */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center"
          >
            <p className="text-[1.125rem] md:text-[22px] leading-relaxed md:leading-[34px] text-[#053474] font-normal">
              <span className="font-bold">A Weichai é uma das maiores fabricantes de motores diesel do mundo</span>, com receita anual superior a 300 bilhões de yuans e mais de 100.000 colaboradores. Com o recorde mundial de 53.09% de eficiência térmica em motores diesel comerciais, oferece economia de combustível, durabilidade excepcional e conformidade com as normas de emissão mais rigorosas.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
