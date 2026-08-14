/**
 * Design tokens used in Framer Motion variants and JS-driven styles.
 * CSS tokens live in globals.css — this file bridges them into TS.
 */

export const motion = {
  ease: {
    spring: [0.34, 1.56, 0.64, 1] as const,
    outExpo: [0.16, 1, 0.3, 1] as const,
    inOut: [0.4, 0, 0.2, 1] as const,
  },
  duration: {
    fast: 0.15,
    base: 0.25,
    slow: 0.4,
    slower: 0.6,
  },
};

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: motion.duration.slow, ease: motion.ease.outExpo },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: motion.duration.slow, ease: motion.ease.outExpo },
  },
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: motion.duration.slow, ease: motion.ease.outExpo },
  },
};

export const slideFromRight = {
  hidden: { x: "100%" },
  visible: {
    x: 0,
    transition: { duration: motion.duration.slow, ease: motion.ease.outExpo },
  },
  exit: {
    x: "100%",
    transition: { duration: motion.duration.base, ease: motion.ease.inOut },
  },
};
