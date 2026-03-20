"use client";

import { motion, useInView } from "framer-motion";
import { AnimatedSection } from "@/components/animated-section";
import { Star, Quote, Users } from "lucide-react";
import { useRef } from "react";

interface Testimonial {
  name: string;
  role: string;
  business: string;
  suburb: string;
  quote: string;
  monogram: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Sarah Mitchell",
    role: "Owner",
    business: "The Morning Press",
    suburb: "Fitzroy",
    quote:
      "We've been ordering from Baked for Sofia for over three years now. The sourdough is hands-down the best we've ever served \u2014 our customers constantly ask where we get our bread. The overnight delivery means it's always fresh when we open.",
    monogram: "S",
  },
  {
    name: "James Nguyen",
    role: "Head Chef",
    business: "Ember & Grain",
    suburb: "South Melbourne",
    quote:
      "What sets BFS apart is their consistency. Every brioche bun, every croissant, every single time \u2014 the quality never drops. They've been a rock-solid partner for our restaurant.",
    monogram: "J",
  },
  {
    name: "Rachel Goldstein",
    role: "Co-owner",
    business: "The Deli Counter",
    suburb: "St Kilda",
    quote:
      "Switching to Baked for Sofia was the best decision we made last year. Their gluten-free range actually tastes incredible, and our GF customers can finally enjoy proper bread. Dov and the team truly care.",
    monogram: "R",
  },
  {
    name: "Tom & Lisa Chen",
    role: "Founders",
    business: "Double Shot Coffee",
    suburb: "Richmond",
    quote:
      "The Jerusalem bagels are a game-changer. We can't keep them in stock. BFS understood exactly what we needed and even customised sizes for our menu. Real partners, not just suppliers.",
    monogram: "T",
  },
  {
    name: "Marcus Webb",
    role: "Operations Manager",
    business: "Urban Bites Catering",
    suburb: "Melbourne",
    quote:
      "We serve over 500 events a year and rely on BFS for all our bread and pastry needs. Their delivery has never let us down \u2014 not once in two years. That kind of reliability is rare.",
    monogram: "M",
  },
];

function GoldStarRating() {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className="h-4 w-4 text-gold fill-gold drop-shadow-[0_0_3px_oklch(0.76_0.15_75_/_0.5)]"
        />
      ))}
    </div>
  );
}

function MonogramBadge({ letter }: { letter: string }) {
  return (
    <div className="relative flex-shrink-0 w-12 h-12 rotate-3">
      {/* Gold-bordered square badge, slightly rotated like a wax seal */}
      <div className="absolute inset-0 rounded-sm border-2 border-gold/50 bg-gradient-to-br from-cream to-warm" />
      {/* Inner serif monogram */}
      <span className="relative flex items-center justify-center w-full h-full font-serif text-xl text-primary font-bold">
        {letter}
      </span>
    </div>
  );
}

