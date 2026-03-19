"use client";

import { AnimatedSection } from "@/components/animated-section";
import { Truck, Clock, MapPin } from "lucide-react";

export function DeliveryInfo() {
  return (
    <section className="py-24 sm:py-32 bg-espresso text-primary-foreground relative overflow-hidden">
      {/* Subtle texture */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-xs font-medium tracking-[0.25em] uppercase text-gold/70 mb-4">
              Delivery Service
            </p>
            <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl text-primary-foreground mb-6">
              6 Days a Week
            </h2>
            <p className="text-lg text-primary-foreground/60 leading-relaxed max-w-xl mx-auto">
              Straight into your business. We deliver your order overnight, before
              your business opening hours, so you serve only the freshest
              products.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
            <AnimatedSection key={item.title} delay={i * 0.15}>
              <div className="text-center p-8 rounded-2xl bg-primary-foreground/[0.05] border border-primary-foreground/[0.08] backdrop-blur-sm">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gold/10 mb-5">
                  <item.icon className="h-7 w-7 text-gold" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-primary-foreground">
                  {item.title}
                </h3>
                <p className="text-primary-foreground/50 leading-relaxed">
                  {item.text}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
