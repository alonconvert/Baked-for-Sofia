"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const marqueeItems = [
  "Artisan Sourdough",
  "Brioche Buns",
  "Fresh Pastries",
  "Jerusalem Bagels",
  "Melbourne Made",
  "72hr Fermentation",
  "Gluten Friendly",
  "Locally Sourced",
  "400+ Customers",
  "Est. 2015",
];

function FlourParticle({ index }: { index: number }) {
  const size = 2 + (index % 4);
  const left = `${(index * 13.7) % 100}%`;
  const delay = (index * 1.3) % 10;
  const duration = 6 + (index % 8);

  return (
    <div
      className="absolute rounded-full bg-primary/15 animate-float"
      style={{
        width: size,
        height: size,
        left,
        bottom: "10%",
        ["--delay" as string]: `${delay}s`,
        ["--duration" as string]: `${duration}s`,
      }}
    />
  );
}

export function HomeHero() {
  return (
    <section className="relative min-h-dvh flex flex-col items-center justify-center overflow-hidden">
      {/* Warm textured gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-warm via-cream to-background" />

      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 40%, oklch(0.76 0.15 75 / 0.25), transparent)",
        }}
      />

      {/* Flour particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 20 }, (_, i) => (
          <FlourParticle key={i} index={i} />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center pt-24 pb-32">
        {/* Est badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.25em] uppercase text-primary/80 border border-primary/20 rounded-full px-5 py-2 bg-card/50 backdrop-blur-sm">
            Est. 2015 &middot; Melbourne
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
        >
          <h1 className="font-serif text-6xl sm:text-7xl lg:text-8xl xl:text-9xl tracking-tight text-foreground leading-[0.95]">
            The Art of
            <br />
            <span className="text-primary">Bakery</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="mt-8 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        >
          From slowly fermented artisan sourdough to handcrafted brioche buns,
          pastries, and gluten-free bakes. A family bakery serving Melbourne
          since 2015.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/products"
            className={cn(
              buttonVariants({ size: "lg" }),
              "text-base px-8 h-12 rounded-full"
            )}
          >
            View Our Products
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <Link
            href="/contact"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "text-base px-8 h-12 rounded-full"
            )}
          >
            Get in Touch
          </Link>
        </motion.div>
      </div>

      {/* Elegant marquee ticker */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden border-t border-primary/10 bg-card/40 backdrop-blur-sm">
        <div className="flex animate-marquee whitespace-nowrap py-4">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={i}
              className="mx-4 text-sm font-light tracking-wide text-muted-foreground/50 flex items-center gap-4"
            >
              {item}
              <span className="text-gold/40 text-[8px]">&diams;</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
