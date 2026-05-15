"use client";

import { GenericCTASection } from "@/components/shared/GenericCTASection";

export function CTASection() {
  return (
    <GenericCTASection
      backgroundImage="https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/at-cta-bg-img.webp"
      title={
        <>
          Cada hora de máquina parada <br className="hidden md:block" />
          é prejuízo direto.
        </>
      }
      description={
        <>
          Diagnóstico e proposta em até 24h. Suporte 24/7 inclusive finais de semana. <br className="hidden lg:block" />
          Peças genuínas com rastreabilidade.
        </>
      }
      overlayClass="bg-white/20"
      primaryButton={{
        label: "Chamar técnico agora pelo WhatsApp",
        href: "https://wa.me/556132040909?text=Ol%C3%A1%2C%20gostaria%20de%20solicitar%20um%20atendimento%20para%20minha%20m%C3%A1quina.",
        icon: true,
        isExternal: true
      }}
      secondaryButton={{
        label: "Agendar manutenção preventiva",
        href: "#quote-assistance",
        icon: true
      }}
    />
  );
}
