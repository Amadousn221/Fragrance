import MetaComponent from "@/components/common/MetaComponent";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar6 from "@/components/headers/Topbar6";
import Breadcumb from "@/components/productDetails/Breadcumb";
import Descriptions1 from "@/components/productDetails/descriptions/Descriptions1";
import Details1 from "@/components/productDetails/details/Details1";
import DetailsCombo2 from "@/components/productDetails/details/DetailsCombo2";
import RelatedProducts from "@/components/productDetails/RelatedProducts";
import { allProducts } from "@/data/products";
import React from "react";
import { useParams } from "react-router-dom";

const metadata = {
  title:
    "Product Detail || Modave - Multipurpose React Nextjs eCommerce Template",
  description: "Modave - Multipurpose React Nextjs eCommerce Template",
};

export default function ProductDetailPageDealsGrid() {
  let params = useParams();
  const id = params.id;

  const product = allProducts.filter((p) => p.id == id)[0] || allProducts[0];
  return (
    <>
      <MetaComponent meta={metadata} />
      <Topbar6 bgColor="bg-main" />
      <Header1 />
      <Breadcumb product={product} />
      <DetailsCombo2 product={product} />
      <Descriptions1 />
      <RelatedProducts />
      <Footer1 hasPaddingBottom />
    </>
  );
}
