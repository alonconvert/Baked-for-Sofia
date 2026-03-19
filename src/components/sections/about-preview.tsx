"use client";

import Link from "next/link";
import Image from "next/image";
import { AnimatedSection } from "@/components/animated-section";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function AboutPreview() {
  return (
    <section className="py-24 sm:py-32 bg-background relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text content */}
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

          {/* Images, Stats and quote */}
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

              {/* Dramatic stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-warm to-cream rounded-2xl p-6 text-center border border-border/30">
                  <p className="font-serif text-4xl sm:text-5xl text-primary">
                    2015
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">Founded</p>
                </div>
                <div className="bg-gradient-to-br from-warm to-cream rounded-2xl p-6 text-center border border-border/30">
                  <p className="font-serif text-4xl sm:text-5xl text-gold">
                    400+
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Customers
                  </p>
                </div>
              </div>

              {/* Pull quote */}
              <div className="bg-card rounded-2xl border border-border/50 p-8 relative">
                <div className="absolute top-4 left-6 font-serif text-6xl text-primary/10 leading-none">
                  &ldquo;
                </div>
                <blockquote className="relative z-10 pt-6">
                  <p className="text-foreground leading-relaxed italic">
                    We&apos;re as dedicated to making the best baked goods as we
                    are to helping create a healthy, sustainable business
                    community.
                  </p>
                  <footer className="mt-4 text-sm text-muted-foreground">
                    &mdash; Dov & Immy Lachovich Marcus, Founders
                  </footer>
                </blockquote>
              </div>

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
        </div>
      </div>
    </section>
  );
}
