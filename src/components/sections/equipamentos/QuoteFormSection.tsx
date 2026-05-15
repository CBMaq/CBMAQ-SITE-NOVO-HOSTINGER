"use client";

import { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { SuccessModal } from "@/components/shared/SuccessModal";

const formSchema = z.object({
  fullName: z.string().min(3, "Nome completo é obrigatório"),
  email: z.string().email("E-mail inválido"),
  phone: z.string().min(10, "Telefone inválido"),
  company: z.string().min(2, "Empresa é obrigatória"),
  equipmentType: z.string().min(1, "Selecione o tipo de equipamento"),
  mainApplication: z.string().min(1, "Selecione a aplicação principal"),
  purchaseTimeframe: z.string().min(1, "Selecione o prazo para aquisição"),
  message: z.string().min(5, "Por favor, escreva uma mensagem ou descreva sua necessidade"),
});

type FormData = z.infer<typeof formSchema>;

export function QuoteFormSection() {
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
      // (11) 1111-1111
      return value
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{4})(\d)/, "$1-$2")
        .slice(0, 14);
    } else {
      // (11) 11111-1111
      return value
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2")
        .slice(0, 15);
    }
  };

  const onSubmit = async (data: FormData) => {
    // Anti-spam protection
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
      const response = await fetch("/api/quote", {
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
    <section id="quote" className="section-padding bg-white overflow-hidden">
      <div className="section-container">
        <div className="text-center mb-16">
           <h2 className="text-[2.25rem] md:text-[2.75rem] font-bold text-[#0A2A5E] tracking-tight">
             Solicite sua Proposta
           </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-stretch">
          
          {/* Left Side: Professional Image Backdrop */}
          <div className="w-full lg:w-[45%] h-[400px] lg:h-auto relative rounded-[32px] overflow-hidden shadow-2xl">
             <Image 
                src="https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/footer-cta-form-img.webp" 
                alt="Consuloria técnica" 
                fill
                className="object-cover"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-[#0A2A5E]/40 to-transparent" />
          </div>

          {/* Right Side: High Fidelity Form */}
          <div className="flex-1 py-4">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              
              {/* Row 1: Nome & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label className="text-[0.875rem] font-bold text-[#0A4EE4] mb-2">Nome completo</label>
                  <input
                    {...register("fullName")}
                    placeholder="Seu nome"
                    className="h-[3.25rem] px-5 rounded-[8px] bg-[#F8F9FA] border-[#E9ECEF] border-[1.5px] focus:border-[#0A4EE4] outline-none transition-all font-medium text-[#001647]"
                  />
                  <div className="h-5 mt-1">
                    {errors.fullName && <span className="text-red-500 text-xs font-bold block leading-none">{errors.fullName.message}</span>}
                  </div>
                </div>
                <div className="flex flex-col">
                  <label className="text-[0.875rem] font-bold text-[#0A4EE4] mb-2">E-mail</label>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="email@empresa.com.br"
                    className="h-[3.25rem] px-5 rounded-[8px] bg-[#F8F9FA] border-[#E9ECEF] border-[1.5px] focus:border-[#0A4EE4] outline-none transition-all font-medium text-[#001647]"
                  />
                  <div className="h-5 mt-1">
                    {errors.email && <span className="text-red-500 text-xs font-bold block leading-none">{errors.email.message}</span>}
                  </div>
                </div>
              </div>

              {/* Row 2: Telefone & Empresa */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label className="text-[0.875rem] font-bold text-[#0A4EE4] mb-2">Telefone</label>
                  <input
                    {...register("phone", {
                      onChange: (e) => {
                        e.target.value = maskPhone(e.target.value);
                      }
                    })}
                    placeholder="(00) 00000-0000"
                    maxLength={15}
                    className="h-[3.25rem] px-5 rounded-[8px] bg-[#F8F9FA] border-[#E9ECEF] border-[1.5px] focus:border-[#0A4EE4] outline-none transition-all font-medium text-[#001647]"
                  />
                  <div className="h-5 mt-1">
                    {errors.phone && <span className="text-red-500 text-xs font-bold block leading-none">{errors.phone.message}</span>}
                  </div>
                </div>
                <div className="flex flex-col">
                  <label className="text-[0.875rem] font-bold text-[#0A4EE4] mb-2">Empresa</label>
                  <input
                    {...register("company")}
                    placeholder="Nome da empresa"
                    className="h-[3.25rem] px-5 rounded-[8px] bg-[#F8F9FA] border-[#E9ECEF] border-[1.5px] focus:border-[#0A4EE4] outline-none transition-all font-medium text-[#001647]"
                  />
                  <div className="h-5 mt-1">
                    {errors.company && <span className="text-red-500 text-xs font-bold block leading-none">{errors.company.message}</span>}
                  </div>
                </div>
              </div>

              {/* Row 3: Dropdowns (3 columns) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col">
                  <label className="text-[0.875rem] font-bold text-[#0A4EE4] mb-2">Tipo de Equipamento</label>
                  <select
                    {...register("equipmentType")}
                    className="h-[3.25rem] px-4 rounded-[8px] bg-[#F8F9FA] border-[#E9ECEF] border-[1.5px] focus:border-[#0A4EE4] outline-none transition-all font-medium text-[#4d5c7e] appearance-none"
                  >
                    <option value="">Selecione...</option>
                    <option value="Escavadeira">Escavadeira</option>
                    <option value="Retroescavadeira">Retroescavadeira</option>
                    <option value="Pá Carregadeira">Pá Carregadeira</option>
                    <option value="Trator">Trator</option>
                    <option value="Rolo Compactador">Rolo Compactador</option>
                    <option value="Outros">Outros</option>
                  </select>
                  <div className="h-5 mt-1">
                    {errors.equipmentType && <span className="text-red-500 text-xs font-bold block leading-none">{errors.equipmentType.message}</span>}
                  </div>
                </div>
                <div className="flex flex-col">
                  <label className="text-[0.875rem] font-bold text-[#0A4EE4] mb-2">Aplicação Principal</label>
                  <select
                    {...register("mainApplication")}
                    className="h-[3.25rem] px-4 rounded-[8px] bg-[#F8F9FA] border-[#E9ECEF] border-[1.5px] focus:border-[#0A4EE4] outline-none transition-all font-medium text-[#4d5c7e] appearance-none"
                  >
                    <option value="">Selecione...</option>
                    <option value="Construção Civil">Construção Civil</option>
                    <option value="Agronegócio">Agronegócio</option>
                    <option value="Mineração">Mineração</option>
                    <option value="Infraestrutura">Infraestrutura</option>
                    <option value="Outros">Outros</option>
                  </select>
                  <div className="h-5 mt-1">
                    {errors.mainApplication && <span className="text-red-500 text-xs font-bold block leading-none">{errors.mainApplication.message}</span>}
                  </div>
                </div>
                <div className="flex flex-col">
                  <label className="text-[0.875rem] font-bold text-[#0A4EE4] mb-2">Prazo para aquisição</label>
                  <select
                    {...register("purchaseTimeframe")}
                    className="h-[3.25rem] px-4 rounded-[8px] bg-[#F8F9FA] border-[#E9ECEF] border-[1.5px] focus:border-[#0A4EE4] outline-none transition-all font-medium text-[#4d5c7e] appearance-none"
                  >
                    <option value="">Selecione...</option>
                    <option value="Imediato">Imediato</option>
                    <option value="30 dias">30 dias</option>
                    <option value="90 dias">90 dias</option>
                    <option value="Acima de 6 meses">Acima de 6 meses</option>
                    <option value="Outros">Outros</option>
                  </select>
                  <div className="h-5 mt-1">
                    {errors.purchaseTimeframe && <span className="text-red-500 text-xs font-bold block leading-none">{errors.purchaseTimeframe.message}</span>}
                  </div>
                </div>
              </div>

              {/* Message field */}
              <div className="flex flex-col">
                <label className="text-[0.875rem] font-bold text-[#0A4EE4] mb-2">Sua mensagem</label>
                <textarea
                  {...register("message")}
                  placeholder="Mensagem opcional"
                  rows={4}
                  className="px-5 py-4 rounded-[8px] bg-[#F8F9FA] border-[#E9ECEF] border-[1.5px] focus:border-[#0A4EE4] outline-none transition-all font-medium text-[#001647] resize-none"
                />
                <div className="h-5 mt-1">
                  {errors.message && <span className="text-red-500 text-xs font-bold block leading-none">{errors.message.message}</span>}
                </div>
              </div>

              {/* Submit Button & Feedback */}
              <div className="pt-2 flex flex-col items-center gap-4">
                 <button
                   type="submit"
                   disabled={status === "loading"}
                   className="btn-brand w-full h-[3.5rem] text-[1rem] font-bold disabled:opacity-50"
                 >
                   {status === "loading" ? (
                      <div className="flex items-center gap-3">
                        <Loader2 className="animate-spin h-5 w-5" />
                        Processando...
                      </div>
                   ) : "Solicitar Proposta"}
                 </button>

                 <div className="h-8 flex items-center justify-center">
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
              </div>
            </form>
          </div>

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
