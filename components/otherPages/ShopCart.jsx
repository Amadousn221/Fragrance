"use client";
import React from "react";

import Link from "next/link";
import { useContextElement } from "@/context/Context";
import { formatPrice } from "@/lib/format";

// Page panier : lignes WooCommerce (product_id + variation_id), prix en F CFA.
// Les frais de livraison et remises seront calcules a l'etape checkout.
export default function ShopCart() {
  const { cartProducts, totalPrice, setLineQuantity, removeCartLine } =
    useContextElement();

  const productHref = (elm) =>
    elm.slug ? `/product/${elm.slug}` : `/product-detail/${elm.id}`;

  return (
    <>
      <section className="flat-spacing">
        <div className="container">
          <div className="row">
            <div className="col-xl-8">
              {cartProducts.length ? (
                <form onSubmit={(e) => e.preventDefault()}>
                  <table className="tf-table-page-cart">
                    <thead>
                      <tr>
                        <th>Produit</th>
                        <th>Prix</th>
                        <th>Quantité</th>
                        <th>Total</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      {cartProducts.map((elm) => (
                        <tr key={elm.lineId || elm.id} className="tf-cart-item file-delete">
                          <td className="tf-cart-item_product">
                            <Link href={productHref(elm)} className="img-box">
                              <img
                                alt={elm.title}
                                src={elm.imgSrc}
                                width={600}
                                height={800}
                              />
                            </Link>
                            <div className="cart-info">
                              <Link href={productHref(elm)} className="cart-title link">
                                {elm.title}
                              </Link>
                              {elm.attributes?.length > 0 && (
                                <div className="variant-box">
                                  {elm.attributes.map((a) => (
                                    <div key={a.name} className="text-caption-1 text-secondary-2">
                                      {a.name} : {a.option}
                                    </div>
                                  ))}
                                </div>
                              )}
                              {elm.sku && (
                                <div className="text-caption-1 text-secondary-2">SKU : {elm.sku}</div>
                              )}
                            </div>
                          </td>
                          <td
                            data-cart-title="Prix"
                            className="tf-cart-item_price text-center"
                          >
                            <div className="cart-price text-button price-on-sale">
                              {formatPrice(elm.price)}
                            </div>
                          </td>
                          <td
                            data-cart-title="Quantité"
                            className="tf-cart-item_quantity"
                          >
                            <div className="wg-quantity mx-md-auto">
                              <span
                                className="btn-quantity btn-decrease"
                                onClick={() => setLineQuantity(elm.id, elm.quantity - 1)}
                              >
                                -
                              </span>
                              <input
                                type="text"
                                className="quantity-product"
                                name="number"
                                value={elm.quantity}
                                readOnly
                              />
                              <span
                                className="btn-quantity btn-increase"
                                onClick={() => setLineQuantity(elm.id, elm.quantity + 1)}
                              >
                                +
                              </span>
                            </div>
                          </td>
                          <td
                            data-cart-title="Total"
                            className="tf-cart-item_total text-center"
                          >
                            <div className="cart-total text-button total-price">
                              {formatPrice(elm.price * elm.quantity)}
                            </div>
                          </td>
                          <td
                            data-cart-title="Supprimer"
                            className="remove-cart"
                            onClick={() => removeCartLine(elm.id)}
                          >
                            <span className="remove icon icon-close" />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </form>
              ) : (
                <div>
                  Votre panier est vide.{" "}
                  <Link className="btn-line" href="/shop">
                    Découvrir la boutique
                  </Link>
                </div>
              )}
            </div>
            <div className="col-xl-4">
              <div className="fl-sidebar-cart">
                <div className="box-order bg-surface">
                  <h5 className="title">Récapitulatif</h5>
                  <div className="subtotal text-button d-flex justify-content-between align-items-center">
                    <span>Sous-total</span>
                    <span className="total">{formatPrice(totalPrice)}</span>
                  </div>
                  <h5 className="total-order d-flex justify-content-between align-items-center">
                    <span>Total</span>
                    <span className="total">{formatPrice(totalPrice)}</span>
                  </h5>
                  <p className="text-caption-1 text-secondary-2">
                    Livraison et taxes calculées à l’étape suivante.
                  </p>
                  <div className="box-progress-checkout">
                    <Link href={`/checkout`} className="tf-btn btn-reset">
                      Passer à la commande
                    </Link>
                    <p className="text-button text-center">
                      <Link href="/shop">Ou continuer vos achats</Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
