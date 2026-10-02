"use client";
import { iconboxItems } from "@/data/features";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const defaultBreakpoints = {
  1200: { slidesPerView: 4 },
  768: { slidesPerView: 3 },
  576: { slidesPerView: 2 },
  0: { slidesPerView: 1 },
};
// Par defaut : donnees du template. Props facultatives : `items` (id, icon, title, description),
// `breakpoints` (Swiper) et `className`.
export default function Features({
  parentClass = "flat-spacing",
  items = iconboxItems,
  breakpoints = defaultBreakpoints,
  className = "",
}) {
  return (
    <section className={`${parentClass} ${className}`}>
      <div className="container">
        <Swiper
          dir="ltr"
          className="swiper tf-sw-iconbox"
          spaceBetween={15}
          breakpoints={breakpoints}
          modules={[Pagination]}
          pagination={{
            clickable: true,
            el: ".spd2",
          }}
        >
          {items.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="tf-icon-box">
                <div className="icon-box">
                  <span className={`icon ${item.icon}`} aria-hidden="true" />
                </div>
                <div className="content text-center">
                  <h6>{item.title}</h6>
                  <p className="text-secondary">{item.description}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="sw-pagination-iconbox spd2 sw-dots type-circle justify-content-center" />
        </Swiper>
      </div>
    </section>
  );
}
