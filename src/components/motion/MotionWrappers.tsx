"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import {
  fadeInVariants,
  rootStaggerVariants,
  slideUpVariants,
  drawLineVariants,
} from "@/lib/motion";

interface MotionWrapperProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  once?: boolean;
}

export function FadeIn({ children, className, style, once = true }: MotionWrapperProps) {
  return (
    <motion.div
      variants={fadeInVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-10%" }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

export function SlideUp({ children, className, style, delay, once = true }: MotionWrapperProps) {
  return (
    <motion.div
      variants={slideUpVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-10%" }}
      className={className}
      style={style}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({ children, className, style, once = true }: MotionWrapperProps) {
  return (
    <motion.div
      variants={rootStaggerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-10%" }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className, style }: MotionWrapperProps & { delay?: never; once?: never }) {
  // Stagger items inherit the "hidden" and "show" keys from StaggerContainer
  return (
    <motion.div variants={slideUpVariants} className={className} style={style}>
      {children}
    </motion.div>
  );
}

interface AnimatedLineProps {
  className?: string;
  color?: string;
  width?: string | number;
  height?: string | number;
}

export function AnimatedLine({
  className,
  color = "#60A5FA",
  width = 40,
  height = 2,
}: AnimatedLineProps) {
  return (
    <div className={className} style={{ width, height }}>
      <motion.svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${typeof width === 'number' ? width : 40} ${typeof height === 'number' ? height : 2}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10%" }}
      >
        <motion.line
          x1="0"
          y1={typeof height === 'number' ? height / 2 : 1}
          x2="100%"
          y2={typeof height === 'number' ? height / 2 : 1}
          stroke={color}
          strokeWidth={height}
          variants={drawLineVariants}
        />
      </motion.svg>
    </div>
  );
}
