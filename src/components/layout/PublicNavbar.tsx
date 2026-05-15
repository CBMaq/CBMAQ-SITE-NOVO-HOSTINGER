"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { MegaMenu, MobileMegaMenu, QuemSomosDropdown, MobileQuemSomosDropdown } from "./MegaMenu";

export function PublicNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  // Navigation logic: Different links based on context
  // Section IDs updated to Portuguese as per client request
  // Navigation logic: Anchor links on Home, Simplified links on specialized pages
  const navLinks = [
    { isMegaMenu: true, label: "Áreas de Atuação" },
    { isDropdown: true, label: "Quem Somos" },
    { href: "/#solucoes", label: "Ecossistema CBMaq" },
    { href: "/contato", label: "Contato" },
  ];

  const ctaLink = "/contato";

  return (
    <nav
      className="fixed top-0 inset-x-0 h-[72px] bg-cbmaq-white/95 backdrop-blur-md z-50 border-b border-cbmaq-gray-200/60"
      role="navigation"
      aria-label="Navegação principal"
    >
      <div className="section-container h-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0 transition-opacity hover:opacity-90" aria-label="CBMaq - Página Inicial">
          <Image 
            src="https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/logo-cbmaq.png" 
            alt="CBMaq Logo" 
            width={160} 
            height={44} 
            className="h-11 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8 h-full">
          {navLinks.map((link) => {
            if (link.isMegaMenu) {
              return <MegaMenu key={link.label} isDark={false} navHeight="72px" />;
            }
            if (link.isDropdown) {
              return <QuemSomosDropdown key={link.label} isDark={false} navHeight="72px" />;
            }
            return (
              <Link
                key={link.label}
                href={link.href!}
                className="text-[15px] font-medium transition-colors hover:text-[#0A4EE4] h-full flex items-center"
                style={{ color: 'var(--color-cbmaq-navy)' }}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <Link href={ctaLink} className="btn-brand rounded-full text-sm font-medium">
            Fale com um especialista
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="lg:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={mobileOpen}
        >
          <span
            className="block w-6 h-0.5 bg-cbmaq-navy transition-transform duration-300"
            style={{ transform: mobileOpen ? "rotate(45deg) translate(2.5px, 5px)" : "none" }}
          />
          <span
            className="block w-6 h-0.5 bg-cbmaq-navy transition-opacity duration-300"
            style={{ opacity: mobileOpen ? 0 : 1 }}
          />
          <span
            className="block w-6 h-0.5 bg-cbmaq-navy transition-transform duration-300"
            style={{ transform: mobileOpen ? "rotate(-45deg) translate(2.5px, -5px)" : "none" }}
          />
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <div className="lg:hidden absolute top-[72px] left-0 right-0 bg-cbmaq-white border-b border-cbmaq-gray-200 shadow-lg max-h-[calc(100vh-72px)] overflow-y-auto">
          <div className="section-container py-6 flex flex-col gap-4">
            {navLinks.map((link) => {
              if (link.isMegaMenu) {
                return <MobileMegaMenu key={link.label} closeMenu={() => setMobileOpen(false)} />;
              }
              if (link.isDropdown) {
                return <MobileQuemSomosDropdown key={link.label} closeMenu={() => setMobileOpen(false)} />;
              }
              return (
                <Link
                  key={link.label}
                  href={link.href || "/#solucoes"}
                  className="text-base font-medium py-2 transition-colors hover:text-[#0A4EE4]"
                  style={{ color: 'var(--color-cbmaq-gray-700)' }}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
            {/* Removido o botão de CTA no mobile conforme solicitado */}
          </div>
        </div>
      )}
    </nav>
  );
}
