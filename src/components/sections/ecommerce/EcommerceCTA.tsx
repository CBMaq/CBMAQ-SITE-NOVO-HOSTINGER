"use client";

import { GenericCTASection } from "@/components/shared/GenericCTASection";

export function EcommerceCTA() {
  const baseUrl = "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/";

  return (
    <GenericCTASection
      backgroundImage={`${baseUrl}ec-cta-bg-img.webp`}
      title={"Estoque Pronta Entrega: mais de 20.000 itens com gestão por tecnologia PDA."}
      description={
        <>
          60+ anos de mercado. 100% das entregas no prazo. <br className="hidden md:block" />
          Reputação excelente de vendedor.
        </>
      }
      primaryButton={{
        label: "Acessar Loja Online",
        href: "https://www.lojacbmaq.com.br/",
        icon: true,
        isExternal: true
      }}
      secondaryButton={{
        label: "Fale via WhatsApp",
        href: "https://wa.me/556132040909",
        icon: true,
        isExternal: true
      }}
    />
  );
}
