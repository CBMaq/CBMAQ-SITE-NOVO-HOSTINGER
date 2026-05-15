"use client";

import { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { X, Save, Trash2, ExternalLink, Calendar, User, Mail, Phone, Building, MessageSquare, AlertTriangle } from "lucide-react";
import { Lead } from "./LeadList";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface LeadDetailsModalProps {
  lead: Lead;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (lead: Lead) => void;
  onDelete: (id: string) => void;
  isAdmin: boolean;
}

export function LeadDetailsModal({ lead, isOpen, onClose, onUpdate, onDelete, isAdmin }: LeadDetailsModalProps) {
  const [status, setStatus] = useState(lead.status);
  const [internalNotes, setInternalNotes] = useState(lead.internalNotes || "");
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  if (!isOpen) return null;

  const handleSave = async () => {
    if (!isAdmin) return;
    setIsSaving(true);
    try {
      const res = await fetch(`/api/admin/leads/${lead.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, internalNotes }),
      });
      
      if (res.ok) {
        const updatedLead = await res.json();
        onUpdate(updatedLead.data);
        toast.success("Lead atualizado com sucesso!");
        onClose();
        router.refresh();
      } else {
        toast.error("Erro ao atualizar o lead.");
      }
    } catch (error) {
      toast.error("Erro de rede ao salvar.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!isAdmin) return;
    if (!confirm("Tem certeza que deseja excluir este registro permanentemente?")) return;
    
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/leads/${lead.id}`, {
        method: "DELETE",
      });
      
      if (res.ok) {
        onDelete(lead.id);
        toast.success("Lead removido com sucesso!");
        router.refresh();
      } else {
        toast.error("Erro ao excluir o lead.");
      }
    } catch (error) {
      toast.error("Erro de rede ao excluir.");
    } finally {
      setIsDeleting(false);
    }
  };

  // Render fields dynamically from JSON data
  const renderDynamicData = () => {
    const data = typeof lead.data === 'string' ? JSON.parse(lead.data) : lead.data;
    if (!data || Object.keys(data).length === 0) return null;

    return (
      <div className="bg-muted/30 rounded-xl p-5 border border-border mt-6">
        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-primary" />
          Dados Específicos do Formulário
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(data).map(([key, value]) => {
            if (value === null || value === undefined || value === "") return null;
            
            // Format URL (attachments)
            if (key.toLowerCase().includes('url') && typeof value === 'string' && value.startsWith('http')) {
              return (
                <div key={key} className="col-span-1 md:col-span-2 flex flex-col gap-1 p-3 bg-background rounded-lg border border-border">
                  <span className="text-xs font-medium text-muted-foreground uppercase">{key}</span>
                  <a href={value} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center gap-1 text-sm font-medium">
                    Ver Anexo <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              );
            }

            return (
              <div key={key} className="flex flex-col gap-1 p-3 bg-background rounded-lg border border-border">
                <span className="text-xs font-medium text-muted-foreground uppercase">{key}</span>
                <span className="text-sm font-semibold text-foreground">{String(value)}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-background w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-muted/20 shrink-0">
          <div>
            <h2 className="text-xl font-bold text-foreground">Detalhes do Contato</h2>
            <p className="text-xs text-muted-foreground font-medium mt-1 uppercase tracking-wider">
              {lead.type} • ID: {lead.id.substring(0, 8)}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-muted-foreground hover:bg-muted hover:text-foreground rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-border">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column: Details */}
            <div className="lg:col-span-2 space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                    <User className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <span className="text-xs font-medium text-muted-foreground block mb-0.5">Nome Completo</span>
                    <span className="text-sm font-semibold text-foreground">{lead.name}</span>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                    <Calendar className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <span className="text-xs font-medium text-muted-foreground block mb-0.5">Data do Registro</span>
                    <span className="text-sm font-semibold text-foreground">
                      {format(new Date(lead.createdAt), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                    <Mail className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <span className="text-xs font-medium text-muted-foreground block mb-0.5">Email</span>
                    <a href={`mailto:${lead.email}`} className="text-sm font-semibold text-primary hover:underline">
                      {lead.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                    <Phone className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <span className="text-xs font-medium text-muted-foreground block mb-0.5">Telefone</span>
                    <span className="text-sm font-semibold text-foreground">{lead.phone || "Não informado"}</span>
                  </div>
                </div>

                {lead.company && (
                  <div className="flex items-start gap-3 sm:col-span-2">
                    <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                      <Building className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <span className="text-xs font-medium text-muted-foreground block mb-0.5">Empresa</span>
                      <span className="text-sm font-semibold text-foreground">{lead.company}</span>
                    </div>
                  </div>
                )}
              </div>

              {lead.message && (
                <div className="bg-muted/20 p-4 rounded-xl border border-border">
                  <div className="flex items-center gap-2 mb-2 text-foreground font-semibold">
                    <MessageSquare className="h-4 w-4 text-primary" />
                    Mensagem do Usuário
                  </div>
                  <p className="text-sm text-foreground/80 whitespace-pre-wrap leading-relaxed">
                    {lead.message}
                  </p>
                </div>
              )}

              {renderDynamicData()}
            </div>

            {/* Right Column: Admin Actions */}
            <div className="space-y-6">
              <div className="bg-muted/20 p-5 rounded-xl border border-border">
                <h3 className="font-semibold text-foreground mb-4">Gerenciamento</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-medium text-muted-foreground block mb-1.5">Status do Atendimento</label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      disabled={!isAdmin}
                      className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <option value="PENDENTE">Pendente</option>
                      <option value="EM_ATENDIMENTO">Em Atendimento</option>
                      <option value="CONCLUIDO">Concluído</option>
                      <option value="CANCELADO">Cancelado</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-muted-foreground block mb-1.5">Notas Internas (Admin)</label>
                    <textarea
                      value={internalNotes}
                      onChange={(e) => setInternalNotes(e.target.value)}
                      disabled={!isAdmin}
                      placeholder={isAdmin ? "Adicione notas sobre o atendimento..." : "Nenhuma nota registrada."}
                      rows={5}
                      className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        {isAdmin && (
          <div className="px-6 py-4 border-t border-border bg-muted/20 shrink-0 flex items-center justify-between">
            <button
              onClick={handleDelete}
              disabled={isDeleting || isSaving}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors disabled:opacity-50"
            >
              <Trash2 className="h-4 w-4" />
              {isDeleting ? "Excluindo..." : "Excluir Lead"}
            </button>
            
            <div className="flex gap-3">
              <button
                onClick={onClose}
                disabled={isSaving}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving || isDeleting}
                className="flex items-center gap-2 px-6 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors shadow-sm disabled:opacity-50"
              >
                <Save className="h-4 w-4" />
                {isSaving ? "Salvando..." : "Salvar Alterações"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
