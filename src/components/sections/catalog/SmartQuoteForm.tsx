"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, AlertCircle, Send } from "lucide-react";
import { SuccessModal } from "@/components/shared/SuccessModal";
import { toast } from "sonner";

const formSchema = z.object({
  fullName: z.string().min(3, "Nome completo é obrigatório"),
  email: z.string().email("E-mail inválido"),
  phone: z.string().min(10, "Telefone inválido"),
  company: z.string().min(2, "Empresa é obrigatória"),
  cnpj: z.string().min(14, "CNPJ inválido"),
  message: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface SmartQuoteFormProps {
  product: any;
}

export function SmartQuoteForm({ product }: SmartQuoteFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const maskPhone = (value: string) => {
    if (!value) return "";
    value = value.replace(/\D/g, "");
    if (value.length <= 10) {
      return value.replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{4})(\d)/, "$1-$2").slice(0, 14);
    } else {
      return value.replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{5})(\d)/, "$1-$2").slice(0, 15);
    }
  };

  const maskCNPJ = (value: string) => {
    if (!value) return "";
    value = value.replace(/\D/g, "");
    return value
      .replace(/^(\d{2})(\d)/, "$1.$2")
      .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1/$2")
      .replace(/(\d{4})(\d)/, "$1-$2")
      .slice(0, 18);
  };

  const onSubmit = async (data: FormData) => {
    // Anti-spam protection
    const lastSubmission = localStorage.getItem('cbmaq_smartquote_submission');
    if (lastSubmission) {
      const diff = Date.now() - parseInt(lastSubmission);
      const fiveMinutes = 5 * 60 * 1000;
      if (diff < fiveMinutes) {
        setStatus("error");
        setErrorMessage("Por favor, aguarde 5 minutos para enviar uma nova solicitação.");
        return;
      }
    }

    setStatus("loading");
    
    // Enrich data with product context
    const enrichedData = {
      ...data,
      productName: product.name,
      productBrand: product.brand?.name,
      productCategory: product.category?.name,
      productUrl: typeof window !== "undefined" ? window.location.href : "",
      classification: product.classification,
    };

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(enrichedData),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus("success");
        setIsModalOpen(true);
        localStorage.setItem('cbmaq_smartquote_submission', Date.now().toString());
        reset();
      } else {
        setStatus("error");
        setErrorMessage(result.message || "Erro ao enviar proposta.");
        toast.error(result.message || "Erro ao enviar proposta.");
      }
    } catch (error) {
      setStatus("error");
      setErrorMessage("Erro de conexão. Verifique sua internet.");
    }
  };

  return (
    <section id="proposta" className="section-padding bg-white">
      <div className="section-container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[10px] font-bold text-[#0A4EE4] uppercase tracking-[0.3em] mb-4 block">Solicite um Orçamento</span>
            <h2 className="text-3xl md:text-5xl font-bold text-[#0A2A5E] tracking-tight">
              Proposta Personalizada
            </h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 bg-[#F8F9FA] p-8 md:p-12 rounded-[2.5rem] border border-[#E9ECEF]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Produto/Motor Pré-preenchido */}
              <div className="flex flex-col md:col-span-2">
                <label className="text-[13px] font-bold text-[#0A2A5E] mb-3 uppercase tracking-wider">
                  {product.productType === "engine" ? "Motor Escolhido" : "Equipamento Escolhido"}
                </label>
                <input
                  type="text"
                  value={product.productType === "engine" && product.engineCode ? `${product.name} - ${product.engineCode}` : product.name}
                  disabled
                  className="h-14 px-6 rounded-[8px] bg-slate-100 border-[#E9ECEF] border-2 text-[#0A2A5E] font-bold opacity-70 cursor-not-allowed"
                />
              </div>

              {/* Nome */}
              <div className="flex flex-col">
                <label className="text-[13px] font-bold text-[#0A2A5E] mb-3 uppercase tracking-wider">Nome Completo</label>
                <input
                  {...register("fullName")}
                  placeholder="Seu nome"
                  className="h-14 px-6 rounded-[8px] bg-white border-[#E9ECEF] border-2 focus:border-[#0A4EE4] outline-none transition-all font-bold text-[#0A2A5E] placeholder:text-[#0A2A5E]/30"
                />
                {errors.fullName && <span className="text-red-500 text-[10px] font-bold mt-2 uppercase">{errors.fullName.message}</span>}
              </div>

              {/* Email */}
              <div className="flex flex-col">
                <label className="text-[13px] font-bold text-[#0A2A5E] mb-3 uppercase tracking-wider">E-mail Corporativo</label>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="email@empresa.com.br"
                  className="h-14 px-6 rounded-[8px] bg-white border-[#E9ECEF] border-2 focus:border-[#0A4EE4] outline-none transition-all font-bold text-[#0A2A5E] placeholder:text-[#0A2A5E]/30"
                />
                {errors.email && <span className="text-red-500 text-[10px] font-bold mt-2 uppercase">{errors.email.message}</span>}
              </div>

              {/* Telefone */}
              <div className="flex flex-col">
                <label className="text-[13px] font-bold text-[#0A2A5E] mb-3 uppercase tracking-wider">WhatsApp / Telefone</label>
                <input
                  {...register("phone", {
                    onChange: (e) => { e.target.value = maskPhone(e.target.value); }
                  })}
                  placeholder="(00) 00000-0000"
                  maxLength={15}
                  className="h-14 px-6 rounded-[8px] bg-white border-[#E9ECEF] border-2 focus:border-[#0A4EE4] outline-none transition-all font-bold text-[#0A2A5E] placeholder:text-[#0A2A5E]/30"
                />
                {errors.phone && <span className="text-red-500 text-[10px] font-bold mt-2 uppercase">{errors.phone.message}</span>}
              </div>

              {/* CNPJ */}
              <div className="flex flex-col">
                <label className="text-[13px] font-bold text-[#0A2A5E] mb-3 uppercase tracking-wider">CNPJ</label>
                <input
                  {...register("cnpj", {
                    onChange: (e) => { e.target.value = maskCNPJ(e.target.value); }
                  })}
                  placeholder="00.000.000/0000-00"
                  maxLength={18}
                  className="h-14 px-6 rounded-[8px] bg-white border-[#E9ECEF] border-2 focus:border-[#0A4EE4] outline-none transition-all font-bold text-[#0A2A5E] placeholder:text-[#0A2A5E]/30"
                />
                {errors.cnpj && <span className="text-red-500 text-[10px] font-bold mt-2 uppercase">{errors.cnpj.message}</span>}
              </div>

              {/* Empresa */}
              <div className="flex flex-col md:col-span-2">
                <label className="text-[13px] font-bold text-[#0A2A5E] mb-3 uppercase tracking-wider">Nome da Empresa</label>
                <input
                  {...register("company")}
                  placeholder="Razão Social"
                  className="h-14 px-6 rounded-[8px] bg-white border-[#E9ECEF] border-2 focus:border-[#0A4EE4] outline-none transition-all font-bold text-[#0A2A5E] placeholder:text-[#0A2A5E]/30"
                />
                {errors.company && <span className="text-red-500 text-[10px] font-bold mt-2 uppercase">{errors.company.message}</span>}
              </div>

              {/* Mensagem */}
              <div className="flex flex-col md:col-span-2">
                <label className="text-[13px] font-bold text-[#0A2A5E] mb-3 uppercase tracking-wider">Observações (Opcional)</label>
                <textarea
                  {...register("message")}
                  placeholder="Descreva sua necessidade ou aplicação..."
                  rows={4}
                  className="p-6 rounded-[8px] bg-white border-[#E9ECEF] border-2 focus:border-[#0A4EE4] outline-none transition-all font-bold text-[#0A2A5E] placeholder:text-[#0A2A5E]/30 resize-none"
                />
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full h-16 rounded-[8px] bg-[#0A2A5E] text-white font-bold text-sm uppercase tracking-[0.2em] hover:bg-[#051C42] transition-all flex items-center justify-center gap-3 disabled:opacity-50 shadow-xl shadow-[#0A2A5E]/10"
              >
                {status === "loading" ? (
                  <><Loader2 className="animate-spin h-5 w-5" /> Processando...</>
                ) : (
                  <><Send className="h-4 w-4" /> Enviar Solicitação</>
                )}
              </button>
            </div>
            
            <AnimatePresence>
              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-center gap-2 text-red-500 font-bold text-xs uppercase"
                >
                  <AlertCircle className="h-4 w-4" />
                  {errorMessage}
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </div>

      <SuccessModal 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false);
          setStatus("idle");
        }}
      />
    </section>
  );
}
