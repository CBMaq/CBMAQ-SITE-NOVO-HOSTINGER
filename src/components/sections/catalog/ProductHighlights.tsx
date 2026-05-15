"use client";

import { CheckCircle2, Star, Quote } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProductHighlightsProps {
  product: any;
}

export function ProductHighlights({ product }: ProductHighlightsProps) {
  const highlights = product.highlightApplications || [];
  const recommendation = product.recommendationText;

  if (!recommendation && highlights.length === 0) return null;

  return (
    <section className="section-padding bg-foreground text-white overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-10 left-10 w-96 h-96 bg-primary rounded-full blur-[120px]" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary rounded-full blur-[120px]" />
      </div>

      <div className="container px-4 mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Recommendation Text */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <Quote className="h-16 w-16 text-primary/20 absolute -top-8 -left-8" />
              <div className="flex items-center gap-3 mb-6">
                <Star className="h-5 w-5 text-primary fill-primary" />
                <span className="text-sm font-bold uppercase tracking-[0.3em] text-primary">Nossa Recomendação</span>
              </div>
              
              <h2 className="text-3xl md:text-5xl font-serif font-black mb-8 leading-tight italic">
                {recommendation || "Desempenho superior para quem não aceita menos que a excelência."}
              </h2>
            </motion.div>
          </div>

          {/* Highlights List (Repeater) */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-md rounded-[2.5rem] p-10 border border-white/10 shadow-2xl"
            >
              <h3 className="text-xl font-serif font-bold mb-8 flex items-center gap-3">
                Destaques & Vantagens
                <div className="h-px flex-1 bg-white/10" />
              </h3>

              <div className="space-y-6">
                {highlights.length > 0 ? (
                  highlights.map((item: string, idx: number) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-start gap-4 group"
                    >
                      <div className="mt-1">
                        <CheckCircle2 className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
                      </div>
                      <span className="text-lg font-medium text-white/90 leading-snug">
                        {item}
                      </span>
                    </motion.div>
                  ))
                ) : (
                  <p className="text-white/40 italic">Consulte nossos especialistas para saber mais sobre as vantagens deste modelo.</p>
                )}
              </div>

              {/* Botão de Ação Rápida */}
              <div className="mt-12 pt-8 border-t border-white/10">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <CheckCircle2 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-primary">Garantia de Qualidade</p>
                    <p className="text-sm text-white/60">Suporte total e peças genuínas</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
