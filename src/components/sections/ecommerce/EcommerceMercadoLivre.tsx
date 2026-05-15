"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Truck, CreditCard, Star, Award, CheckCircle2, ExternalLink } from "lucide-react";
import Image from "next/image";

export function EcommerceMercadoLivre() {
  return (
    <section className="relative section-padding bg-[#F8FAFC] overflow-hidden">
      <div className="section-container">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Left Column: Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-1"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#919191]/10 text-[#0A2A5E] font-semibold text-sm mb-6 border border-[#919191]/20">
              <Award className="w-4 h-4 text-[#0095FF]" />
              Loja Oficial Certificada
            </div>
            
            <h2 className="text-[2.5rem] md:text-[3.5rem] font-bold text-[#0A2A5E] mb-6 tracking-tight leading-[1.1]">
              A CBMaq também <br />está no <span className="text-[#0095FF]">Mercado Livre</span>
            </h2>
            
            <p className="text-[1.125rem] md:text-[1.25rem] text-[#3E4A66] leading-relaxed mb-10 max-w-[540px]">
              Somos loja oficial e parceira certificada do Mercado Livre. Compre com toda segurança, frete grátis e parcelamento facilitado em uma das maiores plataformas de e-commerce da América Latina.
            </p>

            {/* Feature Badges */}
            <div className="flex flex-wrap gap-4 mb-10">
              <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-lg shadow-sm border border-slate-100 text-[#0A2A5E] font-medium text-sm">
                <ShieldCheck className="w-5 h-5 text-[#0095FF]" />
                Compra Garantida
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-lg shadow-sm border border-slate-100 text-[#0A2A5E] font-medium text-sm">
                <Truck className="w-5 h-5 text-[#0095FF]" />
                Frete Grátis
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-lg shadow-sm border border-slate-100 text-[#0A2A5E] font-medium text-sm">
                <CreditCard className="w-5 h-5 text-[#0095FF]" />
                Até 12x sem juros
              </div>
            </div>

            <a
              href="https://www.mercadolivre.com.br/loja/cbmaq"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex h-[3.75rem] px-8 rounded-full bg-[#0A4EE4] text-white items-center justify-center gap-3 font-bold text-[1rem] transition-all hover:bg-[#083DB4] shadow-xl hover:-translate-y-1 w-full md:w-auto"
            >
              Visitar Loja no Mercado Livre
              <ExternalLink className="w-5 h-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </motion.div>

          {/* Right Column: Card */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 w-full max-w-[500px] lg:max-w-none"
          >
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-[0_20px_40px_-15px_rgba(10,42,94,0.08)] border border-slate-100 relative">
              
              {/* MercadoLíder Badge 
              <div className="absolute -top-4 -right-4 bg-[#00A650] text-white px-6 py-2 rounded-full font-bold text-sm shadow-lg flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                MercadoLíder
              </div>
              */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-[#0A2A5E] mb-2">CBMaq Oficial</h3>
                <div className="inline-flex items-center gap-2 text-[#00A650] font-medium">
                  <CheckCircle2 className="w-4 h-4" />
                  Vendedor Certificado
                </div>
              </div>

              {/* Reputation Bar */}
              <div className="bg-[#F8FAFC] rounded-2xl p-6 mb-8 border border-slate-100">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-semibold text-[#0A2A5E]">Reputação</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-5 h-5 fill-[#FFE600] text-[#FFE600]" />
                    ))}
                  </div>
                </div>
                {/* Visual bar mimicking Mercado Livre */}
                <div className="h-3 w-full rounded-full flex overflow-hidden">
                  <div className="h-full bg-[#FFF0E6] w-[10%]"></div>
                  <div className="h-full bg-[#FFF5E6] w-[10%]"></div>
                  <div className="h-full bg-[#FFFFE6] w-[10%] border-r border-white/50"></div>
                  <div className="h-full bg-[#E6FFE6] w-[10%] border-r border-white/50"></div>
                  <div className="h-full bg-[#00A650] w-[60%] shadow-[0_0_10px_rgba(0,166,80,0.5)]"></div>
                </div>
                <p className="text-center text-sm text-[#3E4A66] mt-4 font-medium">
                  Excelente reputação de vendedor
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#F8FAFC] rounded-xl p-4 text-center border border-slate-100">
                  <div className="text-2xl font-bold text-[#0095FF] mb-1">60+</div>
                  <div className="text-xs text-[#3E4A66] font-medium uppercase tracking-wider">Anos de mercado</div>
                </div>
                <div className="bg-[#F8FAFC] rounded-xl p-4 text-center border border-slate-100">
                  <div className="text-2xl font-bold text-[#00A650] mb-1">100%</div>
                  <div className="text-xs text-[#3E4A66] font-medium uppercase tracking-wider">Entregas no prazo</div>
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
