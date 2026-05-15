import Image from "next/image";

const row1Items = [
  {
    isLogo: true,
    image: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/novo-selo-crop.webp",
    alt: "CBMaq 60 Anos",
  },
  {
    icon: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/ricon1.png",
    value: "+5.000",
    label: "Clientes ativos\nem todo Brasil",
  },
  {
    icon: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/ricon2.png",
    value: "11 Soluções",
    label: "integradas em um\núnico ecossistema",
  },
  {
    icon: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/ricon3.png",
    value: "+ 30MM",
    label: "Dólares em Importação de\nMáquinas e Equipamentos",
  },
];

const row2Items = [
  {
    icon: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/ricon4.png",
    value: "5 Unidades",
    label: "posicionadas\nestrategicamente em\nBrasília, Goiânia, Palmas,\nPará e Espírito Santo.",
  },
  {
    icon: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/ricon5.png",
    value: "5",
    label: "Marcas de máquinas\ne equipamentos\nrepresentadas no Brasil",
  },
  {
    icon: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/ricon6.png",
    value: "100+",
    label: "Marcas de peças\nmultimarcas disponíveis\nem estoque",
  },
  {
    icon: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/ricon7.png",
    value: "20K+",
    label: "Itens em estoque\ndisponíveis para pronto\natendimento",
  },
];

export function NumbersSection() {
  return (
    <section
      id="resultados"
      className="relative overflow-hidden section-padding"
      style={{ 
        background: "linear-gradient(180deg, #F9F8F4 0%, #FFFFFF 100%)"
      }}
      aria-label="Resultados da CBMaq"
    >
      {/* Decorative Side Capsules */}
      <div 
        className="absolute left-[-60px] md:left-[-40px] top-[10%] md:top-[12%] w-[100px] md:w-[120px] h-[350px] md:h-[480px] border-[1.5px] border-[#E6EDF8] rounded-[50px] md:rounded-[60px] opacity-20 md:opacity-60 pointer-events-none z-0" 
      />
      <div 
        className="absolute right-[-60px] md:right-[-40px] bottom-[10%] md:bottom-[12%] w-[100px] md:w-[120px] h-[350px] md:h-[480px] border-[1.5px] border-[#E6EDF8] rounded-[50px] md:rounded-[60px] opacity-20 md:opacity-60 pointer-events-none z-0" 
      />

      <div className="section-container relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <p className="font-sans text-[0.8125rem] md:text-[0.875rem] font-medium text-[#4d5c7e] mb-2.5">
            CBMaq em dados
          </p>
          <h2 className="font-sans text-[2.25rem] md:text-[2.5rem] lg:text-[2.75rem] leading-[1.15] font-bold text-[#001647] tracking-tight">
            Resultados construídos ao<br />
            longo de mais de seis décadas.
          </h2>
        </div>

        {/* Row 1 — 4 Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 mb-14 px-4 lg:px-0">
          {row1Items.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center text-center group">
              {item.isLogo ? (
                <div className="w-full flex justify-center mb-6 h-[100px] items-center">
                   <Image 
                      src={item.image} 
                      alt={item.alt!} 
                      width={190} 
                      height={90} 
                      className="object-contain"
                   />
                </div>
              ) : (
                <>
                  <div className="mb-5 h-[48px] flex items-center justify-center">
                    <Image 
                       src={item.icon!} 
                       alt="" 
                       width={44} 
                       height={44} 
                       className="object-contain"
                    />
                  </div>
                  <p className="font-sans text-[1.75rem] md:text-[2rem] font-bold text-[#001647] leading-none mb-3 tracking-tight">
                    {item.value}
                  </p>
                  <p className="font-sans text-[0.875rem] md:text-[0.9375rem] font-medium text-[#4d5c7e] leading-[1.4] whitespace-pre-line px-2">
                    {item.label}
                  </p>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Horizontal Divider */}
        <div className="w-[90%] md:w-full mx-auto h-[1px] bg-gradient-to-r from-transparent via-[#E6EDF8] to-transparent md:bg-[#E6EDF8] mb-14 opacity-80" />

        {/* Row 2 — 4 Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 px-4 lg:px-0">
          {row2Items.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center text-center">
              <div className="mb-5 h-[48px] flex items-center justify-center">
                <Image 
                   src={item.icon} 
                   alt="" 
                   width={44} 
                   height={44} 
                   className="object-contain"
                />
              </div>
              <p className="font-sans text-[1.75rem] md:text-[2rem] font-bold text-[#001647] leading-none mb-3 tracking-tight">
                {item.value}
              </p>
              <p className="font-sans text-[0.875rem] md:text-[0.9375rem] font-medium text-[#4d5c7e] leading-[1.4] whitespace-pre-line px-2">
                {item.label}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
