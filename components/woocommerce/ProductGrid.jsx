import ProductCard1 from "@/components/productCards/ProductCard1";

// Grille de cartes du template alimentee par des produits WooCommerce normalises.
export default function ProductGrid({ products }) {
  if (!products.length) {
    return <p className="text-center">Aucun produit pour le moment.</p>;
  }
  return (
    <div className="tf-grid-layout tf-col-2 lg-col-3 xl-col-4">
      {products.map((product) => (
        <ProductCard1 key={product.id} product={product} gridClass="grid" />
      ))}
    </div>
  );
}
