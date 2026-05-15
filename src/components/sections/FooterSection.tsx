"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function FooterSection() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <footer
      id="footer"
      className="bg-white pt-4 pb-12 mt-auto"
      role="contentinfo"
    >
      <div className="section-container">
        {/* Brand Logo Row — Only visible on Internal Pages (Home already has it in SelfServiceSection) */}
        {!isHome && (
          <div className="flex items-center justify-center mb-16 md:mb-24 max-w-[1000px] mx-auto px-4 gap-4 md:gap-8">
            <div className="flex-1 max-w-[295px]">
              <Image 
                src="https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/faixa-footer.svg" 
                alt="" 
                width={295} 
                height={14} 
                className="w-full h-auto object-contain"
              />
            </div>
            
            <div className="flex items-center shrink-0">
              <Image 
                src="https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/logo-cbmaq.png" 
                alt="CBMaq Logo" 
                width={180} 
                height={50} 
                className="h-10 md:h-12 w-auto object-contain"
              />
            </div>

            <div className="flex-1 max-w-[295px]">
              <Image 
                src="https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/faixa-footer.svg" 
                alt="" 
                width={295} 
                height={14} 
                className="w-full h-auto object-contain scale-x-[-1]"
              />
            </div>
          </div>
        )}

        {/* 4 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 mb-16">
          
          {/* Column 1: CBMaq */}
          <div>
            <h4 className="font-sans text-[1rem] md:text-[1.125rem] font-bold mb-6 text-[#001647] tracking-tight text-center md:text-left">
              CBMaq
            </h4>
            <div className="flex flex-col gap-4 text-[0.875rem] text-[#4d5c7e] font-medium leading-relaxed text-center md:text-left">
              <p>Desde 1965, a CBMaq constrói um ecossistema completo de soluções da importação à consultoria, da venda de máquinas à gestão operacional para impulsionar o crescimento do seu negócio com inteligência e eficiência.</p>
            </div>
          </div>

          {/* Column 2: Áreas de Atuação */}
          <div>
            <h4 className="font-sans text-[1rem] md:text-[1.125rem] font-bold mb-6 text-[#001647] tracking-tight text-center md:text-left">
              Áreas de Atuação
            </h4>
            <ul className="flex flex-col gap-3.5 items-center md:items-start text-center md:text-left">
              {[
                { name: "Máquinas & Tratores", href: "/maquinas" },
                { name: "Consórcios & Financiamento", href: "/consorcios" },
                { name: "Seguros", href: "/seguros" },
                { name: "Importação & Comércio Exterior", href: "/importacao" },
                { name: "Assistência Técnica", href: "/assistencia-tecnica" },
                { name: "Peças Multimarcas", href: "/pecas-multimarcas" },
                { name: "Motores & Peças Weichai", href: "/motores-weichai" },
                { name: "Consultoria Técnica", href: "/consultoria" },
                { name: "E-Commerce", href: "/ecommerce" }
              ].map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="text-[0.875rem] text-[#4d5c7e] font-medium transition-colors hover:text-[#0A4EE4]">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Nossas Lojas Online */}
          <div>
            <h4 className="font-sans text-[1rem] md:text-[1.125rem] font-bold mb-6 text-[#001647] tracking-tight text-center md:text-left">
              Nossas Lojas Online
            </h4>
            <ul className="flex flex-col gap-5 items-center md:items-start text-center md:text-left">
              <li>
                <Link href="#" className="flex flex-col gap-1 text-[0.875rem] text-[#4d5c7e] font-medium transition-colors hover:text-[#0A4EE4] group">
                  <span className="text-[#4d5c7e] font-medium group-hover:text-[#0A4EE4]">Loja CBMaq —</span>
                  <span>lojacbmaq.com.br</span>
                </Link>
              </li>
              <li>
                <Link href="#" className="flex flex-col gap-1 text-[0.875rem] text-[#4d5c7e] font-medium transition-colors hover:text-[#0A4EE4] group">
                  <span className="text-[#4d5c7e] font-medium group-hover:text-[#0A4EE4]">Loja Mahindra Oficial —</span>
                  <span>lojamahindraoficial.com.br</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Fale Conosco */}
          <div>
            <h4 className="font-sans text-[1rem] md:text-[1.125rem] font-bold mb-6 text-[#001647] tracking-tight text-center md:text-left">
              Fale Conosco
            </h4>
            <ul className="flex flex-col gap-6 items-center md:items-start text-center md:text-left">
              <li>
                <Link href="/contato" className="flex flex-col gap-1 text-[0.875rem] text-[#4d5c7e] font-medium transition-colors hover:text-[#0A4EE4] group">
                  <span className="text-[#4d5c7e] font-bold group-hover:text-[#0A4EE4]">Brasília</span>
                  <span className="leading-relaxed">
                    (61) 3204-0909 | Setor SCIA Quadra 14<br />
                    Conjunto 11 Lote 04 Parte A, Brasília - DF
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/contato" className="flex flex-col gap-1 text-[0.875rem] text-[#4d5c7e] font-medium transition-colors hover:text-[#0A4EE4] group">
                  <span className="text-[#4d5c7e] font-bold group-hover:text-[#0A4EE4]">Goiânia</span>
                  <span className="leading-relaxed">
                    (61) 3204-0909 | Avenida Sao Francisco,<br />
                    640 - Santa Genoveva, Goiânia - GO
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/contato" className="flex flex-col gap-1 text-[0.875rem] text-[#4d5c7e] font-medium transition-colors hover:text-[#0A4EE4] group">
                  <span className="text-[#4d5c7e] font-bold group-hover:text-[#0A4EE4]">Valparaíso</span>
                  <span className="leading-relaxed">
                    (61) 3204-0909 | Rua Parque Marajo,<br />
                    Qd 13 Lt 04 - Valparaíso de Goiás - GO
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/contato" className="flex flex-col gap-1 text-[0.875rem] text-[#4d5c7e] font-medium transition-colors hover:text-[#0A4EE4] group">
                  <span className="text-[#4d5c7e] font-bold group-hover:text-[#0A4EE4]">Palmas</span>
                  <span className="leading-relaxed">
                    (61) 3204-0909 | Quadra 706 Sul Alameda 6,<br />
                    Nº 29 - Plano Diretor Sul, Palmas - TO
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/contato" className="flex flex-col gap-1 text-[0.875rem] text-[#4d5c7e] font-medium transition-colors hover:text-[#0A4EE4] group">
                  <span className="text-[#4d5c7e] font-bold group-hover:text-[#0A4EE4]">Paraupebas</span>
                  <span className="leading-relaxed">
                    (61) 3204-0909 | Rua Sol Poente, 63 - Qd 119 Lt 60,<br />
                    Andar 2 Sala B - Rio Verde, Paraupebas - PA
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/contato" className="flex flex-col gap-1 text-[0.875rem] text-[#4d5c7e] font-medium transition-colors hover:text-[#0A4EE4] group">
                  <span className="text-[#4d5c7e] font-bold group-hover:text-[#0A4EE4]">Cariacica</span>
                  <span className="leading-relaxed">
                    (61) 3204-0909 | Rod. Gov. Mario Covas,<br />
                    Portaria B, 256 - Padre Mathias, Cariacica - ES
                  </span>
                </Link>
              </li>
              
              <li className="pt-2">
                <a href="mailto:comunicacao@cbmaq.com.br" className="text-[0.875rem] text-[#4d5c7e] font-medium transition-colors hover:text-[#0A4EE4]">
                  comunicacao@cbmaq.com.br
                </a>
              </li>
              <li>
                <Link href="/seja-um-revendedor-cbmaq" className="text-[0.875rem] text-[#4d5c7e] font-bold transition-colors hover:text-[#0A4EE4]">
                  Seja um Revendedor
                </Link>
              </li>
              <li>
                <a href="https://wa.me/556199983495" target="_blank" rel="noopener noreferrer" className="text-[0.875rem] text-[#4d5c7e] font-bold transition-colors hover:text-[#0A4EE4]">
                  Falar pelo WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px mb-10 bg-[#E9ECEF]" />

        {/* Bottom row */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Social Icons (Col 1) */}
          <div className="flex items-center justify-center lg:justify-start gap-3">
            {/* Instagram */}
            <a href="https://www.instagram.com/cbmaq_/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full flex items-center justify-center bg-[#4d5c7e] hover:bg-[#0A2A5E] text-white transition-all hover:scale-110 shrink-0">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 01-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 017.8 2m-.2 2A3.6 3.6 0 004 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 003.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5M12 7a5 5 0 110 10 5 5 0 010-10m0 2a3 3 0 100 6 3 3 0 000-6z" /></svg>
            </a>
            {/* LinkedIn */}
            <a href="https://www.linkedin.com/company/cbmaqoficial/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full flex items-center justify-center bg-[#4d5c7e] hover:bg-[#0A2A5E] text-white transition-all hover:scale-110 shrink-0">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" /></svg>
            </a>
            {/* Facebook */}
            <a href="https://www.facebook.com/cbmaqoficial" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full flex items-center justify-center bg-[#4d5c7e] hover:bg-[#0A2A5E] text-white transition-all hover:scale-110 shrink-0">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3l-1 3h-2v6.8c4.56-.93 8-4.96 8-9.8z" /></svg>
            </a>
          </div>

          {/* Legal text (Col 3 & 4) */}
          <div className="lg:col-span-2 lg:col-start-3 flex flex-col gap-3 font-sans text-xs text-[#4d5c7e] font-medium text-center lg:text-left">
             <p>© {new Date().getFullYear()} CBMaq - Todos os direitos reservados - CNPJ 11.239.764/0001-50</p>
             <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-2 gap-y-1">
               <Link href="/politica-de-privacidade" className="hover:text-[#0A4EE4]">Política de Privacidade</Link>
               <span>-</span>
               <Link href="/termos-de-uso" className="hover:text-[#0A4EE4]">Termos de Uso</Link>
               <span>-</span>
               <Link href="/ouvidoria" className="hover:text-[#0A4EE4]">Ouvidoria</Link>
               <span>-</span>
               <Link href="/trabalhe-conosco" className="hover:text-[#0A4EE4]">Trabalhe Conosco</Link>
               <span>-</span>
               <Link href="/contato" className="hover:text-[#0A4EE4]">Contato</Link>
             </div>
             <p className="mt-1">Desenvolvido por Galgar Digital</p>
          </div>
          
        </div>
      </div>
    </footer>
  );
}
