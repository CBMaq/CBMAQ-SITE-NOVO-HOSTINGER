"use client";

import { MediaGallery } from "@/components/admin/blog/MediaGallery";
import { 
  ImageIcon, 
  Upload, 
  ArrowLeft,
  LayoutGrid
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function GalleryPage() {
  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-background/80 backdrop-blur-sm py-4 border-b border-border/50 sticky top-0 z-20 -mx-4 px-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild className="rounded-full">
            <Link href="/admin/dashboard">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
             <h1 className="text-2xl font-serif font-bold tracking-tight">Galeria de Mídia</h1>
             <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Gerencie os ativos visuais da CBMaq</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl px-4 gap-2 border-border/50">
            <LayoutGrid className="h-4 w-4" />
            Visualização em Blocos
          </Button>
          {/* O upload aqui pode ser integrado futuramente de forma mais direta, 
              mas por enquanto o MediaGallery já permite gerenciar */}
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-background border border-border/50 rounded-[2.5rem] p-8 shadow-sm min-h-[600px]">
        <MediaGallery />
      </div>

      {/* Dica / Info */}
      <div className="bg-primary/5 rounded-3xl p-6 border border-primary/10 max-w-2xl">
         <h4 className="font-bold text-primary mb-2 flex items-center gap-2">
            <ImageIcon className="h-4 w-4" />
            Dica do Especialista
         </h4>
         <p className="text-sm text-muted-foreground leading-relaxed">
            Mantenha sua galeria organizada! Ao renomear imagens, tente usar termos descritivos (ex: <code>escavadeira-cat-320.jpg</code>) 
            em vez de nomes genéricos. Isso ajuda no SEO do site e facilita a busca futura.
         </p>
      </div>
    </div>
  );
}
