"use client";

import { GenericCTASection } from "@/components/shared/GenericCTASection";

export function ImportacaoCTA() {
  const baseUrl = "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/";

  return (
    <GenericCTASection
      backgroundImage={`${baseUrl}import-cta-bg-img.webp`}
      title={
        <>
          Mais de 30 milhões de dólares em importação<br className="hidden md:block" /> de máquinas e equipamentos.
        </>
      }
      description={
        <>
          Especialistas em estruturar suas operações de<br className="hidden md:block" /> forma segura e com excelente custo-benefício.
        </>
      }
      primaryButton={{
        label: "Falar com especialista",
        href: "#cotacao",
        icon: true
      }}
      secondaryButton={{
        label: "Ver processo",
        href: "#processo",
        icon: true
      }}
    />
  );
}
