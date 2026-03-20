"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { AnimatedSection } from "@/components/animated-section";
import { Truck, Clock, MapPin } from "lucide-react";
import { useRef } from "react";

const deliveryItems = [
  {
    icon: Truck,
    title: "Daily Delivery",
    text: "Monday to Saturday, delivered fresh before you open your doors.",
  },
  {
    icon: Clock,
    title: "Overnight Service",
    text: "Baked fresh in the evening and delivered while Melbourne sleeps.",
  },
  {
    icon: MapPin,
    title: "Across Melbourne",
    text: "Serving cafes, restaurants, and retailers across Melbourne and beyond.",
  },
];

export function DeliveryInfo() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Background image parallax
  const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      {/* Full-width background image with dark overlay + parallax */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <div className="absolute inset-[-10%] w-[120%] h-[120%]">
          <Image
            src="/images/homepage/delivery.webp"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-espresso/85" />
        {/* Subtle texture on top */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
          }}
        />
      </motion.div>

      <div className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Text content and feature cards */}
            <div>
              <div className="mb-12">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5 }}
                  className="text-xs font-medium tracking-[0.25em] uppercase text-gold/70 mb-4"
                >
                  Delivery Service
                </motion.p>
                {/* Dramatic entrance: scale from 120% while fading in */}
                <motion.h2
                  initial={{ opacity: 0, scale: 1.2, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="font-serif text-5xl sm:text-6xl lg:text-7xl text-primary-foreground mb-6"
                >
                  <span className="relative inline-block">
                    6 Days a Week
                    <span className="absolute -bottom-2 left-0 right-0 h-[3px] bg-gradient-to-r from-gold/80 via-gold/50 to-transparent rounded-full" />
                  </span>
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-lg text-primary-foreground/60 leading-relaxed max-w-xl"
                >
                  Straight into your business. We deliver your order overnight,
                  before your business opening hours, so you serve only the
                  freshest products.
                </motion.p>
              </div>

              <div className="space-y-4">
                {deliveryItems.map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{
                      opacity: 0,
                      rotateY: -90,
                      x: -40,
                    }}
                    whileInView={{
                      opacity: 1,
                      rotateY: 0,
                      x: 0,
                    }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{
                      duration: 0.6,
                      delay: 0.4 + i * 0.15,
                      ease: "easeOut",
                    }}
                    style={{ perspective: 600 }}
                  >
                    <div className="flex items-start gap-5 p-5 rounded-2xl bg-primary-foreground/[0.05] border border-gold/15 backdrop-blur-sm hover:border-gold/30 hover:shadow-lg hover:shadow-gold/5 transition-all duration-300">
                      <div className="flex-shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gold/15 shadow-sm shadow-gold/10">
                        <item.icon className="h-6 w-6 text-gold" />
                      </div>
                      <div>
                        <h3 className="text-base font-semibold mb-1 text-primary-foreground">
                          {item.title}
                        </h3>
                        <p className="text-sm text-primary-foreground/50 leading-relaxed">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right: Prominent delivery image */}
            <AnimatedSection direction="right" delay={0.15}>
              <div className="relative rounded-2xl overflow-hidden aspect-[3/4] border border-primary-foreground/[0.1] shadow-2xl shadow-black/30">
                <Image
                  src="/images/homepage/delivery.webp"
                  alt="Baked for Sofia delivery"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                {/* Soft vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/30 via-transparent to-espresso/10" />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
