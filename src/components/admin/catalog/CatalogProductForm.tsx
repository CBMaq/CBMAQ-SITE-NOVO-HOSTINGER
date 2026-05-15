"use client";

import { useState, useEffect, useRef } from "react";
import { 
  Save, 
  X, 
  Plus, 
  Trash2, 
  GripVertical, 
  ImageIcon, 
  Info,
  Layout,
  ListChecks,
  Settings2,
  Globe,
  FileText,
  UploadCloud,
  FileDown
} from "lucide-react";
import { 
  createCatalogProduct, 
  updateCatalogProduct 
} from "@/app/actions/catalog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MediaPicker } from "@/components/admin/blog/MediaPicker";
import { RichTextEditor } from "@/components/admin/blog/RichTextEditor";
import { TechnicalTableBuilder, type TechnicalTable } from "@/components/admin/catalog/TechnicalTableBuilder";
import { toast } from "sonner";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface CatalogProductFormProps {
  initialData?: any;
  categories: any[];
  brands: any[];
  allProducts: any[];
  productType?: "machine" | "engine";
  basePath?: string;
}

export function CatalogProductForm({ 
  initialData, 
  categories, 
  brands,
  allProducts,
  productType = "machine",
  basePath = "/admin/catalogo/produtos"
}: CatalogProductFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    slug: initialData?.slug || "",
    brandId: initialData?.brandId || "",
    categoryId: initialData?.categoryId || "",
    mainImage: initialData?.mainImage || "",
    galleryImages: initialData?.galleryImages || [],
    classification: initialData?.classification || "Médio",
    condition: initialData?.condition || "NOVO",
    shortDescription: initialData?.shortDescription || "",
    fullDescription: initialData?.fullDescription || "",
    weight: initialData?.weight || "",
    power: initialData?.power || "",
    bucketCapacity: initialData?.bucketCapacity || "",
    serviceDifferential: initialData?.serviceDifferential || "",
    technicalData: initialData?.technicalData || [],
    technicalFiles: initialData?.technicalFiles || [],
    differentials: initialData?.differentials || [],
    recommendedApplications: initialData?.recommendedApplications || [],
    recommendationText: initialData?.recommendationText || "",
    highlightApplications: initialData?.highlightApplications || [],
    relatedProducts: initialData?.relatedProducts || [],
    metaTitle: initialData?.metaTitle || "",
    metaDescription: initialData?.metaDescription || "",
    ogImage: initialData?.ogImage || "",
    featured: initialData?.featured || false,
    order: initialData?.order || 0,
    active: initialData?.active !== undefined ? initialData.active : true,
    productType: initialData?.productType || productType,
    engineCode: initialData?.engineCode || "",
    mainFeaturesHtml: initialData?.mainFeaturesHtml || "",
    technicalInfoHtml: initialData?.technicalInfoHtml || "",
    technicalInfoTable: initialData?.technicalInfoTable || null,
  });

  const [importJsonText, setImportJsonText] = useState("");
  const [showImportModal, setShowImportModal] = useState(false);

  const slugify = (text: string) => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
  };

  // --- Helpers para campos dinâmicos ---

  const addTechnicalItem = () => {
    setFormData({
      ...formData,
      technicalData: [...formData.technicalData, { label: "", value: "" }]
    });
  };

  const removeTechnicalItem = (index: number) => {
    const newItems = [...formData.technicalData];
    newItems.splice(index, 1);
    setFormData({ ...formData, technicalData: newItems });
  };

  const updateTechnicalItem = (index: number, field: "label" | "value", value: string) => {
    const newItems = [...formData.technicalData];
    newItems[index][field] = value;
    setFormData({ ...formData, technicalData: newItems });
  };

  const addTechnicalFile = () => {
    setFormData({
      ...formData,
      technicalFiles: [...formData.technicalFiles, { name: "", url: "" }]
    });
  };

  const removeTechnicalFile = (index: number) => {
    const newFiles = [...formData.technicalFiles];
    newFiles.splice(index, 1);
    setFormData({ ...formData, technicalFiles: newFiles });
  };

  const updateTechnicalFile = (index: number, field: "name" | "url", value: string) => {
    const newFiles = [...formData.technicalFiles];
    newFiles[index][field] = value;
    setFormData({ ...formData, technicalFiles: newFiles });
  };

  const addListTextItem = (field: "differentials" | "recommendedApplications" | "highlightApplications") => {
    setFormData({
      ...formData,
      [field]: [...formData[field], ""]
    });
  };

  const removeListTextItem = (field: "differentials" | "recommendedApplications" | "highlightApplications", index: number) => {
    const newItems = [...formData[field]];
    newItems.splice(index, 1);
    setFormData({ ...formData, [field]: newItems });
  };

  const updateListTextItem = (field: "differentials" | "recommendedApplications" | "highlightApplications", index: number, value: string) => {
    const newItems = [...formData[field]];
    newItems[index] = value;
    setFormData({ ...formData, [field]: newItems });
  };

  // --- Submit ---

  async function handleSubmit() {
    if (!formData.name.trim()) return toast.error("Nome é obrigatório.");
    if (productType !== "engine") {
      if (!formData.brandId) return toast.error("Selecione uma marca.");
      if (!formData.categoryId) return toast.error("Selecione uma categoria.");
    }
    if (!formData.mainImage) return toast.error("Imagem principal é obrigatória.");

    setIsLoading(true);
    try {
      if (initialData?.id) {
        const result = await updateCatalogProduct(initialData.id, formData);
        if (result.success) {
          toast.success(`${productType === "engine" ? "Motor" : "Máquina"} atualizada com sucesso!`);
          // router.push(basePath); // Removido para permanecer na tela de edição
          router.refresh();
        } else {
          toast.error(result.error);
        }
      } else {
        const result = await createCatalogProduct(formData);
        if (result.success && result.data?.id) {
          toast.success(`${productType === "engine" ? "Motor" : "Máquina"} cadastrada com sucesso!`);
          // Redireciona para a tela de edição do novo produto para permitir continuar editando
          router.push(`${basePath}/editar/${result.data.id}`);
          router.refresh();
        } else {
          toast.error(result.error);
        }
      }
    } catch (error) {
      toast.error("Erro ao salvar produto.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center justify-between bg-background/80 backdrop-blur-md sticky top-0 z-10 py-4 border-b border-border/50 -mx-4 px-4 md:-mx-8 md:px-8 lg:-mx-10 lg:px-10">
        <div className="flex items-center gap-3">
           <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-full">
              <X className="h-5 w-5" />
           </Button>
           <h2 className="text-xl font-bold font-serif text-[#0A2A5E]">
              {initialData ? `Editando: ${initialData.name}` : `Cadastrar Nov${productType === "engine" ? "o Motor" : "a Máquina"}`}
           </h2>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="outline"
            onClick={() => setShowImportModal(true)} 
            className="rounded-xl border-primary text-primary"
          >
            Importar via JSON
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={isLoading}
            className="rounded-xl px-6 gap-2 bg-primary hover:bg-primary/90 text-white font-bold shadow-lg shadow-primary/20"
          >
            {isLoading ? "Salvando..." : <><Save className="h-4 w-4" /> Salvar Alterações</>}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="geral" className="w-full">
        <TabsList className="bg-muted/30 p-1 rounded-2xl mb-8 flex flex-wrap h-auto gap-1">
          <TabsTrigger value="geral" className="rounded-xl gap-2 px-4 py-2.5 font-bold text-xs uppercase tracking-wider data-[state=active]:bg-background">
            <Layout className="h-4 w-4" /> Geral
          </TabsTrigger>
          <TabsTrigger value="midia" className="rounded-xl gap-2 px-4 py-2.5 font-bold text-xs uppercase tracking-wider data-[state=active]:bg-background">
            <ImageIcon className="h-4 w-4" /> Mídia
          </TabsTrigger>
          <TabsTrigger value="specs" className="rounded-xl gap-2 px-4 py-2.5 font-bold text-xs uppercase tracking-wider data-[state=active]:bg-background">
            <Settings2 className="h-4 w-4" /> {productType === "engine" ? "Dados Técnicos" : "Especificações"}
          </TabsTrigger>
          <TabsTrigger value="features" className="rounded-xl gap-2 px-4 py-2.5 font-bold text-xs uppercase tracking-wider data-[state=active]:bg-background">
            <ListChecks className="h-4 w-4" /> Destaques
          </TabsTrigger>
          <TabsTrigger value="seo" className="rounded-xl gap-2 px-4 py-2.5 font-bold text-xs uppercase tracking-wider data-[state=active]:bg-background">
            <Globe className="h-4 w-4" /> SEO
          </TabsTrigger>
        </TabsList>

        {/* --- ABA GERAL --- */}
        <TabsContent value="geral" className="space-y-6 focus-visible:outline-none">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2 lg:col-span-2">
              <Label htmlFor="name">{productType === "engine" ? "Nome / Título da Página" : "Nome / Modelo da Máquina"}</Label>
              <Input
                id="name"
                placeholder="Ex: Escavadeira Lovol FR220D"
                value={formData.name}
                onChange={(e) => {
                  const newName = e.target.value;
                  const newSlug = !initialData ? slugify(newName) : formData.slug;
                  setFormData({ ...formData, name: newName, slug: newSlug });
                }}
                className="h-12 rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Link Amigável (Slug)</Label>
              <Input
                id="slug"
                placeholder="ex-escavadeira-lovol-fr220d"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: slugify(e.target.value) })}
                className="h-12 rounded-xl font-mono text-xs"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="condition">Condição</Label>
              <Select 
                value={formData.condition} 
                onValueChange={(val) => setFormData({ ...formData, condition: val })}
              >
                <SelectTrigger className="h-12 rounded-xl">
                  <SelectValue placeholder="Selecione a condição" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="NOVO">Novo</SelectItem>
                  <SelectItem value="USADO">Usado</SelectItem>
                  <SelectItem value="LOCAÇÃO">Locação</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {productType !== "engine" && (
              <>
                <div className="space-y-2">
                  <Label>Marca / Fabricante</Label>
                  <Select 
                    value={formData.brandId} 
                    onValueChange={(val) => setFormData({ ...formData, brandId: val })}
                  >
                    <SelectTrigger className="h-12 rounded-xl">
                      <SelectValue placeholder="Selecione a marca" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      {brands.map(b => (
                        <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Categoria Principal</Label>
                  <Select 
                    value={formData.categoryId} 
                    onValueChange={(val) => setFormData({ ...formData, categoryId: val })}
                  >
                    <SelectTrigger className="h-12 rounded-xl">
                      <SelectValue placeholder="Selecione a categoria" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      {categories.map(c => (
                        <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            {productType === "engine" ? (
              <div className="space-y-2">
                <Label htmlFor="engineCode">Código/Categoria (Ex: WP3N)</Label>
                <Input
                  id="engineCode"
                  placeholder="WP3N"
                  value={formData.engineCode}
                  onChange={(e) => setFormData({ ...formData, engineCode: e.target.value })}
                  className="h-12 rounded-xl"
                />
              </div>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="classification">Classificação (Nível)</Label>
                <Select 
                  value={formData.classification} 
                  onValueChange={(val) => setFormData({ ...formData, classification: val })}
                >
                  <SelectTrigger className="h-12 rounded-xl">
                    <SelectValue placeholder="Selecione o nível" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="Leve">Leve</SelectItem>
                    <SelectItem value="Médio">Médio</SelectItem>
                    <SelectItem value="Pesado">Pesado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="order">Ordem de Exibição</Label>
              <Input
                id="order"
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                className="h-12 rounded-xl"
              />
            </div>

            <div className="lg:col-span-3 space-y-6">
               <div className="space-y-2">
                  <Label htmlFor="shortDescription">Descrição Curta (Card)</Label>
                  <Textarea
                    id="shortDescription"
                    placeholder="Breve resumo para listagens..."
                    value={formData.shortDescription}
                    onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                    className="rounded-xl min-h-[80px]"
                  />
               </div>

               {productType === "engine" ? (
                 <div className="space-y-2">
                    <Label>Características Principais</Label>
                    <RichTextEditor
                      content={formData.mainFeaturesHtml}
                      onChange={(content) => setFormData({ ...formData, mainFeaturesHtml: content })}
                      placeholder="Descreva as características técnicas, diferenciais de engenharia e vantagens do motor..."
                    />
                 </div>
               ) : (
                 <div className="space-y-2">
                    <Label htmlFor="fullDescription">Descrição Completa</Label>
                    <Textarea
                      id="fullDescription"
                      placeholder="Descrição detalhada para a página do produto..."
                      value={formData.fullDescription}
                      onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                      className="rounded-xl min-h-[150px]"
                    />
                 </div>
               )}
            </div>

            <div className="flex items-center justify-between p-4 bg-muted/20 rounded-2xl border border-border/50 h-14">
                <div className="space-y-0.5">
                  <Label className="text-sm font-bold">Status d{productType === "engine" ? "o Motor" : "a Máquina"}</Label>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Ativo no catálogo público</p>
                </div>
                <Switch
                  checked={formData.active}
                  onCheckedChange={(val) => setFormData({ ...formData, active: val })}
                />
            </div>

            <div className="flex items-center justify-between p-4 bg-primary/5 rounded-2xl border border-primary/20 h-14">
                <div className="space-y-0.5">
                  <Label className="text-sm font-bold text-primary">Destaque</Label>
                  <p className="text-[10px] text-primary/60 uppercase tracking-widest font-bold">Aparece em seções especiais</p>
                </div>
                <Switch
                  checked={formData.featured}
                  onCheckedChange={(val) => setFormData({ ...formData, featured: val })}
                />
            </div>

            {productType === "machine" && (
              <>
                <div className="lg:col-span-3 p-6 bg-blue-50/50 rounded-3xl border border-blue-100 space-y-6">
                    <div className="flex items-center gap-2 mb-2">
                        <Layout className="h-5 w-5 text-blue-600" />
                        <h3 className="text-lg font-serif font-bold text-blue-900">Especificações Rápidas (Icons padrão)</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="weight" className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-blue-400" /> Peso Operacional
                            </Label>
                            <Input 
                                id="weight"
                                placeholder="Ex: 3 750 kg"
                                value={formData.weight}
                                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                                className="h-11 rounded-xl bg-white"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="power" className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-blue-400" /> Potência
                            </Label>
                            <Input 
                                id="power"
                                placeholder="Ex: 24.5 cv"
                                value={formData.power}
                                onChange={(e) => setFormData({ ...formData, power: e.target.value })}
                                className="h-11 rounded-xl bg-white"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="bucket" className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-blue-400" /> Caçamba
                            </Label>
                            <Input 
                                id="bucket"
                                placeholder="Ex: 0.12 m3"
                                value={formData.bucketCapacity}
                                onChange={(e) => setFormData({ ...formData, bucketCapacity: e.target.value })}
                                className="h-11 rounded-xl bg-white"
                            />
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-3 space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="serviceDifferential" className="flex items-center gap-2">
                            <Info className="h-4 w-4 text-primary" /> Nível de Serviço / Diferencial Principal
                        </Label>
                        <Textarea 
                            id="serviceDifferential"
                            placeholder="Texto que aparecerá na seção Nível de Serviço..."
                            value={formData.serviceDifferential}
                            onChange={(e) => setFormData({ ...formData, serviceDifferential: e.target.value })}
                            className="rounded-xl min-h-[80px]"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="recommendationText" className="flex items-center gap-2">
                            <Info className="h-4 w-4 text-blue-600" /> Esta Máquina é Indicada Para / Sua Principal Vantagem:
                        </Label>
                        <Textarea 
                            id="recommendationText"
                            placeholder="Ex: Ideal para quem busca alta produtividade com baixo consumo..."
                            value={formData.recommendationText}
                            onChange={(e) => setFormData({ ...formData, recommendationText: e.target.value })}
                            className="rounded-xl min-h-[80px]"
                        />
                    </div>
                </div>
              </>
            )}
          </div>
        </TabsContent>

        {/* --- ABA MÍDIA --- */}
        <TabsContent value="midia" className="space-y-8 focus-visible:outline-none">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-4">
                 <div className="flex items-center gap-2 mb-2">
                    <ImageIcon className="h-5 w-5 text-primary" />
                    <Label className="text-lg font-serif font-bold">Imagem Principal</Label>
                 </div>
                 <div className="relative aspect-square rounded-3xl border-2 border-dashed border-border/50 overflow-hidden bg-muted/20 flex items-center justify-center group shadow-inner">
                  {formData.mainImage ? (
                    <>
                      <Image 
                        src={formData.mainImage} 
                        alt="Principal" 
                        fill 
                        className="object-contain p-4"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <MediaPicker onSelect={(url) => setFormData({ ...formData, mainImage: url })} />
                      </div>
                    </>
                  ) : (
                    <MediaPicker onSelect={(url) => setFormData({ ...formData, mainImage: url })} />
                  )}
                </div>
                <p className="text-[10px] text-muted-foreground text-center font-bold uppercase tracking-widest">Recomendado: Fundo transparente (PNG/WebP)</p>
              </div>

              <div className="md:col-span-2 space-y-4">
                 <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                        <Layout className="h-5 w-5 text-primary" />
                        <Label className="text-lg font-serif font-bold">Galeria de Imagens</Label>
                    </div>
                    <MediaPicker onSelect={(url) => setFormData({ ...formData, galleryImages: [...formData.galleryImages, url] })} trigger={
                       <Button variant="outline" size="sm" className="rounded-xl gap-2 font-bold text-xs uppercase tracking-wider">
                          <Plus className="h-4 w-4" /> Adicionar à Galeria
                       </Button>
                    } />
                 </div>
                 
                 <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 p-6 bg-muted/10 rounded-3xl border border-border/50 min-h-[200px]">
                    {formData.galleryImages.length === 0 ? (
                       <div className="col-span-full flex flex-col items-center justify-center text-muted-foreground gap-2">
                          <ImageIcon className="h-10 w-10 opacity-20" />
                          <p className="text-sm font-medium">Nenhuma imagem na galeria ainda.</p>
                       </div>
                    ) : (
                       formData.galleryImages.map((url: string, idx: number) => (
                          <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden border border-border shadow-sm group">
                             <Image src={url} alt={`Galeria ${idx}`} fill className="object-cover" />
                             <button 
                                onClick={() => {
                                   const newImages = [...formData.galleryImages];
                                   newImages.splice(idx, 1);
                                   setFormData({ ...formData, galleryImages: newImages });
                                }}
                                className="absolute top-2 right-2 p-1.5 bg-destructive text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                             >
                                <Trash2 className="h-3 w-3" />
                             </button>
                          </div>
                       ))
                    )}
                 </div>
              </div>
           </div>
        </TabsContent>

        {/* --- ABA ESPECIFICAÇÕES --- */}
        <TabsContent value="specs" className="space-y-6 focus-visible:outline-none">
          {productType === "engine" ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <Settings2 className="h-6 w-6 text-primary" />
                <div>
                  <h3 className="text-xl font-serif font-bold text-[#0A2A5E]">Informações Técnicas do Motor</h3>
                  <p className="text-sm text-muted-foreground">Construa ou cole uma tabela personalizada para os dados técnicos.</p>
                </div>
              </div>
              <TechnicalTableBuilder
                value={formData.technicalInfoTable as TechnicalTable | null}
                onChange={(table) => setFormData({ ...formData, technicalInfoTable: table })}
              />
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-4">
                <div>
                   <h3 className="text-xl font-serif font-bold flex items-center gap-2">
                      <Settings2 className="h-5 w-5 text-primary" /> Dados Técnicos
                   </h3>
                   <p className="text-sm text-muted-foreground">Adicione pares de informação técnica (ex: Potência - 24cv)</p>
                </div>
                <Button onClick={addTechnicalItem} variant="outline" className="rounded-xl gap-2 font-bold text-xs uppercase tracking-wider border-primary/20 text-primary hover:bg-primary/5">
                   <Plus className="h-4 w-4" /> Adicionar Item
                </Button>
             </div>

             <div className="space-y-3">
                {formData.technicalData.length === 0 && (
                   <div className="py-20 text-center bg-muted/10 rounded-3xl border-2 border-dashed border-border/50">
                      <Info className="h-10 w-10 text-muted-foreground/30 mx-auto mb-4" />
                      <p className="text-sm text-muted-foreground">Clique no botão acima para adicionar especificações técnicas.</p>
                   </div>
                )}
                 {formData.technicalData.map((item: any, idx: number) => (
                   <div key={idx} className="flex items-center gap-4 bg-background p-3 rounded-2xl border border-border shadow-sm group animate-in slide-in-from-left-2 duration-300">
                      <div className="p-2 bg-muted/50 rounded-lg cursor-move text-muted-foreground/40 group-hover:text-primary/40 transition-colors">
                         <GripVertical className="h-4 w-4" />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 flex-1 gap-4">
                         <Input 
                            placeholder="Ex: Peso Operacional" 
                            value={item.label}
                            onChange={(e) => updateTechnicalItem(idx, "label", e.target.value)}
                            className="h-11 rounded-xl bg-muted/20 border-none"
                         />
                         <Input 
                            placeholder="Ex: 3.750 kg" 
                            value={item.value}
                            onChange={(e) => updateTechnicalItem(idx, "value", e.target.value)}
                            className="h-11 rounded-xl bg-muted/20 border-none"
                         />
                      </div>
                      <Button 
                         variant="ghost" 
                         size="icon" 
                         onClick={() => removeTechnicalItem(idx)}
                         className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full h-10 w-10"
                      >
                         <Trash2 className="h-4 w-4" />
                      </Button>
                   </div>
                ))}
             </div>
            </>
          )}

          {/* PDFs Section (Available for both Machines and Engines) */}
          <div className="pt-8 border-t border-border/50 mt-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-serif font-bold flex items-center gap-2 text-[#0A2A5E]">
                  <FileText className="h-5 w-5 text-[#0095FF]" /> PDFs de Dados Técnicos
                </h3>
                <p className="text-sm text-muted-foreground">Adicione catálogos ou fichas técnicas em PDF.</p>
              </div>
              <Button onClick={addTechnicalFile} variant="outline" className="rounded-xl gap-2 font-bold text-xs uppercase tracking-wider border-[#0095FF]/20 text-[#0095FF] hover:bg-[#0095FF]/5">
                <Plus className="h-4 w-4" /> Adicionar PDF
              </Button>
            </div>

            <div className="space-y-4">
              {formData.technicalFiles.length === 0 && (
                <div className="py-12 text-center bg-muted/5 rounded-3xl border-2 border-dashed border-border/30">
                  <FileText className="h-10 w-10 text-muted-foreground/20 mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">Nenhum PDF anexado ainda.</p>
                </div>
              )}
              {formData.technicalFiles.map((file: any, idx: number) => (
                <div key={idx} className="bg-white p-6 rounded-3xl border border-border shadow-sm space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-4">
                      <div className="space-y-2">
                        <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Nome do Botão (Ex: Baixar Ficha Técnica)</Label>
                        <Input 
                          placeholder="Ex: Download Especificações Completas"
                          value={file.name}
                          onChange={(e) => updateTechnicalFile(idx, "name", e.target.value)}
                          className="h-11 rounded-xl"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Arquivo PDF</Label>
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "flex-1 h-11 rounded-xl bg-muted/20 border border-border px-4 flex items-center gap-2 overflow-hidden",
                            !file.url && "text-muted-foreground"
                          )}>
                            <FileText className="h-4 w-4 shrink-0" />
                            <span className="text-sm truncate">{file.url || "Nenhum arquivo selecionado"}</span>
                          </div>
                          <MediaPicker 
                            fileFilter="pdf" 
                            onSelect={(url) => updateTechnicalFile(idx, "url", url)} 
                            trigger={
                              <Button
                                type="button"
                                variant="outline"
                                className="rounded-xl gap-2 font-bold text-xs uppercase tracking-wider"
                              >
                                <UploadCloud className="h-4 w-4" />
                                Selecionar Arquivo
                              </Button>
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => removeTechnicalFile(idx)}
                      className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full h-10 w-10 mt-7"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tabela Técnica Avançada (Disponível para máquinas) */}
          {productType !== "engine" && (
            <div className="pt-8 border-t border-border/50 mt-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-serif font-bold flex items-center gap-2 text-[#0A2A5E]">
                    <Settings2 className="h-5 w-5 text-[#0095FF]" /> Tabela Técnica Avançada
                  </h3>
                  <p className="text-sm text-muted-foreground">Opcional. Construa uma tabela estruturada para os dados técnicos (ex: Usina de Asfalto).</p>
                </div>
              </div>
              <TechnicalTableBuilder
                value={formData.technicalInfoTable as TechnicalTable | null}
                onChange={(table) => setFormData({ ...formData, technicalInfoTable: table })}
                defaultColumns={[
                  "Capacidade",
                  "Sistema de reciclagem",
                  "Capacidade de produção 3% [t/h]",
                  "Secadora tipo tambor / Queimador",
                  "Tipo de filtro [superfície m2]",
                  "Tipo de tela [Nº Sel.]",
                  "Capacidade do silo de minerais quentes [t]",
                  "Tipo de misturador / Capacidade do lote (kg t/h)",
                  "Capacidade do silo de concreto pronto [t]"
                ]}
              />
            </div>
          )}
        </TabsContent>

        {/* --- ABA DESTAQUES --- */}
        <TabsContent value="features" className="space-y-8 focus-visible:outline-none">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Diferenciais */}
              <div className="space-y-4">
                 <div className="flex items-center justify-between">
                    <h3 className="text-lg font-serif font-bold">Diferenciais</h3>
                    <Button onClick={() => addListTextItem("differentials")} size="sm" variant="ghost" className="text-primary font-bold text-xs">
                       + Adicionar
                    </Button>
                 </div>
                 <div className="space-y-2">
                    {formData.differentials.map((text: string, idx: number) => (
                       <div key={idx} className="flex gap-2">
                          <Input 
                            value={text}
                            onChange={(e) => updateListTextItem("differentials", idx, e.target.value)}
                            placeholder="Ex: Cabine pressurizada"
                            className="rounded-xl h-11"
                          />
                          <Button variant="ghost" size="icon" onClick={() => removeListTextItem("differentials", idx)} className="text-muted-foreground">
                             <Trash2 className="h-4 w-4" />
                          </Button>
                       </div>
                    ))}
                    {formData.differentials.length === 0 && <p className="text-xs text-muted-foreground italic">Nenhum diferencial adicionado.</p>}
                 </div>
              </div>

              {/* Aplicações */}
              <div className="space-y-4">
                 <div className="flex items-center justify-between">
                    <h3 className="text-lg font-serif font-bold">Aplicações Recomendadas</h3>
                    <Button onClick={() => addListTextItem("recommendedApplications")} size="sm" variant="ghost" className="text-primary font-bold text-xs">
                       + Adicionar
                    </Button>
                 </div>
                 <div className="space-y-2">
                    {formData.recommendedApplications.map((text: string, idx: number) => (
                       <div key={idx} className="flex gap-2">
                          <Input 
                            value={text}
                            onChange={(e) => updateListTextItem("recommendedApplications", idx, e.target.value)}
                            placeholder="Ex: Construção Civil"
                            className="rounded-xl h-11"
                          />
                          <Button variant="ghost" size="icon" onClick={() => removeListTextItem("recommendedApplications", idx)} className="text-muted-foreground">
                             <Trash2 className="h-4 w-4" />
                          </Button>
                       </div>
                    ))}
                    {formData.recommendedApplications.length === 0 && <p className="text-xs text-muted-foreground italic">Nenhuma aplicação adicionada.</p>}
                 </div>
              </div>

              {/* Vantagens em Destaque (Repetidor) */}
              <div className="lg:col-span-2 space-y-4 pt-6 border-t border-border/50">
                 <div className="flex items-center justify-between">
                    <div>
                       <h3 className="text-lg font-serif font-bold">Vantagens em Destaque (Repetidor)</h3>
                       <p className="text-xs text-muted-foreground">Aparecerão como ícones de check na página do produto.</p>
                    </div>
                    <Button onClick={() => addListTextItem("highlightApplications")} size="sm" variant="outline" className="rounded-xl gap-2 font-bold text-xs uppercase tracking-wider">
                       <Plus className="h-4 w-4" /> Adicionar Vantagem
                    </Button>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {formData.highlightApplications.map((text: string, idx: number) => (
                       <div key={idx} className="flex gap-2 animate-in fade-in slide-in-from-top-1">
                          <Input 
                            value={text}
                            onChange={(e) => updateListTextItem("highlightApplications", idx, e.target.value)}
                            placeholder="Ex: Baixo custo de manutenção"
                            className="rounded-xl h-11 bg-muted/20"
                          />
                          <Button variant="ghost" size="icon" onClick={() => removeListTextItem("highlightApplications", idx)} className="text-muted-foreground hover:text-destructive">
                             <Trash2 className="h-4 w-4" />
                          </Button>
                       </div>
                    ))}
                    {formData.highlightApplications.length === 0 && (
                       <div className="col-span-full py-8 text-center bg-muted/5 rounded-2xl border-2 border-dashed border-border/30">
                          <p className="text-sm text-muted-foreground">Nenhuma vantagem adicionada ainda.</p>
                       </div>
                    )}
                 </div>
              </div>
           </div>

           <div className="pt-8 border-t border-border/50">
              <h3 className="text-xl font-serif font-bold mb-4">Produtos Relacionados</h3>
              <p className="text-sm text-muted-foreground mb-4">Selecione máquinas similares para recomendar aos clientes.</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                 {allProducts.filter(p => p.id !== initialData?.id && p.productType === productType).map((product: any) => (
                    <div 
                       key={product.id}
                       onClick={() => {
                          const current = [...formData.relatedProducts];
                          if (current.includes(product.id)) {
                             setFormData({ ...formData, relatedProducts: current.filter(id => id !== product.id) });
                          } else {
                             setFormData({ ...formData, relatedProducts: [...current, product.id] });
                          }
                       }}
                       className={cn(
                          "p-3 rounded-2xl border transition-all cursor-pointer flex items-center gap-3",
                          formData.relatedProducts.includes(product.id)
                             ? "bg-primary/10 border-primary ring-2 ring-primary/20"
                             : "bg-background border-border hover:border-primary/50"
                       )}
                    >
                       <div className="h-10 w-10 relative bg-white rounded-lg border border-border/50 p-1 flex-shrink-0">
                          {product.mainImage && <Image src={product.mainImage} alt={product.name} fill className="object-contain" />}
                       </div>
                       <div className="flex flex-col min-w-0">
                          <span className="text-sm font-bold truncate">{product.name}</span>
                          <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">{product.brand?.name} • {product.category?.name}</span>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </TabsContent>

        {/* --- ABA SEO --- */}
        <TabsContent value="seo" className="space-y-6 focus-visible:outline-none max-w-3xl mx-auto">
           <div className="bg-muted/10 rounded-3xl border border-border/50 p-8 space-y-6">
              <div className="flex items-center gap-3 mb-4">
                 <div className="p-2 bg-primary/10 rounded-xl">
                    <Globe className="h-6 w-6 text-primary" />
                 </div>
                 <div>
                    <h3 className="text-xl font-serif font-bold">Otimização para Buscadores (SEO)</h3>
                    <p className="text-xs text-muted-foreground">Personalize como este {productType === "engine" ? "motor" : "máquina"} aparece no Google e Redes Sociais.</p>
                 </div>
              </div>

              <div className="space-y-2">
                 <Label htmlFor="metaTitle">Título SEO (Meta Title)</Label>
                 <Input 
                   id="metaTitle"
                   placeholder={productType === "engine" ? "Ex: Motor Weichai WP4.6N | CBMaq - Potência e Eficiência" : "Ex: Escavadeira Lovol FR220D | CBMaq - Potência e Eficiência"}
                   value={formData.metaTitle}
                   onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                   className="h-12 rounded-xl"
                 />
                 <p className="text-[10px] text-muted-foreground font-medium">Recomendado: 50-60 caracteres.</p>
              </div>

              <div className="space-y-2">
                 <Label htmlFor="metaDescription">Meta Description</Label>
                 <Textarea 
                   id="metaDescription"
                   placeholder="Descrição persuasiva para aparecer nos resultados de busca..."
                   value={formData.metaDescription}
                   onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                   className="rounded-xl min-h-[100px]"
                 />
                 <p className="text-[10px] text-muted-foreground font-medium">Recomendado: 150-160 caracteres.</p>
              </div>

              <div className="space-y-2">
                 <Label>Imagem Social (Open Graph)</Label>
                 <div className="relative aspect-[1200/630] w-full rounded-2xl border-2 border-dashed border-border/50 overflow-hidden bg-muted/20 flex items-center justify-center group">
                    {formData.ogImage ? (
                      <>
                        <Image src={formData.ogImage} alt="OG" fill className="object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <MediaPicker onSelect={(url) => setFormData({ ...formData, ogImage: url })} />
                        </div>
                      </>
                    ) : (
                      <MediaPicker onSelect={(url) => setFormData({ ...formData, ogImage: url })} />
                    )}
                 </div>
                 <p className="text-[10px] text-muted-foreground text-center font-bold uppercase tracking-widest mt-2">Fallback: Será usada a imagem principal se vazio.</p>
              </div>
           </div>
        </TabsContent>
      </Tabs>

      {/* MODAL DE IMPORTAÇÃO JSON */}
      {showImportModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4">
          <div className="bg-background w-full max-w-2xl rounded-3xl p-6 shadow-2xl overflow-y-auto max-h-[90vh]">
            <h3 className="text-xl font-bold mb-4 font-serif text-[#0A2A5E]">
              Importar Dados {productType === "engine" ? "do Motor" : "da Máquina"} via JSON
            </h3>
            <p className="text-sm text-muted-foreground mb-4">Cole o JSON contendo os dados abaixo.</p>
            
            <Textarea 
              value={importJsonText}
              onChange={(e) => setImportJsonText(e.target.value)}
              placeholder={productType === "engine" 
                ? `{\n  "name": "Série...",\n  "engineCode": "WP3N",\n  "technicalInfoTable": {\n    "columns": ["Família", "Modelo"],\n    "rows": [\n      { "Família": { "value": "WP3N", "rowSpan": 2 }, "Modelo": "Mod 1" },\n      { "Modelo": "Mod 2" }\n    ]\n  }\n}`
                : `{\n  "name": "Escavadeira Lovol FR220D",\n  "weight": "22.000 kg",\n  "power": "150 HP",\n  "technicalData": [\n    { "label": "Peso Operacional", "value": "22.000 kg" }\n  ]\n}`}
              className="h-[300px] font-mono text-xs rounded-xl"
            />
            
            <div className="flex justify-between items-center mt-6">
              <Button variant="outline" onClick={() => {
                const engineExample = {
                  "name": "Série de Motores a Diesel",
                  "slug": "serie-motores-diesel-wp3n",
                  "engineCode": "WP3N",
                  "mainFeaturesHtml": "<ul><li>Exemplo</li></ul>",
                  "technicalInfoTable": {
                    "columns": ["Família", "Modelo", "Emissão"],
                    "rows": [
                      { 
                        "Família": { "value": "WP3N", "rowSpan": 2 }, 
                        "Modelo": "WP3NQ140E61",
                        "Emissão": "Euro VI"
                      },
                      { 
                        "Modelo": "WP3NQ160E61",
                        "Emissão": "Euro VI"
                      }
                    ]
                  }
                };

                const machineExample = {
                  "name": "Escavadeira Lovol FR220D",
                  "slug": "escavadeira-lovol-fr220d",
                  "condition": "NOVO",
                  "classification": "Médio",
                  "weight": "22.000 kg",
                  "power": "150 HP",
                  "bucketCapacity": "1.0 m3",
                  "shortDescription": "Escavadeira potente e eficiente para grandes obras.",
                  "fullDescription": "A Escavadeira Lovol FR220D oferece alta durabilidade...",
                  "serviceDifferential": "Garantia de 2 anos com suporte técnico 24h.",
                  "recommendationText": "Ideal para infraestrutura, mineração e grandes construções.",
                  "metaTitle": "Escavadeira Lovol FR220D | CBMaq",
                  "metaDescription": "Conheça a Escavadeira Lovol FR220D. Potência, eficiência e garantia.",
                  "technicalData": [
                    { "label": "Peso Operacional", "value": "22.000 kg" },
                    { "label": "Potência Líquida", "value": "150 HP" },
                    { "label": "Capacidade da Caçamba", "value": "1.0 m3" },
                    { "label": "Força de Escavação", "value": "152 kN" }
                  ],
                  "differentials": [
                    "Cabine ROPS/FOPS com ar condicionado",
                    "Sistema hidráulico otimizado",
                    "Câmera de ré integrada"
                  ],
                  "recommendedApplications": [
                    "Construção Civil Pesada",
                    "Mineração e Extração",
                    "Obras de Infraestrutura"
                  ],
                  "highlightApplications": [
                    "Alta produtividade em qualquer terreno",
                    "Baixo consumo de combustível",
                    "Manutenção simplificada"
                  ]
                };

                const example = productType === "engine" ? engineExample : machineExample;
                const blob = new Blob([JSON.stringify(example, null, 2)], {type: "application/json"});
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = productType === "engine" ? "exemplo-motor.json" : "exemplo-maquina.json";
                a.click();
              }}>
                Baixar Modelo
              </Button>
              <div className="flex gap-2">
                <Button variant="ghost" onClick={() => setShowImportModal(false)}>Cancelar</Button>
                <Button onClick={() => {
                  try {
                    const parsed = JSON.parse(importJsonText);
                    if (productType === "engine") {
                      setFormData({
                        ...formData,
                        name: parsed.name || parsed.title || formData.name,
                        slug: parsed.slug || formData.slug,
                        engineCode: parsed.engineCode || formData.engineCode,
                        mainFeaturesHtml: parsed.mainFeaturesHtml || formData.mainFeaturesHtml,
                        technicalInfoTable: parsed.technicalInfoTable || formData.technicalInfoTable,
                        condition: parsed.condition || formData.condition,
                        order: parsed.order !== undefined ? parsed.order : formData.order,
                        shortDescription: parsed.shortDescription || formData.shortDescription,
                        differentials: parsed.differentials || formData.differentials,
                        recommendedApplications: parsed.recommendedApplications || formData.recommendedApplications,
                        highlightApplications: parsed.highlightApplications || formData.highlightApplications,
                        metaTitle: parsed.metaTitle || formData.metaTitle,
                        metaDescription: parsed.metaDescription || formData.metaDescription,
                      });
                    } else {
                      setFormData({
                        ...formData,
                        name: parsed.name || parsed.title || formData.name,
                        slug: parsed.slug || formData.slug,
                        condition: parsed.condition || formData.condition,
                        classification: parsed.classification || formData.classification,
                        weight: parsed.weight || formData.weight,
                        power: parsed.power || formData.power,
                        bucketCapacity: parsed.bucketCapacity || formData.bucketCapacity,
                        shortDescription: parsed.shortDescription || formData.shortDescription,
                        fullDescription: parsed.fullDescription || formData.fullDescription,
                        serviceDifferential: parsed.serviceDifferential || formData.serviceDifferential,
                        recommendationText: parsed.recommendationText || formData.recommendationText,
                        technicalData: parsed.technicalData || formData.technicalData,
                        differentials: parsed.differentials || formData.differentials,
                        recommendedApplications: parsed.recommendedApplications || formData.recommendedApplications,
                        highlightApplications: parsed.highlightApplications || formData.highlightApplications,
                        metaTitle: parsed.metaTitle || formData.metaTitle,
                        metaDescription: parsed.metaDescription || formData.metaDescription,
                        order: parsed.order !== undefined ? parsed.order : formData.order,
                      });
                    }
                    toast.success("Dados importados com sucesso!");
                    setShowImportModal(false);
                  } catch (e) {
                    toast.error("JSON inválido.");
                  }
                }}>Confirmar</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function PDFUploader({ onUpload }: { onUpload: (url: string) => void }) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      return toast.error("Por favor, selecione um arquivo PDF.");
    }

    setIsUploading(true);
    try {
      const { uploadImage } = await import("@/lib/supabase");
      const url = await uploadImage(file, "service_images");
      onUpload(url);
      toast.success("PDF enviado com sucesso!");
    } catch (error) {
      console.error("Error uploading PDF:", error);
      toast.error("Erro ao fazer upload do PDF.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="relative">
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept=".pdf"
        onChange={handleFileChange}
        disabled={isUploading}
      />
      <Button
        type="button"
        variant="outline"
        className="rounded-xl gap-2 font-bold text-xs uppercase tracking-wider"
        onClick={() => fileInputRef.current?.click()}
        disabled={isUploading}
      >
        {isUploading ? (
          <div className="h-4 w-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        ) : (
          <UploadCloud className="h-4 w-4" />
        )}
        {isUploading ? "Enviando..." : "Selecionar Arquivo"}
      </Button>
    </div>
  );
}
