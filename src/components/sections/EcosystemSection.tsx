import { FadeIn } from "@/components/motion/MotionWrappers";

import { EcosystemInteractive } from "./EcosystemInteractive";

export function EcosystemSection() {
  return (
    <section
      id="solucoes"
      className="w-full overflow-hidden section-padding pb-0"
      style={{ 
        background: "linear-gradient(180deg, #F3F0E9 0%, #F9F8F4 100%)"
      }}
      aria-label="Nosso ecossistema"
    >
      <div className="w-full grid grid-cols-1 lg:grid-cols-[1fr_min(1280px,calc(100%-3rem))_1fr]">
        {/* Content Area — Starts at center-left and goes to the right edge */}
        <div className="col-start-1 lg:col-start-2 col-end-4 flex flex-col lg:flex-row items-stretch">
          
          {/* Text Content — Fixed to the left half of the 1280px container */}
          <div className="w-full lg:w-[42%] py-12 lg:py-16 px-6 lg:pr-16 lg:pl-0">
            {/* Section chip label */}
            <span
              className="inline-block text-[0.6875rem] font-semibold tracking-[0.06em] uppercase px-4 py-1.5 rounded-full mb-6"
              style={{
                color: "var(--color-cbmaq-blue)",
                backgroundColor: "rgba(26,95,180,0.08)",
              }}
            >
              Nosso ecossistema
            </span>

            <FadeIn>
              <h2
                className="font-sans text-[2.25rem] md:text-[2.75rem] lg:text-[3rem] leading-[1.1] font-bold mb-6 text-[#0A2A5E] tracking-tight"
              >
                11 soluções integradas
                <br />
                para a sua operação
                <br />
                não parar.
              </h2>

              <p
                className="text-[1rem] leading-[1.7] mb-10 max-w-md"
                style={{ color: "var(--color-cbmaq-gray-600)" }}
              >
                Da aquisição à manutenção. Do crédito à tecnologia. Cada área da CBMaq foi criada para resolver um problema real de quem opera negócios no Brasil.
              </p>
            </FadeIn>
          </div>

          {/* Interactive Cards — Bleeds to the right edge of the screen */}
          <div className="w-full lg:w-[58%] min-h-[500px] lg:min-h-[680px]">
            <EcosystemInteractive />
          </div>
        </div>
      </div>
    </section>
  );
}
