import { Metadata } from "next";
import {
  TelemetriaHero,
  TelemetriaMetrics,
  TelemetriaDecisoes,
  TelemetriaCTA,
  TelemetriaLinhasProdutos,
  TelemetriaBeneficios,
  TelemetriaFuncionalidades,
  TelemetriaPorqueComprar,
  TelemetriaSegmentos,
  TelemetriaFormSection,
} from "@/components/sections/telemetria";

export const metadata: Metadata = {
  title: "Telemetria e Rastreamento | CBMaq",
  description: "Monitore o desempenho de suas máquinas em tempo real e tome decisões baseadas em dados precisos. Conheça as soluções de telemetria da CBMaq.",
};

export default function TelemetriaPage() {
  return (
    <>
      <TelemetriaHero />
      <TelemetriaMetrics />
      <TelemetriaDecisoes />
      <TelemetriaCTA />
      <TelemetriaLinhasProdutos />
      <TelemetriaBeneficios />
      <TelemetriaFuncionalidades />
      <TelemetriaPorqueComprar />
      <TelemetriaSegmentos />
      <TelemetriaFormSection />
    </>
  );
}
