import BlogDetail2 from "@/components/blogs/BlogDetail2";

import RelatedBlogs from "@/components/blogs/RelatedBlogs";

import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar6 from "@/components/headers/Topbar6";
import { allBlogs } from "@/data/blogs";
import React from "react";
import { useParams } from "react-router-dom";
import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "Blog Detail 02 || Modave - Multipurpose Reactjs eCommerce Template",
  description: "Modave - Multipurpose Reactjs eCommerce Template",
};
export default function BlogDetailsPage2() {
  let params = useParams();
  const id = params.id;

  const blog = allBlogs.filter((p) => p.id == id)[0] || allBlogs[0];
  return (
    <>
      <MetaComponent meta={metadata} />
      <Topbar6 bgColor="bg-main" />
      <Header1 />
      <BlogDetail2 blog={blog} />
      <RelatedBlogs />
      <Footer1 />
    </>
  );
}
