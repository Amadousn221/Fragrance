import "server-only";
import { wcGet } from "./client";
import { normalizeCategory, normalizeProduct, normalizeVariation } from "./normalize";

const ORDERBY = new Set(["date", "price", "popularity", "rating", "title"]);

/** Liste de produits publies (pagination, categorie par id, recherche, tri). */
export async function getProducts({ page = 1, perPage = 12, category, search, orderby, order, inStockOnly, onSaleOnly, include, exclude, featured } = {}) {
  const { data, totalPages, total } = await wcGet("products", {
    status: "publish",
    page,
    per_page: Math.min(Math.max(Number(perPage) || 12, 1), 50),
    category,
    search,
    orderby: ORDERBY.has(orderby) ? orderby : undefined,
    order: order === "asc" || order === "desc" ? order : undefined,
    include: include?.length ? include.map(Number).join(",") : undefined,
    exclude: exclude?.length ? exclude.map(Number).join(",") : undefined,
    featured: featured ? "true" : undefined,
    stock_status: inStockOnly ? "instock" : undefined,
    on_sale: onSaleOnly ? "true" : undefined,
  });
  return { products: data.map((p) => normalizeProduct(p)), totalPages, total };
}

/**
 * Produits lies : related_ids de WooCommerce en priorite, completes par la categorie
 * principale si besoin. Exclut le produit courant, ne renvoie que des produits publies.
 */
export async function getRelatedProducts(product, limit = 4) {
  const picked = [];
  const seen = new Set([product.id]);
  const add = (list) => {
    for (const p of list) {
      if (picked.length >= limit) break;
      if (!seen.has(p.id)) {
        seen.add(p.id);
        picked.push(p);
      }
    }
  };
  if (product.relatedIds?.length) {
    const ids = product.relatedIds.filter((id) => id !== product.id);
    if (ids.length) {
      const { products } = await getProducts({ include: ids, perPage: Math.min(ids.length, 50) });
      const byId = new Map(products.map((p) => [p.id, p]));
      add(ids.map((id) => byId.get(id)).filter(Boolean)); // ordre WooCommerce conserve
    }
  }
  if (picked.length < limit && product.categories?.length) {
    const { products } = await getProducts({ category: product.categories[0].id, perPage: limit + 1 });
    add(products);
  }
  return picked;
}

/** Produit par slug, avec ses variations (prix, stock, image, attributs) si variable. */
export async function getProductBySlug(slug) {
  const { data } = await wcGet("products", { slug, status: "publish" });
  const product = data[0];
  if (!product) return null;
  // Variations BRUTES : normalizeProduct est le seul point de normalisation.
  const rawVariations =
    product.type === "variable" ? await fetchRawVariations(product.id) : [];
  return normalizeProduct(product, rawVariations);
}

async function fetchRawVariations(productId) {
  const { data } = await wcGet(`products/${Number(productId)}/variations`, { per_page: 100 });
  return data;
}

/** Variations d'un produit variable, deja normalisees. */
export async function getProductVariations(productId) {
  return (await fetchRawVariations(productId)).map(normalizeVariation);
}

export async function getCategories() {
  const { data } = await wcGet("products/categories", { per_page: 100, hide_empty: true });
  return data.map(normalizeCategory);
}

export async function getCategoryBySlug(slug) {
  const { data } = await wcGet("products/categories", { slug });
  return data[0] ? normalizeCategory(data[0]) : null;
}
