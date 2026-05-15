import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { AlertProvider } from "@/components/providers/AlertProvider";
import { PerformanceProvider } from "@/components/providers/PerformanceProvider";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

import { Inter } from "next/font/google";
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});



export const metadata: Metadata = {
  title: "CBMaq | Gestão Completa de Importação e Operação Ponta a Ponta",
  description:
    "Há mais de 60 anos liderando soluções integradas em importação, logística e gestão de frotas. 11 soluções para sua operação não parar.",
  icons: {
    icon: "https://mfwdxbpejpkyvawaypnj.supabase.co/storage/v1/object/public/service_images/favicon.png",
  },
  keywords: [
    "CBMaq",
    "importação",
    "logística",
    "gestão de frotas",
    "soluções integradas",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={cn(plusJakarta.variable, inter.variable)}
      suppressHydrationWarning
    >
      <body
        suppressHydrationWarning
        className={cn("font-sans antialiased min-h-screen bg-background text-foreground flex flex-col", plusJakarta.className)}
      >
        <ThemeProvider>
          <PerformanceProvider>
            <AlertProvider>
              {children}
              <Toaster position="top-right" richColors />
            </AlertProvider>
          </PerformanceProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
