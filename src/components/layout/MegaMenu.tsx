"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { cn } from "@/lib/utils";

const megaMenuData = [
  {
    title: "Máquinas e Tratores",
    links: [
      { label: "Catálogo de Máquinas", href: "/maquinas" },
      { label: "Máquinas para Construção", href: "/catalogo?t=tratores&page=1&categoria=pas-carregadeiras%2Cretroescavadeiras%2Cescavadeiras-hidraulicas" },
      { label: "Máquinas para Mineração", href: "/catalogo?t=tratores&page=1&categoria=pas-carregadeiras%2Cretroescavadeiras%2Cescavadeiras-hidraulicas" },
      { label: "Usinas de Asfalto", href: "/catalogo?t=tratores&categoria=usinas-de-asfalto" },
      { label: "Tratores", href: "/catalogo?t=tratores&categoria=tratores" },
    ]
  },
  {
    title: "Serviços",
    links: [
      { label: "Assistência Técnica", href: "/assistencia-tecnica" },
      { label: "Consultoria Especializada", href: "/consultoria" },
      { label: "Importação e Comércio Exterior", href: "/importacao" },
      { label: "Telemetria", href: "/telemetria" },
    ]
  },
  {
    title: "Soluções",
    links: [
      { label: "Consórcio", href: "/consorcios" },
      { label: "Seguros", href: "/seguros" },
      { label: "Vendas para Governo", href: "/vendas-ao-governo" },
    ]
  },
  {
    title: "Motores e Peças",
    links: [
      { label: "Motores Weichai", href: "/motores-weichai" },
      { label: "Peças Multimarcas", href: "/pecas-multimarcas" },
    ]
  },
  {
    title: "Digital",
    links: [
      { label: "Loja Oficial CBMaq", href: "/ecommerce" },
      { label: "Loja Oficial Mahindra", href: "#" },
      { label: "Loja Oficial Mercado Livre", href: "https://www.mercadolivre.com.br/loja/cbmaq" },
    ]
  },
];

export function MegaMenu({ isDark = false, navHeight = "72px" }: { isDark?: boolean, navHeight?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  return (
    <div 
      className="h-full flex items-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link 
        href="/#solucoes"
        className={cn(
          "text-[15px] font-medium transition-colors hover:text-[#0A4EE4] flex items-center gap-1.5 py-4",
          isDark ? "text-white/90 hover:text-white" : "text-[#001647]",
          isOpen && (isDark ? "text-white" : "text-[#0A4EE4]")
        )}
      >
        Áreas de Atuação
        <svg 
          width="12" 
          height="12" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className={cn("transition-transform duration-300", isOpen && "-rotate-180")}
        >
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </Link>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed left-0 right-0 w-full bg-white shadow-[0_30px_60px_rgba(0,0,0,0.12)] border-t border-gray-100 overflow-hidden"
            style={{ 
              top: navHeight,
              zIndex: 45
            }}
          >
             <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-10 lg:py-14">
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-x-8 gap-y-12">
                  {megaMenuData.map((column, idx) => (
                    <div key={idx} className="flex flex-col">
                      <h4 className="font-sans text-[0.875rem] font-bold text-[#001647] mb-6 tracking-wide uppercase border-b border-gray-100 pb-3">
                        {column.title}
                      </h4>
                      <ul className="flex flex-col gap-3.5">
                        {column.links.map((link, linkIdx) => (
                          <li key={linkIdx}>
                            <Link 
                              href={link.href}
                              className="text-[0.9375rem] text-[#4d5c7e] font-medium transition-all duration-200 hover:text-[#0A4EE4] hover:translate-x-1 inline-block"
                              onClick={() => setIsOpen(false)}
                            >
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
               </div>
             </div>
             {/* Bottom brand line */}
             <div className="h-[4px] bg-gradient-to-r from-[#001647] via-[#0A4EE4] to-[#0095FF] w-full" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function MobileMegaMenu({ closeMenu, isDark = false }: { closeMenu: () => void, isDark?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center justify-between text-base font-medium py-2 transition-colors w-full text-left",
          isDark ? "text-white/90 hover:text-white" : "text-[#4d5c7e] hover:text-[#0A4EE4]"
        )}
      >
        Áreas de Atuação
        <svg 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className={cn("transition-transform duration-300", isOpen ? "rotate-180 text-[#0A4EE4]" : "text-gray-400")}
        >
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-6 pl-4 py-4 border-l-2 border-gray-100 ml-2 mt-2">
              {megaMenuData.map((column, idx) => (
                <div key={idx} className="flex flex-col gap-2">
                  <h4 className={cn(
                    "font-sans text-[0.8125rem] font-bold uppercase tracking-wide",
                    isDark ? "text-white" : "text-[#001647]"
                  )}>
                    {column.title}
                  </h4>
                  <ul className="flex flex-col gap-2.5 mt-1">
                    {column.links.map((link, linkIdx) => (
                      <li key={linkIdx}>
                        <Link 
                          href={link.href}
                          className={cn(
                            "text-[0.875rem] font-medium transition-colors",
                            isDark ? "text-white/70 hover:text-white" : "text-[#4d5c7e] hover:text-[#0A4EE4]"
                          )}
                          onClick={closeMenu}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const institutionalData = [
  { label: "Nossa História", href: "/nossa-historia" },
  { label: "Unidades", href: "/contato#unidades" },
  { label: "Trabalhe Conosco", href: "/trabalhe-conosco" },
  { label: "Contato", href: "/contato" },
];

export function QuemSomosDropdown({ isDark = false, navHeight = "72px" }: { isDark?: boolean, navHeight?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  return (
    <div 
      className="h-full flex items-center relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link 
        href="/nossa-historia"
        className={cn(
          "text-[15px] font-medium transition-colors hover:text-[#0A4EE4] flex items-center gap-1.5 py-4",
          isDark ? "text-white/90 hover:text-white" : "text-[#001647]",
          isOpen && (isDark ? "text-white" : "text-[#0A4EE4]")
        )}
      >
        Quem Somos
        <svg 
          width="12" 
          height="12" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className={cn("transition-transform duration-300", isOpen && "-rotate-180")}
        >
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </Link>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-0 w-[220px] bg-white shadow-[0_15px_35px_rgba(0,0,0,0.1)] border border-gray-100 rounded-b-xl overflow-hidden py-3 z-[60]"
          >
            <ul className="flex flex-col">
              {institutionalData.map((item, idx) => (
                <li key={idx}>
                  <Link 
                    href={item.href}
                    className="block px-6 py-2.5 text-[0.9375rem] text-[#4d5c7e] font-medium hover:text-[#0A4EE4] hover:bg-gray-50 transition-all"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function MobileQuemSomosDropdown({ closeMenu, isDark = false }: { closeMenu: () => void, isDark?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center justify-between text-base font-medium py-2 transition-colors w-full text-left",
          isDark ? "text-white/90 hover:text-white" : "text-[#4d5c7e] hover:text-[#0A4EE4]"
        )}
      >
        Quem Somos
        <svg 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className={cn("transition-transform duration-300", isOpen ? "rotate-180 text-[#0A4EE4]" : "text-gray-400")}
        >
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <ul className="flex flex-col gap-2.5 pl-4 py-2 border-l-2 border-gray-100 ml-2 mt-1">
              {institutionalData.map((item, idx) => (
                <li key={idx}>
                  <Link 
                    href={item.href}
                    className={cn(
                      "text-[0.875rem] font-medium transition-colors",
                      isDark ? "text-white/70 hover:text-white" : "text-[#4d5c7e] hover:text-[#0A4EE4]"
                    )}
                    onClick={closeMenu}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
