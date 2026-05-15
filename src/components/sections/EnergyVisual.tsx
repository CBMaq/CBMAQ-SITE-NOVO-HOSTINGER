"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import { usePerformance } from "@/components/providers/PerformanceProvider";

interface EnergyVisualProps {
  activeIndex: number | null;
}

// Global Consts
const VIEWBOX_W = 1440;
const VIEWBOX_H = 400; 
const POINTS_PER_LINE = 85; 
const TWO_PI = Math.PI * 2;
const DEFAULT_LINE_COUNT = 16;

const generateSeamlessPath = (points: { x: number; y: number }[]) => {
  if (points.length === 0) return "";
  const round = (val: number) => Math.round(val * 10) / 10;
  const cycle1 = points.map(p => `L ${round(p.x)} ${round(p.y)}`).join(" ");
  const cycle2 = points.map(p => `L ${round(p.x + VIEWBOX_W)} ${round(p.y)}`).join(" ");
  return `M ${round(points[0].x)} ${round(points[0].y)} ${cycle1} ${cycle2}`;
};

const createPoints = (fn: (p: number, lineIdx: number, arg?: any) => number, pointsPerLine: number) => {
  return (lineIdx: number, arg?: any) => {
    return Array.from({ length: pointsPerLine }, (_, i) => {
      const p = i / (pointsPerLine - 1);
      if (i === pointsPerLine - 1) {
          return { x: p * VIEWBOX_W, y: fn(0, lineIdx, arg) };
      }
      return { x: p * VIEWBOX_W, y: fn(p, lineIdx, arg) };
    });
  };
};

const getInfinityHelixPoints = (pointsPerLine: number, totalLines: number) => createPoints((p, lineIdx, isMobile) => {
    const isGroupA = lineIdx < (totalLines / 2);
    const cycles = isMobile ? 4 : 2; 
    const freq = cycles * TWO_PI;
    const amp = isMobile ? 40 : 50; 
    const offset = isGroupA ? 0 : Math.PI;
    const phase = p * freq + offset;
    const centerLine = 220 + (lineIdx % (totalLines / 2)) * (32 / totalLines) * 1.5;
    return centerLine + Math.sin(phase) * amp;
}, pointsPerLine);

const PATTERN_GETTERS = [
    (ppl: number) => createPoints((p, lineIdx) => {
        const freq = 2 * TWO_PI;
        const hillAmp = 20;
        const isoDepth = lineIdx * 4;
        const slope = Math.sin(p * freq) * hillAmp;
        return 300 - isoDepth + slope;
    }, ppl),
    (ppl: number) => createPoints((p, lineIdx) => {
        const centerY = 240;
        const cycles = 6; 
        const freq = cycles * TWO_PI;
        const facet = lineIdx % 4;
        const lineInFacet = Math.floor(lineIdx / 4);
        const size = 30 + (lineInFacet * 3);
        const rotTime = p * freq; 
        let yOffset = 0;
        if (facet === 0) yOffset = Math.sin(rotTime) * size;
        if (facet === 1) yOffset = Math.cos(rotTime) * size;
        if (facet === 2) yOffset = -Math.sin(rotTime) * size;
        if (facet === 3) yOffset = -Math.cos(rotTime) * size;
        const intensity = Math.pow(Math.sin(p * Math.PI * cycles), 2);
        return centerY + (yOffset * intensity) + (lineInFacet * 2);
    }, ppl),
    (ppl: number) => createPoints((p, lineIdx) => {
        const baseline = 360;
        const numBars = 12; 
        const barIdx = Math.floor(p * numBars);
        const targetHeight = (barIdx / (numBars - 1)) * 140; 
        const isMajor = lineIdx % 8 === 0;
        if (isMajor) {
            const trend = Math.pow(p, 1.5) * 180;
            return (baseline - trend) - 20;
        }
        return baseline - targetHeight + (lineIdx * 0.4);
    }, ppl),
    (ppl: number, tl: number) => getInfinityHelixPoints(ppl, tl)
];

