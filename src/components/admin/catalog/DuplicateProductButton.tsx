"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Loader2 } from "lucide-react";
import { duplicateCatalogProduct } from "@/app/actions/catalog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface DuplicateProductButtonProps {
  productId: string;
  basePath?: string;
}

export function DuplicateProductButton({ productId, basePath = "/admin/catalogo/produtos" }: DuplicateProductButtonProps) {
  const [isDuplicating, setIsDuplicating] = useState(false);
  const router = useRouter();

  async function handleDuplicate() {
    setIsDuplicating(true);
    try {
      const result = await duplicateCatalogProduct(productId);
      if (result.success && result.data) {
        toast.success("Produto duplicado com sucesso! Redirecionando para edição...");
        // Pequeno delay para o usuário ler o toast
        setTimeout(() => {
          router.push(`${basePath}/editar/${result.data.id}`);
        }, 1000);
      } else {
        toast.error(result.error || "Erro ao duplicar produto.");
      }
    } catch (error) {
      toast.error("Ocorreu um erro inesperado.");
    } finally {
      setIsDuplicating(false);
    }
  }

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      className="h-8 w-8 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
      disabled={isDuplicating}
      onClick={handleDuplicate}
      title="Duplicar"
    >
      {isDuplicating ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Copy className="h-4 w-4" />
      )}
    </Button>
  );
}
