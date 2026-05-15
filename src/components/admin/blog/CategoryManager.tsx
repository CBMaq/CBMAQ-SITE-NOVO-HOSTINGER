"use client";

import { useState } from "react";
import { 
  Plus, 
  Trash2, 
  Search,
  MoreVertical,
  PlusCircle
} from "lucide-react";
import { 
  createCategory, 
  deleteCategory 
} from "@/app/actions/blog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

interface Category {
  id: string;
  name: string;
  slug: string;
  _count: {
    posts: number;
  };
}

interface CategoryManagerProps {
  initialCategories: Category[];
}

export function CategoryManager({ initialCategories }: CategoryManagerProps) {
  const [categories, setCategories] = useState(initialCategories);
  const [searchTerm, setSearchTerm] = useState("");
  const [newName, setNewName] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  async function handleAdd() {
    if (!newName.trim()) return;
    setIsAdding(true);

    const result = await createCategory(newName);

    if (result.success && result.data) {
      setCategories([...categories, { ...result.data, _count: { posts: 0 } }].sort((a, b) => a.name.localeCompare(b.name)));
      setNewName("");
      setIsDialogOpen(false);
    } else {
      alert(result.error);
    }
    setIsAdding(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Tem certeza que deseja excluir esta categoria?")) return;

    const result = await deleteCategory(id);
    if (result.success) {
      setCategories(categories.filter((cat) => cat.id !== id));
    } else {
      alert(result.error);
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

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="h-11 rounded-xl px-6 gap-2 bg-primary hover:bg-primary/90">
              <Plus className="h-5 w-5" />
              Nova Categoria
            </Button>
          </DialogTrigger>
          <DialogContent className="rounded-3xl max-w-md">
            <DialogHeader>
              <DialogTitle className="text-2xl font-serif">Nova Categoria</DialogTitle>
              <DialogDescription>
                Dê um nome claro para a categoria. O link (slug) será gerado automaticamente.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <Input
                placeholder="Ex: Peças, Manutenção, Notícias..."
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="h-12 rounded-xl"
                onKeyDown={(e) => e.key === "Enter" && handleAdd()}
              />
            </div>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setIsDialogOpen(false)}
                className="rounded-xl"
              >
                Cancelar
              </Button>
              <Button 
                onClick={handleAdd} 
                disabled={isAdding}
                className="rounded-xl min-w-[100px]"
              >
                {isAdding ? "Salvando..." : "Salvar"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-background border border-border rounded-3xl overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow className="hover:bg-transparent border-none">
              <TableHead className="py-4">Nome</TableHead>
              <TableHead>Slug (Link)</TableHead>
              <TableHead className="text-center">Postagens</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCategories.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-32 text-center text-muted-foreground">
                  Nenhuma categoria encontrada.
                </TableCell>
              </TableRow>
            ) : (
              filteredCategories.map((category) => (
                <TableRow key={category.id} className="group transition-colors border-border/50">
                  <TableCell className="font-medium py-4">{category.name}</TableCell>
                  <TableCell className="text-muted-foreground text-sm font-mono">
                    /{category.slug}
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="inline-flex items-center justify-center bg-primary/10 text-primary rounded-full px-2.5 py-0.5 text-xs font-bold">
                      {category._count.posts}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full"
                      onClick={() => handleDelete(category.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
