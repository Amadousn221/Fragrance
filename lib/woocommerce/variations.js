// Logique pure de selection de variations WooCommerce (client et serveur).
// Entrees : produit normalise (normalizeProduct) ; aucune dependance serveur.

const slug = (s) =>
  String(s ?? "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();

const same = (a, b) => slug(a) === slug(b);

/** Attributs servant a choisir une variation (variation: true, avec des options). */
export function getVariationAttributes(product) {
  if (product.type !== "variable") return [];
  return product.attributes.filter((a) => a.variation && a.options?.length);
}

/** Attributs descriptifs (non utilises pour choisir une variation). */
export function getStaticAttributes(product) {
  return product.attributes.filter((a) => !a.variation && a.options?.length);
}

// Une variation WooCommerce a pour attribut un `option` vide = "n'importe quelle valeur".
function matches(variation, selection) {
  return variation.attributes.every((a) => {
    if (!a.option) return true;
    const chosen = selection[a.name];
    return chosen === undefined || same(chosen, a.option);
  });
}

/** Variation correspondant a une selection COMPLETE, sinon null. */
export function findVariation(product, selection) {
  const attrs = getVariationAttributes(product);
  if (!attrs.every((a) => selection[a.name])) return null;
  return product.variations.find((v) => matches(v, selection)) || null;
}

/**
 * Etat d'une option pour un attribut, vu les autres choix deja faits :
 *  - "ok"         : au moins une variation en stock compatible
 *  - "outofstock" : combinaisons existantes mais toutes en rupture
 *  - "impossible" : aucune variation ne combine cette option avec la selection
 */
export function getOptionState(product, selection, attrName, option) {
  const others = { ...selection };
  delete others[attrName];
  const candidates = product.variations.filter((v) =>
    matches(v, { ...others, [attrName]: option })
  );
  if (!candidates.length) return "impossible";
  return candidates.some((v) => v.inStock) ? "ok" : "outofstock";
}

/** Fourchette de prix [min, max] de toutes les variations (hors rupture si possible). */
export function getPriceRange(product) {
  const prices = product.variations.filter((v) => v.price != null).map((v) => v.price);
  if (!prices.length) return product.price != null ? [product.price, product.price] : null;
  return [Math.min(...prices), Math.max(...prices)];
}
