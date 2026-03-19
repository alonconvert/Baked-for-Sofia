import type { Metadata } from "next";
import { dmSans } from "@/lib/fonts";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Baked for Sofia | Artisan Wholesale Bakery Melbourne",
  description:
    "Melbourne's artisan wholesale craft bakery. From sourdough to brioche buns, pastries and gluten-free bakes. Delivered fresh 6 days a week.",
  openGraph: {
    title: "Baked for Sofia | Artisan Wholesale Bakery Melbourne",
    description:
      "Melbourne's artisan wholesale craft bakery. Delivered fresh 6 days a week.",
    type: "website",
    locale: "en_AU",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
