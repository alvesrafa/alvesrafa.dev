'use client';

import { useReducedMotion as useFramerReducedMotion } from 'framer-motion';

export function useReducedMotion() {
  return useFramerReducedMotion();
}

export function useAnimationVariants() {
  const shouldReduceMotion = useFramerReducedMotion();

  return {
    fadeIn: {
      initial: shouldReduceMotion ? { opacity: 1 } : { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: shouldReduceMotion ? 0 : 0.5 },
    },
    fadeInUp: {
      initial: shouldReduceMotion
        ? { opacity: 1, y: 0 }
        : { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: shouldReduceMotion ? 0 : 0.5 },
    },
    slideInRight: {
      initial: shouldReduceMotion
        ? { opacity: 1, x: 0 }
        : { opacity: 0, x: 20 },
      animate: { opacity: 1, x: 0 },
      transition: { duration: shouldReduceMotion ? 0 : 0.3 },
    },
    staggerChildren: {
      animate: {
        transition: {
          staggerChildren: shouldReduceMotion ? 0 : 0.1,
        },
      },
    },
    scale: {
      initial: shouldReduceMotion ? { scale: 1 } : { scale: 0.95 },
      animate: { scale: 1 },
      transition: { duration: shouldReduceMotion ? 0 : 0.2 },
    },
  };
}
