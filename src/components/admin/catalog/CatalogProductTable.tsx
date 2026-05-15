"use client";

import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Edit3, ImageIcon, Star, Trash2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { DeleteProductButton } from "./DeleteProductButton";
import { DuplicateProductButton } from "./DuplicateProductButton";
import { toggleCatalogProductStatus, deleteManyCatalogProducts } from "@/app/actions/catalog";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface CatalogProductTableProps {
  initialProducts: any[];
  basePath?: string;
  type?: "machine" | "engine";
}

export function CatalogProductTable({ initialProducts, basePath = "/admin/catalogo/produtos", type = "machine" }: CatalogProductTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isDeletingBulk, setIsDeletingBulk] = useState(false);

  const filteredProducts = initialProducts.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brand?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const isEngine = type === "engine";

  const allOnPageSelected = paginatedProducts.length > 0 && paginatedProducts.every((p: any) => selectedIds.includes(p.id));

  const toggleSelectAll = () => {
    if (allOnPageSelected) {
      setSelectedIds(selectedIds.filter(id => !paginatedProducts.find((p: any) => p.id === id)));
    } else {
      const newIds = [...selectedIds];
      paginatedProducts.forEach((p: any) => {
        if (!newIds.includes(p.id)) newIds.push(p.id);
      });
      setSelectedIds(newIds);
    }
  };

  const toggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(i => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleBulkDelete = async () => {
    if (!window.confirm(`Tem certeza que deseja excluir ${selectedIds.length} iten(s)? Esta ação não pode ser desfeita.`)) {
      return;
    }
    
    setIsDeletingBulk(true);
    try {
      const result = await deleteManyCatalogProducts(selectedIds);
      if (result.success) {
        toast.success(`${selectedIds.length} iten(s) excluído(s) com sucesso.`);
        setSelectedIds([]);
      } else {
        toast.error(result.error || "Erro ao excluir itens.");
      }
    } catch (e) {
      toast.error("Erro inesperado ao excluir.");
    } finally {
      setIsDeletingBulk(false);
    }
  };

  return (
    <div className="bg-background border border-border rounded-3xl overflow-hidden shadow-sm">
      <div className="p-4 border-b border-border bg-muted/20 flex flex-col md:flex-row gap-4 justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Pesquisar..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
            className="pl-10 h-10 rounded-xl"
          />
        </div>

        {selectedIds.length > 0 && (
          <div className="flex items-center gap-3 animate-in fade-in slide-in-from-right-4">
            <span className="text-sm font-medium text-muted-foreground">
              {selectedIds.length} selecionado(s)
            </span>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleBulkDelete}
              disabled={isDeletingBulk}
              className="rounded-xl font-bold shadow-lg shadow-destructive/20 h-10"
            >
              {isDeletingBulk ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Trash2 className="h-4 w-4 mr-2" />}
              Excluir Selecionados
            </Button>
          </div>
        )}
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-muted/30 text-xs uppercase tracking-wider font-bold">
            <TableRow className="hover:bg-transparent border-border/50">
              <TableHead className="w-[40px] text-center">
                <input 
                  type="checkbox" 
                  checked={allOnPageSelected}
                  onChange={toggleSelectAll}
                  className="w-4 h-4 rounded border-border text-primary focus:ring-primary cursor-pointer accent-primary"
                />
              </TableHead>
              <TableHead className="w-[80px] py-4 text-center">Foto</TableHead>
              <TableHead>Nome / Modelo</TableHead>
              {!isEngine && (
                <>
                  <TableHead>Marca</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead className="text-center">Classe</TableHead>
                </>
              )}
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedProducts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={isEngine ? 5 : 8} className="h-32 text-center text-muted-foreground">
                  Nenhum registro encontrado.
                </TableCell>
              </TableRow>
            ) : (
              paginatedProducts.map((product: any) => (
                <TableRow key={product.id} className={cn("group hover:bg-muted/30 transition-colors border-border/50", selectedIds.includes(product.id) && "bg-primary/5")}>
                  <TableCell className="text-center">
                    <input 
                      type="checkbox" 
                      checked={selectedIds.includes(product.id)}
                      onChange={() => toggleSelect(product.id)}
                      className="w-4 h-4 rounded border-border text-primary focus:ring-primary cursor-pointer accent-primary"
                    />
                  </TableCell>
                  <TableCell className="py-3">
                    <div className="relative h-12 w-16 rounded-lg bg-white overflow-hidden border border-border/50 mx-auto">
                      {product.mainImage ? (
                        <Image src={product.mainImage} alt={product.name} fill sizes="64px" className="object-contain p-1" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-muted/50">
                          <ImageIcon className="h-4 w-4 text-muted-foreground/30" />
                        </div>
                      )}
                      {product.featured && (
                        <div className="absolute top-0 right-0 p-0.5 bg-yellow-400 text-white rounded-bl-md shadow-sm">
                          <Star className="h-2 w-2 fill-current" />
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-[#0A2A5E] group-hover:text-primary transition-colors">
                        {product.name}
                      </span>
                      <span className="text-[10px] text-muted-foreground font-mono">
                        /{product.slug}
                      </span>
                    </div>
                  </TableCell>
                  {!isEngine && (
                    <>
                      <TableCell>
                        <Badge variant="outline" className="bg-white text-muted-foreground font-bold rounded-lg border-border/50">
                          {product.brand?.name || "Sem marca"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 font-bold rounded-lg border-none">
                          {product.category?.name || "Sem categoria"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                         <span className="text-xs font-medium text-muted-foreground">
                            {product.classification}
                         </span>
                      </TableCell>
                    </>
                  )}
                  <TableCell className="text-center">
                    <StatusToggle productId={product.id} initialStatus={product.active} />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-muted-foreground hover:text-primary transition-colors" asChild title="Editar">
                        <Link href={`${basePath}/editar/${product.id}`}>
                          <Edit3 className="h-4 w-4" />
                        </Link>
                      </Button>
                      <DuplicateProductButton productId={product.id} basePath={basePath} />
                      <DeleteProductButton productId={product.id} productName={product.name} />
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
  );
}

function StatusToggle({ productId, initialStatus }: { productId: string; initialStatus: boolean }) {
  const [active, setActive] = useState(initialStatus);
  const [isLoading, setIsLoading] = useState(false);

  async function handleToggle() {
    setIsLoading(true);
    try {
      const result = await toggleCatalogProductStatus(productId);
      if (result.success) {
        setActive(!!result.active);
        toast.success(`Status alterado para ${result.active ? 'Ativo' : 'Inativo'}`);
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error("Erro ao alternar status.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center gap-3">
      <span className={cn(
        "text-[10px] font-bold uppercase tracking-wider",
        active ? "text-emerald-600" : "text-muted-foreground"
      )}>
        {active ? "Ativo" : "Inativo"}
      </span>
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
      ) : (
        <Switch
          checked={active}
          onCheckedChange={handleToggle}
          className="data-[state=checked]:bg-emerald-500 scale-90"
        />
      )}
    </div>
  );
}
