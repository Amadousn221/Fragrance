"use client";
import { collectionItems2 } from "@/data/collections";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import Link from "next/link";
// `items` : cartes a afficher (par defaut les donnees du template, utilisees par la page demo).
// `title` / `subtitle` : en-tete facultatif ; `item.href` : destination de la carte.
export default function Collections({
  items = collectionItems2,
  title,
  subtitle,
  className = "",
}) {
  if (!items.length) return null;
  return (
    <section className={`space-30 ${className}`}>
      {title && (
        <div className="heading-section text-center wow fadeInUp">
          <h3 className="heading">{title}</h3>
          {subtitle && <p className="subheading text-secondary">{subtitle}</p>}
        </div>
      )}
      <Swiper
        dir="ltr"
        slidesPerView={3}
        spaceBetween={30}
        breakpoints={{
          1024: { slidesPerView: Math.min(3, items.length) },
          768: { slidesPerView: Math.min(2, items.length) },
          0: { slidesPerView: items.length > 1 ? 1.12 : 1, spaceBetween: 12 },
        }}
        className="swiper tf-sw-collection"
      >
        {items.map((item) => {
          const href = item.href || "/shop-collection";
          return (
            <SwiperSlide key={item.id}>
              <div className="collection-position style-lg hover-img">
                <Link href={href} className="img-style" aria-label={item.title}>
                  <img
                    className="lazyload"
                    data-src={item.imgSrc}
                    alt={item.alt}
                    src={item.imgSrc}
                    width={900}
                    height={900}
                    loading="lazy"
                  />
                </Link>
                <div className="content">
                  <h3 className="title wow fadeInUp">
                    <Link href={href} className="link text-white">
                      {item.title}
                    </Link>
                  </h3>
                  <p
                    className="desc text-white text-title wow fadeInUp"
                    data-wow-delay="0.1s"
                  >
                    {item.desc}
                  </p>
                  <div className="wow fadeInUp" data-wow-delay="0.2s">
                    <Link href={href} className="btn-line style-white">
                      {item.btnText}
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
}
