"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, AlertCircle } from "lucide-react";
import { SuccessModal } from "@/components/shared/SuccessModal";

interface FormData {
  nome: string;
  email: string;
  telefone: string;
  empresa: string;
  assunto: string;
  mensagem: string;
}

const emptyForm: FormData = {
  nome: "",
  email: "",
  telefone: "",
  empresa: "",
  assunto: "Dúvida Comercial",
  mensagem: "",
};

const maskPhone = (v: string) => {
  const d = v.replace(/\D/g, "");
  if (d.length <= 10) return d.replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{4})(\d)/, "$1-$2").slice(0, 14);
  return d.replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{5})(\d)/, "$1-$2").slice(0, 15);
};

const inputCls = "h-[3.25rem] px-4 rounded-[8px] bg-[#F8F9FA] border-[#E0E4EA] border-[1.5px] focus:border-[#0A4EE4] outline-none transition-all font-medium text-[#001647] text-[0.875rem] w-full";
const labelCls = "text-[0.8rem] font-bold text-[#053474] mb-1.5 block";
const cardCls = "bg-white rounded-[20px] p-6 md:p-8 shadow-[0_2px_16px_rgba(0,0,0,0.05)] border border-[#F1F5F9]";

export function ContactFormSection() {
  const [formData, setFormData] = useState<FormData>(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const updateField = (field: keyof FormData, val: string) => {
    let v = val;
    if (field === "telefone") v = maskPhone(val);
    setFormData((prev) => ({ ...prev, [field]: v }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!formData.nome.trim()) errs.nome = "Obrigatório";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = "E-mail inválido";
    if (formData.telefone.replace(/\D/g, "").length < 10) errs.telefone = "Telefone inválido";
    if (!formData.mensagem.trim()) errs.mensagem = "Escreva sua mensagem";
    
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const enviar = async () => {
    if (!validate()) return;

    const spam = localStorage.getItem("cbmaq_contato_last");
    if (spam && Date.now() - parseInt(spam) < 600000) { // 10 minutes anti-spam
      setStatus("error");
      setErrorMsg("Aguarde alguns minutos antes de enviar outra mensagem.");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Erro ao enviar contato.");

      localStorage.setItem("cbmaq_contato_last", Date.now().toString());
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
    <section className="section-padding bg-[#F8F9FA] overflow-hidden" id="contato-form">
      <div className="section-container max-w-[800px]">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-[#001647] text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Envie uma Mensagem
          </h2>
          <p className="text-[#4d5c7e] text-[1.125rem] max-w-[600px] mx-auto">
            Preencha o formulário abaixo e nossa equipe entrará em contato com você o mais breve possível.
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

            <div>
              <label className={labelCls}>Empresa (Opcional)</label>
              <input
                type="text"
                placeholder="Nome da sua empresa"
                className={inputCls}
                value={formData.empresa}
                onChange={(e) => updateField("empresa", e.target.value)}
              />
            </div>

            <div>
              <label className={labelCls}>Assunto *</label>
              <div className="relative">
                <select
                  className={`${inputCls} appearance-none`}
                  value={formData.assunto}
                  onChange={(e) => updateField("assunto", e.target.value)}
                >
                  <option value="Dúvida Comercial">Dúvida Comercial</option>
                  <option value="Peças e Serviços">Peças e Serviços</option>
                  <option value="Suporte Técnico">Suporte Técnico</option>
                  <option value="Outro Assunto">Outro Assunto</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none"><path d="M1 1.5L6 6.5L11 1.5" stroke="#053474" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              </div>
            </div>

            <div className="md:col-span-2">
              <label className={labelCls}>Mensagem *</label>
              <textarea
                placeholder="Como podemos te ajudar?"
                className={`${inputCls} min-h-[160px] py-4 resize-y`}
                value={formData.mensagem}
                onChange={(e) => updateField("mensagem", e.target.value)}
              />
              {errors.mensagem && <p className="text-red-500 text-[11px] font-bold mt-1">{errors.mensagem}</p>}
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
                "Enviar Mensagem"
              )}
            </button>
          </div>
        </motion.div>

        <SuccessModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Mensagem Enviada!"
          message="Agradecemos o seu contato. Nossa equipe retornará o mais breve possível."
        />
      </div>
    </section>
  );
}
