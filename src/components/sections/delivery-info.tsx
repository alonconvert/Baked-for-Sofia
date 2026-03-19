"use client";

import Image from "next/image";
import { AnimatedSection } from "@/components/animated-section";
import { Truck, Clock, MapPin } from "lucide-react";

export function DeliveryInfo() {
  return (
    <section className="relative overflow-hidden">
      {/* Full-width background image with dark overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/homepage/delivery.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-espresso/85" />
        {/* Subtle texture on top */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
          }}
        />
      </div>

      <div className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Text content and feature cards */}
            <div>
              <AnimatedSection>
                <div className="mb-12">
                  <p className="text-xs font-medium tracking-[0.25em] uppercase text-gold/70 mb-4">
                    Delivery Service
                  </p>
                  <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl text-primary-foreground mb-6">
                    <span className="relative inline-block">
                      6 Days a Week
                      <span className="absolute -bottom-2 left-0 right-0 h-[3px] bg-gradient-to-r from-gold/80 via-gold/50 to-transparent rounded-full" />
                    </span>
                  </h2>
                  <p className="text-lg text-primary-foreground/60 leading-relaxed max-w-xl">
                    Straight into your business. We deliver your order overnight,
                    before your business opening hours, so you serve only the
                    freshest products.
                  </p>
                </div>
              </AnimatedSection>

              <div className="space-y-4">
                {[
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
                ].map((item, i) => (
                  <AnimatedSection key={item.title} delay={i * 0.12}>
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
                  </AnimatedSection>
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
