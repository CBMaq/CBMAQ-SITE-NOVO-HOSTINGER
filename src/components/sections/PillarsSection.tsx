import { InteractivePillars } from "./InteractivePillars";

export function PillarsSection() {
  return (
    <section
      id="diferenciais"
      className="relative overflow-hidden"
      style={{ 
        padding: "0",
        background: "linear-gradient(120deg, #001647 0%, #002C8D 100%)"
      }}
      aria-label="Pilares da CBMaq"
    >
      {/* Subtle bottom glow to lift the content - preserved effect */}
      <div 
        className="absolute inset-x-0 bottom-[-20px] h-[400px] opacity-20" 
        style={{
          background: "linear-gradient(to top, #0A4EE4 0%, transparent 100%)"
        }}
      />
      
      <InteractivePillars />
    </section>
  );
}
