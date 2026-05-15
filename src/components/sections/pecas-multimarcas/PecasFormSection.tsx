"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, AlertCircle, Pencil, Trash2, Plus } from "lucide-react";
import imageCompression from "browser-image-compression";
import { SuccessModal } from "@/components/shared/SuccessModal";
import { supabase } from "@/lib/supabase";
import { FileUploadZone } from "./FileUploadZone";
import { saveDraft, loadDraft, saveFile, loadFile, clearDraft } from "./usePecasDraft";
import type { DadosEmpresa, SolicitacaoItem } from "./usePecasDraft";

interface SolicitacaoLocal extends SolicitacaoItem {
  fotos: File[];
  documentos: File[];
}

const emptyEmpresa: DadosEmpresa = {
  empresa: "", cnpj: "", email: "", telefone: "",
  endereco: "", cidadeEstado: "", nomeResponsavel: "",
};

const emptySol = (): SolicitacaoLocal => ({
  id: crypto.randomUUID(),
  marcaMaquina: "", modeloMaquina: "", tipoPeca: "", descricaoPeca: "",
  fotosNames: [], documentosNames: [], fotos: [], documentos: [],
});

const maskPhone = (v: string) => {
  const d = v.replace(/\D/g, "");
  if (d.length <= 10) return d.replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{4})(\d)/, "$1-$2").slice(0, 14);
  return d.replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{5})(\d)/, "$1-$2").slice(0, 15);
};

const maskCNPJ = (v: string) => {
  const d = v.replace(/\D/g, "").slice(0, 14);
  return d
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2");
};

const inputCls = "h-[3.25rem] px-4 rounded-[8px] bg-[#F8F9FA] border-[#E0E4EA] border-[1.5px] focus:border-[#0A4EE4] outline-none transition-all font-medium text-[#001647] text-[0.875rem] w-full";
const labelCls = "text-[0.8rem] font-bold text-[#053474] mb-1.5 block";
const cardCls = "bg-white rounded-[20px] p-6 md:p-8 shadow-[0_2px_16px_rgba(0,0,0,0.05)] border border-[#F1F5F9]";

