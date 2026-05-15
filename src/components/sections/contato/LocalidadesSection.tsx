"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, MessageSquare, ArrowRight, Building2 } from "lucide-react";
import { BrazilMapOutline } from "./BrazilMapOutline";

interface Unit {
  id: string;
  city: string;
  state: string;
  address: string;
  phone: string;
  whatsapp?: string;
  coords: { x: number; y: number }; // Relative coordinates for the map 0-100
}

const units: Unit[] = [
  {
    id: "df",
    city: "Brasília",
    state: "DF",
    address: "Setor SCIA Quadra 14 Conjunto 11 Lote 04 Parte A, Zona Industrial Brasília DF, 71250-155",
    phone: "(61) 3204-0909",
    whatsapp: "556199983495",
    coords: { x: 61.0, y: 79.0 }
  },
  {
    id: "go",
    city: "Goiânia",
    state: "GO",
    address: "Avenida Sao Francisco, 640 - Santa Genoveva, Goiânia - GO, 74.670-010",
    phone: "(61) 3204-0909",
    whatsapp: "556199983495",
    coords: { x: 48.0, y: 76.5 }
  },
  {
    id: "val",
    city: "Valparaíso",
    state: "GO",
    address: "Rua Parque Marajo, Rua Porto Alegre 04 Quadra13 Lote 04, Parque Marajo Valparaíso de Goiás GO CEP 72874-210",
    phone: "(61) 3204-0909",
    whatsapp: "556199983495",
    coords: { x: 59.0, y: 81.0 }
  },
  {
    id: "to",
    city: "Palmas",
    state: "TO",
    address: "Quadra 706 Sul Alameda 6, Nº 29 no bairro Plano Diretor Sul em Palmas - TO, CEP 77022-380.",
    phone: "(61) 3204-0909",
    whatsapp: "556199983495",
    coords: { x: 55.0, y: 56.0 }
  },
  {
    id: "pa",
    city: "Paraupebas",
    state: "PA",
    address: "SOL POENTE, 63 - QUADRA119 LOTE 60 ANDAR 2 SALA B. RIO VERDE. PA. CEP: 68515-000",
    phone: "(61) 3204-0909",
    whatsapp: "556199983495",
    coords: { x: 38.0, y: 32.0 }
  },
  {
    id: "es",
    city: "Cariacica",
    state: "ES",
    address: "Rodovia Governador Mario Covas Portaria B, 256 - Padre Mathias, Cariacica - ES, 29.157-100",
    phone: "(61) 3204-0909",
    whatsapp: "556199983495",
    coords: { x: 92.5, y: 89.6 }
  }
];

