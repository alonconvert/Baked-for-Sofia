"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/animated-section";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
  {
    name: "Sourdough",
    description:
      "Our signature range of slowly fermented artisan sourdough bread. Crafted using traditional techniques with long fermentation times for exceptional flavour and texture. Available in a variety of shapes and sizes to suit your business.",
    color: "from-amber-100 to-orange-50",
  },
  {
    name: "Burger Buns",
    description:
      "From classic brioche buns to vegan options, our burger buns are soft, flavourful, and built to hold up to the juiciest burgers. Custom sizes and varieties available for your menu.",
    color: "from-yellow-100 to-amber-50",
  },
  {
    name: "Pastry",
    description:
      "Hand-crafted pastries baked fresh daily. Croissants, danishes, scrolls, and more — made with premium butter and the finest ingredients for cafes and retailers across Melbourne.",
    color: "from-rose-100 to-pink-50",
  },
  {
    name: "Gluten Friendly",
    description:
      "A large range of gluten-free bakes that never compromise on taste or texture. From bread loaves to rolls and sweet treats, crafted for those with dietary needs.",
    color: "from-green-100 to-emerald-50",
  },
  {
    name: "Specialty Sandwich Rolls",
    description:
      "Premium sandwich rolls, loaves, and specialty breads designed for cafes, delis, and food service. Consistent quality, delivered fresh every day.",
    color: "from-sky-100 to-blue-50",
  },
  {
    name: "Cakes",
    description:
      "Artisan cakes crafted with care. From everyday favourites to seasonal specials, our cakes bring quality and flavour to your display cabinet.",
    color: "from-purple-100 to-violet-50",
  },
];

export default function ProductsPage() {
  return (
    <>
      <section className="pt-28 pb-16 bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <p className="text-sm font-medium tracking-widest uppercase text-primary mb-2">
              Hand crafted, fresh baked daily
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Our Products
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Creating products to round up all your business needs in one
              place. From traditionally made sourdough to a variety of buns,
              bagels, pastries, vegan bread, and gluten friendly options.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {categories.map((cat, i) => (
              <AnimatedSection key={cat.name} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="rounded-2xl overflow-hidden bg-card border border-border hover:border-primary/30 transition-colors"
                >
                  <div
                    className={`h-44 bg-gradient-to-br ${cat.color} flex items-center justify-center`}
                  >
                    <span className="text-5xl font-bold text-foreground/10">
                      {cat.name}
                    </span>
                  </div>
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-foreground mb-2">
                      {cat.name}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary/30">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Interested in Our Products?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Baking authentique, fresh to order &amp; crafting a unique product
              to your satisfaction. Get in touch to request samples and pricing.
            </p>
            <Link href="/contact" className={cn(buttonVariants({ size: "lg" }), "text-base px-8")}>
              Get in Touch
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
