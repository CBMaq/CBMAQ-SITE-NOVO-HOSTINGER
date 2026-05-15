import Link from "next/link";
import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left side Form */}
      <div className="flex flex-col justify-center items-center p-8 bg-background relative z-10">
        <Link href="/" className="absolute top-8 left-8">
          <Image 
            src="https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/logo-cbmaq.png"
            alt="CBMaq Logo"
            width={140}
            height={40}
            className="object-contain"
          />
        </Link>
        <div className="w-full max-w-sm">
          {children}
        </div>
      </div>
      
      {/* Right side Cover */}
      <div className="hidden lg:flex flex-col justify-between p-12 relative overflow-hidden bg-muted/20">
        {/* Background Image with slight scale for premium feel */}
        <div className="absolute inset-0 bg-[url('https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/seja-um-revendedor-hero-bg-img.webp')] bg-cover bg-center transition-transform duration-[10s] hover:scale-105"></div>
        
        {/* Overlays for UX/Typography Contrast */}
        {/* 1. Subtle Mix Blend to integrate with the light theme */}
        <div className="absolute inset-0 bg-background/10 mix-blend-overlay"></div>
        {/* 2. Content Gradient: Ensures the text at the bottom is perfectly readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent"></div>
        
        <div className="relative z-10 mt-auto max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest mb-4">
            CBMaq Ecossistema
          </div>
          <h2 className="text-5xl font-serif font-bold mb-6 text-foreground leading-[1.1] tracking-tight">
            Liderando soluções integradas em importação e logística.
          </h2>
          <div className="h-1 w-20 bg-primary/20 rounded-full mb-6"></div>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Conectando o Brasil ao mundo com excelência operacional e gestão ponta a ponta.
          </p>
        </div>
      </div>
    </div>
  );
}
