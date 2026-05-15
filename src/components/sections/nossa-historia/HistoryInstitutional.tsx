"use client";

import { motion } from "framer-motion";

export function HistoryInstitutional() {
  return (
    <section className="bg-white py-8 md:py-10">
      <div className="section-container">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[1.125rem] md:text-[1.375rem] font-medium text-[#053474] text-center max-w-[850px] mx-auto leading-relaxed"
        >
          O que não mudou ao longo de 60 anos é o compromisso da CBMaq com seus clientes, colaboradores e soluções inovadoras.
        </motion.p>
      </div>
    </section>
  );
}
