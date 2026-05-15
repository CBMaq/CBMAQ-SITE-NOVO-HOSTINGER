"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, AlertCircle } from "lucide-react";
import { SuccessModal } from "@/components/shared/SuccessModal";
import { supabase } from "@/lib/supabase";
import { FileUploadZone } from "@/components/sections/pecas-multimarcas/FileUploadZone";

interface FormData {
  nome: string;
  telefone: string;
  email: string;
  areaInteresse: string;
  sobre: string;
  curriculo: File[];
}

const emptyForm: FormData = {
  nome: "",
  telefone: "",
  email: "",
  areaInteresse: "",
  sobre: "",
  curriculo: [],
};

const maskPhone = (v: string) => {
  const d = v.replace(/\D/g, "");
  if (d.length <= 10) return d.replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{4})(\d)/, "$1-$2").slice(0, 14);
  return d.replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{5})(\d)/, "$1-$2").slice(0, 15);
};

const inputCls = "h-[3.25rem] px-4 rounded-[8px] bg-[#F8F9FA] border-[#E0E4EA] border-[1.5px] focus:border-[#0A4EE4] outline-none transition-all font-medium text-[#001647] text-[0.875rem] w-full";
const labelCls = "text-[0.8rem] font-bold text-[#053474] mb-1.5 block";
const cardCls = "bg-white rounded-[20px] p-6 md:p-8 shadow-[0_2px_16px_rgba(0,0,0,0.05)] border border-[#F1F5F9]";

export function CurriculumFormSection() {
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
    if (!formData.nome.trim()) errs.nome = "Obrigatório";
    if (formData.telefone.replace(/\D/g, "").length < 10) errs.telefone = "Telefone inválido";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = "E-mail inválido";
    if (!formData.areaInteresse.trim()) errs.areaInteresse = "Obrigatório";
    if (!formData.sobre.trim()) errs.sobre = "Obrigatório";
    if (formData.curriculo.length === 0) errs.curriculo = "Anexe seu currículo";

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

    const spam = localStorage.getItem("cbmaq_curriculo_last");
    if (spam && Date.now() - parseInt(spam) < 600000) {
      setStatus("error");
      setErrorMsg("Aguarde 10 minutos entre envios.");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      const ts = Date.now().toString(36);
      let curriculoUrl = "";

      if (formData.curriculo.length > 0) {
        const file = formData.curriculo[0];
        const path = `curriculos/${ts}/${file.name}`;
        curriculoUrl = await uploadToStorage(file, path);
      }

      const payload = {
        nome: formData.nome,
        telefone: formData.telefone,
        email: formData.email,
        areaInteresse: formData.areaInteresse,
        sobre: formData.sobre,
        curriculoUrl,
      };

      const res = await fetch("/api/trabalhe-conosco", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Erro ao enviar currículo.");

      localStorage.setItem("cbmaq_curriculo_last", Date.now().toString());
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
    <section className="section-padding bg-[#F8F9FA] overflow-hidden">
      <div className="section-container max-w-[800px]">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-[#001647] text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Envie seu Currículo
          </h2>
          <p className="text-[#4d5c7e] text-[1.125rem] max-w-[600px] mx-auto">
            Preencha os dados abaixo e entraremos em contato quando surgir uma vaga compatível.
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
              <label className={labelCls}>E-mail *</label>
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
              <label className={labelCls}>Telefone *</label>
              <input
                type="text"
                placeholder="(11) 99999-9999"
                className={inputCls}
                value={formData.telefone}
                onChange={(e) => updateField("telefone", e.target.value)}
              />
              {errors.telefone && <p className="text-red-500 text-[11px] font-bold mt-1">{errors.telefone}</p>}
            </div>

            <div className="md:col-span-2">
              <label className={labelCls}>Área de Interesse *</label>
              <input
                type="text"
                placeholder="Ex: Técnico, Comercial"
                className={inputCls}
                value={formData.areaInteresse}
                onChange={(e) => updateField("areaInteresse", e.target.value)}
              />
              {errors.areaInteresse && <p className="text-red-500 text-[11px] font-bold mt-1">{errors.areaInteresse}</p>}
            </div>

            <div className="md:col-span-2">
              <label className={labelCls}>Sobre você *</label>
              <textarea
                placeholder="Fale sobre sua experiência..."
                className={`${inputCls} min-h-[120px] py-4 resize-y`}
                value={formData.sobre}
                onChange={(e) => updateField("sobre", e.target.value)}
              />
              {errors.sobre && <p className="text-red-500 text-[11px] font-bold mt-1">{errors.sobre}</p>}
            </div>

            <div className="md:col-span-2">
              <FileUploadZone
                label="Anexar Currículo *"
                accept=".pdf,.doc,.docx"
                maxFiles={1}
                maxSizeMB={5}
                icon="document"
                files={formData.curriculo}
                onFilesChange={(files) => updateField("curriculo", files)}
                hint="PDF ou DOC/DOCX (máx. 5MB)"
              />
              {errors.curriculo && <p className="text-red-500 text-[11px] font-bold mt-1">{errors.curriculo}</p>}
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
                "Enviar Currículo"
              )}
            </button>
          </div>
        </motion.div>

        <SuccessModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Currículo Enviado!"
          message="Recebemos suas informações. Entraremos em contato assim que surgir uma vaga compatível com o seu perfil."
        />
      </div>
    </section>
  );
}
