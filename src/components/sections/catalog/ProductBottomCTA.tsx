"use client";

import { GenericCTASection } from "@/components/shared/GenericCTASection";
import { MessageSquare, Phone } from "lucide-react";

interface ProductBottomCTAProps {
  productName: string;
}

export function ProductBottomCTA({ productName }: ProductBottomCTAProps) {
  const scrollToForm = () => {
    document.getElementById("proposta")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <GenericCTASection
      backgroundImage="https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/product-cta-bg-img.webp"
      overlayClass="bg-white/60"
      title={`Interessado no ${productName}?`}
      description="Fale com nossos especialistas e solicite um orçamento para sua operação."
      primaryButton={{
        label: "Solicitar Orçamento",
        onClick: scrollToForm,
        icon: MessageSquare
      }}
      secondaryButton={{
        label: "Falar com especialista",
        href: "/contato",
        icon: Phone
      }}
    />
  );
}
