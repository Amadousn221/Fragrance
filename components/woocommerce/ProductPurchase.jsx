"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import QuantitySelect from "@/components/productDetails/QuantitySelect";
import ProductGallery from "./ProductGallery";
import { useContextElement } from "@/context/Context";
import { formatPrice } from "@/lib/format";
import { wishlistEntry } from "@/lib/woocommerce/wishlist";
import {
  findVariation,
  getOptionState,
  getPriceRange,
  getStaticAttributes,
  getVariationAttributes,
} from "@/lib/woocommerce/variations";

const COLOR_ATTRS = /^(couleur|color|colour)$/i;
const COLOR_HEX = {
  "blanc ivoire": "#F4EFE4", ivoire: "#F4EFE4", blanc: "#FFFFFF", noir: "#111111", gris: "#9A9A9A",
  beige: "#D9C7A8", marron: "#6B4A33", camel: "#B98A55", rouge: "#C0262D", bordeaux: "#6D1A2A",
  rose: "#E8A5B7", orange: "#E8762C", jaune: "#F2C94C", vert: "#3C8D5A", kaki: "#7A7A4B",
  bleu: "#2F5FA8", "bleu marine": "#1B2A4A", marine: "#1B2A4A", violet: "#6F4A8E",
  dore: "#C9A24A", "doré": "#C9A24A", argent: "#C0C0C0", "argenté": "#C0C0C0",
};
// Pastille pour l'attribut Couleur ; null (bouton texte) si la teinte est inconnue.
function getColorSwatch(attrName, option) {
  if (!COLOR_ATTRS.test(attrName)) return null;
  return COLOR_HEX[String(option).trim().toLowerCase()] || null;
}

