"use client";

import { AnimatedSection } from "@/components/animated-section";
import {
  Sparkles,
  Target,
  Heart,
  Sprout,
  HandHeart,
  ShieldCheck,
} from "lucide-react";
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
    text: "Enforcing high quality of ingredients and product consistency, while never compromising on flavour.",
  },
  {
    icon: Heart,
    title: "Lasting Relationships",
    text: "We take pride in our customer service and long-lasting relationships with all businesses, customers, and suppliers.",
  },
  {
    icon: Sprout,
    title: "Sustainability",
    text: "Committed to sustainable practices and helping create a healthy, sustainable business community.",
  },
  {
    icon: HandHeart,
    title: "Community",
    text: "Sourcing all of our products from local farmers and suppliers, supporting a sustainable local economy.",
  },
  {
    icon: ShieldCheck,
    title: "Consistency",
    text: "Our dynamic industrial team is passionate about delivering the same exceptional quality every day, six days a week.",
  },
];

const timeline = [
  {
    year: "2015",
    title: "The Beginning",
    description:
      "Started in a 25sqm rental space with a vision that bread can be done differently.",
  },
  {
    year: "2016",
    title: "Knocking on Doors",
    description:
      "Steadily proved to businesses across Melbourne that artisan quality at wholesale scale was possible.",
  },
  {
    year: "2018",
    title: "Growing Together",
    description:
      "Expanded our range and customer base, building lasting partnerships through quality and reliability.",
  },
  {
    year: "Today",
    title: "400+ Customers",
    description:
      "Producing in a large-scale factory, delivering to over 400 customers across Melbourne and beyond.",
  },
];

export default function OurStoryPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-warm via-cream/50 to-background relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 50% 30%, oklch(0.76 0.15 75 / 0.2), transparent)",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <p className="text-xs font-medium tracking-[0.25em] uppercase text-primary mb-3">
              Baked for Sofia
            </p>
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl text-foreground mb-6">
              Our Story
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              A family bakery born from the ambition of creating a positive
              change in how Melbourne does bread.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Founding Story */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="bg-gradient-to-br from-warm to-cream rounded-3xl p-8 text-center border border-border/30">
                <p className="font-serif text-5xl text-primary">2015</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Year founded
                </p>
              </div>
              <div className="bg-gradient-to-br from-warm to-cream rounded-3xl p-8 text-center border border-border/30">
                <p className="font-serif text-5xl text-gold">25sqm</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Where it started
                </p>
              </div>
              <div className="bg-gradient-to-br from-warm to-cream rounded-3xl p-8 text-center border border-border/30">
                <p className="font-serif text-5xl text-primary">400+</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Customers today
                </p>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="space-y-6">
              <p className="text-foreground/80 leading-relaxed text-lg">
                With the ambition of creating a positive change, Baked for Sofia
                is a family owned bakery started in 2015 in a 25sqm rental
                space, and by knocking on doors it steadily proved to other
                businesses across Melbourne that bread can be done differently.
              </p>
              <p className="text-foreground/80 leading-relaxed text-lg">
                Focusing on the core values of honest baking; enforcing high
                quality of ingredients and product consistency, while never
                compromising on flavour and customer service.
              </p>
              <p className="text-foreground/80 leading-relaxed text-lg">
                Today BFS is producing in a large scale factory setting,
                delivering to over 400 customers all over Melbourne and beyond.
                Whilst our business has grown, our core values remain the same.
                We&apos;re as dedicated to making the best baked goods as we are
                to helping create a healthy, sustainable business community.
              </p>
              <p className="text-foreground/80 leading-relaxed text-lg">
                We take pride in our customer service and long-lasting
                relationships with all businesses, customers and suppliers &
                aim to work closely with our customers to create products that
                suit their business needs.
              </p>
            </div>
          </AnimatedSection>

          {/* Founders */}
          <AnimatedSection delay={0.2}>
            <div className="mt-14 bg-card rounded-3xl border border-border/50 p-8 sm:p-10 relative overflow-hidden">
              <div className="absolute top-4 left-8 font-serif text-7xl text-primary/[0.06] leading-none">
                &ldquo;
              </div>
              <div className="relative">
                <blockquote className="text-lg text-foreground/80 leading-relaxed italic mb-6 pt-8">
                  Our dynamic industrial team is passionate about reaching new
                  goals and driving our business forward. We work closely with
                  our customers to create products that suit their business
                  needs.
                </blockquote>
                <div>
                  <p className="font-semibold text-foreground">
                    Dov & Immy Lachovich Marcus
                  </p>
                  <p className="text-sm text-muted-foreground">Founders</p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-cream/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <p className="text-xs font-medium tracking-[0.25em] uppercase text-primary mb-3">
                Our Journey
              </p>
              <h2 className="font-serif text-4xl sm:text-5xl text-foreground">
                The Path We&apos;ve Walked
              </h2>
            </div>
          </AnimatedSection>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border/60 md:-translate-x-px" />

            <div className="space-y-12">
              {timeline.map((item, i) => (
                <AnimatedSection
                  key={item.year}
                  delay={i * 0.15}
                  direction={i % 2 === 0 ? "left" : "right"}
                >
                  <div
                    className={`relative flex items-start gap-6 md:gap-12 ${
                      i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    <div className="hidden md:block md:w-1/2">
                      <div
                        className={`${
                          i % 2 === 0 ? "text-right pr-8" : "text-left pl-8"
                        }`}
                      >
                        <p className="font-serif text-3xl text-primary/60">
                          {item.year}
                        </p>
                      </div>
                    </div>

                    {/* Dot */}
                    <div className="absolute left-6 md:left-1/2 w-3 h-3 rounded-full bg-primary border-2 border-background -translate-x-1.5 md:-translate-x-1.5 mt-2 z-10" />

                    <div className="md:w-1/2 pl-14 md:pl-0">
                      <div
                        className={`${
                          i % 2 === 0 ? "md:pl-8" : "md:pr-8"
                        }`}
                      >
                        <p className="font-serif text-2xl text-primary/60 md:hidden mb-1">
                          {item.year}
                        </p>
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                          {item.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <p className="text-xs font-medium tracking-[0.25em] uppercase text-primary mb-3">
                What Drives Us
              </p>
              <h2 className="font-serif text-4xl sm:text-5xl text-foreground">
                Our Values
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 0.1}>
                <div className="bg-card rounded-2xl border border-border/50 p-7 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-gold/10 mb-5 group-hover:scale-105 transition-transform">
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

      {/* Supporting Local */}
      <section className="py-24 bg-cream/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="rounded-3xl bg-gradient-to-br from-emerald-50/80 via-green-50/50 to-cream p-10 sm:p-16 border border-sage/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-sage/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="relative max-w-3xl">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-sage/10 mb-6">
                  <Sprout className="h-7 w-7 text-sage" />
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl text-foreground mb-6">
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

      {/* CTA */}
      <section className="py-24 bg-warm/40">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="font-serif text-3xl sm:text-4xl text-foreground mb-4">
              Want to Work with Us?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              We&apos;d love to hear from you. Get in touch to discuss how we
              can serve your business.
            </p>
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ size: "lg" }),
                "text-base px-10 h-12 rounded-full"
              )}
            >
              Get in Touch
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
