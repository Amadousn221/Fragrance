import Link from "next/link";
import WooProductCard from "./WooProductCard";
import WooProductCardList from "./WooProductCardList";
import { SORTS, shopHref } from "@/lib/woocommerce/shop-query";

// Barre de controle + liste + pagination de la boutique (balisage Modave).
// Tout est pilote par l'URL : tri, filtres et vue sont appliques cote serveur (WooCommerce).
export default function ShopCatalog({ products, total, totalPages, state, basePath = "/shop" }) {
  const href = (patch) => shopHref(basePath, state, patch);

  return (
    <>
      <div className="tf-shop-control" style={{ flexWrap: "wrap", rowGap: 12 }}>
        <div className="tf-control-filter" style={{ flexWrap: "wrap", rowGap: 8 }}>
          <Link
            href={href({ stock: !state.stock })}
            scroll={false}
            className={`d-flex shop-sale-text ${state.stock ? "active" : ""}`}
          >
            <i className="icon icon-checkCircle" />
            <p className="text-caption-1">En stock uniquement</p>
          </Link>
          <Link
            href={href({ sale: !state.sale })}
            scroll={false}
            className={`d-flex shop-sale-text ${state.sale ? "active" : ""}`}
          >
            <i className="icon icon-checkCircle" />
            <p className="text-caption-1">Promotions uniquement</p>
          </Link>
        </div>
        <ul className="tf-control-layout">
          <li
            className={`tf-view-layout-switch sw-layout-list list-layout ${
              state.view === "list" ? "active" : ""
            }`}
          >
            <Link href={href({ view: "list" })} scroll={false} className="item" aria-label="Affichage liste">
              <svg className="icon" width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx={3} cy={6} r="2.5" stroke="#181818" />
                <rect x="7.5" y="3.5" width={12} height={5} rx="2.5" stroke="#181818" />
                <circle cx={3} cy={14} r="2.5" stroke="#181818" />
                <rect x="7.5" y="11.5" width={12} height={5} rx="2.5" stroke="#181818" />
              </svg>
            </Link>
          </li>
          <li
            className={`tf-view-layout-switch sw-layout-4 ${state.view === "grid" ? "active" : ""}`}
          >
            <Link href={href({ view: "grid" })} scroll={false} className="item" aria-label="Affichage grille">
              <svg className="icon" width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx={6} cy={6} r="2.5" stroke="#181818" />
                <circle cx={14} cy={6} r="2.5" stroke="#181818" />
                <circle cx={6} cy={14} r="2.5" stroke="#181818" />
                <circle cx={14} cy={14} r="2.5" stroke="#181818" />
              </svg>
            </Link>
          </li>
        </ul>
        <div className="tf-control-sorting">
          <p className="d-none d-lg-block text-caption-1">Trier par :</p>
          <div className="tf-dropdown-sort" data-bs-toggle="dropdown">
            <div className="btn-select">
              <span className="text-sort-value">{SORTS[state.sort].label}</span>
              <span className="icon icon-arrow-down" />
            </div>
            <div className="dropdown-menu">
              {Object.entries(SORTS).map(([key, { label }]) => (
                <Link
                  key={key}
                  href={href({ sort: key })}
                  scroll={false}
                  className={`select-item ${state.sort === key ? "active" : ""}`}
                >
                  <span className="text-value-item">{label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="wrapper-control-shop">
        <p className="text-caption-1 mb-3">
          {total} produit{total > 1 ? "s" : ""}
        </p>
        {!products.length ? (
          <p className="text-center">Aucun produit ne correspond à ces critères.</p>
        ) : state.view === "list" ? (
          <div className="tf-list-layout wrapper-shop" id="listLayout">
            {products.map((product) => (
              <WooProductCardList key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="tf-grid-layout tf-col-2 lg-col-3 xl-col-4 wrapper-shop" id="gridLayout">
            {products.map((product) => (
              <WooProductCard key={product.id} product={product} gridClass="grid" />
            ))}
          </div>
        )}
        {totalPages > 1 && (
          <ul className="wg-pagination">
            <li>
              {state.page > 1 ? (
                <Link className="pagination-item text-button" href={href({ page: state.page - 1 })} aria-label="Page précédente">
                  <i className="icon-arrLeft" />
                </Link>
              ) : (
                <a className="pagination-item text-button disabled" aria-disabled="true">
                  <i className="icon-arrLeft" />
                </a>
              )}
            </li>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <li key={page} className={page === state.page ? "active" : ""}>
                <Link className="pagination-item text-button" href={href({ page })}>
                  {page}
                </Link>
              </li>
            ))}
            <li>
              {state.page < totalPages ? (
                <Link className="pagination-item text-button" href={href({ page: state.page + 1 })} aria-label="Page suivante">
                  <i className="icon-arrRight" />
                </Link>
              ) : (
                <a className="pagination-item text-button disabled" aria-disabled="true">
                  <i className="icon-arrRight" />
                </a>
              )}
            </li>
          </ul>
        )}
      </div>
    </>
  );
}
