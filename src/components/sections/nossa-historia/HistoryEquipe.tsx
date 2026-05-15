"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const baseUrl = "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/";

export function HistoryEquipe() {
  return (
    <section className="bg-white section-padding">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-[2.5rem] md:text-[3.5rem] font-bold text-[#053474] mb-8 leading-tight tracking-tight">
              Nossa Equipe
            </h2>
            <p className="text-[1rem] md:text-[1.25rem] text-[#053474]/80 font-medium leading-relaxed max-w-[550px]">
              Mais de <span className="text-[#053474] font-bold">100 colaboradores</span> dedicados, sendo <span className="text-[#053474] font-bold">30+ técnicos</span> certificados pelas fabricantes.<br />
              Engenheiros, especialistas comerciais e profissionais de campo, prontos para atender com precisão no <span className="text-[#053474] font-bold">DF, GO e TO</span>.
            </p>
          </motion.div>

          {/* Right: Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative h-[300px] md:h-[450px] rounded-[32px] overflow-hidden shadow-sm bg-gray-100"
          >
            <Image
              src={`${baseUrl}hero-slide3-bg.webp`}
              alt="Equipe CBMaq"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
