import { getPublicCategories, getPublicBrands, getPublicFilteredProducts } from "@/app/actions/catalog";
import { CatalogNavbar } from "@/components/sections/catalog/CatalogNavbar";
import { CatalogSidebar } from "@/components/sections/catalog/CatalogSidebar";
import { MachineCard } from "@/components/sections/catalog/MachineCard";
import { SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { CatalogMobileFilter } from "@/components/sections/catalog/CatalogMobileFilter";
import { CatalogBackButton } from "@/components/sections/catalog/CatalogBackButton";

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{
    marca?: string;
    categoria?: string;
    page?: string;
    t?: "tratores" | "motores";
  }>;
}

export default async function CatalogPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = parseInt(params.page || "1");
  const brandsFilter = params.marca?.split(",").filter(Boolean);
  const categoriesFilter = params.categoria?.split(",").filter(Boolean);

  const productType = params.t === "motores" ? "engine" : params.t === "tratores" ? "machine" : undefined;
  
  const [categories, brands, { products, pagination }] = await Promise.all([
    getPublicCategories(),
    getPublicBrands(),
    getPublicFilteredProducts({
      brands: brandsFilter,
      categories: categoriesFilter,
      type: productType,
      page,
      limit: 12
    })
  ]);

  return (
    <div className="min-h-screen bg-white w-full">
      <CatalogNavbar />
      
      <div className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          <CatalogBackButton />
          
          <div className="flex flex-col lg:flex-row gap-10">
            
            {/* Sidebar Desktop */}
            <div className="hidden lg:block w-80 shrink-0">
              <CatalogSidebar categories={categories} brands={brands} />
            </div>

            {/* Mobile Filter Button */}
            <div className="lg:hidden flex items-center justify-between p-4 rounded-3xl border border-cbmaq-gray-200 mb-6">
               <span className="font-bold text-cbmaq-navy uppercase tracking-widest text-xs px-2">Filtros</span>
               <CatalogMobileFilter categories={categories} brands={brands} />
            </div>

            {/* Main Grid */}
            <div className="flex-1">
              <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-serif font-bold text-cbmaq-navy">
                    {categoriesFilter && categoriesFilter.length === 1 
                      ? categories.find(c => c.slug === categoriesFilter[0])?.name 
                      : params.t === "motores" ? "Motores Weichai" : "Catálogo de Máquinas"}
                  </h1>
                  <p className="text-sm text-cbmaq-gray-500 mt-1">
                    Exibindo {products.length} de {pagination.total} {params.t === "motores" ? "motores" : "máquinas"}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-cbmaq-gray-400 font-bold uppercase tracking-wider">Ordenar por:</span>
                  <select className="bg-transparent border-none text-sm font-bold text-cbmaq-navy focus:ring-0 cursor-pointer">
                    <option>Lançamentos</option>
                    <option>Menor Peso</option>
                    <option>Maior Peso</option>
                  </select>
                </div>
              </div>

              {products.length === 0 ? (
                <div className="bg-white rounded-[3rem] p-20 text-center border border-cbmaq-gray-100 shadow-sm">
                  <div className="max-w-xs mx-auto space-y-4">
                    <div className="text-5xl">{params.t === "motores" ? "⚙️" : "🚜"}</div>
                    <h2 className="text-2xl font-serif font-bold text-cbmaq-navy">
                      Nenhum {params.t === "motores" ? "motor" : "produto"} encontrado
                    </h2>
                    <p className="text-cbmaq-gray-500 text-sm">Tente ajustar seus filtros ou limpar a pesquisa para encontrar o que procura.</p>
                    <Link 
                      href={params.t ? `/catalogo?t=${params.t}` : "/catalogo"} 
                      className="inline-block bg-[#0A2A5E] text-white px-8 py-3 rounded-full font-bold text-xs uppercase"
                    >
                      Limpar Filtros
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {products.map((product) => (
                    <MachineCard key={product.id} product={product} />
                  ))}
                </div>
              )}

              {/* Paginação */}
              {pagination.pages > 1 && (
                <div className="mt-20 flex items-center justify-center gap-2">
                  {Array.from({ length: pagination.pages }).map((_, i) => {
                    const p = i + 1;
                    const isActive = p === pagination.currentPage;
                    
                    const query = new URLSearchParams();
                    if (params.marca) query.set("marca", params.marca);
                    if (params.categoria) query.set("categoria", params.categoria);
                    if (params.t) query.set("t", params.t);
                    query.set("page", p.toString());

                    return (
                      <Link
                        key={p}
                        href={`?${query.toString()}`}
                        className={cn(
                          "w-12 h-12 flex items-center justify-center rounded-2xl font-bold transition-all",
                          isActive 
                            ? "bg-[#0A2A5E] text-white shadow-lg" 
                            : "bg-white text-cbmaq-navy border border-cbmaq-gray-200 hover:border-primary"
                        )}
                      >
                        {p}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
