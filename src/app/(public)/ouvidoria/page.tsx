import { Metadata } from "next";
import { OuvidoriaHero, OuvidoriaFormSection } from "@/components/sections/ouvidoria";

export const metadata: Metadata = {
  title: "Ouvidoria | CBMaq",
  description: "Um canal direto, sigiloso e transparente para você registrar elogios, sugestões, reclamações ou denúncias.",
};

export default function OuvidoriaPage() {
  return (
    <div className="flex flex-col">
      <OuvidoriaHero />
      <OuvidoriaFormSection />
    </div>
  );
}
