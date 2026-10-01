"use client";
import { useEffect, useRef, useState } from "react";
import { Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Galerie Modave (memes classes que Slider1) alimentee par les images WooCommerce.
// `activeSrc` : image a afficher (ex. image de la variation choisie).
export default function ProductGallery({ images, activeSrc }) {
  const [thumbs, setThumbs] = useState(null);
  const mainRef = useRef(null);

  useEffect(() => {
    if (!activeSrc || !mainRef.current) return;
    const i = images.findIndex((img) => img.src === activeSrc);
    if (i >= 0) mainRef.current.slideTo(i);
  }, [activeSrc, images]);

  return (
    <div className="thumbs-slider">
      <Swiper
        className="swiper tf-product-media-thumbs other-image-zoom"
        dir="ltr"
        direction="vertical"
        spaceBetween={10}
        slidesPerView={6}
        onSwiper={setThumbs}
        modules={[Thumbs]}
        breakpoints={{
          0: { direction: "horizontal", slidesPerView: 4 },
          1200: { direction: "vertical", slidesPerView: 6 },
        }}
      >
        {images.map((img) => (
          <SwiperSlide className="swiper-slide stagger-item" key={img.src}>
            <div className="item">
              <img src={img.src} alt={img.alt} width={600} height={800} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        dir="ltr"
        className="swiper tf-product-media-main"
        spaceBetween={10}
        slidesPerView={1}
        thumbs={{ swiper: thumbs && !thumbs.destroyed ? thumbs : null }}
        modules={[Thumbs]}
        onSwiper={(s) => (mainRef.current = s)}
      >
        {images.map((img) => (
          <SwiperSlide key={img.src} className="swiper-slide">
            <div className="item">
              <img src={img.src} alt={img.alt} width={600} height={800} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
