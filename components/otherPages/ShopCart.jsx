"use client";
import React, { useEffect, useState } from "react";

import Link from "next/link";
import { useContextElement } from "@/context/Context";
import { formatPrice } from "@/lib/format";
import { FREE_SHIPPING_THRESHOLD, SHIPPING_OPTIONS, PROMO_CODES } from "@/lib/woocommerce/product-info-config";

// Page panier : lignes WooCommerce (product_id + variation_id), prix en F CFA.
// Le code promo est conserve dans le navigateur ; remises et frais definitifs seront calcules a l'etape checkout.
export default function ShopCart() {
  const { cartProducts, totalPrice, setLineQuantity, removeCartLine } =
    useContextElement();
  const [coupon, setCoupon] = useState("");
  const [couponSaved, setCouponSaved] = useState("");
  const [shipId, setShipId] = useState(SHIPPING_OPTIONS[0]?.id || "");
  const [agree, setAgree] = useState(false);

  useEffect(() => {
    try {
      const c = localStorage.getItem("cartCoupon") || "";
      setCoupon(c);
      setCouponSaved(c);
    } catch {}
  }, []);

  const applyCoupon = (code) => {
    const value = code.trim();
    setCoupon(value);
    setCouponSaved(value);
    try {
      localStorage.setItem("cartCoupon", value);
    } catch {}
  };

  const shipping = SHIPPING_OPTIONS.find((o) => o.id === shipId);
  const grandTotal = totalPrice + (shipping ? shipping.price : 0);
  const progress = FREE_SHIPPING_THRESHOLD ? Math.min(100, (totalPrice / FREE_SHIPPING_THRESHOLD) * 100) : 0;
  const remaining = FREE_SHIPPING_THRESHOLD ? Math.max(0, FREE_SHIPPING_THRESHOLD - totalPrice) : 0;

  const productHref = (elm) =>
    elm.slug ? `/product/${elm.slug}` : "/shop";

  return (
    <>
      <section className="flat-spacing">
        <div className="container">
          <div className="row">
            <div className="col-xl-8">
              {FREE_SHIPPING_THRESHOLD && cartProducts.length ? (
                <div className="tf-cart-threshold mb_24">
                  <div className="text-button mb_12">
                    {remaining > 0 ? (
                      <>
                        Plus que <span className="text-primary">{formatPrice(remaining)}</span> pour profiter de la <strong>livraison offerte</strong>
                      </>
                    ) : (
                      "Félicitations ! Vous bénéficiez de la livraison offerte !"
                    )}
                  </div>
                  <div className="tf-progress-bar">
                    <div className="value" style={{ width: `${progress}%` }} data-progress={progress} />
                  </div>
                </div>
              ) : null}
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
                  <div className="ip-discount-code">
                    <input
                      type="text"
                      placeholder="Ajouter un code promo"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                    />
                    <button type="button" className="tf-btn" onClick={() => applyCoupon(coupon)}>
                      <span className="text">Appliquer le code</span>
                    </button>
                  </div>
                  {couponSaved && (
                    <p className="text-caption-1 text-secondary-2 mt-2">
                      Code « {couponSaved} » conservé : il sera pris en compte à la validation de la commande.
                    </p>
                  )}
                  {PROMO_CODES.length > 0 && (
                    <div className="group-discount">
                      {PROMO_CODES.map((item) => (
                        <div key={item.code} className={`box-discount ${couponSaved === item.code ? "active" : ""}`}>
                          <div className="discount-top">
                            <div className="discount-off">
                              <div className="text-caption-1">Remise</div>
                              <span className="sale-off text-btn-uppercase">{item.title}</span>
                            </div>
                            <div className="discount-from">
                              <p className="text-caption-1">{item.details}</p>
                            </div>
                          </div>
                          <div className="discount-bot">
                            <span className="text-btn-uppercase">{item.code}</span>
                            <button type="button" className="tf-btn" onClick={() => applyCoupon(item.code)}>
                              <span className="text">Appliquer</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
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
                  {SHIPPING_OPTIONS.length > 0 && (
                    <div className="ship">
                      <span className="text-button">Livraison</span>
                      <div className="flex-grow-1">
                        {SHIPPING_OPTIONS.map((option) => (
                          <fieldset key={option.id} className="ship-item">
                            <input
                              type="radio"
                              name="ship-check"
                              className="tf-check-rounded"
                              id={`ship-${option.id}`}
                              checked={shipId === option.id}
                              onChange={() => setShipId(option.id)}
                            />
                            <label htmlFor={`ship-${option.id}`}>
                              <span>{option.label}</span>
                              <span className="price">{formatPrice(option.price)}</span>
                            </label>
                          </fieldset>
                        ))}
                      </div>
                    </div>
                  )}
                  <h5 className="total-order d-flex justify-content-between align-items-center">
                    <span>Total</span>
                    <span className="total">{formatPrice(grandTotal)}</span>
                  </h5>
                  {SHIPPING_OPTIONS.length === 0 && (
                    <p className="text-caption-1 text-secondary-2">
                      Livraison et taxes calculées à l’étape suivante.
                    </p>
                  )}
                  <div className="box-progress-checkout">
                    <fieldset className="check-agree">
                      <input
                        type="checkbox"
                        id="check-agree"
                        className="tf-check-rounded"
                        checked={agree}
                        onChange={(e) => setAgree(e.target.checked)}
                      />
                      <label htmlFor="check-agree">
                        J’accepte les <Link href="/term-of-use">conditions générales</Link>
                      </label>
                    </fieldset>
                    {agree && cartProducts.length > 0 ? (
                      <Link href={`/checkout`} className="tf-btn btn-reset">
                        Passer à la commande
                      </Link>
                    ) : (
                      <span
                        className="tf-btn btn-reset"
                        aria-disabled="true"
                        title="Acceptez les conditions pour commander"
                        style={{ opacity: 0.5, cursor: "not-allowed" }}
                      >
                        Passer à la commande
                      </span>
                    )}
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
