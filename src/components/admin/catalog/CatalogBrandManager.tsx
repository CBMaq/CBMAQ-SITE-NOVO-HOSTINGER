"use client";

import { useState } from "react";
import { 
  Plus, 
  Trash2, 
  Search,
  Edit2,
  BadgeCheck,
  ImageIcon
} from "lucide-react";
import { 
  createCatalogBrand, 
  updateCatalogBrand, 
  deleteCatalogBrand 
} from "@/app/actions/catalog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MediaPicker } from "@/components/admin/blog/MediaPicker";
import { toast } from "sonner";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface Brand {
  id: string;
  name: string;
  slug: string;
  logo: string | null;
  coverImage: string | null;
  description: string | null;
  order: number;
  active: boolean;
  _count?: {
    products: number;
  };
}

interface CatalogBrandManagerProps {
  initialBrands: Brand[];
}

export function CatalogBrandManager({ initialBrands }: CatalogBrandManagerProps) {
  const [brands, setBrands] = useState(initialBrands);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    logo: "",
    coverImage: "",
    order: 0,
    active: true
  });

  const filteredBrands = brands.filter((brand) =>
    brand.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredBrands.length / itemsPerPage);
  const paginatedBrands = filteredBrands.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  function resetForm() {
    setFormData({
      name: "",
      description: "",
      logo: "",
      coverImage: "",
      order: 0,
      active: true
    });
    setEditingBrand(null);
  }

  function handleEdit(brand: Brand) {
    setEditingBrand(brand);
    setFormData({
      name: brand.name,
      description: brand.description || "",
      logo: brand.logo || "",
      coverImage: brand.coverImage || "",
      order: brand.order,
      active: brand.active
    });
    setIsDialogOpen(true);
  }

  async function handleSubmit() {
    if (!formData.name.trim()) {
      toast.error("O nome da marca é obrigatório.");
      return;
    }
    
    setIsLoading(true);

    try {
      if (editingBrand) {
        const result = await updateCatalogBrand(editingBrand.id, formData);
        if (result.success) {
          setBrands(prev => 
            prev.map(b => b.id === editingBrand.id ? { ...b, ...formData } : b)
            .sort((a, b) => a.order - b.order)
          );
          toast.success("Marca atualizada com sucesso!");
          setIsDialogOpen(false);
          resetForm();
        } else {
          toast.error(result.error);
        }
      } else {
        const result = await createCatalogBrand(formData);
        if (result.success && result.data) {
          setBrands(prev => [...prev, { ...result.data, _count: { products: 0 } }]
            .sort((a, b) => a.order - b.order)
          );
          toast.success("Marca criada com sucesso!");
          setIsDialogOpen(false);
          resetForm();
        } else {
          toast.error(result.error);
        }
      }
    } catch (error) {
      toast.error("Ocorreu um erro ao salvar a marca.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Tem certeza que deseja excluir esta marca? Isso pode afetar os produtos vinculados.")) return;

    const result = await deleteCatalogBrand(id);
    if (result.success) {
      setBrands(prev => prev.filter((b) => b.id !== id));
      toast.success("Marca excluída.");
    } else {
      toast.error(result.error);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar marcas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-11 rounded-xl"
          />
        </div>

        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button className="h-11 rounded-xl px-6 gap-2 bg-primary hover:bg-primary/90 text-white font-bold">
              <Plus className="h-5 w-5" />
              Nova Marca
            </Button>
          </DialogTrigger>
          <DialogContent className="rounded-3xl max-w-2xl overflow-y-auto max-h-[90vh]">
            <DialogHeader>
              <DialogTitle className="text-2xl font-serif font-bold">
                {editingBrand ? "Editar Marca" : "Nova Marca"}
              </DialogTitle>
              <DialogDescription>
                Configure os detalhes da fabricante para o catálogo.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
              <div className="space-y-4 md:col-span-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome da Marca</Label>
                  <Input
                    id="name"
                    placeholder="Ex: Lovol"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="h-12 rounded-xl"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Descrição Opcional</Label>
                  <Textarea
                    id="description"
                    placeholder="Breve história ou detalhes da marca..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="rounded-xl min-h-[100px]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Logo da Marca</Label>
                <div className="relative aspect-video rounded-2xl border-2 border-dashed border-border/50 overflow-hidden bg-muted/20 flex items-center justify-center group">
                  {formData.logo ? (
                    <>
                      <Image 
                        src={formData.logo} 
                        alt="Logo" 
                        fill 
                        className="object-contain p-4"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <MediaPicker onSelect={(url) => setFormData({ ...formData, logo: url })} />
                      </div>
                    </>
                  ) : (
                    <MediaPicker onSelect={(url) => setFormData({ ...formData, logo: url })} />
                  )}
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Imagem de Capa (Carrossel)</Label>
                  <div className="relative aspect-video rounded-2xl border-2 border-dashed border-border/50 overflow-hidden bg-muted/20 flex items-center justify-center group">
                    {formData.coverImage ? (
                      <>
                        <Image 
                          src={formData.coverImage} 
                          alt="Cover" 
                          fill 
                          sizes="400px"
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <MediaPicker onSelect={(url) => setFormData({ ...formData, coverImage: url })} />
                        </div>
                      </>
                    ) : (
                      <MediaPicker onSelect={(url) => setFormData({ ...formData, coverImage: url })} />
                    )}
                  </div>
                </div>

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

                <div className="flex items-center justify-between p-4 bg-muted/20 rounded-2xl border border-border/50 h-12">
                  <Label htmlFor="active" className="cursor-pointer">Status: {formData.active ? "Ativo" : "Inativo"}</Label>
                  <Switch
                    id="active"
                    checked={formData.active}
                    onCheckedChange={(checked) => setFormData({ ...formData, active: checked })}
                  />
                </div>
              </div>
            </div>

            <DialogFooter className="gap-2">
              <Button 
                variant="outline" 
                onClick={() => setIsDialogOpen(false)}
                className="rounded-xl h-12"
              >
                Cancelar
              </Button>
              <Button 
                onClick={handleSubmit} 
                disabled={isLoading}
                className="rounded-xl h-12 min-w-[120px] bg-primary hover:bg-primary/90 text-white font-bold"
              >
                {isLoading ? "Salvando..." : "Salvar Marca"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-background border border-border rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow className="hover:bg-transparent border-none">
                <TableHead className="w-[100px] py-4">Logo</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead className="text-center">Ordem</TableHead>
                <TableHead className="text-center">Produtos</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedBrands.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-32 text-center text-muted-foreground">
                    Nenhuma marca encontrada.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedBrands.map((brand) => (
                  <TableRow key={brand.id} className="group transition-colors border-border/50">
                    <TableCell className="py-3">
                      <div className="relative h-10 w-20 rounded-lg bg-white overflow-hidden border border-border/50 p-1">
                        {brand.logo ? (
                          <Image src={brand.logo} alt={brand.name} fill sizes="80px" className="object-contain" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <ImageIcon className="h-4 w-4 text-muted-foreground/30" />
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-bold text-[#0A2A5E]">{brand.name}</TableCell>
                    <TableCell className="text-muted-foreground text-xs font-mono">
                      /{brand.slug}
                    </TableCell>
                    <TableCell className="text-center font-medium">
                      {brand.order}
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="inline-flex items-center justify-center bg-primary/10 text-primary rounded-full px-2.5 py-0.5 text-xs font-bold">
                        {brand._count?.products || 0}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className={cn(
                        "inline-flex items-center justify-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                        brand.active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      )}>
                        {brand.active ? "Ativo" : "Inativo"}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-9 w-9 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full"
                          onClick={() => handleEdit(brand)}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-9 w-9 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full"
                          onClick={() => handleDelete(brand.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Paginação */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 py-6 border-t border-border/50 bg-muted/10">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="rounded-xl px-4 font-bold text-[10px] uppercase tracking-wider border-border/50"
            >
              Anterior
            </Button>
            <div className="text-xs font-bold text-muted-foreground bg-background px-4 py-2 rounded-xl border border-border/50">
              Página {page} de {totalPages}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="rounded-xl px-4 font-bold text-[10px] uppercase tracking-wider border-border/50"
            >
              Próxima
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
