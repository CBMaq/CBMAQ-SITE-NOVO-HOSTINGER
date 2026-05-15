"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Target, Briefcase, Bookmark, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceLevelSectionProps {
  product: any;
}

export function ServiceLevelSection({ product }: ServiceLevelSectionProps) {
  const applications = (product.recommendedApplications as string[]) || [];
  const highlights = (product.highlightApplications as string[]) || [];
  const classification = product.classification || "Leve";

  return (
    <section className="section-padding bg-white overflow-hidden">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-[#0A2A5E] tracking-tight">
            Nível de Serviço
          </h2>
        </div>

        <div className="max-w-[960px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-[2rem] border border-[#E9ECEF] shadow-sm overflow-hidden"
          >
            {/* Header: Classificação */}
            <div 
              className="p-8 flex items-center justify-between"
              style={{
                background: "linear-gradient(110deg, #001647 0%, #002C8D 100%)"
              }}
            >
              <div className="flex items-center gap-5">
                <div className="h-14 w-14 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <Target className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">Classificação da Máquina</h3>
                  <p className="text-sm text-white/70 font-medium mt-1">Nível de operação e aplicações recomendadas</p>
                </div>
              </div>

              <div className={cn(
                "px-5 py-2.5 rounded-full text-xs font-bold shadow-lg min-w-[80px] text-center",
                classification === "Leve" ? "bg-[#DCFCE7] text-[#15803D]" : 
                classification === "Médio" ? "bg-[#FEF3C7] text-[#92400E]" : 
                "bg-[#FEE2E2] text-[#991B1B]"
              )}>
                {classification}
              </div>
            </div>

            <div className="p-8 md:p-10 space-y-10">
              {/* Card: Indicado para */}
              <div className="bg-white rounded-2xl border border-[#E9ECEF] p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start">
                <div className="h-12 w-12 rounded-xl bg-[#E9F0FF] flex items-center justify-center flex-shrink-0">
                  <Bookmark className="h-6 w-6 text-[#0A2A5E]" />
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-[#0A2A5E] mb-2">Indicado para</h4>
                  <p className="text-[#495057] text-lg leading-relaxed">
                    {product.recommendationText || "Pequenas obras, reformas e trabalhos de precisão em espaços restritos"}
                  </p>
                </div>
              </div>

              {/* Bottom: Aplicações */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center border border-[#E9ECEF]">
                    <Briefcase className="h-5 w-5 text-[#0A2A5E]" />
                  </div>
                  <h4 className="text-lg font-bold text-[#0A2A5E]">Aplicações Recomendadas</h4>
                </div>

                <div className="flex flex-wrap gap-4">
                  {applications.length > 0 ? (
                    applications.map((app, idx) => (
                      <div 
                        key={idx}
                        className="px-6 py-4 rounded-xl border border-[#E9ECEF] bg-white text-[#495057] text-sm font-semibold flex items-center gap-3 transition-all hover:border-[#0A4EE4]/30 hover:shadow-sm"
                      >
                        <Check className="h-4 w-4 text-[#0A4EE4]" /> 
                        {app}
                      </div>
                    ))
                  ) : (
                    ["Paisagismo", "Instalações urbanas", "Manutenção predial", "Espaços confinados"].map((app, idx) => (
                      <div 
                        key={idx}
                        className="px-6 py-4 rounded-xl border border-[#E9ECEF] bg-white text-[#495057] text-sm font-semibold flex items-center gap-3"
                      >
                        <Check className="h-4 w-4 text-[#0A4EE4]" /> 
                        {app}
                      </div>
                    ))
                  )}
                </div>

                {/* Vantagens em Destaque */}
                {highlights.length > 0 && (
                  <div className="pt-8 border-t border-[#F1F3F5] space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center border border-[#E9ECEF]">
                        <Check className="h-5 w-5 text-[#0A2A5E]" />
                      </div>
                      <h4 className="text-lg font-bold text-[#0A2A5E]">Vantagens em Destaque</h4>
                    </div>

                    <div className="flex flex-wrap gap-4">
                      {highlights.map((h, idx) => (
                        <div 
                          key={idx}
                          className="px-6 py-4 rounded-xl border border-[#E9ECEF] bg-white text-[#495057] text-sm font-semibold flex items-center gap-3 transition-all hover:border-[#0A4EE4]/30 hover:shadow-sm"
                        >
                          <Check className="h-4 w-4 text-[#0A4EE4]" /> 
                          {h}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
