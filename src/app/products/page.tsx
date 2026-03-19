"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedSection } from "@/components/animated-section";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
  {
    name: "Burger & Buns",
    tagline: "The perfect foundation for every burger",
    description:
      "From classic brioche to adventurous beetroot and charcoal buns. Available in hamburger (100g), kids (60g), slider (40g), cocktail (25g), and hot dog (110g) sizes.",
    gradient: "from-amber-50 to-orange-50",
    products: [
      "Brioche Bun",
      "Vegan Brioche Bun",
      "Potato Bun",
      "Beetroot Bun",
      "Charcoal Bun",
      "Matcha Green T Bun",
    ],
  },
  {
    name: "Sandwich & Rolls",
    tagline: "Crafted for the perfect sandwich",
    description:
      "A comprehensive range of premium sandwich breads, rolls, and specialty options for cafes, delis, and food service businesses.",
    gradient: "from-yellow-50 to-amber-50",
    products: [
      "Ciabatta Loaf",
      "White Panini",
      "Seeded Panini",
      "Turkish Rounds",
      "The Famous Sofia",
      "Sandwich Bread",
      "Heritage Kissing Rolls",
      "Challah Rolls",
      "Ciabatta Rolls",
      "Coloured Bagels",
      "English Muffins",
      "Focaccia",
    ],
  },
  {
    name: "Something Different",
    tagline: "When ordinary won't do",
    description:
      "Unique bakes that set your menu apart. From French-style baguettes to enriched loaves, these specialty items add character to any offering.",
    gradient: "from-rose-50 to-pink-50",
    products: [
      "Fruit Buns",
      "Fruit Loaf",
      "Olive Baguette",
      "Baguette",
      "Mini Baguette",
      "Pain de Mie",
      "Vegan Tin Loaf",
      "Brioche Tin Loaf",
      "Challah",
      "Facile Baguette",
    ],
  },
  {
    name: "Sourdough",
    tagline: "Over 72 hours of natural fermentation",
    description:
      "Our signature sourdough range undergoes a 72+ hour natural fermentation process, developing deep flavour and the perfect crust-to-crumb ratio.",
    gradient: "from-orange-50 to-amber-50",
    products: [
      "Multigrain Tin Loaf",
      "White Loaf",
      "Rye Loaf",
      "Kalamata Olive Loaf",
      "Multigrain Loaf",
      "White Tin Loaf",
    ],
  },
  {
    name: "Jerusalem Bagels",
    tagline: "Hand crafted, oven baked, rich in olive oil",
    description:
      "Our Jerusalem bagels are hand shaped, oven baked, and enriched with premium olive oil for an authentic, pillowy texture with a golden crust.",
    gradient: "from-stone-100 to-amber-50",
    products: ["All Seeds", "Sesame", "Poppy Seeds"],
  },
  {
    name: "Fresh Baked Cakes",
    tagline: "Artisan cakes for your cabinet",
    description:
      "Carefully crafted cakes that bring quality and flavour to your display. Including gluten-free options.",
    gradient: "from-purple-50 to-violet-50",
    products: [
      "Basque Cheesecake",
      "Orange Cake",
      "GF Marzipan Cake",
      "GF Walnut Brownies",
    ],
  },
  {
    name: "Pastry & Sweet",
    tagline: "Handcrafted with premium butter",
    description:
      "Flaky, golden pastries made with the finest butter and ingredients. From classic croissants to indulgent babka, baked fresh daily.",
    gradient: "from-pink-50 to-rose-50",
    products: [
      "Plain Croissant",
      "Vegan Plain Croissant",
      "Chocolate Croissant",
      "Vegan Chocolate Croissant",
      "Danish Pastry",
      "Fruit Danish",
      "Apple Frangipane",
      "Cinnamon Scroll",
      "Almond Croissant",
      "Escargot",
      "Chocolate Babka",
      "Berry Danish",
    ],
  },
  {
    name: "Gluten Friendly",
    tagline: "No compromise on taste or texture",
    description:
      "A thoughtful range of gluten-free bakes crafted for those with dietary needs, without sacrificing the quality and flavour you expect.",
    gradient: "from-emerald-50 to-green-50",
    products: [
      "GF Hamburger Bun",
      "GF Seeded Roll",
      "GF Multigrain Loaf",
    ],
  },
];

function CategoryCard({
  category,
  index,
}: {
  category: (typeof categories)[0];
  index: number;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <AnimatedSection delay={index * 0.08}>
      <motion.div
        layout
        className="rounded-3xl overflow-hidden bg-card border border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-lg hover:shadow-black/5"
      >
        <div
          className={`h-32 bg-gradient-to-br ${category.gradient} flex items-center justify-center relative`}
        >
          <span className="text-4xl font-serif text-foreground/[0.06] text-center px-4">
            {category.name}
          </span>
        </div>

        <div className="p-6 sm:p-8">
          <h2 className="font-serif text-2xl text-foreground mb-1">
            {category.name}
          </h2>
          <p className="text-sm text-primary font-medium mb-3">
            {category.tagline}
          </p>
          <p className="text-muted-foreground leading-relaxed mb-5">
            {category.description}
          </p>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            {isExpanded ? "Hide" : "View"} all {category.products.length}{" "}
            products
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="h-4 w-4" />
            </motion.div>
          </button>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="pt-5 mt-5 border-t border-border/50">
                  <div className="flex flex-wrap gap-2">
                    {category.products.map((product) => (
                      <span
                        key={product}
                        className="text-sm px-3 py-1.5 rounded-full bg-secondary/60 text-secondary-foreground border border-border/30"
                      >
                        {product}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatedSection>
  );
}

export default function ProductsPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-warm via-cream/50 to-background relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 60% 40% at 50% 30%, oklch(0.76 0.15 75 / 0.2), transparent)",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <p className="text-xs font-medium tracking-[0.25em] uppercase text-primary mb-3">
              Hand crafted, baked fresh daily
            </p>
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl text-foreground mb-6">
              Our Products
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              From traditionally made sourdough with 72+ hours of natural
              fermentation, to brioche buns, Jerusalem bagels, pastries, and
              gluten-friendly options. Everything your business needs.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories.map((cat, i) => (
              <CategoryCard key={cat.name} category={cat} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-cream/50">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="font-serif text-3xl sm:text-4xl text-foreground mb-4">
              Interested in Our Products?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Baking authentic, fresh to order, and crafting products to your
              satisfaction. Get in touch to request samples and pricing.
            </p>
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ size: "lg" }),
                "text-base px-10 h-12 rounded-full"
              )}
            >
              Get in Touch
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
