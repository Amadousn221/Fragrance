import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar6 from "@/components/headers/Topbar6";
import ShopCart from "@/components/otherPages/ShopCart";
import Link from "next/link";
import React from "react";

export const metadata = {
  title: "Panier | Fragrance",
  description: "Votre panier Fragrance.",
};

export default function ShopingCartPage() {
  return (
    <>
      <Topbar6 bgColor="bg-main" />
      <Header1 />
      <div
        className="page-title"
        style={{ backgroundImage: "url(/images/section/page-title.jpg)" }}
      >
        <div className="container">
          <h3 className="heading text-center">Mon panier</h3>
          <ul className="breadcrumbs d-flex align-items-center justify-content-center">
            <li>
              <Link className="link" href={`/`}>
                Accueil
              </Link>
            </li>
            <li>
              <i className="icon-arrRight" />
            </li>
            <li>
              <Link className="link" href="/shop">
                Boutique
              </Link>
            </li>
            <li>
              <i className="icon-arrRight" />
            </li>
            <li>Panier</li>
          </ul>
        </div>
      </div>

      <ShopCart />
      <Footer1 />
    </>
  );
}
