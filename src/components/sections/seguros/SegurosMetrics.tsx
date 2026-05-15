"use client";

import { motion } from "framer-motion";

const metrics = [
  { prefix: "R$", value: "500M+", label: "Em Equipamentos\nSegurados" },
  { prefix: "", value: "98%", label: "Sinistros\nAprovados" },
  { prefix: "", value: "24h", label: "Tempo Médio\nDe Resposta" },
  { prefix: "", value: "15+", label: "Seguradoras\nParceiras" },
];

export function SegurosMetrics() {
  return (
    <section className="bg-white section-padding">
      <div className="section-container max-w-[1200px]">
        <div className="flex flex-wrap md:flex-nowrap items-center justify-center gap-y-16 md:gap-0">
          {metrics.map((m, idx) => (
            <div key={idx} className="flex items-center w-full md:w-auto justify-center md:justify-start">
              {/* Metric block */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex flex-col items-center md:items-start px-6 md:px-8 lg:px-12 text-center md:text-left"
              >
                <div className="flex items-baseline gap-1 mb-2">
                  {m.prefix && (
                    <span className="text-[1.25rem] md:text-[1.5rem] font-bold text-[#053474] leading-none mb-1">
                      {m.prefix}
                    </span>
                  )}
                  <span className="text-[2.75rem] md:text-[3.593rem] font-extrabold text-[#053474] leading-none tracking-[-0.06em]">
                    {m.value}
                  </span>
                </div>
                <span className="text-[1.125rem] md:text-[1.46rem] text-[#053474] leading-[1.2] whitespace-pre-line font-normal">
                  {m.label}
                </span>
              </motion.div>

              {/* SVG Divider - Hidden on mobile */}
              {idx < metrics.length - 1 && (
                <div className="hidden md:block h-[90px] flex-shrink-0 opacity-40">
                  <img
                    src="https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/pecas-divisor1.svg"
                    alt=""
                    className="h-full w-auto"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
