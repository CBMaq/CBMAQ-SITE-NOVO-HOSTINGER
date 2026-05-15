import { notFound } from "next/navigation";
import Link from "next/link";
import { db as prisma } from "@/lib/db";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { 
  ArrowLeft, FileText, Download, Calendar, MapPin, Building2, 
  ShoppingCart, Handshake, Contact, Globe, FolderOpen 
} from "lucide-react";
import { Metadata } from "next";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const ata = await prisma.ataRegistro.findUnique({
    where: { slug: slug },
  });

  if (!ata) return { title: "Ata não encontrada | CBMaq" };

  return {
    title: `${ata.titulo} | CBMaq`,
    description: ata.resumo || ata.objeto,
  };
}

export default async function AtaDetalhePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ata = await prisma.ataRegistro.findUnique({
    where: { slug: slug },
    include: {
      arquivos: {
        orderBy: { ordem: 'asc' },
      },
    },
  });

  if (!ata || !ata.published) {
    notFound();
  }

  const formatDate = (date: Date | null) => {
    return date ? format(new Date(date), "dd/MM/yyyy", { locale: ptBR }) : "-";
  };

  return (
    <div className="bg-white min-h-screen py-12 lg:py-20">
      <div className="section-container max-w-[1200px]">
        
        {/* Voltar */}
        <Link 
          href="/vendas-ao-governo#atas" 
          className="inline-flex items-center gap-2 text-[#4D5C7E] hover:text-[#0A2A5E] font-bold mb-12 transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          Voltar para a lista de atas
        </Link>

        {/* Header Section */}
        <div className="flex items-center gap-6 mb-8">
          <div className="w-[84px] h-[84px] bg-[#0A2A5E] rounded-full flex items-center justify-center shrink-0">
            <FileText className="w-10 h-10 text-white" />
          </div>
          <div>
            <h1 className="text-[2.5rem] md:text-[3.25rem] font-bold text-[#0A2A5E] leading-tight mb-2">
              Ata nº {ata.numeroAta}
            </h1>
            {ata.ultimaAtualizacao && (
              <div className="flex items-center gap-2 text-[#4D5C7E] text-[1.125rem] font-medium">
                <Calendar className="w-5 h-5 text-[#0A2A5E]" />
                <span>Última atualização {formatDate(ata.ultimaAtualizacao)}</span>
              </div>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-[2px] bg-[#0A2A5E] mb-12" />

        {/* Informações Grid */}
        <div className="space-y-6">
          
          {/* Row 1: Local, Órgão, Modalidade (100% width card with 3 cols) */}
          <div className="bg-white rounded-[20px] border border-[#D1D9E6] p-8 md:p-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 bg-[#F0F4F8] rounded-full flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-[#0A2A5E]" />
                </div>
                <div>
                  <p className="text-[1.25rem] font-bold text-[#0A2A5E] mb-1">Local:</p>
                  <p className="text-[1.125rem] font-medium text-[#0A2A5E] leading-tight">{ata.local || "-"}</p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="w-14 h-14 bg-[#F0F4F8] rounded-full flex items-center justify-center shrink-0">
                  <Building2 className="w-6 h-6 text-[#0A2A5E]" />
                </div>
                <div>
                  <p className="text-[1.25rem] font-bold text-[#0A2A5E] mb-1">Órgão:</p>
                  <p className="text-[1.125rem] font-bold text-[#0A2A5E] leading-tight uppercase">{ata.orgao}</p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="w-14 h-14 bg-[#F0F4F8] rounded-full flex items-center justify-center shrink-0">
                  <ShoppingCart className="w-6 h-6 text-[#0A2A5E]" />
                </div>
                <div>
                  <p className="text-[1.25rem] font-bold text-[#0A2A5E] mb-1">Modalidade da contratação:</p>
                  <p className="text-[1.125rem] font-medium text-[#0A2A5E] leading-tight">{ata.modalidadeContratacao || "-"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Row 2 & 3: Six items in 3-col grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* PNCP Divulgação */}
            <div className="bg-white rounded-[20px] border border-[#D1D9E6] p-8 flex items-center gap-5">
              <div className="w-14 h-14 bg-[#F0F4F8] rounded-full flex items-center justify-center shrink-0">
                <Contact className="w-6 h-6 text-[#0A2A5E]" />
              </div>
              <div>
                <p className="text-[1.125rem] font-bold text-[#0A2A5E] leading-tight mb-2">Data de divulgação no PNCP:</p>
                <p className="text-[1.125rem] font-medium text-[#0A2A5E]">{formatDate(ata.dataDivulgacaoPncp)}</p>
              </div>
            </div>

            {/* Data Assinatura */}
            <div className="bg-white rounded-[20px] border border-[#D1D9E6] p-8 flex items-center gap-5">
              <div className="w-14 h-14 bg-[#F0F4F8] rounded-full flex items-center justify-center shrink-0">
                <Handshake className="w-6 h-6 text-[#0A2A5E]" />
              </div>
              <div>
                <p className="text-[1.125rem] font-bold text-[#0A2A5E] leading-tight mb-2">Data de assinatura</p>
                <p className="text-[1.125rem] font-medium text-[#0A2A5E]">{formatDate(ata.dataAssinatura)}</p>
              </div>
            </div>

            {/* Vigência */}
            <div className="bg-white rounded-[20px] border border-[#D1D9E6] p-8 flex items-center gap-5">
              <div className="w-14 h-14 bg-[#F0F4F8] rounded-full flex items-center justify-center shrink-0">
                <Calendar className="w-6 h-6 text-[#0A2A5E]" />
              </div>
              <div>
                <p className="text-[1.125rem] font-bold text-[#0A2A5E] leading-tight mb-2">Vigência:</p>
                <p className="text-[1.125rem] font-medium text-[#0A2A5E]">
                  de {formatDate(ata.vigenciaInicio)} <br />
                  a {formatDate(ata.vigenciaFim)}
                </p>
              </div>
            </div>

            {/* ID Ata PNCP */}
            <div className="bg-white rounded-[20px] border border-[#D1D9E6] p-8 flex items-center gap-5">
              <div className="w-14 h-14 bg-[#F0F4F8] rounded-full flex items-center justify-center shrink-0">
                <Contact className="w-6 h-6 text-[#0A2A5E]" />
              </div>
              <div>
                <p className="text-[1.125rem] font-bold text-[#0A2A5E] leading-tight mb-2">Id ata PNCP:</p>
                <p className="text-[1.125rem] font-medium text-[#0A2A5E] break-all">{ata.idAtaPncp || "-"}</p>
              </div>
            </div>

            {/* Fonte */}
            <div className="bg-white rounded-[20px] border border-[#D1D9E6] p-8 flex items-center gap-5">
              <div className="w-14 h-14 bg-[#F0F4F8] rounded-full flex items-center justify-center shrink-0">
                <Globe className="w-6 h-6 text-[#0A2A5E]" />
              </div>
              <div>
                <p className="text-[1.125rem] font-bold text-[#0A2A5E] leading-tight mb-2">Fonte:</p>
                <p className="text-[1.125rem] font-medium text-[#0A2A5E] break-all">{ata.fonte || "-"}</p>
              </div>
            </div>

            {/* ID Contratação PNCP */}
            <div className="bg-white rounded-[20px] border border-[#D1D9E6] p-8 flex items-center gap-5">
              <div className="w-14 h-14 bg-[#F0F4F8] rounded-full flex items-center justify-center shrink-0">
                <Contact className="w-6 h-6 text-[#0A2A5E]" />
              </div>
              <div>
                <p className="text-[1.125rem] font-bold text-[#0A2A5E] leading-tight mb-2">Id contratação PNCP:</p>
                <p className="text-[1.125rem] font-medium text-[#0A2A5E] break-all">{ata.idContratacaoPncp || "-"}</p>
              </div>
            </div>

          </div>

          {/* Objeto */}
          <div className="bg-white rounded-[20px] border border-[#D1D9E6] p-8 md:p-10 flex flex-col md:flex-row items-start gap-8">
            <div className="w-20 h-20 bg-[#F0F4F8] rounded-[20px] flex items-center justify-center shrink-0">
              <FolderOpen className="w-10 h-10 text-[#0A2A5E]" />
            </div>
            <div>
              <p className="text-[1.5rem] font-bold text-[#0A2A5E] mb-4">Objeto:</p>
              <p className="text-[1.25rem] font-medium text-[#0A2A5E] leading-relaxed">
                {ata.objeto}
              </p>
            </div>
          </div>

        </div>

        {/* Arquivos / PDFs Section (Added visually matching the flow) */}
        {ata.arquivos.length > 0 && (
          <div className="mt-12 pt-12 border-t border-[#D1D9E6]">
            <h2 className="text-[1.75rem] font-bold text-[#0A2A5E] mb-8 flex items-center gap-3">
              <Download className="w-7 h-7" />
              Documentos Anexos
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {ata.arquivos.map((arquivo) => (
                <a
                  key={arquivo.id}
                  href={arquivo.urlArquivo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-5 rounded-[16px] border border-[#D1D9E6] hover:border-[#0A2A5E] hover:shadow-md transition-all group bg-white"
                >
                  <div className="w-12 h-12 bg-[#F0F4F8] group-hover:bg-[#0A2A5E]/10 rounded-lg flex items-center justify-center shrink-0 transition-colors">
                    <FileText className="w-6 h-6 text-[#0A2A5E]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[1rem] font-bold text-[#0A2A5E] truncate">
                      {arquivo.nomeArquivo}
                    </h3>
                    <p className="text-[0.875rem] text-[#4D5C7E] font-medium">
                      Download PDF
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        

      </div>
    </div>
  );
}
