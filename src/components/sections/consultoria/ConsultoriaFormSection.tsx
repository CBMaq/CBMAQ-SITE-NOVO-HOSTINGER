"use client";

import { useState } from "react";
import Image from "next/image";
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
  area: z.string().min(1, "Selecione sua área de atuação"),
  maquinarios: z.string().min(2, "Informe seus maquinários atuais"),
  message: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export function ConsultoriaFormSection() {
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
    const lastSubmission = localStorage.getItem('cbmaq_last_submission_consultoria');
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
      const response = await fetch("/api/consultoria", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus("success");
        setIsModalOpen(true);
        localStorage.setItem('cbmaq_last_submission_consultoria', Date.now().toString());
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
    <section id="contato" className="bg-gradient-to-b from-[#f8f8f8] to-white overflow-hidden section-padding">
      <div className="section-container">
        <div className="text-center mb-16">
           <h2 className="text-[2rem] md:text-[3.5rem] font-bold text-[#053474] tracking-tight">
             Solicite sua Proposta
           </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-stretch">
          
          {/* Left Side: Professional Image — Fidelity to Photo 1 */}
          <div className="w-full lg:w-[45%] h-[400px] lg:h-auto relative rounded-[40px] overflow-hidden shadow-2xl">
             <Image 
                src="https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/consult-form-img.webp" 
                alt="Consultoria de Proposta CBMaq" 
                fill
                className="object-cover"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-[#053474]/40 to-transparent" />
          </div>

          {/* Right Side: Form */}
          <div className="flex-1 py-4">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label className="text-[16.5px] font-semibold text-[#053474] mb-2 leading-[21px]">Nome completo</label>
                  <input
                    {...register("fullName")}
                    placeholder="Seu nome completo"
                    className="h-[3.75rem] px-5 rounded-[12px] bg-white border-[#E6EDF8] border-[1.5px] focus:border-[#0A4EE4] outline-none transition-all font-medium text-[#001647]"
                  />
                  <div className="h-5 mt-1">
                    {errors.fullName && <span className="text-red-500 text-xs font-bold block leading-none">{errors.fullName.message}</span>}
                  </div>
                </div>
                <div className="flex flex-col">
                  <label className="text-[16.5px] font-semibold text-[#053474] mb-2 leading-[21px]">E-mail</label>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="exemplo@empresa.com.br"
                    className="h-[3.75rem] px-5 rounded-[12px] bg-white border-[#E6EDF8] border-[1.5px] focus:border-[#0A4EE4] outline-none transition-all font-medium text-[#001647]"
                  />
                  <div className="h-5 mt-1">
                    {errors.email && <span className="text-red-500 text-xs font-bold block leading-none">{errors.email.message}</span>}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label className="text-[16.5px] font-semibold text-[#053474] mb-2 leading-[21px]">Telefone</label>
                  <input
                    {...register("phone", {
                      onChange: (e) => {
                        e.target.value = maskPhone(e.target.value);
                      }
                    })}
                    placeholder="(00) 00000-0000"
                    maxLength={15}
                    className="h-[3.75rem] px-5 rounded-[12px] bg-white border-[#E6EDF8] border-[1.5px] focus:border-[#0A4EE4] outline-none transition-all font-medium text-[#001647]"
                  />
                  <div className="h-5 mt-1">
                    {errors.phone && <span className="text-red-500 text-xs font-bold block leading-none">{errors.phone.message}</span>}
                  </div>
                </div>
                <div className="flex flex-col">
                  <label className="text-[16.5px] font-semibold text-[#053474] mb-2 leading-[21px]">Empresa</label>
                  <input
                    {...register("company")}
                    placeholder="Nome da sua empresa"
                    className="h-[3.75rem] px-5 rounded-[12px] bg-white border-[#E6EDF8] border-[1.5px] focus:border-[#0A4EE4] outline-none transition-all font-medium text-[#001647]"
                  />
                  <div className="h-5 mt-1">
                    {errors.company && <span className="text-red-500 text-xs font-bold block leading-none">{errors.company.message}</span>}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label className="text-[16.5px] font-semibold text-[#053474] mb-2 leading-[21px]">Área de Atuação</label>
                  <select
                    {...register("area")}
                    className="h-[3.75rem] px-4 rounded-[12px] bg-white border-[#E6EDF8] border-[1.5px] focus:border-[#0A4EE4] outline-none transition-all font-medium text-[#4d5c7e] appearance-none"
                  >
                    <option value="">Selecione sua área...</option>
                    <option value="Construção Civil">Construção Civil</option>
                    <option value="Mineração">Mineração</option>
                    <option value="Agronegócio">Agronegócio</option>
                    <option value="Infraestrutura">Infraestrutura</option>
                    <option value="Pavimentação">Pavimentação</option>
                    <option value="Obras Públicas">Obras Públicas</option>
                    <option value="Indústria">Indústria</option>
                    <option value="Terraplanagem">Terraplanagem</option>
                  </select>
                  <div className="h-5 mt-1">
                    {errors.area && <span className="text-red-500 text-xs font-bold block leading-none">{errors.area.message}</span>}
                  </div>
                </div>
                <div className="flex flex-col">
                  <label className="text-[16.5px] font-semibold text-[#053474] mb-2 leading-[21px]">Maquinários atuais</label>
                  <input
                    {...register("maquinarios")}
                    placeholder="Ex: 3 tratores, 2 escavadeiras..."
                    className="h-[3.75rem] px-5 rounded-[12px] bg-white border-[#E6EDF8] border-[1.5px] focus:border-[#0A4EE4] outline-none transition-all font-medium text-[#001647]"
                  />
                  <div className="h-5 mt-1">
                    {errors.maquinarios && <span className="text-red-500 text-xs font-bold block leading-none">{errors.maquinarios.message}</span>}
                  </div>
                </div>
              </div>

              <div className="flex flex-col">
                <label className="text-[16.5px] font-semibold text-[#053474] mb-2 leading-[21px]">Sua mensagem</label>
                <textarea
                  {...register("message")}
                  placeholder="Conte um pouco sobre sua necessidade operacional..."
                  rows={4}
                  className="px-5 py-4 rounded-[12px] bg-white border-[#E6EDF8] border-[1.5px] focus:border-[#0A4EE4] outline-none transition-all font-medium text-[#001647] resize-none"
                />
              </div>

              <div className="pt-2 flex flex-col items-center gap-4">
                 <button
                   type="submit"
                   disabled={status === "loading"}
                   className="btn-brand w-full h-[3.75rem] text-[1.125rem] font-bold disabled:opacity-50"
                 >
                   {status === "loading" ? (
                      <div className="flex items-center gap-3">
                        <Loader2 className="animate-spin h-5 w-5" />
                        Processando...
                      </div>
                   ) : "Solicitar Consultoria"}
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
        title="Consultoria Solicitada!"
        message="Recebemos seu interesse em nossa consultoria especializada. Um de nossos estrategistas entrará em contato em breve para realizar o diagnóstico inicial."
      />
    </section>
  );
}
