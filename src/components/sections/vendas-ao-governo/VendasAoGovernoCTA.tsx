"use client";

import { GenericCTASection } from "@/components/shared/GenericCTASection";

export function VendasAoGovernoCTA() {
  const baseUrl = "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/";

  return (
    <GenericCTASection
      backgroundImage={`${baseUrl}vendasaogoverno-06.jpg`}
      title="Precisa adquirir equipamentos públicos?"
      description="Acesse nossas atas de registro de preço ou fale diretamente com nossa equipe de licitações."
      primaryButton={{
        label: "Acessar Licitações",
        href: "#atas",
        icon: true
      }}
      secondaryButton={{
        label: "Falar com Especialista",
        href: "#formulario",
        icon: true
      }}
    />
  );
}
