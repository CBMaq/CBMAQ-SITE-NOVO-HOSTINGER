"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Loader2, Plus, Trash2, FileText, Upload } from "lucide-react";
import { createAta, updateAta } from "@/app/actions/vendas-ao-governo";
import { toast } from "sonner";
import { uploadImage as uploadFile } from "@/lib/supabase";

const ataSchema = z.object({
  titulo: z.string().min(3, "Título obrigatório"),
  slug: z.string().min(3, "Slug obrigatório"),
  numeroAta: z.string().min(1, "Número da Ata obrigatório"),
  orgao: z.string().min(2, "Órgão obrigatório"),
  local: z.string().optional().nullable(),
  modalidadeContratacao: z.string().optional().nullable(),
  fonte: z.string().optional().nullable(),
  idAtaPncp: z.string().optional().nullable(),
  idContratacaoPncp: z.string().optional().nullable(),
  objeto: z.string().min(10, "Objeto obrigatório (min 10 caracteres)"),
  resumo: z.string().optional().nullable(),
  published: z.boolean(),
  // Datas (serão strings no form e convertidas no submit)
  ultimaAtualizacao: z.string().optional().nullable(),
  dataDivulgacaoPncp: z.string().optional().nullable(),
  dataAssinatura: z.string().optional().nullable(),
  vigenciaInicio: z.string().optional().nullable(),
  vigenciaFim: z.string().optional().nullable(),
});

type FormData = z.infer<typeof ataSchema>;

interface AtaFormProps {
  initialData?: any; // A AtaRegistro loaded from db
}

