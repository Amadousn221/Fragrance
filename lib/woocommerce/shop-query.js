// Parametres d'URL de la boutique (?sort=&stock=1&sale=1&view=list&page=2) <-> requete WooCommerce.
// Module pur : aucun secret. Les valeurs inconnues retombent sur les valeurs par defaut.

export const SORTS = {
  date: { label: "Nouveautés", orderby: "date", order: "desc" },
  "price-asc": { label: "Prix croissant", orderby: "price", order: "asc" },
  "price-desc": { label: "Prix décroissant", orderby: "price", order: "desc" },
  popularity: { label: "Popularité", orderby: "popularity", order: "desc" },
};

export const PER_PAGE = 12;

const first = (v) => (Array.isArray(v) ? v[0] : v);

export function parseShopParams(sp = {}) {
  const sort = SORTS[first(sp.sort)] ? first(sp.sort) : "date";
  const page = Math.max(1, parseInt(first(sp.page), 10) || 1);
  return {
    sort,
    stock: first(sp.stock) === "1",
    sale: first(sp.sale) === "1",
    view: first(sp.view) === "list" ? "list" : "grid",
    page,
  };
}

/** Arguments pour getProducts(). */
export function toWooQuery(state, extra = {}) {
  const { orderby, order } = SORTS[state.sort];
  return {
    page: state.page,
    perPage: PER_PAGE,
    orderby,
    order,
    inStockOnly: state.stock,
    onSaleOnly: state.sale,
    ...extra,
  };
}

/** Query string pour un lien, en appliquant `patch` sur l'etat courant (valeurs par defaut omises). */
export function shopHref(basePath, state, patch = {}) {
  const next = { ...state, ...patch };
  if (!("page" in patch)) next.page = 1; // tout changement de tri/filtre/vue revient a la page 1
  const qs = new URLSearchParams();
  if (next.sort !== "date") qs.set("sort", next.sort);
  if (next.stock) qs.set("stock", "1");
  if (next.sale) qs.set("sale", "1");
  if (next.view === "list") qs.set("view", "list");
  if (next.page > 1) qs.set("page", String(next.page));
  const s = qs.toString();
  return s ? `${basePath}?${s}` : basePath;
}
