import { notFound } from "next/navigation";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar6 from "@/components/headers/Topbar6";
import PageTitle from "@/components/woocommerce/PageTitle";
import CatalogNotice from "@/components/woocommerce/CatalogNotice";
import ProductPurchase from "@/components/woocommerce/ProductPurchase";
import { getProductBySlug, isWooConfigured } from "@/lib/woocommerce";

export const revalidate = 300;

async function load(slug) {
  if (!isWooConfigured()) return { error: "Catalogue non connecté." };
  try {
    const product = await getProductBySlug(slug);
    return product ? { product } : { missing: true };
  } catch {
    return { error: "Le catalogue est momentanément indisponible." };
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { product } = await load(slug);
  return { title: product ? `${product.title} | Fragrance` : "Produit | Fragrance" };
}

// Le serveur charge le produit ; ProductPurchase (client) gere la selection de variations.
export default async function ProductPage({ params }) {
  const { slug } = await params;
  const { product, error, missing } = await load(slug);
  if (missing) notFound();

  return (
    <>
      <Topbar6 bgColor="bg-main" />
      <Header1 />
      <PageTitle title={product?.title || "Produit"} trail={[{ href: "/shop", label: "Boutique" }]} />
      {error ? (
        <CatalogNotice>{error}</CatalogNotice>
      ) : (
        <ProductPurchase product={product} />
      )}
      <Footer1 />
    </>
  );
}
