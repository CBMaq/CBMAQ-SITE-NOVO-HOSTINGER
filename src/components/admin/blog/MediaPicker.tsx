"use client";

import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MediaGallery } from "./MediaGallery";
import { ImageIcon, Plus, Upload, FileText } from "lucide-react";
import { SingleImageUpload } from "@/components/ui/single-image-upload";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface MediaPickerProps {
  onSelect: (url: string) => void;
  trigger?: React.ReactNode;
  fileFilter?: "all" | "image" | "pdf";
}

export function MediaPicker({ onSelect, trigger, fileFilter = "image" }: MediaPickerProps) {
  const [open, setOpen] = useState(false);

  const handleSelect = (url: string) => {
    onSelect(url);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" className="gap-2 rounded-xl">
            <ImageIcon className="h-4 w-4" />
            Escolher da Galeria
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-[95vw] md:max-w-[90vw] h-[90vh] flex flex-col p-0 gap-0 rounded-3xl overflow-hidden border-none shadow-2xl">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-2xl font-serif font-bold flex items-center gap-3">
             <div className={`p-2 rounded-xl ${fileFilter === "pdf" ? "bg-red-500/10" : "bg-primary/10"}`}>
                {fileFilter === "pdf" ? (
                  <FileText className="h-6 w-6 text-red-500" />
                ) : (
                  <ImageIcon className="h-6 w-6 text-primary" />
                )}
             </div>
             {fileFilter === "pdf" ? "Galeria de PDFs" : "Galeria de Mídia"}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-hidden">
          <Tabs defaultValue="gallery" className="h-full flex flex-col">
            <div className="px-6 border-b border-border/50">
              <TabsList className="bg-transparent gap-12 p-0 h-16">
                <TabsTrigger 
                  value="gallery" 
                  className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-full px-0 font-bold uppercase tracking-widest text-[10px] transition-all"
                >
                  Arquivos Existentes
                </TabsTrigger>
                <TabsTrigger 
                  value="upload" 
                  className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-full px-0 font-bold uppercase tracking-widest text-[10px] transition-all"
                >
                  Fazer Novo Upload
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="gallery" className="flex-1 overflow-y-auto p-8 scrollbar-thin scrollbar-thumb-border m-0">
              <MediaGallery allowSelection onSelect={handleSelect} fileFilter={fileFilter} />
            </TabsContent>
            
            <TabsContent value="upload" className="flex-1 p-10 flex flex-col items-center justify-center m-0">
              <div className="w-full max-w-md space-y-6">
                 <div className="text-center space-y-2">
                    <div className="bg-primary/5 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                       <Upload className="h-10 w-10 text-primary" />
                    </div>
                    <h3 className="text-xl font-serif font-bold">Subir novos arquivos</h3>
                    <p className="text-sm text-muted-foreground">Envie imagens em alta qualidade diretamente do seu computador.</p>
                 </div>
                 <SingleImageUpload 
                    value="" 
                    onChange={handleSelect} 
                    bucketName="service_images"
                    accept={fileFilter === "pdf" ? ".pdf,application/pdf" : "image/*"}
                 />
                 <p className="text-center text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
                    Dica: Após o upload, a imagem será selecionada automaticamente.
                 </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
