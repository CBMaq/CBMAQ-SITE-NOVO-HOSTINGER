"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  FileText, MapPin, Calendar, Building2, 
  ShoppingCart, Contact, FolderOpen, Play,
  ChevronDown, ChevronLeft, ChevronRight
} from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface AtaRegistro {
  id: string;
  titulo: string;
  slug: string;
  numeroAta: string;
  ultimaAtualizacao: Date | null;
  local: string | null;
  orgao: string;
  modalidadeContratacao: string | null;
  objeto: string;
  idAtaPncp: string | null;
}

interface Props {
  atas: AtaRegistro[];
}

// ==========================================
// COMPONENTE ATA CARD
// ==========================================
function AtaCard({ ata }: { ata: AtaRegistro }) {
  return (
    <Link 
      href={`/vendas-ao-governo/atas/${ata.slug}`}
      className="block w-full cursor-pointer transition-all duration-300 hover:shadow-[0_8px_30px_rgba(10,42,94,0.08)] hover:-translate-y-1 bg-white rounded-[16px] group relative"
    >
      {/* Linha Horizontal Divisória Acima do Card (Gradiente Azul: transparente -> #053474 -> transparente) */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#053474]/40 to-transparent mb-8" />

      {/* Conteúdo do Card com Padding Interno */}
      <div className="px-4 md:px-8 pb-8">
        {/* Topo: Título da Ata */}
        <h3 className="font-bold text-[#0A2A5E] text-[1.25rem] md:text-[1.375rem] mb-6">
          Ata nº {ata.numeroAta}
        </h3>

        {/* Estrutura de Colunas */}
        <div className="flex flex-col md:flex-row relative">
          
          {/* ================= COLUNA ESQUERDA ================= */}
          <div className="flex-1 space-y-5 pr-0 md:pr-8">
            
            {/* Item: Id ata PNCP */}
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-[#F0F4F8] flex items-center justify-center shrink-0">
                <Contact className="w-[1.125rem] h-[1.125rem] text-[#3B65A5]" strokeWidth={2} />
              </div>
              <div className="flex flex-col pt-0.5">
                <span className="font-semibold text-[#0A2A5E] text-[0.875rem] md:text-[0.9375rem] leading-tight">Id ata PNCP:</span>
                <span className="text-[#4D5C7E] font-regular text-[0.875rem] md:text-[0.9375rem] break-all mt-0.5 leading-snug">
                  {ata.idAtaPncp || "-"}
                </span>
              </div>
            </div>

            {/* Item: Modalidade da Contratação */}
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-[#F0F4F8] flex items-center justify-center shrink-0">
                <ShoppingCart className="w-[1.125rem] h-[1.125rem] text-[#3B65A5]" strokeWidth={2} />
              </div>
              <div className="flex flex-col pt-0.5">
                <span className="font-semibold text-[#0A2A5E] text-[0.875rem] md:text-[0.9375rem] leading-tight">Modalidade da Contratação:</span>
                <span className="text-[#4D5C7E] font-regular text-[0.875rem] md:text-[0.9375rem] mt-0.5 leading-snug">
                  {ata.modalidadeContratacao || "-"}
                </span>
              </div>
            </div>

            {/* Item: Órgão */}
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-[#F0F4F8] flex items-center justify-center shrink-0">
                <Building2 className="w-[1.125rem] h-[1.125rem] text-[#3B65A5]" strokeWidth={2} />
              </div>
              <div className="flex flex-col pt-0.5">
                <span className="font-semibold text-[#0A2A5E] text-[0.875rem] md:text-[0.9375rem] leading-tight">Órgão:</span>
                <span className="text-[#4D5C7E] font-regular text-[0.875rem] md:text-[0.9375rem] uppercase mt-0.5 leading-snug">
                  {ata.orgao}
                </span>
              </div>
            </div>

          </div>

          {/* ================= LINHA VERTICAL 1 ================= */}
          <div className="hidden md:block w-[1px] bg-gradient-to-b from-transparent via-[#053474]/40 to-transparent mx-4" />

          {/* ================= COLUNA DIREITA ================= */}
          <div className="flex-1 space-y-5 px-0 pt-6 md:pt-0 md:px-8 flex flex-col justify-center">
            
            {/* Item: Última Atualização */}
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-[#F0F4F8] flex items-center justify-center shrink-0">
                <Calendar className="w-[1.125rem] h-[1.125rem] text-[#3B65A5]" strokeWidth={2} />
              </div>
              <div className="flex flex-col pt-0.5">
                <span className="font-semibold text-[#0A2A5E] text-[0.875rem] md:text-[0.9375rem] leading-tight">Última Atualização:</span>
                <span className="text-[#4D5C7E] font-regular text-[0.875rem] md:text-[0.9375rem] mt-0.5 leading-snug">
                  {ata.ultimaAtualizacao ? format(new Date(ata.ultimaAtualizacao), "dd/MM/yyyy", { locale: ptBR }) : "-"}
                </span>
              </div>
            </div>

            {/* Item: Local */}
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-[#F0F4F8] flex items-center justify-center shrink-0">
                <MapPin className="w-[1.125rem] h-[1.125rem] text-[#3B65A5]" strokeWidth={2} />
              </div>
              <div className="flex flex-col pt-0.5">
                <span className="font-semibold text-[#0A2A5E] text-[0.875rem] md:text-[0.9375rem] leading-tight">Local:</span>
                <span className="text-[#4D5C7E] font-regular text-[0.875rem] md:text-[0.9375rem] mt-0.5 leading-snug">
                  {ata.local || "-"}
                </span>
              </div>
            </div>

          </div>

          {/* ================= LINHA VERTICAL 2 ================= */}
          <div className="hidden md:block w-[1px] bg-gradient-to-b from-transparent via-[#053474]/40 to-transparent mx-4" />

          {/* ================= LADO DIREITO (SETA) ================= */}
          <div className="hidden md:flex items-center justify-center w-12 shrink-0">
            <Play className="w-[14px] h-[14px] fill-[#0A2A5E] text-[#0A2A5E] transition-transform group-hover:translate-x-1" />
          </div>

        </div>

        {/* ================= PARTE INFERIOR (OBJETO) ================= */}
        {/* Separador Horizontal */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#053474]/40 to-transparent my-6" />

        <div className="flex items-start gap-3 pr-4 md:pr-12">
          <div className="w-9 h-9 rounded-full bg-[#F0F4F8] flex items-center justify-center shrink-0">
            <FolderOpen className="w-[1.125rem] h-[1.125rem] text-[#3B65A5]" strokeWidth={2} />
          </div>
          <div className="flex flex-col pt-0.5">
            <span className="font-semibold text-[#0A2A5E] text-[0.875rem] md:text-[0.9375rem] leading-tight mb-1">Objeto:</span>
            <span className="text-[#4D5C7E] font-regular text-[0.875rem] md:text-[0.9375rem] leading-relaxed line-clamp-2 md:line-clamp-3">
              {ata.objeto}
            </span>
          </div>
        </div>

      </div>
    </Link>
  );
}

// ==========================================
// COMPONENTE PRINCIPAL (SECTION)
// ==========================================
export function AtasRegistroSection({ atas }: Props) {
  const [sortOrder, setSortOrder] = useState<"recentes" | "antigas">("recentes");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Ordenação
  const sortedAtas = [...atas].sort((a, b) => {
    const dateA = a.ultimaAtualizacao ? new Date(a.ultimaAtualizacao).getTime() : 0;
    const dateB = b.ultimaAtualizacao ? new Date(b.ultimaAtualizacao).getTime() : 0;
    
    if (sortOrder === "recentes") {
      return dateB - dateA;
    } else {
      return dateA - dateB;
    }
  });

  // Paginação
  const totalPages = Math.ceil(sortedAtas.length / itemsPerPage);
  const paginatedAtas = sortedAtas.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <section id="atas" className="bg-[#F4F3ED] section-padding pb-0 font-sans">
      <div className="section-container max-w-[1100px] mx-auto px-4 md:px-8">
        
        {/* ================= CONTAINER PRINCIPAL (CARD GRANDE) ================= */}
        <div className="bg-white rounded-[24px] shadow-[0_4px_24px_rgba(0,0,0,0.04)] p-8 md:p-12 w-full">
          
          {/* ================= HEADER DA SEÇÃO ================= */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-[#0A2A5E] rounded-full flex items-center justify-center shrink-0">
              <FileText className="w-[1.375rem] h-[1.375rem] text-white" strokeWidth={2} />
            </div>
            <h2 className="text-[1.75rem] md:text-[2rem] font-bold text-[#0A2A5E] tracking-tight">
              Atas de Registro
            </h2>
          </div>
          
          {/* ================= FILTRO DE ORDENAÇÃO ================= */}
          <div className="flex items-center gap-3 mb-10">
            <span className="text-[#4D5C7E] font-medium text-[0.875rem]">Ordenar por</span>
            <div className="relative inline-block">
              <select 
                value={sortOrder}
                onChange={(e) => {
                  setSortOrder(e.target.value as "recentes" | "antigas");
                  setCurrentPage(1); // Reseta a página ao mudar a ordenação
                }}
                className="bg-white border border-[#D1D9E6] text-[#4D5C7E] font-medium rounded-[6px] px-3 py-1.5 pr-8 outline-none focus:border-[#0A4EE4] transition-all cursor-pointer appearance-none text-[0.8125rem]"
              >
                <option value="recentes">Mais recente</option>
                <option value="antigas">Mais antigas</option>
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#4D5C7E] pointer-events-none" />
            </div>
          </div>

          {/* ================= LISTA DE CARDS DE ATAS ================= */}
          <div className="space-y-6">
            <AnimatePresence mode="wait">
              {paginatedAtas.length > 0 ? (
                <motion.div
                  key={`page-${currentPage}-${sortOrder}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {paginatedAtas.map((ata, index) => (
                    <motion.div
                      key={ata.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <AtaCard ata={ata} />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <div className="py-16 text-center">
                  <FileText className="w-12 h-12 mx-auto mb-4 text-[#D1D9E6]" />
                  <p className="text-[1.125rem] font-medium text-[#4D5C7E]">Nenhuma ata disponível no momento.</p>
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* ================= CONTROLES DE PAGINAÇÃO ================= */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-12 pt-6 border-t border-[#D1D9E6]/50">
              <span className="text-[#4D5C7E] text-[0.875rem]">
                Mostrando {((currentPage - 1) * itemsPerPage) + 1} até {Math.min(currentPage * itemsPerPage, sortedAtas.length)} de {sortedAtas.length} atas
              </span>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-[#D1D9E6] text-[#0A2A5E] hover:bg-[#F0F4F8] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                
                {Array.from({ length: totalPages }).map((_, idx) => {
                  const page = idx + 1;
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-8 h-8 rounded-lg text-[0.875rem] font-medium transition-colors ${
                        currentPage === page 
                          ? "bg-[#0A2A5E] text-white" 
                          : "text-[#4D5C7E] hover:bg-[#F0F4F8]"
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}

                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-[#D1D9E6] text-[#0A2A5E] hover:bg-[#F0F4F8] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

        </div>
        
      </div>
    </section>
  );
}
