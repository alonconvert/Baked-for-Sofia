"use client";

import { motion, useInView } from "framer-motion";
import { Sprout, HandHeart, ShieldCheck, Wheat } from "lucide-react";
import { useRef } from "react";

const valueItems = [
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
];

function SpinOnViewIcon({ icon: Icon, className }: { icon: typeof HandHeart; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      animate={isInView ? { rotate: [0, 360] } : { rotate: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
    >
      <Icon className={className} />
    </motion.div>
  );
}

export function SupportingLocal() {
  return (
    <section className="py-24 sm:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Green card - slides in from left with bounce */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 14,
              mass: 1,
            }}
          >
            <div className="rounded-3xl bg-gradient-to-br from-cream via-warm/40 to-cream p-10 sm:p-14 border border-sage/15 relative overflow-hidden">
              {/* Decorative dotted circle element */}
              <div className="absolute top-0 right-0 w-48 h-48 -translate-y-1/2 translate-x-1/2 rounded-full border-2 border-dashed border-gold/15" />
              <div className="absolute top-0 right-0 w-36 h-36 -translate-y-1/3 translate-x-1/3 rounded-full border border-dashed border-sage/10" />

              <div className="relative">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-sage/10 mb-6">
                  <SpinOnViewIcon icon={Sprout} className="h-7 w-7 text-sage" />
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
          </motion.div>

          {/* Value items - stagger in from the right */}
          <div className="space-y-8">
            {valueItems.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.5,
                  delay: 0.15 + i * 0.12,
                  ease: "easeOut",
                }}
                className="flex gap-5 items-start group"
              >
                <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-sage/10 border border-gold/10 flex items-center justify-center group-hover:bg-sage/15 group-hover:border-gold/20 transition-all duration-300">
                  <SpinOnViewIcon icon={item.icon} className="h-5 w-5 text-sage" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1.5">
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
      </div>
    </section>
  );
}
