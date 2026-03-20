"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/animated-section";
import { Instagram, Heart, ExternalLink } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRef, useState } from "react";

const galleryImages = [
  { src: "/images/products/croissant.webp", alt: "Freshly baked croissant" },
  { src: "/images/products/white-sourdough.webp", alt: "Artisan white sourdough" },
  { src: "/images/products/brioche-bun.webp", alt: "Golden brioche bun" },
  { src: "/images/products/chocolate-babka.webp", alt: "Chocolate babka" },
  { src: "/images/products/jerusalem-bagel-seeds.webp", alt: "Jerusalem bagel with seeds" },
  { src: "/images/products/basque-cheesecake.webp", alt: "Basque cheesecake" },
  { src: "/images/products/challah.webp", alt: "Traditional challah bread" },
  { src: "/images/products/olive-baguette.webp", alt: "Olive baguette" },
  { src: "/images/homepage/bakery-bread.webp", alt: "Fresh bakery bread display" },
  { src: "/images/homepage/dov-founder.webp", alt: "Dov, founder of Baked for Sofia" },
];

function GalleryCard({ image, index }: { image: (typeof galleryImages)[number]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: "easeOut",
      }}
      className="flex-shrink-0 w-56 sm:w-auto"
    >
      <Link
        href="https://www.instagram.com/bakedforsofia/"
        target="_blank"
        rel="noopener noreferrer"
        className="block relative aspect-square rounded-xl overflow-hidden border border-border/30 group cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(max-width: 640px) 224px, (max-width: 1024px) 33vw, 200px"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Hover overlay */}
        <motion.div
          initial={false}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.25 }}
          className="absolute inset-0 bg-espresso/50 flex flex-col items-center justify-center gap-3"
        >
          <Heart className="h-7 w-7 text-white fill-white/80" />
          <span className="text-white text-xs font-medium tracking-wide flex items-center gap-1.5">
            View on Instagram
            <ExternalLink className="h-3 w-3" />
          </span>
        </motion.div>
        {/* Warm border glow on hover */}
        <div className="absolute inset-0 rounded-xl ring-2 ring-transparent group-hover:ring-gold/40 transition-all duration-300 pointer-events-none" />
      </Link>
    </motion.div>
  );
}

export function InstagramFeed() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-24 sm:py-32 bg-gradient-to-b from-background via-warm/20 to-background relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <AnimatedSection className="text-center mb-12">
          <div className="inline-flex items-center gap-2.5 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#f09433] via-[#dc2743] to-[#bc1888] flex items-center justify-center">
              <Instagram className="h-5 w-5 text-white" />
            </div>
            <Link
              href="https://www.instagram.com/bakedforsofia/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium tracking-wide text-primary hover:text-primary/80 transition-colors"
            >
              @bakedforsofia
            </Link>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl text-foreground mb-4 leading-tight">
            Follow Our Journey
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed">
            A glimpse into our bakery &mdash; from oven to your table. Fresh bakes, behind the scenes, and the passion behind every loaf.
          </p>
        </AnimatedSection>

        {/* Desktop grid */}
        <div className="hidden sm:grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 lg:gap-4">
          {galleryImages.map((image, i) => (
            <GalleryCard key={image.src} image={image} index={i} />
          ))}
        </div>

        {/* Mobile horizontal scroll */}
        <div
          ref={scrollRef}
          className="sm:hidden flex gap-3 overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory scrollbar-hide"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {galleryImages.map((image, i) => (
            <div key={image.src} className="snap-start">
              <GalleryCard image={image} index={i} />
            </div>
          ))}
        </div>

        {/* CTA button */}
        <AnimatedSection className="text-center mt-10" delay={0.3}>
          <Link
            href="https://www.instagram.com/bakedforsofia/"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "rounded-full px-8 h-11 gap-2.5 border-border hover:border-gold/40 hover:bg-warm/50 transition-all duration-300"
            )}
          >
            <Instagram className="h-4 w-4" />
            Follow us on Instagram
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
