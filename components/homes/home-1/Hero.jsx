"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { slides as demoSlides } from "@/data/heroSlides";

import Link from "next/link";

// `slides` : contenu du Hero (par defaut les slides du template, utilises par les pages demo).
// Champs optionnels d'une slide : `imgMobileSrc` (visuel portrait sous 768px), `text` (courte phrase),
// `href` (CTA principal, /shop par defaut) et `secondary` ({ label, href }) pour un second bouton contour.
// `className` : classe additionnelle sur la section.
export default function Hero({ slides = demoSlides, className = "" }) {
  const multi = slides.length > 1;
  return (
    <section className={`tf-slideshow slider-default slider-effect-fade ${className}`}>
      <Swiper
        effect="fade"
        spaceBetween={0}
        centeredSlides={false}
        slidesPerView={1}
        loop={multi}
        modules={[EffectFade, Autoplay, Pagination]}
        autoplay={multi ? { delay: 6000, pauseOnMouseEnter: true } : false}
        dir="ltr"
        pagination={multi ? { clickable: true, el: ".spd55" } : false}
        className="swiper tf-sw-slideshow"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="wrap-slider">
              <picture>
                {slide.imgMobileSrc && (
                  <source media="(max-width: 767px)" srcSet={slide.imgMobileSrc} />
                )}
                <img
                  alt={slide.alt}
                  src={slide.imgSrc}
                  width={1920}
                  height={803}
                  fetchPriority={index === 0 ? "high" : undefined}
                />
              </picture>
              <div className="box-content">
                <div className="content-slider">
                  <div className="box-title-slider">
                    <p className="fade-item fade-item-1 subheading text-btn-uppercase text-white">
                      {slide.subheading}
                    </p>
                    <div className="fade-item fade-item-2 heading text-white title-display">
                      {slide.heading.split("\n").map((line, idx) => (
                        <span key={idx}>
                          {line}
                          <br />
                        </span>
                      ))}
                    </div>
                    {slide.text && (
                      <p className="fade-item fade-item-2 hm-hero__text">{slide.text}</p>
                    )}
                  </div>
                  <div className="fade-item fade-item-3 box-btn-slider">
                    <Link
                      href={slide.href || "/shop"}
                      className="tf-btn btn-fill btn-white"
                    >
                      <span className="text">{slide.btnText}</span>
                      <i className="icon icon-arrowUpRight" />
                    </Link>
                    {slide.secondary && (
                      <Link href={slide.secondary.href} className="tf-btn hm-hero__outline">
                        <span className="text">{slide.secondary.label}</span>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {multi && (
        <div className="wrap-pagination">
          <div className="container">
            <div className="sw-dots sw-pagination-slider type-circle white-circle justify-content-center spd55" />
          </div>
        </div>
      )}
    </section>
  );
}
