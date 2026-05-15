"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { TechnicalTable, RowType } from "@/components/admin/catalog/TechnicalTableBuilder";

interface EngineSpecsProps {
  product: any;
}

// Row styles matching the visual identity (Site Blue for header, etc.)
const rowStyles: Record<RowType, { row: string; cell: string }> = {
  header: {
    row: "bg-[#0A2A5E]",
    cell: "text-white font-bold text-center py-3 px-4 text-sm border border-white/20",
  },
  subheader: {
    row: "bg-gray-700",
    cell: "text-white/90 font-semibold text-center py-2.5 px-4 text-xs border border-white/10",
  },
  body: {
    row: "bg-white hover:bg-gray-50 transition-colors",
    cell: "text-[#495057] font-medium py-3 px-4 text-sm border border-[#F1F3F5] text-center",
  },
};

export function EngineSpecs({ product }: EngineSpecsProps) {
  const table = product.technicalInfoTable as TechnicalTable | null;

  if (!table || !table.rows || table.rows.length === 0) return null;

  return (
    <section className="section-padding bg-white">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          {/* Section title */}
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-[#0A2A5E]">Informações técnicas</h2>
          </div>

          {/* Table card */}
          <div className="overflow-hidden rounded-[16px] border border-[#F1F3F5] shadow-lg shadow-[#0A2A5E]/5 overflow-x-auto">
            <table className="w-full min-w-max border-collapse text-sm">
              {/* Column names as the very first header row */}
              <thead>
                <tr>
                  {table.columns.map((col, ci) => (
                    <th
                      key={ci}
                      className="bg-[#0A2A5E] text-white font-bold text-center py-3.5 px-4 border border-white/20 text-sm whitespace-nowrap"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Data rows */}
              <tbody>
                {table.rows.map((row, ri) => {
                  const type: RowType = (row.type as RowType) || "body";
                  const style = rowStyles[type];
                  return (
                    <tr key={row.id ?? ri} className={cn("border-b border-[#F1F3F5] last:border-0", style.row)}>
                      {row.cells.map((c: any, ci: number) => {
                        const cell = typeof c === "string" ? { value: c, rowSpan: 1 } : c;
                        
                        // Check if this cell is covered by a rowspan from a row above
                        let isCovered = false;
                        for (let prevRi = 0; prevRi < ri; prevRi++) {
                          const prevCell = table.rows[prevRi].cells[ci] as any;
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
                            className={cn(style.cell, cell?.rowSpan > 1 && "align-middle")}
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
          </div>
        </motion.div>
      </div>
    </section>
  );
}
