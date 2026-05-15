"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Settings, 
  BarChart2, 
  Menu,
  X,
  Layers,
  FileText,
  Grid,
  Tag,
  Users,
  LayoutDashboard,
  Image as ImageIcon,
  Building2,
  Truck,
  BadgeCheck,
  FolderTree,
  ChevronDown,
  LibraryBig,
  HardHat,
  Briefcase
} from "lucide-react";
import { LogoutButton } from "@/components/layout/LogoutButton";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface MenuItem {
  href?: string;
  label: string;
  icon: any;
  permissionKey: string;
  children?: { href: string; label: string; icon: any; permissionKey: string }[];
}

const menuItems: MenuItem[] = [
  { href: "/admin/dashboard", label: "Início",         icon: LayoutDashboard, permissionKey: "dashboard" },
  { href: "/admin/leads",     label: "Leads (CRM)",    icon: Users,           permissionKey: "leads" },
  { 
    label: "Blog", 
    icon: LibraryBig,
    permissionKey: "blog",
    children: [
      { href: "/admin/postagens",  label: "Postagens",  icon: FileText, permissionKey: "blog_postagens" },
      { href: "/admin/categorias", label: "Categorias", icon: Grid,     permissionKey: "blog_categorias" },
      { href: "/admin/tags",       label: "Tags",       icon: Tag,      permissionKey: "blog_tags" },
    ]
  },
  { href: "/admin/curriculos", label: "Currículos", icon: Briefcase, permissionKey: "curriculos" },
  { 
    label: "Máquinas e Motores", 
    icon: HardHat,
    permissionKey: "maquinas",
    children: [
      { href: "/admin/catalogo/produtos",   label: "Máquinas",            icon: Truck,      permissionKey: "maquinas_catalogo" },
      { href: "/admin/catalogo/motores",    label: "Motores",             icon: Truck,      permissionKey: "maquinas_motores" },
      { href: "/admin/catalogo/marcas",     label: "Marcas",              icon: BadgeCheck, permissionKey: "maquinas_marcas" },
      { href: "/admin/catalogo/categorias", label: "Categorias (Máq.)",   icon: FolderTree, permissionKey: "maquinas_categorias" },
    ]
  },
  { href: "/admin/vendas-ao-governo", label: "Atas de Registro", icon: Building2, permissionKey: "vendas_governo" },
  { href: "/admin/galeria",            label: "Galeria",          icon: ImageIcon, permissionKey: "galeria" },
  { href: "/admin/usuarios",           label: "Usuários",         icon: Users,     permissionKey: "usuarios" },
  { href: "/admin/configuracoes",      label: "Configurações",    icon: Settings,  permissionKey: "configuracoes" },
];

interface AdminSidebarProps {
  userRole?: string;
  userPermissions?: string[];
}

export function AdminSidebar({ userRole, userPermissions = [] }: AdminSidebarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isAdmin = userRole === "ADMIN";

  // Filter top-level items
  const visibleItems = menuItems.filter(item => {
    if (isAdmin) return true;
    return userPermissions.includes(item.permissionKey);
  });

  // Close sidebar on route change on mobile
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Mobile top bar */}
      <div className="lg:hidden shrink-0 flex items-center justify-between p-4 bg-background border-b border-border sticky top-0 z-40 print:hidden">
        <Link href="/admin/dashboard" className="font-serif text-xl font-bold tracking-tight flex items-center gap-2">
          <Layers className="h-5 w-5 text-primary" />
          Painel Admin
        </Link>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="p-2 -mr-2 text-foreground/80 hover:text-foreground hover:bg-muted rounded-md transition-colors"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-[280px] bg-background border-r border-border transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 flex flex-col shadow-2xl lg:shadow-none print:hidden",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="h-20 lg:h-auto p-6 flex flex-col justify-center border-b border-border/50 lg:border-none lg:pt-8">
          <Link href="/admin/dashboard" className="font-serif text-2xl font-bold tracking-tight flex items-center gap-3 group">
            <div className="p-2 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
              <Layers className="h-6 w-6 text-primary" />
            </div>
            Painel Admin
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-1.5 scrollbar-thin scrollbar-thumb-border">
          {visibleItems.map((item, idx) => {
            // Filter children for non-admins
            const filteredItem = isAdmin ? item : {
              ...item,
              children: item.children?.filter(child =>
                userPermissions.includes(child.permissionKey)
              ),
            };

            const isActive = filteredItem.href
              ? pathname === filteredItem.href
              : filteredItem.children?.some(child => pathname === child.href);

            return (
              <SidebarItem 
                key={idx} 
                item={filteredItem} 
                pathname={pathname} 
                isActive={isActive} 
              />
            );
          })}
        </div>

        <div className="p-4 mt-auto border-t border-border/50 bg-muted/20 lg:bg-muted/50">
          <div className="space-y-2">
            <div className="lg:flex hidden justify-between items-center mb-4 px-2">
              <span className="text-sm font-medium text-muted-foreground">Tema</span>
              <ThemeToggle />
            </div>
            <LogoutButton className="w-full flex items-center justify-start gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/10 font-medium transition-colors" />
          </div>
        </div>
      </aside>
    </>
  );
}

function SidebarItem({ item, pathname, isActive }: { item: MenuItem; pathname: string; isActive: boolean | undefined }) {
  const [isOpen, setIsOpen] = useState(isActive);
  const Icon = item.icon;
  const hasChildren = item.children && item.children.length > 0;

  // Auto expand if active child
  useEffect(() => {
    if (isActive) setIsOpen(true);
  }, [isActive]);

  if (item.href && !hasChildren) {
    return (
      <Link
        href={item.href}
        className={cn(
          "flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-300 group",
          pathname === item.href
            ? "bg-primary text-white shadow-lg shadow-primary/20"
            : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
        )}
      >
        <Icon className={cn(
          "h-5 w-5 shrink-0",
          pathname === item.href ? "text-white" : "group-hover:text-primary"
        )} />
        <span className="flex-1 truncate text-xs font-bold uppercase tracking-tight">
          {item.label}
        </span>
      </Link>
    );
  }

  return (
    <div className="space-y-1">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-300 group",
          isActive && !isOpen
            ? "bg-primary/10 text-primary"
            : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
        )}
      >
        <Icon className={cn(
          "h-5 w-5 shrink-0",
          isActive ? "text-primary" : "group-hover:text-primary"
        )} />
        <span className="flex-1 truncate text-xs font-bold uppercase tracking-tight text-left">
          {item.label}
        </span>
        <ChevronDown className={cn(
          "h-4 w-4 transition-transform duration-300",
          isOpen ? "rotate-180" : "rotate-0"
        )} />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden pl-6 space-y-1"
          >
            {item.children?.map((child) => {
              const ChildIcon = child.icon;
              const isChildActive = pathname === child.href;
              
              return (
                <Link
                  key={child.href}
                  href={child.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group",
                    isChildActive
                      ? "text-primary font-bold"
                      : "text-muted-foreground/70 hover:text-primary hover:bg-primary/5"
                  )}
                >
                  <ChildIcon className={cn(
                    "h-4 w-4 shrink-0",
                    isChildActive ? "text-primary" : "group-hover:text-primary"
                  )} />
                  <span className="flex-1 truncate text-[11px] uppercase tracking-wider">
                    {child.label}
                  </span>
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
