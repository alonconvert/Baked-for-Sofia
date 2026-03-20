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
  initials: string;
  initialsBg: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Sarah Mitchell",
    role: "Owner",
    business: "The Morning Press",
    suburb: "Fitzroy",
    quote:
      "We've been ordering from Baked for Sofia for over three years now. The sourdough is hands-down the best we've ever served \u2014 our customers constantly ask where we get our bread. The overnight delivery means it's always fresh when we open.",
    initials: "SM",
    initialsBg: "from-primary/20 to-gold/20",
  },
  {
    name: "James Nguyen",
    role: "Head Chef",
    business: "Ember & Grain",
    suburb: "South Melbourne",
    quote:
      "What sets BFS apart is their consistency. Every brioche bun, every croissant, every single time \u2014 the quality never drops. They've been a rock-solid partner for our restaurant.",
    initials: "JN",
    initialsBg: "from-sage/20 to-primary/15",
  },
  {
    name: "Rachel Goldstein",
    role: "Co-owner",
    business: "The Deli Counter",
    suburb: "St Kilda",
    quote:
      "Switching to Baked for Sofia was the best decision we made last year. Their gluten-free range actually tastes incredible, and our GF customers can finally enjoy proper bread. Dov and the team truly care.",
    initials: "RG",
    initialsBg: "from-gold/20 to-warm",
  },
  {
    name: "Tom & Lisa Chen",
    role: "Founders",
    business: "Double Shot Coffee",
    suburb: "Richmond",
    quote:
      "The Jerusalem bagels are a game-changer. We can't keep them in stock. BFS understood exactly what we needed and even customised sizes for our menu. Real partners, not just suppliers.",
    initials: "TC",
    initialsBg: "from-primary/15 to-sage/20",
  },
  {
    name: "Marcus Webb",
    role: "Operations Manager",
    business: "Urban Bites Catering",
    suburb: "Melbourne",
    quote:
      "We serve over 500 events a year and rely on BFS for all our bread and pastry needs. Their delivery has never let us down \u2014 not once in two years. That kind of reliability is rare.",
    initials: "MW",
    initialsBg: "from-gold/15 to-primary/20",
  },
];

function StarRating() {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className="h-4 w-4 text-gold fill-gold"
        />
      ))}
    </div>
  );
}

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: Testimonial;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      className="group"
    >
      <div className="relative h-full rounded-2xl bg-card border border-border/50 p-7 sm:p-8 hover:border-gold/25 hover:shadow-lg hover:shadow-gold/5 transition-all duration-300">
        {/* Decorative quote mark */}
        <div className="absolute top-5 right-6 opacity-[0.06]">
          <Quote className="h-16 w-16 text-primary" />
        </div>

        {/* Gold accent line at top */}
        <div className="absolute top-0 left-8 right-8 h-[2px] rounded-full bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

        {/* Stars */}
        <StarRating />

        {/* Quote */}
        <blockquote className="mt-4 mb-6 relative">
          <p className="text-foreground leading-relaxed text-[0.95rem]">
            &ldquo;{testimonial.quote}&rdquo;
          </p>
        </blockquote>

        {/* Author */}
        <div className="flex items-center gap-3.5 pt-4 border-t border-border/30">
          {/* Initials avatar */}
          <div
            className={`flex-shrink-0 w-11 h-11 rounded-full bg-gradient-to-br ${testimonial.initialsBg} flex items-center justify-center border border-border/20`}
          >
            <span className="text-sm font-semibold text-foreground/70">
              {testimonial.initials}
            </span>
          </div>
          <div>
            <p className="font-semibold text-foreground text-sm">
              {testimonial.name}
            </p>
            <p className="text-muted-foreground text-xs">
              {testimonial.role}, {testimonial.business}{" "}
              <span className="text-muted-foreground/60">
                ({testimonial.suburb})
              </span>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function StatBar() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 mb-12 py-5 px-6 rounded-2xl bg-gradient-to-r from-warm/40 via-cream to-warm/40 border border-border/30"
    >
      <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
          <Users className="h-4 w-4 text-primary" />
        </div>
        <div>
          <p className="text-2xl font-serif font-bold text-foreground">400+</p>
          <p className="text-xs text-muted-foreground">Businesses served</p>
        </div>
      </div>
      <div className="hidden sm:block w-px h-10 bg-border/50" />
      <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-xl bg-gold/10 flex items-center justify-center">
          <Star className="h-4 w-4 text-gold fill-gold" />
        </div>
        <div>
          <p className="text-2xl font-serif font-bold text-foreground">5.0</p>
          <p className="text-xs text-muted-foreground">Average rating</p>
        </div>
      </div>
      <div className="hidden sm:block w-px h-10 bg-border/50" />
      <div className="text-center sm:text-left">
        <p className="text-sm font-medium text-foreground">
          Trusted across Melbourne
        </p>
        <p className="text-xs text-muted-foreground">
          Cafes, restaurants &amp; caterers
        </p>
      </div>
    </motion.div>
  );
}

export function Testimonials() {
  return (
    <section className="py-24 sm:py-32 bg-background relative overflow-hidden">
      {/* Subtle decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <AnimatedSection className="text-center mb-10">
          <p className="text-xs font-medium tracking-[0.25em] uppercase text-primary mb-4">
            What Our Partners Say
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl text-foreground mb-4 leading-tight">
            Trusted by Melbourne&apos;s
            <br />
            <span className="text-primary">Best Businesses</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            From neighbourhood cafes to large-scale caterers, hear why businesses
            across Melbourne choose Baked for Sofia as their bread and pastry partner.
          </p>
        </AnimatedSection>

        {/* Stat bar */}
        <StatBar />

        {/* Testimonial cards - scrollable on mobile, grid on desktop */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {testimonials.map((testimonial, i) => (
            <TestimonialCard
              key={testimonial.name}
              testimonial={testimonial}
              index={i}
            />
          ))}
        </div>

        {/* Mobile horizontal scroll */}
        <div
          className="md:hidden flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {testimonials.map((testimonial, i) => (
            <div
              key={testimonial.name}
              className="flex-shrink-0 w-[85vw] max-w-sm snap-start"
            >
              <TestimonialCard testimonial={testimonial} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
