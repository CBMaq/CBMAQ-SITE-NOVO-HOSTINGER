import { Metadata } from "next";
import {
  MotoresWeichaiHero,
  WeichaiInstitucional,
  WeichaiNumbers,
  WeichaiWhyChoose,
  WeichaiCTA,
  WeichaiCategorias,
  WeichaiProdutos,
  WeichaiServices,
  WeichaiFormSection,
} from "@/components/sections/motores-weichai";

import { getPublicEngines } from "@/app/actions/catalog";

export const metadata: Metadata = {
  title: "Motores Weichai | CBMaq",
  description: "Tecnologia de ponta em motores diesel de alta potência e alta durabilidade. Conheça a linha completa de motores Weichai na CBMaq.",
};

export default async function MotoresWeichaiPage() {
  const engines = await getPublicEngines();

  return (
    <>
      <MotoresWeichaiHero />
      <WeichaiInstitucional />
      <WeichaiNumbers />
      <WeichaiWhyChoose />
      <WeichaiCTA />
      <WeichaiCategorias />
      <WeichaiProdutos initialProducts={engines} />
      <WeichaiServices />
      <WeichaiFormSection />
    </>
  );
}
