import WooProductCard from "./WooProductCard";

// Grille de cartes Modave alimentee par des produits WooCommerce normalises.
export default function ProductGrid({ products }) {
  if (!products.length) {
    return <p className="text-center">Aucun produit pour le moment.</p>;
  }
  return (
    <div className="tf-grid-layout tf-col-2 lg-col-3 xl-col-4">
      {products.map((product) => (
        <WooProductCard key={product.id} product={product} gridClass="grid" />
      ))}
    </div>
  );
}
