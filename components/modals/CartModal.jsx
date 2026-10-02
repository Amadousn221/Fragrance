"use client";
import React, { useEffect, useState } from "react";

import Link from "next/link";
import { useContextElement } from "@/context/Context";
import { formatPrice } from "@/lib/format";
import { FREE_SHIPPING_THRESHOLD, DELIVERY_ESTIMATE } from "@/lib/woocommerce/product-info-config";

const readStore = (key) => {
  try {
    return localStorage.getItem(key) || "";
  } catch {
    return "";
  }
};
const writeStore = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch {}
};

const NoteIcon = () => (
  <svg width={21} height={20} viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 3.33325H4.16667C3.72464 3.33325 3.30072 3.50885 2.98816 3.82141C2.67559 4.13397 2.5 4.55789 2.5 4.99992V16.6666C2.5 17.1086 2.67559 17.5325 2.98816 17.8451C3.30072 18.1577 3.72464 18.3333 4.16667 18.3333H15.8333C16.2754 18.3333 16.6993 18.1577 17.0118 17.8451C17.3244 17.5325 17.5 17.1086 17.5 16.6666V10.8333" stroke="#181818" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16.25 2.0832C16.5815 1.75168 17.0312 1.56543 17.5 1.56543C17.9688 1.56543 18.4185 1.75168 18.75 2.0832C19.0815 2.41472 19.2678 2.86436 19.2678 3.3332C19.2678 3.80204 19.0815 4.25168 18.75 4.5832L10.8333 12.4999L7.5 13.3332L8.33333 9.99986L16.25 2.0832Z" stroke="#181818" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const CouponIcon = () => (
  <svg width={21} height={20} viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.3247 11.1751L11.3497 17.1501C11.1949 17.305 11.0111 17.428 10.8087 17.5118C10.6064 17.5957 10.3895 17.6389 10.1705 17.6389C9.95148 17.6389 9.7346 17.5957 9.53227 17.5118C9.32994 17.428 9.14613 17.305 8.99134 17.1501L1.83301 10.0001V1.66675H10.1663L17.3247 8.82508C17.6351 9.13735 17.8093 9.55977 17.8093 10.0001C17.8093 10.4404 17.6351 10.8628 17.3247 11.1751V11.1751Z" stroke="#181818" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5.99902 5.83325H6.00902" stroke="#181818" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Mini-panier Modave branché sur les lignes WooCommerce réelles (product_id + variation_id).
// Note et code promo sont conservés dans le navigateur ; ils seront transmis avec le lot checkout.
export default function CartModal() {
  const { cartProducts, totalPrice, removeCartLine, addWooItem } = useContextElement();
  const [popup, setPopup] = useState("");
  const [agree, setAgree] = useState(false);
  const [note, setNote] = useState("");
  const [coupon, setCoupon] = useState("");
  const [saved, setSaved] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    setNote(readStore("cartNote"));
    setCoupon(readStore("cartCoupon"));
    let cancelled = false;
    fetch("/api/woocommerce/products?per_page=8&stock_status=instock")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!cancelled && Array.isArray(d?.data)) setSuggestions(d.data);
        else if (!cancelled && Array.isArray(d?.products)) setSuggestions(d.products);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const inCart = (productId) => cartProducts.some((l) => l.product_id === productId);
  const recommended = suggestions.filter((p) => !inCart(p.id)).slice(0, 4);
  const progress = FREE_SHIPPING_THRESHOLD ? Math.min(100, (totalPrice / FREE_SHIPPING_THRESHOLD) * 100) : 0;
  const remaining = FREE_SHIPPING_THRESHOLD ? Math.max(0, FREE_SHIPPING_THRESHOLD - totalPrice) : 0;

  const addSuggestion = (p) =>
    addWooItem(
      { product_id: p.id, variation_id: null, slug: p.slug, name: p.title, quantity: 1, price: p.price, regular_price: p.oldPrice ?? p.price, sale_price: p.isOnSale ? p.price : null, image: p.imgSrc, sku: p.sku, attributes: [] },
      false
    );

  const saveNote = (e) => {
    e.preventDefault();
    writeStore("cartNote", note);
    setSaved("note");
    setPopup("");
  };
  const saveCoupon = (e) => {
    e.preventDefault();
    writeStore("cartCoupon", coupon.trim());
    setSaved("coupon");
    setPopup("");
  };

  return (
    <div className="modal fullRight fade modal-shopping-cart" id="shoppingCart">
      <div className="modal-dialog">
        <div className="modal-content">
          {recommended.length > 0 && (
            <div className="tf-minicart-recommendations">
              <h6 className="title">Vous aimerez aussi</h6>
              <div className="wrap-recommendations">
                <div className="list-cart">
                  {recommended.map((p) => (
                    <div className="list-cart-item" key={p.id}>
                      <div className="image">
                        <img className="lazyload" alt={p.title} src={p.imgSrc} width={600} height={800} />
                      </div>
                      <div className="content">
                        <div className="name">
                          <Link className="link text-line-clamp-1" href={`/product/${p.slug}`}>
                            {p.title}
                          </Link>
                        </div>
                        <div className="cart-item-bot">
                          <div className="text-button price">{formatPrice(p.price)}</div>
                          {p.type === "simple" ? (
                            <a className="link text-button" role="button" tabIndex={0} onClick={() => addSuggestion(p)}>
                              Ajouter au panier
                            </a>
                          ) : (
                            <Link className="link text-button" href={`/product/${p.slug}`}>
                              Choisir les options
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          <div className="d-flex flex-column flex-grow-1 h-100">
            <div className="header">
              <h5 className="title">Mon panier</h5>
              <span className="icon-close icon-close-popup" data-bs-dismiss="modal" />
            </div>
            <div className="wrap">
              {FREE_SHIPPING_THRESHOLD ? (
                <div className="tf-mini-cart-threshold">
                  <div className="tf-progress-bar">
                    <div className="value" style={{ width: `${progress}%` }} data-progress={progress}>
                      <i className="icon icon-shipping" />
                    </div>
                  </div>
                  <div className="text-caption-1">
                    {remaining > 0
                      ? `Plus que ${formatPrice(remaining)} pour profiter de la livraison offerte !`
                      : "Félicitations ! Vous bénéficiez de la livraison offerte !"}
                  </div>
                </div>
              ) : null}
              <div className="tf-mini-cart-wrap">
                <div className="tf-mini-cart-main">
                  <div className="tf-mini-cart-sroll">
                    {cartProducts.length ? (
                      <div className="tf-mini-cart-items">
                        {cartProducts.map((product, i) => (
                          <div key={product.lineId || i} className="tf-mini-cart-item file-delete">
                            <div className="tf-mini-cart-image">
                              <img className="lazyload" alt={product.title} src={product.imgSrc} width={600} height={800} />
                            </div>
                            <div className="tf-mini-cart-info flex-grow-1">
                              <div className="mb_12 d-flex align-items-center justify-content-between flex-wrap gap-12">
                                <div className="text-title">
                                  <Link href={`/product/${product.slug}`} className="link text-line-clamp-1">
                                    {product.title}
                                  </Link>
                                </div>
                                <div className="text-button tf-btn-remove remove" role="button" tabIndex={0} onClick={() => removeCartLine(product.id)}>
                                  Retirer
                                </div>
                              </div>
                              <div className="d-flex align-items-center justify-content-between flex-wrap gap-12">
                                <div className="text-secondary-2">{(product.attributes || []).map((a) => a.option).join(" / ")}</div>
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
                  <div className="tf-mini-cart-tool">
                    <div className="tf-mini-cart-tool-btn btn-add-note" onClick={() => setPopup("note")}>
                      <NoteIcon />
                      <div className="text-caption-1">Note</div>
                    </div>
                    <div className="tf-mini-cart-tool-btn btn-estimate-shipping" onClick={() => setPopup("shipping")}>
                      <i className="icon icon-shipping" style={{ fontSize: 20 }} />
                      <div className="text-caption-1">Livraison</div>
                    </div>
                    <div className="tf-mini-cart-tool-btn btn-add-coupon" onClick={() => setPopup("coupon")}>
                      <CouponIcon />
                      <div className="text-caption-1">Code promo</div>
                    </div>
                  </div>
                  <div className="tf-mini-cart-bottom-wrap">
                    <div className="tf-cart-totals-discounts">
                      <h5>Sous-total</h5>
                      <h5 className="tf-totals-total-value">{formatPrice(totalPrice)}</h5>
                    </div>
                    <div className="tf-cart-checkbox">
                      <div className="tf-checkbox-wrapp">
                        <input type="checkbox" id="CartDrawer-Form_agree" name="agree_checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
                        <div>
                          <i className="icon-check" />
                        </div>
                      </div>
                      <label htmlFor="CartDrawer-Form_agree">
                        J&apos;accepte les{" "}
                        <Link href="/term-of-use" title="Conditions générales">
                          Conditions générales
                        </Link>
                      </label>
                    </div>
                    <div className="tf-mini-cart-view-checkout">
                      <Link href="/shopping-cart" className="tf-btn w-100 btn-white radius-4 has-border">
                        <span className="text">Voir le panier</span>
                      </Link>
                      {agree && cartProducts.length > 0 ? (
                        <Link href="/shopping-cart" className="tf-btn w-100 btn-fill radius-4">
                          <span className="text">Commander</span>
                        </Link>
                      ) : (
                        <span className="tf-btn w-100 btn-fill radius-4" aria-disabled="true" style={{ opacity: 0.5, cursor: "not-allowed" }} title="Acceptez les conditions pour commander">
                          <span className="text">Commander</span>
                        </span>
                      )}
                    </div>
                    <div className="text-center">
                      <Link className="link text-btn-uppercase" href="/shop">
                        Ou continuer mes achats
                      </Link>
                    </div>
                  </div>
                </div>

                <div className={`tf-mini-cart-tool-openable ${popup === "note" ? "open" : ""}`}>
                  <div className="tf-mini-cart-tool-content">
                    <label htmlFor="Cart-note" className="tf-mini-cart-tool-text">
                      <span className="icon">
                        <NoteIcon />
                      </span>
                      <span className="text-title">Note</span>
                    </label>
                    <form className="form-add-note tf-mini-cart-tool-wrap" onSubmit={saveNote}>
                      <fieldset className="d-flex">
                        <textarea id="Cart-note" name="note" placeholder="Ajoutez des instructions pour votre commande..." value={note} onChange={(e) => setNote(e.target.value)} />
                      </fieldset>
                      <div className="tf-cart-tool-btns">
                        <button type="submit" className="btn-style-2 w-100">
                          <span className="text text-btn-uppercase">Enregistrer</span>
                        </button>
                        <div className="text-center w-100 text-btn-uppercase tf-mini-cart-tool-close" onClick={() => setPopup("")}>
                          Annuler
                        </div>
                      </div>
                    </form>
                  </div>
                </div>

                <div className={`tf-mini-cart-tool-openable ${popup === "shipping" ? "open" : ""}`}>
                  <div className="tf-mini-cart-tool-content">
                    <label className="tf-mini-cart-tool-text">
                      <span className="icon">
                        <i className="icon icon-shipping" />
                      </span>
                      <span className="text-title">Livraison</span>
                    </label>
                    <div className="tf-mini-cart-tool-wrap">
                      <p className="text-secondary mb_20">{DELIVERY_ESTIMATE}</p>
                      <div className="tf-cart-tool-btns">
                        <div className="text-center w-100 text-btn-uppercase tf-mini-cart-tool-close" onClick={() => setPopup("")}>
                          Fermer
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`tf-mini-cart-tool-openable ${popup === "coupon" ? "open" : ""}`}>
                  <div className="tf-mini-cart-tool-content">
                    <label htmlFor="Cart-coupon" className="tf-mini-cart-tool-text">
                      <span className="icon">
                        <CouponIcon />
                      </span>
                      <span className="text-title">Code promo</span>
                    </label>
                    <form className="form-coupon tf-mini-cart-tool-wrap" onSubmit={saveCoupon}>
                      <fieldset className="d-flex mb_12">
                        <input id="Cart-coupon" type="text" name="coupon" placeholder="Votre code promo" value={coupon} onChange={(e) => setCoupon(e.target.value)} />
                      </fieldset>
                      <p className="text-caption-1 text-secondary mb_12">Le code est conservé et sera pris en compte à la validation de la commande.</p>
                      <div className="tf-cart-tool-btns">
                        <button type="submit" className="btn-style-2 w-100">
                          <span className="text text-btn-uppercase">Enregistrer</span>
                        </button>
                        <div className="text-center w-100 text-btn-uppercase tf-mini-cart-tool-close" onClick={() => setPopup("")}>
                          Annuler
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              {saved && (
                <p className="text-caption-1 text-center mt-2" role="status">
                  {saved === "note" ? "Note enregistrée." : "Code promo enregistré."}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
