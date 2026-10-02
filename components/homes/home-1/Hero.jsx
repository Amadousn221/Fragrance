"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { slides as demoSlides } from "@/data/heroSlides";

import Link from "next/link";
// `slides` : contenu du Hero (par defaut les slides du template, utilises par les pages demo).
export default function Hero({ slides = demoSlides, className = "" }) {
  const multiple = slides.length > 1;
  return (
    <section className={`tf-slideshow slider-default slider-effect-fade ${className}`}>
      <Swiper
        effect="fade"
        spaceBetween={0}
        centeredSlides={false}
        slidesPerView={1}
        loop={multiple}
        modules={[EffectFade, Autoplay, Pagination]}
        autoplay={multiple ? { delay: 6000, pauseOnMouseEnter: true } : false}
        dir="ltr"
        pagination={{
          clickable: true,
          el: ".spd55",
        }}
        className="swiper tf-sw-slideshow"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="wrap-slider">
              <img
                alt={slide.alt}
                src={slide.imgSrc}
                fetchPriority={index === 0 ? "high" : undefined}
                width={1920}
                height={803}
              />
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
                      <p className="fade-item fade-item-2 text-white hero-text mb-0">{slide.text}</p>
                    )}
                  </div>
                  <div className="fade-item fade-item-3 box-btn-slider">
                    <Link
                      href={slide.btnHref || "/shop"}
                      className="tf-btn btn-fill btn-white"
                    >
                      <span className="text">{slide.btnText}</span>
                      <i className="icon icon-arrowUpRight" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {multiple && (
        <div className="wrap-pagination">
          <div className="container">
            <div className="sw-dots sw-pagination-slider type-circle white-circle justify-content-center spd55" />
          </div>
        </div>
      )}
    </section>
  );
}
