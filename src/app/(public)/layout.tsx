import { PublicNavbar } from "@/components/layout/PublicNavbar";
import { FooterSection } from "@/components/sections";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <PublicNavbar />
      <main className="flex-1 pt-[72px]">
        {children}
      </main>
      <FooterSection />
      <WhatsAppButton />
    </div>
  );
}
