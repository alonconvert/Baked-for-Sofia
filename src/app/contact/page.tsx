"use client";

import { AnimatedSection } from "@/components/animated-section";
import { ContactForm } from "@/components/sections/contact-form";
import { Phone, Mail, Clock, Instagram, Facebook, MapPin } from "lucide-react";

export default function ContactPage() {
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
              Wholesale Inquiries
            </p>
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl text-foreground mb-6">
              Get in Touch
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Ready to partner with Melbourne&apos;s artisan wholesale bakery?
              We&apos;d love to hear from you.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Form */}
            <div className="lg:col-span-3">
              <AnimatedSection>
                <div className="bg-card rounded-3xl border border-border/50 p-6 sm:p-10 shadow-sm">
                  <h2 className="font-serif text-2xl text-foreground mb-2">
                    Wholesale Inquiry
                  </h2>
                  <p className="text-muted-foreground mb-8">
                    Fill in the form below and we&apos;ll get back to you
                    promptly.
                  </p>
                  <ContactForm />
                </div>
              </AnimatedSection>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-2">
              <AnimatedSection direction="right" delay={0.2}>
                <div className="space-y-8">
                  {/* Direct Contact */}
                  <div>
                    <h3 className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground/60 mb-5">
                      Contact Information
                    </h3>
                    <ul className="space-y-4">
                      <li>
                        <a
                          href="tel:0399420881"
                          className="flex items-center gap-4 group"
                        >
                          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/10 to-gold/10 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                            <Phone className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">
                              (03) 9942 0881
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Give us a call
                            </p>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a
                          href="mailto:orders@bakedforsofia.com"
                          className="flex items-center gap-4 group"
                        >
                          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/10 to-gold/10 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                            <Mail className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">
                              orders@bakedforsofia.com
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Email us anytime
                            </p>
                          </div>
                        </a>
                      </li>
                      <li className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/10 to-gold/10 flex items-center justify-center flex-shrink-0">
                          <Clock className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">
                            9am &ndash; 4:30pm
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Monday &ndash; Friday
                          </p>
                        </div>
                      </li>
                      <li className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/10 to-gold/10 flex items-center justify-center flex-shrink-0">
                          <MapPin className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">
                            Melbourne, Australia
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Delivering city-wide & beyond
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>

                  {/* Social */}
                  <div>
                    <h3 className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground/60 mb-5">
                      Follow Us
                    </h3>
                    <div className="flex gap-3">
                      <a
                        href="https://www.instagram.com/bakedforsofia/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-2xl bg-card border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/20 hover:shadow-md transition-all"
                        aria-label="Instagram"
                      >
                        <Instagram className="h-5 w-5" />
                      </a>
                      <a
                        href="https://www.facebook.com/bakedforsofia/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-2xl bg-card border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/20 hover:shadow-md transition-all"
                        aria-label="Facebook"
                      >
                        <Facebook className="h-5 w-5" />
                      </a>
                    </div>
                  </div>

                  {/* Samples card */}
                  <div className="rounded-2xl bg-gradient-to-br from-warm to-cream border border-border/30 p-7">
                    <h3 className="font-serif text-lg text-foreground mb-2">
                      Request Samples
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Not sure what&apos;s right for your business? We&apos;re
                      happy to provide samples and a full price list so you can
                      try before you commit. Just mention it in your inquiry.
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
