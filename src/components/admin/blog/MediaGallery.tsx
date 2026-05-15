"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback, useRef } from "react";
import { 
  Loader2, 
  Search, 
  Trash2, 
  ExternalLink, 
  Copy, 
  Calendar, 
  Database,
  Image as ImageIcon,
  Check,
  X,
  Plus,
  Upload,
  FileText
} from "lucide-react";
import { supabase, uploadImage } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface MediaFile {
  name: string;
  id: string;
  created_at: string;
  last_accessed_at: string;
  metadata: {
    size: number;
    mimetype: string;
  } | null;
}

interface MediaGalleryProps {
  onSelect?: (url: string) => void;
  bucketName?: string;
  allowSelection?: boolean;
  fileFilter?: "all" | "image" | "pdf";
}

export function MediaGallery({ 
  onSelect, 
  bucketName = "service_images",
  allowSelection = false,
  fileFilter = "all"
}: MediaGalleryProps) {
  const [loading, setLoading] = useState(true);
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [search, setSearch] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [bulkDeleteConfirm, setBulkDeleteConfirm] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const itemsPerPage = 50;
  const dragCounter = useRef(0);

  const fetchFiles = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.storage
        .from(bucketName)
        .list("", {
          limit: 100, // Busca mais para garantir o preenchimento pós-filtro
          offset: (page - 1) * itemsPerPage,
          sortBy: { column: "created_at", order: "desc" },
        });

      if (error) throw error;
      
      const results = (data as any[] || []).filter(
        (f) => f.metadata !== null && f.name !== ".emptyFolderPlaceholder" && f.id !== null
      ).filter((f) => {
        if (fileFilter === "all") return true;
        const mime = f.metadata?.mimetype || "";
        if (fileFilter === "pdf") return mime === "application/pdf";
        if (fileFilter === "image") return mime.startsWith("image/");
        return true;
      });

      // Se retornou mais que o esperado (considerando o limite real de exibição)
      setHasNextPage(results.length > itemsPerPage);
      setFiles(results.slice(0, itemsPerPage));
    } catch (error) {
      console.error("Erro ao carregar galeria:", error);
      toast.error("Não foi possível carregar a galeria de imagens.");
    } finally {
      setLoading(false);
    }
  }, [bucketName, page, itemsPerPage]);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  const handleDelete = async () => {
    if (!deleteConfirm) return;

    try {
      setIsDeleting(true);
      const { error } = await supabase.storage
        .from(bucketName)
        .remove([deleteConfirm]);

      if (error) throw error;

      toast.success("Imagem removida com sucesso.");
      setFiles((prev) => prev.filter((f) => f.name !== deleteConfirm));
      setSelectedFiles((prev) => prev.filter((name) => name !== deleteConfirm));
      setDeleteConfirm(null);
    } catch (error) {
      console.error("Erro ao deletar arquivo:", error);
      toast.error("Erro ao remover a imagem.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedFiles.length === 0) return;

    try {
      setIsDeleting(true);
      const { error } = await supabase.storage
        .from(bucketName)
        .remove(selectedFiles);

      if (error) throw error;

      toast.success(`${selectedFiles.length} imagens removidas com sucesso.`);
      setFiles((prev) => prev.filter((f) => !selectedFiles.includes(f.name)));
      setSelectedFiles([]);
      setBulkDeleteConfirm(false);
    } catch (error) {
      console.error("Erro ao deletar arquivos:", error);
      toast.error("Erro ao remover as imagens selecionadas.");
    } finally {
      setIsDeleting(false);
    }
  };

  const toggleSelect = (name: string) => {
    setSelectedFiles((prev) => 
      prev.includes(name) 
        ? prev.filter((n) => n !== name) 
        : [...prev, name]
    );
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      if (e.type === "dragenter") dragCounter.current++;
      setDragActive(true);
    } else if (e.type === "dragleave") {
      dragCounter.current--;
      if (dragCounter.current <= 0) {
        setDragActive(false);
      }
    }
  };

  const handleFiles = async (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    
    setIsUploading(true);
    const filesArray = Array.from(fileList);
    let successCount = 0;
    let failCount = 0;

    const uploadToast = toast.loading(`Subindo ${filesArray.length > 1 ? `${filesArray.length} imagens...` : "imagem..."}`);

    try {
      for (const file of filesArray) {
        try {
          // A função uploadImage em lib/supabase já lida com sanitização e duplicatas
          await uploadImage(file, bucketName);
          successCount++;
        } catch (err) {
          console.error(`Erro ao subir ${file.name}:`, err);
          failCount++;
        }
      }

      if (successCount > 0) {
        toast.success(
          successCount === 1 
            ? "Imagem enviada com sucesso!" 
            : `${successCount} imagens enviadas com sucesso!`,
          { id: uploadToast }
        );
        fetchFiles(); // Recarrega a galeria
      } else {
        toast.error("Falha ao enviar as imagens.", { id: uploadToast });
      }

      if (failCount > 0) {
        toast.error(`${failCount} arquivos falharam no upload.`);
      }
    } finally {
      setIsUploading(false);
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    dragCounter.current = 0;
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const getPublicUrl = (name: string) => {
    return supabase.storage.from(bucketName).getPublicUrl(name).data.publicUrl;
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success("Link copiado para a área de transferência!");
  };

  const filteredFiles = files.filter((file) =>
    file.name.toLowerCase().includes(search.toLowerCase())
  );

  const formatSize = (bytes: number | undefined) => {
    if (bytes === undefined || bytes === null) return "0 KB";
    const kb = bytes / 1024;
    if (kb > 1024) return (kb / 1024).toFixed(1) + " MB";
    return kb.toFixed(0) + " KB";
  };

  return (
    <div className="space-y-6">
      {/* Header & Busca */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:min-w-[280px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar imagens..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 rounded-xl bg-muted/20 border-border/50 focus-visible:ring-primary/20"
            />
          </div>
          
          <div className="flex gap-2">
            <input
              type="file"
              id="file-upload"
              multiple
              accept={fileFilter === "pdf" ? ".pdf,application/pdf" : fileFilter === "image" ? "image/*" : "image/*,.pdf,application/pdf"}
              className="hidden"
              onChange={(e) => handleFiles(e.target.files)}
              disabled={isUploading}
            />
            <Button 
              onClick={() => document.getElementById("file-upload")?.click()}
              disabled={isUploading}
              className="rounded-xl px-4 gap-2 bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 transition-all font-bold text-xs uppercase tracking-wider"
            >
              {isUploading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Plus className="h-4 w-4" />
              )}
              {isUploading ? "Subindo..." : "Adicionar Mídia"}
            </Button>

            {selectedFiles.length > 0 && (
              <Button 
                variant="destructive"
                onClick={() => setBulkDeleteConfirm(true)}
                className="rounded-xl px-4 gap-2 shadow-lg shadow-destructive/20 transition-all font-bold text-xs uppercase tracking-wider"
              >
                <Trash2 className="h-4 w-4" />
                Excluir ({selectedFiles.length})
              </Button>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 text-[10px] text-muted-foreground uppercase tracking-widest font-bold bg-muted/10 px-3 py-1.5 rounded-full border border-border/50">
          <Database className="h-3 w-3 text-primary/60" />
          <span>{files.length} arquivos nesta página</span>
        </div>
      </div>

      {/* Grid de Imagens com Área de Drop */}
      <div 
        className={cn(
          "relative min-h-[400px] transition-all duration-300",
          dragActive && "scale-[0.99]"
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {/* Overlay de Drag Active */}
        {dragActive && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-primary/10 backdrop-blur-[2px] rounded-3xl border-4 border-dashed border-primary animate-in fade-in zoom-in duration-300 pointer-events-none">
            <div className="p-6 bg-background rounded-full shadow-2xl animate-bounce">
              <Upload className="h-12 w-12 text-primary" />
            </div>
            <p className="mt-4 text-xl font-serif font-bold text-primary">Solte para fazer upload</p>
            <p className="text-sm text-primary/60 font-medium">Suas imagens serão organizadas automaticamente</p>
          </div>
        )}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground animate-pulse">Carregando sua galeria...</p>
        </div>
      ) : filteredFiles.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-muted/10 rounded-3xl border-2 border-dashed border-border/50 text-center px-6">
          <div className="p-4 bg-background rounded-full mb-4 shadow-sm">
            <ImageIcon className="h-10 w-10 text-muted-foreground/40" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">Nenhuma imagem encontrada</h3>
          <p className="text-sm text-muted-foreground max-w-xs mx-auto mt-2">
            Comece subindo suas imagens através da página de postagens ou arraste arquivos para cá.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-6">
          {filteredFiles.map((file) => {
            const url = getPublicUrl(file.name);
            return (
              <div 
                key={file.id} 
                className={cn(
                  "group relative bg-background rounded-2xl border border-border shadow-sm overflow-hidden transition-all hover:shadow-xl hover:shadow-primary/5 flex flex-col",
                  selectedFiles.includes(file.name) && "border-primary ring-2 ring-primary/20"
                )}
              >
                {/* Selection Overlay Checkbox */}
                <div 
                  className={cn(
                    "absolute top-3 left-3 z-30 transition-all duration-300",
                    selectedFiles.includes(file.name) ? "opacity-100 scale-100" : "opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100"
                  )}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSelect(file.name);
                    }}
                    className={cn(
                      "h-6 w-6 rounded-lg flex items-center justify-center border-2 transition-all",
                      selectedFiles.includes(file.name) 
                        ? "bg-primary border-primary text-white shadow-lg shadow-primary/20" 
                        : "bg-white/80 backdrop-blur-sm border-white text-transparent hover:border-primary/50"
                    )}
                  >
                    <Check className="h-4 w-4" />
                  </button>
                </div>
                {/* Preview */}
                <div className="relative aspect-square bg-muted/30 overflow-hidden">
                  {file.metadata?.mimetype === "application/pdf" ? (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2 p-4">
                      <div className="p-3 bg-red-50 rounded-2xl">
                        <FileText className="h-10 w-10 text-red-500" />
                      </div>
                      <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider text-center leading-tight">PDF</span>
                    </div>
                  ) : (
                    <img 
                      src={url} 
                      alt={file.name} 
                      className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                  )}
                  {/* Overlay de Ações Rápidas */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    {allowSelection ? (
                      <Button 
                        size="sm" 
                        onClick={() => onSelect?.(url)}
                        className="rounded-full bg-white text-primary hover:bg-white/90"
                      >
                        Selecionar
                      </Button>
                    ) : (
                      <>
                        <Button 
                          size="icon" 
                          variant="secondary" 
                          className="h-9 w-9 rounded-full bg-white text-black hover:bg-white/90"
                          onClick={() => window.open(url, "_blank")}
                          title="Ver original"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="icon" 
                          variant="secondary" 
                          className="h-9 w-9 rounded-full bg-white text-black hover:bg-white/90"
                          onClick={() => copyToClipboard(url)}
                          title="Copiar URL"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>

                {/* Footer / Info */}
                <div className="p-3 bg-muted/5 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-[11px] font-bold text-foreground truncate mb-1" title={file.name}>
                      {file.name}
                    </p>
                    <div className="flex items-center gap-2 text-[9px] text-muted-foreground uppercase tracking-wider font-bold">
                      <span className="flex items-center gap-0.5"><Database className="h-2 w-2" /> {formatSize(file.metadata?.size || 0)}</span>
                      <span>•</span>
                      <span className="flex items-center gap-0.5"><Calendar className="h-2 w-2" /> {new Date(file.created_at).toLocaleDateString("pt-BR")}</span>
                    </div>
                  </div>
                  
                  <div className="mt-3 flex gap-2">
                     <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-7 px-2 text-[10px] text-destructive hover:text-destructive hover:bg-destructive/10 rounded-lg flex-1"
                        onClick={() => setDeleteConfirm(file.name)}
                     >
                        <Trash2 className="h-3 w-3 mr-1" />
                        Excluir
                     </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Paginação */}
      {!loading && (files.length > 0 || page > 1) && (
        <div className="flex items-center justify-center gap-4 pt-8 pb-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="rounded-xl px-4 font-bold text-[10px] uppercase tracking-wider border-border/50"
          >
            Anterior
          </Button>
          <div className="text-xs font-bold text-muted-foreground bg-muted/20 px-4 py-2 rounded-xl border border-border/50">
            Página {page}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(p => p + 1)}
            disabled={!hasNextPage}
            className="rounded-xl px-4 font-bold text-[10px] uppercase tracking-wider border-border/50"
          >
            Próxima
          </Button>
        </div>
      )}

      {/* Alerta de Confirmação de Exclusão */}
      <AlertDialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <AlertDialogContent className="rounded-2xl max-w-sm">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-serif">Excluir Imagem?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. A imagem será removida permanentemente do servidor e poderá quebrar links em postagens existentes.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-row gap-2 mt-4">
            <AlertDialogCancel className="flex-1 rounded-xl m-0">Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete}
              className="flex-1 rounded-xl bg-destructive hover:bg-destructive/90 m-0"
              disabled={isDeleting}
            >
              {isDeleting ? "Excluindo..." : "Confirmar Exclusão"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {/* Alerta de Confirmação de Exclusão em Massa */}
      <AlertDialog open={bulkDeleteConfirm} onOpenChange={setBulkDeleteConfirm}>
        <AlertDialogContent className="rounded-2xl max-w-sm">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-serif">Excluir {selectedFiles.length} imagens?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação removerá permanentemente {selectedFiles.length} arquivos do servidor. Esta operação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-row gap-2 mt-4">
            <AlertDialogCancel className="flex-1 rounded-xl m-0">Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleBulkDelete}
              className="flex-1 rounded-xl bg-destructive hover:bg-destructive/90 m-0"
              disabled={isDeleting}
            >
              {isDeleting ? "Excluindo..." : "Confirmar Exclusão"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Floating Selection Bar (Mobile/Bottom) */}
      <AnimatePresence>
        {selectedFiles.length > 0 && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] px-6 py-4 bg-primary rounded-full shadow-2xl flex items-center gap-6 border border-white/20 backdrop-blur-lg"
          >
            <div className="flex flex-col">
              <span className="text-white font-bold text-sm">{selectedFiles.length} selecionados</span>
              <button 
                onClick={() => setSelectedFiles([])}
                className="text-white/60 text-[10px] uppercase tracking-widest font-bold hover:text-white transition-colors text-left"
              >
                Limpar Seleção
              </button>
            </div>
            <div className="h-8 w-[1px] bg-white/20" />
            <Button 
              variant="secondary"
              size="sm"
              onClick={() => setBulkDeleteConfirm(true)}
              className="rounded-full bg-white text-primary hover:bg-white/90 font-bold px-6"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Excluir
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </div>
  );
}
