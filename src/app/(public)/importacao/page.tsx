import { Metadata } from "next";
import { ImportacaoHero } from "@/components/sections/importacao/ImportacaoHero";
import { ImportacaoStats } from "@/components/sections/importacao/ImportacaoStats";
import { ImportacaoCTA } from "@/components/sections/importacao/ImportacaoCTA";
import { ImportacaoSegmentos } from "@/components/sections/importacao/ImportacaoSegmentos";
import { ImportacaoModalidades } from "@/components/sections/importacao/ImportacaoModalidades";
import { ImportacaoProcesso } from "@/components/sections/importacao/ImportacaoProcesso";
import { ImportacaoFormSection } from "@/components/sections/importacao/ImportacaoFormSection";

export const metadata: Metadata = {
  title: "Importação | CBMaq",
  description: "Há mais de 30 anos no mercado, soluções completas de importação para seu negócio com segurança e custo-benefício.",
};

export default function ImportacaoPage() {
  return (
    <>
      <ImportacaoHero />
      <ImportacaoStats />
      <ImportacaoCTA />
      <ImportacaoSegmentos />
      <ImportacaoModalidades />
      <ImportacaoProcesso />
      <ImportacaoFormSection />
    </>
  );
}
