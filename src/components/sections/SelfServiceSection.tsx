import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/motion/MotionWrappers";
import { cn } from "@/lib/utils";

const services = [
  {
    id: "ligamos",
    title: "Ligamos para\nVocê",
    href: "/contato",
    img: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/basil-phone-outline.png",
  },
  {
    id: "ecossistema",
    title: "Nosso\nEcossistema",
    href: "/#solucoes",
    img: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/ic-outline-store.png",
  },
  {
    id: "whatsapp",
    title: "Falar no\nWhatsApp",
    href: "https://wa.me/5561999834952",
    img: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/wp.png",
  },
  {
    id: "trabalhe",
    title: "Trabalhe Conosco",
    href: "/trabalhe-conosco",
    img: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/cil-people.png",
  },
  {
    id: "sobre",
    title: "Sobre Nós",
    href: "/nossa-historia",
    img: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/material-symbols-info-outline.png",
  },
];

export function SelfServiceSection() {
  return (
    <section
      id="atendimento"
      className="relative z-20 pb-0"
      aria-label="Auto Atendimento"
    >
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <FadeIn
          className="relative -mt-24 md:-mt-40 rounded-[2rem] md:rounded-[3rem] px-6 py-12 md:px-12 md:py-16 border border-white"
          style={{
            background: "linear-gradient(to bottom, #F2F0E8 0%, #FFFFFF 93%)"
          }}
        >
          {/* Title */}
          <div className="text-center mb-10 md:mb-14">
            <h2 className="font-sans text-[1.75rem] md:text-[2.25rem] font-bold leading-tight text-[#0A2A5E]">
              Auto Atendimento
            </h2>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5 lg:gap-6">
            {services.map((service) => (
              <Link
                key={service.id}
                href={service.href}
                target={service.href.startsWith('http') ? "_blank" : undefined}
                rel={service.href.startsWith('http') ? "noopener noreferrer" : undefined}
                className="group flex flex-col bg-white rounded-2xl p-5 md:p-6 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1 shadow-[0_4px_20px_rgba(0,0,0,0.03)]"
              >
                {/* Icon Layout */}
                <div className="flex justify-center items-center h-16 mb-4">
                    <Image
                      src={service.img}
                      alt={service.title.replace("\n", " ")}
                      width={48}
                      height={48}
                      className={cn(
                        "object-contain w-auto transition-transform duration-300 group-hover:scale-110",
                        service.id === "whatsapp" ? "h-8 md:h-10" : "h-10 w-auto md:h-12"
                      )}
                    />
                </div>

                {/* Text Label */}
                <p className="text-center text-[#0A2A5E] font-medium text-[0.875rem] md:text-[0.9375rem] leading-snug whitespace-pre-line mb-6 h-10 flex items-center justify-center">
                  {service.title}
                </p>

                {/* Bottom line and arrow */}
                <div className="mt-auto flex items-center justify-between w-full">
                  <div className="h-[2px] bg-[#0A2A5E] flex-1 mr-3 group-hover:bg-[#0A4EE4] transition-colors" />
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#4ab5e1" /* Light blue cyan arrow to match image 2 */
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="shrink-0 transition-transform group-hover:translate-x-1"
                  >
                    <path d="M5 12h14m-7-7 7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>

          {/* Logo with stripes - Unified from Footer */}
          <div className="flex items-center justify-center mt-12 md:mt-20 max-w-[1000px] mx-auto px-4 gap-4 md:gap-8">
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
        </FadeIn>
      </div>
    </section>
  );
}
