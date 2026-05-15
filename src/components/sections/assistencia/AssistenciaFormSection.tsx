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
  maintenanceType: z.string().min(1, "Selecione o tipo de manutenção"),
  brand: z.string().min(1, "Selecione a marca"),
  urgency: z.string().min(1, "Selecione a urgência"),
  message: z.string().min(5, "Por favor, descreva sua necessidade na mensagem"),
  attachment: z.any().optional(),
});

type FormData = z.infer<typeof formSchema>;

export function AssistenciaFormSection() {
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

    setStatus("loading");

    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === 'attachment' && value?.[0]) {
          formData.append('attachment', value[0]);
        } else if (value !== undefined) {
          formData.append(key, value as string);
        }
      });

      const response = await fetch("/api/assistance", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setStatus("success");
        setIsModalOpen(true);
        localStorage.setItem('cbmaq_last_submission', Date.now().toString());
        reset();
      } else {
        setStatus("error");
        setErrorMessage(result.message || "Erro ao enviar solicitação.");
      }
    } catch (error) {
      setStatus("error");
      setErrorMessage("Erro de rede. Tente novamente mais tarde.");
    }
  };

  return (
    <section id="quote-assistance" className="section-padding bg-white overflow-hidden">
      <div className="section-container">
        <div className="text-center mb-16">
           <h2 className="text-[2.25rem] md:text-[2.75rem] font-bold text-[#0A2A5E] tracking-tight">
             Solicite sua Proposta
           </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-stretch">
          
          {/* Left Side: Professional Image Backdrop - 1:1 with Reference Image */}
          <div className="w-full lg:w-[45%] h-[400px] lg:h-auto relative rounded-[32px] overflow-hidden shadow-2xl">
             <Image 
                src="https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/assistencia-tecnica-cbmaq-orcamento-copy.webp" 
                alt="Consuloria técnica de assistência" 
                fill
                className="object-cover"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-[#0A2A5E]/40 to-transparent" />
             <div className="absolute bottom-10 left-10 right-10 z-10">
                <h3 className="text-white text-2xl font-bold mb-2">Precisando de assistência técnica?</h3>
                <p className="text-white/90 font-medium">Fale conosco agora e resolva o problema da sua máquina.</p>
             </div>
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

              {/* Row 3: Technical Dropdowns */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col">
                  <label className="text-[0.875rem] font-bold text-[#0A4EE4] mb-2">Tipo de Manutenção</label>
                  <select
                    {...register("maintenanceType")}
                    className="h-[3.25rem] px-4 rounded-[8px] bg-[#F8F9FA] border-[#E9ECEF] border-[1.5px] focus:border-[#0A4EE4] outline-none transition-all font-medium text-[#4d5c7e] appearance-none"
                  >
                    <option value="">Selecione...</option>
                    <option value="Preventiva">Preventiva</option>
                    <option value="Corretiva">Corretiva</option>
                    <option value="Reforma de Componentes">Reforma de Componentes</option>
                    <option value="Outros">Outros</option>
                  </select>
                  <div className="h-5 mt-1">
                    {errors.maintenanceType && <span className="text-red-500 text-xs font-bold block leading-none">{errors.maintenanceType.message}</span>}
                  </div>
                </div>
                <div className="flex flex-col">
                  <label className="text-[0.875rem] font-bold text-[#0A4EE4] mb-2">Marca do Equipamento</label>
                  <select
                    {...register("brand")}
                    className="h-[3.25rem] px-4 rounded-[8px] bg-[#F8F9FA] border-[#E9ECEF] border-[1.5px] focus:border-[#0A4EE4] outline-none transition-all font-medium text-[#4d5c7e] appearance-none"
                  >
                    <option value="">Selecione...</option>
                    <option value="Lovol">Lovol</option>
                    <option value="Ammann">Ammann</option>
                    <option value="Mahindra">Mahindra</option>
                    <option value="Weichai">Weichai</option>
                    <option value="Muller">Muller</option>
                    <option value="Outras Marcas">Outras Marcas</option>
                  </select>
                  <div className="h-5 mt-1">
                    {errors.brand && <span className="text-red-500 text-xs font-bold block leading-none">{errors.brand.message}</span>}
                  </div>
                </div>
                <div className="flex flex-col">
                  <label className="text-[0.875rem] font-bold text-[#0A4EE4] mb-2">Urgência</label>
                  <select
                    {...register("urgency")}
                    className="h-[3.25rem] px-4 rounded-[8px] bg-[#F8F9FA] border-[#E9ECEF] border-[1.5px] focus:border-[#0A4EE4] outline-none transition-all font-medium text-[#4d5c7e] appearance-none"
                  >
                    <option value="">Selecione...</option>
                    <option value="Normal">Normal</option>
                    <option value="Urgente">Urgente</option>
                    <option value="Emergência">Emergência</option>
                  </select>
                  <div className="h-5 mt-1">
                    {errors.urgency && <span className="text-red-500 text-xs font-bold block leading-none">{errors.urgency.message}</span>}
                  </div>
                </div>
              </div>

              {/* Message field */}
              <div className="flex flex-col">
                <label className="text-[0.875rem] font-bold text-[#0A4EE4] mb-2">Sua mensagem</label>
                <textarea
                  {...register("message")}
                  placeholder="Descreva o problema ou necessidade..."
                  rows={4}
                  className="px-5 py-4 rounded-[8px] bg-[#F8F9FA] border-[#E9ECEF] border-[1.5px] focus:border-[#0A4EE4] outline-none transition-all font-medium text-[#001647] resize-none"
                />
                <div className="h-5 mt-1">
                  {errors.message && <span className="text-red-500 text-xs font-bold block leading-none">{errors.message.message}</span>}
                </div>
              </div>

              {/* New Attachment field */}
              <div className="flex flex-col">
                <label className="text-[0.875rem] font-bold text-[#0A4EE4] mb-2">Anexar foto do problema (Opcional)</label>
                <div className="relative h-[3.25rem] rounded-[8px] bg-[#F8F9FA] border-[#E9ECEF] border-[1.5px] focus-within:border-[#0A4EE4] transition-all">
                  <input
                    type="file"
                    accept="image/*"
                    {...register("attachment")}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="flex items-center px-5 h-full text-[#4d5c7e] font-medium text-[0.875rem]">
                    <span>Selecione um arquivo...</span>
                  </div>
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
                        Enviando...
                      </div>
                   ) : "Enviar Solicitação"}
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
