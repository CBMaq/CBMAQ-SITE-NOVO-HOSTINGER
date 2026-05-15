"use client";

import { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Search, Eye, Filter, Download } from "lucide-react";
import { LeadDetailsModal } from "./LeadDetailsModal";

// Interface baseada no Prisma
export interface Lead {
  id: string;
  type: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  message: string | null;
  data: any;
  status: string;
  internalNotes: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface LeadListProps {
  initialLeads: Lead[];
  userRole: string;
}

const TYPE_LABELS: Record<string, string> = {
  ASSISTANCE: "Assistência Técnica",
  QUOTE: "Orçamento (Máquinas)",
  QUOTE_IMPORTACAO: "Orçamento (Importação)",
  CONTATO: "Contato Geral",
  SEJA_REVENDEDOR: "Seja Revendedor",
  CONSULTORIA: "Consultoria Agrícola",
  MOTORES_WEICHAI: "Motores Weichai",
  OUVIDORIA: "Ouvidoria",
  PECAS_MULTIMARCAS: "Peças Multimarcas",
  SEGUROS: "Seguros",
  TELEMETRIA: "Telemetria",
  VENDAS_AO_GOVERNO: "Vendas ao Governo",
};

const STATUS_COLORS: Record<string, string> = {
  PENDENTE: "bg-yellow-100 text-yellow-800",
  EM_ATENDIMENTO: "bg-blue-100 text-blue-800",
  CONCLUIDO: "bg-green-100 text-green-800",
  CANCELADO: "bg-red-100 text-red-800",
};

export function LeadList({ initialLeads, userRole }: LeadListProps) {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  // Filtros
  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lead.company && lead.company.toLowerCase().includes(searchTerm.toLowerCase()));
      
    const matchesType = typeFilter === "ALL" || lead.type === typeFilter;
    const matchesStatus = statusFilter === "ALL" || lead.status === statusFilter;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleUpdateLead = (updatedLead: Lead) => {
    setLeads(leads.map(l => l.id === updatedLead.id ? updatedLead : l));
  };

  const handleDeleteLead = (id: string) => {
    setLeads(leads.filter(l => l.id !== id));
    setSelectedLead(null);
  };

  return (
    <div className="space-y-6">
      {/* Barra de Filtros */}
      <div className="flex flex-col lg:flex-row gap-4 bg-card p-4 rounded-xl border border-border shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar por nome, email ou empresa..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>
        
        <div className="flex gap-4">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="ALL">Todos os Tipos</option>
            {Object.entries(TYPE_LABELS).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="ALL">Todos os Status</option>
            <option value="PENDENTE">Pendente</option>
            <option value="EM_ATENDIMENTO">Em Atendimento</option>
            <option value="CONCLUIDO">Concluído</option>
            <option value="CANCELADO">Cancelado</option>
          </select>
        </div>
      </div>

      {/* Tabela */}
      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 text-muted-foreground text-xs uppercase font-medium">
              <tr>
                <th className="px-6 py-4">Data</th>
                <th className="px-6 py-4">Nome / Empresa</th>
                <th className="px-6 py-4">Contato</th>
                <th className="px-6 py-4">Tipo</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                    Nenhum lead encontrado com os filtros atuais.
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {format(new Date(lead.createdAt), "dd/MM/yyyy HH:mm", { locale: ptBR })}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-foreground">{lead.name}</div>
                      {lead.company && <div className="text-muted-foreground text-xs">{lead.company}</div>}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-foreground">{lead.email}</div>
                      {lead.phone && <div className="text-muted-foreground text-xs">{lead.phone}</div>}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-border">
                        {TYPE_LABELS[lead.type] || lead.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[lead.status] || "bg-gray-100 text-gray-800"}`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => setSelectedLead(lead)}
                        className="inline-flex items-center justify-center h-8 w-8 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                        title="Ver Detalhes"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de Detalhes */}
      {selectedLead && (
        <LeadDetailsModal 
          lead={selectedLead} 
          isOpen={!!selectedLead} 
          onClose={() => setSelectedLead(null)}
          onUpdate={handleUpdateLead}
          onDelete={handleDeleteLead}
          isAdmin={userRole === "ADMIN"}
        />
      )}
    </div>
  );
}
