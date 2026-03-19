"use client";

import Link from "next/link";
import { AnimatedSection } from "@/components/animated-section";
import { buttonVariants } from "@/components/ui/button";
import { Sparkles, Target, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

const highlights = [
  {
    icon: Sparkles,
    title: "Innovation",
    text: "Combining traditionally handcrafted skills with modern methods and machinery.",
  },
  {
    icon: Target,
    title: "Quality",
    text: "We source the highest quality ingredients, taking great pride in our exceptional product.",
  },
  {
    icon: Heart,
    title: "Relationships",
    text: "Long lasting relationships with both customers and suppliers built on trust.",
  },
];

export function AboutPreview() {
  return (
    <section className="py-20 sm:py-28 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <AnimatedSection direction="left">
            <p className="text-sm font-medium tracking-widest uppercase text-primary mb-3">
              Baked for Sofia
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Melbourne Based Wholesale Bakery
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Baked for Sofia started with a vision of creating a difference
              through innovation and improved service. We strive to provide our
              customers with the highest quality products made by combining
              traditionally handcrafted skills with modern and innovative
              methods.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              We thrive to be the best in our field, constantly searching for
              opportunities to grow and evolve together with our customers.
            </p>
            <Link href="/our-story" className={cn(buttonVariants({ variant: "outline" }))}>
              Learn more about us →
            </Link>
          </AnimatedSection>

          <AnimatedSection direction="right" delay={0.2}>
            <div className="space-y-6">
              {highlights.map((item) => (
                <div key={item.title} className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
