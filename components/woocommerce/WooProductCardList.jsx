"use client";
import Link from "next/link";
import { useContextElement } from "@/context/Context";
import { formatPrice } from "@/lib/format";
import { wishlistEntry } from "@/lib/woocommerce/wishlist";

// Carte produit en vue liste (balisage de ProductsCards6) alimentee par un produit WooCommerce.
export default function WooProductCardList({ product }) {
  const { addWooItem, toggleWishlist, isAddedtoWishlist } = useContextElement();
  const href = `/product/${product.slug}`;

  const addSimple = () =>
    addWooItem({
      product_id: product.id,
      variation_id: null,
      slug: product.slug,
      name: product.title,
      quantity: 1,
      price: product.price,
      regular_price: product.oldPrice ?? product.price,
      sale_price: product.isOnSale ? product.price : null,
      image: product.imgSrc,
      sku: product.sku,
      attributes: [],
    });

  return (
    <div className="card-product style-list">
      <div className="card-product-wrapper">
        <Link href={href} className="product-img">
          <img className="lazyload img-product" src={product.imgSrc} alt={product.title} width={600} height={800} />
          <img className="lazyload img-hover" src={product.imgHover} alt={product.title} width={600} height={800} />
        </Link>
        {product.isOnSale && product.salePercentage && (
          <div className="on-sale-wrap">
            <span className="on-sale-item">-{product.salePercentage}</span>
          </div>
        )}
      </div>
      <div className="card-product-info">
        <Link href={href} className="title link">
          {product.title}
        </Link>
        <span className="price current-price">
          {product.oldPrice && <span className="old-price">{formatPrice(product.oldPrice)}</span>}{" "}
          {formatPrice(product.price)}
        </span>
        {product.shortDescription && (
          <p className="description text-secondary text-line-clamp-2">{product.shortDescription}</p>
        )}
        <div className="variant-wrap-list">
          <div className="list-product-btn">
            {!product.inStock ? (
              <span className="btn-main-product" aria-disabled="true" style={{ opacity: 0.6, cursor: "not-allowed" }}>
                Rupture de stock
              </span>
            ) : product.type === "variable" ? (
              <Link href={href} className="btn-main-product">
                Choisir les options
              </Link>
            ) : (
              <a onClick={addSimple} className="btn-main-product">
                Ajouter au panier
              </a>
            )}
            <a onClick={() => toggleWishlist(wishlistEntry(product))} className="box-icon wishlist btn-icon-action">
              <span className="icon icon-heart" />
              <span className="tooltip">
                {isAddedtoWishlist(product.id) ? "Déjà dans les favoris" : "Favoris"}
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
