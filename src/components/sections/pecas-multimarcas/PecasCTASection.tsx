"use client";

import { GenericCTASection } from "@/components/shared/GenericCTASection";

export function PecasCTASection() {
  return (
    <GenericCTASection
      backgroundImage="https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/pecas-cta-bg-img.webp"
      title={
        <>
          Precisa de peças urgente? 20.000 itens <br className="hidden md:block" />
          em estoque. Entrega em 24–72 horas.
        </>
      }
      description="Fale diretamente com nosso setor de peças e garanta atendimento prioritário."
      overlayClass="bg-white/20"
      primaryButton={{
        label: "Acessar Loja Online",
        href: "https://www.lojacbmaq.com.br/",
        icon: true,
        isExternal: true
      }}
      secondaryButton={{
        label: "Falar com Especialista",
        href: "#pecas-contato",
        icon: true
      }}
    />
  );
}
