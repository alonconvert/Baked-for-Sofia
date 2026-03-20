"use client";

import { useState, useEffect, useCallback, useRef, useSyncExternalStore } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";
import { X, ArrowRight, Wheat } from "lucide-react";

interface FloatingPriceOrbProps {
  onOpen: () => void;
  hidden?: boolean;
  offsetBottom?: number;
}

function getServerSnapshot() {
  return false;
}

function subscribeDismissed() {
  return () => {};
}

function getInitialDismissed() {
  try {
    return sessionStorage.getItem("price-orb-dismissed") === "true";
  } catch {
    return false;
  }
}

function getIsDesktop() {
  return window.innerWidth >= 768;
}

function getIsDesktopServer() {
  return false;
}

function subscribeResize(callback: () => void) {
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
}

export function FloatingPriceOrb({
  onOpen,
  hidden = false,
  offsetBottom = 0,
}: FloatingPriceOrbProps) {
  const initialDismissed = useSyncExternalStore(
    subscribeDismissed,
    getInitialDismissed,
    getServerSnapshot
  );
  const [dismissed, setDismissed] = useState(initialDismissed);
  const [isHovered, setIsHovered] = useState(false);
  const isDesktop = useSyncExternalStore(subscribeResize, getIsDesktop, getIsDesktopServer);
  const [mounted, setMounted] = useState(false);

  const orbBaseRef = useRef({ x: 0, y: 0 });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const orbOffsetX = useTransform(mouseX, (latest) => {
    if (!isDesktop) return 0;
    const base = orbBaseRef.current;
    const dx = latest - base.x;
    const dy = mouseY.get() - base.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance > 200 || distance === 0) return 0;
    const strength = (200 - distance) / 200;
    return (dx / distance) * strength * 12;
  });

  const orbOffsetY = useTransform(mouseX, (latest) => {
    if (!isDesktop) return 0;
    const base = orbBaseRef.current;
    const dx = latest - base.x;
    const dy = mouseY.get() - base.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance > 200 || distance === 0) return 0;
    const strength = (200 - distance) / 200;
    return (dy / distance) * strength * 12;
  });

  const springX = useSpring(orbOffsetX, { stiffness: 120, damping: 12 });
  const springY = useSpring(orbOffsetY, { stiffness: 120, damping: 12 });

  useEffect(() => {
    function updateBase() {
      orbBaseRef.current = {
        x: window.innerWidth - 64,
        y: window.innerHeight - 64 - offsetBottom,
      };
    }
    updateBase();
    window.addEventListener("resize", updateBase);
    return () => window.removeEventListener("resize", updateBase);
  }, [offsetBottom]);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    },
    [mouseX, mouseY]
  );

  useEffect(() => {
    if (!isDesktop) return;
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isDesktop, handleMouseMove]);

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    sessionStorage.setItem("price-orb-dismissed", "true");
    setDismissed(true);
  };

  const isVisible = mounted && !hidden && !dismissed;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: 100, opacity: 0, scale: 0.5 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          exit={{ x: 100, opacity: 0, scale: 0.5 }}
          transition={{ type: "spring", stiffness: 180, damping: 18 }}
          style={{
            position: "fixed",
            bottom: `${36 + offsetBottom}px`,
            right: "36px",
            zIndex: 45,
            x: springX,
            y: springY,
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={onOpen}
          className="cursor-pointer group"
        >
          {/* Outer glow ring */}
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{
              scale: isHovered ? 1 : [1, 1.3, 1],
              opacity: isHovered ? 0 : [0.3, 0, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              background: "radial-gradient(circle, oklch(0.76 0.15 75 / 0.4), transparent 70%)",
            }}
          />

          {/* Second pulse ring */}
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{
              scale: isHovered ? 1 : [1, 1.5, 1],
              opacity: isHovered ? 0 : [0.15, 0, 0.15],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
            style={{
              background: "radial-gradient(circle, oklch(0.52 0.14 38 / 0.3), transparent 70%)",
            }}
          />

          {/* Dismiss button */}
          <AnimatePresence>
            {isHovered && (
              <motion.button
                initial={{ opacity: 0, scale: 0.3 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.3 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                onClick={handleDismiss}
                className="absolute -top-2 -right-2 z-20 flex h-6 w-6 items-center justify-center rounded-full bg-espresso text-primary-foreground shadow-md hover:scale-110 transition-transform"
                aria-label="Dismiss"
              >
                <X className="h-3 w-3" />
              </motion.button>
            )}
          </AnimatePresence>

          {/* Main orb body */}
          <motion.div
            layout
            className="relative flex items-center justify-center overflow-hidden"
            animate={{
              width: isHovered ? 220 : 64,
              height: 64,
              borderRadius: 32,
              scale: isHovered ? 1 : [1, 1.05, 1],
            }}
            transition={
              isHovered
                ? { type: "spring", stiffness: 280, damping: 22 }
                : {
                    scale: {
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  }
            }
            style={{
              boxShadow: isHovered
                ? "0 8px 32px oklch(0.52 0.14 38 / 0.35), 0 4px 16px oklch(0.76 0.15 75 / 0.25), inset 0 1px 1px oklch(1 0 0 / 0.1)"
                : "0 4px 20px oklch(0.52 0.14 38 / 0.25), 0 2px 8px oklch(0.76 0.15 75 / 0.15)",
            }}
          >
            {/* Animated rotating gradient border */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "conic-gradient(from var(--orb-angle, 0deg), oklch(0.76 0.15 75), oklch(0.52 0.14 38), oklch(0.76 0.15 75), oklch(0.65 0.08 155 / 0.5), oklch(0.76 0.15 75))",
                animation: "orbRotate 6s linear infinite",
              }}
            />

            {/* Inner fill */}
            <div className="absolute inset-[2.5px] rounded-full bg-gradient-to-br from-espresso via-espresso/95 to-espresso/90" />

            {/* Subtle inner light */}
            <div
              className="absolute inset-[2.5px] rounded-full opacity-40"
              style={{
                background:
                  "radial-gradient(ellipse at 30% 30%, oklch(0.76 0.15 75 / 0.5), transparent 60%)",
              }}
            />

            {/* Content */}
            <div className="relative z-10 flex items-center gap-2.5 px-5">
              <AnimatePresence mode="wait">
                {isHovered ? (
                  <motion.span
                    key="text"
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{ delay: 0.05, duration: 0.2 }}
                    className="whitespace-nowrap text-sm font-semibold text-primary-foreground flex items-center gap-2"
                  >
                    Get Price List
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <ArrowRight className="h-4 w-4" />
                    </motion.span>
                  </motion.span>
                ) : (
                  <motion.span
                    key="icon"
                    initial={{ opacity: 0, rotate: -30 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 30 }}
                    transition={{ duration: 0.2 }}
                    className="text-gold"
                  >
                    <Wheat className="h-6 w-6" />
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
