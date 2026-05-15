"use client";

import { useState, useCallback, useMemo } from "react";
import { Plus, Trash2, ChevronDown, ChevronUp, GripVertical, TableIcon, Type, AlignLeft, GripHorizontal, MoreHorizontal, Copy, FileJson, Upload, FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  horizontalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

// --- Types ---

export type RowType = "header" | "subheader" | "body";

export interface TableCell {
  value: string;
  rowSpan?: number;
}

export interface TableRow {
  id: string;
  type: RowType;
  cells: (string | TableCell)[];
}

export interface TechnicalTable {
  columns: string[];
  rows: TableRow[];
}

interface TechnicalTableBuilderProps {
  value: TechnicalTable | null;
  onChange: (table: TechnicalTable) => void;
  defaultColumns?: string[];
}

// --- Helpers ---

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

function emptyTable(defaultColumns?: string[]): TechnicalTable {
  const columns = defaultColumns || ["Família", "Modelo", "Emissão", "Deslocamento (L)", "Válvula por Cilindro", "Potência (kW/rpm)", "Torque (Nm/rpm)", "Rota técnica"];
  return {
    columns,
    rows: [
      { id: uid(), type: "body", cells: Array(columns.length).fill("") },
    ],
  };
}

// --- Row type config ---

const ROW_TYPES: { value: RowType; label: string; desc: string; color: string }[] = [
  { value: "subheader", label: "Sub-cabeçalho", desc: "Fundo cinza escuro, texto branco", color: "bg-gray-700 text-white" },
  { value: "body", label: "Linha de Dados", desc: "Fundo branco, texto escuro", color: "bg-white text-gray-700 border" },
];

const rowBg: Record<RowType, string> = {
  header: "bg-[#0A2A5E]",
  subheader: "bg-gray-700",
  body: "bg-white",
};

const rowText: Record<RowType, string> = {
  header: "text-white placeholder:text-white/60",
  subheader: "text-white placeholder:text-white/60",
  body: "text-gray-700 placeholder:text-gray-400",
};

function normaliseTable(t: TechnicalTable): TechnicalTable {
  const columns = t.columns || [];
  return {
    ...t,
    columns,
    rows: (t.rows || []).map(r => {
      // Se r não tiver 'cells' mas for um objeto, tentamos mapear as colunas para as chaves do objeto
      let rawCells = (r as any).cells;
      if (!rawCells && typeof r === "object") {
        rawCells = columns.map(col => {
          const val = (r as any)[col];
          if (val !== undefined && typeof val === "object" && val !== null) {
            return val; // Mantém o objeto (ex: { value: "...", rowSpan: 2 })
          }
          return val !== undefined ? String(val) : "";
        });
      }
      
      return {
        id: (r as any).id || uid(),
        type: (r as any).type || "body",
        cells: Array.from({ length: columns.length }, (_, i) => {
          const cell = (rawCells || [])[i];
          if (typeof cell === "string") return { value: cell, rowSpan: 1 };
          if (cell && typeof cell === "object") return { ...cell, rowSpan: (cell as any).rowSpan || 1 };
          return { value: "", rowSpan: 1 };
        }),
      };
    }),
  };
}

// --- Main Component ---

export function TechnicalTableBuilder({ value, onChange, defaultColumns }: TechnicalTableBuilderProps) {
  const table = useMemo(() => normaliseTable(value ?? emptyTable(defaultColumns)), [value, defaultColumns]);

  const update = (t: TechnicalTable) => onChange(normaliseTable(t));

  const updateColumnName = (idx: number, name: string) => {
    const columns = [...table.columns];
    columns[idx] = name;
    update({ ...table, columns });
  };

  const addColumn = () => {
    update({ ...table, columns: [...table.columns, "Nova Coluna"] });
  };

  const removeColumn = (idx: number) => {
    if (table.columns.length <= 1) return;
    const columns = table.columns.filter((_, i) => i !== idx);
    const rows = table.rows.map(r => ({ ...r, cells: r.cells.filter((_, i) => i !== idx) }));
    update({ ...table, columns, rows });
  };

  const addRow = (type: RowType = "body") => {
    const newRow: TableRow = { id: uid(), type, cells: Array(table.columns.length).fill("") };
    update({ ...table, rows: [...table.rows, newRow] });
  };

  const removeRow = (rowId: string) => {
    update({ ...table, rows: table.rows.filter(r => r.id !== rowId) });
  };

  const setRowType = (rowId: string, type: RowType) => {
    update({ ...table, rows: table.rows.map(r => r.id === rowId ? { ...r, type } : r) });
  };

  const updateCell = (rowId: string, colIdx: number, val: string | Partial<TableCell>) => {
    update({
      ...table,
      rows: table.rows.map(r =>
        r.id === rowId
          ? { 
              ...r, 
              cells: r.cells.map((c, i) => {
                if (i !== colIdx) return c;
                const cell = c as TableCell;
                if (typeof val === "string") return { ...cell, value: val };
                return { ...cell, ...val };
              }) 
            }
          : r
      ),
    });
  };

  const moveRow = (rowId: string, dir: -1 | 1) => {
    const idx = table.rows.findIndex(r => r.id === rowId);
    if (idx < 0) return;
    const newIdx = idx + dir;
    if (newIdx < 0 || newIdx >= table.rows.length) return;
    const rows = [...table.rows];
    [rows[idx], rows[newIdx]] = [rows[newIdx], rows[idx]];
    update({ ...table, rows });
  };

  const duplicateRow = (rowId: string) => {
    const idx = table.rows.findIndex(r => r.id === rowId);
    if (idx < 0) return;
    const rowToCopy = table.rows[idx];
    const newRow: TableRow = { ...rowToCopy, id: uid() };
    const rows = [...table.rows];
    rows.splice(idx + 1, 0, newRow);
    update({ ...table, rows });
  };

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const [importJson, setImportJson] = useState("");
  const [isImportOpen, setIsImportOpen] = useState(false);

  const handleImport = () => {
    try {
      const data = JSON.parse(importJson);
      
      // Case 1: Array of objects (most common)
      if (Array.isArray(data) && data.length > 0 && typeof data[0] === "object") {
        const first = data[0];
        const newColumns = Object.keys(first);
        const newRows: TableRow[] = data.map(obj => ({
          id: uid(),
          type: "body",
          cells: newColumns.map(col => ({ value: String(obj[col] ?? ""), rowSpan: 1 }))
        }));
        
        update({ columns: newColumns, rows: newRows });
        toast.success("Dados importados com sucesso!");
        setIsImportOpen(false);
        setImportJson("");
        return;
      }

      // Case 2: TechnicalTable structure
      if (data.columns && Array.isArray(data.rows)) {
        update(data);
        toast.success("Tabela importada com sucesso!");
        setIsImportOpen(false);
        setImportJson("");
        return;
      }

      throw new Error("Formato JSON inválido");
    } catch (err: any) {
      toast.error("Erro ao importar JSON: " + err.message);
    }
  };

  const downloadExampleJson = () => {
    const example = [
      {
        "Capacidade": "Modelo A",
        "Potência": "100 kW",
        "Peso": "2500 kg",
        "Observação": "Exemplo de dado"
      },
      {
        "Capacidade": "Modelo B",
        "Potência": "140 kW",
        "Peso": "3200 kg",
        "Observação": "-"
      }
    ];
    
    const blob = new Blob([JSON.stringify(example, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "exemplo_tabela_tecnica.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.info("Download do exemplo iniciado");
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    if (active.id !== over.id) {
      const activeId = active.id.toString();
      const overId = over.id.toString();

      if (activeId.startsWith("row-") && overId.startsWith("row-")) {
        const oldIndex = table.rows.findIndex((r) => `row-${r.id}` === activeId);
        const newIndex = table.rows.findIndex((r) => `row-${r.id}` === overId);
        update({ ...table, rows: arrayMove(table.rows, oldIndex, newIndex) });
      } else if (activeId.startsWith("col-") && overId.startsWith("col-")) {
        const oldIndex = parseInt(activeId.replace("col-", ""));
        const newIndex = parseInt(overId.replace("col-", ""));
        
        const newColumns = arrayMove(table.columns, oldIndex, newIndex);
        const newRows = table.rows.map(row => ({
          ...row,
          cells: arrayMove(row.cells, oldIndex, newIndex)
        }));
        update({ ...table, columns: newColumns, rows: newRows });
      }
    }
  };

  return (
    <div className="space-y-4 border rounded-2xl p-6 bg-white/50 backdrop-blur-sm border-gray-100 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-primary/10 rounded-lg text-primary">
            <TableIcon className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-900">Editor de Tabela Técnica</h3>
            <p className="text-[11px] text-muted-foreground italic">Arraste colunas e linhas para reordenar</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Dialog open={isImportOpen} onOpenChange={setIsImportOpen}>
            <DialogTrigger asChild>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="rounded-xl gap-1.5 text-xs font-bold border-2 border-green-500/20 text-green-600 hover:bg-green-50 hover:border-green-500/40 transition-all"
              >
                <FileJson className="h-3.5 w-3.5" />
                Importar JSON
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px] max-h-[90vh] flex flex-col p-4 overflow-hidden">
              <DialogHeader className="flex-shrink-0">
                <DialogTitle className="flex items-center gap-2">
                  <Upload className="h-5 v-5 text-green-600" /> Importar Dados da Tabela
                </DialogTitle>
                <DialogDescription>
                  Cole abaixo um JSON (Array de objetos ou estrutura da tabela). 
                  Isso irá substituir a tabela atual.
                </DialogDescription>
              </DialogHeader>
              
              <div className="flex-1 overflow-y-auto py-4 min-h-0">
                <Textarea 
                  placeholder='[
  {
    "Capacidade": "ACM Prime 100",
    "Sistema de reciclagem": "RAH 35 / RAC / RAC 20 / RAC 40",
    "Capacidade de produção 3% [t/h]": "100"
  },
  {
    "Capacidade": "ACM Prime 140",
    "Sistema de reciclagem": "RAH 35 / RAC / RAC 20 / RAC 40",
    "Capacidade de produção 3% [t/h]": "140"
  }
]'
                  className="min-h-[400px] h-full font-mono text-xs p-4 bg-slate-950 text-green-400 rounded-xl"
                  value={importJson}
                  onChange={(e) => setImportJson(e.target.value)}
                />
              </div>

              <DialogFooter className="flex items-center justify-between sm:justify-between w-full flex-shrink-0">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={downloadExampleJson}
                  className="rounded-xl gap-2 text-xs font-bold border-2 border-primary/10 text-primary hover:bg-primary/5"
                >
                  <FileDown className="h-3.5 w-3.5" />
                  Baixar Exemplo .json
                </Button>
                
                <div className="flex gap-2">
                  <Button variant="ghost" onClick={() => setIsImportOpen(false)} className="rounded-xl">Cancelar</Button>
                  <Button 
                    onClick={handleImport}
                    className="bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold"
                  >
                    Importar Dados
                  </Button>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addColumn}
            className="rounded-xl gap-1.5 text-xs font-bold border-2 border-primary/20 text-primary hover:bg-primary/5 transition-all"
          >
            <Plus className="h-3.5 w-3.5" />
            Nova Coluna
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border shadow-inner bg-gray-50/50">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <table className="min-w-full w-max border-collapse">
            <thead>
              <tr className="bg-[#0A2A5E]">
                <th className="w-20 border-b border-r border-white/10" />
                <SortableContext
                  items={table.columns.map((_, i) => `col-${i}`)}
                  strategy={horizontalListSortingStrategy}
                >
                  {table.columns.map((col, i) => (
                    <SortableColumnHeader
                      key={`col-${i}`}
                      id={`col-${i}`}
                      value={col}
                      onChange={(val) => updateColumnName(i, val)}
                      onRemove={() => removeColumn(i)}
                    />
                  ))}
                </SortableContext>
                <th className="w-4 border-b border-white/10" />
              </tr>
            </thead>
            <tbody>
              <SortableContext
                items={table.rows.map(r => `row-${r.id}`)}
                strategy={verticalListSortingStrategy}
              >
                {table.rows.map((row, ri) => (
                  <SortableRow
                    key={row.id}
                    id={`row-${row.id}`}
                    row={row}
                    ri={ri}
                    isLast={ri === table.rows.length - 1}
                    setRowType={setRowType}
                    moveRow={moveRow}
                    removeRow={removeRow}
                    duplicateRow={duplicateRow}
                    updateCell={updateCell}
                    allRows={table.rows}
                  />
                ))}
              </SortableContext>
            </tbody>
          </table>
        </DndContext>
      </div>

      <div className="flex gap-2 pt-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => addRow("subheader")}
          className="rounded-xl gap-1.5 text-xs font-bold border-2 border-gray-400/40 text-gray-600 hover:bg-gray-50 transition-all"
        >
          <Plus className="h-3.5 w-3.5" />
          + Sub-cabeçalho
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => addRow("body")}
          className="rounded-xl gap-1.5 text-xs font-bold border-2 border-border text-muted-foreground hover:border-primary/40 hover:text-primary transition-all"
        >
          <Plus className="h-3.5 w-3.5" />
          + Linha de Dados
        </Button>
        <p className="text-[10px] text-muted-foreground self-center ml-auto italic">
          Clique nas células para editar. Arraste as setas para reordenar.
        </p>
      </div>
    </div>
  );
}

