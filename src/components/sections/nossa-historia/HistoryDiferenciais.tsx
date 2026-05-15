"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const baseUrl = "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/";

export function HistoryDiferenciais() {
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
            <h2 className="text-[2.5rem] md:text-[3.5rem] font-semibold text-[#053474] mb-6 leading-tight">
              Nossos<br />Diferenciais
            </h2>
            <p className="text-[1.125rem] md:text-[1.25rem] text-[#053474] font-light leading-[1.6] max-w-[500px]">
              11 soluções integradas em um único ecossistema: da compra da máquina à peça de reposição, do consórcio à telemetria, de seguro à assistência técnica. Tudo que a sua operação precisa em um só lugar.
            </p>
          </motion.div>

          {/* Right: Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative h-[300px] md:h-[450px] rounded-[32px] overflow-hidden"
          >
            <img
              src={`${baseUrl}historia-diferenciais-img.webp`}
              alt="Diferenciais CBMaq"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
