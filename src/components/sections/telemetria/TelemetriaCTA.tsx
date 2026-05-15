"use client";

import { GenericCTASection } from "@/components/shared/GenericCTASection";

export function TelemetriaCTA() {
  const baseUrl = "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/";

  return (
    <GenericCTASection
      backgroundImage={`${baseUrl}telemetria-09.png`}
      title="Quer monitorar sua frota? Tenha total visibilidade da sua operação."
      description="Fale diretamente com nossa equipe técnica e entenda como nossa plataforma funciona e soluciona seus problemas."
      primaryButton={{
        label: "Solicitar proposta",
        href: "#formulario",
        icon: true
      }}
      secondaryButton={{
        label: "Fale com o consultor",
        href: "https://wa.me/556132040909",
        icon: true,
        isExternal: true
      }}
    />
  );
}
