import { db as prisma } from "@/lib/db";
import { 
  VendasAoGovernoHero, 
  AtasRegistroSection, 
  PorqueContratarSection, 
  EntregaTecnicaSection, 
  VendasAoGovernoCTA, 
  VendasAoGovernoForm 
} from "@/components/sections/vendas-ao-governo";

export const metadata = {
  title: "Vendas ao Governo e Licitações | CBMaq",
  description: "Equipamentos homologados para licitações públicas. Atas de registro de preço disponíveis para adesão imediata.",
};

// Next.js config to force dynamic rendering if needed, but since we are fetching from DB and want fresh data:
export const revalidate = 60; // Revalidate every 60 seconds

export default async function VendasAoGovernoPage() {
  const atas = await prisma.ataRegistro.findMany({
    where: {
      published: true,
    },
    select: {
      id: true,
      titulo: true,
      slug: true,
      numeroAta: true,
      ultimaAtualizacao: true,
      local: true,
      orgao: true,
      modalidadeContratacao: true,
      objeto: true,
      idAtaPncp: true,
    },
    orderBy: {
      ultimaAtualizacao: 'desc',
    }
  });

  return (
    <div className="flex flex-col">
      <VendasAoGovernoHero />
      <AtasRegistroSection atas={atas} />
      <PorqueContratarSection />
      <VendasAoGovernoCTA />
      <EntregaTecnicaSection />
      <VendasAoGovernoForm />
    </div>
  );
}
