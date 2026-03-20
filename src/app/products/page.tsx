"use client";

import { useState, useCallback, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import confetti from "canvas-confetti";
import { AnimatedSection } from "@/components/animated-section";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  productInquirySchema,
  type ProductInquiryData,
} from "@/lib/validations";
import { submitProductInquiry } from "@/app/actions/submit-lead";
import {
  Check,
  ShoppingBasket,
  X,
  Send,
  CheckCircle2,
} from "lucide-react";

// ─── Product Image Mappings ──────────────────────────────────────────
const productImages: Record<string, string> = {
  // Burger & Buns
  "Brioche Bun": "/images/products/brioche-bun.webp",
  "Vegan Brioche Bun": "/images/products/vegan-bun.webp",
  "Kissing Hot Dogs": "/images/products/kissing-hot-dogs.webp",
  // Sandwich & Rolls
  "White Panini": "/images/products/panini-roll.webp",
  "Seeded Panini": "/images/products/seeded-panini.webp",
  "Turkish Rounds": "/images/products/turkish-roll.webp",
  "The Famous Sofia": "/images/products/the-famous-sofia.webp",
  "Sandwich Bread": "/images/products/sandwich-bread.webp",
  "Heritage Kissing Rolls": "/images/products/heritage-kissing-roll.webp",
  "Challah Rolls": "/images/products/challah-roll.webp",
  "Ciabatta Rolls": "/images/products/ciabatta-rolls.webp",
  "Coloured Bagels": "/images/products/coloured-bagels.webp",
  Focaccia: "/images/products/focaccia.webp",
  // Something Different
  "Fruit Buns": "/images/products/fruit-buns.webp",
  Baguette: "/images/products/baguette.webp",
  Challah: "/images/products/challah.webp",
  "Facile Baguette": "/images/products/facile-baguette.webp",
  // Sourdough
  "Multigrain Tin Loaf": "/images/products/multigrain-sourdough-tin.webp",
  "White Loaf": "/images/products/white-sourdough.webp",
  "Rye Loaf": "/images/products/rye-sourdough.webp",
  "Kalamata Olive Loaf": "/images/products/olive-sourdough.webp",
  "Multigrain Loaf": "/images/products/multigrain-sourdough-loaf.webp",
  "White Tin Loaf": "/images/products/white-sourdough-tin.webp",
  // Jerusalem Bagels
  "All Seeds": "/images/products/jerusalem-bagel-seeds.webp",
  Sesame: "/images/products/jerusalem-bagel-sesame.webp",
  "Poppy Seeds": "/images/products/jerusalem-bagel-poppy.webp",
  // Fresh Baked Cakes
  "Basque Cheesecake": "/images/products/basque-cheesecake.webp",
  "Orange Cake": "/images/products/orange-cake.webp",
  "GF Marzipan Cake": "/images/products/gf-marzipan-cake.webp",
  "GF Walnut Brownies": "/images/products/gf-brownies.webp",
  // Pastry & Sweet
  "Plain Croissant": "/images/products/croissant.webp",
  "Vegan Plain Croissant": "/images/products/vegan-croissant.webp",
  "Chocolate Croissant": "/images/products/chocolate-croissant.webp",
  "Vegan Chocolate Croissant": "/images/products/vegan-choc-croissant.webp",
  "Danish Pastry": "/images/products/vegan-danish.webp",
  "Fruit Danish": "/images/products/fruit-danish.webp",
  "Apple Frangipane": "/images/products/apple-frangipane.webp",
  "Cinnamon Scroll": "/images/products/cinnamon-scroll.webp",
  "Almond Croissant": "/images/products/almond-croissant.webp",
  Escargot: "/images/products/escargot.webp",
  "Chocolate Babka": "/images/products/chocolate-babka.webp",
  "Berry Danish": "/images/products/berry-danish.webp",
  // Gluten Friendly
  "GF Hamburger Bun": "/images/products/gf-roll.webp",
  "GF Seeded Roll": "/images/products/gf-roll.webp",
  "GF Multigrain Loaf": "/images/products/gf-multigrain-loaf.webp",
};

