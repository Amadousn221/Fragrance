"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useCategories from "@/components/woocommerce/useCategories";

// Menu mobile Fragrance : liens reels uniquement (la recherche passe par l'icone de l'en-tete).
export default function MobileMenu() {
  const pathname = usePathname();
  const categories = useCategories();
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
              <li className="nav-mb-item">
                <Link href="/" className={linkClass(pathname === "/")}>
                  <span>Accueil</span>
                </Link>
              </li>
              <li className="nav-mb-item">
                <Link href="/shop" className={linkClass(pathname === "/shop")}>
                  <span>Boutique</span>
                </Link>
              </li>
              {categories.length > 0 && (
                <li className="nav-mb-item">
                  <a
                    href="#dropdown-menu-categories"
                    className="collapsed mb-menu-link"
                    data-bs-toggle="collapse"
                    aria-expanded="false"
                    aria-controls="dropdown-menu-categories"
                  >
                    <span>Catégories</span>
                    <span className="btn-open-sub" />
                  </a>
                  <div id="dropdown-menu-categories" className="collapse">
                    <ul className="sub-nav-menu">
                      {categories.map((c) => (
                        <li key={c.id}>
                          <Link
                            href={`/category/${c.slug}`}
                            className={`sub-nav-link ${pathname === `/category/${c.slug}` ? "active" : ""}`}
                          >
                            {c.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              )}
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
