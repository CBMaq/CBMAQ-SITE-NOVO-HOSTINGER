import {
  HeroSection,
  EcosystemSection,
  NumbersSection,
  InstitutionalSection,
  PillarsSection,
  SelfServiceSection,
} from "@/components/sections";

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <EcosystemSection />
      <NumbersSection />
      <InstitutionalSection />
      <PillarsSection />
      <SelfServiceSection />
    </div>
  );
}
