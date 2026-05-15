"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function ImportacaoDocumentacao() {
  const baseUrl = "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/";

  const items = [
    { img: "import-doc-esp-icon1.png", title: "Licenças de Importação" },
    { img: "import-doc-esp-icon2.png", title: "Certificações" },
    { img: "import-doc-esp-icon3.png", title: "Classificação NCM" },
    { img: "import-doc-esp-icon4.png", title: "Compliance" },
  ];

  return (
    <section className="bg-white section-padding overflow-hidden">
      <div className="section-container">

        <div className="text-center mb-16">
          <h2 className="text-[2.25rem] md:text-[2.75rem] font-bold text-[#053474] tracking-tight">
            Documentação e despacho
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-20">
          
          {/* Left: Interactive List */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-5/12 flex flex-col gap-6"
          >
            {items.map((item, idx) => (
              <div 
                key={idx} 
                className="flex items-center gap-6 group hover:translate-x-2 transition-transform duration-300"
              >
                <div className="w-[60px] h-[60px] md:w-[70px] md:h-[70px] relative shrink-0">
                  <Image 
                    src={`${baseUrl}${item.img}`} 
                    alt={item.title} 
                    fill 
                    className="object-contain" 
                  />
                </div>
                <span className="text-[1.25rem] md:text-[1.5rem] font-bold text-[#053474]">
                  {item.title}
                </span>
              </div>
            ))}
          </motion.div>

          {/* Right: Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-7/12"
          >
            <div className="relative w-full aspect-[4/3] rounded-[24px] overflow-hidden shadow-xl">
              <Image
                src={`${baseUrl}import-doc-esp-img.webp`}
                alt="Documentação de Importação CBMaq"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
