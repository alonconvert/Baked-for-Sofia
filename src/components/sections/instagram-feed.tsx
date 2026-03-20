"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/animated-section";
import { Instagram, Heart, Wheat } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const galleryImages = [
  { src: "/images/products/croissant.webp", alt: "Freshly baked croissant", span: "tall" },
  { src: "/images/products/white-sourdough.webp", alt: "Artisan white sourdough", span: "normal" },
  { src: "/images/products/brioche-bun.webp", alt: "Golden brioche bun", span: "normal" },
  { src: "/images/products/chocolate-babka.webp", alt: "Chocolate babka", span: "tall" },
  { src: "/images/products/jerusalem-bagel-seeds.webp", alt: "Jerusalem bagel with seeds", span: "normal" },
  { src: "/images/products/basque-cheesecake.webp", alt: "Basque cheesecake", span: "normal" },
  { src: "/images/products/challah.webp", alt: "Traditional challah bread", span: "tall" },
  { src: "/images/products/olive-baguette.webp", alt: "Olive baguette", span: "normal" },
  { src: "/images/homepage/bakery-bread.webp", alt: "Fresh bakery bread display", span: "normal" },
  { src: "/images/homepage/dov-founder.webp", alt: "Dov, founder of Baked for Sofia", span: "tall" },
] as const;

function GalleryCard({
  image,
  index,
}: {
  image: (typeof galleryImages)[number];
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const isTall = image.span === "tall";

  // Cascading diagonal pattern: row + col offset
  const col = index % 4;
  const row = Math.floor(index / 4);
  const diagonalDelay = (row + col) * 0.08;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.6,
        delay: diagonalDelay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={cn(
        "relative",
        isTall ? "row-span-2" : "row-span-1"
      )}
    >
      <Link
        href="https://www.instagram.com/bakedforsofia/"
        target="_blank"
        rel="noopener noreferrer"
        className="block relative w-full h-full min-h-[180px] rounded-xl overflow-hidden group cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(max-width: 640px) 75vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Warm vignette overlay — always visible, lightens on hover */}
        <div
          className={cn(
            "absolute inset-0 transition-opacity duration-500 pointer-events-none",
            isHovered ? "opacity-30" : "opacity-60"
          )}
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 40%, oklch(0.25 0.04 45 / 0.6) 100%)",
          }}
        />

        {/* Golden glow border on hover */}
        <div
          className={cn(
            "absolute inset-0 rounded-xl transition-all duration-500 pointer-events-none",
            isHovered
              ? "ring-2 ring-gold/50 shadow-[0_0_20px_oklch(0.76_0.15_75_/_0.25)]"
              : "ring-1 ring-border/20"
          )}
        />

        {/* Instagram icon — fades in on hover at bottom-left */}
        <motion.div
          initial={false}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 6 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-3 left-3 z-10"
        >
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-espresso/60 backdrop-blur-sm">
            <Instagram className="h-3.5 w-3.5 text-white/90" />
            <Heart className="h-3 w-3 text-white/70 fill-white/50" />
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

export function InstagramFeed() {
  return (
    <section className="py-24 sm:py-32 relative overflow-hidden">
      {/* Warm cream background with subtle gold radial glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-cream via-warm/30 to-cream" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 55%, oklch(0.76 0.15 75 / 0.08), transparent)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Decorative gold rule with wheat icon */}
        <AnimatedSection className="flex items-center justify-center gap-4 mb-10">
          <div className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-transparent to-gold/40" />
          <div className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center bg-cream">
            <Wheat className="h-5 w-5 text-gold" />
          </div>
          <div className="h-px flex-1 max-w-[120px] bg-gradient-to-l from-transparent to-gold/40" />
        </AnimatedSection>

        {/* Section header — editorial serif with gold accent */}
        <AnimatedSection className="text-center mb-12">
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground mb-3 leading-tight">
            From Our{" "}
            <span className="text-gold">Kitchen</span>
          </h2>
          <Link
            href="https://www.instagram.com/bakedforsofia/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors tracking-wide"
          >
            <Instagram className="h-4 w-4" />
            @bakedforsofia
          </Link>
        </AnimatedSection>

        {/* Desktop masonry grid — asymmetric with varying row spans */}
        <div className="hidden sm:grid grid-cols-3 md:grid-cols-4 auto-rows-[180px] gap-3 lg:gap-4">
          {galleryImages.map((image, i) => (
            <GalleryCard key={image.src} image={image} index={i} />
          ))}
        </div>

        {/* Mobile horizontal scroll — large snap cards */}
        <div
          className="sm:hidden flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory scrollbar-hide"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {galleryImages.map((image, i) => (
            <motion.div
              key={image.src}
              initial={{ opacity: 0, y: 30, scale: 0.92 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{
                duration: 0.5,
                delay: i * 0.06,
                ease: "easeOut",
              }}
              className="flex-shrink-0 w-[70vw] snap-center"
            >
              <Link
                href="https://www.instagram.com/bakedforsofia/"
                target="_blank"
                rel="noopener noreferrer"
                className="block relative aspect-[4/5] rounded-xl overflow-hidden group"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="70vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Warm vignette */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-50"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, transparent 40%, oklch(0.25 0.04 45 / 0.6) 100%)",
                  }}
                />
                <div className="absolute inset-0 rounded-xl ring-1 ring-border/20 pointer-events-none" />
                {/* Bottom label */}
                <div className="absolute bottom-3 left-3">
                  <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-espresso/50 backdrop-blur-sm">
                    <Instagram className="h-3.5 w-3.5 text-white/80" />
                    <Heart className="h-3 w-3 text-white/60 fill-white/40" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA — elegant pill with Instagram gradient */}
        <AnimatedSection className="text-center mt-12" delay={0.3}>
          <Link
            href="https://www.instagram.com/bakedforsofia/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-full px-8 py-3 text-sm font-medium text-white transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/20 hover:scale-[1.03]"
            style={{
              background:
                "linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
            }}
          >
            <Instagram className="h-4.5 w-4.5" />
            Follow Us on Instagram
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
