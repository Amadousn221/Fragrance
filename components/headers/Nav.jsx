"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import useCategories from "@/components/woocommerce/useCategories";

// Navigation Fragrance : Accueil, Boutique et categories WooCommerce reelles.
export default function Nav() {
  const pathname = usePathname();
  const categories = useCategories();
  const inShop = pathname === "/shop" || pathname.startsWith("/category/") || pathname.startsWith("/product/");
  return (
    <>
      <li className={`menu-item ${pathname === "/" ? "active" : ""}`}>
        <Link href="/" className="item-link">
          Accueil
        </Link>
      </li>
      <li className={`menu-item ${inShop ? "active" : ""}`}>
        <Link href="/shop" className="item-link">
          Boutique
        </Link>
      </li>
      {categories.length > 0 && (
        <li className="menu-item position-relative">
          <a href="#" className="item-link">
            Catégories
            <i className="icon icon-arrow-down" />
          </a>
          <div className="sub-menu submenu-default">
            <ul className="menu-list">
              {categories.map((c) => (
                <li
                  key={c.id}
                  className={`menu-item-li ${pathname === `/category/${c.slug}` ? "active" : ""}`}
                >
                  <Link href={`/category/${c.slug}`} className="menu-link-text">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </li>
      )}
    </>
  );
}
