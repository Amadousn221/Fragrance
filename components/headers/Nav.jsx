"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import useCategories from "@/components/woocommerce/useCategories";
import { resolveNavItems } from "@/lib/woocommerce/home-config";

// Navigation Fragrance : Nouveautés + catégories WooCommerce réellement disponibles.
export default function Nav() {
  const pathname = usePathname();
  const items = resolveNavItems(useCategories());
  return (
    <>
      {items.map((item) => (
        <li
          key={item.key}
          className={`menu-item ${pathname === item.href ? "active" : ""}`}
        >
          <Link href={item.href} className="item-link">
            {item.label}
          </Link>
        </li>
      ))}
    </>
  );
}
