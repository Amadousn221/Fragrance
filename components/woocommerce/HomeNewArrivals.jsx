import Link from "next/link";
import ProductGrid from "./ProductGrid";
import CatalogNotice from "./CatalogNotice";
import { getProducts, isWooConfigured } from "@/lib/woocommerce";

// Section "Nouveautés" de l'accueil : derniers produits publies sur WooCommerce.
export default async function HomeNewArrivals() {
  let products = [];
  let error = !isWooConfigured() ? "Catalogue non connecté." : null;
  if (!error) {
    try {
      ({ products } = await getProducts({ perPage: 8, orderby: "date", order: "desc" }));
    } catch {
      error = "Le catalogue est momentanément indisponible.";
    }
  }
  return (
    <section className="flat-spacing-3">
      <div className="container">
        <div className="heading-section text-center">
          <h3 className="heading">Nouveautés</h3>
        </div>
        {error ? <CatalogNotice>{error}</CatalogNotice> : <ProductGrid products={products} />}
        <div className="sec-btn text-center">
          <Link href="/shop" className="btn-line">
            Voir toute la boutique
          </Link>
        </div>
      </div>
    </section>
  );
}
