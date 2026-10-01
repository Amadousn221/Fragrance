"use client";
import Link from "next/link";
import { useContextElement } from "@/context/Context";
import { formatPrice } from "@/lib/format";

// Carte produit Modave (memes classes que ProductCard1) alimentee par un produit WooCommerce normalise.
// Liens vers /product/[slug] ; prix en F CFA ; panier = lignes WooCommerce.
export default function WooProductCard({ product, gridClass = "" }) {
  const { addWooItem, addToWishlist, isAddedtoWishlist } = useContextElement();
  const href = `/product/${product.slug}`;
  const isVariable = product.type === "variable";

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
    <div
      className={`card-product wow fadeInUp ${gridClass} ${
        product.isOnSale ? "on-sale" : ""
      }`}
    >
      <div className="card-product-wrapper">
        <Link href={href} className="product-img">
          <img
            className="lazyload img-product"
            src={product.imgSrc}
            alt={product.title}
            width={600}
            height={800}
          />
          <img
            className="lazyload img-hover"
            src={product.imgHover}
            alt={product.title}
            width={600}
            height={800}
          />
        </Link>
        {product.isOnSale && product.salePercentage && (
          <div className="on-sale-wrap">
            <span className="on-sale-item">-{product.salePercentage}</span>
          </div>
        )}
        <div className="list-product-btn">
          <a
            onClick={() => addToWishlist(product.id)}
            className="box-icon wishlist btn-icon-action"
          >
            <span className="icon icon-heart" />
            <span className="tooltip">
              {isAddedtoWishlist(product.id) ? "Déjà dans les favoris" : "Favoris"}
            </span>
          </a>
        </div>
        <div className="list-btn-main">
          {!product.inStock ? (
            <span className="btn-main-product" aria-disabled="true" style={{ opacity: 0.6, cursor: "not-allowed" }}>
              Rupture de stock
            </span>
          ) : isVariable ? (
            <Link className="btn-main-product" href={href}>
              Choisir les options
            </Link>
          ) : (
            <a className="btn-main-product" onClick={addSimple}>
              Ajouter au panier
            </a>
          )}
        </div>
      </div>
      <div className="card-product-info">
        <Link href={href} className="title link">
          {product.title}
        </Link>
        <span className="price">
          {product.oldPrice && (
            <span className="old-price">{formatPrice(product.oldPrice)}</span>
          )}{" "}
          {formatPrice(product.price)}
        </span>
      </div>
    </div>
  );
}
