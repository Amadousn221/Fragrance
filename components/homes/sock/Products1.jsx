"use client";
import ProductCard1 from "@/components/productCards/ProductCard1";
import WooProductCard from "@/components/woocommerce/WooProductCard";
import CatalogNotice from "@/components/woocommerce/CatalogNotice";
import { products, products24 } from "@/data/products";
import React from "react";
import Link from "next/link";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Sans `wooProducts` : carousel du template (page demo). Avec `wooProducts` : carousel de produits WooCommerce
// (WooProductCard), `subtitle` facultatif et lien `href` ; `error` affiche un message a la place du carousel.
export default function Products1({
  title = "Deal of the day",
  parentClass = "flat-spacing",
  wooProducts,
  error,
  subtitle = "Fresh styles just in! Elevate your look.",
  href,
  linkLabel,
  className = "",
}) {
  const woo = wooProducts !== undefined || Boolean(error);
  if (woo && !error && !wooProducts.length) return null;
  return (
    <section className={`${parentClass} ${className}`}>
      <div className="container">
        <div className="heading-section text-center wow fadeInUp">
          <h3 className="heading">{title}</h3>
          {subtitle && <p className="subheading text-secondary">{subtitle}</p>}
        </div>
        {error ? (
          <CatalogNotice>{error}</CatalogNotice>
        ) : (
          <Swiper
            className="swiper tf-sw-latest"
            dir="ltr"
            spaceBetween={15}
            breakpoints={{
              0: { slidesPerView: woo ? 2.2 : 2, spaceBetween: 15 },

              768: { slidesPerView: 3, spaceBetween: 30 },
              1200: { slidesPerView: 4, spaceBetween: 30 },
            }}
            modules={[Pagination]}
            pagination={{
              clickable: true,
              el: ".spd76",
            }}
          >
            {woo
              ? wooProducts.map((product) => (
                  <SwiperSlide key={product.id} className="swiper-slide">
                    <WooProductCard product={product} gridClass="grid" />
                  </SwiperSlide>
                ))
              : products24.map((product, i) => (
                  <SwiperSlide key={i} className="swiper-slide">
                    <ProductCard1 product={product} />
                  </SwiperSlide>
                ))}

            <div className="sw-pagination-latest sw-dots type-circle justify-content-center spd76" />
          </Swiper>
        )}
        {woo && !error && href && (
          <div className="sec-btn text-center">
            <Link href={href} className="btn-line">
              {linkLabel}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
