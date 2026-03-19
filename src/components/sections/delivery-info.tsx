"use client";

import { AnimatedSection } from "@/components/animated-section";
import { Truck, Clock, MapPin } from "lucide-react";

export function DeliveryInfo() {
  return (
    <section className="py-20 sm:py-28 bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Delivered Fresh 6 Days a Week
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-12">
              Straight into your business. We securely deliver your order
              overnight, prior to your business opening hours, so you can
              prepare and serve only the freshest products to your customers.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Truck,
              title: "Daily Delivery",
              text: "Monday to Saturday, delivered before you open.",
            },
            {
              icon: Clock,
              title: "Overnight Service",
              text: "Baked fresh and delivered while Melbourne sleeps.",
            },
            {
              icon: MapPin,
              title: "Across Melbourne",
              text: "Serving cafes, restaurants, and retailers city-wide.",
            },
          ].map((item, i) => (
            <AnimatedSection key={item.title} delay={i * 0.15}>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary-foreground/10 mb-4">
                  <item.icon className="h-7 w-7 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-primary-foreground/70">{item.text}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
