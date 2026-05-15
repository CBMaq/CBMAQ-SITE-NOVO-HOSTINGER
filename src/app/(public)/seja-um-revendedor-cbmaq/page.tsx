import { 
  RevendedorHero, 
  RevendedorMotivos, 
  RevendedorBeneficios, 
  RevendedorComoFunciona, 
  RevendedorCTA, 
  RevendedorForm 
} from "@/components/sections/seja-revendedor";

export const metadata = {
  title: "Seja um Revendedor CBMaq | Expanda seus negócios",
  description: "Transforme a sua empresa com a força de uma líder no mercado de máquinas e equipamentos. Seja parceiro CBMaq.",
};

export default function SejaUmRevendedorPage() {
  return (
    <div className="flex flex-col">
      <RevendedorHero />
      <RevendedorMotivos />
      <RevendedorBeneficios />
      <RevendedorComoFunciona />
      <RevendedorCTA />
      <RevendedorForm />
    </div>
  );
}
