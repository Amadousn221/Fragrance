"use client";
import { collections3 } from "@/data/collections";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import Link from "next/link";
import { Pagination } from "swiper/modules";
// Par defaut : donnees du template (page demo). Props facultatives pour l'accueil :
// `items` (id, imgSrc, alt, title, description, btnText, href, imgWidth, imgHeight, delay),
// `title` : titre de section affiche au-dessus du slider, `className`.
export default function Collections2({
  items = collections3,
  title,
  className = "",
}) {
  if (!items.length) return null;
  return (
    <section className={className}>
      {title && (
        <div className="container">
          <div className="heading-section text-center wow fadeInUp">
            <h3 className="heading">{title}</h3>
          </div>
        </div>
      )}
      <Swiper
        dir="ltr"
        spaceBetween={8}
        slidesPerView={3}
        breakpoints={{
          1124: { slidesPerView: 3, spaceBetween: 10 },
          768: { slidesPerView: 2, spaceBetween: 10 },
          0: { slidesPerView: 1, spaceBetween: 8 },
        }}
        className="swiper tf-sw-collection"
        modules={[Pagination]}
        pagination={{
          clickable: true,
          el: ".spd40",
        }}
      >
        {items.map((collection) => {
          const href = collection.href || "/shop-collection";
          return (
            <SwiperSlide key={collection.id}>
              <div className="collection-position style-lg hover-img">
                <Link href={href} className="img-style" aria-label={collection.title}>
                  <img
                    className="lazyload"
                    data-src={collection.imgSrc}
                    alt={collection.alt}
                    src={collection.imgSrc}
                    width={collection.imgWidth || 950}
                    height={collection.imgHeight || 950}
                    loading="lazy"
                  />
                </Link>
                <div className="content">
                  <h3 className="title wow fadeInUp">
                    <Link href={href} className="link text-white">
                      {collection.title}
                    </Link>
                  </h3>
                  <p
                    className="desc text-white wow fadeInUp"
                    data-wow-delay={collection.delay}
                  >
                    {collection.description}
                  </p>
                  <div className="wow fadeInUp" data-wow-delay={collection.delay}>
                    <Link href={href} className="btn-line style-white">
                      {collection.btnText}
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
        <div className="sw-pagination-collection sw-dots type-circle justify-content-center spd40" />
      </Swiper>
    </section>
  );
}
