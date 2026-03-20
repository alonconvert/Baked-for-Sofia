"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { AnimatedSection } from "@/components/animated-section";
import { useRef, MouseEvent } from "react";

const categories = [
  {
    name: "Burger & Buns",
    highlight: "6 varieties",
    description:
      "Brioche, vegan brioche, potato, beetroot, charcoal, and matcha. From 25g cocktail to 110g hot dog.",
    image: "/images/products/brioche-bun.webp",
  },
  {
    name: "Sandwich & Rolls",
    highlight: "12+ options",
    description:
      "Ciabatta, panini, Turkish rounds, The Famous Sofia, heritage rolls, bagels, focaccia, and more.",
    image: "/images/products/panini-roll.webp",
  },
  {
    name: "Something Different",
    highlight: "Unique bakes",
    description:
      "Fruit buns, olive baguette, pain de mie, challah, brioche tin loaf, and our facile baguette.",
    image: "/images/products/challah.webp",
  },
  {
    name: "Sourdough",
    highlight: "72+ hour fermentation",
    description:
      "Multigrain, white, rye, kalamata olive, and tin loaves. Natural fermentation for exceptional flavour.",
    image: "/images/products/white-sourdough.webp",
  },
  {
    name: "Jerusalem Bagels",
    highlight: "Hand crafted",
    description:
      "Oven baked and rich in olive oil. Available in all seeds, sesame, and poppy seed varieties.",
    image: "/images/products/jerusalem-bagel-seeds.webp",
  },
  {
    name: "Fresh Baked Cakes",
    highlight: "Artisan cakes",
    description:
      "Basque cheesecake, orange cake, gluten-free marzipan cake, and walnut brownies.",
    image: "/images/products/basque-cheesecake.webp",
  },
  {
    name: "Pastry & Sweet",
    highlight: "11 varieties",
    description:
      "Croissants, danishes, almond croissant, escargot, chocolate babka, cinnamon scroll, and more.",
    image: "/images/products/croissant.webp",
  },
  {
    name: "Gluten Friendly",
    highlight: "Dietary range",
    description:
      "GF hamburger buns, seeded rolls, and multigrain loaf. No compromise on taste or texture.",
    image: "/images/products/gf-roll.webp",
  },
];

function TiltCard({ cat, index }: { cat: (typeof categories)[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 30 });
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    rotateX.set((y - centerY) / centerY * -6);
    rotateY.set((x - centerX) / centerX * 6);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: "easeOut",
      }}
    >
      <Link href={`/products#${cat.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX: springRotateX,
            rotateY: springRotateY,
            perspective: 800,
            transformStyle: "preserve-3d",
          }}
          whileHover={{ y: -6, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="group rounded-2xl overflow-hidden bg-card border border-border/50 hover:border-primary/30 transition-all duration-300 cursor-pointer hover:shadow-xl hover:shadow-black/10"
        >
          {/* Image hero area */}
          <div className="relative h-52 sm:h-56 lg:h-52 xl:h-56 overflow-hidden">
            <Image
              src={cat.image}
              alt={cat.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
            />
            {/* Gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            {/* Shine overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/0 to-white/0 group-hover:via-white/10 group-hover:to-white/5 transition-all duration-700" />
            {/* Text overlay on image */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <span className="inline-block text-[10px] font-semibold tracking-wider uppercase text-white bg-gold/80 backdrop-blur-sm px-2.5 py-1 rounded-full mb-2 shadow-sm">
                {cat.highlight}
              </span>
              <h3 className="text-lg font-semibold text-white leading-tight">
                {cat.name}
              </h3>
            </div>
          </div>
          {/* Description below */}
          <div className="p-4">
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
              {cat.description}
            </p>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

export function ProductCategories() {
  return (
    <section className="py-24 sm:py-32 bg-cream/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <p className="text-xs font-medium tracking-[0.25em] uppercase text-primary mb-3">
              Our Range
            </p>
            <motion.h2
              className="font-serif text-4xl sm:text-5xl text-foreground overflow-hidden"
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              whileInView={{ clipPath: "inset(0 0% 0 0)" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
              Product Categories
            </motion.h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              From artisan sourdough to delicate pastries, explore our full range
              of handcrafted baked goods.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((cat, i) => (
            <TiltCard key={cat.name} cat={cat} index={i} />
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
