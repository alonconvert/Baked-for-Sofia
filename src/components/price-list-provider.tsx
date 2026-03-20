"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { FloatingPriceOrb } from "@/components/floating-price-orb";
import { PriceListForm } from "@/components/price-list-form";

export function PriceListProvider() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isContactPage = pathname === "/contact";

  return (
    <>
      <FloatingPriceOrb
        onOpen={() => setIsOpen(true)}
        hidden={isContactPage}
      />
      <PriceListForm isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
