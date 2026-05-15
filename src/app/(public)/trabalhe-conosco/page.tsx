import { Metadata } from "next";
import { TrabalheConoscoHero, WhyWorkSection, CurriculumFormSection } from "@/components/sections/trabalhe-conosco";

export const metadata: Metadata = {
  title: "Trabalhe Conosco | CBMaq",
  description: "Faça parte de uma equipe que valoriza pessoas, crescimento e compromisso com excelência.",
};

export default function TrabalheConoscoPage() {
  return (
    <div className="flex flex-col">
      <TrabalheConoscoHero />
      <WhyWorkSection />
      <div id="curriculum-form">
        <CurriculumFormSection />
      </div>
    </div>
  );
}