export function LocalidadesSection() {
  const [activeId, setActiveId] = useState<string>("df");

  const activeUnit = units.find(u => u.id === activeId) || units[0];

  return (
    <section className="section-padding bg-[#FCFCFA] overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#0A4EE4] opacity-[0.05] rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#9EC9FF] opacity-[0.1] rounded-full blur-[80px] -translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="section-container relative z-10">
        <div className="text-center md:text-left mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-[#053474]"
          >
            Nossas Unidades
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-[#4d5c7e] max-w-[600px]"
          >
            A CBMaq possui unidades estrategicamente localizadas para melhor atender sua operação.
          </motion.p>
        </div>

        <div className="bg-white/40 p-4 lg:p-8 rounded-[32px] border border-black/5 shadow-[0_8px_30px_rgb(0,0,0,0.02)] backdrop-blur-sm">
          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] xl:grid-cols-[300px_1fr_350px] gap-8 lg:gap-12 items-center">
            
            {/* Left Column: List */}
            <div className="flex flex-col gap-3 order-2 lg:order-1 relative z-20 h-full justify-center">
            {units.map((unit) => {
              const isActive = activeId === unit.id;
              return (
                <button
                  key={unit.id}
                  onClick={() => setActiveId(unit.id)}
                  className={`w-full text-left p-5 rounded-[16px] transition-all border ${
                    isActive 
                      ? "bg-[#0A4EE4] border-[#0A4EE4] shadow-lg text-white" 
                      : "bg-white border-black/5 hover:border-[#0A4EE4]/30 hover:bg-[#F0F5FF]/50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className={`text-xl font-bold transition-colors ${isActive ? "text-white" : "text-[#053474]"}`}>
                        {unit.city}
                      </h3>
                      <span className={`text-sm font-medium ${isActive ? "text-white/80" : "text-[#4d5c7e]"}`}>
                        {unit.state}
                      </span>
                    </div>
                    {isActive && (
                      <motion.div layoutId="activeIndicator" className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                        <ArrowRight className="w-4 h-4 text-[#0A4EE4]" />
                      </motion.div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Center Column: Map */}
          <div className="order-1 lg:order-2 flex flex-col items-center justify-center relative min-h-[500px] bg-[#F0F5FF] rounded-[32px] p-8 border border-[#0A4EE4]/10 shadow-inner">
            
            {/* The Stylized Map Area */}
            <div 
              className="relative w-full max-w-[500px] flex items-center justify-center"
              style={{ aspectRatio: "200 / 240" }}
            >
              
              <BrazilMapOutline activeId={activeId} onStateClick={setActiveId} />

              {/* Pins */}
              {units.map((unit) => {
                const isActive = activeId === unit.id;
                return (
                  <motion.button
                    key={`pin-${unit.id}`}
                    onClick={() => setActiveId(unit.id)}
                    className="absolute group z-10"
                    style={{ left: `${unit.coords.x}%`, top: `${unit.coords.y}%` }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  >
                    <div className="relative -translate-x-1/2 -translate-y-1/2">
                      {/* Pulse effect for active pin */}
                      {isActive && (
                        <motion.div 
                          className="absolute inset-0 bg-[#9EC9FF] rounded-full opacity-50"
                          animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}
                      
                      {/* Pin body */}
                      <div className={`relative flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 shadow-xl border-2 ${
                        isActive 
                          ? "bg-white border-[#0A4EE4] scale-110 z-20" 
                          : "bg-[#0A4EE4] border-white/20 hover:bg-[#083CAE] scale-100"
                      }`}>
                        <MapPin className={`w-5 h-5 ${isActive ? "text-[#0A4EE4]" : "text-white"}`} />
                      </div>
                      
                      {/* Label */}
                      <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1 rounded-[8px] whitespace-nowrap text-xs font-bold transition-all ${
                        isActive ? "bg-white text-[#053474] opacity-100 translate-y-0" : "bg-[#0A4EE4] text-white opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0"
                      }`}>
                        {unit.city}
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Active Card */}
          <div className="order-3 flex items-center justify-center h-full lg:col-span-2 xl:col-span-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeId}
                initial={{ opacity: 0, x: 20, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -20, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-[400px] bg-white text-[#053474] rounded-[24px] p-8 shadow-xl border border-black/5 z-30"
              >
                <div className="w-12 h-12 bg-[#F0F5FF] rounded-[12px] flex items-center justify-center mb-6 text-[#0A4EE4]">
                  <Building2 className="w-6 h-6" />
                </div>
                
                <h3 className="text-2xl font-bold mb-1">{activeUnit.city}</h3>
                <p className="text-[#0A4EE4] font-bold text-sm mb-6 uppercase tracking-wider">{activeUnit.state}</p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#4d5c7e] shrink-0 mt-0.5" />
                    <p className="text-[0.9rem] text-[#4d5c7e] leading-relaxed font-medium">
                      {activeUnit.address}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-[#4d5c7e] shrink-0" />
                    <p className="text-[1.125rem] font-bold text-[#053474]">
                      {activeUnit.phone}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={`tel:${activeUnit.phone.replace(/\D/g, '')}`}
                    className="flex items-center justify-center gap-2 h-12 rounded-[10px] bg-[#F0F5FF] text-[#0A4EE4] font-bold text-sm transition-colors hover:bg-[#E0EBFF]"
                  >
                    <Phone className="w-4 h-4" />
                    Ligar
                  </a>
                  {activeUnit.whatsapp && (
                    <a
                      href={`https://wa.me/${activeUnit.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 h-12 rounded-[10px] bg-[#25D366] text-white font-bold text-sm transition-colors hover:bg-[#20bd5a]"
                    >
                      <MessageSquare className="w-4 h-4" />
                      WhatsApp
                    </a>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
