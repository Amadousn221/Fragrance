import React from "react";

import { Link } from "react-router-dom";
export default function Banner() {
  return (
    <section>
      <div className="container">
        <div className="flat-img-with-text">
          <div className="banner banner-left wow fadeInLeft">
            <img
              alt="banner"
              src="/images/banner/banner-w-text1.jpg"
              width={709}
              height={709}
            />
          </div>
          <div className="banner-content">
            <div className="content-text wow fadeInUp">
              <h3 className="title text-center fw-5">
                Special Offer! <br />
                This Week Only
              </h3>
              <p className="desc">Reserved for special occasions</p>
            </div>
            <Link
              to={`/shop-default-grid`}
              className="tf-btn btn-fill wow fadeInUp"
            >
              <span className="text">Explore Collection</span>
              <i className="icon icon-arrowUpRight" />
            </Link>
          </div>
          <div className="banner banner-right wow fadeInRight">
            <img
              alt="banner"
              src="/images/banner/banner-w-text2.jpg"
              width={945}
              height={709}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
