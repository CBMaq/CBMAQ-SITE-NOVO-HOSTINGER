"use client";

import { motion } from "framer-motion";

const metrics = [
  { value: "50+", label: "Técnicos\nEspecializados" },
  { value: "3", label: "Oficinas\nPróprias" },
  { value: "24h", label: "Suporte\nTécnico" },
  { value: "15+", label: "Marcas\nAtendidas" },
];

export function MetricsSection() {
  return (
    <section className="bg-[#F5F5F5] section-padding">
      <div className="section-container">
        {/* Container for the 4 metrics with relative positioning for dividers */}
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {metrics.map((m, idx) => (
            <div key={idx} className="relative flex flex-col items-center text-center py-6 lg:py-0">
              
              {/* Vertical Divider - Desktop & Mobile */}
              {((idx % 4 !== 3) || (idx % 2 === 0)) && (
                <div 
                  className={`absolute right-0 top-1/2 -translate-y-1/2 w-px h-20 bg-gradient-to-b from-transparent via-[#0A2A5E]/40 to-transparent 
                  ${idx % 2 === 0 ? 'block' : 'hidden lg:block'} 
                  ${idx === 2 ? 'lg:block hidden' : ''}`} 
                />
              )}

              {/* Horizontal Divider - Mobile (Between Row 1 and Row 2) */}
              {(idx === 0 || idx === 1) && (
                <div className="lg:hidden absolute bottom-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-[#0A2A5E]/40 to-transparent" />
              )}

              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex flex-col items-center"
              >
                <p className="font-sans text-[2.75rem] md:text-[3.25rem] font-bold text-[#0A2A5E] leading-none mb-3 tracking-tight">
                  {m.value}
                </p>
                <p className="font-sans text-[0.875rem] md:text-[1rem] font-medium text-[#0A2A5E] leading-tight px-4 whitespace-pre-line">
                  {m.label}
                </p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
