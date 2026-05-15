"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, MessageSquare, Mail, Clock } from "lucide-react";

const unidades = [
  {
    city: "Brasília",
    state: "DF",
    address: "Setor SCIA Quadra 14 Conjunto 11 Lote 04 Parte A, Zona Industrial Brasília DF",
    cep: "71250-155",
    phone: "(61) 3204-0909",
    whatsapp: "(61) 99983495",
    email: "comunicacao@cbmaq.com.br",
    hours: "Segunda a Sexta: 08:00 - 18:00",
    waLink: "556199983495"
  },
  {
    city: "Goiânia",
    state: "GO",
    address: "Avenida Sao Francisco, 640 - Santa Genoveva, Goiânia - GO",
    cep: "74.670-010",
    phone: "(61) 3204-0909",
    whatsapp: "(61) 99983495",
    email: "comunicacao@cbmaq.com.br",
    hours: "Segunda a Sexta: 08:00 - 18:00",
    waLink: "556199983495"
  },
  {
    city: "Valparaíso",
    state: "GO",
    address: "Rua Parque Marajo, Rua Porto Alegre 04 Quadra13 Lote 04, Parque Marajo Valparaíso de Goiás GO",
    cep: "72874-210",
    phone: "(61) 3204-0909",
    whatsapp: "(61) 99983495",
    email: "comunicacao@cbmaq.com.br",
    hours: "Segunda a Sexta: 08:00 - 18:00",
    waLink: "556199983495"
  },
  {
    city: "Palmas",
    state: "TO",
    address: "Quadra 706 Sul Alameda 6, Nº 29 no bairro Plano Diretor Sul em Palmas - TO",
    cep: "77022-380",
    phone: "(61) 3204-0909",
    whatsapp: "(61) 99983495",
    email: "comunicacao@cbmaq.com.br",
    hours: "Segunda a Sexta: 08:00 - 18:00",
    waLink: "556199983495"
  },
  {
    city: "Paraupebas",
    state: "PA",
    address: "SOL POENTE, 63 - QUADRA119 LOTE 60 ANDAR 2 SALA B. RIO VERDE. PA.",
    cep: "68515-000",
    phone: "(61) 3204-0909",
    whatsapp: "(61) 99983495",
    email: "comunicacao@cbmaq.com.br",
    hours: "Segunda a Sexta: 08:00 - 18:00",
    waLink: "556199983495"
  },
  {
    city: "Cariacica",
    state: "ES",
    address: "Rodovia Governador Mario Covas Portaria B, 256 - Padre Mathias, Cariacica - ES",
    cep: "29.157-100",
    phone: "(61) 3204-0909",
    whatsapp: "(61) 99983495",
    email: "comunicacao@cbmaq.com.br",
    hours: "Segunda a Sexta: 08:00 - 18:00",
    waLink: "556199983495"
  }
];

export function UnidadesGridSection() {
  return (
    <section className="section-padding bg-white relative">
      <div className="section-container">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {unidades.map((unit, index) => (
            <motion.div
              key={unit.city}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-[24px] border border-black/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 flex flex-col h-full"
            >
              {/* Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-[#F0F5FF] rounded-[12px] flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-[#0A4EE4]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#053474]">{unit.city}</h3>
                  <span className="text-sm font-bold text-[#4d5c7e] uppercase tracking-wider">{unit.state}</span>
                </div>
              </div>

              {/* Fields */}
              <div className="flex-1 space-y-6">
                
                {/* Endereço */}
                <div>
                  <span className="text-xs text-[#8492a6] font-semibold uppercase tracking-wider mb-2 block">Endereço</span>
                  <p className="text-[0.95rem] text-[#053474] font-medium leading-relaxed">
                    {unit.address}
                  </p>
                  <p className="text-[0.9rem] text-[#8492a6] mt-1">CEP: {unit.cep}</p>
                </div>

                {/* Telefone */}
                {unit.phone && (
                  <div>
                    <span className="text-xs text-[#8492a6] font-semibold uppercase tracking-wider mb-2 block">Telefone</span>
                    <div className="flex items-center gap-2 text-[#053474] font-bold text-[0.95rem]">
                      <Phone className="w-4 h-4 shrink-0 text-[#0A4EE4]" />
                      {unit.phone}
                    </div>
                  </div>
                )}

                {/* WhatsApp */}
                <div>
                  <span className="text-xs text-[#8492a6] font-semibold uppercase tracking-wider mb-2 block">WhatsApp</span>
                  <div className="flex items-center gap-2 text-[#f5a623] font-bold text-[0.95rem]">
                    <MessageSquare className="w-4 h-4 shrink-0" />
                    {unit.whatsapp}
                  </div>
                </div>

                {/* E-mail */}
                <div>
                  <span className="text-xs text-[#8492a6] font-semibold uppercase tracking-wider mb-2 block">E-mail</span>
                  <div className="flex items-center gap-2 text-[#053474] font-medium text-[0.95rem]">
                    <Mail className="w-4 h-4 shrink-0 text-[#0A4EE4]" />
                    {unit.email}
                  </div>
                </div>

                {/* Horário */}
                <div>
                  <span className="text-xs text-[#8492a6] font-semibold uppercase tracking-wider mb-2 block">Horário</span>
                  <div className="flex items-center gap-2 text-[#4d5c7e] text-[0.95rem]">
                    <Clock className="w-4 h-4 shrink-0" />
                    {unit.hours}
                  </div>
                </div>

              </div>

              {/* CTA */}
              <div className="mt-8 pt-6 border-t border-black/5">
                <div className={unit.phone ? "grid grid-cols-2 gap-3" : "w-full"}>
                  {unit.phone && (
                    <a
                      href={`tel:${unit.phone.replace(/\D/g, "")}`}
                      className="flex items-center justify-center h-12 rounded-[10px] border border-[#053474] text-[#053474] font-bold text-sm transition-colors hover:bg-[#053474] hover:text-white"
                    >
                      Ligar
                    </a>
                  )}
                  <a
                    href={`https://wa.me/${unit.waLink}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center h-12 rounded-[10px] border border-[#053474] text-[#053474] font-bold text-sm transition-colors hover:bg-[#053474] hover:text-white"
                  >
                    Falar no WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
