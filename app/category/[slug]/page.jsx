import { notFound } from "next/navigation";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar6 from "@/components/headers/Topbar6";
import PageTitle from "@/components/woocommerce/PageTitle";
import ProductGrid from "@/components/woocommerce/ProductGrid";
import CatalogNotice from "@/components/woocommerce/CatalogNotice";
import { getCategoryBySlug, getProducts, isWooConfigured } from "@/lib/woocommerce";

export const revalidate = 300;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return { title: `${slug} | Fragrance` };
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  let category = null;
  let products = [];
  let error = !isWooConfigured() ? "Catalogue non connecté." : null;
  if (!error) {
    try {
      category = await getCategoryBySlug(slug);
      if (!category) notFound();
      ({ products } = await getProducts({ category: category.id, perPage: 24 }));
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
          {error ? <CatalogNotice>{error}</CatalogNotice> : <ProductGrid products={products} />}
        </div>
      </section>
      <Footer1 />
    </>
  );
}
