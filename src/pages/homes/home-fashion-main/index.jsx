import Features from "@/components/common/Features";
import Footer1 from "@/components/footers/Footer1";
import Header2 from "@/components/headers/Header2";
import BannerTab from "@/components/common/BannerTab";
import Collections from "@/components/homes/fashion-main/Collections";
import Collections2 from "@/components/homes/fashion-main/Collections2";
import Hero from "@/components/homes/fashion-main/Hero";
import Products from "@/components/common/Products";
import ShopGram from "@/components/common/ShopGram2";
import Testimonials from "@/components/homes/fashion-main/Testimonials";
import React from "react";
import Features2 from "@/components/common/Features2";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title:
    "Home Fashion Main || Modave - Multipurpose Reactjs eCommerce Template",
  description: "Modave - Multipurpose Reactjs eCommerce Template",
};

export default function HomeFashionMainPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Header2 />
      <Hero />
      <Collections />
      <BannerTab />
      <Products />
      <Collections2 />
      <Features2 />
      <Testimonials />
      <ShopGram />
      <Footer1 />
    </>
  );
}
