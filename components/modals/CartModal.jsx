"use client";
import React from "react";

import Link from "next/link";
import { useContextElement } from "@/context/Context";
import { formatPrice } from "@/lib/format";

// Mini-panier : lignes WooCommerce reelles (product_id + variation_id). Le passage en caisse
// sera ajoute avec le lot checkout ; les outils demo (note, livraison, coupon) ont ete retires.
export default function CartModal() {
  const { cartProducts, totalPrice, removeCartLine } = useContextElement();

  return (
    <div className="modal fullRight fade modal-shopping-cart" id="shoppingCart">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="d-flex flex-column flex-grow-1 h-100">
            <div className="header">
              <h5 className="title">Mon panier</h5>
              <span
                className="icon-close icon-close-popup"
                data-bs-dismiss="modal"
              />
            </div>
            <div className="wrap">
              <div className="tf-mini-cart-wrap">
                <div className="tf-mini-cart-main">
                  <div className="tf-mini-cart-sroll">
                    {cartProducts.length ? (
                      <div className="tf-mini-cart-items">
                        {cartProducts.map((product, i) => (
                          <div
                            key={product.lineId || i}
                            className="tf-mini-cart-item file-delete"
                          >
                            <div className="tf-mini-cart-image">
                              <img
                                className="lazyload"
                                alt={product.title}
                                src={product.imgSrc}
                                width={600}
                                height={800}
                              />
                            </div>
                            <div className="tf-mini-cart-info flex-grow-1">
                              <div className="mb_12 d-flex align-items-center justify-content-between flex-wrap gap-12">
                                <div className="text-title">
                                  <Link
                                    href={`/product/${product.slug}`}
                                    className="link text-line-clamp-1"
                                  >
                                    {product.title}
                                  </Link>
                                </div>
                                <div
                                  className="text-button tf-btn-remove remove"
                                  role="button"
                                  tabIndex={0}
                                  onClick={() => removeCartLine(product.id)}
                                >
                                  Retirer
                                </div>
                              </div>
                              <div className="d-flex align-items-center justify-content-between flex-wrap gap-12">
                                <div className="text-secondary-2">
                                  {(product.attributes || []).map((a) => a.option).join(" / ")}
                                </div>
                                <div className="text-button">
                                  {product.quantity} × {formatPrice(product.price)}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-4">
                        Votre panier est vide.{" "}
                        <Link className="btn-line" href="/shop">
                          Découvrir la boutique
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
                <div className="tf-mini-cart-bottom">
                  <div className="tf-mini-cart-bottom-wrap">
                    <div className="tf-cart-totals-discounts">
                      <h5>Sous-total</h5>
                      <h5 className="tf-totals-total-value">
                        {formatPrice(totalPrice)}
                      </h5>
                    </div>
                    <div className="tf-mini-cart-view-checkout">
                      <Link
                        href="/shopping-cart"
                        className="tf-btn w-100 btn-fill radius-4"
                      >
                        <span className="text">Voir le panier</span>
                      </Link>
                    </div>
                    <div className="text-center">
                      <Link className="link text-btn-uppercase" href="/shop">
                        Continuer mes achats
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
