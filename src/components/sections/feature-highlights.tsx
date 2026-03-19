"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { AnimatedSection } from "@/components/animated-section";
import { Clock, Users, Leaf } from "lucide-react";

function AnimatedNumber({ target }: { target: number }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          animate(count, target, { duration: 2.5, ease: "easeOut" });
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [count, target]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

const features = [
  {
    icon: Clock,
    title: "Baked Fresh Daily",
    stat: null,
    suffix: "",
    description:
      "Every loaf, bun, and pastry baked fresh and delivered overnight, before your business opens. Six days a week, Monday to Saturday.",
  },
  {
    icon: Users,
    title: "Trusted Across Melbourne",
    stat: 400,
    suffix: "+",
    description:
      "From a 25sqm rental space to delivering across Melbourne and beyond. Building lasting partnerships through quality and reliability.",
  },
  {
    icon: Leaf,
    title: "Locally Sourced",
    stat: null,
    suffix: "",
    description:
      "Sourcing from local farmers and suppliers, supporting a sustainable economy while ensuring the highest quality ingredients in every bake.",
  },
];

export function FeatureHighlights() {
  return (
    <section className="py-24 sm:py-32 relative overflow-hidden">
      {/* Warm gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-warm/30 to-background" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, i) => (
            <AnimatedSection key={feature.title} delay={i * 0.15}>
              <div className="relative text-center p-10 rounded-3xl bg-card/80 backdrop-blur-sm border border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 group">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-gold/10 mb-6 group-hover:scale-105 transition-transform duration-300">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                {feature.stat ? (
                  <p className="text-6xl font-serif text-gold mb-2">
                    <AnimatedNumber target={feature.stat} />
                    <span className="text-gold">{feature.suffix}</span>
                  </p>
                ) : null}
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
