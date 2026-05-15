import Link from "next/link";
import { Settings, Users, Percent, TicketCheck, BarChart2 } from "lucide-react";
import { LogoutButton } from "@/components/layout/LogoutButton";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function AdminNavbar() {
  return (
    <nav className="fixed top-0 inset-x-0 h-20 bg-background/95 backdrop-blur-md z-50 border-b border-border shadow-sm transition-colors duration-300">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-12 h-full flex items-center justify-between">
        
        <Link href="/admin/dashboard" className="font-serif text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
          <Settings className="h-5 w-5 text-primary" />
          Comemore
        </Link>
        
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/admin/assinantes" className="flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors">
            <Users className="h-4 w-4" />
            Sócias
          </Link>
          <Link href="/admin/fornecedores" className="flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors">
            <Percent className="h-4 w-4" />
            Fornecedores
          </Link>
          <Link href="/admin/cupons" className="flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors">
            <TicketCheck className="h-4 w-4" />
            Cupons
          </Link>
          <Link href="/admin/relatorios" className="flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors">
            <BarChart2 className="h-4 w-4" />
            Relatórios
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/admin/usuarios" className="mr-4 text-sm font-medium text-foreground/80 hover:text-primary transition-colors flex items-center gap-2">
            Usuários
          </Link>
          <ThemeToggle />
          <LogoutButton />
        </div>

      </div>
    </nav>
  );
}
