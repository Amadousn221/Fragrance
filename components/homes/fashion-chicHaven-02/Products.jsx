"use client";
import ProductCard1 from "@/components/productCards/ProductCard1";
import WooProductCard from "@/components/woocommerce/WooProductCard";
import CatalogNotice from "@/components/woocommerce/CatalogNotice";
import { products, products7 } from "@/data/products";
import React, { useEffect, useState } from "react";
import Link from "next/link";
const tabItems = ["Women", "Men"];
// Sans `wooProducts` : version demo du template (onglets, produits statiques).
// Avec `wooProducts` : grille de produits WooCommerce (WooProductCard) avec titre, sous-titre et lien `href` ;
// `error` affiche un message a la place de la grille.
export default function Products({
  parentClass = "flat-spacing-3",
  wooProducts,
  error,
  title,
  subtitle,
  href = "/shop",
  linkLabel = "Voir tout",
  className = "",
}) {
  const woo = wooProducts !== undefined || Boolean(error);
  const [activeItem, setActiveItem] = useState(tabItems[0]); // Default the first item as active

  const [selectedItems, setSelectedItems] = useState(products);
  useEffect(() => {
    if (woo) return;
    document.getElementById("newArrivals").classList.remove("filtered");
    setTimeout(() => {
      if (activeItem == "Men") {
        setSelectedItems(products7);
      } else {
        setSelectedItems(products);
      }

      document.getElementById("newArrivals").classList.add("filtered");
    }, 300);
  }, [activeItem, woo]);

  if (woo) {
    return (
      <section className={`${parentClass} ${className}`}>
        <div className="container">
          <div className="heading-section text-center wow fadeInUp">
            <h3 className="heading">{title}</h3>
            {subtitle && <p className="subheading text-secondary">{subtitle}</p>}
          </div>
          {error ? (
            <CatalogNotice>{error}</CatalogNotice>
          ) : wooProducts.length ? (
            <>
              <div className="tf-grid-layout tf-col-2 lg-col-3 xl-col-4">
                {wooProducts.map((product) => (
                  <WooProductCard key={product.id} product={product} gridClass="grid" />
                ))}
              </div>
              <div className="sec-btn text-center">
                <Link href={href} className="btn-line">
                  {linkLabel}
                </Link>
              </div>
            </>
          ) : (
            <p className="text-center">Aucun produit pour le moment.</p>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className={parentClass}>
      <div className="container">
        <div className="flat-animate-tab">
          <ul className="tab-product justify-content-sm-center" role="tablist">
            {tabItems.map((item) => (
              <li key={item} className="nav-tab-item" role="presentation">
                <a
                  href={`#`} // Generate href dynamically
                  className={activeItem === item ? "active" : ""}
                  onClick={(e) => {
                    e.preventDefault(); // Prevent default anchor behavior
                    setActiveItem(item);
                  }}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
          <div className="tab-content">
            <div
              className="tab-pane active show tabFilter filtered"
              id="newArrivals"
              role="tabpanel"
            >
              <div className="tf-grid-layout tf-col-2 lg-col-3 xl-col-4">
                {selectedItems.slice(0, 4).map((product, i) => (
                  <ProductCard1 key={i} product={product} />
                ))}
              </div>
              <div className="sec-btn text-center">
                <Link href={`/shop-default-grid`} className="btn-line">
                  View All Products
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
