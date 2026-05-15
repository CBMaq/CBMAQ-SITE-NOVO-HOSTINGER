"use client";

import { motion } from "framer-motion";
import { Check, FileDown } from "lucide-react";

interface ProductSpecsProps {
  product: any;
}

export function ProductSpecs({ product }: ProductSpecsProps) {
  // Combinar campos fixos com campos dinâmicos para Dados Técnicos
  const technicalData = [];
  
  if (product.weight) technicalData.push({ label: "Peso Operacional", value: product.weight });
  if (product.power) technicalData.push({ label: "Potência", value: product.power });
  if (product.bucketCapacity) technicalData.push({ label: "Capacidade da Caçamba", value: product.bucketCapacity });

  // Adicionar dados técnicos extras se existirem
  const extraTechData = (product.technicalData as { label: string; value: string }[]) || [];
  technicalData.push(...extraTechData);

  const technicalFiles = (product.technicalFiles as { name: string; url: string }[]) || [];

  const differentials = [
    ...((product.differentials as string[]) || [])
  ];

  // Se não houver nada para exibir em nenhuma das colunas, não renderiza a seção
  if (technicalData.length === 0 && differentials.length === 0 && technicalFiles.length === 0) return null;

  return (
    <section className="section-padding bg-white overflow-hidden">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="text-[2.25rem] md:text-[2.75rem] font-bold text-[#0A2A5E] tracking-tight">
            Especificações Técnicas
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          
          {/* Left Column: Dados Técnicos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col h-full bg-white border border-[#E9ECEF] rounded-[24px] overflow-hidden shadow-sm"
          >
            <div className="bg-[#1C335A] p-6 text-center">
              <h3 className="text-[1.25rem] font-bold text-white">Dados Técnicos</h3>
            </div>
            
            <div className="flex-1 p-6 md:p-10">
              <div className="flex flex-col gap-6">
                {/* PDF Download Buttons */}
                {technicalFiles.length > 0 && (
                  <div className="flex flex-col gap-3 mb-4">
                    {technicalFiles.map((file, idx) => (
                      <motion.a
                        key={`file-${idx}`}
                        href={file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center justify-between p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl group transition-all hover:bg-white hover:shadow-md hover:border-[#0095FF]/30"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-[#0095FF]/10 flex items-center justify-center text-[#0095FF]">
                            <FileDown className="h-5 w-5" />
                          </div>
                          <span className="text-sm md:text-[1rem] font-bold text-[#0A2A5E]">
                            {file.name || "Baixar Ficha Técnica"}
                          </span>
                        </div>
                        <div className="text-[10px] font-bold uppercase tracking-widest text-[#7D8FB3] bg-white px-3 py-1 rounded-full border border-[#E2E8F0]">
                          PDF
                        </div>
                      </motion.a>
                    ))}
                  </div>
                )}

                <div className="space-y-0">
                  {technicalData.length > 0 ? (
                    technicalData.map((item, idx) => (
                      <div 
                        key={idx} 
                        className="flex items-center justify-between py-5 border-b border-[#F1F3F5] last:border-0"
                      >
                        <span className="text-sm md:text-[1rem] font-medium text-[#7D8FB3]">{item.label}</span>
                        <span className="text-sm md:text-[1.125rem] font-bold text-[#0A2A5E] text-right">{item.value}</span>
                      </div>
                    ))
                  ) : (
                    !technicalFiles.length && <p className="text-sm text-[#0A2A5E]/40 italic py-10 text-center">Dados técnicos em atualização.</p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Diferenciais */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-col h-full bg-white border border-[#E9ECEF] rounded-[24px] overflow-hidden shadow-sm"
          >
            <div className="bg-[#0095FF] p-6 text-center">
              <h3 className="text-[1.25rem] font-bold text-white">Diferenciais</h3>
            </div>
            
            <div className="flex-1 p-6 md:p-10">
              <div className="space-y-7">
                {differentials.length > 0 ? (
                  differentials.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-5">
                      <div className="w-10 h-10 rounded-full bg-[#EBF5FF] flex items-center justify-center shrink-0">
                        <Check className="h-5 w-5 text-[#0095FF] stroke-[3]" />
                      </div>
                      <span className="text-sm md:text-[1.125rem] font-bold text-[#0A2A5E]/70">
                        {item}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-[#0A2A5E]/40 italic py-10 text-center">Diferenciais em atualização.</p>
                )}
              </div>
            </div>
          </motion.div>

        </div>

        {/* Tabela Técnica Avançada (opcional) */}
        {product.technicalInfoTable && product.technicalInfoTable.rows && product.technicalInfoTable.rows.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 overflow-hidden rounded-[16px] border border-[#F1F3F5] shadow-lg shadow-[#0A2A5E]/5 overflow-x-auto"
          >
            <table className="w-full min-w-max border-collapse text-sm">
              <thead>
                <tr>
                  {product.technicalInfoTable.columns.map((col: string, ci: number) => (
                    <th
                      key={ci}
                      className="bg-[#0A2A5E] text-white font-bold text-center py-3.5 px-4 border border-white/20 text-sm whitespace-nowrap"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {product.technicalInfoTable.rows.map((row: any, ri: number) => {
                  const type = row.type || "body";
                  const rowClass = type === "header" ? "bg-[#0A2A5E]" : type === "subheader" ? "bg-gray-700" : "bg-white hover:bg-gray-50 transition-colors";
                  const cellClass = type === "header" ? "text-white font-bold text-center py-3 px-4 text-sm border border-white/20" : type === "subheader" ? "text-white/90 font-semibold text-center py-2.5 px-4 text-xs border border-white/10" : "text-[#495057] font-medium py-3 px-4 text-sm border border-[#F1F3F5] text-center";
                  
                  return (
                    <tr key={row.id ?? ri} className={`border-b border-[#F1F3F5] last:border-0 ${rowClass}`}>
                      {row.cells.map((c: any, ci: number) => {
                        const cell = typeof c === "string" ? { value: c, rowSpan: 1 } : c;
                        
                        let isCovered = false;
                        for (let prevRi = 0; prevRi < ri; prevRi++) {
                          const prevCell = product.technicalInfoTable.rows[prevRi].cells[ci] as any;
                          const ps = typeof prevCell === "string" ? 1 : (prevCell?.rowSpan || 1);
                          if (ps > 1 && prevRi + ps > ri) {
                            isCovered = true;
                            break;
                          }
                        }
                        
                        if (isCovered) return null;

                        return (
                          <td 
                            key={ci} 
                            className={`${cellClass} ${cell?.rowSpan > 1 ? "align-middle" : ""}`}
                            rowSpan={cell?.rowSpan || 1}
                          >
                            {cell?.value || (type === "body" ? "—" : "")}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </motion.div>
        )}
      </div>
    </section>
  );
}
