import { Metadata } from "next";
import { ContatoHero } from "@/components/sections/contato/ContatoHero";
import { LocalidadesSection } from "@/components/sections/contato/LocalidadesSection";
import { UnidadesGridSection } from "@/components/sections/contato/UnidadesGridSection";
import { ContactFormSection } from "@/components/sections/contato/ContactFormSection";

export const metadata: Metadata = {
  title: "Contato | CBMaq",
  description: "Fale com a CBMaq. Estamos prontos para atender você em nossas unidades e canais oficiais.",
};

export default function ContatoPage() {
  return (
    <div className="flex flex-col">
      <ContatoHero />
      <LocalidadesSection />
      <UnidadesGridSection />
      <ContactFormSection />
    </div>
  );
}
