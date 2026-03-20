"use client";

import { useState, useEffect, useCallback, useRef, useSyncExternalStore } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";
import { X, ArrowRight } from "lucide-react";

interface FloatingPriceOrbProps {
  onOpen: () => void;
  hidden?: boolean;
  offsetBottom?: number;
}

// Determine initial dismissed state from sessionStorage (read once, no subscription needed)
function getServerSnapshot() {
  return false;
}

function subscribeDismissed() {
  // sessionStorage doesn't fire events, so we never re-subscribe
  return () => {};
}

function getInitialDismissed() {
  try {
    return sessionStorage.getItem("price-orb-dismissed") === "true";
  } catch {
    return false;
  }
}

// Check if desktop
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

  // Use a ref for orb base position to avoid reading window during render on server
  const orbBaseRef = useRef({ x: 0, y: 0 });

  // Mouse position tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Calculate distance-based offset
  const orbOffsetX = useTransform(mouseX, (latest) => {
    if (!isDesktop) return 0;
    const base = orbBaseRef.current;
    const dx = latest - base.x;
    const dy = mouseY.get() - base.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance > 200 || distance === 0) return 0;
    const strength = (200 - distance) / 200;
    return (dx / distance) * strength * 10;
  });

  const orbOffsetY = useTransform(mouseX, (latest) => {
    if (!isDesktop) return 0;
    const base = orbBaseRef.current;
    const dx = latest - base.x;
    const dy = mouseY.get() - base.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance > 200 || distance === 0) return 0;
    const strength = (200 - distance) / 200;
    return (dy / distance) * strength * 10;
  });

  const springX = useSpring(orbOffsetX, { stiffness: 150, damping: 15 });
  const springY = useSpring(orbOffsetY, { stiffness: 150, damping: 15 });

  // Update orb base position on resize / offsetBottom change
  useEffect(() => {
    function updateBase() {
      orbBaseRef.current = {
        x: window.innerWidth - 60,
        y: window.innerHeight - 60 - offsetBottom,
      };
    }
    updateBase();
    window.addEventListener("resize", updateBase);
    return () => window.removeEventListener("resize", updateBase);
  }, [offsetBottom]);

  // Delayed entrance
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 2000);
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
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          style={{
            position: "fixed",
            bottom: `${32 + offsetBottom}px`,
            right: "32px",
            zIndex: 45,
            x: springX,
            y: springY,
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={onOpen}
          className="cursor-pointer"
        >
          {/* Dismiss button */}
          <AnimatePresence>
            {isHovered && (
              <motion.button
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.15 }}
                onClick={handleDismiss}
                className="absolute -top-2 -right-2 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-foreground/80 text-background hover:bg-foreground transition-colors"
                aria-label="Dismiss price orb"
              >
                <X className="h-3 w-3" />
              </motion.button>
            )}
          </AnimatePresence>

          {/* Main orb */}
          <motion.div
            layout
            className="relative flex items-center justify-center overflow-hidden shadow-lg shadow-primary/20"
            animate={{
              width: isHovered ? 200 : 56,
              height: 56,
              borderRadius: isHovered ? 28 : 28,
              scale: isHovered ? 1 : [1, 1.06, 1],
            }}
            transition={
              isHovered
                ? { type: "spring", stiffness: 300, damping: 25 }
                : {
                    scale: {
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  }
            }
          >
            {/* Animated gradient background */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "conic-gradient(from var(--orb-angle, 0deg), oklch(0.52 0.14 38), oklch(0.76 0.15 75), oklch(0.52 0.14 38))",
                animation: "orbRotate 4s linear infinite",
              }}
            />

            {/* Inner glow overlay */}
            <div className="absolute inset-[2px] rounded-full bg-gradient-to-br from-primary/90 to-gold/90" />

            {/* Content */}
            <div className="relative z-10 flex items-center gap-2 px-4">
              <AnimatePresence mode="wait">
                {isHovered ? (
                  <motion.span
                    key="text"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.1, duration: 0.2 }}
                    className="whitespace-nowrap text-sm font-semibold text-primary-foreground flex items-center gap-1.5"
                  >
                    Get Price List
                    <ArrowRight className="h-4 w-4" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="icon"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-lg text-primary-foreground"
                  >
                    $
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
