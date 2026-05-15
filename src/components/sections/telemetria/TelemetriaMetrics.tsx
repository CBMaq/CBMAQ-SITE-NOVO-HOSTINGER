"use client";

import { motion } from "framer-motion";

const metrics = [
  {
    value: "+2.000",
    label: "Máquinas\nMonitoradas"
  },
  {
    value: "99.9%",
    label: "Uptime Do\nSistema"
  },
  {
    value: "24/7",
    label: "Monitoramento"
  },
  {
    value: "5",
    label: "Segmentos\nAtendidos"
  }
];

export function TelemetriaMetrics() {
  return (
    <section className="bg-[#F4F3ED] section-padding border-b border-[#E9ECEF]">
      <div className="section-container max-w-[1100px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex flex-col items-center text-center relative"
            >
              <h3 className="text-[2.25rem] md:text-[3rem] font-bold text-[#0A2A5E] leading-none tracking-tight mb-3">
                {metric.value}
              </h3>
              <p className="text-[0.9375rem] md:text-[1.0625rem] font-medium text-[#4D5C7E] whitespace-pre-line leading-tight">
                {metric.label}
              </p>

              {/* Divisor com Gradiente (Claro -> Azul -> Claro) */}
              {index !== metrics.length - 1 && (
                <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-[1.5px] h-[70%] bg-[linear-gradient(to_bottom,rgba(10,42,94,0),#0A2A5E_50%,rgba(10,42,94,0))]" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
