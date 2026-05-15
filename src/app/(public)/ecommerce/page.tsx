import { Metadata } from "next";
import { EcommerceHero } from "@/components/sections/ecommerce/EcommerceHero";
import { EcommerceDiferenciais } from "@/components/sections/ecommerce/EcommerceDiferenciais";
import { EcommerceCTA } from "@/components/sections/ecommerce/EcommerceCTA";
import { EcommerceMarcas } from "@/components/sections/ecommerce/EcommerceMarcas";
import { EcommercePorqueComprar } from "@/components/sections/ecommerce/EcommercePorqueComprar";
import { EcommerceMercadoLivre } from "@/components/sections/ecommerce/EcommerceMercadoLivre";
import { EcommerceComoComprar } from "@/components/sections/ecommerce/EcommerceComoComprar";

export const metadata: Metadata = {
  title: "Peças e E-commerce | CBMaq",
  description: "Mais de 20.000 itens em estoque com entrega em 24-72h para todo o Brasil. Gestão inteligente para sua frota não parar.",
};

export default function EcommercePage() {
  return (
    <>
      <EcommerceHero />
      <EcommerceDiferenciais />
      <EcommerceCTA />
      <EcommerceMarcas />
      <EcommercePorqueComprar />
      <EcommerceMercadoLivre />
      <EcommerceComoComprar />
    </>
  );
}
