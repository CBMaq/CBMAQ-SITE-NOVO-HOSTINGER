"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, AlertCircle } from "lucide-react";
import { SuccessModal } from "@/components/shared/SuccessModal";

const inputCls = "h-[3.25rem] px-4 rounded-[8px] bg-[#F8F9FA] border-[#E0E4EA] border-[1.5px] focus:border-[#0A4EE4] outline-none transition-all font-medium text-[#001647] text-[0.875rem] w-full";
const labelCls = "text-[0.8rem] font-bold text-[#053474] mb-1.5 block";

const maskPhone = (v: string) => {
  const d = v.replace(/\D/g, "");
  if (d.length <= 10) return d.replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{4})(\d)/, "$1-$2").slice(0, 14);
  return d.replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{5})(\d)/, "$1-$2").slice(0, 15);
};

const maskBRL = (v: string) => {
  const d = v.replace(/\D/g, "");
  if (!d) return "";
  const num = parseInt(d, 10);
  return (num / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
};

interface FormData {
  nomeCompleto: string;
  email: string;
  telefone: string;
  tipoEquipamento: string;
  anoFabricacao: string;
  valorAproximado: string;
  tipoCotacao: string;
  mensagem: string;
}

const emptyForm: FormData = {
  nomeCompleto: "",
  email: "",
  telefone: "",
  tipoEquipamento: "",
  anoFabricacao: "",
  valorAproximado: "",
  tipoCotacao: "Individual",
  mensagem: "",
};

export function SegurosFormSection() {
  const [form, setForm] = useState<FormData>(emptyForm);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateField = (field: keyof FormData, val: string) => {
    let v = val;
    if (field === "telefone") v = maskPhone(val);
    if (field === "valorAproximado") v = maskBRL(val);
    setForm((p) => ({ ...p, [field]: v }));
    setErrors((p) => ({ ...p, [field]: "" }));
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!form.nomeCompleto.trim()) errs.nomeCompleto = "Obrigatório";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "E-mail inválido";
    if (form.telefone.replace(/\D/g, "").length < 10) errs.telefone = "Telefone inválido";
    if (!form.tipoEquipamento.trim()) errs.tipoEquipamento = "Obrigatório";
    if (!form.anoFabricacao.trim()) errs.anoFabricacao = "Obrigatório";
    if (!form.valorAproximado.trim()) errs.valorAproximado = "Obrigatório";
    if (!form.tipoCotacao) errs.tipoCotacao = "Obrigatório";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const enviar = async () => {
    if (!validate()) return;

    const spam = localStorage.getItem("cbmaq_seguros_last");
    if (spam && Date.now() - parseInt(spam) < 600000) {
      setStatus("error");
      setErrorMsg("Aguarde 10 minutos entre envios.");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/seguros", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const result = await res.json();
      if (res.ok) {
        setStatus("success");
        setModalOpen(true);
        localStorage.setItem("cbmaq_seguros_last", Date.now().toString());
        setForm(emptyForm);
      } else {
        setStatus("error");
        setErrorMsg(result.message || "Erro ao enviar.");
      }
    } catch (e) {
      setStatus("error");
      setErrorMsg(e instanceof Error ? e.message : "Erro de rede.");
    }
  };

  const ErrSpan = ({ msg }: { msg?: string }) => (
    <div className="h-4 mt-0.5">{msg && <span className="text-red-500 text-[10px] font-bold">{msg}</span>}</div>
  );

  return (
    <section id="seguros-contato" className="section-padding bg-white">
      <div className="section-container">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-[2rem] md:text-[3rem] font-extrabold text-[#053474] text-center mb-16 tracking-tight">
            Solicite sua Cotação
          </h2>

          <div className="w-full max-w-[1100px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-5 md:gap-y-1">
              {/* Row 1 */}
              <div>
                <label className={labelCls}>Nome completo</label>
                <input className={inputCls} value={form.nomeCompleto} onChange={(e) => updateField("nomeCompleto", e.target.value)} />
                <ErrSpan msg={errors.nomeCompleto} />
              </div>
              <div>
                <label className={labelCls}>E-mail</label>
                <input className={inputCls} type="email" value={form.email} onChange={(e) => updateField("email", e.target.value)} />
                <ErrSpan msg={errors.email} />
              </div>
              <div>
                <label className={labelCls}>Telefone</label>
                <input className={inputCls} value={form.telefone} maxLength={15} onChange={(e) => updateField("telefone", e.target.value)} />
                <ErrSpan msg={errors.telefone} />
              </div>

              {/* Row 2: Equipment Info + Message */}
              <div className="md:col-span-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5 md:gap-y-1">
                  <div>
                    <label className={labelCls}>Tipo de Equipamento</label>
                    <input className={inputCls} value={form.tipoEquipamento} onChange={(e) => updateField("tipoEquipamento", e.target.value)} />
                    <ErrSpan msg={errors.tipoEquipamento} />
                  </div>
                  <div>
                    <label className={labelCls}>Ano de Fabricação</label>
                    <input className={inputCls} value={form.anoFabricacao} maxLength={4} onChange={(e) => updateField("anoFabricacao", e.target.value.replace(/\D/g, ""))} />
                    <ErrSpan msg={errors.anoFabricacao} />
                  </div>
                  
                  <div>
                    <label className={labelCls}>Valor Aproximado</label>
                    <input className={inputCls} value={form.valorAproximado} onChange={(e) => updateField("valorAproximado", e.target.value)} placeholder="R$ 0,00" />
                    <ErrSpan msg={errors.valorAproximado} />
                  </div>
                  <div>
                    <label className={labelCls}>Tipo de Cotação</label>
                    <select className={inputCls} value={form.tipoCotacao} onChange={(e) => updateField("tipoCotacao", e.target.value)}>
                      <option value="Individual">Individual</option>
                      <option value="Frotista">Frotista</option>
                    </select>
                    <ErrSpan msg={errors.tipoCotacao} />
                  </div>
                </div>
              </div>

              {/* Right Column: Message and Button */}
              <div className="md:col-span-1 flex flex-col h-full mt-0 md:mt-[-6px] gap-5 md:gap-0">
                <div>
                  <textarea
                    placeholder="Mensagem opcional"
                    className="h-[124px] md:h-[124px] px-4 py-3 rounded-[8px] bg-[#F8F9FA] border-[#E0E4EA] border-[1.5px] focus:border-[#0A4EE4] outline-none transition-all font-medium text-[#001647] text-[0.875rem] w-full resize-none"
                    value={form.mensagem}
                    onChange={(e) => updateField("mensagem", e.target.value)}
                  />
                </div>

                <div className="mt-auto pb-[18px]">
                  <button
                    type="button"
                    onClick={enviar}
                    disabled={status === "loading"}
                    className="h-[3.25rem] w-full rounded-lg bg-[#0A4EE4] text-white font-bold text-[1rem] hover:bg-[#083DB4] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {status === "loading" ? (
                      <Loader2 className="animate-spin w-5 h-5" />
                    ) : (
                      "Enviar Solicitação"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Error feedback */}
          <div className="h-8 flex items-center justify-center mt-4">
            <AnimatePresence>
              {status === "error" && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-2 text-red-500 font-bold text-[0.875rem]">
                  <AlertCircle className="h-5 w-5" /> {errorMsg}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      <SuccessModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setStatus("idle");
        }}
        title="Solicitação Enviada!"
        message="Recebemos sua solicitação de seguro com sucesso. Nossa equipe entrará em contato em breve."
      />
    </section>
  );
}
