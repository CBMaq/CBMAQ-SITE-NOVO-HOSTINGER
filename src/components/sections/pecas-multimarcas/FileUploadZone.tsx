"use client";

import { useCallback, useRef, useState } from "react";
import { Upload, Paperclip, X, FileText, ImageIcon } from "lucide-react";

interface FileUploadZoneProps {
  label: string;
  accept: string;
  files: File[];
  onFilesChange: (files: File[]) => void;
  maxFiles: number;
  maxSizeMB: number;
  icon: "photo" | "document";
  hint?: string;
}

export function FileUploadZone({
  label, accept, files, onFilesChange, maxFiles, maxSizeMB, icon, hint
}: FileUploadZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState("");

  const validateAndAdd = useCallback((incoming: FileList | null) => {
    if (!incoming) return;
    setError("");
    const arr = Array.from(incoming);
    const maxBytes = maxSizeMB * 1024 * 1024;

    for (const f of arr) {
      if (f.size > maxBytes) {
        setError(`"${f.name}" excede ${maxSizeMB}MB`);
        return;
      }
    }

    const total = files.length + arr.length;
    if (total > maxFiles) {
      setError(`Máximo de ${maxFiles} arquivos`);
      return;
    }

    onFilesChange([...files, ...arr]);
  }, [files, maxFiles, maxSizeMB, onFilesChange]);

  const remove = (idx: number) => {
    onFilesChange(files.filter((_, i) => i !== idx));
  };

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    validateAndAdd(e.dataTransfer.files);
  }, [validateAndAdd]);

  return (
    <div>
      <label className="text-[0.875rem] font-bold text-[#053474] mb-2 block">{label}</label>
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all min-h-[140px] ${
          dragOver ? "border-[#0A4EE4] bg-[#0A4EE4]/5" : "border-[#D1D5DB] bg-[#FAFBFC] hover:border-[#0A4EE4]/50"
        }`}
      >
        {icon === "photo" ? (
          <Upload className="w-8 h-8 text-[#053474]/40 mb-2" />
        ) : (
          <Paperclip className="w-8 h-8 text-[#053474]/40 mb-2" />
        )}
        <p className="text-[13px] text-[#6B7280] text-center">
          Clique ou arraste arquivos para anexar
        </p>
        {hint && <p className="text-[11px] text-[#9CA3AF] mt-1 text-center">{hint}</p>}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple
        className="hidden"
        onChange={(e) => { validateAndAdd(e.target.files); e.target.value = ""; }}
      />
      {error && <p className="text-red-500 text-[11px] font-bold mt-1">{error}</p>}

      {files.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {files.map((f, i) => (
            <div key={i} className="flex items-center gap-2 bg-[#F3F4F6] rounded-lg px-3 py-1.5 text-[12px] text-[#374151]">
              {icon === "photo" ? <ImageIcon className="w-3.5 h-3.5 text-[#0A4EE4]" /> : <FileText className="w-3.5 h-3.5 text-[#0A4EE4]" />}
              <span className="max-w-[120px] truncate">{f.name}</span>
              <button type="button" onClick={(e) => { e.stopPropagation(); remove(i); }} className="text-red-400 hover:text-red-600">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
