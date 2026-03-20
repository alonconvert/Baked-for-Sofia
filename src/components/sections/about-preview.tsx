"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useMotionValue, useTransform, animate, useScroll, useInView } from "framer-motion";
import { AnimatedSection } from "@/components/animated-section";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

function CountUpStat({ value, label, color }: { value: string; label: string; color: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const numericPart = parseInt(value.replace(/\D/g, ""), 10);
  const suffix = value.replace(/\d/g, "");
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, numericPart, {
        duration: 2,
        ease: "easeOut",
      });
      return () => controls.stop();
    }
  }, [isInView, count, numericPart]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8, rotateY: 30 }}
      whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-gradient-to-br from-warm to-cream rounded-2xl p-6 text-center border border-border/30"
    >
      <p className={`font-serif text-5xl sm:text-6xl font-bold tracking-tight ${color}`}>
        <motion.span>{rounded}</motion.span>
        {suffix}
      </p>
      <p className="text-xs font-medium tracking-[0.15em] uppercase text-muted-foreground mt-2">{label}</p>
    </motion.div>
  );
}

const quoteWords = "We're as dedicated to making the best baked goods as we are to helping create a healthy, sustainable business community.".split(" ");

function WordRevealQuote() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="bg-card rounded-2xl border border-border/50 p-8 relative">
      <div className="absolute left-0 top-6 bottom-6 w-[3px] rounded-full bg-gradient-to-b from-gold to-primary/40" />
      <blockquote className="pl-4">
        <p className="text-foreground leading-relaxed italic text-lg">
          {quoteWords.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{
                duration: 0.3,
                delay: i * 0.05,
                ease: "easeOut",
              }}
              className="inline-block mr-[0.3em]"
            >
              {word}
            </motion.span>
          ))}
        </p>
        <motion.footer
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: quoteWords.length * 0.05 + 0.3, duration: 0.5 }}
          className="mt-4 text-sm text-muted-foreground"
        >
          &mdash; Dov & Immy Lachovich Marcus, Founders
        </motion.footer>
      </blockquote>
    </div>
  );
}

export function AboutPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Subtle parallax: text column moves slightly slower than stats column
  const textY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const statsY = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  return (
    <section ref={sectionRef} className="py-24 sm:py-32 bg-background relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text content */}
          <motion.div style={{ y: textY }}>
            <AnimatedSection direction="left">
              <p className="text-xs font-medium tracking-[0.25em] uppercase text-primary mb-4">
                Our Story
              </p>
              <h2 className="font-serif text-4xl sm:text-5xl text-foreground mb-8 leading-tight">
                From 25sqm to
                <br />
                <span className="text-primary">400+ Customers</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg mb-6">
                With the ambition of creating a positive change, Baked for Sofia is
                a family owned bakery started in 2015 in a 25sqm rental space. By
                knocking on doors, we steadily proved to businesses across
                Melbourne that bread can be done differently.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Today BFS is producing in a large-scale factory setting, delivering
                to over 400 customers all over Melbourne and beyond. Whilst our
                business has grown, our core values remain the same.
              </p>
              <Link
                href="/our-story"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "rounded-full px-6"
                )}
              >
                Read our full story &rarr;
              </Link>
            </AnimatedSection>
          </motion.div>

          {/* Images, Stats and quote */}
          <motion.div style={{ y: statsY }}>
            <AnimatedSection direction="right" delay={0.2}>
              <div className="space-y-5">
                {/* Stacked image layout */}
                <div className="relative">
                  {/* Main product display image */}
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/3] border border-border/30 shadow-lg">
                    <Image
                      src="/images/homepage/product-display.webp"
                      alt="Baked for Sofia product display"
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                      priority
                    />
                  </div>
                  {/* Secondary bakery detail image overlapping */}
                  <div className="absolute -bottom-6 -left-4 sm:-left-6 w-36 sm:w-44 aspect-square rounded-2xl overflow-hidden border-4 border-background shadow-xl">
                    <Image
                      src="/images/homepage/bakery-detail.webp"
                      alt="Artisan bakery detail"
                      fill
                      sizes="176px"
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Spacer for overlapping image */}
                <div className="h-4" />

                {/* Dramatic stats with count-up */}
                <div className="grid grid-cols-2 gap-4">
                  <CountUpStat value="2015" label="Since founded" color="text-primary" />
                  <CountUpStat value="400+" label="Customers" color="text-gold" />
                </div>

                {/* Pull quote with word-by-word reveal */}
                <WordRevealQuote />

                {/* Values */}
                <div className="flex gap-4">
                  {[
                    "Honest Baking",
                    "Quality Ingredients",
                    "Customer First",
                  ].map((value) => (
                    <span
                      key={value}
                      className="text-xs tracking-wide uppercase text-primary/60 border border-primary/15 rounded-full px-3 py-1.5 bg-primary/[0.03]"
                    >
                      {value}
                    </span>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
