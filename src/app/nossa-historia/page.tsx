"use client";

import { PublicNavbar } from "@/components/layout/PublicNavbar";
import { FooterSection } from "@/components/sections/FooterSection";
import { HistoryTimeline } from "@/components/sections/nossa-historia/HistoryTimeline";
import { HistoryInstitutional } from "@/components/sections/nossa-historia/HistoryInstitutional";
import { HistoryDiferenciais } from "@/components/sections/nossa-historia/HistoryDiferenciais";
import { HistoryValores } from "@/components/sections/nossa-historia/HistoryValores";
import { HistoryEquipe } from "@/components/sections/nossa-historia/HistoryEquipe";

export default function NossaHistoriaPage() {
  return (
    <main className="min-h-screen bg-white">
      <PublicNavbar />
      
      {/* Timeline Section */}
      <HistoryTimeline />
      
      {/* Institutional Text */}
      <HistoryInstitutional />
      
      {/* Nossos Diferenciais */}
      <HistoryDiferenciais />
      
      {/* Propósito, Missão, Visão e Valores */}
      <HistoryValores />
      
      {/* Nossa Equipe */}
      <HistoryEquipe />
      
      <FooterSection />
    </main>
  );
}
