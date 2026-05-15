"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, LucideIcon } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

interface CTAButton {
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: LucideIcon | boolean; // true = ArrowRight, LucideIcon = Custom, undefined = None
  isExternal?: boolean;
}

interface GenericCTASectionProps {
  title: string | ReactNode;
  description: string | ReactNode;
  backgroundImage: string;
  primaryButton: CTAButton;
  secondaryButton?: CTAButton;
  overlayClass?: string; // e.g. "bg-white/40" or "bg-gradient-to-b from-white/40 via-white/60 to-white/40"
}

export function GenericCTASection({
  title,
  description,
  backgroundImage,
  primaryButton,
  secondaryButton,
  overlayClass = "bg-white/40",
}: GenericCTASectionProps) {
  
  const renderButton = (button: CTAButton, isPrimary: boolean) => {
    const Icon = button.icon === true ? ArrowRight : button.icon;
    
    const content = (
      <>
        {button.label}
        {Icon && (
          <Icon 
            className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${isPrimary ? "text-white" : "text-[#0A4EE4]/70"}`} 
            strokeWidth={2.5} 
          />
        )}
      </>
    );

    const baseStyles = `group w-full sm:w-auto h-[3.75rem] px-10 rounded-[8px] flex items-center justify-center gap-3 font-bold text-[1rem] transition-all`;
    const primaryStyles = `${baseStyles} bg-[#0A4EE4] text-white hover:bg-[#083DB4] shadow-xl hover:-translate-y-1`;
    const secondaryStyles = `${baseStyles} bg-transparent border-2 border-[#0A4EE4] text-[#0A4EE4] hover:bg-[#0A4EE4]/5`;

    const className = isPrimary ? primaryStyles : secondaryStyles;

    if (button.onClick) {
      return (
        <button onClick={button.onClick} className={className}>
          {content}
        </button>
      );
    }

    if (button.href) {
      if (button.isExternal || button.href.startsWith("http") || button.href.startsWith("wa.me")) {
        return (
          <a 
            href={button.href} 
            target="_blank" 
            rel="noopener noreferrer" 
            className={className}
          >
            {content}
          </a>
        );
      }
      
      // Internal links or anchors
      if (button.href.startsWith("#")) {
        return (
          <a href={button.href} className={className}>
            {content}
          </a>
        );
      }

      return (
        <Link href={button.href} className={className}>
          {content}
        </Link>
      );
    }

    return null;
  };

  return (
    <section className="relative w-full section-padding flex items-center justify-center overflow-hidden bg-white">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt=""
          fill
          className="object-cover object-center brightness-[0.98]"
          priority
        />
        <div className={`absolute inset-0 ${overlayClass}`} />
      </div>

      <div className="section-container relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-[1240px] mx-auto"
        >
          {/* Main Title - Responsive sizing to ensure consistency */}
          <h2 className="text-[1.875rem] md:text-[2.75rem] lg:text-[3.25rem] font-bold text-[#0A2A5E] tracking-tight leading-[1.15] mb-6 max-w-[1100px] mx-auto whitespace-pre-line">
            {title}
          </h2>
          
          {/* Description - Responsive sizing */}
          <p className="text-[1rem] md:text-[1.125rem] lg:text-[1.25rem] font-medium text-[#4D5C7E] leading-[1.6] max-w-[850px] mx-auto mb-12">
            {description}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 md:gap-6">
            {renderButton(primaryButton, true)}
            {secondaryButton && renderButton(secondaryButton, false)}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
