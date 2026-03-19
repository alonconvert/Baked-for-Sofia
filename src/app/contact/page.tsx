"use client";

import { AnimatedSection } from "@/components/animated-section";
import { ContactForm } from "@/components/sections/contact-form";
import { Phone, Mail, Clock, Instagram, Facebook } from "lucide-react";

export default function ContactPage() {
  return (
    <>
      <section className="pt-28 pb-16 bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <p className="text-sm font-medium tracking-widest uppercase text-primary mb-2">
              Wholesale Inquiries
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Get in Touch
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Ready to partner with Melbourne&apos;s artisan wholesale bakery?
              Fill out the form below or reach out directly.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3">
              <AnimatedSection>
                <div className="bg-card rounded-2xl border border-border p-6 sm:p-8">
                  <h2 className="text-2xl font-bold text-foreground mb-6">
                    Wholesale Inquiry Form
                  </h2>
                  <ContactForm />
                </div>
              </AnimatedSection>
            </div>

            <div className="lg:col-span-2">
              <AnimatedSection direction="right" delay={0.2}>
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">
                      Contact Information
                    </h3>
                    <ul className="space-y-4">
                      <li>
                        <a
                          href="tel:0399420881"
                          className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                        >
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <Phone className="h-5 w-5 text-primary" />
                          </div>
                          <span>(03) 9942 – 0881</span>
                        </a>
                      </li>
                      <li>
                        <a
                          href="mailto:orders@BakedforSofia.com"
                          className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                        >
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <Mail className="h-5 w-5 text-primary" />
                          </div>
                          <span>orders@BakedforSofia.com</span>
                        </a>
                      </li>
                      <li className="flex items-center gap-3 text-muted-foreground">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Clock className="h-5 w-5 text-primary" />
                        </div>
                        <span>Delivery: Mon – Sat</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">
                      Follow Us
                    </h3>
                    <div className="flex gap-3">
                      <a
                        href="https://www.instagram.com/bakedforsofia/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                        aria-label="Instagram"
                      >
                        <Instagram className="h-5 w-5" />
                      </a>
                      <a
                        href="https://www.facebook.com/bakedforsofia/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                        aria-label="Facebook"
                      >
                        <Facebook className="h-5 w-5" />
                      </a>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-secondary/50 border border-border p-6">
                    <h3 className="font-semibold text-foreground mb-2">
                      Request Samples
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Not sure what&apos;s right for your business? We&apos;re
                      happy to provide samples and a full price list so you can
                      try before you commit.
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
