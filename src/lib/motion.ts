import { Variants } from "framer-motion";

// Defines the custom easing curve for the CBMaq brand
export const cbmaqEasing: [number, number, number, number] = [0.22, 1, 0.36, 1]; // custom smooth easing

export const rootStaggerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

export const slideUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: cbmaqEasing,
    },
  },
};

export const slideLeftVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 40,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: cbmaqEasing,
    },
  },
};

export const slideRightVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -40,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: cbmaqEasing,
    },
  },
};

export const fadeInVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      duration: 1,
      ease: cbmaqEasing,
    },
  },
};

export const drawLineVariants: Variants = {
  hidden: {
    pathLength: 0,
    opacity: 0,
  },
  show: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
      opacity: { duration: 0.2 },
    },
  },
};
