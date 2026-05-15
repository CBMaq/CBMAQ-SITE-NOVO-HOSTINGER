"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import { usePerformance } from "@/components/providers/PerformanceProvider";

const VIEWBOX_W = 1440;
const VIEWBOX_H = 400; 
const POINTS_PER_LINE = 60; 

const generateSeamlessPath = (points: { x: number; y: number }[]) => {
  if (points.length === 0) return "";
  const round = (val: number) => Math.round(val * 10) / 10;
  const cycle1 = points.map(p => `L ${round(p.x)} ${round(p.y)}`).join(" ");
  const cycle2 = points.map(p => `L ${round(p.x + VIEWBOX_W)} ${round(p.y)}`).join(" ");
  return `M ${round(points[0].x)} ${round(points[0].y)} ${cycle1} ${cycle2}`;
};

export function ConsorcioEnergyVisual() {
    const { isLowPerformance } = usePerformance();

    // We create a "trail" effect using multiple offset layers of the same cohesive wave
    const lines = useMemo(() => {
        const lineCount = isLowPerformance ? 2 : 8;
        return Array.from({ length: lineCount }).map((_, lineIdx) => {
            return Array.from({ length: POINTS_PER_LINE }, (_, i) => {
                const p = i / (POINTS_PER_LINE - 1);
                // Unified frequency for a cohesive "trail" look
                const freq = 1.0 * (Math.PI * 2);
                
                // Positioned low in the section
                const yBase = 280 + (lineIdx * 4); 
                const amp = 35 + (Math.sin(lineIdx * 0.2) * 5);
                const phase = p * freq + (lineIdx * 0.1); // Small offsets for the trail effect
                const y = yBase + Math.sin(phase) * amp;
                
                if (i === POINTS_PER_LINE - 1) {
                    return { x: p * VIEWBOX_W, y: yBase + Math.sin(lineIdx * 0.1) * amp };
                }
                return { x: p * VIEWBOX_W, y };
            });
        });
    }, []);

    return (
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden select-none">
            {/* Base Shadow for the wave area */}
            <div className="absolute bottom-0 w-full h-[300px] bg-gradient-to-t from-[#00D1FF]/5 via-transparent to-transparent" />
            
            <svg
                viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
                className="w-full h-full preserve-3d scale-[1.1] translate-y-32"
                preserveAspectRatio="none"
            >
                <defs>
                   <filter id="energyGlow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                   </filter>
                </defs>

                <motion.g
                    animate={isLowPerformance ? {} : { x: [0, -VIEWBOX_W] }}
                    transition={{
                        duration: 35,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                >
                    {lines.map((points, idx) => {
                        const isCore = idx === 0 || idx === 7;
                        return (
                            <motion.path
                                key={`energy-trail-${idx}`}
                                d={generateSeamlessPath(points)}
                                stroke="#00D1FF"
                                strokeWidth={isCore ? 1.5 : 0.8}
                                strokeOpacity={0.1 + (idx / 8) * 0.3}
                                strokeLinecap="round"
                                fill="none"
                                filter={isLowPerformance ? undefined : "url(#energyGlow)"}
                                animate={isLowPerformance ? {} : {
                                    y: [0, -10, 0]
                                }}
                                transition={{
                                    y: {
                                        duration: 6 + (idx * 0.2),
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }
                                }}
                            />
                        );
                    })}
                </motion.g>
            </svg>
        </div>
    );
}
