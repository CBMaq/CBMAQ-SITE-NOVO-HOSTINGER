"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "O que é Consórcio?",
    answer: "O consórcio é uma modalidade de compra colaborativa baseada na união de pessoas físicas ou jurídicas em grupos, com o objetivo de formar uma poupança comum para a aquisição de bens móveis, imóveis ou serviços. Mensalmente, os participantes contribuem e, através de sorteios ou lances, recebem a carta de crédito para comprar o bem desejado. É um sistema seguro, fiscalizado pelo Banco Central."
  },
  {
    question: "Qual a diferença entre Financiamento e Consórcio?",
    answer: "No financiamento, você paga juros bancários e IOF para ter o bem de imediato. No consórcio, não existem juros (apenas taxa de administração), o que torna o custo final significativamente menor. O consórcio é ideal para quem planeja a compra de forma estratégica e econômica, enquanto o financiamento foca na urgência de ter o bem na hora."
  },
  {
    question: "Quais são as taxas cobradas?",
    answer: "O consórcio CBMaq não tem juros. As taxas cobradas são a Taxa de Administração (remuneração da administradora), o Fundo de Reserva (garantia para a saúde financeira do grupo) e o Seguro. Todas essas taxas são diluídas nas parcelas mensais, mantendo o seu investimento planejado e sem surpresas."
  },
  {
    question: "O que é carta de crédito?",
    answer: "A carta de crédito é o documento oficial que você recebe ao ser contemplado. Ela representa o valor contratado e funciona como um pagamento à vista na negociação. Com ela, você tem total poder de compra para escolher o fabricante, modelo e fornecedor da sua máquina ou equipamento, garantindo melhores descontos."
  }
];

export function FAQSection() {
  return (
    <section id="faq" className="section-padding bg-[#F8F8F8]">
      <div className="section-container max-w-[900px]">
        <Accordion type="single" collapsible className="w-full space-y-6">
          {faqs.map((faq, idx) => (
            <AccordionItem 
              key={idx} 
              value={`item-${idx}`}
              className="bg-white px-10 rounded-[24px] border-none shadow-[0_4px_25px_rgba(0,0,0,0.03)] transition-all hover:shadow-[0_10px_40px_rgba(0,0,0,0.06)] overflow-hidden"
            >
              <AccordionTrigger className="flex flex-row-reverse justify-end items-center gap-6 py-6 text-[1rem] md:text-[1.125rem] font-semibold font-inter text-[#053474] leading-[135%] hover:no-underline text-left [&[data-state=open]>svg]:rotate-180 **:data-[slot=accordion-trigger-icon]:shrink-0 **:data-[slot=accordion-trigger-icon]:text-[#0095FF] **:data-[slot=accordion-trigger-icon]:!size-5 **:data-[slot=accordion-trigger-icon]:stroke-[2.5px] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none">
                <span className="flex-1">{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent className="text-[#1E293B] text-[0.875rem] md:text-[0.9375rem] leading-relaxed pb-12 pl-[44px] pr-8 font-medium">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
