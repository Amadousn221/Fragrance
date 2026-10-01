"use client";
import React from "react";
import Link from "next/link";

import { useContextElement } from "@/context/Context";
import { formatPrice } from "@/lib/format";

export default function Wishlist() {
  const { removeFromWishlist, wishlistItems: items } = useContextElement();
  return (
    <div className="modal fullRight fade modal-wishlist" id="wishlist">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="header">
            <h5 className="title">Mes favoris</h5>
            <span
              className="icon-close icon-close-popup"
              data-bs-dismiss="modal"
            />
          </div>
          <div className="wrap">
            <div className="tf-mini-cart-wrap">
              <div className="tf-mini-cart-main">
                <div className="tf-mini-cart-sroll">
                  {items.length ? (
                    <div className="tf-mini-cart-items">
                      {items.map((elm) => (
                        <div key={elm.product_id} className="tf-mini-cart-item file-delete">
                          <div className="tf-mini-cart-image">
                            <img
                              className="lazyload"
                              alt=""
                              src={elm.image}
                              width={600}
                              height={800}
                            />
                          </div>
                          <div className="tf-mini-cart-info flex-grow-1">
                            <div className="mb_12 d-flex align-items-center justify-content-between flex-wrap gap-12">
                              <div className="text-title">
                                <Link
                                  href={`/product/${elm.slug}`}
                                  className="link text-line-clamp-1"
                                >
                                  {elm.name}
                                </Link>
                              </div>
                              <div
                                className="text-button tf-btn-remove remove"
                                onClick={() => removeFromWishlist(elm.product_id)}
                              >
                                Remove
                              </div>
                            </div>
                            <div className="d-flex align-items-center justify-content-between flex-wrap gap-12">
                                                            <div className="text-button">
                                {formatPrice(elm.price)}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4">
                      Votre liste de favoris est vide.{" "}
                      <Link className="btn-line" href="/shop">
                        Découvrir la boutique
                      </Link>
                    </div>
                  )}
                </div>
              </div>
              <div className="tf-mini-cart-bottom">
                <Link
                  href={`/wish-list`}
                  className="btn-style-2 w-100 radius-4 view-all-wishlist"
                >
                  <span className="text-btn-uppercase">Voir mes favoris</span>
                </Link>
                <Link href={`/shop`} className="text-btn-uppercase">
                  Ou continuer vos achats
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
