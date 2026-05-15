"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Image as ImageIcon, Loader2, X, FileText } from "lucide-react";
import { uploadImage } from "@/lib/supabase";
import { cn } from "@/lib/utils";

interface SingleImageUploadProps {
  value: string;
  onChange: (value: string) => void;
  bucketName?: string;
  accept?: string;
}

export function SingleImageUpload({
  value,
  onChange,
  bucketName = "service_images",
  accept
}: SingleImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback(
    async (acceptedFiles: File[], fileRejections: any[]) => {
      if (fileRejections.length > 0) {
        const rejection = fileRejections[0];
        if (rejection.errors[0].code === "file-too-large") {
          alert("A imagem é muito grande. O limite é 5MB.");
        } else {
          alert("Arquivo inválido. Por favor, envie uma imagem (JPG, PNG ou WEBP).");
        }
        return;
      }

      const file = acceptedFiles[0];
      if (!file) return;

      setIsUploading(true);
      try {
        const url = await uploadImage(file, bucketName);
        onChange(url);
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Ocorreu um erro ao fazer o upload da imagem.");
      } finally {
        setIsUploading(false);
      }
    },
    [onChange, bucketName]
  );

  const isPdfMode = accept?.includes("pdf");

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: isPdfMode 
      ? { "application/pdf": [".pdf"] }
      : { "image/*": [".jpeg", ".jpg", ".png", ".webp"] },
    maxFiles: 1,
    maxSize: isPdfMode ? 20 * 1024 * 1024 : 5 * 1024 * 1024,
    disabled: isUploading,
  });

  return (
    <div className="space-y-4 w-full">
      <div
        {...getRootProps()}
        className={cn(
          "w-full border-2 border-dashed rounded-xl flex flex-col items-center justify-center gap-2 transition-all cursor-pointer text-center p-6 min-h-[140px]",
          isDragActive ? "border-primary bg-primary/5" : "border-border bg-muted/5 hover:bg-muted/10 hover:border-primary/20",
          isUploading ? "opacity-50 cursor-not-allowed" : ""
        )}
      >
        <input {...getInputProps()} />
        
        {isUploading ? (
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <span className="text-sm font-medium">Fazendo upload...</span>
          </div>
        ) : (
          <>
            <div className="p-2 bg-background rounded-full shadow-sm border border-border">
              {isPdfMode ? (
                <FileText className="w-5 h-5 text-red-500" />
              ) : (
                <ImageIcon className="w-5 h-5 text-muted-foreground" />
              )}
            </div>
            <div className="space-y-1">
              <p className="text-sm font-semibold">
                {isDragActive ? `Solte o ${isPdfMode ? "PDF" : "arquivo"} aqui` : `Arraste e solte seu ${isPdfMode ? "PDF" : "arquivo"}`}
              </p>
              <p className="text-[10px] text-muted-foreground">
                 {isPdfMode ? "PDF até 20MB." : "PNG, JPG ou WEBP até 5MB."}
              </p>
            </div>
          </>
        )}
      </div>

      {value && !isUploading && (
        <div className="flex items-center gap-4 p-3 rounded-xl bg-muted/20 border border-border animate-in fade-in zoom-in-95 duration-300">
          <div className="relative w-24 aspect-video rounded-lg border border-border overflow-hidden bg-background shrink-0">
            <img src={value} alt="Preview" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Preview Atual</p>
            <p className="text-xs truncate text-foreground/70">A imagem já está salva no servidor.</p>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onChange("");
            }}
            className="p-2 rounded-full hover:bg-destructive/10 text-destructive transition-colors"
            title="Remover imagem"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
