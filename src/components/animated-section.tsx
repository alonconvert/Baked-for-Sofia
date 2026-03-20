"use client";

import { motion, type Transition } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right" | "scale" | "rotate" | "flip";
  delay?: number;
  className?: string;
  easing?: "easeOut" | "easeInOut" | "spring" | "anticipate";
}

const directionOffsets: Record<string, Record<string, number>> = {
  up: { y: 40, x: 0 },
  down: { y: -40, x: 0 },
  left: { x: 40, y: 0 },
  right: { x: -40, y: 0 },
  scale: { x: 0, y: 0 },
  rotate: { x: 0, y: 0 },
  flip: { x: 0, y: 0 },
};

const initialStyles: Record<string, Record<string, number>> = {
  scale: { scale: 0.85 },
  rotate: { rotate: -8, scale: 0.95 },
  flip: { rotateX: 90, scale: 0.9 },
};

function getTransition(easing: string, delay: number): Transition {
  if (easing === "spring") {
    return { type: "spring", stiffness: 200, damping: 20, delay };
  }
  if (easing === "anticipate") {
    return { duration: 0.6, delay, ease: [0.36, 0, 0.66, -0.56] as [number, number, number, number] };
  }
  if (easing === "easeInOut") {
    return { duration: 0.6, delay, ease: "easeInOut" as const };
  }
  return { duration: 0.6, delay, ease: "easeOut" as const };
}

export function AnimatedSection({
  children,
  direction = "up",
  delay = 0,
  className,
  easing = "easeOut",
}: AnimatedSectionProps) {
  const offset = directionOffsets[direction] || directionOffsets.up;
  const extraInitial = initialStyles[direction] || {};
  const transition = getTransition(easing, delay);

  return (
    <motion.div
      initial={{ opacity: 0, ...offset, ...extraInitial }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={transition}
      className={className}
    >
      {children}
    </motion.div>
  );
}
