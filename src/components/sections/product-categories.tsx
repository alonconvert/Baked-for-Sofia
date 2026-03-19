"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/animated-section";

const categories = [
  {
    name: "Burger & Buns",
    highlight: "6 varieties",
    description:
      "Brioche, vegan brioche, potato, beetroot, charcoal, and matcha. From 25g cocktail to 110g hot dog.",
    gradient: "from-amber-50 to-orange-50",
    accentColor: "text-amber-700",
    borderHover: "hover:border-amber-300/60",
    image: "/images/products/brioche-bun.webp",
  },
  {
    name: "Sandwich & Rolls",
    highlight: "12+ options",
    description:
      "Ciabatta, panini, Turkish rounds, The Famous Sofia, heritage rolls, bagels, focaccia, and more.",
    gradient: "from-yellow-50 to-amber-50",
    accentColor: "text-yellow-700",
    borderHover: "hover:border-yellow-300/60",
    image: "/images/products/panini-roll.webp",
  },
  {
    name: "Something Different",
    highlight: "Unique bakes",
    description:
      "Fruit buns, olive baguette, pain de mie, challah, brioche tin loaf, and our facile baguette.",
    gradient: "from-rose-50 to-pink-50",
    accentColor: "text-rose-700",
    borderHover: "hover:border-rose-300/60",
    image: "/images/products/baguette.webp",
  },
  {
    name: "Sourdough",
    highlight: "72+ hour fermentation",
    description:
      "Multigrain, white, rye, kalamata olive, and tin loaves. Natural fermentation for exceptional flavour.",
    gradient: "from-orange-50 to-amber-50",
    accentColor: "text-orange-700",
    borderHover: "hover:border-orange-300/60",
    image: "/images/products/white-sourdough.webp",
  },
  {
    name: "Jerusalem Bagels",
    highlight: "Hand crafted",
    description:
      "Oven baked and rich in olive oil. Available in all seeds, sesame, and poppy seed varieties.",
    gradient: "from-stone-100 to-amber-50",
    accentColor: "text-stone-700",
    borderHover: "hover:border-stone-300/60",
    image: "/images/products/jerusalem-bagel-seeds.webp",
  },
  {
    name: "Fresh Baked Cakes",
    highlight: "Artisan cakes",
    description:
      "Basque cheesecake, orange cake, gluten-free marzipan cake, and walnut brownies.",
    gradient: "from-purple-50 to-violet-50",
    accentColor: "text-purple-700",
    borderHover: "hover:border-purple-300/60",
    image: "/images/products/basque-cheesecake.webp",
  },
  {
    name: "Pastry & Sweet",
    highlight: "11 varieties",
    description:
      "Croissants, danishes, almond croissant, escargot, chocolate babka, cinnamon scroll, and more.",
    gradient: "from-pink-50 to-rose-50",
    accentColor: "text-pink-700",
    borderHover: "hover:border-pink-300/60",
    image: "/images/products/croissant.webp",
  },
  {
    name: "Gluten Friendly",
    highlight: "Dietary range",
    description:
      "GF hamburger buns, seeded rolls, and multigrain loaf. No compromise on taste or texture.",
    gradient: "from-emerald-50 to-green-50",
    accentColor: "text-emerald-700",
    borderHover: "hover:border-emerald-300/60",
    image: "/images/products/gf-roll.webp",
  },
];

export function ProductCategories() {
  return (
    <section className="py-24 sm:py-32 bg-cream/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <p className="text-xs font-medium tracking-[0.25em] uppercase text-primary mb-3">
              Our Range
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl text-foreground">
              Product Categories
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              From artisan sourdough to delicate pastries, explore our full range
              of handcrafted baked goods.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((cat, i) => (
            <AnimatedSection key={cat.name} delay={i * 0.08}>
              <Link href="/products">
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={`group rounded-2xl overflow-hidden bg-card border border-border/50 ${cat.borderHover} transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-black/5`}
                >
                  <div
                    className={`h-36 bg-gradient-to-br ${cat.gradient} flex items-center justify-center relative overflow-hidden`}
                  >
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="text-base font-semibold text-foreground leading-tight">
                        {cat.name}
                      </h3>
                    </div>
                    <span
                      className={`inline-block text-[11px] font-medium tracking-wide uppercase ${cat.accentColor} bg-current/5 px-2 py-0.5 rounded-full mb-2.5`}
                    >
                      {cat.highlight}
                    </span>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                </motion.div>
              </Link>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.4}>
          <div className="text-center mt-12">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-primary font-medium hover:underline underline-offset-4 transition-all"
            >
              Explore all products
              <span className="text-lg">&rarr;</span>
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
