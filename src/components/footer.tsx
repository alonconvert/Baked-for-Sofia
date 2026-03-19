import Link from "next/link";
import { Instagram, Facebook, Phone, Mail } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Our Products", href: "/products" },
  { label: "Our Story", href: "/our-story" },
  { label: "Get in Touch", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h3 className="text-xl font-bold mb-3">Baked for Sofia</h3>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Melbourne&apos;s artisan wholesale craft bakery. Baked fresh daily,
              delivered 6 days a week.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Contact Us</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:0399420881"
                  className="flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  (03) 9942 – 0881
                </a>
              </li>
              <li>
                <a
                  href="mailto:orders@BakedforSofia.com"
                  className="flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  orders@BakedforSofia.com
                </a>
              </li>
              <li className="flex gap-3 pt-1">
                <a
                  href="https://www.instagram.com/bakedforsofia/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="https://www.facebook.com/bakedforsofia/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-primary-foreground/10 text-center">
          <p className="text-sm text-primary-foreground/50">
            &copy; {new Date().getFullYear()} Baked for Sofia. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
