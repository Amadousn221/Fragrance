"use client";
import { collections7 } from "@/data/collections";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";

import { Navigation } from "swiper/modules";
const defaultBreakpoints = {
  0: { slidesPerView: 1 },
  480: { slidesPerView: 2 },
  768: { slidesPerView: 3 },
  1024: { slidesPerView: 4 },
};
// Par defaut : donnees du template (page demo). Props facultatives pour l'accueil :
// `items` (imgSrc, title, productCount, href, alt), `title`/`subtitle`, `containerClass`, `breakpoints`.
export default function Collections({
  items = collections7,
  title = "Shop by Collections",
  subtitle = "Browse our Top Trending: the hottest picks loved by all.",
  containerClass = "container-full2",
  breakpoints = defaultBreakpoints,
  className = "",
}) {
  if (!items.length) return null;
  return (
    <section className={`flat-spacing ${className}`}>
      <div className={containerClass}>
        <div className="heading-section text-center wow fadeInUp">
          <h3 className="heading">{title}</h3>
          {subtitle && <p className="subheading">{subtitle}</p>}
        </div>
        <div className="flat-sw-navigation wow fadeInUp" data-wow-delay="0.1s">
          <Swiper
            dir="ltr"
            spaceBetween={15}
            breakpoints={breakpoints}
            className="swiper tf-sw-collection"
            modules={[Navigation]}
            navigation={{
              prevEl: ".snbp7",
              nextEl: ".snbn7",
            }}
          >
            {items.map((collection, index) => {
              const href = collection.href || "/shop-collection";
              return (
                <SwiperSlide key={collection.id ?? index}>
                  <div className="collection-position-2 style-7 hover-img">
                    <Link href={href} className="img-style" aria-label={collection.title}>
                      <img
                        className="lazyload"
                        data-src={collection.imgSrc}
                        alt={collection.alt || `banner-cls-${index + 1}`}
                        src={collection.imgSrc}
                        width={657}
                        height={875}
                        loading="lazy"
                      />
                    </Link>
                    <div className="content text-center">
                      <h4 className="title">
                        <Link href={href} className="link text-white">
                          {collection.title}
                        </Link>
                      </h4>
                      <span className="text-title text-white">
                        {collection.productCount}
                      </span>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
          <div className="nav-prev-collection d-none d-lg-flex nav-sw style-line nav-sw-left snbp7">
            <i className="icon icon-arrLeft" />
          </div>
          <div className="nav-next-collection d-none d-lg-flex nav-sw style-line nav-sw-right snbn7">
            <i className="icon icon-arrRight" />
          </div>
        </div>
      </div>
    </section>
  );
}
