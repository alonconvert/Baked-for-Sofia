"use client";

import { AnimatedSection } from "@/components/animated-section";
import { Sprout, HandHeart, ShieldCheck } from "lucide-react";

export function SupportingLocal() {
  return (
    <section className="py-20 sm:py-28 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <AnimatedSection direction="left">
            <div className="rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border border-sage/20 p-10 sm:p-14">
              <Sprout className="h-10 w-10 text-sage mb-6" />
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Supporting Local
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                We take great pride in giving back to our community. At BFS, we
                believe in supporting our local community by sourcing all of our
                products from local suppliers.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection direction="right" delay={0.15}>
            <div className="space-y-8">
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-sage/10 flex items-center justify-center">
                  <HandHeart className="h-5 w-5 text-sage" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    Community First
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Not only does local sourcing ensure the highest quality
                    ingredients, it also allows us to support a sustainable
                    economy and give back to Melbourne.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-sage/10 flex items-center justify-center">
                  <ShieldCheck className="h-5 w-5 text-sage" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    Quality Guaranteed
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Our commitment to using locally sourced products is one of
                    the many reasons why people love what we do. High quality,
                    always.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