export function PecasFormSection() {
  const [empresa, setEmpresa] = useState<DadosEmpresa>(emptyEmpresa);
  const [solicitacoes, setSolicitacoes] = useState<SolicitacaoLocal[]>([]);
  const [atual, setAtual] = useState<SolicitacaoLocal>(emptySol());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [empresaErrors, setEmpresaErrors] = useState<Record<string, string>>({});
  const [solErrors, setSolErrors] = useState<Record<string, string>>({});

  // --- Restore draft ---
  useEffect(() => {
    loadDraft().then(async (d) => {
      if (!d) return;
      setEmpresa(d.dadosEmpresa);
      const restored: SolicitacaoLocal[] = [];
      for (const s of d.solicitacoes) {
        const fotos: File[] = [];
        const docs: File[] = [];
        for (let i = 0; i < s.fotosNames.length; i++) {
          const f = await loadFile(`${s.id}-foto-${i}`);
          if (f) fotos.push(f);
        }
        for (let i = 0; i < s.documentosNames.length; i++) {
          const f = await loadFile(`${s.id}-doc-${i}`);
          if (f) docs.push(f);
        }
        restored.push({ ...s, fotos, documentos: docs });
      }
      setSolicitacoes(restored);
    });
  }, []);

  // --- Persist draft ---
  const persist = useCallback(async (emp: DadosEmpresa, sols: SolicitacaoLocal[]) => {
    const items: SolicitacaoItem[] = sols.map(s => ({
      id: s.id, marcaMaquina: s.marcaMaquina, modeloMaquina: s.modeloMaquina,
      tipoPeca: s.tipoPeca, descricaoPeca: s.descricaoPeca,
      fotosNames: s.fotos.map(f => f.name), documentosNames: s.documentos.map(f => f.name),
    }));
    await saveDraft({ dadosEmpresa: emp, solicitacoes: items });
    for (const s of sols) {
      for (let i = 0; i < s.fotos.length; i++) await saveFile(`${s.id}-foto-${i}`, s.fotos[i]);
      for (let i = 0; i < s.documentos.length; i++) await saveFile(`${s.id}-doc-${i}`, s.documentos[i]);
    }
  }, []);

  const updateEmpresa = (field: keyof DadosEmpresa, val: string) => {
    let v = val;
    if (field === "telefone") v = maskPhone(val);
    if (field === "cnpj") v = maskCNPJ(val);
    const next = { ...empresa, [field]: v };
    setEmpresa(next);
    setEmpresaErrors(p => ({ ...p, [field]: "" }));
  };

  // --- Validate solicitação ---
  const validateSol = (): boolean => {
    const errs: Record<string, string> = {};
    if (!atual.marcaMaquina.trim()) errs.marcaMaquina = "Obrigatório";
    if (!atual.modeloMaquina.trim()) errs.modeloMaquina = "Obrigatório";
    if (!atual.tipoPeca.trim()) errs.tipoPeca = "Obrigatório";
    if (!atual.descricaoPeca.trim()) errs.descricaoPeca = "Obrigatório";
    setSolErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // --- Save item ---
  const salvarSolicitacao = () => {
    if (!validateSol()) return;
    let next: SolicitacaoLocal[];
    if (editingId) {
      next = solicitacoes.map(s => s.id === editingId ? { ...atual, id: editingId } : s);
      setEditingId(null);
    } else {
      next = [...solicitacoes, atual];
    }
    setSolicitacoes(next);
    setAtual(emptySol());
    setSolErrors({});
    persist(empresa, next);
  };

  const cancelar = () => {
    setAtual(emptySol());
    setEditingId(null);
    setSolErrors({});
  };

  const editarItem = (id: string) => {
    const item = solicitacoes.find(s => s.id === id);
    if (item) { setAtual({ ...item }); setEditingId(id); }
  };

  const removerItem = (id: string) => {
    const next = solicitacoes.filter(s => s.id !== id);
    setSolicitacoes(next);
    persist(empresa, next);
  };

  // --- Validate empresa ---
  const validateEmpresa = (): boolean => {
    const errs: Record<string, string> = {};
    if (!empresa.empresa.trim()) errs.empresa = "Obrigatório";
    if (empresa.cnpj.replace(/\D/g, "").length < 11) errs.cnpj = "CNPJ inválido";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(empresa.email)) errs.email = "E-mail inválido";
    if (empresa.telefone.replace(/\D/g, "").length < 10) errs.telefone = "Telefone inválido";
    if (!empresa.endereco.trim()) errs.endereco = "Obrigatório";
    if (!empresa.cidadeEstado.trim()) errs.cidadeEstado = "Obrigatório";
    if (!empresa.nomeResponsavel.trim()) errs.nomeResponsavel = "Obrigatório";
    setEmpresaErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // --- Upload file to supabase ---
  const uploadToStorage = async (file: File, path: string): Promise<string> => {
    const { error } = await supabase.storage.from("service_images").upload(path, file, { cacheControl: "3600", upsert: false });
    if (error) throw new Error(`Upload falhou: ${error.message}`);
    const { data } = supabase.storage.from("service_images").getPublicUrl(path);
    return data.publicUrl;
  };

  // --- Submit ---
  const enviar = async () => {
    if (!validateEmpresa()) return;
    if (solicitacoes.length === 0) {
      setStatus("error"); setErrorMsg("Adicione pelo menos 1 solicitação de peça."); return;
    }

    const spam = localStorage.getItem("cbmaq_pecas_last");
    if (spam && Date.now() - parseInt(spam) < 600000) {
      setStatus("error"); setErrorMsg("Aguarde 10 minutos entre envios."); return;
    }

    setStatus("loading"); setErrorMsg("");

    try {
      const ts = Date.now().toString(36);
      const solsPayload = [];

      for (const sol of solicitacoes) {
        const fotosUrls: string[] = [];
        const docsUrls: string[] = [];

        for (let i = 0; i < sol.fotos.length; i++) {
          let file = sol.fotos[i];
          if (file.type.startsWith("image/") && file.size > 1024 * 1024) {
            file = await imageCompression(file, { maxSizeMB: 0.8, maxWidthOrHeight: 1920, useWebWorker: true });
          }
          const path = `pecas-solicitacoes/${ts}/${sol.id}/fotos/${file.name}`;
          fotosUrls.push(await uploadToStorage(file, path));
        }

        for (let i = 0; i < sol.documentos.length; i++) {
          const path = `pecas-solicitacoes/${ts}/${sol.id}/docs/${sol.documentos[i].name}`;
          docsUrls.push(await uploadToStorage(sol.documentos[i], path));
        }

        solsPayload.push({
          marcaMaquina: sol.marcaMaquina, modeloMaquina: sol.modeloMaquina,
          tipoPeca: sol.tipoPeca, descricaoPeca: sol.descricaoPeca,
          fotosUrls, documentosUrls: docsUrls,
        });
      }

      const res = await fetch("/api/pecas-multimarcas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...empresa, solicitacoes: solsPayload }),
      });

      const result = await res.json();
      if (res.ok) {
        setStatus("success"); setModalOpen(true);
        localStorage.setItem("cbmaq_pecas_last", Date.now().toString());
        setEmpresa(emptyEmpresa); setSolicitacoes([]); setAtual(emptySol());
        await clearDraft();
      } else {
        setStatus("error"); setErrorMsg(result.message || "Erro ao enviar.");
      }
    } catch (e) {
      setStatus("error"); setErrorMsg(e instanceof Error ? e.message : "Erro de rede.");
    }
  };

  const ErrSpan = ({ msg }: { msg?: string }) => (
    <div className="h-4 mt-0.5">{msg && <span className="text-red-500 text-[10px] font-bold">{msg}</span>}</div>
  );

  return (
    <section id="pecas-contato" className="section-padding bg-[#F8FAFC]">
      <div className="section-container">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <h2 className="text-[2rem] md:text-[2.5rem] font-bold text-[#053474] text-center mb-3">
            Solicite sua Cotação de Peças
          </h2>
          <p className="text-[1rem] text-[#4d5c7e] text-center mb-12 max-w-[600px] mx-auto">
            Envie múltiplas solicitações de peças com fotos, dados da empresa e informações detalhadas.
          </p>

          {/* 2 Column Grid */}
          <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* LEFT COLUMN */}
            <div className="flex flex-col gap-6">
              {/* Dados da Empresa */}
              <div className={cardCls}>
                <h3 className="text-[1.35rem] font-bold text-[#053474] mb-6">Dados da empresa</h3>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                  <div>
                    <label className={labelCls}>Empresa</label>
                    <input className={inputCls} value={empresa.empresa} onChange={e => updateEmpresa("empresa", e.target.value)} />
                    <ErrSpan msg={empresaErrors.empresa} />
                  </div>
                  <div>
                    <label className={labelCls}>CNPJ</label>
                    <input className={inputCls} value={empresa.cnpj} maxLength={18} onChange={e => updateEmpresa("cnpj", e.target.value)} />
                    <ErrSpan msg={empresaErrors.cnpj} />
                  </div>
                  <div>
                    <label className={labelCls}>E-mail</label>
                    <input className={inputCls} type="email" value={empresa.email} onChange={e => updateEmpresa("email", e.target.value)} />
                    <ErrSpan msg={empresaErrors.email} />
                  </div>
                  <div>
                    <label className={labelCls}>Telefone</label>
                    <input className={inputCls} value={empresa.telefone} maxLength={15} onChange={e => updateEmpresa("telefone", e.target.value)} />
                    <ErrSpan msg={empresaErrors.telefone} />
                  </div>
                  <div className="col-span-2">
                    <label className={labelCls}>Endereço</label>
                    <input className={inputCls} value={empresa.endereco} onChange={e => updateEmpresa("endereco", e.target.value)} />
                    <ErrSpan msg={empresaErrors.endereco} />
                  </div>
                  <div className="col-span-2">
                    <label className={labelCls}>Cidade / Estado</label>
                    <input className={inputCls} value={empresa.cidadeEstado} onChange={e => updateEmpresa("cidadeEstado", e.target.value)} />
                    <ErrSpan msg={empresaErrors.cidadeEstado} />
                  </div>
                  <div className="col-span-2">
                    <label className={labelCls}>Nome do Responsável</label>
                    <input className={inputCls} value={empresa.nomeResponsavel} onChange={e => updateEmpresa("nomeResponsavel", e.target.value)} />
                    <ErrSpan msg={empresaErrors.nomeResponsavel} />
                  </div>
                </div>
              </div>

              {/* Minhas Solicitações */}
              <div className={cardCls}>
                <h3 className="text-[1.35rem] font-bold text-[#053474] mb-4">Minhas Solicitações</h3>
                {solicitacoes.length === 0 ? (
                  <p className="text-[0.85rem] text-[#9CA3AF] italic py-4">Nenhuma solicitação adicionada ainda.</p>
                ) : (
                  <div className="flex flex-col gap-3 mb-4">
                    {solicitacoes.map(s => (
                      <div key={s.id} className="flex items-center gap-3 p-3 rounded-xl border border-[#E5E7EB] bg-[#FAFBFC]">
                        {s.fotos.length > 0 ? (
                          <div className="w-14 h-14 rounded-lg overflow-hidden bg-[#F3F4F6] shrink-0">
                            <img src={URL.createObjectURL(s.fotos[0])} alt="" className="w-full h-full object-cover" />
                          </div>
                        ) : (
                          <div className="w-14 h-14 rounded-lg bg-[#F3F4F6] shrink-0 flex items-center justify-center">
                            <span className="text-[#CBD5E1] text-xl">⚙</span>
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-[0.85rem] text-[#053474] truncate">{s.tipoPeca || "Peça"}</p>
                          <p className="text-[0.75rem] text-[#6B7280] truncate">
                            Marca: {s.marcaMaquina} &nbsp;·&nbsp; Modelo: {s.modeloMaquina}
                          </p>
                        </div>
                        <div className="flex gap-1.5 shrink-0">
                          <button type="button" onClick={() => editarItem(s.id)} className="p-1.5 rounded-lg hover:bg-[#EEF2FF] text-[#0A4EE4] transition-colors">
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button type="button" onClick={() => removerItem(s.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-400 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <button type="button" onClick={() => { setAtual(emptySol()); setEditingId(null); setSolErrors({}); }}
                  className="w-full h-[3rem] rounded-xl border-2 border-dashed border-[#0A4EE4]/30 text-[#0A4EE4] font-bold text-[0.85rem] hover:bg-[#0A4EE4]/5 transition-all flex items-center justify-center gap-2">
                  <Plus className="w-4 h-4" /> Adicionar Nova Solicitação
                </button>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="flex flex-col gap-6">
              {/* Nova Solicitação */}
              <div className={cardCls}>
                <h3 className="text-[1.35rem] font-bold text-[#053474] mb-6">
                  {editingId ? "Editar Solicitação" : "Nova Solicitação de Peça"}
                </h3>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                  <div>
                    <label className={labelCls}>Marca da Máquina</label>
                    <input className={inputCls} value={atual.marcaMaquina} onChange={e => { setAtual(p => ({ ...p, marcaMaquina: e.target.value })); setSolErrors(p => ({ ...p, marcaMaquina: "" })); }} />
                    <ErrSpan msg={solErrors.marcaMaquina} />
                  </div>
                  <div>
                    <label className={labelCls}>Modelo da Máquina</label>
                    <input className={inputCls} value={atual.modeloMaquina} onChange={e => { setAtual(p => ({ ...p, modeloMaquina: e.target.value })); setSolErrors(p => ({ ...p, modeloMaquina: "" })); }} />
                    <ErrSpan msg={solErrors.modeloMaquina} />
                  </div>
                  <div className="col-span-2">
                    <label className={labelCls}>Tipo de Peça</label>
                    <input className={inputCls} value={atual.tipoPeca} onChange={e => { setAtual(p => ({ ...p, tipoPeca: e.target.value })); setSolErrors(p => ({ ...p, tipoPeca: "" })); }} />
                    <ErrSpan msg={solErrors.tipoPeca} />
                  </div>
                  <div className="col-span-2">
                    <label className={labelCls}>Descrição da Peça</label>
                    <input className={inputCls} value={atual.descricaoPeca} onChange={e => { setAtual(p => ({ ...p, descricaoPeca: e.target.value })); setSolErrors(p => ({ ...p, descricaoPeca: "" })); }} />
                    <ErrSpan msg={solErrors.descricaoPeca} />
                  </div>
                </div>

                <div className="mt-4 space-y-4">
                  <FileUploadZone
                    label="Fotos da Peça"
                    accept="image/jpeg,image/png,image/webp"
                    files={atual.fotos}
                    onFilesChange={f => setAtual(p => ({ ...p, fotos: f }))}
                    maxFiles={5} maxSizeMB={10} icon="photo"
                  />
                  <FileUploadZone
                    label="Documentos Anexos (opcional)"
                    accept=".pdf,.doc,.docx"
                    files={atual.documentos}
                    onFilesChange={f => setAtual(p => ({ ...p, documentos: f }))}
                    maxFiles={3} maxSizeMB={10} icon="document"
                    hint="PDF, DOC, DOCX até 10MB cada"
                  />
                </div>

                <div className="flex gap-3 mt-6">
                  <button type="button" onClick={cancelar}
                    className="flex-1 h-[3rem] rounded-xl border border-[#D1D5DB] text-[#6B7280] font-bold text-[0.875rem] hover:bg-[#F9FAFB] transition-all">
                    Cancelar
                  </button>
                  <button type="button" onClick={salvarSolicitacao}
                    className="flex-1 h-[3rem] rounded-xl bg-[#0A4EE4] text-white font-bold text-[0.875rem] hover:bg-[#083DB4] transition-all shadow-lg shadow-blue-600/20">
                    {editingId ? "Atualizar Solicitação" : "Salvar Solicitação"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* FOOTER BAR */}
          <div className="max-w-[1100px] mx-auto mt-6">
            <div className={`${cardCls} flex flex-col sm:flex-row items-center justify-between gap-4`}>
              <div>
                <h4 className="text-[1.1rem] font-bold text-[#053474]">Enviar Solicitações</h4>
                <p className="text-[0.85rem] text-[#6B7280]">
                  Você tem <strong className="text-[#0A4EE4]">{solicitacoes.length}</strong> solicitação(ões) pronta(s) para enviar.
                </p>
              </div>
              <button type="button" onClick={enviar} disabled={status === "loading"}
                className="h-[3.25rem] px-8 rounded-xl bg-[#053474] text-white font-bold text-[0.9rem] hover:bg-[#0A4EE4] transition-all disabled:opacity-50 flex items-center gap-2 shadow-lg whitespace-nowrap">
                {status === "loading" ? <><Loader2 className="animate-spin w-5 h-5" /> Enviando...</> : "Enviar Solicitações"}
              </button>
            </div>
          </div>

          {/* Error feedback */}
          <div className="h-8 flex items-center justify-center mt-4">
            <AnimatePresence>
              {status === "error" && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="flex items-center gap-2 text-red-500 font-bold text-[0.875rem]">
                  <AlertCircle className="h-5 w-5" /> {errorMsg}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      <SuccessModal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setStatus("idle"); }}
        title="Solicitação Enviada!"
        message="Recebemos suas solicitações de peças com sucesso. Nossa equipe entrará em contato em breve."
      />
    </section>
  );
}
