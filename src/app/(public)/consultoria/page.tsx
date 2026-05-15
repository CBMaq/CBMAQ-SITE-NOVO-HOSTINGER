import { ConsultoriaHero } from "@/components/sections/consultoria/ConsultoriaHero";
import { ConsultoriaMetrics } from "@/components/sections/consultoria/ConsultoriaMetrics";
import { ConsultoriaDiferenciais } from "@/components/sections/consultoria/ConsultoriaDiferenciais";
import { ConsultoriaComoTrabalhamos } from "@/components/sections/consultoria/ConsultoriaComoTrabalhamos";
import { ConsultoriaCTA } from "@/components/sections/consultoria/ConsultoriaCTA";
import { ConsultoriaServices } from "@/components/sections/consultoria/ConsultoriaServices";
import { ConsultoriaResultados } from "@/components/sections/consultoria/ConsultoriaResultados";
import { ConsultoriaParceria } from "@/components/sections/consultoria/ConsultoriaParceria";
import { ConsultoriaFormSection } from "@/components/sections/consultoria/ConsultoriaFormSection";

export const metadata = {
  title: "Consultoria Especializada CBMaq | Produtividade e Estratégia",
  description: "Aumente a produtividade da sua operação com uma análise técnica completa e estratégica da CBMaq Consultoria.",
};

export default function ConsultoriaPage() {
  return (
    <main className="flex flex-col w-full">
      <ConsultoriaHero />
      <ConsultoriaMetrics />
      <ConsultoriaDiferenciais />
      <ConsultoriaComoTrabalhamos />
      <ConsultoriaCTA />
      <ConsultoriaServices />
      <ConsultoriaResultados />
      <ConsultoriaParceria />
      <ConsultoriaFormSection />
    </main>
  );
}
