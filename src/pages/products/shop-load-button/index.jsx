import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar6 from "@/components/headers/Topbar6";

import Products14 from "@/components/products/Products14";
import { Link } from "react-router-dom";
import React from "react";
import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "Shop Load Button || Modave - Multipurpose Reactjs eCommerce Template",
  description: "Modave - Multipurpose Reactjs eCommerce Template",
};
export default function ShopLoadButtonPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Topbar6 bgColor="bg-main" />
      <Header1 />
      <div
        className="page-title"
        style={{ backgroundImage: "url(/images/section/page-title.jpg)" }}
      >
        <div className="container-full">
          <div className="row">
            <div className="col-12">
              <h3 className="heading text-center">Women</h3>
              <ul className="breadcrumbs d-flex align-items-center justify-content-center">
                <li>
                  <Link className="link" to={`/`}>
                    Homepage
                  </Link>
                </li>
                <li>
                  <i className="icon-arrRight" />
                </li>
                <li>Women</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Products14 />
      <Footer1 />
    </>
  );
}