// Fiche produit WooCommerce dans le design Modave (structure de Details1).
// Les selecteurs sont generes depuis les attributs WooCommerce (variation: true).
export default function ProductPurchase({ product }) {
  const { addWooItem, toggleWishlist, isAddedtoWishlist } = useContextElement();
  const variationAttrs = useMemo(() => getVariationAttributes(product), [product]);
  const staticAttrs = useMemo(() => getStaticAttributes(product), [product]);
  const isVariable = product.type === "variable";

  const [selection, setSelection] = useState({});
  const [quantity, setQuantity] = useState(1);

  const variation = isVariable ? findVariation(product, selection) : null;
  const ready = !isVariable || Boolean(variation);
  const current = variation || product; // sku affiche
  const inStock = variation ? variation.inStock : product.inStock;

  // Galerie : images produit + images de variations absentes de la galerie.
  const images = useMemo(() => {
    const list = [...product.images];
    for (const v of product.variations) {
      if (v.image && !list.some((i) => i.src === v.image.src)) list.push(v.image);
    }
    return list.length ? list : [{ id: 0, src: product.imgSrc, alt: product.title }];
  }, [product]);

  const price = variation ? variation.price : product.price;
  const regular = variation ? variation.regularPrice : product.oldPrice;
  const onSale = variation ? variation.onSale : product.isOnSale;
  const range = isVariable && !variation ? getPriceRange(product) : null;

  let label = "Ajouter au panier";
  if (!ready) label = "Choisir les options";
  else if (!inStock) label = "Rupture de stock";
  const canAdd = ready && inStock;

  const select = (name, option) =>
    setSelection((s) => ({ ...s, [name]: s[name] === option ? undefined : option }));

  const handleAdd = () => {
    if (!canAdd) return;
    addWooItem({
      product_id: product.id,
      variation_id: variation ? variation.id : null,
      slug: product.slug,
      name: product.title,
      quantity,
      price,
      regular_price: regular ?? price,
      sale_price: onSale ? price : null,
      image: variation?.image?.src || product.imgSrc,
      sku: variation?.sku || product.sku,
      attributes: variation ? variation.attributes : [],
    });
  };

  const stockText = !ready
    ? product.inStock
      ? "En stock"
      : "Rupture de stock"
    : inStock
    ? "En stock"
    : "Rupture de stock";

  return (
    <section className="flat-spacing">
      <div className="tf-main-product section-image-zoom">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="tf-product-media-wrap sticky-top">
                <ProductGallery images={images} activeSrc={variation?.image?.src} />
              </div>
            </div>
            <div className="col-md-6">
              <div className="tf-product-info-wrap position-relative mw-100p-hidden">
                <div className="tf-product-info-list other-image-zoom">
                  <div className="tf-product-info-heading">
                    <div className="tf-product-info-name">
                      {product.categories[0] && (
                        <div className="text text-btn-uppercase">{product.categories[0].name}</div>
                      )}
                      <h3 className="name">{product.title}</h3>
                    </div>
                    <div className="tf-product-info-desc">
                      <div className="tf-product-info-price">
                        {range && range[0] !== range[1] ? (
                          <h5 className="price-on-sale font-2">
                            {formatPrice(range[0])} – {formatPrice(range[1])}
                          </h5>
                        ) : (
                          <>
                            <h5 className="price-on-sale font-2">
                              {formatPrice(range ? range[0] : price)}
                            </h5>
                            {onSale && regular ? (
                              <>
                                <div className="compare-at-price font-2">{formatPrice(regular)}</div>
                                <div className="badges-on-sale text-btn-uppercase">
                                  -{Math.round((1 - price / regular) * 100)}%
                                </div>
                              </>
                            ) : null}
                          </>
                        )}
                      </div>
                      {product.shortDescription && <p>{product.shortDescription}</p>}
                    </div>
                  </div>

                  <div className="tf-product-info-choose-option">
                    {variationAttrs.map((attr) => (
                      <div className="variant-picker-item" key={attr.name}>
                        <div className="d-flex justify-content-between mb_12">
                          <div className="variant-picker-label">
                            {attr.name} :
                            <span className="text-title variant-picker-label-value">
                              {" "}
                              {selection[attr.name] || "—"}
                            </span>
                          </div>
                        </div>
                        <div className="variant-picker-values gap12">
                          {attr.options.map((option) => {
                            const state = getOptionState(product, selection, attr.name, option);
                            const disabled = state !== "ok";
                            const swatch = getColorSwatch(attr.name, option);
                            const id = `opt-${attr.name}-${option}`.replace(/\s+/g, "-");
                            return (
                              <div key={option}>
                                {/* Clic gere sur l'input : un clic sur le label le declenche une seule fois. */}
                                <input
                                  type="radio"
                                  id={id}
                                  name={`attr-${attr.name}`}
                                  checked={selection[attr.name] === option}
                                  disabled={disabled}
                                  onClick={() => !disabled && select(attr.name, option)}
                                  readOnly
                                />
                                {swatch ? (
                                  <label
                                    className={`hover-tooltip tooltip-bot radius-60 color-btn ${
                                      selection[attr.name] === option ? "active" : ""
                                    } ${disabled ? "type-disable" : ""}`}
                                    htmlFor={id}
                                    aria-label={option}
                                  >
                                    <span
                                      className="btn-checkbox"
                                      style={{ backgroundColor: swatch, boxShadow: "inset 0 0 0 1px rgba(0,0,0,.18)" }}
                                    />
                                    <span className="tooltip">{option}</span>
                                  </label>
                                ) : (
                                  <label
                                    className={`style-text size-btn ${disabled ? "type-disable" : ""}`}
                                    htmlFor={id}
                                    title={
                                      state === "outofstock"
                                        ? "Rupture de stock"
                                        : state === "impossible"
                                        ? "Combinaison indisponible"
                                        : undefined
                                    }
                                  >
                                    <span className="text-title">{option}</span>
                                  </label>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}

                    <div className="tf-product-info-quantity">
                      <div className="title mb_12">Quantité :</div>
                      <QuantitySelect quantity={quantity} setQuantity={setQuantity} />
                    </div>

                    <div>
                      <div className="tf-product-info-by-btn mb_10">
                        <button
                          type="button"
                          onClick={handleAdd}
                          disabled={!canAdd}
                          aria-disabled={!canAdd}
                          className="btn-style-2 flex-grow-1 text-btn-uppercase fw-6 btn-add-to-cart"
                          style={canAdd ? undefined : { opacity: 0.6, cursor: "not-allowed" }}
                        >
                          <span>{label}</span>
                          {canAdd && (
                            <span className="tf-qty-price total-price">
                              {" "}
                              - {formatPrice(price * quantity)}
                            </span>
                          )}
                        </button>
                        <a
                          onClick={() => toggleWishlist(wishlistEntry(product, variation?.image?.src))}
                          className="box-icon hover-tooltip text-caption-2 wishlist btn-icon-action"
                        >
                          <span className="icon icon-heart" />
                          <span className="tooltip text-caption-2">
                            {isAddedtoWishlist(product.id) ? "Déjà dans les favoris" : "Favoris"}
                          </span>
                        </a>
                      </div>
                    </div>

                    {staticAttrs.length > 0 && (
                      <ul className="tf-product-info-sku">
                        {staticAttrs.map((a) => (
                          <li key={a.name}>
                            <p className="text-caption-1">{a.name} :</p>
                            <p className="text-caption-1 text-1">{a.options.join(", ")}</p>
                          </li>
                        ))}
                      </ul>
                    )}

                    <ul className="tf-product-info-sku">
                      {current.sku && (
                        <li>
                          <p className="text-caption-1">SKU :</p>
                          <p className="text-caption-1 text-1">{current.sku}</p>
                        </li>
                      )}
                      <li>
                        <p className="text-caption-1">Disponibilité :</p>
                        <p className="text-caption-1 text-1">{stockText}</p>
                      </li>
                      {product.categories.length > 0 && (
                        <li>
                          <p className="text-caption-1">Catégories :</p>
                          <p className="text-caption-1">
                            {product.categories.map((c, i) => (
                              <span key={c.id}>
                                {i > 0 && ", "}
                                <Link href={`/category/${c.slug}`} className="text-1 link">
                                  {c.name}
                                </Link>
                              </span>
                            ))}
                          </p>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