const categoryHeroImages: Record<string, string> = {
  "Burger & Buns": "/images/products/brioche-bun.webp",
  "Sandwich & Rolls": "/images/products/panini-roll.webp",
  "Something Different": "/images/products/challah.webp",
  Sourdough: "/images/products/white-sourdough.webp",
  "Jerusalem Bagels": "/images/products/jerusalem-bagel-seeds.webp",
  "Fresh Baked Cakes": "/images/products/basque-cheesecake.webp",
  "Pastry & Sweet": "/images/products/croissant.webp",
  "Gluten Friendly": "/images/products/gf-roll.webp",
};

// ─── Categories Data ─────────────────────────────────────────────────
const categories = [
  {
    name: "Burger & Buns",
    tagline: "The perfect foundation for every burger",
    description:
      "From classic brioche to adventurous beetroot and charcoal buns. Available in hamburger (100g), kids (60g), slider (40g), cocktail (25g), and hot dog (110g) sizes.",
    gradient: "from-amber-900/40 to-orange-900/30",
    products: [
      "Brioche Bun",
      "Vegan Brioche Bun",
      "Potato Bun",
      "Beetroot Bun",
      "Charcoal Bun",
      "Matcha Green T Bun",
      "Kissing Hot Dogs",
    ],
  },
  {
    name: "Sandwich & Rolls",
    tagline: "Crafted for the perfect sandwich",
    description:
      "A comprehensive range of premium sandwich breads, rolls, and specialty options for cafes, delis, and food service businesses.",
    gradient: "from-yellow-900/40 to-amber-900/30",
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
    gradient: "from-rose-900/40 to-pink-900/30",
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
    gradient: "from-orange-900/40 to-amber-900/30",
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
    gradient: "from-stone-800/40 to-amber-900/30",
    products: ["All Seeds", "Sesame", "Poppy Seeds"],
  },
  {
    name: "Fresh Baked Cakes",
    tagline: "Artisan cakes for your cabinet",
    description:
      "Carefully crafted cakes that bring quality and flavour to your display. Including gluten-free options.",
    gradient: "from-purple-900/40 to-violet-900/30",
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
    gradient: "from-pink-900/40 to-rose-900/30",
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
    gradient: "from-emerald-900/40 to-green-900/30",
    products: ["GF Hamburger Bun", "GF Seeded Roll", "GF Multigrain Loaf"],
  },
];

// ─── Checkmark animation keyframes ─────────────────────────────────
const checkmarkVariants = {
  initial: { scale: 0, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 500,
      damping: 15,
      mass: 0.8,
    },
  },
  exit: { scale: 0, opacity: 0, transition: { duration: 0.15 } },
};

// ─── Product Card Component ──────────────────────────────────────────
function ProductCard({
  product,
  isSelected,
  onToggle,
  index,
}: {
  product: string;
  isSelected: boolean;
  onToggle: (product: string) => void;
  index: number;
}) {
  const imageSrc = productImages[product];

  // Cascading wave: use row position for stagger
  const row = Math.floor(index / 4);
  const col = index % 4;
  const waveDelay = row * 0.08 + col * 0.05;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: waveDelay, ease: "easeOut" }}
    >
      <motion.button
        type="button"
        onClick={() => onToggle(product)}
        whileHover={{ y: -4 }}
        whileTap={{ scale: 0.93 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className={cn(
          "group relative w-full rounded-2xl overflow-hidden bg-card border-2 transition-all duration-300 text-left cursor-pointer min-h-[140px] sm:min-h-0",
          isSelected
            ? "border-gold shadow-lg shadow-gold/20 bg-primary/[0.03]"
            : "border-border/50 hover:border-primary/30 hover:shadow-md hover:shadow-black/5"
        )}
        style={
          isSelected
            ? {
                boxShadow:
                  "0 0 20px oklch(0.76 0.15 75 / 0.25), 0 4px 12px oklch(0.76 0.15 75 / 0.15)",
              }
            : undefined
        }
      >
        {/* Checkmark badge with pulse on entry */}
        <AnimatePresence>
          {isSelected && (
            <motion.div
              variants={checkmarkVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full bg-gold flex items-center justify-center shadow-md"
            >
              <Check className="h-4 w-4 text-white" strokeWidth={3} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Image area */}
        <div className="relative aspect-square overflow-hidden bg-secondary/30">
          {imageSrc ? (
            <>
              <Image
                src={imageSrc}
                alt={product}
                fill
                className={cn(
                  "object-cover transition-transform duration-500 group-hover:scale-105",
                  isSelected && "brightness-95"
                )}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              {/* Warm overlay tint when selected */}
              <AnimatePresence>
                {isSelected && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-gradient-to-t from-amber-800/20 via-amber-600/10 to-transparent pointer-events-none"
                  />
                )}
              </AnimatePresence>
            </>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-warm to-cream flex items-center justify-center p-4">
              {/* Subtle pattern for no-image cards */}
              <div
                className="absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 20% 50%, oklch(0.52 0.14 38) 1px, transparent 1px), radial-gradient(circle at 80% 20%, oklch(0.76 0.15 75) 1px, transparent 1px), radial-gradient(circle at 50% 80%, oklch(0.52 0.14 38) 0.5px, transparent 0.5px)",
                  backgroundSize: "30px 30px, 40px 40px, 20px 20px",
                }}
              />
              <div className="absolute inset-0 opacity-[0.04]" style={{
                backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5 Q40 20 30 35 Q20 20 30 5z' fill='none' stroke='%23c2703e' stroke-width='0.5' opacity='0.5'/%3E%3C/svg%3E\")",
                backgroundSize: "60px 60px",
              }} />
              <span className="relative text-sm font-serif text-foreground/40 text-center leading-tight">
                {product}
              </span>
            </div>
          )}
        </div>

        {/* Product name */}
        <div className="p-3 sm:p-4">
          <h3 className="text-sm font-medium text-foreground leading-tight">
            {product}
          </h3>
        </div>
      </motion.button>
    </motion.div>
  );
}

