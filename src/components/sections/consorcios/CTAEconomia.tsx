"use client";

import { GenericCTASection } from "@/components/shared/GenericCTASection";

export function CTAEconomia() {
  const scrollToSimulator = () => {
    const section = document.getElementById("simulador");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <GenericCTASection
      backgroundImage="https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/cons-cta-bg-img.webp"
      title={"Economia Garantida: até 35% comparado ao financiamento tradicional."}
      description="Aumente seu patrimônio com a inteligência do consórcio CBMaq. Menos taxas, mais resultados para sua frota."
      overlayClass="bg-gradient-to-b from-white/40 via-white/65 to-white/40"
      primaryButton={{
        label: "Faça uma cotação",
        onClick: scrollToSimulator,
        icon: true
      }}
      secondaryButton={{
        label: "Simular meu plano",
        onClick: scrollToSimulator,
        icon: true
      }}
    />
  );
}
