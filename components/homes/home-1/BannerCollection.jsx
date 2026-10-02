"use client";
import React from "react";

import Link from "next/link";
// Sans `items` : bannieres du template (page demo). Avec `items` (title, desc, btnText, imgSrc, alt, href) :
// cartes editoriales superposees, une par ligne sur mobile, en grille a partir de 992px.
export default function BannerCollection({ items, className = "" }) {
  if (items) {
    if (!items.length) return null;
    return (
      <section className={`flat-spacing pt-0 ${className}`}>
        <div className="container">
          <div className="tf-grid-layout lg-col-3">
            {items.map((item) => (
              <div key={item.id} className="collection-position radius hover-img">
                <Link href={item.href} className="img-style" aria-label={item.title}>
                  <img
                    className="lazyload"
                    data-src={item.imgSrc}
                    alt={item.alt}
                    src={item.imgSrc}
                    width={945}
                    height={945}
                    loading="lazy"
                  />
                </Link>
                <div className="content">
                  <h3 className="title">
                    <Link href={item.href} className="link text-white">
                      {item.title}
                    </Link>
                  </h3>
                  <p className="desc text-white">{item.desc}</p>
                  <div>
                    <Link href={item.href} className="btn-line style-white">
                      {item.btnText}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="flat-spacing pt-0">
      <div className="container">
        <div className="tf-grid-layout md-col-2">
          <div className="collection-default hover-img">
            <a className="img-style">
              <img
                className="lazyload"
                data-src="/images/collections/banner-collection/banner-cls1.jpg"
                alt="banner-cls"
                src="/images/collections/banner-collection/banner-cls1.jpg"
                width={945}
                height={709}
              />
            </a>
            <div className="content">
              <h3 className="title wow fadeInUp">
                <Link href={`/shop-collection`} className="link">
                  Crossbody bag
                </Link>
              </h3>
              <p className="desc wow fadeInUp">
                From beach to party: Perfect styles for every occasion.
              </p>
              <div className="wow fadeInUp">
                <Link href={`/shop-collection`} className="btn-line">
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
          <div className="collection-position hover-img">
            <a className="img-style">
              <img
                className="lazyload"
                data-src="/images/collections/banner-collection/banner-cls2.jpg"
                alt="banner-cls"
                src="/images/collections/banner-collection/banner-cls2.jpg"
                width={945}
                height={945}
              />
            </a>
            <div className="content">
              <h3 className="title">
                <Link
                  href={`/shop-collection`}
                  className="link text-white wow fadeInUp"
                >
                  Capsule Collection
                </Link>
              </h3>
              <p className="desc text-white wow fadeInUp">
                Reserved for special occasions
              </p>
              <div className="wow fadeInUp">
                <Link href={`/shop-collection`} className="btn-line style-white">
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
