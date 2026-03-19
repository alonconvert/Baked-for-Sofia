import Link from "next/link";
import { Instagram, Facebook, Phone, Mail, Wheat } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Our Products", href: "/products" },
  { label: "Our Story", href: "/our-story" },
  { label: "Get in Touch", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="bg-espresso text-primary-foreground relative overflow-hidden">
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
          <div className="md:col-span-2">
            <h3 className="font-serif text-2xl mb-4">Baked for Sofia</h3>
            <p className="text-primary-foreground/50 leading-relaxed max-w-sm mb-6">
              Melbourne&apos;s artisan wholesale craft bakery. Family owned since
              2015, baked fresh daily and delivered 6 days a week.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/bakedforsofia/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-primary-foreground/[0.06] flex items-center justify-center text-primary-foreground/40 hover:text-espresso hover:bg-gold/90 transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://www.facebook.com/bakedforsofia/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-primary-foreground/[0.06] flex items-center justify-center text-primary-foreground/40 hover:text-espresso hover:bg-gold/90 transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-medium tracking-[0.2em] uppercase text-primary-foreground/30 mb-5">
              Navigation
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/50 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-medium tracking-[0.2em] uppercase text-primary-foreground/30 mb-5">
              Contact
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:0399420881"
                  className="flex items-center gap-2.5 text-sm text-primary-foreground/50 hover:text-gold transition-colors"
                >
                  <Phone className="h-3.5 w-3.5" />
                  (03) 9942 0881
                </a>
              </li>
              <li>
                <a
                  href="mailto:orders@bakedforsofia.com"
                  className="flex items-center gap-2.5 text-sm text-primary-foreground/50 hover:text-gold transition-colors"
                >
                  <Mail className="h-3.5 w-3.5" />
                  orders@bakedforsofia.com
                </a>
              </li>
              <li className="text-sm text-primary-foreground/50 pt-1">
                Office: 9am &ndash; 4:30pm Mon&ndash;Fri
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-primary-foreground/[0.06] flex flex-col sm:flex-row justify-between items-center gap-3">
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
    </footer>
  );
}
