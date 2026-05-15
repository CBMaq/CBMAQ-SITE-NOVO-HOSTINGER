"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, AlertCircle } from "lucide-react";
import { SuccessModal } from "@/components/shared/SuccessModal";

const formSchema = z.object({
  fullName: z.string().min(3, "Nome completo é obrigatório"),
  email: z.string().email("E-mail inválido"),
  phone: z.string().min(10, "Telefone inválido"),
  company: z.string().min(2, "Empresa é obrigatória"),
  equipmentType: z.string().min(1, "Selecione o tipo de equipamento"),
  message: z.string().optional(),
  country: z.string().min(2, "País/Região é obrigatória"),
  importCategory: z.string().min(1, "Selecione a modalidade"),
});

type FormData = z.infer<typeof formSchema>;

export function ImportacaoFormSection() {
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

  const onSubmit = async (data: FormData) => {
    const lastSubmission = localStorage.getItem('cbmaq_last_submission');
    if (lastSubmission) {
      const diff = Date.now() - parseInt(lastSubmission);
      const tenMinutes = 10 * 60 * 1000;
      if (diff < tenMinutes) {
        setStatus("error");
        setErrorMessage("Por favor, aguarde 10 minutos para enviar uma nova solicitação.");
        return;
      }
    }

    try {
      setStatus("loading");
      const response = await fetch("/api/quote-importacao", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus("success");
        setIsModalOpen(true);
        localStorage.setItem('cbmaq_last_submission', Date.now().toString());
        reset();
      } else {
        setStatus("error");
        setErrorMessage(result.message || "Erro ao enviar formulário.");
      }
    } catch (error) {
      setStatus("error");
      setErrorMessage("Erro de rede. Tente novamente mais tarde.");
    }
  };

  return (
    <section id="cotacao" className="section-padding bg-white overflow-hidden">
      <div className="section-container max-w-[1000px]">

        <div className="text-center mb-16">
          <h2 className="text-[2.25rem] md:text-[2.75rem] font-bold text-[#053474] tracking-tight">
            Solicite sua Cotação
          </h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            
            {/* Col 1 */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-col">
                <label className="text-[0.875rem] font-bold text-[#0A4EE4] mb-2">Nome completo</label>
                <input
                  {...register("fullName")}
                  className="h-[3.25rem] px-5 rounded-[8px] bg-[#F8F9FA] border-[#E9ECEF] border-[1.5px] focus:border-[#0A4EE4] outline-none transition-all font-medium text-[#001647]"
                />
                <div className="h-5 mt-1">
                  {errors.fullName && <span className="text-red-500 text-xs font-bold">{errors.fullName.message}</span>}
                </div>
              </div>

              <div className="flex flex-col">
                <label className="text-[0.875rem] font-bold text-[#0A4EE4] mb-2">Empresa</label>
                <input
                  {...register("company")}
                  className="h-[3.25rem] px-5 rounded-[8px] bg-[#F8F9FA] border-[#E9ECEF] border-[1.5px] focus:border-[#0A4EE4] outline-none transition-all font-medium text-[#001647]"
                />
                <div className="h-5 mt-1">
                  {errors.company && <span className="text-red-500 text-xs font-bold">{errors.company.message}</span>}
                </div>
              </div>

              <div className="flex flex-col">
                <label className="text-[0.875rem] font-bold text-[#0A4EE4] mb-2">País/Região de Origem</label>
                <input
                  {...register("country")}
                  className="h-[3.25rem] px-5 rounded-[8px] bg-[#F8F9FA] border-[#E9ECEF] border-[1.5px] focus:border-[#0A4EE4] outline-none transition-all font-medium text-[#001647]"
                />
                <div className="h-5 mt-1">
                  {errors.country && <span className="text-red-500 text-xs font-bold">{errors.country.message}</span>}
                </div>
              </div>
            </div>

            {/* Col 2 */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-col">
                <label className="text-[0.875rem] font-bold text-[#0A4EE4] mb-2">E-mail</label>
                <input
                  {...register("email")}
                  type="email"
                  className="h-[3.25rem] px-5 rounded-[8px] bg-[#F8F9FA] border-[#E9ECEF] border-[1.5px] focus:border-[#0A4EE4] outline-none transition-all font-medium text-[#001647]"
                />
                <div className="h-5 mt-1">
                  {errors.email && <span className="text-red-500 text-xs font-bold">{errors.email.message}</span>}
                </div>
              </div>

              <div className="flex flex-col">
                <label className="text-[0.875rem] font-bold text-[#0A4EE4] mb-2">Tipo de Equipamento</label>
                <input
                  {...register("equipmentType")}
                  className="h-[3.25rem] px-5 rounded-[8px] bg-[#F8F9FA] border-[#E9ECEF] border-[1.5px] focus:border-[#0A4EE4] outline-none transition-all font-medium text-[#001647]"
                />
                <div className="h-5 mt-1">
                  {errors.equipmentType && <span className="text-red-500 text-xs font-bold">{errors.equipmentType.message}</span>}
                </div>
              </div>

              <div className="flex flex-col">
                <label className="text-[0.875rem] font-bold text-[#0A4EE4] mb-2">Modalidade de Importação</label>
                <select
                  {...register("importCategory")}
                  className="h-[3.25rem] px-4 rounded-[8px] bg-[#F8F9FA] border-[#E9ECEF] border-[1.5px] focus:border-[#0A4EE4] outline-none transition-all font-medium text-[#4d5c7e] appearance-none"
                >
                  <option value="">Selecione...</option>
                  <option value="Conta e Ordem de Terceiros">Conta e Ordem de Terceiros</option>
                  <option value="Compra e Venda por Encomenda">Compra e Venda por Encomenda</option>
                  <option value="Gerenciamento Completo">Gerenciamento Completo</option>
                </select>
                <div className="h-5 mt-1">
                  {errors.importCategory && <span className="text-red-500 text-xs font-bold">{errors.importCategory.message}</span>}
                </div>
              </div>
            </div>

            {/* Col 3 */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-col">
                <label className="text-[0.875rem] font-bold text-[#0A4EE4] mb-2">Telefone</label>
                <input
                  {...register("phone", {
                    onChange: (e) => { e.target.value = maskPhone(e.target.value); }
                  })}
                  maxLength={15}
                  className="h-[3.25rem] px-5 rounded-[8px] bg-[#F8F9FA] border-[#E9ECEF] border-[1.5px] focus:border-[#0A4EE4] outline-none transition-all font-medium text-[#001647]"
                />
                <div className="h-5 mt-1">
                  {errors.phone && <span className="text-red-500 text-xs font-bold">{errors.phone.message}</span>}
                </div>
              </div>

              <div className="flex flex-col flex-1 pb-[1.75rem]">
                <label className="text-[0.875rem] font-bold text-[#0A4EE4] opacity-0 mb-2 hidden md:block">Spacer</label>
                <textarea
                  {...register("message")}
                  placeholder="Mensagem opcional"
                  className="w-full flex-1 min-h-[140px] px-5 py-4 rounded-[8px] bg-[#F8F9FA] border-[#E9ECEF] border-[1.5px] focus:border-[#0A4EE4] outline-none transition-all font-medium text-[#001647] resize-none"
                />
              </div>
            </div>
            
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 -mt-2">
            <div className="md:col-start-3 flex flex-col items-end">
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full md:w-auto h-[3.5rem] px-8 rounded-full bg-[#0A4EE4] hover:bg-[#083DB4] text-white text-[1rem] font-bold transition-all shadow-lg disabled:opacity-50 inline-flex items-center justify-center gap-2"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="animate-spin h-5 w-5" />
                    Enviando...
                  </>
                ) : "Enviar Solicitação"}
              </button>

              <div className="h-8 mt-2 w-full">
                <AnimatePresence>
                  {status === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center justify-end gap-2 text-red-500 font-bold"
                    >
                      <AlertCircle className="h-5 w-5" />
                      <span className="text-sm">{errorMessage}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </form>
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
