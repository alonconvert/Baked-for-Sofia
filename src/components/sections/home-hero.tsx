"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const marqueeItems = [
  "Artisan Sourdough",
  "Baked Fresh Daily",
  "Melbourne Made",
  "Over 400 Customers",
  "Brioche Buns",
  "Gluten Friendly",
  "Locally Sourced",
];

export function HomeHero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const glowX = useTransform(mouseX, [0, 1], ["-20%", "20%"]);
  const glowY = useTransform(mouseY, [0, 1], ["-20%", "20%"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  return (
    <section
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at 50% 50%, oklch(0.55 0.15 40 / 0.3), transparent 70%)`,
          x: glowX,
          y: glowY,
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 to-background pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="text-sm font-medium tracking-widest uppercase text-primary mb-4">
            Artisanal Wholesale Craft Bakery
          </p>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-tight">
            The Art of{" "}
            <span className="text-primary">Bakery</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        >
          From slowly fermented artisan sourdough bread to everyday sandwich
          loaves and rolls. We make brioche buns, vegan buns, pastries and
          assorted gluten free bakes.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/products" className={cn(buttonVariants({ size: "lg" }), "text-base px-8")}>
            View Our Products
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <Link href="/contact" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "text-base px-8")}>
            Get in Touch
          </Link>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 overflow-hidden border-t border-border/50 bg-background/50 backdrop-blur-sm">
        <div className="flex animate-marquee whitespace-nowrap py-3">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={i}
              className="mx-6 text-sm font-medium text-muted-foreground/60"
            >
              {item}
              <span className="ml-6 text-primary/40">•</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
