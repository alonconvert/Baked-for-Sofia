"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Glow opacity increases as user scrolls more
  const glowOpacity = useTransform(scrollYProgress, [0, 0.1, 1], [0, 0.6, 0.8]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 z-50 origin-left"
        style={{
          scaleX,
          background:
            "linear-gradient(to right, oklch(0.76 0.15 75), oklch(0.52 0.14 38))",
        }}
      />
      {/* Glow shadow under the progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-2 z-[49] origin-left pointer-events-none"
        style={{
          scaleX,
          opacity: glowOpacity,
          background:
            "linear-gradient(to right, oklch(0.76 0.15 75 / 0.6), oklch(0.52 0.14 38 / 0.6))",
          filter: "blur(6px)",
        }}
      />
    </>
  );
}
