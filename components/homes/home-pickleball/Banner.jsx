"use client";
import React from "react";
import Link from "next/link";
// Sans props : banniere du template (page demo). Props pour l'accueil : `label`, `title`, `text`, `btnText`,
// `href`, `imgSrc` (fond), `className`.
export default function Banner({
  label = "sumMer 2024 collection",
  title = "Super Sale Up To %50",
  text = "Reserved for special occasions",
  btnText = "discover Now",
  href = "/shop-default-grid",
  imgSrc = "/images/banner/banner-parallax.jpg",
  className = "",
}) {
  return (
    <section
      className={`flat-banner-parallax style-2 ${className}`}
      style={{ backgroundImage: `url("${imgSrc}")` }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-6 col-md-8 col-12">
            <div className="fl-content rounded-0 bg-main text-center flat-spacing-9">
              <div className="title-top">
                <p className="text-btn-uppercase text-white">{label}</p>
                <h2 className="title font-4 text-uppercase text-white">{title}</h2>
                <p className="body-text text-white">{text}</p>
              </div>
              <div>
                <Link href={href} className="tf-btn btn-fill btn-lg btn-white">
                  <span className="text">{btnText}</span>
                  <i className="icon icon-arrowUpRight" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
