"use client";

import { GenericCTASection } from "@/components/shared/GenericCTASection";

export function ConsultoriaCTA() {
  const scrollToForm = () => {
    const section = document.getElementById("contato");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <GenericCTASection
      backgroundImage="https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/consult-cta-bg-img.webp"
      title="Até 35% de economia em custos operacionais com a consultoria correta."
      description="Analise seus indicadores e reduza custos com especialistas do maior ecossistema agro do país."
      overlayClass="bg-gradient-to-b from-white/30 via-white/60 to-white/30"
      primaryButton={{
        label: "Falar com especialista",
        onClick: scrollToForm,
        icon: true
      }}
      secondaryButton={{
        label: "Ver mais",
        onClick: scrollToForm,
        icon: true
      }}
    />
  );
}