export function AtaForm({ initialData }: AtaFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [arquivos, setArquivos] = useState<any[]>(initialData?.arquivos || []);
  const [isUploading, setIsUploading] = useState(false);
  
  const router = useRouter();

  const formatDateForInput = (dateString: string | Date | null) => {
    if (!dateString) return "";
    const d = new Date(dateString);
    return d.toISOString().split('T')[0];
  };

  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<FormData>({
    resolver: zodResolver(ataSchema),
    defaultValues: {
      titulo: initialData?.titulo || "",
      slug: initialData?.slug || "",
      numeroAta: initialData?.numeroAta || "",
      orgao: initialData?.orgao || "",
      local: initialData?.local || "",
      modalidadeContratacao: initialData?.modalidadeContratacao || "",
      fonte: initialData?.fonte || "",
      idAtaPncp: initialData?.idAtaPncp || "",
      idContratacaoPncp: initialData?.idContratacaoPncp || "",
      objeto: initialData?.objeto || "",
      resumo: initialData?.resumo || "",
      published: initialData?.published || false,
      ultimaAtualizacao: formatDateForInput(initialData?.ultimaAtualizacao),
      dataDivulgacaoPncp: formatDateForInput(initialData?.dataDivulgacaoPncp),
      dataAssinatura: formatDateForInput(initialData?.dataAssinatura),
      vigenciaInicio: formatDateForInput(initialData?.vigenciaInicio),
      vigenciaFim: formatDateForInput(initialData?.vigenciaFim),
    },
  });

  const generateSlug = (text: string) => {
    return text
      .toString()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")
      .replace(/--+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "");
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue("titulo", e.target.value);
    if (!initialData) {
      setValue("slug", generateSlug(e.target.value));
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    setIsUploading(true);
    try {
      const newFiles = Array.from(e.target.files);
      const uploadedFiles = [];
      
      for (const file of newFiles) {
        // We reuse the uploadImage function, but it works for any file.
        // Putting it in 'service_images' or ideally a generic bucket. 
        // If 'service_images' is the only public one, we use it.
        const url = await uploadFile(file, 'service_images');
        
        uploadedFiles.push({
          nomeArquivo: file.name,
          urlArquivo: url,
          tipoArquivo: file.type || "application/pdf",
          ordem: arquivos.length + uploadedFiles.length,
        });
      }

      setArquivos([...arquivos, ...uploadedFiles]);
      toast.success("Sucesso", {
        description: "Arquivos enviados com sucesso.",
      });
    } catch (error) {
      toast.error("Erro no upload", {
        description: "Não foi possível enviar o arquivo.",
      });
    } finally {
      setIsUploading(false);
      // Reset input
      e.target.value = '';
    }
  };

  const removeArquivo = (indexToRemove: number) => {
    setArquivos(arquivos.filter((_, index) => index !== indexToRemove));
  };

  const parseDateToISO = (val: string | null | undefined) => {
    if (!val) return null;
    return new Date(val).toISOString();
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const formattedData = {
        ...data,
        ultimaAtualizacao: parseDateToISO(data.ultimaAtualizacao),
        dataDivulgacaoPncp: parseDateToISO(data.dataDivulgacaoPncp),
        dataAssinatura: parseDateToISO(data.dataAssinatura),
        vigenciaInicio: parseDateToISO(data.vigenciaInicio),
        vigenciaFim: parseDateToISO(data.vigenciaFim),
      };

      const filesToSave = arquivos.map(({ id, ataRegistroId, createdAt, ...rest }) => rest);

      if (initialData) {
        await updateAta(initialData.id, formattedData, filesToSave);
        toast.success("Sucesso", { description: "Ata atualizada com sucesso." });
      } else {
        await createAta(formattedData, filesToSave);
        toast.success("Sucesso", { description: "Ata criada com sucesso." });
      }
      
      router.push("/admin/vendas-ao-governo");
    } catch (error) {
      console.error(error);
      toast.error("Erro", {
        description: "Ocorreu um erro ao salvar a ata.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-5xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Coluna 1 - Dados Básicos */}
        <div className="space-y-6 bg-white p-6 rounded-2xl border border-border shadow-sm">
          <h2 className="text-xl font-bold flex items-center gap-2 border-b pb-4">
            <FileText className="w-5 h-5 text-primary" />
            Dados Básicos
          </h2>

          <div className="space-y-4">
            <div>
              <Label htmlFor="titulo">Título da Ata *</Label>
              <Input id="titulo" {...register("titulo")} onChange={handleTitleChange} />
              {errors.titulo && <p className="text-red-500 text-sm mt-1">{errors.titulo.message}</p>}
            </div>

            <div>
              <Label htmlFor="slug">Slug (URL) *</Label>
              <Input id="slug" {...register("slug")} />
              {errors.slug && <p className="text-red-500 text-sm mt-1">{errors.slug.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="numeroAta">Número da Ata *</Label>
                <Input id="numeroAta" {...register("numeroAta")} placeholder="Ex: 00108/2025" />
                {errors.numeroAta && <p className="text-red-500 text-sm mt-1">{errors.numeroAta.message}</p>}
              </div>
              <div>
                <Label htmlFor="modalidadeContratacao">Modalidade</Label>
                <Input id="modalidadeContratacao" {...register("modalidadeContratacao")} placeholder="Ex: Pregão Eletrônico" />
              </div>
            </div>

            <div>
              <Label htmlFor="orgao">Órgão / Instituição *</Label>
              <Input id="orgao" {...register("orgao")} />
              {errors.orgao && <p className="text-red-500 text-sm mt-1">{errors.orgao.message}</p>}
            </div>

            <div>
              <Label htmlFor="local">Local</Label>
              <Input id="local" {...register("local")} placeholder="Ex: São Paulo - SP" />
            </div>

            <div>
              <Label htmlFor="objeto">Objeto *</Label>
              <Textarea id="objeto" {...register("objeto")} rows={4} />
              {errors.objeto && <p className="text-red-500 text-sm mt-1">{errors.objeto.message}</p>}
            </div>

            <div>
              <Label htmlFor="resumo">Resumo (opcional)</Label>
              <Textarea id="resumo" {...register("resumo")} rows={2} />
            </div>
            
            <div className="flex items-center justify-between border-t pt-4">
              <div className="space-y-0.5">
                <Label className="text-base">Publicar Ata</Label>
                <p className="text-sm text-muted-foreground">Tornar a ata visível no site público.</p>
              </div>
              <Switch
                checked={watch("published")}
                onCheckedChange={(val) => setValue("published", val)}
              />
            </div>
          </div>
        </div>

        {/* Coluna 2 - Datas, PNCP e Arquivos */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-border shadow-sm space-y-4">
            <h2 className="text-xl font-bold border-b pb-4">Datas e Prazos</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="ultimaAtualizacao">Última Atualização</Label>
                <Input type="date" id="ultimaAtualizacao" {...register("ultimaAtualizacao")} />
              </div>
              <div>
                <Label htmlFor="dataAssinatura">Data de Assinatura</Label>
                <Input type="date" id="dataAssinatura" {...register("dataAssinatura")} />
              </div>
              <div>
                <Label htmlFor="vigenciaInicio">Início da Vigência</Label>
                <Input type="date" id="vigenciaInicio" {...register("vigenciaInicio")} />
              </div>
              <div>
                <Label htmlFor="vigenciaFim">Fim da Vigência</Label>
                <Input type="date" id="vigenciaFim" {...register("vigenciaFim")} />
              </div>
              <div>
                <Label htmlFor="dataDivulgacaoPncp">Divulgação PNCP</Label>
                <Input type="date" id="dataDivulgacaoPncp" {...register("dataDivulgacaoPncp")} />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-border shadow-sm space-y-4">
            <h2 className="text-xl font-bold border-b pb-4">Referências (PNCP/Fonte)</h2>
            
            <div>
              <Label htmlFor="idAtaPncp">ID Ata PNCP</Label>
              <Input id="idAtaPncp" {...register("idAtaPncp")} />
            </div>
            <div>
              <Label htmlFor="idContratacaoPncp">ID Contratação PNCP</Label>
              <Input id="idContratacaoPncp" {...register("idContratacaoPncp")} />
            </div>
            <div>
              <Label htmlFor="fonte">Link / Fonte</Label>
              <Input id="fonte" {...register("fonte")} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-border shadow-sm space-y-4">
            <h2 className="text-xl font-bold border-b pb-4 flex items-center justify-between">
              Arquivos / PDFs
              <div className="relative">
                <Input 
                  type="file" 
                  multiple 
                  onChange={handleFileUpload} 
                  disabled={isUploading}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  accept=".pdf,.doc,.docx"
                />
                <Button type="button" variant="outline" size="sm" disabled={isUploading}>
                  {isUploading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Upload className="w-4 h-4 mr-2" />}
                  Anexar Arquivo
                </Button>
              </div>
            </h2>
            
            <div className="space-y-2">
              {arquivos.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4 border border-dashed rounded-lg">Nenhum arquivo anexado.</p>
              ) : (
                arquivos.map((arq, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg bg-gray-50">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <FileText className="w-5 h-5 text-primary shrink-0" />
                      <span className="text-sm font-medium truncate">{arq.nomeArquivo}</span>
                    </div>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="icon" 
                      className="text-red-500 hover:bg-red-50 hover:text-red-600 shrink-0"
                      onClick={() => removeArquivo(index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4 pt-4 border-t">
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => router.push("/admin/vendas-ao-governo")}
          disabled={isSubmitting}
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting} className="min-w-[150px]">
          {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
          {initialData ? "Salvar Alterações" : "Criar Ata"}
        </Button>
      </div>
    </form>
  );
}
