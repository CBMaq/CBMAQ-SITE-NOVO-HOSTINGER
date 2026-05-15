"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { checkPerformance } from "@/lib/performance-checker";

interface PerformanceContextType {
  isLowPerformance: boolean;
  isDetecting: boolean;
}

const PerformanceContext = createContext<PerformanceContextType>({
  isLowPerformance: false,
  isDetecting: true,
});

export const usePerformance = () => useContext(PerformanceContext);

export function PerformanceProvider({ children }: { children: React.ReactNode }) {
  const [isLowPerformance, setIsLowPerformance] = useState(false);
  const [isDetecting, setIsDetecting] = useState(true);

  useEffect(() => {
    const runCheck = async () => {
      try {
        const stats = await checkPerformance();
        setIsLowPerformance(stats.isLowPerformance);
        
        // Log for developer awareness (invisible to end users)
        if (stats.isLowPerformance) {
          console.log(`[Performance] Low performance mode activated. Reason: ${stats.reason}`);
        }
      } catch (error) {
        console.error("[Performance] Error detecting hardware capabilities:", error);
      } finally {
        setIsDetecting(false);
      }
    };

    runCheck();
  }, []);

  return (
    <PerformanceContext.Provider value={{ isLowPerformance, isDetecting }}>
      {children}
    </PerformanceContext.Provider>
  );
}
