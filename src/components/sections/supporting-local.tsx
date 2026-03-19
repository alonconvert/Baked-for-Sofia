"use client";

import { AnimatedSection } from "@/components/animated-section";
import { Sprout, HandHeart, ShieldCheck, Wheat } from "lucide-react";

export function SupportingLocal() {
  return (
    <section className="py-24 sm:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <AnimatedSection direction="left">
            <div className="rounded-3xl bg-gradient-to-br from-cream via-warm/40 to-cream p-10 sm:p-14 border border-sage/15 relative overflow-hidden">
              {/* Decorative dotted circle element */}
              <div className="absolute top-0 right-0 w-48 h-48 -translate-y-1/2 translate-x-1/2 rounded-full border-2 border-dashed border-gold/15" />
              <div className="absolute top-0 right-0 w-36 h-36 -translate-y-1/3 translate-x-1/3 rounded-full border border-dashed border-sage/10" />

              <div className="relative">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-sage/10 mb-6">
                  <Sprout className="h-7 w-7 text-sage" />
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl text-foreground mb-6 leading-tight">
                  Supporting Our
                  <br />
                  Local Community
                </h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  We take great pride in giving back to our community. At BFS,
                  we believe in sourcing all of our products from local farmers
                  and suppliers, staying true to our values whilst using
                  high-quality ingredients at all times.
                </p>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection direction="right" delay={0.15}>
            <div className="space-y-8">
              {[
                {
                  icon: HandHeart,
                  title: "Community First",
                  text: "Not only does local sourcing ensure the highest quality ingredients, it allows us to support a sustainable economy and give back to Melbourne's vibrant food community.",
                },
                {
                  icon: Wheat,
                  title: "Local Farmers & Millers",
                  text: "We work directly with Australian farmers and millers, ensuring every grain and ingredient meets our exacting standards for quality and freshness.",
                },
                {
                  icon: ShieldCheck,
                  title: "Quality Guaranteed",
                  text: "Our commitment to locally sourced products is one of the many reasons why over 400 businesses trust us. High quality ingredients, always.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex gap-5 items-start group"
                >
                  <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-sage/10 border border-gold/10 flex items-center justify-center group-hover:bg-sage/15 group-hover:border-gold/20 transition-all duration-300">
                    <item.icon className="h-5 w-5 text-sage" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1.5">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
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
