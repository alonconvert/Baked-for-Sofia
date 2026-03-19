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
          animate(count, target, { duration: 2, ease: "easeOut" });
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
    description:
      "We aim to work closely with our customers to create products that suit their business needs. Delivering 6 days a week, Monday to Saturday.",
  },
  {
    icon: Users,
    title: "Over 400 Customers",
    stat: 400,
    suffix: "+",
    description:
      "Trusted by cafes, restaurants, and retailers across Melbourne. Building long-lasting relationships through quality and reliability.",
  },
  {
    icon: Leaf,
    title: "Supporting Local",
    stat: null,
    description:
      "Sourcing all of our products from local farmers and suppliers, staying true to our values whilst using high-quality ingredients at all times.",
  },
];

export function FeatureHighlights() {
  return (
    <section className="py-20 sm:py-28 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {features.map((feature, i) => (
            <AnimatedSection key={feature.title} delay={i * 0.15}>
              <div className="text-center p-8 rounded-2xl bg-card border border-border hover:border-primary/20 transition-colors">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-5">
                  <feature.icon className="h-7 w-7 text-primary" />
                </div>
                {feature.stat ? (
                  <p className="text-4xl font-bold text-foreground mb-1">
                    <AnimatedNumber target={feature.stat} />
                    {feature.suffix}
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
