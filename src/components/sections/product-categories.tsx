"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/animated-section";

const categories = [
  {
    name: "Sourdough",
    description: "Slowly fermented artisan sourdough bread, crafted with time-honoured techniques.",
    color: "from-amber-100 to-orange-50",
  },
  {
    name: "Burger Buns",
    description: "Brioche buns, vegan buns, and specialty rolls for the perfect burger.",
    color: "from-yellow-100 to-amber-50",
  },
  {
    name: "Pastry",
    description: "Hand-crafted pastries baked fresh daily for cafes and retailers.",
    color: "from-rose-100 to-pink-50",
  },
  {
    name: "Gluten Friendly",
    description: "A wide range of gluten-free bakes without compromising on taste.",
    color: "from-green-100 to-emerald-50",
  },
  {
    name: "Specialty Sandwich Rolls",
    description: "Premium sandwich rolls and loaves for every business need.",
    color: "from-sky-100 to-blue-50",
  },
  {
    name: "Cakes",
    description: "Artisan cakes crafted for quality and flavour.",
    color: "from-purple-100 to-violet-50",
  },
];

export function ProductCategories() {
  return (
    <section className="py-20 sm:py-28 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-14">
            <p className="text-sm font-medium tracking-widest uppercase text-primary mb-2">
              Our Range
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Product Categories
            </h2>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <AnimatedSection key={cat.name} delay={i * 0.1}>
              <Link href="/products">
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="group rounded-2xl overflow-hidden bg-card border border-border hover:border-primary/30 transition-colors cursor-pointer"
                >
                  <div className={`h-36 bg-gradient-to-br ${cat.color} flex items-center justify-center`}>
                    <span className="text-4xl font-bold text-foreground/10 group-hover:text-foreground/20 transition-colors">
                      {cat.name}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-foreground mb-1">
                      {cat.name}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                </motion.div>
              </Link>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.3}>
          <div className="text-center mt-10">
            <Link
              href="/products"
              className="text-primary font-medium hover:underline underline-offset-4"
            >
              View all products →
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
