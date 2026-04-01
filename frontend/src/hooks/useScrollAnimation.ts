"use client";

import { useInView, type Transition } from "framer-motion";
import { useRef } from "react";

/** Typed bezier easing for expo-out feel */
export const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Shared transition helper */
export function t(delay = 0): Transition {
  return { duration: 0.6, ease: EASE_OUT_EXPO, delay };
}

type UseScrollAnimationOptions = {
  threshold?: number;
  once?: boolean;
};

/**
 * Returns a ref and a boolean indicating if the element is in view.
 * Used to trigger Framer Motion variants on scroll.
 */
export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(
  options: UseScrollAnimationOptions = {}
) {
  const { threshold = 0.15, once = true } = options;
  const ref = useRef<T>(null);
  const isInView = useInView(ref, { amount: threshold, once });
  return { ref, isInView };
}

/** Reusable Framer Motion variants for fade-up entries */
export const fadeUpVariants = {
  hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

export const staggerContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};