export function EnergyVisual({ activeIndex }: EnergyVisualProps) {
    const [isMobile, setIsMobile] = useState(false);
    const [mounted, setMounted] = useState(false);

    const { isLowPerformance } = usePerformance();

    useEffect(() => {
        setMounted(true);
        const checkMobile = () => setIsMobile(window.innerWidth < 1024); // Sync with InteractivePillars breakpoint
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const isOrdered = activeIndex !== null;
    const lineCount = isLowPerformance ? 8 : DEFAULT_LINE_COUNT; 
    const pointsPerLine = isLowPerformance ? 35 : POINTS_PER_LINE;

    const lines = useMemo(() => {
        const totalLinesNeeded = lineCount;
        return Array.from({ length: totalLinesNeeded }).map((_, idx) => {
            if (isOrdered && activeIndex !== null) {
                const getterWrapper = PATTERN_GETTERS[activeIndex];
                const getter = typeof getterWrapper === 'function' ? (getterWrapper as any)(pointsPerLine, totalLinesNeeded) : getterWrapper;
                return (getter as any)(idx, isMobile);
            }
            return createPoints((p, lineIdx) => {
                const freq = 2 * TWO_PI;
                const amp = 15 + (Math.sin(lineIdx * 0.4) * 8);
                const phase = p * freq + (lineIdx * 0.5);
                return 300 + Math.sin(phase) * amp + (lineIdx * 0.4); 
            }, pointsPerLine)(idx);
        });
    }, [isOrdered, activeIndex, isMobile, isLowPerformance, pointsPerLine]);

    if (!mounted) return null;

    return (
        <div className="absolute inset-x-0 bottom-[-20px] h-[240px] md:h-[400px] pointer-events-none z-0 overflow-hidden select-none">
            <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-[#05132B] via-transparent to-transparent opacity-95" />
            
            <svg
                viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
                className="w-full h-full preserve-3d transform -translate-y-20"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <filter id="energyBloom" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="1.5" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>

                {/* Sincronização Perfect: Drift em grupo resetado a cada seleção */}
                <motion.g
                    animate={isLowPerformance ? {} : { x: [0, -VIEWBOX_W] }}
                    transition={{
                        duration: 22,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                >
                    {lines.map((points, idx) => {
                        const isMajor = idx % 4 === 0;
                        return (
                            <motion.path
                                key={`energy-line-${idx}`}
                                initial={false}
                                animate={{
                                    d: generateSeamlessPath(points),
                                    strokeOpacity: isOrdered 
                                        ? (isMajor ? 0.8 : 0.25) 
                                        : (0.15 + (idx / 32) * 0.45),
                                    strokeWidth: isMajor ? 1.6 : 1,
                                    y: !isOrdered ? [0, -12, 0] : [0, -4, 0]
                                }}
                                transition={{
                                    d: { duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: idx * 0.015 },
                                    y: {
                                        duration: 4 + (idx * 0.2),
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    },
                                    strokeOpacity: { duration: 1 }
                                }}
                                fill="none"
                                stroke={isMajor ? "#93C5FD" : "#60A5FA"}
                                filter={isLowPerformance ? undefined : "url(#energyBloom)"}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        );
                    })}
                </motion.g>

                {Array.from({ length: 6 }).map((_, i) => (
                     <motion.circle
                        key={`particle-${i}`}
                        r={1}
                        fill="#FFFFFF"
                        initial={{ opacity: 0 }}
                        animate={{ 
                            opacity: [0, 0.45, 0],
                            x: [Math.random() * VIEWBOX_W, Math.random() * VIEWBOX_W + 150],
                            y: [380, 200, 100]
                        }}
                        transition={{ duration: 8 + i, repeat: Infinity, ease: "linear", delay: i * 0.5 }}
                        className="opacity-15"
                     />
                ))}
            </svg>
        </div>
    );
}
