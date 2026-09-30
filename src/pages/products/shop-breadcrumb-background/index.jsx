import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar6 from "@/components/headers/Topbar6";
import Products1 from "@/components/products/Products1";
import { Link } from "react-router-dom";
import React from "react";
import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title:
    "Shop Breadcumb Background || Modave - Multipurpose Reactjs eCommerce Template",
  description: "Modave - Multipurpose Reactjs eCommerce Template",
};
export default function ShopBreadcumbBackgroundPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Topbar6 bgColor="bg-main" />
      <Header1 />
      <div className="page-title">
        <div className="container">
          <h3 className="heading text-center">Women</h3>
          <ul className="breadcrumbs d-flex align-items-center justify-content-center">
            <li>
              <Link className="link" to={`/`}>
                Homepage
              </Link>
            </li>
            <li>
              <i className="icon-arrRight" />
              Women
            </li>
          </ul>
        </div>
      </div>

      <Products1 />
      <Footer1 />
    </>
  );
}