// --- Sortable Column Header ---

function SortableColumnHeader({ 
  id, 
  value, 
  onChange, 
  onRemove 
}: { 
  id: string; 
  value: string; 
  onChange: (val: string) => void;
  onRemove: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const style = { transform: CSS.Translate.toString(transform), transition, zIndex: isDragging ? 100 : 0, opacity: isDragging ? 0.5 : 1 };

  return (
    <th ref={setNodeRef} style={style} className="border-b border-r border-white/10 px-2 py-2 min-w-[150px] relative group">
      <div className="flex items-center gap-1">
        <button {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing p-1 text-white/20 hover:text-white transition-colors">
          <GripHorizontal className="h-3 w-3" />
        </button>
        <Input
          value={value}
          onChange={e => onChange(e.target.value)}
          className="h-10 rounded-lg text-sm font-bold border-none shadow-none bg-white/5 text-white px-3 w-full focus-visible:ring-1 focus-visible:ring-white/20 placeholder:text-white/30"
          placeholder="Nome da coluna"
        />
        <button onClick={onRemove} className="flex-shrink-0 p-1.5 text-white/20 hover:text-white transition-colors rounded">
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </th>
  );
}

// --- Sortable Row ---

function SortableRow({
  id,
  row,
  ri,
  isLast,
  setRowType,
  moveRow,
  removeRow,
  duplicateRow,
  updateCell,
  allRows,
}: {
  id: string;
  row: TableRow;
  ri: number;
  isLast: boolean;
  setRowType: (id: string, type: RowType) => void;
  moveRow: (id: string, dir: -1 | 1) => void;
  removeRow: (id: string) => void;
  duplicateRow: (id: string) => void;
  updateCell: (id: string, ci: number, val: string | Partial<TableCell>) => void;
  allRows: TableRow[];
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const style = { transform: CSS.Translate.toString(transform), transition, zIndex: isDragging ? 100 : 0, opacity: isDragging ? 0.5 : 1 };

  return (
    <tr
      ref={setNodeRef}
      style={style}
      className={cn(
        "group transition-colors border-b border-border",
        isLast && "border-0",
        rowBg[row.type],
        isDragging && "shadow-xl relative z-10 scale-[1.01]"
      )}
    >
      <td className={cn("border-r border-border/30 px-2 py-1", row.type !== "body" ? "border-white/20" : "")}>
        <div className="flex items-center gap-1">
          <button {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing p-1.5 text-muted-foreground/30 hover:text-muted-foreground transition-colors">
            <GripVertical className="h-4 w-4" />
          </button>
          <RowTypeSelector
            value={row.type}
            onChange={(t) => setRowType(row.id, t)}
            onMoveUp={() => moveRow(row.id, -1)}
            onMoveDown={() => moveRow(row.id, 1)}
            onDelete={() => removeRow(row.id)}
            onDuplicate={() => duplicateRow(row.id)}
            canMoveUp={ri > 0}
            canMoveDown={!isLast}
          />
        </div>
      </td>

      {row.cells.map((c, ci) => {
        const cell = c as TableCell;
        
        // Check if this cell is covered by a rowspan from above
        let isCovered = false;
        for (let prevRi = 0; prevRi < ri; prevRi++) {
          const prevCell = allRows[prevRi].cells[ci] as TableCell;
          if (prevCell.rowSpan && prevRi + prevCell.rowSpan > ri) {
            isCovered = true;
            break;
          }
        }

        return (
          <td 
            key={ci} 
            className={cn(
              "border-r last:border-r-0 border-border/20 px-1 py-2 relative",
              isCovered && "bg-gray-100/30 opacity-40"
            )}
          >
            {isCovered ? (
              <div className="flex items-center justify-center py-3 text-[10px] text-muted-foreground italic font-medium uppercase tracking-tighter select-none">
                Mesclado
              </div>
            ) : (
              <div className="relative group/cell">
                <input
                  value={cell.value}
                  onChange={e => updateCell(row.id, ci, e.target.value)}
                  placeholder="-"
                  className={cn(
                    "w-full px-3 py-3 rounded bg-transparent text-sm outline-none focus:ring-2 focus:ring-white/40 min-w-[80px]",
                    rowText[row.type],
                    row.type !== "body" ? "focus:bg-white/10" : "focus:bg-gray-50"
                  )}
                />
                
                {/* Rowspan controls */}
                <div className="absolute right-1 top-1/2 -translate-y-1/2 hidden group-hover/cell:flex items-center gap-0.5 bg-white shadow-sm border border-border rounded-md p-0.5 z-10">
                  <button
                    onClick={() => updateCell(row.id, ci, { rowSpan: Math.max(1, (cell.rowSpan || 1) - 1) })}
                    className="p-1 hover:bg-gray-100 rounded text-muted-foreground transition-colors"
                    title="Diminuir mesclagem"
                  >
                    <ChevronUp className="h-3 w-3" />
                  </button>
                  <span className="text-[10px] font-bold px-1 min-w-[12px] text-center">
                    {cell.rowSpan || 1}
                  </span>
                  <button
                    onClick={() => updateCell(row.id, ci, { rowSpan: (cell.rowSpan || 1) + 1 })}
                    className="p-1 hover:bg-gray-100 rounded text-muted-foreground transition-colors"
                    title="Aumentar mesclagem"
                  >
                    <ChevronDown className="h-3 w-3" />
                  </button>
                </div>
              </div>
            )}
          </td>
        );
      })}
      <td className="w-4" />
    </tr>
  );
}

// --- Row type mini dropdown ---

function RowTypeSelector({
  value,
  onChange,
  onMoveUp,
  onMoveDown,
  onDelete,
  onDuplicate,
  canMoveUp,
  canMoveDown,
}: {
  value: RowType;
  onChange: (t: RowType) => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onDelete: () => void;
  onDuplicate: () => void;
  canMoveUp: boolean;
  canMoveDown: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [actionsOpen, setActionsOpen] = useState(false);
  const current = ROW_TYPES.find(rt => rt.value === value) || ROW_TYPES[0];

  return (
    <div className="flex items-center gap-0.5 relative">
      <div className="flex flex-col">
        <button onClick={onMoveUp} disabled={!canMoveUp} className="p-0.5 text-muted-foreground/30 hover:text-muted-foreground disabled:opacity-20 transition-colors">
          <ChevronUp className="h-3 w-3" />
        </button>
        <button onClick={onMoveDown} disabled={!canMoveDown} className="p-0.5 text-muted-foreground/30 hover:text-muted-foreground disabled:opacity-20 transition-colors">
          <ChevronDown className="h-3 w-3" />
        </button>
      </div>

      <button
        onClick={() => setOpen(o => !o)}
        className={cn(
          "flex items-center gap-1 px-1.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wide border transition-all",
          current.color,
          "opacity-80 hover:opacity-100 cursor-pointer"
        )}
      >
        {value === "header" ? <Type className="h-2.5 w-2.5" /> : value === "subheader" ? <AlignLeft className="h-2.5 w-2.5" /> : <GripVertical className="h-2.5 w-2.5" />}
        {value === "header" ? "H1" : value === "subheader" ? "H2" : "Dados"}
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-1 z-50 bg-white border border-border rounded-xl shadow-xl py-1 min-w-[200px]">
          {ROW_TYPES.map(rt => (
            <button
              key={rt.value}
              onClick={() => { onChange(rt.value); setOpen(false); }}
              className={cn(
                "w-full text-left px-3 py-2 text-xs hover:bg-muted/40 transition-colors flex items-center gap-2",
                rt.value === value ? "font-bold text-primary" : "text-gray-700"
              )}
            >
              <span className={cn("h-3 w-3 rounded-sm", rt.color)} />
              <div>
                <p className="font-semibold">{rt.label}</p>
                <p className="text-muted-foreground text-[10px]">{rt.desc}</p>
              </div>
            </button>
          ))}
        </div>
      )}

      <div className="relative">
        <button
          onClick={() => setActionsOpen(o => !o)}
          className="p-1.5 text-muted-foreground/40 hover:text-primary hover:bg-primary/5 rounded-lg transition-all ml-0.5"
        >
          <MoreHorizontal className="h-4 w-4" />
        </button>

        {actionsOpen && (
          <div className="absolute left-0 top-full mt-1 z-[60] bg-white border border-border rounded-xl shadow-xl py-1 min-w-[140px]">
            <button
              onClick={() => { onDuplicate(); setActionsOpen(false); }}
              className="w-full text-left px-3 py-2 text-xs hover:bg-muted/40 transition-colors flex items-center gap-2 text-gray-700"
            >
              <Copy className="h-3.5 w-3.5" />
              Duplicar linha
            </button>
            <div className="border-t border-border my-1" />
            <button
              onClick={() => { onDelete(); setActionsOpen(false); }}
              className="w-full text-left px-3 py-2 text-xs text-destructive hover:bg-destructive/5 transition-colors flex items-center gap-2"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Excluir linha
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
