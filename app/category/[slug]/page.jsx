import { notFound } from "next/navigation";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar6 from "@/components/headers/Topbar6";
import PageTitle from "@/components/woocommerce/PageTitle";
import ShopCatalog from "@/components/woocommerce/ShopCatalog";
import CatalogNotice from "@/components/woocommerce/CatalogNotice";
import { getCategoryBySlug, getProducts, isWooConfigured } from "@/lib/woocommerce";
import { parseShopParams, toWooQuery } from "@/lib/woocommerce/shop-query";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return { title: `${slug} | Fragrance` };
}

export default async function CategoryPage({ params, searchParams }) {
  const { slug } = await params;
  const state = parseShopParams(await searchParams);
  let category = null;
  let result = { products: [], total: 0, totalPages: 1 };
  let error = !isWooConfigured() ? "Catalogue non connecté." : null;
  if (!error) {
    try {
      category = await getCategoryBySlug(slug);
      if (!category) notFound();
      result = await getProducts(toWooQuery(state, { category: category.id }));
    } catch (e) {
      if (e?.digest?.startsWith?.("NEXT_")) throw e;
      error = "Le catalogue est momentanément indisponible.";
    }
  }
  return (
    <>
      <Topbar6 bgColor="bg-main" />
      <Header1 />
      <PageTitle title={category?.name || slug} trail={[{ href: "/shop", label: "Boutique" }]} />
      <section className="flat-spacing">
        <div className="container">
          {error ? <CatalogNotice>{error}</CatalogNotice> : <ShopCatalog {...result} state={state} basePath={`/category/${slug}`} />}
        </div>
      </section>
      <Footer1 />
    </>
  );
}
