import { PublicNavbar } from "@/components/layout/PublicNavbar";
import { FooterSection } from "@/components/sections";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import Script from "next/script";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <PublicNavbar />
      <main className="flex-1 pt-[72px]">
        {children}
      </main>
      <FooterSection />
      <WhatsAppButton />
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=AW-18263164157"
        strategy="afterInteractive"
      />
      <Script id="google-tag-manager" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-18263164157');
        `}
      </Script>
    </div>
  );
}
