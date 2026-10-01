import "server-only";
import { wcGet } from "./client";
import { normalizeCategory, normalizeProduct, normalizeVariation } from "./normalize";

const ORDERBY = new Set(["date", "price", "popularity", "rating", "title"]);

/** Liste de produits publies (pagination, categorie par id, recherche, tri). */
export async function getProducts({ page = 1, perPage = 12, category, search, orderby, order } = {}) {
  const { data, totalPages, total } = await wcGet("products", {
    status: "publish",
    page,
    per_page: Math.min(Math.max(Number(perPage) || 12, 1), 50),
    category,
    search,
    orderby: ORDERBY.has(orderby) ? orderby : undefined,
    order: order === "asc" || order === "desc" ? order : undefined,
  });
  return { products: data.map((p) => normalizeProduct(p)), totalPages, total };
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
