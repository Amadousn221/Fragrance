"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import WooProductCard from "./WooProductCard";

// Section « Produits similaires » (balisage Modave de RelatedProducts) alimentee par WooCommerce.
export default function WooRelatedProducts({ products }) {
  if (!products?.length) return null;
  return (
    <section className="flat-spacing pt-0">
      <div className="container flat-animate-tab">
        <ul className="tab-product justify-content-sm-center wow fadeInUp" role="tablist">
          <li className="nav-tab-item" role="presentation">
            <a href="#relatedProducts" className="active" data-bs-toggle="tab">
              Produits similaires
            </a>
          </li>
        </ul>
        <div className="tab-content">
          <div className="tab-pane active show" id="relatedProducts" role="tabpanel">
            <Swiper
              className="swiper tf-sw-latest"
              dir="ltr"
              spaceBetween={15}
              breakpoints={{
                0: { slidesPerView: 2, spaceBetween: 15 },
                768: { slidesPerView: 3, spaceBetween: 30 },
                1200: { slidesPerView: 4, spaceBetween: 30 },
              }}
              modules={[Pagination]}
              pagination={{ clickable: true, el: ".spd-related" }}
            >
              {products.map((product) => (
                <SwiperSlide key={product.id} className="swiper-slide">
                  <WooProductCard product={product} />
                </SwiperSlide>
              ))}
              <div className="sw-pagination-latest spd-related sw-dots type-circle justify-content-center" />
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
