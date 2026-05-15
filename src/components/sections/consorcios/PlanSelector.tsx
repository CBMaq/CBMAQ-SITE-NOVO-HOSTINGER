"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

type Category = "maquinas" | "caminhoes" | "implementos";

const PLANS_DATA = {
  maquinas: [150000, 300000, 500000, 1000000],
  caminhoes: [200000, 400000, 600000],
  implementos: [80000, 150000, 250000],
};

const CATEGORIES = [
  { id: "maquinas", label: "Máquinas" },
  { id: "caminhoes", label: "Caminhões" },
  { id: "implementos", label: "Implementos" },
];

export function PlanSelector() {
  const [category, setCategory] = useState<Category>("maquinas");
  const [creditValue, setCreditValue] = useState([300000]);
  const [simulatorCredit, setSimulatorCredit] = useState([300000]);
  const [simulatorTerm, setSimulatorTerm] = useState([100]);

  // Pricing constants (from research)
  const ADMIN_FEE = 0.13;
  const RESERVE_FUND = 0.01;
  const TOTAL_FEES = ADMIN_FEE + RESERVE_FUND;
  // Based on cbmaq.com.br research, starting installment factor is ~1.16%
  const STARTING_INSTALLMENT_FACTOR = 0.0116; 
  const ECONOMY_RATE = 0.35;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const calculateInstallment = (credit: number, term: number) => {
    // For fixed cards, we use the starting factor from the site
    // For the simulator, we adjust by term but keep it grounded in real fees
    const totalWithFees = credit * (1 + TOTAL_FEES);
    const standardTermBase = 120; // Normalizing factor
    return (totalWithFees / term) * (term / standardTermBase < 1 ? 1.1 : 0.98); 
  };

  const getStartingInstallment = (credit: number) => {
    return credit * STARTING_INSTALLMENT_FACTOR;
  };

  const getWhatsappLink = () => {
    const creditStr = formatCurrency(simulatorCredit[0]);
    const term = simulatorTerm[0];
    const message = `Olá! Gostaria de falar com um especialista sobre um consórcio. Simulei um crédito de ${creditStr} no prazo de ${term} meses e gostaria de mais informações.`;
    return `https://wa.me/5561999834952?text=${encodeURIComponent(message)}`;
  };

  return (
    <section className="pt-24 pb-40 bg-[#F8F9FA] relative z-20">
      <div className="section-container">
        {/* Header with Tabs */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-20">
          <h2 className="text-[2.25rem] md:text-[3rem] font-bold text-[#0A2A5E]">
            Faça sua simulação
          </h2>

          <div className="bg-white p-1 rounded-2xl md:rounded-full border border-gray-200 shadow-sm flex flex-wrap md:flex-nowrap items-center justify-center">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id as Category)}
                className={cn(
                  "px-4 md:px-8 py-2.5 rounded-xl md:rounded-full text-[0.875rem] font-bold transition-all flex-1 md:flex-none text-center",
                  category === cat.id 
                    ? "bg-[#0A2A5E] text-white shadow-md" 
                    : "text-[#4D5C7E] hover:bg-gray-50"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Credit Slider — Floating over the transition */}
        <div className="bg-white rounded-[32px] md:rounded-[40px] p-6 md:p-16 shadow-[0_30px_100px_rgba(0,0,0,0.1)] mb-16 border border-gray-100 relative z-30">
          <div className="max-w-[800px] mx-auto text-center mb-16">
            <h3 className="text-[1.5rem] md:text-[2rem] font-bold text-[#0A2A5E] mb-12">
              Valor do crédito
            </h3>
            
            <div className="mb-8">
              <span className="text-[#0A4EE4] text-[1.75rem] md:text-[2.25rem] font-black block mb-4">
                {formatCurrency(creditValue[0])}
              </span>
              <Slider
                defaultValue={[300000]}
                max={1500000}
                min={50000}
                step={10000}
                value={creditValue}
                onValueChange={setCreditValue}
                className="mb-6"
              />
              <div className="flex justify-between items-center text-[#0A2A5E]/60 font-bold text-[0.875rem] md:text-[1rem]">
                <span>Mín. R$ 50k</span>
                <span>Máx. R$ 1.5Mi</span>
              </div>
            </div>
          </div>

          <div className="text-center mb-12">
            <h4 className="text-[1.5rem] font-bold text-[#0A2A5E]">
              Planos de {CATEGORIES.find(c => c.id === category)?.label} disponíveis:
            </h4>
          </div>

          {/* Plan Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            <AnimatePresence mode="wait">
              {PLANS_DATA[category].map((cred, idx) => {
                const installment = getStartingInstallment(cred);
                const isClosest = Math.abs(creditValue[0] - cred) < 75000;
                
                return (
                  <motion.div
                    key={`${category}-${cred}`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: idx * 0.05 }}
                    className={cn(
                      "flex flex-col items-center bg-[#F2F4F7] p-8 rounded-[24px] transition-all border-2",
                      isClosest ? "border-[#0A4EE4] bg-white ring-4 ring-[#0A4EE4]/5 shadow-lg" : "border-transparent"
                    )}
                  >
                    <span className="text-[0.75rem] font-bold text-[#0A2A5E]/40 mb-1">R$</span>
                    <span className="text-[1.5rem] font-bold text-[#0A2A5E] mb-6">
                      {cred >= 1000000 ? "1.0Mi" : (cred / 1000).toFixed(0) + "k"}
                    </span>
                    
                    <p className="text-[0.75rem] text-[#4D5C7E] font-bold mb-3 uppercase tracking-wide">
                      Parcelas a partir de
                    </p>
                    
                    <div className="w-full h-[52px] bg-[#0A2A5E] rounded-full flex items-center justify-center text-white px-4">
                      <span className="text-[0.875rem] font-bold whitespace-nowrap">
                        {formatCurrency(installment)}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Live Simulator Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Inputs */}
          <div className="bg-white p-6 md:p-14 rounded-[32px] md:rounded-[40px] shadow-lg border border-gray-100">
            <h3 className="text-[1.5rem] md:text-[1.75rem] font-bold text-[#0A2A5E] mb-10 md:mb-12">Simulador</h3>
            
            <div className="space-y-16">
              <div>
                <div className="flex justify-between mb-8">
                  <label className="text-[1.125rem] font-bold text-[#0A2A5E]">Valor desejado</label>
                  <span className="text-[#0A4EE4] font-bold">{formatCurrency(simulatorCredit[0])}</span>
                </div>
                <Slider 
                  max={1500000} min={50000} step={10000}
                  value={simulatorCredit} 
                  onValueChange={setSimulatorCredit} 
                />
              </div>

              <div>
                <div className="flex justify-between mb-8">
                  <label className="text-[1.125rem] font-bold text-[#0A2A5E]">Prazo</label>
                  <span className="text-[#0A4EE4] font-bold">{simulatorTerm[0]} meses</span>
                </div>
                <Slider 
                  max={230} min={12} step={1}
                  value={simulatorTerm} 
                  onValueChange={setSimulatorTerm} 
                />
              </div>
            </div>
          </div>

          {/* Right Results */}
          <div className="bg-[#f0f2f5] p-6 md:p-14 rounded-[32px] md:rounded-[40px] flex flex-col items-center justify-center text-center relative overflow-hidden group">
             {/* Subtle Decorative Background Element */}
             <div className="absolute top-0 right-0 p-8 pt-4 opacity-10">
                <span className="font-bold text-[8rem] text-[#0A2A5E] leading-none">CBMaq</span>
             </div>

             <div className="relative z-10 w-full space-y-10">
                <div>
                  <p className="text-[#4D5C7E] font-bold uppercase tracking-widest text-[0.75rem] mb-4">Parcela estimada</p>
                  <p className="text-[2.5rem] md:text-[3.25rem] font-black text-[#0A2A5E] leading-tight">
                    {formatCurrency(calculateInstallment(simulatorCredit[0], simulatorTerm[0]))} <span className="text-[1.25rem] opacity-60">/mês</span>
                  </p>
                  <p className="text-[#0A4EE4] font-bold text-[1.125rem] mt-2">Taxa {ADMIN_FEE * 100}%</p>
                </div>

                <div className="w-full h-px bg-gray-200"></div>

                <div>
                   <p className="text-[#4D5C7E] font-bold uppercase tracking-widest text-[0.75rem] mb-4">Economia estimada versus financiamento</p>
                   <p className="text-[2rem] md:text-[2.5rem] font-black text-[#0A4EE4]">
                     {formatCurrency(simulatorCredit[0] * ECONOMY_RATE)}
                   </p>
                </div>

                <a 
                  href={getWhatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#0A4EE4] text-white py-5 rounded-2xl font-bold text-[1.125rem] shadow-xl hover:bg-[#083DB4] transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center text-center"
                >
                  Faça uma Cotação
                </a>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
