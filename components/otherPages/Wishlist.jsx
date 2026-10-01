"use client";
import Link from "next/link";
import { useContextElement } from "@/context/Context";
import { formatPrice } from "@/lib/format";

// Page wishlist : entrees locales { product_id, slug, name, price, image } (vrais produits WooCommerce).
export default function Wishlist() {
  const { wishlistItems, removeFromWishlist } = useContextElement();

  return (
    <section className="flat-spacing">
      <div className="container">
        {wishlistItems.length ? (
          <div className="tf-grid-layout tf-col-2 md-col-3 xl-col-4">
            {wishlistItems.map((item) => (
              <div key={item.product_id} className="card-product grid">
                <div className="card-product-wrapper">
                  <Link href={`/product/${item.slug}`} className="product-img">
                    <img
                      className="lazyload img-product"
                      src={item.image}
                      alt={item.name}
                      width={600}
                      height={800}
                    />
                    <img
                      className="lazyload img-hover"
                      src={item.image}
                      alt={item.name}
                      width={600}
                      height={800}
                    />
                  </Link>
                  <div className="list-product-btn">
                    <a
                      onClick={() => removeFromWishlist(item.product_id)}
                      className="box-icon wishlist btn-icon-action"
                    >
                      <span className="icon icon-trash" />
                      <span className="tooltip">Retirer des favoris</span>
                    </a>
                  </div>
                  <div className="list-btn-main">
                    <Link className="btn-main-product" href={`/product/${item.slug}`}>
                      Voir le produit
                    </Link>
                  </div>
                </div>
                <div className="card-product-info">
                  <Link href={`/product/${item.slug}`} className="title link">
                    {item.name}
                  </Link>
                  <span className="price">{formatPrice(item.price)}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-5">
            Votre liste de favoris est vide.{" "}
            <Link className="btn-line" href="/shop">
              Découvrir la boutique
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
