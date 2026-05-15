"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { MegaMenu, MobileMegaMenu, QuemSomosDropdown, MobileQuemSomosDropdown } from "../../layout/MegaMenu";

export function CatalogNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { isMegaMenu: true, label: "Áreas de Atuação" },
    { isDropdown: true, label: "Quem Somos" },
    { href: "/#solucoes", label: "Ecossistema CBMaq" },
    { href: "/contato", label: "Contato" },
  ];

  const ctaLink = "/contato";

  return (
    <nav className="fixed top-0 inset-x-0 h-20 bg-[#0A2A5E] z-50 flex items-center shadow-lg border-b border-white/10">
      <div className="container mx-auto px-4 flex items-center justify-between h-full">
        {/* Logo Branca para fundo azul */}
        <Link href="/" className="flex items-center shrink-0 transition-opacity hover:opacity-90">
          <Image 
            src="https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/logo-cbmaq.png" 
            alt="CBMaq Logo" 
            width={160} 
            height={44} 
            className="h-10 w-auto object-contain brightness-0 invert"
            priority
          />
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8 h-full">
          {navLinks.map((link) => {
            if (link.isMegaMenu) {
              return <MegaMenu key={link.label} isDark={true} navHeight="80px" />;
            }
            if (link.isDropdown) {
              return <QuemSomosDropdown key={link.label} isDark={true} navHeight="80px" />;
            }
            return (
              <Link
                key={link.label}
                href={link.href!}
                className="text-[15px] font-medium text-white/90 hover:text-white transition-colors h-full flex items-center"
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center">
          <Link 
            href={ctaLink} 
            className="bg-[#0A4EE4] hover:bg-[#083DB4] text-white px-7 py-3 rounded-full text-sm font-medium transition-all shadow-lg"
          >
            Fale com um especialista
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="lg:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
        >
          <span
            className="block w-6 h-0.5 bg-white transition-transform duration-300"
            style={{ transform: mobileOpen ? "rotate(45deg) translate(2.5px, 5px)" : "none" }}
          />
          <span
            className="block w-6 h-0.5 bg-white transition-opacity duration-300"
            style={{ opacity: mobileOpen ? 0 : 1 }}
          />
          <span
            className="block w-6 h-0.5 bg-white transition-transform duration-300"
            style={{ transform: mobileOpen ? "rotate(-45deg) translate(2.5px, -5px)" : "none" }}
          />
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <div className="lg:hidden absolute top-20 left-0 right-0 bg-[#0A2A5E] border-b border-white/10 shadow-lg max-h-[calc(100vh-80px)] overflow-y-auto">
          <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
            {navLinks.map((link) => {
              if (link.isMegaMenu) {
                return <MobileMegaMenu key={link.label} closeMenu={() => setMobileOpen(false)} isDark={true} />;
              }
              if (link.isDropdown) {
                return <MobileQuemSomosDropdown key={link.label} closeMenu={() => setMobileOpen(false)} isDark={true} />;
              }
              return (
                <Link
                  key={link.label}
                  href={link.href || "/#solucoes"}
                  className="text-base font-medium py-2 text-white/90 hover:text-white transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
