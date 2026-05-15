import { Metadata } from "next";
import {
  PecasHero,
  PecasMetricsSection,
  PecasBrandsSection,
  PecasCTASection,
  PecasWhyBuySection,
  PecasCategoriesSection,
  PecasLocationsSection,
  PecasFormSection,
} from "@/components/sections/pecas-multimarcas";

export const metadata: Metadata = {
  title: "Peças Multimarcas e Originais | CBMaq",
  description: "Linha completa de peças genuínas e multimarcas para maquinário pesado, construção e mineração. Entrega rápida em todo o Brasil.",
};

export default function PecasMultimarcasPage() {
  return (
    <>
      <PecasHero />
      <PecasMetricsSection />
      <PecasBrandsSection />
      <PecasCTASection />
      <PecasWhyBuySection />
      <PecasCategoriesSection />
      <PecasLocationsSection />
      <PecasFormSection />
    </>
  );
}
