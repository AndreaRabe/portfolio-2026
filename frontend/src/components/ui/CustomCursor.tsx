"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const hovered = useMotionValue(0); // 0 = idle, 1 = hovering

  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);

  const trailConfig = { damping: 40, stiffness: 130, mass: 0.9 };
  const trailX = useSpring(cursorX, trailConfig);
  const trailY = useSpring(cursorY, trailConfig);

  // Ring expands and brightens on hover
  const ringSize  = useSpring(useTransform(hovered, [0, 1], [32, 52]), { damping: 22, stiffness: 300 });
  const ringOpacity = useSpring(useTransform(hovered, [0, 1], [0.25, 0.7]), { damping: 22, stiffness: 300 });
  const dotScale  = useSpring(useTransform(hovered, [0, 1], [1, 0]), { damping: 22, stiffness: 300 });

  useEffect(() => {
    document.documentElement.style.cursor = "none";

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const onEnter = (e: MouseEvent) => {
      const el = e.target;
      if (
        el instanceof Element &&
        el.matches("a, button, [role='tab'], [role='button'], input, textarea, select, label")
      ) {
        hovered.set(1);
      }
    };

    const onLeave = (e: MouseEvent) => {
      const el = e.target;
      if (
        el instanceof Element &&
        el.matches("a, button, [role='tab'], [role='button'], input, textarea, select, label")
      ) {
        hovered.set(0);
      }
    };

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseenter", onEnter, true);
    document.addEventListener("mouseleave", onLeave, true);

    return () => {
      document.documentElement.style.cursor = "";
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseenter", onEnter, true);
      document.removeEventListener("mouseleave", onLeave, true);
    };
  }, [cursorX, cursorY, hovered]);

  return (
    <>
      {/* Trail ring */}
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 z-[9998] pointer-events-none mix-blend-screen"
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
          width: ringSize,
          height: ringSize,
        }}
      >
        <motion.div
          className="w-full h-full rounded-full border border-[rgba(0,212,255,1)]"
          style={{ opacity: ringOpacity }}
        />
      </motion.div>

      {/* Dot */}
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-screen"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          scale: dotScale,
        }}
      >
        <div className="w-2 h-2 rounded-full bg-[var(--color-cyan)] shadow-[0_0_10px_rgba(0,212,255,0.9)]" />
      </motion.div>
    </>
  );
}
