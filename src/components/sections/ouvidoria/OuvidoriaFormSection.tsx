"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, AlertCircle, Info } from "lucide-react";
import { SuccessModal } from "@/components/shared/SuccessModal";
import { supabase } from "@/lib/supabase";
import { FileUploadZone } from "@/components/sections/pecas-multimarcas/FileUploadZone";

interface FormData {
  tipo: string;
  anonimo: boolean;
  nome: string;
  telefone: string;
  email: string;
  assunto: string;
  mensagem: string;
  anexos: File[];
}

const emptyForm: FormData = {
  tipo: "Sugestão",
  anonimo: false,
  nome: "",
  telefone: "",
  email: "",
  assunto: "",
  mensagem: "",
  anexos: [],
};

const maskPhone = (v: string) => {
  const d = v.replace(/\D/g, "");
  if (d.length <= 10) return d.replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{4})(\d)/, "$1-$2").slice(0, 14);
  return d.replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{5})(\d)/, "$1-$2").slice(0, 15);
};

const inputCls = "h-[3.25rem] px-4 rounded-[8px] bg-[#F8F9FA] border-[#E0E4EA] border-[1.5px] focus:border-[#0A4EE4] outline-none transition-all font-medium text-[#001647] text-[0.875rem] w-full";
const selectCls = "h-[3.25rem] px-4 rounded-[8px] bg-[#F8F9FA] border-[#E0E4EA] border-[1.5px] focus:border-[#0A4EE4] outline-none transition-all font-medium text-[#001647] text-[0.875rem] w-full appearance-none";
const labelCls = "text-[0.8rem] font-bold text-[#053474] mb-1.5 block";
const cardCls = "bg-white rounded-[20px] p-6 md:p-8 shadow-[0_2px_16px_rgba(0,0,0,0.05)] border border-[#F1F5F9]";

