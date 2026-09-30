import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar6 from "@/components/headers/Topbar6";
import Checkout from "@/components/otherPages/Checkout";
import { Link } from "react-router-dom";
import React from "react";
import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "Checkout || Modave - Multipurpose Reactjs eCommerce Template",
  description: "Modave - Multipurpose Reactjs eCommerce Template",
};
export default function CheckoutPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Topbar6 bgColor="bg-main" />
      <Header1 />
      <div
        className="page-title"
        style={{ backgroundImage: "url(/images/section/page-title.jpg)" }}
      >
        <div className="container">
          <h3 className="heading text-center">Check Out</h3>
          <ul className="breadcrumbs d-flex align-items-center justify-content-center">
            <li>
              <Link className="link" to={`/`}>
                Homepage
              </Link>
            </li>
            <li>
              <i className="icon-arrRight" />
            </li>
            <li>
              <Link className="link" to={`/shop-default-grid`}>
                Shop
              </Link>
            </li>
            <li>
              <i className="icon-arrRight" />
            </li>
            <li>View Cart</li>
          </ul>
        </div>
      </div>
      <Checkout />
      <Footer1 />
    </>
  );
}
