"use client";

import { AnimatedSection } from "@/components/animated-section";
import Image from "next/image";
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
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

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

function AnimatedTimelineLine() {
  const lineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ["start center", "end center"],
  });
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={lineRef} className="absolute left-6 md:left-1/2 top-0 bottom-0 md:-translate-x-px">
      {/* Static track */}
      <div className="w-px h-full bg-border/30" />
      {/* Animated fill */}
      <motion.div
        className="absolute top-0 left-0 w-px bg-gradient-to-b from-gold via-primary/60 to-gold/30"
        style={{ height }}
      />
    </div>
  );
}

export default function OurStoryPage() {
  return (
    <>
      {/* Hero with full-bleed bakery image */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden">
        <Image
          src="/images/homepage/bakery-detail.webp"
          alt="Inside the Baked for Sofia bakery"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 pt-40 w-full">
          <AnimatedSection>
            <p className="text-xs font-medium tracking-[0.25em] uppercase text-primary mb-3">
              Baked for Sofia
            </p>
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl text-foreground mb-6">
              Our Story
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
              A family bakery born from the ambition of creating a positive
              change in how Melbourne does bread.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Founding Story */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Stat cards with flip/scale entrance */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              { value: "2015", label: "Year founded", color: "text-primary" },
              { value: "25sqm", label: "Where it started", color: "text-gold" },
              { value: "400+", label: "Customers today", color: "text-primary" },
            ].map((stat, i) => (
              <motion.div
                key={stat.value}
                initial={{ opacity: 0, scale: 0.7, rotateY: -30 }}
                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.12,
                  ease: "easeOut",
                }}
                className="bg-gradient-to-br from-warm to-cream rounded-3xl p-8 text-center border border-border/30 border-b-2 border-b-gold/30"
              >
                <p className={`font-serif text-6xl font-bold tracking-tight ${stat.color}`}>
                  {stat.value}
                </p>
                <p className="text-xs font-medium tracking-[0.15em] uppercase text-muted-foreground mt-3">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>

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

          {/* Founders -- larger, editorial layout */}
          <AnimatedSection delay={0.2}>
            <div className="mt-20 grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
              {/* Founder photo -- Ken Burns slow zoom */}
              <div className="md:col-span-2">
                <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-xl border-2 border-warm ring-1 ring-gold/20 ring-offset-4 ring-offset-background">
                  <Image
                    src="/images/homepage/founder.jpg"
                    alt="Dov & Immy Lachovich Marcus, Founders of Baked for Sofia"
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover animate-ken-burns"
                  />
                </div>
              </div>
              {/* Quote */}
              <div className="md:col-span-3">
                <div className="bg-card rounded-3xl border border-border/50 p-8 sm:p-10 relative overflow-hidden">
                  <div className="absolute left-0 top-8 bottom-8 w-[3px] rounded-full bg-gradient-to-b from-gold to-primary/40" />
                  <div className="relative pl-4">
                    <blockquote className="text-xl sm:text-2xl text-foreground/80 leading-relaxed italic mb-8">
                      Our dynamic industrial team is passionate about reaching
                      new goals and driving our business forward. We work
                      closely with our customers to create products that suit
                      their business needs.
                    </blockquote>
                    <div>
                      <p className="font-semibold text-foreground text-lg">
                        Dov & Immy Lachovich Marcus
                      </p>
                      <p className="text-sm text-muted-foreground">Founders</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Full-width bakery bread showcase */}
      <section className="relative h-[50vh] sm:h-[60vh] overflow-hidden">
        <Image
          src="/images/homepage/bakery-bread.webp"
          alt="Artisan bread at Baked for Sofia"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-cream/30" />
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
            {/* Animated vertical line */}
            <AnimatedTimelineLine />

            <div className="space-y-12">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{
                    opacity: 0,
                    x: i % 2 === 0 ? -60 : 60,
                    y: 20,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                    y: 0,
                  }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.7,
                    delay: i * 0.15,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
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
                    <div className="absolute left-6 md:left-1/2 w-4 h-4 rounded-full bg-gold border-2 border-background -translate-x-2 md:-translate-x-2 mt-2 z-10 shadow-sm shadow-gold/30" />

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
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values -- with staggered rotation entrance */}
      <section className="py-24 bg-background relative overflow-hidden">
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
              <motion.div
                key={item.title}
                initial={{
                  opacity: 0,
                  y: 40,
                  rotate: (i % 2 === 0 ? -3 : 3),
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  rotate: 0,
                }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.1,
                  ease: "easeOut",
                }}
              >
                <div className="bg-card rounded-2xl border border-border/50 p-7 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group h-full">
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Supporting Local -- with bakery-bread image background */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/homepage/bakery-bread.webp"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-emerald-950/80" />
        </div>
        <div className="relative py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <div className="max-w-3xl mx-auto text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/10 mb-6">
                  <Sprout className="h-7 w-7 text-emerald-300" />
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl text-white mb-6">
                  Supporting Our Local Community
                </h2>
                <p className="text-white/70 leading-relaxed text-lg mb-4">
                  At BFS, we believe in supporting our local community by
                  sourcing all of our products from local suppliers. Not only
                  does this ensure that we are always getting the highest quality
                  ingredients, but it also allows us to abide by our values and
                  support a sustainable economy.
                </p>
                <p className="text-white/70 leading-relaxed text-lg">
                  Our commitment to using locally sourced products is one of the
                  many reasons why people love what we do.
                </p>
              </div>
            </AnimatedSection>
          </div>
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
