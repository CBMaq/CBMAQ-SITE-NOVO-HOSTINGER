import { Metadata } from "next";
import { AssistenciaHero } from "@/components/sections/assistencia/AssistenciaHero";
import { MetricsSection } from "@/components/sections/assistencia/MetricsSection";
import { BrandsSection } from "@/components/sections/assistencia/BrandsSection";
import { SpecialtiesSection } from "@/components/sections/assistencia/SpecialtiesSection";
import { CTASection } from "@/components/sections/assistencia/CTASection";
import { ServicesSection } from "@/components/sections/assistencia/ServicesSection";
import { WhyChooseSection } from "@/components/sections/assistencia/WhyChooseSection";
import { LocationsSection } from "@/components/sections/assistencia/LocationsSection";
import { AssistenciaFormSection } from "@/components/sections/assistencia/AssistenciaFormSection";

export const metadata: Metadata = {
  title: "Assistência Técnica Especializada | CBMaq",
  description: "Peças genuínas e suporte técnico autorizado Lovol, Ammann, Mahindra e Weichai. Sua máquina não pode parar.",
};

export default function AssistenciaPage() {
  return (
    <div className="flex flex-col">
      <AssistenciaHero />
      <MetricsSection />
      <BrandsSection />
      <SpecialtiesSection />
      <CTASection />
      <ServicesSection />
      <WhyChooseSection />
      <LocationsSection />
      <AssistenciaFormSection />
    </div>
  );
}
