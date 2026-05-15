"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function RevendedorCTA() {
  return (
    <section className="bg-[#F8F9FA] pb-16 lg:pb-24">
      <div className="section-container">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-12 xl:gap-20">
          
          {/* Image Container */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-[45%] relative h-[400px] lg:h-[480px] rounded-[32px] overflow-hidden shadow-xl"
          >
            <Image 
              src="https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/sejarevendedorcbmaq-01.webp" 
              alt="Revendedor de Sucesso" 
              fill
              className="object-cover"
            />
          </motion.div>

          {/* Separator Line (Desktop Only) */}
          <motion.div 
            initial={{ opacity: 0, scaleY: 0 }}
            whileInView={{ opacity: 1, scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
            className="hidden lg:block relative w-[2px] h-[320px] origin-top"
          >
            <Image 
              src="https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/sejarevendedorcbmaq-11.png" 
              alt="Separator" 
              fill
              className="object-contain"
            />
          </motion.div>

          {/* Text Container */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:flex-1 flex flex-col justify-center"
          >
            <h2 className="text-[2rem] md:text-[2.5rem] lg:text-[2.75rem] font-bold text-[#0A2A5E] leading-[1.2] mb-8 max-w-[500px]">
              Junte-se à CBMaq e leve sua revenda para o próximo nível!
            </h2>
            <p className="text-[1.125rem] md:text-[1.25rem] font-medium text-[#4D5C7E] leading-[1.6] max-w-[520px]">
              Preencha o formulário e torne-se um revendedor CBMaq hoje mesmo. Estamos prontos para ajudá-lo a alcançar novos patamares de sucesso.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
