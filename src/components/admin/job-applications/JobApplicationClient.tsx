"use client";

import { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { 
  Search, 
  Eye, 
  Trash2, 
  FileDown, 
  MoreHorizontal,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle
} from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { 
  updateJobApplicationStatus, 
  updateJobApplicationNotes, 
  deleteJobApplication 
} from "@/app/actions/job-applications";
import { toast } from "sonner";

interface JobApplicationClientProps {
  initialApplications: any[];
}

export function JobApplicationClient({ initialApplications }: JobApplicationClientProps) {
  const [applications, setApplications] = useState(initialApplications);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedApp, setSelectedApp] = useState<any>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState("");

  const filteredApps = applications.filter(app => 
    app.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.areaInteresse.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewDetails = (app: any) => {
    setSelectedApp(app);
    setNotes(app.internalNotes || "");
    setStatus(app.status);
    setIsDetailsOpen(true);
  };

  const handleSaveNotes = async () => {
    if (!selectedApp) return;
    
    const res = await updateJobApplicationNotes(selectedApp.id, notes);
    if (res.success) {
      toast.success("Anotações salvas!");
      setApplications(prev => prev.map(a => a.id === selectedApp.id ? { ...a, internalNotes: notes } : a));
    } else {
      toast.error("Erro ao salvar anotações.");
    }
  };

  const handleStatusChange = async (newStatus: string) => {
    if (!selectedApp) return;
    
    const res = await updateJobApplicationStatus(selectedApp.id, newStatus);
    if (res.success) {
      setStatus(newStatus);
      toast.success("Status atualizado!");
      setApplications(prev => prev.map(a => a.id === selectedApp.id ? { ...a, status: newStatus } : a));
    } else {
      toast.error("Erro ao atualizar status.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir esta candidatura?")) return;
    
    const res = await deleteJobApplication(id);
    if (res.success) {
      toast.success("Candidatura excluída!");
      setApplications(prev => prev.filter(a => a.id !== id));
      if (selectedApp?.id === id) setIsDetailsOpen(false);
    } else {
      toast.error("Erro ao excluir.");
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PENDENTE":
        return <Badge className="bg-amber-500/10 text-amber-600 hover:bg-amber-500/20 border-amber-500/20 rounded-lg flex gap-1 w-fit"><Clock className="h-3 w-3" /> Pendente</Badge>;
      case "ANALISE":
        return <Badge className="bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 border-blue-500/20 rounded-lg flex gap-1 w-fit"><AlertCircle className="h-3 w-3" /> Em Análise</Badge>;
      case "APROVADO":
        return <Badge className="bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 border-emerald-500/20 rounded-lg flex gap-1 w-fit"><CheckCircle2 className="h-3 w-3" /> Aprovado</Badge>;
      case "REPROVADO":
        return <Badge className="bg-rose-500/10 text-rose-600 hover:bg-rose-500/20 border-rose-500/20 rounded-lg flex gap-1 w-fit"><XCircle className="h-3 w-3" /> Reprovado</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-background border border-border rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-sm w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome, e-mail ou área..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-11 rounded-xl"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground font-medium">Total: {filteredApps.length} candidaturas</span>
        </div>
      </div>

      {/* Table */}
      <div className="bg-background border border-border rounded-3xl overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-muted/30 text-xs uppercase tracking-wider font-bold">
            <TableRow className="hover:bg-transparent border-border/50">
              <TableHead className="py-4 px-6">Candidato</TableHead>
              <TableHead>Área de Interesse</TableHead>
              <TableHead>Data de Envio</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right px-6">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredApps.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-40 text-center text-muted-foreground">
                  Nenhuma candidatura encontrada.
                </TableCell>
              </TableRow>
            ) : (
              filteredApps.map((app) => (
                <TableRow key={app.id} className="group hover:bg-muted/30 transition-colors border-border/50">
                  <TableCell className="py-4 px-6">
                    <div className="flex flex-col">
                      <span className="font-semibold text-foreground">{app.nome}</span>
                      <span className="text-xs text-muted-foreground">{app.email}</span>
                      <span className="text-xs text-muted-foreground">{app.telefone}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm font-medium">{app.areaInteresse}</span>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {format(new Date(app.createdAt), "dd/MM/yyyy HH:mm", { locale: ptBR })}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(app.status)}
                  </TableCell>
                  <TableCell className="text-right px-6">
                    <div className="flex justify-end gap-1">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-9 w-9 rounded-xl text-muted-foreground hover:text-primary transition-colors bg-muted/20"
                        onClick={() => handleViewDetails(app)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-9 w-9 rounded-xl text-muted-foreground hover:text-rose-600 transition-colors bg-rose-500/5"
                        onClick={() => handleDelete(app.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Details Modal */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-2xl rounded-3xl p-0 overflow-hidden border-none shadow-2xl">
          <DialogHeader className="p-8 bg-[#0A2A5E] text-white">
            <div className="flex justify-between items-start">
              <div>
                <DialogTitle className="text-2xl font-serif font-bold mb-1">{selectedApp?.nome}</DialogTitle>
                <p className="text-white/60 text-sm">{selectedApp?.email} • {selectedApp?.telefone}</p>
              </div>
              {getStatusBadge(status)}
            </div>
          </DialogHeader>

          <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Área de Interesse</h4>
                <p className="text-foreground font-medium bg-muted/30 px-4 py-2 rounded-xl border border-border/50">{selectedApp?.areaInteresse}</p>
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Data de Candidatura</h4>
                <p className="text-foreground font-medium bg-muted/30 px-4 py-2 rounded-xl border border-border/50">
                  {selectedApp && format(new Date(selectedApp.createdAt), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Sobre o candidato</h4>
              <div className="bg-muted/30 p-4 rounded-2xl border border-border/50 text-sm leading-relaxed text-foreground/80 italic">
                "{selectedApp?.sobre || "Não informado"}"
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Currículo Anexado</h4>
              <Button asChild variant="outline" className="w-full h-14 rounded-2xl border-dashed border-2 hover:border-primary hover:bg-primary/5 transition-all group">
                <a href={selectedApp?.curriculoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <FileDown className="h-5 w-5 text-primary" />
                  </div>
                  <span className="flex-1 text-left font-semibold">Visualizar / Baixar Currículo</span>
                </a>
              </Button>
            </div>

            <div className="space-y-4 pt-4 border-t border-border/50">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-foreground">Gerenciamento Interno</h4>
              </div>
              
              <div className="space-y-4 bg-muted/20 p-6 rounded-2xl border border-border/40">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-muted-foreground uppercase">Alterar Status</label>
                  <Select value={status} onValueChange={handleStatusChange}>
                    <SelectTrigger className="h-11 rounded-xl border-border bg-background">
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PENDENTE">Pendente</SelectItem>
                      <SelectItem value="ANALISE">Em Análise</SelectItem>
                      <SelectItem value="APROVADO">Aprovado</SelectItem>
                      <SelectItem value="REPROVADO">Reprovado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-muted-foreground uppercase">Anotações Internas</label>
                  <Textarea 
                    placeholder="Adicione observações sobre este candidato (apenas administradores verão)..."
                    className="min-h-[120px] rounded-xl border-border bg-background resize-none"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                  <div className="flex justify-end pt-2">
                    <Button onClick={handleSaveNotes} className="rounded-xl px-6 font-bold shadow-lg shadow-primary/20">
                      Salvar Anotações
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
