"use client";

import { useState } from "react";
import { 
  Plus, 
  Trash2, 
  Search,
  Edit2,
  FolderTree,
  ImageIcon,
  ArrowUpDown
} from "lucide-react";
import { 
  createCatalogCategory, 
  updateCatalogCategory, 
  deleteCatalogCategory 
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

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  coverImage: string | null;
  icon: string | null;
  order: number;
  active: boolean;
  _count?: {
    products: number;
  };
}

interface CatalogCategoryManagerProps {
  initialCategories: Category[];
}

export function CatalogCategoryManager({ initialCategories }: CatalogCategoryManagerProps) {
  const [categories, setCategories] = useState(initialCategories);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    coverImage: "",
    icon: "",
    order: 0,
    active: true
  });

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  const paginatedCategories = filteredCategories.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  function resetForm() {
    setFormData({
      name: "",
      description: "",
      coverImage: "",
      icon: "",
      order: 0,
      active: true
    });
    setEditingCategory(null);
  }

  function handleEdit(category: Category) {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description || "",
      coverImage: category.coverImage || "",
      icon: category.icon || "",
      order: category.order,
      active: category.active
    });
    setIsDialogOpen(true);
  }

  async function handleSubmit() {
    if (!formData.name.trim()) {
      toast.error("O nome da categoria é obrigatório.");
      return;
    }
    
    setIsLoading(true);

    try {
      if (editingCategory) {
        const result = await updateCatalogCategory(editingCategory.id, formData);
        if (result.success) {
          setCategories(prev => 
            prev.map(c => c.id === editingCategory.id ? { ...c, ...formData } : c)
            .sort((a, b) => a.order - b.order)
          );
          toast.success("Categoria atualizada com sucesso!");
          setIsDialogOpen(false);
          resetForm();
        } else {
          toast.error(result.error);
        }
      } else {
        const result = await createCatalogCategory(formData);
        if (result.success && result.data) {
          setCategories(prev => [...prev, { ...result.data, _count: { products: 0 } }]
            .sort((a, b) => a.order - b.order)
          );
          toast.success("Categoria criada com sucesso!");
          setIsDialogOpen(false);
          resetForm();
        } else {
          toast.error(result.error);
        }
      }
    } catch (error) {
      toast.error("Ocorreu um erro ao salvar a categoria.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Tem certeza que deseja excluir esta categoria? Isso pode afetar os produtos vinculados.")) return;

    const result = await deleteCatalogCategory(id);
    if (result.success) {
      setCategories(prev => prev.filter((cat) => cat.id !== id));
      toast.success("Categoria excluída.");
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
            placeholder="Buscar categorias..."
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
              Nova Categoria
            </Button>
          </DialogTrigger>
          <DialogContent className="rounded-3xl max-w-2xl overflow-y-auto max-h-[90vh]">
            <DialogHeader>
              <DialogTitle className="text-2xl font-serif font-bold">
                {editingCategory ? "Editar Categoria" : "Nova Categoria"}
              </DialogTitle>
              <DialogDescription>
                Configure os detalhes da categoria para o catálogo.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
              <div className="space-y-4 md:col-span-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome da Categoria</Label>
                  <Input
                    id="name"
                    placeholder="Ex: Escavadeiras"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="h-12 rounded-xl"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Descrição Curta</Label>
                  <Textarea
                    id="description"
                    placeholder="Uma breve descrição sobre esta categoria de máquinas..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="rounded-xl min-h-[100px]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Imagem de Capa</Label>
                <div className="relative aspect-video rounded-2xl border-2 border-dashed border-border/50 overflow-hidden bg-muted/20 flex items-center justify-center group">
                  {formData.coverImage ? (
                    <>
                      <Image 
                        src={formData.coverImage} 
                        alt="Capa" 
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
                <Label>Ícone (Opcional)</Label>
                <div className="relative aspect-square w-24 rounded-2xl border-2 border-dashed border-border/50 overflow-hidden bg-muted/20 flex items-center justify-center group mx-auto">
                  {formData.icon ? (
                    <>
                      <Image 
                        src={formData.icon} 
                        alt="Ícone" 
                        fill 
                        sizes="80px"
                        className="object-contain p-2"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <MediaPicker onSelect={(url) => setFormData({ ...formData, icon: url })} />
                      </div>
                    </>
                  ) : (
                    <MediaPicker onSelect={(url) => setFormData({ ...formData, icon: url })} />
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

              <div className="flex items-center justify-between p-4 bg-muted/20 rounded-2xl border border-border/50 h-12 mt-auto">
                <Label htmlFor="active" className="cursor-pointer">Status: {formData.active ? "Ativo" : "Inativo"}</Label>
                <Switch
                  id="active"
                  checked={formData.active}
                  onCheckedChange={(checked) => setFormData({ ...formData, active: checked })}
                />
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
                {isLoading ? "Salvando..." : "Salvar Categoria"}
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
                <TableHead className="w-[80px] py-4">Capa</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead className="text-center">Ordem</TableHead>
                <TableHead className="text-center">Produtos</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedCategories.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-32 text-center text-muted-foreground">
                    Nenhuma categoria encontrada.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedCategories.map((category) => (
                  <TableRow key={category.id} className="group transition-colors border-border/50">
                    <TableCell className="py-3">
                      <div className="relative h-12 w-16 rounded-lg bg-muted overflow-hidden border border-border/50">
                        {category.coverImage ? (
                          <Image src={category.coverImage} alt={category.name} fill sizes="80px" className="object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <ImageIcon className="h-4 w-4 text-muted-foreground/30" />
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-bold text-[#0A2A5E]">{category.name}</TableCell>
                    <TableCell className="text-muted-foreground text-xs font-mono">
                      /{category.slug}
                    </TableCell>
                    <TableCell className="text-center font-medium">
                      {category.order}
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="inline-flex items-center justify-center bg-primary/10 text-primary rounded-full px-2.5 py-0.5 text-xs font-bold">
                        {category._count?.products || 0}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className={cn(
                        "inline-flex items-center justify-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                        category.active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      )}>
                        {category.active ? "Ativo" : "Inativo"}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-9 w-9 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full"
                          onClick={() => handleEdit(category)}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-9 w-9 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full"
                          onClick={() => handleDelete(category.id)}
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
