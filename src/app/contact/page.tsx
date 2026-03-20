"use client";

import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/animated-section";
import { ContactForm } from "@/components/sections/contact-form";
import { Phone, Mail, Clock, Instagram, Facebook, MapPin } from "lucide-react";

const contactItems = [
  {
    href: "tel:0399420881",
    icon: Phone,
    primary: "(03) 9942 0881",
    secondary: "Give us a call",
    isLink: true,
  },
  {
    href: "mailto:orders@bakedforsofia.com",
    icon: Mail,
    primary: "orders@bakedforsofia.com",
    secondary: "Email us anytime",
    isLink: true,
  },
  {
    href: null,
    icon: Clock,
    primary: "9am \u2013 4:30pm",
    secondary: "Monday \u2013 Friday",
    isLink: false,
  },
  {
    href: null,
    icon: MapPin,
    primary: "Melbourne, Australia",
    secondary: "Delivering city-wide & beyond",
    isLink: false,
  },
];

const socialLinks = [
  { href: "https://www.instagram.com/bakedforsofia/", icon: Instagram, label: "Instagram" },
  { href: "https://www.facebook.com/bakedforsofia/", icon: Facebook, label: "Facebook" },
];

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
            {/* Form - slide up with spring */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  type: "spring",
                  stiffness: 120,
                  damping: 18,
                  mass: 1,
                }}
              >
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
              </motion.div>
            </div>

            {/* Contact Info - stagger from right */}
            <div className="lg:col-span-2">
              <div className="space-y-8">
                {/* Direct Contact */}
                <div>
                  <motion.h3
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground/60 mb-5"
                  >
                    Contact Information
                  </motion.h3>
                  <ul className="space-y-4">
                    {contactItems.map((item, i) => {
                      const content = (
                        <motion.div
                          initial={{ opacity: 0, x: 40 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, margin: "-60px" }}
                          transition={{
                            duration: 0.5,
                            delay: 0.15 + i * 0.1,
                            ease: "easeOut",
                          }}
                          className="flex items-center gap-4 group"
                        >
                          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/10 to-gold/10 flex items-center justify-center flex-shrink-0 group-hover:scale-105 group-hover:bg-gradient-to-br group-hover:from-gold/20 group-hover:to-gold/10 transition-all duration-300">
                            <item.icon className="h-5 w-5 text-primary group-hover:text-gold transition-colors duration-300" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">
                              {item.primary}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {item.secondary}
                            </p>
                          </div>
                        </motion.div>
                      );

                      return (
                        <li key={item.primary}>
                          {item.isLink && item.href ? (
                            <a href={item.href}>{content}</a>
                          ) : (
                            content
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Social - bounce in */}
                <div>
                  <motion.h3
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground/60 mb-5"
                  >
                    Follow Us
                  </motion.h3>
                  <div className="flex gap-3">
                    {socialLinks.map((social, i) => (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-2xl bg-card border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/20 hover:shadow-md transition-all"
                        aria-label={social.label}
                        initial={{ opacity: 0, scale: 0, y: 20 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 15,
                          delay: 0.6 + i * 0.12,
                        }}
                      >
                        <social.icon className="h-5 w-5" />
                      </motion.a>
                    ))}
                  </div>
                </div>

                {/* Samples card - fades in last with slight scale */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
                  className="rounded-2xl bg-gradient-to-br from-warm to-cream border border-gold/20 border-l-[3px] border-l-gold/50 p-7"
                >
                  <h3 className="font-serif text-lg text-foreground mb-2">
                    Request Samples
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Not sure what&apos;s right for your business? We&apos;re
                    happy to provide samples and a full price list so you can
                    try before you commit. Just mention it in your inquiry.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
