import CommingSoon from "@/components/otherPages/CommingSoon";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "Comming Soon || Modave - Multipurpose Reactjs eCommerce Template",
  description: "Modave - Multipurpose Reactjs eCommerce Template",
};

export default function CommingSoonPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <CommingSoon />
    </>
  );
}
