import { getPublicProductBySlug } from "@/app/actions/catalog";
import { notFound } from "next/navigation";
import { ProductHero } from "@/components/sections/catalog/ProductHero";
import { ServiceLevelSection } from "@/components/sections/catalog/ServiceLevelSection";
import { ProductSpecs } from "@/components/sections/catalog/ProductSpecs";

import { ProductBottomCTA } from "@/components/sections/catalog/ProductBottomCTA";
import { SmartQuoteForm } from "@/components/sections/catalog/SmartQuoteForm";
import { MachineCard } from "@/components/sections/catalog/MachineCard";
import { CatalogNavbar } from "@/components/sections/catalog/CatalogNavbar";
import { EngineHero } from "@/components/sections/catalog/EngineHero";
import { EngineSpecs } from "@/components/sections/catalog/EngineSpecs";
import { Metadata } from "next";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await getPublicProductBySlug(slug);
  
  if (!data?.product) return { title: "Produto não encontrado | CBMaq" };

  const { product } = data;

  return {
    title: product.metaTitle || `${product.name} | CBMaq - Equipamentos de Alta Performance`,
    description: product.metaDescription || product.shortDescription,
    openGraph: {
      title: product.name,
      description: product.shortDescription || "",
      images: [product.ogImage || product.mainImage || ""],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const data = await getPublicProductBySlug(slug);

  if (!data || !data.product) {
    notFound();
  }

  const { product, relatedProducts } = data;
  const isEngine = product.productType === "engine";

  return (
    <main className="min-h-screen bg-white">
      {/* Navbar Azul Institucional */}
      <CatalogNavbar />

      {isEngine ? (
        <>
          <EngineHero product={product} />
          <EngineSpecs product={product} />
        </>
      ) : (
        <>
          {/* Hero Section */}
          <ProductHero product={product} />

          {/* Nível de Serviço (Classificação e Aplicações) */}
          <ServiceLevelSection product={product} />

          {/* Especificações Técnicas (Dados Técnicos e Diferenciais) */}
          <ProductSpecs product={product} />
        </>
      )}

      {/* Related Products Section */}
      {relatedProducts && relatedProducts.length > 0 && (
        <section className="py-24 bg-white">
          <div className="section-container">
            <div className="flex flex-col items-center mb-16 text-center">
               <h2 className="text-3xl md:text-[2.5rem] font-bold text-[#0A2A5E] mb-4 tracking-tight">Equipamentos Relacionados</h2>
               <p className="text-[#0A2A5E]/60 max-w-xl font-medium">
                  Explore outras máquinas que podem complementar sua operação.
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProducts.map((related: any) => (
                <MachineCard key={related.id} product={related} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Inferior */}
      <ProductBottomCTA productName={product.name} />

      {/* Formulário Inteligente de Proposta */}
      <SmartQuoteForm product={product} />
    </main>
  );
}
