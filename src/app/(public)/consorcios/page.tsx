import { ConsorcioHero } from "@/components/sections/consorcios/ConsorcioHero";
import { ConsorcioStats } from "@/components/sections/consorcios/ConsorcioStats";
import { CredenciaisSection } from "@/components/sections/consorcios/CredenciaisSection";
import { WhyChooseConsorcio } from "@/components/sections/consorcios/WhyChooseConsorcio";
import { CTAEconomia } from "@/components/sections/consorcios/CTAEconomia";
import { PlanSelector } from "@/components/sections/consorcios/PlanSelector";
import { HowItWorks } from "@/components/sections/consorcios/HowItWorks";
import { ConsorcioDigital } from "@/components/sections/consorcios/ConsorcioDigital";
import { FAQSection } from "@/components/sections/consorcios/FAQSection";

export const metadata = {
  title: "Consórcios CBMaq | Realize seu sonho com economia",
  description: "O consórcio CBMaq é a forma mais inteligente e econômica de adquirir suas máquinas e caminhões, com taxas reduzidas e planos flexíveis.",
};

export default function ConsorciosPage() {
  return (
    <>
      <ConsorcioHero />
      <ConsorcioStats />
      <CredenciaisSection />
      <WhyChooseConsorcio />
      <CTAEconomia />
      
      <div id="simulador">
        <PlanSelector />
      </div>
      
      <HowItWorks />
      <ConsorcioDigital />
      <FAQSection />
    </>
  );
}
