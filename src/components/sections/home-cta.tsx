"use client";

import Link from "next/link";
import { AnimatedSection } from "@/components/animated-section";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function HomeCTA() {
  return (
    <section className="py-24 sm:py-32 bg-warm/40 relative overflow-hidden">
      {/* Decorative dotted arcs - bakery-themed */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-dashed border-gold/10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-dotted border-primary/8" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full border border-dashed border-gold/8" />

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        <AnimatedSection>
          <p className="text-xs font-medium tracking-[0.25em] uppercase text-primary mb-4">
            Work with us
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl text-foreground mb-6 leading-tight">
            Request Samples
            <br />& Price List
          </h2>
          <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Let us know what your business needs and we&apos;ll work with you to
            create the perfect product range. We&apos;re happy to provide
            samples so you can try before you commit.
          </p>
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
        </AnimatedSection>
      </div>
    </section>
  );
}
