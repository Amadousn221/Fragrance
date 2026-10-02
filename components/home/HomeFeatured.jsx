import SectionHeading from "./SectionHeading";
import ScrollRow from "./ScrollRow";
import CatalogNotice from "@/components/woocommerce/CatalogNotice";
import WooProductCard from "@/components/woocommerce/WooProductCard";

// Section 05 : "Sélection du moment" (produits mis en avant, sinon populaires, hors Nouveautes).
// Presentation en rangee horizontale pour la differencier de la grille "Nouveautes".
export default function HomeFeatured({ products, error }) {
  if (!error && !products.length) return null;
  return (
    <section className="hm-section">
      <div className="container">
        <SectionHeading
          title="Sélection du moment"
          subtitle="Nos coups de cœur du moment."
          href="/shop"
          linkLabel="Voir la boutique"
        />
        {error ? (
          <CatalogNotice>{error}</CatalogNotice>
        ) : (
          <ScrollRow label="Sélection du moment">
            {products.map((p) => (
              <div key={p.id} className="hm-row__item" role="listitem">
                <WooProductCard product={p} gridClass="grid" />
              </div>
            ))}
          </ScrollRow>
        )}
      </div>
    </section>
  );
}
