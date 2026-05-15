import { 
  EquipmentHero, 
  FeaturedLines,
  EquipmentCategories, 
  InstitutionalShort, 
  BrandsSection, 
  BenefitsSection, 
  QuoteFormSection 
} from "@/components/sections/equipamentos";
import { getPublicCategories, getPublicBrands, getPublicFeaturedProducts } from "@/app/actions/catalog";

export const metadata = {
  title: "Máquinas e Tratores | CBMaq",
  description: "Conheça nossa linha completa de escavadeiras, retroescavadeiras e pás carregadeiras. Soluções robustas para construção e agro.",
};

export default async function MaquinasPage() {
  const [categories, brands, featuredProducts] = await Promise.all([
    getPublicCategories(),
    getPublicBrands(),
    getPublicFeaturedProducts()
  ]);

  return (
    <div className="flex flex-col">
      <EquipmentHero />
      <FeaturedLines products={featuredProducts} />
      <EquipmentCategories categories={categories} />
      <InstitutionalShort />
      <BrandsSection />
      <BenefitsSection />
      <QuoteFormSection />
    </div>
  );
}
