"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useCategories from "@/components/woocommerce/useCategories";
import { resolveNavItems } from "@/lib/woocommerce/home-config";

// Menu mobile Fragrance : liens reels uniquement (la recherche passe par l'icone de l'en-tete).
export default function MobileMenu() {
  const pathname = usePathname();
  const items = resolveNavItems(useCategories());
  const linkClass = (active) => `mb-menu-link ${active ? "active" : ""}`;
  return (
    <div className="offcanvas offcanvas-start canvas-mb" id="mobileMenu">
      <span
        className="icon-close icon-close-popup"
        data-bs-dismiss="offcanvas"
        aria-label="Fermer"
      />
      <div className="mb-canvas-content">
        <div className="mb-body">
          <div className="mb-content-top">
            <ul className="nav-ul-mb" id="wrapper-menu-navigation">
              {items.map((item) => (
                <li key={item.key} className="nav-mb-item">
                  <Link href={item.href} className={linkClass(pathname === item.href)}>
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
              <li className="nav-mb-item">
                <Link href="/wish-list" className={linkClass(pathname === "/wish-list")}>
                  <span>Favoris</span>
                </Link>
              </li>
              <li className="nav-mb-item">
                <Link href="/shopping-cart" className={linkClass(pathname === "/shopping-cart")}>
                  <span>Panier</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
