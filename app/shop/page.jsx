import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar6 from "@/components/headers/Topbar6";
import PageTitle from "@/components/woocommerce/PageTitle";
import ProductGrid from "@/components/woocommerce/ProductGrid";
import CatalogNotice from "@/components/woocommerce/CatalogNotice";
import { getProducts, isWooConfigured } from "@/lib/woocommerce";

export const metadata = { title: "Boutique | Fragrance" };
export const revalidate = 300;

export default async function ShopPage() {
  let products = [];
  let error = !isWooConfigured() ? "Catalogue non connecté." : null;
  if (!error) {
    try {
      ({ products } = await getProducts({ perPage: 24 }));
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
          {error ? <CatalogNotice>{error}</CatalogNotice> : <ProductGrid products={products} />}
        </div>
      </section>
      <Footer1 />
    </>
  );
}
