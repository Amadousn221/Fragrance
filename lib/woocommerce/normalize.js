// Transforme les objets WooCommerce vers la forme attendue par les composants du template
// (id, title, price, oldPrice, imgSrc, imgHover, isOnSale...) + champs utiles a Fragrance.
// Module pur : aucun secret, utilisable cote serveur comme cote client.

const toNumber = (v) => (v === "" || v == null ? null : Number(v));

const stripHtml = (html = "") => html.replace(/<[^>]*>/g, "").trim();

// WooCommerce renvoie les noms avec des entites HTML (&amp;, &#8211;...) : on les decode pour l'affichage React.
const NAMED = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };
export const decodeEntities = (s = "") =>
  String(s).replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e) => {
    if (e[0] === "#") {
      const code = e[1].toLowerCase() === "x" ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10);
      return Number.isFinite(code) ? String.fromCodePoint(code) : m;
    }
    return NAMED[e.toLowerCase()] ?? m;
  });

function normalizeImage(img) {
  return { id: img.id, src: img.src, alt: img.alt || img.name || "" };
}

export function normalizeCategory(c) {
  return {
    id: c.id,
    slug: c.slug,
    name: decodeEntities(c.name),
    parent: c.parent,
    count: c.count,
    image: c.image ? normalizeImage(c.image) : null,
  };
}

export function normalizeVariation(v) {
  return {
    id: v.id,
    sku: v.sku,
    price: toNumber(v.price),
    regularPrice: toNumber(v.regular_price),
    salePrice: toNumber(v.sale_price),
    onSale: v.on_sale,
    inStock: v.stock_status === "instock" || v.stock_status === "onbackorder",
    stockQuantity: v.stock_quantity,
    image: v.image ? normalizeImage(v.image) : null,
    attributes: (v.attributes || []).map((a) => ({ name: a.name, option: a.option })),
  };
}

/** `variations` : objets WooCommerce bruts (GET products/{id}/variations). */
export function normalizeProduct(p, variations = []) {
  const images = (p.images || []).map(normalizeImage);
  const price = toNumber(p.price);
  const regular = toNumber(p.regular_price);
  const onSale = Boolean(p.on_sale);
  return {
    // Champs compatibles template
    id: p.id,
    title: decodeEntities(p.name),
    price,
    oldPrice: onSale && regular ? regular : undefined,
    isOnSale: onSale,
    salePercentage:
      onSale && regular && price ? `${Math.round((1 - price / regular) * 100)}%` : undefined,
    imgSrc: images[0]?.src || "/images/products/placeholder.jpg",
    imgHover: images[1]?.src || images[0]?.src || "/images/products/placeholder.jpg",
    inStock: p.stock_status === "instock" || p.stock_status === "onbackorder",
    // Champs WooCommerce
    slug: p.slug,
    sku: p.sku,
    type: p.type,
    images,
    shortDescription: stripHtml(p.short_description),
    description: p.description,
    stockStatus: p.stock_status,
    stockQuantity: p.stock_quantity,
    manageStock: p.manage_stock,
    categories: (p.categories || []).map((c) => ({ id: c.id, slug: c.slug, name: decodeEntities(c.name) })),
    attributes: (p.attributes || []).map((a) => ({
      id: a.id,
      name: a.name,
      variation: a.variation,
      options: a.options,
    })),
    variationIds: p.variations || [],
    relatedIds: p.related_ids || [],
    variations: variations.map(normalizeVariation),
  };
}
