"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function ImportacaoProcesso() {
  const baseUrl = "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/";

  const steps = [
    { num: "01", title: "Consulta e Cotação", desc: "Análise da necessidade e cotação completa." },
    { num: "02", title: "Negociação Internacional", desc: "Tratativas com fornecedores e condições de pagamento." },
    { num: "03", title: "Documentação", desc: "Preparação de toda documentação de importação." },
    { num: "04", title: "Embarque", desc: "Acompanhamento do transporte internacional." },
    { num: "05", title: "Despacho Aduaneiro", desc: "Nacionalização e liberação alfandegária." },
    { num: "06", title: "Logística Interna", desc: "Transporte até o destino final no Brasil." },
    { num: "07", title: "Entrega e Instalação", desc: "Entrega com instalação e treinamento." },
    { num: "08", title: "Pós-Venda", desc: "Suporte contínuo e garantia dos equipamentos." }
  ];

  return (
    <section id="processo" className="bg-white pt-10 pb-24">
      <div className="section-container">
        
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="bg-white rounded-[2rem] md:rounded-[3rem] p-6 py-10 md:p-16 lg:p-20 shadow-[-4.06px_4.06px_8.93px_0px_rgba(0,0,0,0.06)]"
        >
          <div className="text-center mb-16">
            <h2 className="text-[2rem] md:text-[2.5rem] font-bold text-[#053474] tracking-tight">
              Processo de importação
            </h2>
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 md:gap-y-16 gap-x-2 md:gap-x-4">
              {steps.map((step, idx) => (
                <div key={idx} className="flex flex-col items-center text-center relative w-full h-full">
                  
                  {/* Row Continuous Horizontal Line (Mobile/Tablet - 2 columns) */}
                  {idx % 2 === 0 && (
                    <div 
                      className="lg:hidden absolute top-[44px] md:top-[59px] h-[2px] bg-[#CBD4E1] z-0"
                      style={{
                        left: "20%",
                        width: "calc(160% + 0.5rem)"
                      }}
                    />
                  )}

                  {/* Row Continuous Horizontal Line (Desktop - 4 columns) */}
                  {idx % 4 === 0 && (
                    <div 
                      className="hidden lg:block absolute top-[59px] h-[2px] bg-[#CBD4E1] z-0"
                      style={{
                        left: "20%",
                        width: "calc(360% + 3rem)"
                      }}
                    />
                  )}

                  {/* The Circle Image */}
                  <div className="relative w-[90px] h-[90px] md:w-[120px] md:h-[120px] mb-4 md:mb-6 shrink-0 z-10 flex items-center justify-center bg-white rounded-full">
                    <Image
                      src={`${baseUrl}import-${step.num}.png`}
                      alt={`Passo ${step.num}`}
                      fill
                      className="object-contain rounded-full"
                    />
                  </div>

                  {/* Text Content */}
                  <h3 className="text-[1rem] md:text-[1.125rem] font-bold text-[#053474] mb-2 px-1">
                    {step.title}
                  </h3>
                  
                  <p className="text-[#4D5C7E] text-[0.75rem] md:text-[0.875rem] font-medium opacity-80 px-2 md:px-4">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
