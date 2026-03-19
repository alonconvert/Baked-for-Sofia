"use client";

import Link from "next/link";
import { AnimatedSection } from "@/components/animated-section";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function HomeCTA() {
  return (
    <section className="py-20 sm:py-28 bg-secondary/30">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        <AnimatedSection>
          <p className="text-sm font-medium tracking-widest uppercase text-primary mb-3">
            Need some guidance?
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Request Samples and Price List
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
            Let us know what your business needs and we&apos;ll work with you to
            create the perfect product range.
          </p>
          <Link href="/contact" className={cn(buttonVariants({ size: "lg" }), "text-base px-8")}>
            Let Us Know What You Need
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
