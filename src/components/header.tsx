"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Instagram, Facebook } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Our Products", href: "/products" },
  { label: "Our Story", href: "/our-story" },
  { label: "Get in Touch", href: "/contact" },
];

const logoWords = ["Baked", "for", "Sofia"];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{
        y: 0,
        backgroundColor: scrolled
          ? "oklch(0.97 0.008 75 / 0.85)"
          : "oklch(0.97 0.008 75 / 0)",
        backdropFilter: scrolled ? "blur(16px)" : "blur(0px)",
        boxShadow: scrolled
          ? "0 1px 3px oklch(0.25 0.04 45 / 0.08)"
          : "0 0px 0px oklch(0.25 0.04 45 / 0)",
      }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-40 ${
        scrolled ? "border-b border-border/50" : ""
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-18 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="font-serif text-2xl tracking-tight text-foreground transition-colors group-hover:text-primary">
              {logoWords.map((word, i) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.5 + i * 0.12,
                    ease: "easeOut",
                  }}
                  className="inline-block"
                >
                  {word}
                  {i < logoWords.length - 1 ? "\u00A0" : ""}
                </motion.span>
              ))}
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.35,
                  delay: 0.6 + i * 0.1,
                  ease: "easeOut",
                }}
              >
                <Link
                  href={link.href}
                  className={`relative text-sm font-medium tracking-wide transition-colors hover:text-primary py-2 px-1 ${
                    pathname === link.href
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                  {pathname === link.href && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            {[
              { href: "https://www.instagram.com/bakedforsofia/", icon: Instagram, label: "Instagram" },
              { href: "https://www.facebook.com/bakedforsofia/", icon: Facebook, label: "Facebook" },
            ].map((social, i) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label={social.label}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.3,
                  delay: 1.0 + i * 0.1,
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
              >
                <social.icon className="h-4 w-4" />
              </motion.a>
            ))}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-gradient-to-b from-background/98 to-cream/95 backdrop-blur-xl border-b border-border/50"
          >
            <div className="px-6 py-6 space-y-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.3 }}
                >
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    className={`block text-base font-medium py-3 px-3 rounded-lg transition-all ${
                      pathname === link.href
                        ? "text-primary bg-primary/5"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <div className="flex gap-4 pt-4 px-3 border-t border-border/50 mt-4">
                <a
                  href="https://www.instagram.com/bakedforsofia/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="https://www.facebook.com/bakedforsofia/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
