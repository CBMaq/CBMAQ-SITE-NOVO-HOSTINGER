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
  applicationType: z.string().min(2, "Tipo de Aplicação é obrigatório"),
  powerRange: z.string().min(1, "Faixa de Potência é obrigatória"),
  need: z.string().min(2, "Necessidade é obrigatória"),
  message: z.string().optional().or(z.literal("")),
});

type FormData = z.infer<typeof formSchema>;

export function WeichaiFormSection() {
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
    setStatus("loading");

    try {
      const response = await fetch("/api/motores-weichai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus("success");
        setIsModalOpen(true);
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
            Solicite sua Cotação
          </h2>

          <div className="max-w-[1100px] mx-auto">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-2">
                
                {/* Nome completo */}
                <div className="flex flex-col">
                  <label className="text-[1rem] font-bold text-[#0A2A5E] mb-2">Nome completo</label>
                  <input
                    {...register("fullName")}
                    className="h-[3.5rem] px-5 rounded-[8px] bg-[#F8F9FA] border-[#E9ECEF] border-[1px] focus:border-[#0A4EE4] outline-none transition-all font-medium text-[#001647]"
                  />
                  <div className="h-5 mt-1">
                    {errors.fullName && <span className="text-red-500 text-[10px] font-bold block">{errors.fullName.message}</span>}
                  </div>
                </div>

                {/* E-mail */}
                <div className="flex flex-col">
                  <label className="text-[1rem] font-bold text-[#0A2A5E] mb-2">E-mail</label>
                  <input
                    {...register("email")}
                    type="email"
                    className="h-[3.5rem] px-5 rounded-[8px] bg-[#F8F9FA] border-[#E9ECEF] border-[1px] focus:border-[#0A4EE4] outline-none transition-all font-medium text-[#001647]"
                  />
                  <div className="h-5 mt-1">
                    {errors.email && <span className="text-red-500 text-[10px] font-bold block">{errors.email.message}</span>}
                  </div>
                </div>

                {/* Telefone */}
                <div className="flex flex-col">
                  <label className="text-[1rem] font-bold text-[#0A2A5E] mb-2">Telefone</label>
                  <input
                    {...register("phone", {
                      onChange: (e) => {
                        e.target.value = maskPhone(e.target.value);
                      }
                    })}
                    maxLength={15}
                    className="h-[3.5rem] px-5 rounded-[8px] bg-[#F8F9FA] border-[#E9ECEF] border-[1px] focus:border-[#0A4EE4] outline-none transition-all font-medium text-[#001647]"
                  />
                  <div className="h-5 mt-1">
                    {errors.phone && <span className="text-red-500 text-[10px] font-bold block">{errors.phone.message}</span>}
                  </div>
                </div>

                {/* Empresa */}
                <div className="flex flex-col">
                  <label className="text-[1rem] font-bold text-[#0A2A5E] mb-2">Empresa</label>
                  <input
                    {...register("company")}
                    className="h-[3.5rem] px-5 rounded-[8px] bg-[#F8F9FA] border-[#E9ECEF] border-[1px] focus:border-[#0A4EE4] outline-none transition-all font-medium text-[#001647]"
                  />
                  <div className="h-5 mt-1">
                    {errors.company && <span className="text-red-500 text-[10px] font-bold block">{errors.company.message}</span>}
                  </div>
                </div>

                {/* Tipo de Aplicação */}
                <div className="flex flex-col">
                  <label className="text-[1rem] font-bold text-[#0A2A5E] mb-2">Tipo de Aplicação</label>
                  <select
                    {...register("applicationType")}
                    className="h-[3.5rem] px-5 rounded-[8px] bg-[#F8F9FA] border-[#E9ECEF] border-[1px] focus:border-[#0A4EE4] outline-none transition-all font-medium text-[#001647] appearance-none"
                  >
                    <option value="">Selecione...</option>
                    <option value="Construção">Construção</option>
                    <option value="Agrícola">Agrícola</option>
                    <option value="Caminhões">Caminhões</option>
                    <option value="Marítimo">Marítimo</option>
                    <option value="Industrial">Industrial</option>
                  </select>
                  <div className="h-5 mt-1">
                    {errors.applicationType && <span className="text-red-500 text-[10px] font-bold block">{errors.applicationType.message}</span>}
                  </div>
                </div>

                {/* Textarea (Mensagem) - Span 2 rows in the 3rd column */}
                <div className="flex flex-col md:row-span-2">
                  <label className="text-[1rem] font-bold text-[#0A2A5E] mb-2">Mensagem opcional</label>
                  <textarea
                    {...register("message")}
                    className="w-full h-full min-h-[150px] px-5 py-4 rounded-[8px] bg-[#F8F9FA] border-[#E9ECEF] border-[1px] focus:border-[#0A4EE4] outline-none transition-all font-medium text-[#001647] resize-none"
                  />
                  <div className="h-5 mt-1">
                    {errors.message && <span className="text-red-500 text-[10px] font-bold block">{errors.message.message}</span>}
                  </div>
                </div>

                {/* Faixa de Potência */}
                <div className="flex flex-col">
                  <label className="text-[1rem] font-bold text-[#0A2A5E] mb-2">Faixa de Potência</label>
                  <input
                    {...register("powerRange")}
                    placeholder="Ex: 200kW"
                    className="h-[3.5rem] px-5 rounded-[8px] bg-[#F8F9FA] border-[#E9ECEF] border-[1px] focus:border-[#0A4EE4] outline-none transition-all font-medium text-[#001647]"
                  />
                  <div className="h-5 mt-1">
                    {errors.powerRange && <span className="text-red-500 text-[10px] font-bold block">{errors.powerRange.message}</span>}
                  </div>
                </div>

                {/* Necessidade */}
                <div className="flex flex-col">
                  <label className="text-[1rem] font-bold text-[#0A2A5E] mb-2">Necessidade</label>
                  <input
                    {...register("need")}
                    placeholder="Ex: Motor novo / Peças"
                    className="h-[3.5rem] px-5 rounded-[8px] bg-[#F8F9FA] border-[#E9ECEF] border-[1px] focus:border-[#0A4EE4] outline-none transition-all font-medium text-[#001647]"
                  />
                  <div className="h-5 mt-1">
                    {errors.need && <span className="text-red-500 text-[10px] font-bold block">{errors.need.message}</span>}
                  </div>
                </div>

                {/* Button Area - Below Textarea in 3rd column */}
                <div className="flex md:col-start-3 pt-2">
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="h-[3.5rem] w-full bg-[#0A4EE4] hover:bg-[#083DB4] text-white rounded-[8px] text-[1rem] font-bold transition-all disabled:opacity-50 flex items-center justify-center shadow-lg shadow-blue-600/20"
                  >
                    {status === "loading" ? (
                      <Loader2 className="animate-spin h-5 w-5" />
                    ) : "Enviar"}
                  </button>
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
