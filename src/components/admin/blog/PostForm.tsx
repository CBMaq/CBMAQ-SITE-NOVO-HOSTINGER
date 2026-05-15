"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  ChevronLeft, 
  Save, 
  Eye, 
  Trash2, 
  Calendar,
  Image as ImageIcon,
  Check
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RichTextEditor } from "./RichTextEditor";
import { MediaPicker } from "./MediaPicker";
import { SingleImageUpload } from "@/components/ui/single-image-upload";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Combobox, 
  ComboboxChips, 
  ComboboxChip, 
  ComboboxChipsInput, 
  ComboboxContent, 
  ComboboxItem, 
  ComboboxList 
} from "@/components/ui/combobox";
import { createPost, updatePost, deletePost } from "@/app/actions/blog";
import { Switch } from "@/components/ui/switch";

interface Category {
  id: string;
  name: string;
}

interface Tag {
  id: string;
  name: string;
}

interface PostFormProps {
  initialData?: any;
  categories: Category[];
  tags: Tag[];
}

export function PostForm({ initialData, categories, tags }: PostFormProps) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  
  const [title, setTitle] = useState(initialData?.title || "");
  const [summary, setSummary] = useState(initialData?.summary || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [coverImage, setCoverImage] = useState(initialData?.coverImage || "");
  const [categoryId, setCategoryId] = useState(initialData?.categoryId || "");
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>(
    initialData?.tags?.map((t: any) => t.id) || []
  );
  const [published, setPublished] = useState(initialData?.published || false);

  async function handleSubmit() {
    if (!title) {
      alert("Por favor, insira um título.");
      return;
    }

    setIsSaving(true);
    const data = {
      title,
      summary,
      content,
      coverImage,
      categoryId: categoryId || undefined,
      tagIds: selectedTagIds,
      published,
    };

    let result;
    if (initialData?.id) {
      result = await updatePost(initialData.id, data);
    } else {
      result = await createPost(data);
    }

    if (result.success) {
      router.push("/admin/postagens");
      router.refresh();
    } else {
      alert(result.error);
    }
    setIsSaving(false);
  }

  async function handleDelete() {
    if (!initialData?.id) return;
    if (!confirm("Tem certeza que deseja excluir esta postagem permanentemente?")) return;

    const result = await deletePost(initialData.id);
    if (result.success) {
      router.push("/admin/postagens");
      router.refresh();
    } else {
      alert(result.error);
    }
  }

  return (
    <div className="space-y-8 pb-20">
      {/* Header Fixo/Stick */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-0 z-20 bg-background/80 backdrop-blur-sm py-4 border-b border-border/50 -mx-4 px-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild className="rounded-full">
            <Link href="/admin/postagens">
              <ChevronLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="text-2xl font-serif font-bold">
            {initialData ? "Editar Postagem" : "Nova Postagem"}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          {initialData && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full"
              onClick={handleDelete}
            >
              <Trash2 className="h-5 w-5" />
            </Button>
          )}
          <Button variant="outline" className="rounded-xl px-4 gap-2" disabled={isSaving}>
            <Eye className="h-4 w-4" />
            Pré-visualizar
          </Button>
          <Button onClick={handleSubmit} disabled={isSaving} className="rounded-xl px-6 gap-2 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">
            <Save className="h-4 w-4" />
            {isSaving ? "Salvando..." : "Salvar Postagem"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Lado Esquerdo: Conteúdo Principal */}
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-4 bg-background p-6 rounded-3xl border border-border/50 shadow-sm">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Título da Postagem</Label>
              <Input
                id="title"
                placeholder="Ex: Como otimizar sua frota de máquinas pesadas"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-xl font-serif font-bold h-14 rounded-xl border-none bg-muted/20 focus-visible:ring-primary/20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="summary" className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Resumo (SEO / Texto de Apoio)</Label>
              <Textarea
                id="summary"
                placeholder="Uma breve descrição que aparecerá nos cards do blog..."
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                className="resize-none h-24 rounded-xl border-none bg-muted/20 focus-visible:ring-primary/20"
              />
            </div>
          </div>

          <div className="space-y-4">
            <Label className="text-sm font-bold uppercase tracking-widest text-muted-foreground ml-2">Conteúdo da Postagem</Label>
            <RichTextEditor 
              content={content} 
              onChange={setContent} 
            />
          </div>
        </div>

        {/* Lado Direito: Configurações e Meta */}
        <div className="space-y-6">
          <div className="p-6 bg-background rounded-3xl border border-border shadow-sm space-y-6">
            <div className="space-y-3">
              <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Status de Publicação</Label>
              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-2xl border border-border/50">
                <div className="flex flex-col">
                  <span className="font-semibold text-sm">Publicado</span>
                  <span className="text-[10px] text-muted-foreground">Visível para os clientes</span>
                </div>
                <Switch 
                  checked={published}
                  onCheckedChange={setPublished}
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Imagem de Capa</Label>
              <MediaPicker 
                onSelect={setCoverImage}
                trigger={
                  <div className="group relative w-full aspect-video rounded-3xl border-2 border-dashed border-border/50 bg-muted/20 hover:bg-muted/30 hover:border-primary/30 transition-all cursor-pointer overflow-hidden flex flex-col items-center justify-center p-4">
                    {coverImage ? (
                      <>
                        <img src={coverImage} alt="Capa" className="absolute inset-0 w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                           <Button variant="secondary" size="sm" className="rounded-full bg-white text-black">Alterar Imagem</Button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="p-3 bg-background rounded-full shadow-sm mb-2">
                           <ImageIcon className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Selecionar Imagem</span>
                      </>
                    )}
                  </div>
                }
              />
            </div>

            <div className="space-y-3">
              <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Categoria Principal</Label>
              <Select value={categoryId} onValueChange={setCategoryId}>
                <SelectTrigger className="h-11 rounded-xl bg-muted/20 border-border/50">
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Tags (Etiquetas)</Label>
              <Combobox
                onValueChange={(values) => setSelectedTagIds(values)}
                value={selectedTagIds}
                multiple
              >
                <ComboboxChips className="rounded-xl bg-muted/20 border-border/50 min-h-[44px]">
                  {selectedTagIds.map((id) => (
                    <ComboboxChip key={id}>
                      {tags.find(t => t.id === id)?.name}
                    </ComboboxChip>
                  ))}
                  <ComboboxChipsInput placeholder="Adicionar tags..." />
                </ComboboxChips>
                <ComboboxContent className="rounded-xl">
                  <ComboboxList>
                    {tags.map((tag) => (
                      <ComboboxItem key={tag.id} value={tag.id}>
                        {tag.name}
                      </ComboboxItem>
                    ))}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
            </div>
          </div>

          <div className="p-6 bg-primary/5 rounded-3xl border border-primary/10 space-y-4">
             <div className="flex items-center gap-2 text-primary">
                <Calendar className="h-4 w-4" />
                <span className="text-xs font-bold uppercase tracking-widest">Informações</span>
             </div>
             <div className="space-y-2">
                <p className="text-xs text-muted-foreground">
                   <strong className="text-foreground">Autor:</strong> {initialData?.author?.name || "Você (Admin)"}
                </p>
                <p className="text-xs text-muted-foreground">
                   <strong className="text-foreground">Criado em:</strong> {initialData?.createdAt ? new Date(initialData.createdAt).toLocaleDateString("pt-BR") : "Agora"}
                </p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
