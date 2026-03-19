"use client";

import { AnimatedSection } from "@/components/animated-section";
import { Sparkles, Target, Heart, Sprout, HandHeart, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const values = [
  {
    icon: Sparkles,
    title: "Innovation",
    text: "Combining traditionally handcrafted skills with modern and innovative methods and machinery to create exceptional products.",
  },
  {
    icon: Target,
    title: "Quality First",
    text: "We source the highest quality ingredients, taking great pride in our exceptional product and the standard we deliver every single day.",
  },
  {
    icon: Heart,
    title: "Lasting Relationships",
    text: "Building long lasting relationships with both customers and suppliers, growing and evolving together through trust and shared values.",
  },
  {
    icon: Sprout,
    title: "Sustainability",
    text: "Committed to sustainable practices and supporting our local economy through responsible sourcing and production.",
  },
  {
    icon: HandHeart,
    title: "Community",
    text: "We believe in giving back to our community by supporting local farmers, suppliers, and businesses across Melbourne.",
  },
  {
    icon: ShieldCheck,
    title: "Consistency",
    text: "Our customers trust us to deliver the same exceptional quality every day, six days a week, without exception.",
  },
];

export default function OurStoryPage() {
  return (
    <>
      <section className="pt-28 pb-16 bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <p className="text-sm font-medium tracking-widest uppercase text-primary mb-2">
              Baked for Sofia
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Our Story
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Creating a difference through innovation and improved service
              since day one.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground leading-relaxed text-lg">
                Baked for Sofia started with a vision of creating a difference
                through innovation and improved service. What began as a passion
                project has grown into one of Melbourne&apos;s trusted wholesale
                bakeries, serving over 400 customers across the city.
              </p>
              <p className="text-muted-foreground leading-relaxed text-lg mt-6">
                We strive to provide our customers with the highest quality
                products made by combining traditionally handcrafted skills with
                modern and innovative methods and machinery. Every loaf, every
                bun, and every pastry is made with care and attention to detail.
              </p>
              <p className="text-muted-foreground leading-relaxed text-lg mt-6">
                We source the highest quality ingredients, taking great pride in
                our exceptional product and long lasting relationship with both
                customers and suppliers. Our commitment to quality is evident in
                everything we do — from the flour we choose to the way we
                deliver.
              </p>
              <p className="text-muted-foreground leading-relaxed text-lg mt-6">
                We thrive to be the best in our field, constantly searching for
                opportunities to grow and evolve together with our customers.
                Whether it&apos;s a new sourdough recipe or a custom burger bun
                for your menu, we&apos;re always innovating.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-20 bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                Our Values
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 0.1}>
                <div className="bg-card rounded-2xl border border-border p-6 hover:border-primary/20 transition-colors">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border border-sage/20 p-10 sm:p-14">
              <div className="max-w-3xl">
                <Sprout className="h-10 w-10 text-sage mb-6" />
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Supporting Our Local Community
                </h2>
                <p className="text-muted-foreground leading-relaxed text-lg mb-4">
                  At BFS, we believe in supporting our local community by
                  sourcing all of our products from local suppliers. Not only
                  does this ensure that we are always getting the highest quality
                  ingredients, but it also allows us to abide by our values and
                  support a sustainable economy.
                </p>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  Our commitment to using locally sourced products is one of the
                  many reasons why people love what we do.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-20 bg-secondary/30">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Want to Work with Us?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              We&apos;d love to hear from you. Get in touch to discuss how we
              can serve your business.
            </p>
            <Link href="/contact" className={cn(buttonVariants({ size: "lg" }), "text-base px-8")}>
              Get in Touch
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
