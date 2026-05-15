"use client";

import { GenericCTASection } from "@/components/shared/GenericCTASection";

export function WeichaiCTA() {
  const scrollToForm = () => {
    const section = document.getElementById("formulario");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <GenericCTASection
      backgroundImage="https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/wheichai-motorscta-bg-img.webp"
      title="Motor original. Peça original. Garantia original. Só na CBMaq."
      description="A excelência que sua operação merece com o suporte de quem entende do agronegócio e infraestrutura."
      overlayClass="bg-gradient-to-b from-white/30 via-white/60 to-white/30"
      primaryButton={{
        label: "Solicitar Proposta",
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