// ─── Category Section Component ──────────────────────────────────────
function CategorySection({
  category,
  index,
  selectedProducts,
  onToggleProduct,
}: {
  category: (typeof categories)[0];
  index: number;
  selectedProducts: Set<string>;
  onToggleProduct: (product: string) => void;
}) {
  const heroImage = categoryHeroImages[category.name];
  const selectedInCategory = category.products.filter((p) =>
    selectedProducts.has(p)
  ).length;

  return (
    <section className="py-16 first:pt-0">
      {/* Category Header */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, delay: index * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="relative mb-10 rounded-3xl overflow-hidden">
          {/* Background image with warm overlay + subtle parallax via CSS */}
          <div className="relative h-48 sm:h-56 lg:h-64 overflow-hidden">
            {heroImage && (
              <Image
                src={heroImage}
                alt={category.name}
                fill
                className="object-cover scale-110 transition-transform duration-[2s] ease-out hover:scale-100"
                sizes="100vw"
              />
            )}
            <div
              className={`absolute inset-0 bg-gradient-to-r ${category.gradient}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-amber-950/60 via-amber-950/20 to-transparent" />

            {/* Text content over the image */}
            <div className="relative z-10 flex flex-col justify-end h-full p-6 sm:p-8 lg:p-10">
              <div className="flex items-center gap-3 mb-1">
                <p className="text-xs font-medium tracking-[0.2em] uppercase text-white/70">
                  {category.tagline}
                </p>
                {selectedInCategory > 0 && (
                  <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-0.5 rounded-full bg-gold/20 text-gold backdrop-blur-sm border border-gold/20">
                    {selectedInCategory} of {category.products.length} selected
                  </span>
                )}
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-white mb-2">
                {category.name}
              </h2>
              <p className="text-white/80 max-w-2xl leading-relaxed text-sm sm:text-base">
                {category.description}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
        {category.products.map((product, i) => (
          <ProductCard
            key={product}
            product={product}
            isSelected={selectedProducts.has(product)}
            onToggle={onToggleProduct}
            index={i}
          />
        ))}
      </div>
    </section>
  );
}

// ─── Inquiry Form Component ──────────────────────────────────────────
function InquiryForm({
  selectedProducts,
  onRemoveProduct,
}: {
  selectedProducts: Set<string>;
  onRemoveProduct: (product: string) => void;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProductInquiryData>({
    resolver: zodResolver(productInquirySchema),
    values: {
      businessName: "",
      contactName: "",
      phone: "",
      email: "",
      selectedProducts: Array.from(selectedProducts),
      notes: "",
    },
  });

  const onSubmit = async (data: ProductInquiryData) => {
    setServerError(null);

    // Ensure we include latest selected products
    const payload = {
      ...data,
      selectedProducts: Array.from(selectedProducts),
    };

    const result = await submitProductInquiry(payload);

    if (result.success) {
      setSubmitted(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#c2703e", "#d4a574", "#7a9e7e"],
      });
    } else {
      setServerError(
        typeof result.error === "string"
          ? result.error
          : "Something went wrong. Please try again."
      );
    }
  };

  const productsArray = useMemo(
    () => Array.from(selectedProducts),
    [selectedProducts]
  );

  return (
    <AnimatePresence mode="wait">
      {submitted ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-12"
        >
          <CheckCircle2 className="h-16 w-16 text-sage mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-foreground mb-2">
            Thank You!
          </h3>
          <p className="text-muted-foreground">
            We&apos;ve received your product inquiry and will get back to you
            shortly.
          </p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >
          {/* Selected Products Display */}
          <div className="space-y-3">
            <Label>Selected Products</Label>
            <LayoutGroup>
              <div className="flex flex-wrap gap-2">
                <AnimatePresence mode="popLayout">
                  {productsArray.map((product) => {
                    const thumb = productImages[product];
                    return (
                      <motion.span
                        key={product}
                        layout
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.15 } }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        className="inline-flex items-center gap-1.5 text-sm pl-1.5 pr-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
                      >
                        {thumb ? (
                          <span className="relative w-6 h-6 rounded-full overflow-hidden flex-shrink-0 border border-primary/10">
                            <Image
                              src={thumb}
                              alt={product}
                              fill
                              className="object-cover"
                              sizes="24px"
                            />
                          </span>
                        ) : (
                          <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-primary/60">
                            {product.charAt(0)}
                          </span>
                        )}
                        <span className="truncate max-w-[120px] sm:max-w-[180px]">
                          {product}
                        </span>
                        <button
                          type="button"
                          onClick={() => onRemoveProduct(product)}
                          className="hover:bg-primary/20 rounded-full p-0.5 transition-colors ml-0.5 min-w-[20px] min-h-[20px] flex items-center justify-center"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </motion.span>
                    );
                  })}
                </AnimatePresence>
              </div>
            </LayoutGroup>
            {selectedProducts.size === 0 && (
              <p className="text-sm text-muted-foreground">
                No products selected. Please scroll up to select products
                you&apos;re interested in.
              </p>
            )}
            {errors.selectedProducts && (
              <p className="text-sm text-destructive">
                {errors.selectedProducts.message}
              </p>
            )}
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="inq-businessName">Business Name</Label>
              <Input
                id="inq-businessName"
                placeholder="Your business name"
                {...register("businessName")}
              />
              {errors.businessName && (
                <p className="text-sm text-destructive">
                  {errors.businessName.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="inq-contactName">Contact Name</Label>
              <Input
                id="inq-contactName"
                placeholder="Your name"
                {...register("contactName")}
              />
              {errors.contactName && (
                <p className="text-sm text-destructive">
                  {errors.contactName.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="inq-phone">Phone</Label>
              <Input
                id="inq-phone"
                type="tel"
                placeholder="0412 345 678"
                {...register("phone")}
              />
              {errors.phone && (
                <p className="text-sm text-destructive">
                  {errors.phone.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="inq-email">Email</Label>
              <Input
                id="inq-email"
                type="email"
                placeholder="you@business.com"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="inq-notes">Additional Notes</Label>
            <Textarea
              id="inq-notes"
              placeholder="Tell us about quantities, delivery requirements, or any other details..."
              rows={4}
              {...register("notes")}
            />
          </div>

          {serverError && (
            <p className="text-sm text-destructive text-center">
              {serverError}
            </p>
          )}

          <Button
            type="submit"
            size="lg"
            className="w-full text-base"
            disabled={isSubmitting || selectedProducts.size === 0}
          >
            {isSubmitting ? (
              "Sending..."
            ) : (
              <>
                Send Product Inquiry
                <Send className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

// ─── Floating Bar Product Preview ────────────────────────────────────
function FloatingBarPreview({
  selectedProducts,
}: {
  selectedProducts: Set<string>;
}) {
  const productsArray = Array.from(selectedProducts);
  const count = productsArray.length;
  if (count === 0) return null;

  const previewNames = productsArray.slice(0, 2);
  const remaining = count - previewNames.length;

  return (
    <div className="flex items-center gap-3 min-w-0">
      <div className="w-10 h-10 rounded-xl bg-gold/15 flex items-center justify-center flex-shrink-0 border border-gold/20">
        <ShoppingBasket className="h-5 w-5 text-gold" />
      </div>
      <div className="min-w-0">
        <span className="text-sm sm:text-base font-medium text-foreground block truncate">
          {count} {count === 1 ? "product" : "products"} selected
        </span>
        <span className="text-xs text-muted-foreground truncate block max-w-[200px] sm:max-w-[300px]">
          {previewNames.join(", ")}
          {remaining > 0 && ` +${remaining} more`}
        </span>
      </div>
    </div>
  );
}

// ─── Main Page Component ─────────────────────────────────────────────
export default function ProductsPage() {
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(
    new Set()
  );

  const toggleProduct = useCallback((product: string) => {
    setSelectedProducts((prev) => {
      const next = new Set(prev);
      if (next.has(product)) {
        next.delete(product);
      } else {
        next.add(product);
      }
      return next;
    });
  }, []);

  const removeProduct = useCallback((product: string) => {
    setSelectedProducts((prev) => {
      const next = new Set(prev);
      next.delete(product);
      return next;
    });
  }, []);

  const scrollToInquiry = useCallback(() => {
    const el = document.getElementById("inquiry");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-warm via-cream/50 to-background relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 50% 30%, oklch(0.76 0.15 75 / 0.2), transparent)",
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
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-4">
              From traditionally made sourdough with 72+ hours of natural
              fermentation, to brioche buns, Jerusalem bagels, pastries, and
              gluten-friendly options. Everything your business needs.
            </p>
            <p className="text-sm text-muted-foreground/70 max-w-lg mx-auto">
              Click on any products you&apos;re interested in, then send us an
              inquiry at the bottom of the page.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="divide-y divide-border/30">
            {categories.map((cat, i) => (
              <CategorySection
                key={cat.name}
                category={cat}
                index={i}
                selectedProducts={selectedProducts}
                onToggleProduct={toggleProduct}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry Form Section */}
      <section
        id="inquiry"
        className="py-24 relative overflow-hidden"
      >
        {/* Warm background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-cream/50 via-warm/30 to-cream/50" />
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% 50%, oklch(0.76 0.15 75 / 0.15), transparent)",
          }}
        />
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-10">
              <h2 className="font-serif text-3xl sm:text-4xl text-foreground mb-4">
                Product Inquiry
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Select products above, fill in your details, and we&apos;ll get
                back to you with samples and pricing.
              </p>
            </div>
            <div className="bg-card rounded-3xl border border-border/50 p-6 sm:p-10 shadow-sm overflow-hidden relative">
              {/* Gold top border accent */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-gold to-transparent" />
              <InquiryForm
                selectedProducts={selectedProducts}
                onRemoveProduct={removeProduct}
              />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Floating Inquiry Bar */}
      <AnimatePresence>
        {selectedProducts.size > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{
              y: 0,
              opacity: 1,
              transition: {
                type: "spring",
                damping: 20,
                stiffness: 300,
                mass: 0.8,
              },
            }}
            exit={{
              y: 100,
              opacity: 0,
              transition: { duration: 0.2 },
            }}
            className="fixed bottom-0 left-0 right-0 z-50"
          >
            <div
              className="bg-card/95 backdrop-blur-lg border-t-2 border-gold/40"
              style={{
                boxShadow:
                  "0 -8px 30px oklch(0.76 0.15 75 / 0.1), 0 -2px 10px oklch(0.25 0.04 45 / 0.08)",
              }}
            >
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between gap-4">
                <FloatingBarPreview selectedProducts={selectedProducts} />
                <motion.button
                  type="button"
                  onClick={scrollToInquiry}
                  animate={{
                    boxShadow: [
                      "0 0 0 0 oklch(0.76 0.15 75 / 0)",
                      "0 0 0 6px oklch(0.76 0.15 75 / 0.15)",
                      "0 0 0 0 oklch(0.76 0.15 75 / 0)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "rounded-full px-6 sm:px-8 text-sm sm:text-base flex-shrink-0 min-h-[44px]"
                  )}
                >
                  Send Inquiry
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
