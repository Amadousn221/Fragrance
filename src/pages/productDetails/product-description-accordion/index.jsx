import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar6 from "@/components/headers/Topbar6";
import Breadcumb from "@/components/productDetails/Breadcumb";
import DescriptionAccrdion from "@/components/productDetails/descriptions/DescriptionAccrdion";
import Details1 from "@/components/productDetails/details/Details1";
import RelatedProducts from "@/components/productDetails/RelatedProducts";
import { allProducts } from "@/data/products";
import React from "react";
import { useParams } from "react-router-dom";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title:
    "Product Description Accordion || Modave - Multipurpose Reactjs eCommerce Template",
  description: "Modave - Multipurpose Reactjs eCommerce Template",
};

export default function ProductDescriptionAccordionPage() {
  let params = useParams();
  const id = params.id;

  const product = allProducts.filter((p) => p.id == id)[0] || allProducts[0];
  return (
    <>
      <MetaComponent meta={metadata} />
      <Topbar6 bgColor="bg-main" />
      <Header1 />
      <Breadcumb product={product} />
      <Details1 product={product} />
      <DescriptionAccrdion />
      <RelatedProducts />
      <Footer1 hasPaddingBottom />
    </>
  );
}
