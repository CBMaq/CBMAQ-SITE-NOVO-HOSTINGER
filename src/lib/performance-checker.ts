/**
 * Performance Checker
 * 
 * Detects hardware capabilities and runtime rendering budget to determine
 * if the device should use optimized visual assets.
 */

export interface PerformanceStats {
  isLowPerformance: boolean;
  reason: string;
}

const STORAGE_KEY = "cbmaq_performance_mode";

export const checkPerformance = async (): Promise<PerformanceStats> => {
  // 1. Check if we already have a cached result for this session
  if (typeof window === "undefined") return { isLowPerformance: false, reason: "ssr" };
  
  const cached = sessionStorage.getItem(STORAGE_KEY);
  if (cached) {
    return JSON.parse(cached);
  }

  // 2. Hardware Heuristics (Immediate)
  const logicalProcessors = navigator.hardwareConcurrency || 4;
  // @ts-expect-error - deviceMemory is not in all type definitions
  const ram = navigator.deviceMemory || 8; 

  // Detect Mobile Devices
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                   (navigator.maxTouchPoints > 0);

  // Fast-track: Mobile or weak hardware
  // Mobile browsers generally struggle with 32+ SVG paths with blur filters
  if (isMobile || logicalProcessors < 4 || ram < 4) {
    const result = { 
        isLowPerformance: true, 
        reason: isMobile ? "mobile" : `hardware: ${logicalProcessors} cores, ${ram}GB RAM` 
    };
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(result));
    return result;
  }

  // 3. Runtime FPS Check (Brief test - 1200ms)
  // Wait for 2 seconds before starting the test to bypass hydration/initial load spikes
  return new Promise((resolve) => {
    setTimeout(() => {
        let frames = 0;
        const startTime = performance.now();
        
        const checkFrame = (currentTime: number) => {
          frames++;
          const elapsed = currentTime - startTime;
          
          if (elapsed < 1200) { // Slightly longer test for better average
            requestAnimationFrame(checkFrame);
          } else {
            const fps = Math.round((frames * 1000) / elapsed);
            
            // Threshold: If stabilized rendering drops below 35 FPS, it's a weak environment.
            // Modern powerful PCs should easily hold 60 FPS after hydration.
            const isLow = fps < 35;
            const result = { 
              isLowPerformance: isLow, 
              reason: `fps: ${fps} (${logicalProcessors} cores, ${ram}GB RAM)` 
            };
            
            if (!isLow) {
                console.log(`[Performance] High performance detected: ${fps} FPS. (Hardware: ${logicalProcessors} cores, ${ram}GB RAM)`);
            }

            sessionStorage.setItem(STORAGE_KEY, JSON.stringify(result));
            resolve(result);
          }
        };
        
        requestAnimationFrame(checkFrame);
    }, 2000); // 2s Grace period
  });
};
