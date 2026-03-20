"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Instagram, Facebook, Phone, Mail, Wheat } from "lucide-react";
import { useRef } from "react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Our Products", href: "/products" },
  { label: "Our Story", href: "/our-story" },
  { label: "Get in Touch", href: "/contact" },
];

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const isInView = useInView(footerRef, { once: true, margin: "-100px" });

  return (
    <footer ref={footerRef} className="bg-espresso text-primary-foreground relative overflow-hidden">
      {/* Gold divider at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      {/* Texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand column */}
          <motion.div
            className="md:col-span-2"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h3 className="font-serif text-2xl mb-4">Baked for Sofia</h3>
            <p className="text-primary-foreground/50 leading-relaxed max-w-sm mb-6">
              Melbourne&apos;s artisan wholesale craft bakery. Family owned since
              2015, baked fresh daily and delivered 6 days a week.
            </p>
            <div className="flex gap-3">
              {[
                { href: "https://www.instagram.com/bakedforsofia/", icon: Instagram, label: "Instagram" },
                { href: "https://www.facebook.com/bakedforsofia/", icon: Facebook, label: "Facebook" },
              ].map((social, i) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-primary-foreground/[0.06] flex items-center justify-center text-primary-foreground/40 hover:text-espresso hover:bg-gold/90 transition-all duration-300"
                  aria-label={social.label}
                  initial={{ opacity: 0, scale: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0, y: 20 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 15,
                    delay: 0.3 + i * 0.12,
                  }}
                >
                  <social.icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Navigation column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          >
            <h4 className="text-xs font-medium tracking-[0.2em] uppercase text-primary-foreground/30 mb-5">
              Navigation
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -15 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -15 }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                >
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/50 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
          >
            <h4 className="text-xs font-medium tracking-[0.2em] uppercase text-primary-foreground/30 mb-5">
              Contact
            </h4>
            <ul className="space-y-3">
              {[
                { href: "tel:0399420881", icon: Phone, text: "(03) 9942 0881" },
                { href: "mailto:orders@bakedforsofia.com", icon: Mail, text: "orders@bakedforsofia.com" },
              ].map((item, i) => (
                <motion.li
                  key={item.text}
                  initial={{ opacity: 0, x: -15 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -15 }}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
                >
                  <a
                    href={item.href}
                    className="flex items-center gap-2.5 text-sm text-primary-foreground/50 hover:text-gold transition-colors"
                  >
                    <item.icon className="h-3.5 w-3.5" />
                    {item.text}
                  </a>
                </motion.li>
              ))}
              <motion.li
                className="text-sm text-primary-foreground/50 pt-1"
                initial={{ opacity: 0, x: -15 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -15 }}
                transition={{ duration: 0.4, delay: 0.56 }}
              >
                Office: 9am &ndash; 4:30pm Mon&ndash;Fri
              </motion.li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom divider line - animates width from 0 to 100% */}
        <div className="mt-14 pt-6 relative">
          <motion.div
            className="absolute top-0 left-0 h-px bg-primary-foreground/[0.06]"
            initial={{ width: "0%" }}
            animate={isInView ? { width: "100%" } : { width: "0%" }}
            transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
          />
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="text-xs text-primary-foreground/30">
              &copy; {new Date().getFullYear()} Baked for Sofia. All rights
              reserved.
            </p>
            <div className="flex items-center gap-2 text-xs text-primary-foreground/20">
              <Wheat className="h-3 w-3 text-gold/40" />
              <span>Artisan Wholesale Bakery &middot; Melbourne, Australia</span>
              <Wheat className="h-3 w-3 text-gold/40 scale-x-[-1]" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
