// Transforme les objets WooCommerce vers la forme attendue par les composants du template
// (id, title, price, oldPrice, imgSrc, imgHover, isOnSale...) + champs utiles a Fragrance.
// Module pur : aucun secret, utilisable cote serveur comme cote client.

const toNumber = (v) => (v === "" || v == null ? null : Number(v));

const stripHtml = (html = "") => html.replace(/<[^>]*>/g, "").trim();

function normalizeImage(img) {
  return { id: img.id, src: img.src, alt: img.alt || img.name || "" };
}

export function normalizeCategory(c) {
  return {
    id: c.id,
    slug: c.slug,
    name: c.name,
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

export function normalizeProduct(p, variations = []) {
  const images = (p.images || []).map(normalizeImage);
  const price = toNumber(p.price);
  const regular = toNumber(p.regular_price);
  const onSale = Boolean(p.on_sale);
  return {
    // Champs compatibles template
    id: p.id,
    title: p.name,
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
    categories: (p.categories || []).map((c) => ({ id: c.id, slug: c.slug, name: c.name })),
    attributes: (p.attributes || []).map((a) => ({
      id: a.id,
      name: a.name,
      variation: a.variation,
      options: a.options,
    })),
    variationIds: p.variations || [],
    variations: variations.map(normalizeVariation),
  };
}
