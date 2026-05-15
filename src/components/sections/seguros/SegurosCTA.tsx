"use client";

import { GenericCTASection } from "@/components/shared/GenericCTASection";

export function SegurosCTA() {
  return (
    <GenericCTASection
      backgroundImage="https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/seguros-cta-bg-img.webp"
      title={"Não deixe seu patrimônio desprotegido."}
      description="R$500 milhões em equipamentos avaliados e segurados. Proteção real para frotas de todos os portes."
      primaryButton={{
        label: "Faça uma Cotação",
        href: "#seguros-contato",
        icon: true
      }}
      secondaryButton={{
        label: "Fale com um especialista",
        href: "#seguros-contato",
        icon: true
      }}
    />
  );
}
