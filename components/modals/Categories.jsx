"use client";
import React from "react";
import Link from "next/link";
import useCategories from "@/components/woocommerce/useCategories";

// Panneau "Catégories" (barre mobile) : categories WooCommerce reelles.
export default function Categories() {
  const categories = useCategories();
  return (
    <div
      className="offcanvas offcanvas-start canvas-filter canvas-categories"
      id="shopCategories"
    >
      <div className="canvas-wrapper">
        <div className="canvas-header">
          <span className="icon-left icon-filter" />
          <h5>Catégories</h5>
          <span
            className="icon-close icon-close-popup"
            data-bs-dismiss="offcanvas"
            aria-label="Fermer"
          />
        </div>
        <div className="canvas-body">
          <div className="wd-facet-categories">
            <ul className="facet-body">
              <li>
                <Link href="/shop" className="item link" data-bs-dismiss="offcanvas">
                  <span className="title-sub text-caption-1 text-secondary">Toute la boutique</span>
                </Link>
              </li>
              {categories.map((c) => (
                <li key={c.id}>
                  <Link
                    href={`/category/${c.slug}`}
                    className="item link"
                    data-bs-dismiss="offcanvas"
                  >
                    <span className="title-sub text-caption-1 text-secondary">{c.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
