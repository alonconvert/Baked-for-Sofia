"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/animated-section";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function HomeCTA() {
  return (
    <section className="py-24 sm:py-32 bg-warm/40 relative overflow-hidden">
      {/* Decorative dotted arcs - slowly rotating */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-dashed border-gold/10"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-dotted border-primary/8"
        animate={{ rotate: -360 }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full border border-dashed border-gold/8"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        <AnimatedSection>
          <p className="text-xs font-medium tracking-[0.25em] uppercase text-primary mb-4">
            Work with us
          </p>
          {/* Heading scales up on entrance */}
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="font-serif text-4xl sm:text-5xl text-foreground mb-6 leading-tight"
          >
            Request Samples
            <br />& Price List
          </motion.h2>
          <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Let us know what your business needs and we&apos;ll work with you to
            create the perfect product range. We&apos;re happy to provide
            samples so you can try before you commit.
          </p>
          {/* Button with attention pulse after 2s delay */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 0 0 oklch(0.52 0.14 38 / 0)",
                  "0 0 0 8px oklch(0.52 0.14 38 / 0.15)",
                  "0 0 0 0 oklch(0.52 0.14 38 / 0)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: 2,
                ease: "easeInOut",
              }}
              className="inline-block rounded-full"
            >
              <Link
                href="/contact"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "text-base px-12 h-14 rounded-full shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-shadow duration-300"
                )}
              >
                Let Us Know What You Need
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </motion.div>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
}
