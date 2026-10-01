import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar6 from "@/components/headers/Topbar6";
import PageTitle from "@/components/woocommerce/PageTitle";
import ShopCatalog from "@/components/woocommerce/ShopCatalog";
import CatalogNotice from "@/components/woocommerce/CatalogNotice";
import { getProducts, isWooConfigured } from "@/lib/woocommerce";
import { parseShopParams, toWooQuery } from "@/lib/woocommerce/shop-query";

export const metadata = { title: "Boutique | Fragrance" };

// Tri, filtres, vue et pagination viennent de l'URL et sont appliques par WooCommerce (pas de filtrage client).
export default async function ShopPage({ searchParams }) {
  const state = parseShopParams(await searchParams);
  let result = { products: [], total: 0, totalPages: 1 };
  let error = !isWooConfigured() ? "Catalogue non connecté." : null;
  if (!error) {
    try {
      result = await getProducts(toWooQuery(state));
    } catch {
      error = "Le catalogue est momentanément indisponible.";
    }
  }
  return (
    <>
      <Topbar6 bgColor="bg-main" />
      <Header1 />
      <PageTitle title="Boutique" />
      <section className="flat-spacing">
        <div className="container">
          {error ? <CatalogNotice>{error}</CatalogNotice> : <ShopCatalog {...result} state={state} basePath="/shop" />}
        </div>
      </section>
      <Footer1 />
    </>
  );
}
