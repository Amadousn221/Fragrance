// Entree de wishlist (stockee dans le navigateur) construite depuis un produit WooCommerce normalise.
// Minimum conserve : product_id, slug, name, price, image.
export function wishlistEntry(product, image) {
  return {
    product_id: product.id,
    slug: product.slug,
    name: product.title,
    price: product.price,
    image: image || product.imgSrc,
  };
}
