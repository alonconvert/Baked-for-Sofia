"use client";

import { motion, useMotionValue, useTransform, animate, useScroll, type MotionValue } from "framer-motion";
import { useEffect, useRef } from "react";
import { Clock, Users, Leaf } from "lucide-react";

function AnimatedNumber({ target }: { target: number }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);
  const scale = useMotionValue(1);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const controls = animate(count, target, {
            duration: 2.5,
            ease: "easeOut",
            onComplete: () => {
              // Scale pulse on completion
              animate(scale, [1, 1.15, 1], {
                duration: 0.4,
                ease: "easeOut",
              });
            },
          });
          return () => controls.stop();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [count, target, scale]);

  return <motion.span ref={ref} style={{ scale, display: "inline-block" }}>{rounded}</motion.span>;
}

const features = [
  {
    icon: Clock,
    title: "Baked Fresh Daily",
    stat: 6,
    suffix: " Days",
    description:
      "Every loaf, bun, and pastry baked fresh and delivered overnight, before your business opens. Monday to Saturday.",
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
    stat: 100,
    suffix: "%",
    description:
      "All ingredients sourced from local Australian farmers and suppliers, supporting a sustainable economy with every bake.",
  },
];

export function FeatureHighlights() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  return (
    <section ref={sectionRef} className="py-24 sm:py-32 relative overflow-hidden">
      {/* Warm gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-warm/30 to-background" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, i) => (
            <FeatureCard
              key={feature.title}
              feature={feature}
              index={i}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  feature,
  index,
  scrollYProgress,
}: {
  feature: (typeof features)[0];
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  // Subtle parallax: each card shifts slightly differently based on scroll
  const yOffset = useTransform(
    scrollYProgress,
    [0, 1],
    [index * 15, -index * 15]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotate: index % 2 === 0 ? -3 : 3 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: "easeOut",
      }}
      style={{ y: yOffset }}
    >
      <div className="relative text-center p-10 rounded-3xl bg-card/80 backdrop-blur-sm border border-border/50 border-l-[3px] border-l-primary/40 hover:border-primary/20 hover:border-l-primary/70 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-rotate-[0.5deg] hover:scale-[1.02] group">
        <div className="inline-flex items-center justify-center w-18 h-18 rounded-2xl bg-gradient-to-br from-primary/15 to-gold/15 shadow-sm shadow-primary/5 mb-6 group-hover:scale-110 transition-transform duration-300 animate-float-gentle">
          <feature.icon className="h-9 w-9 text-primary" />
        </div>
        {feature.stat ? (
          <p className="text-5xl font-serif animate-shimmer mb-2 drop-shadow-sm">
            <AnimatedNumber target={feature.stat} />
            <span className="text-3xl">{feature.suffix}</span>
          </p>
        ) : null}
        <h3 className="text-xl font-semibold text-foreground mb-3">
          {feature.title}
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          {feature.description}
        </p>
      </div>
    </motion.div>
  );
}
