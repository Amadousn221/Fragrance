import MetaComponent from "@/components/common/MetaComponent";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar4 from "@/components/headers/Topbar4";

import Banner from "@/components/homes/home-sock-2/Banner";
import Blogs from "@/components/homes/home-sock-2/Blogs";
import Collections from "@/components/homes/home-sock-2/Collections";
import Hero from "@/components/homes/home-sock-2/Hero";
import Marquee from "@/components/homes/home-sock-2/Marquee";
import Products from "@/components/homes/home-sock-2/Products";
import Products2 from "@/components/homes/home-sock-2/Products2";
import ShopGram from "@/components/homes/home-sock-2/ShopGram";
import React from "react";

const metadata = {
  title:
    "Home Sock 02 || Modave - Multipurpose React Nextjs eCommerce Template",
  description: "Modave - Multipurpose React Nextjs eCommerce Template",
};
export default function HomeSock02Page() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Topbar4 />
      <Header1 />
      <Hero />
      <Products />
      <Collections />
      <Marquee />
      <Products2 />
      <Banner />
      <Blogs />
      <ShopGram />
      <Footer1 />
    </>
  );
}