export function OuvidoriaFormSection() {
  const [formData, setFormData] = useState<FormData>(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const updateField = (field: keyof FormData, val: any) => {
    let v = val;
    if (field === "telefone") v = maskPhone(val);
    setFormData((prev) => ({ ...prev, [field]: v }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!formData.tipo) errs.tipo = "Selecione o tipo de manifestação";
    
    if (!formData.anonimo) {
      if (!formData.nome.trim()) errs.nome = "Obrigatório";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) && formData.email.length > 0) errs.email = "E-mail inválido";
      if (formData.telefone.replace(/\D/g, "").length > 0 && formData.telefone.replace(/\D/g, "").length < 10) errs.telefone = "Telefone inválido";
    }

    if (!formData.assunto.trim()) errs.assunto = "Obrigatório";
    if (!formData.mensagem.trim()) errs.mensagem = "Escreva sua mensagem";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const uploadToStorage = async (file: File, path: string): Promise<string> => {
    const { error } = await supabase.storage.from("service_images").upload(path, file, { cacheControl: "3600", upsert: false });
    if (error) throw new Error(`Upload falhou: ${error.message}`);
    const { data } = supabase.storage.from("service_images").getPublicUrl(path);
    return data.publicUrl;
  };

  const enviar = async () => {
    if (!validate()) return;

    const spam = localStorage.getItem("cbmaq_ouvidoria_last");
    if (spam && Date.now() - parseInt(spam) < 300000) { // 5 minutos para ouvidoria
      setStatus("error");
      setErrorMsg("Aguarde alguns minutos antes de enviar outra manifestação.");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      const ts = Date.now().toString(36);
      const anexosUrls: string[] = [];

      for (let i = 0; i < formData.anexos.length; i++) {
        const file = formData.anexos[i];
        const path = `ouvidoria/${ts}/${file.name}`;
        anexosUrls.push(await uploadToStorage(file, path));
      }

      const payload = {
        tipo: formData.tipo,
        anonimo: formData.anonimo,
        nome: formData.anonimo ? "Anônimo" : formData.nome,
        telefone: formData.anonimo ? "" : formData.telefone,
        email: formData.anonimo ? "" : formData.email,
        assunto: formData.assunto,
        mensagem: formData.mensagem,
        anexosUrls,
      };

      const res = await fetch("/api/ouvidoria", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Erro ao enviar manifestação.");

      localStorage.setItem("cbmaq_ouvidoria_last", Date.now().toString());
      setStatus("success");
      setModalOpen(true);
      setFormData(emptyForm);
    } catch (err: any) {
      console.error(err);
      setStatus("error");
      setErrorMsg(err.message || "Ocorreu um erro inesperado.");
    }
  };

  return (
    <section className="section-padding bg-[#F8F9FA] overflow-hidden" id="ouvidoria-form">
      <div className="section-container max-w-[800px]">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-[#001647] text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Envie sua Manifestação
          </h2>
          <p className="text-[#4d5c7e] text-[1.125rem] max-w-[600px] mx-auto">
            Garantimos o sigilo e a análise criteriosa de todas as mensagens recebidas.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={cardCls}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="md:col-span-2">
              <label className={labelCls}>Tipo de Manifestação *</label>
              <div className="relative">
                <select
                  className={selectCls}
                  value={formData.tipo}
                  onChange={(e) => updateField("tipo", e.target.value)}
                >
                  <option value="Sugestão">Sugestão</option>
                  <option value="Elogio">Elogio</option>
                  <option value="Reclamação">Reclamação</option>
                  <option value="Denúncia">Denúncia</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none"><path d="M1 1.5L6 6.5L11 1.5" stroke="#053474" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              </div>
              {errors.tipo && <p className="text-red-500 text-[11px] font-bold mt-1">{errors.tipo}</p>}
            </div>

            <div className="md:col-span-2 flex items-center mt-2 mb-4">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center w-5 h-5">
                  <input
                    type="checkbox"
                    className="peer appearance-none w-5 h-5 border-2 border-[#D1D5DB] rounded-[6px] checked:bg-[#0A4EE4] checked:border-[#0A4EE4] transition-all cursor-pointer outline-none"
                    checked={formData.anonimo}
                    onChange={(e) => updateField("anonimo", e.target.checked)}
                  />
                  <svg className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" viewBox="0 0 12 10" fill="none"><path d="M1 5L4.5 8.5L11 1.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <span className="text-[0.9rem] font-bold text-[#053474] group-hover:text-[#0A4EE4] transition-colors">
                  Desejo fazer uma manifestação anônima
                </span>
              </label>
            </div>

            {!formData.anonimo && (
              <>
                <div className="md:col-span-2">
                  <label className={labelCls}>Nome Completo *</label>
                  <input
                    type="text"
                    placeholder="Seu nome"
                    className={inputCls}
                    value={formData.nome}
                    onChange={(e) => updateField("nome", e.target.value)}
                  />
                  {errors.nome && <p className="text-red-500 text-[11px] font-bold mt-1">{errors.nome}</p>}
                </div>

                <div>
                  <label className={labelCls}>E-mail</label>
                  <input
                    type="email"
                    placeholder="seu@email.com"
                    className={inputCls}
                    value={formData.email}
                    onChange={(e) => updateField("email", e.target.value)}
                  />
                  {errors.email && <p className="text-red-500 text-[11px] font-bold mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className={labelCls}>Telefone</label>
                  <input
                    type="text"
                    placeholder="(11) 99999-9999"
                    className={inputCls}
                    value={formData.telefone}
                    onChange={(e) => updateField("telefone", e.target.value)}
                  />
                  {errors.telefone && <p className="text-red-500 text-[11px] font-bold mt-1">{errors.telefone}</p>}
                </div>
                <div className="md:col-span-2 bg-blue-50/50 p-4 rounded-lg flex gap-3 text-sm text-[#4d5c7e] border border-blue-100">
                  <Info className="w-5 h-5 text-blue-500 shrink-0" />
                  <p>Preencher e-mail ou telefone é opcional, mas recomendável caso deseje um retorno sobre a tratativa da sua manifestação.</p>
                </div>
              </>
            )}

            <div className="md:col-span-2 mt-4">
              <label className={labelCls}>Assunto *</label>
              <input
                type="text"
                placeholder="Ex: Atendimento na loja, Dúvida sobre produto..."
                className={inputCls}
                value={formData.assunto}
                onChange={(e) => updateField("assunto", e.target.value)}
              />
              {errors.assunto && <p className="text-red-500 text-[11px] font-bold mt-1">{errors.assunto}</p>}
            </div>

            <div className="md:col-span-2">
              <label className={labelCls}>Mensagem *</label>
              <textarea
                placeholder="Descreva detalhadamente..."
                className={`${inputCls} min-h-[160px] py-4 resize-y`}
                value={formData.mensagem}
                onChange={(e) => updateField("mensagem", e.target.value)}
              />
              {errors.mensagem && <p className="text-red-500 text-[11px] font-bold mt-1">{errors.mensagem}</p>}
            </div>

            <div className="md:col-span-2">
              <FileUploadZone
                label="Anexos (Opcional)"
                accept="image/*,.pdf,.doc,.docx"
                maxFiles={3}
                maxSizeMB={5}
                icon="document"
                files={formData.anexos}
                onFilesChange={(files) => updateField("anexos", files)}
                hint="Imagens, PDF ou DOC (máx. 5MB cada)"
              />
              {errors.anexos && <p className="text-red-500 text-[11px] font-bold mt-1">{errors.anexos}</p>}
            </div>
          </div>

          {status === "error" && (
            <div className="mt-6 p-4 rounded-[12px] bg-red-50 text-red-600 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
              <p className="text-[0.875rem] font-medium">{errorMsg}</p>
            </div>
          )}

          <div className="mt-8 flex justify-end">
            <button
              onClick={enviar}
              disabled={status === "loading"}
              className="bg-[#0A4EE4] hover:bg-[#083CAE] text-white px-8 h-[3.5rem] rounded-[10px] font-bold text-[0.95rem] transition-colors flex items-center justify-center min-w-[200px]"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Enviando...
                </>
              ) : (
                "Enviar Manifestação"
              )}
            </button>
          </div>
        </motion.div>

        <SuccessModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Manifestação Enviada!"
          message="Agradecemos o seu contato. Sua mensagem foi registrada com sucesso na Ouvidoria da CBMaq."
        />
      </div>
    </section>
  );
}
