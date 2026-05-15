import { Metadata } from "next";
import {
  SegurosHero,
  SegurosMetrics,
  SegurosCoberturas,
  SegurosParceiras,
  SegurosCTA,
  SegurosComoFunciona,
  SegurosProcesso,
  SegurosFrotas,
  SegurosFormSection,
} from "@/components/sections/seguros";

export const metadata: Metadata = {
  title: "Seguros para Equipamentos | CBMaq",
  description:
    "Proteção completa para sua frota de máquinas pesadas, tratores e equipamentos de construção. Mais de 15 seguradoras parceiras e R$500M+ em equipamentos segurados.",
};

export default function SegurosPage() {
  return (
    <>
      <SegurosHero />
      <SegurosMetrics />
      <SegurosCoberturas />
      <SegurosParceiras />
      <SegurosCTA />
      <SegurosComoFunciona />
      <SegurosProcesso />
      <SegurosFrotas />
      <SegurosFormSection />
    </>
  );
}
