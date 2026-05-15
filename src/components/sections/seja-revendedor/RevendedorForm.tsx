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
  institution: z.string().min(2, "Órgão/Instituição é obrigatório"),
  acquisitionType: z.string().min(1, "Selecione o tipo de aquisição"),
  equipment: z.string().min(1, "Equipamento de interesse é obrigatório"),
  message: z.string().optional().or(z.literal("")),
});

type FormData = z.infer<typeof formSchema>;

export function RevendedorForm() {
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
      return value
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{4})(\d)/, "$1-$2")
        .slice(0, 14);
    } else {
      return value
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2")
        .slice(0, 15);
    }
  };

  const onSubmit = async (data: FormData) => {
    // Anti-spam protection (matching global)
    const lastSubmission = localStorage.getItem('cbmaq_revendedor_submission');
    if (lastSubmission) {
      const diff = Date.now() - parseInt(lastSubmission);
      const tenMinutes = 10 * 60 * 1000;
      if (diff < tenMinutes) {
        setStatus("error");
        setErrorMessage("Por favor, aguarde 10 minutos para enviar uma nova solicitação.");
        return;
      }
    }

    setStatus("loading");

    try {
      const response = await fetch("/api/seja-revendedor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus("success");
        setIsModalOpen(true);
        localStorage.setItem('cbmaq_revendedor_submission', Date.now().toString());
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
    <section id="formulario" className="bg-[#F8F9FA]/30 section-padding">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-[2rem] md:text-[2.5rem] font-bold text-[#0A2A5E] text-center mb-16">
            Formulário
          </h2>

          <div className="max-w-[1100px] mx-auto">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              
              {/* Grid Principal */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4">
                
                {/* Linha 1: Três colunas iguais */}
                <div className="flex flex-col">
                  <label className="text-[1rem] font-bold text-[#0A2A5E] mb-2">Nome completo</label>
                  <input
                    {...register("fullName")}
                    className="h-[3.5rem] px-5 rounded-[12px] bg-[#F8F9FA] border-[#E9ECEF] border-[1px] focus:border-[#0A4EE4] outline-none transition-all font-medium text-[#001647]"
                  />
                  <div className="h-4 mt-1">
                    {errors.fullName && <span className="text-red-500 text-[10px] font-bold block">{errors.fullName.message}</span>}
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className="text-[1rem] font-bold text-[#0A2A5E] mb-2">E-mail</label>
                  <input
                    {...register("email")}
                    type="email"
                    className="h-[3.5rem] px-5 rounded-[12px] bg-[#F8F9FA] border-[#E9ECEF] border-[1px] focus:border-[#0A4EE4] outline-none transition-all font-medium text-[#001647]"
                  />
                  <div className="h-4 mt-1">
                    {errors.email && <span className="text-red-500 text-[10px] font-bold block">{errors.email.message}</span>}
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className="text-[1rem] font-bold text-[#0A2A5E] mb-2">Telefone</label>
                  <input
                    {...register("phone", {
                      onChange: (e) => {
                        e.target.value = maskPhone(e.target.value);
                      }
                    })}
                    maxLength={15}
                    className="h-[3.5rem] px-5 rounded-[12px] bg-[#F8F9FA] border-[#E9ECEF] border-[1px] focus:border-[#0A4EE4] outline-none transition-all font-medium text-[#001647]"
                  />
                  <div className="h-4 mt-1">
                    {errors.phone && <span className="text-red-500 text-[10px] font-bold block">{errors.phone.message}</span>}
                  </div>
                </div>

                {/* Bloco Esquerda (Órgão, Tipo, Equipamento) - Ocupa 2 colunas */}
                <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                  <div className="flex flex-col">
                    <label className="text-[1rem] font-bold text-[#0A2A5E] mb-2">Órgão/Instituição</label>
                    <input
                      {...register("institution")}
                      className="h-[3.5rem] px-5 rounded-[12px] bg-[#F8F9FA] border-[#E9ECEF] border-[1px] focus:border-[#0A4EE4] outline-none transition-all font-medium text-[#001647]"
                    />
                    <div className="h-4 mt-1">
                      {errors.institution && <span className="text-red-500 text-[10px] font-bold block">{errors.institution.message}</span>}
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <label className="text-[1rem] font-bold text-[#0A2A5E] mb-2">Tipo de Aquisição</label>
                    <select
                      {...register("acquisitionType")}
                      className="h-[3.5rem] px-4 rounded-[12px] bg-[#F8F9FA] border-[#E9ECEF] border-[1px] focus:border-[#0A4EE4] outline-none transition-all font-medium text-[#4d5c7e] appearance-none"
                    >
                      <option value="">Selecione...</option>
                      <option value="Compra Direta">Compra Direta</option>
                      <option value="Licitação">Licitação</option>
                      <option value="Outros">Outros</option>
                    </select>
                    <div className="h-4 mt-1">
                      {errors.acquisitionType && <span className="text-red-500 text-[10px] font-bold block">{errors.acquisitionType.message}</span>}
                    </div>
                  </div>

                  <div className="md:col-span-2 flex flex-col">
                    <label className="text-[1rem] font-bold text-[#0A2A5E] mb-2">Equipamento de Interesse</label>
                    <input
                      {...register("equipment")}
                      className="h-[3.5rem] px-5 rounded-[12px] bg-[#F8F9FA] border-[#E9ECEF] border-[1px] focus:border-[#0A4EE4] outline-none transition-all font-medium text-[#001647]"
                    />
                    <div className="h-4 mt-1">
                      {errors.equipment && <span className="text-red-500 text-[10px] font-bold block">{errors.equipment.message}</span>}
                    </div>
                  </div>
                </div>

                {/* Bloco Direita (Mensagem + Botão) - Ocupa 1 coluna */}
                <div className="md:col-span-1 flex flex-col pt-8 md:pt-0">
                  <div className="flex-1">
                    <textarea
                      {...register("message")}
                      placeholder="Mensagem opcional"
                      className="w-full h-[145px] md:h-[135px] px-5 py-4 rounded-[12px] bg-[#F8F9FA] border-[#E9ECEF] border-[1px] focus:border-[#0A4EE4] outline-none transition-all font-medium text-[#001647] resize-none"
                    />
                    <div className="h-4 mt-1">
                      {errors.message && <span className="text-red-500 text-[10px] font-bold block">{errors.message.message}</span>}
                    </div>
                  </div>

                  <div className="mt-2">
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full h-[3.5rem] bg-[#0A4EE4] hover:bg-[#0A4EE4]/90 text-white rounded-[8px] text-[1rem] font-bold transition-all disabled:opacity-50 flex items-center justify-center shadow-lg shadow-blue-600/20"
                    >
                      {status === "loading" ? (
                        <Loader2 className="animate-spin h-5 w-5" />
                      ) : "Enviar Solicitação"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Mensagem de Erro Global */}
              <div className="h-8 flex items-center justify-center w-full">
                <AnimatePresence>
                  {status === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2 text-red-500 font-bold"
                    >
                      <AlertCircle className="h-5 w-5" />
                      {errorMessage}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </form>
          </div>
        </motion.div>
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
