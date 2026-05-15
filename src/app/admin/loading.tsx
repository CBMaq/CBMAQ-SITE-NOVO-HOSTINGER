import { Layers } from "lucide-react";

export default function AdminLoading() {
  return (
    <div className="flex-1 h-[80vh] flex flex-col items-center justify-center gap-4 animate-in fade-in duration-500">
      <div className="relative">
        <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
        <div className="relative p-4 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-border/50 animate-bounce">
          <Layers className="h-10 w-10 text-primary" />
        </div>
      </div>
      <div className="flex flex-col items-center gap-1">
        <p className="text-sm font-bold text-slate-500 uppercase tracking-widest animate-pulse">
          Carregando dados
        </p>
        <div className="flex gap-1">
           <div className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: '0ms' }} />
           <div className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '150ms' }} />
           <div className="w-1.5 h-1.5 rounded-full bg-primary/80 animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
}
