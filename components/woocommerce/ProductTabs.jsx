"use client";
import { useEffect, useState } from "react";
import ProductReviews from "./ProductReviews";
import { SHIPPING_SECTIONS, RETURN_SECTIONS } from "@/lib/woocommerce/product-info-config";

function Sections({ sections }) {
  return sections.map((s) => (
    <div className="w-100" key={s.title}>
      <div className="text-btn-uppercase mb_12">{s.title}</div>
      {s.paragraphs?.map((p) => (
        <p className="mb_12 text-secondary" key={p}>
          {p}
        </p>
      ))}
      {s.items && (
        <ul className="list-text type-disc mb_12 gap-6">
          {s.items.map((i) => (
            <li className="text-secondary font-2" key={i}>
              {i}
            </li>
          ))}
        </ul>
      )}
    </div>
  ));
}

// Onglets de la fiche produit (style du theme Modave) : description WooCommerce, avis, livraison et retours.
export default function ProductTabs({ product, reviews = [] }) {
  const [activeTab, setActiveTab] = useState(1);
  // Permet à la fiche d'ouvrir un onglet (ex. « Livraison & retours »).
  useEffect(() => {
    const open = (e) => setActiveTab(Number(e.detail) || 1);
    window.addEventListener("product-tab", open);
    return () => window.removeEventListener("product-tab", open);
  }, []);
  const details = [
    ...(product.sku ? [{ label: "SKU", value: product.sku }] : []),
    ...product.attributes.filter((a) => a.options?.length).map((a) => ({ label: a.name, value: a.options.join(", ") })),
  ];
  const tabs = [
    { id: 1, label: "Description" },
    { id: 2, label: "Avis clients" },
    { id: 3, label: "Livraison & retours" },
    { id: 4, label: "Politique de retour" },
  ];
  const pane = (id) => `widget-content-inner ${activeTab === id ? "active" : ""}`;

  return (
    <section className="flat-spacing-1" id="product-tabs">
      <div className="container">
        <div className="widget-tabs style-1">
          <ul className="widget-menu-tab">
            {tabs.map((t) => (
              <li key={t.id} className={`item-title ${activeTab === t.id ? "active" : ""}`} onClick={() => setActiveTab(t.id)}>
                <span className="inner">{t.label}</span>
              </li>
            ))}
          </ul>
          <div className="widget-content-tab">
            <div className={pane(1)}>
              <div className="tab-description">
                <div className="right">
                  <div className="letter-1 text-btn-uppercase mb_12">{product.title}</div>
                  {product.description ? (
                    <div className="text-secondary" dangerouslySetInnerHTML={{ __html: product.description }} />
                  ) : (
                    <p className="text-secondary">{product.shortDescription}</p>
                  )}
                </div>
                {details.length > 0 && (
                  <div className="left">
                    <div className="letter-1 text-btn-uppercase mb_12">Détails du produit</div>
                    <ul className="list-text type-disc mb_12 gap-6">
                      {details.map((d) => (
                        <li key={d.label} className="font-2">
                          {d.label} : {d.value}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
            <div className={pane(2)}>
              <div className="tab-reviews write-cancel-review-wrap">
                <ProductReviews productId={product.id} reviews={reviews} />
              </div>
            </div>
            <div className={pane(3)}>
              <div className="tab-shipping">
                <Sections sections={SHIPPING_SECTIONS} />
              </div>
            </div>
            <div className={pane(4)}>
              <div className="tab-policies">
                <Sections sections={RETURN_SECTIONS} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