/* ─── Featured (first) testimonial ─── */
function FeaturedTestimonialCard({
  testimonial,
}: {
  testimonial: Testimonial;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="md:col-span-2"
    >
      <div className="relative h-full rounded-2xl bg-card border border-border/50 p-8 sm:p-10 hover:border-gold/30 hover:shadow-xl hover:shadow-gold/5 transition-all duration-300 overflow-hidden">
        {/* Parchment noise texture */}
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
          }}
        />

        {/* Gold accent line at top */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

        {/* Large decorative gold quote mark */}
        <div className="absolute top-4 right-6 pointer-events-none">
          <Quote className="h-24 w-24 text-gold/10 fill-gold/5" />
        </div>

        <div className="relative">
          <GoldStarRating />

          {/* Larger quote text — italic serif */}
          <blockquote className="mt-6 mb-8">
            <p className="font-serif text-foreground leading-relaxed text-xl sm:text-2xl italic">
              &ldquo;{testimonial.quote}&rdquo;
            </p>
          </blockquote>

          {/* Gold connecting line to author */}
          <div className="w-16 h-px bg-gradient-to-r from-gold/50 to-transparent mb-6" />

          {/* Author */}
          <div className="flex items-center gap-4">
            <MonogramBadge letter={testimonial.monogram} />
            <div>
              <p className="font-semibold text-foreground text-base">
                {testimonial.name}
              </p>
              <p className="text-muted-foreground text-sm">
                {testimonial.role}
              </p>
              <p className="text-xs font-medium tracking-[0.15em] uppercase text-primary/60 mt-0.5">
                {testimonial.business} &middot; {testimonial.suburb}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Standard testimonial card ─── */
function TestimonialCard({
  testimonial,
  index,
  direction = "left",
}: {
  testimonial: Testimonial;
  index: number;
  direction?: "left" | "right";
}) {
  const xOffset = direction === "left" ? -40 : 40;

  return (
    <motion.div
      initial={{ opacity: 0, x: xOffset, y: 20 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      className="group"
    >
      <div className="relative h-full rounded-2xl bg-card border border-border/50 p-7 sm:p-8 hover:border-gold/25 hover:shadow-lg hover:shadow-gold/5 transition-all duration-300 overflow-hidden">
        {/* Parchment noise texture */}
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
          }}
        />

        {/* Gold accent line at top */}
        <div className="absolute top-0 left-8 right-8 h-[2px] rounded-full bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

        {/* Subtle quote mark */}
        <div className="absolute top-4 right-5 pointer-events-none opacity-[0.06]">
          <Quote className="h-16 w-16 text-primary" />
        </div>

        <div className="relative">
          <GoldStarRating />

          {/* Quote — serif italic */}
          <blockquote className="mt-4 mb-6">
            <p className="font-serif text-foreground leading-relaxed text-base italic">
              &ldquo;{testimonial.quote}&rdquo;
            </p>
          </blockquote>

          {/* Gold thread connector */}
          <div className="w-10 h-px bg-gradient-to-r from-gold/40 to-transparent mb-5" />

          {/* Author */}
          <div className="flex items-center gap-3.5">
            <MonogramBadge letter={testimonial.monogram} />
            <div>
              <p className="font-semibold text-foreground text-sm">
                {testimonial.name}
              </p>
              <p className="text-muted-foreground text-xs">
                {testimonial.role}
              </p>
              <p className="text-[10px] font-medium tracking-[0.15em] uppercase text-primary/50 mt-0.5">
                {testimonial.business} &middot; {testimonial.suburb}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Dramatic stat bar ─── */
function StatBar() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative flex flex-wrap items-center justify-center gap-8 sm:gap-12 mb-14 py-6 px-8 rounded-2xl overflow-hidden"
      style={{ backgroundColor: "oklch(0.25 0.04 45 / 0.95)" }}
    >
      {/* Parchment texture */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gold/15 flex items-center justify-center border border-gold/20">
          <Users className="h-5 w-5 text-gold" />
        </div>
        <div>
          <p className="text-3xl font-serif font-bold text-gold">400+</p>
          <p className="text-xs text-white/50 tracking-wide">
            Businesses served
          </p>
        </div>
      </div>

      <div className="hidden sm:block w-px h-12 bg-gold/20" />

      <div className="relative flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gold/15 flex items-center justify-center border border-gold/20">
          <Star className="h-5 w-5 text-gold fill-gold" />
        </div>
        <div>
          <p className="text-3xl font-serif font-bold text-gold">5.0</p>
          <p className="text-xs text-white/50 tracking-wide">
            Average rating
          </p>
        </div>
      </div>

      <div className="hidden sm:block w-px h-12 bg-gold/20" />

      <div className="relative text-center sm:text-left">
        <p className="text-sm font-medium text-white/90">
          Trusted across Melbourne
        </p>
        <p className="text-xs text-white/40 tracking-wide">
          Cafes, restaurants &amp; caterers
        </p>
      </div>
    </motion.div>
  );
}

export function Testimonials() {
  const featured = testimonials[0];
  const rest = testimonials.slice(1);

  return (
    <section className="py-24 sm:py-32 bg-background relative overflow-hidden">
      {/* Top decorative line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <AnimatedSection className="text-center mb-10">
          <p className="text-xs font-medium tracking-[0.25em] uppercase text-primary mb-4">
            What Our Partners Say
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl text-foreground mb-4 leading-tight">
            Voices from Melbourne&apos;s
            <br />
            <span className="text-gold">Kitchens</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            From neighbourhood cafes to large-scale caterers, hear why businesses
            across Melbourne choose Baked for Sofia as their bread and pastry
            partner.
          </p>
        </AnimatedSection>

        {/* Stat bar — espresso dark with gold numbers */}
        <StatBar />

        {/* Desktop: staggered editorial layout */}
        <div className="hidden md:grid md:grid-cols-2 gap-5 lg:gap-6">
          {/* Featured testimonial — spans 2 columns */}
          <FeaturedTestimonialCard testimonial={featured} />

          {/* Remaining testimonials — alternating slide directions */}
          {rest.map((testimonial, i) => (
            <TestimonialCard
              key={testimonial.name}
              testimonial={testimonial}
              index={i}
              direction={i % 2 === 0 ? "left" : "right"}
            />
          ))}
        </div>

        {/* Mobile: featured full-width, rest in horizontal scroll */}
        <div className="md:hidden space-y-5">
          {/* Featured card — full width */}
          <FeaturedTestimonialCard testimonial={featured} />

          {/* Remaining in horizontal scroll */}
          <div
            className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {rest.map((testimonial, i) => (
              <div
                key={testimonial.name}
                className="flex-shrink-0 w-[85vw] max-w-sm snap-start"
              >
                <TestimonialCard
                  testimonial={testimonial}
                  index={i}
                  direction="left"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
