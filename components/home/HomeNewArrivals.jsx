import SectionHeading from "./SectionHeading";
import CatalogNotice from "@/components/woocommerce/CatalogNotice";
import WooProductCard from "@/components/woocommerce/WooProductCard";

// Section 03 : derniers produits WooCommerce (donnees chargees par la page).
// Grille 4 colonnes desktop, 3 tablette, 2 mobile (6 produits visibles sur mobile).
export default function HomeNewArrivals({ products, error }) {
  return (
    <section className="hm-section">
      <div className="container">
        <SectionHeading
          title="Nouveautés"
          subtitle="Les dernières arrivées en boutique."
          href="/shop"
          linkLabel="Voir tout"
        />
        {error ? (
          <CatalogNotice>{error}</CatalogNotice>
        ) : products.length ? (
          <div className="hm-grid">
            {products.map((p) => (
              <div key={p.id} className="hm-grid__item">
                <WooProductCard product={p} gridClass="grid" />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center">Aucun produit pour le moment.</p>
        )}
      </div>
    </section>
  );
}
