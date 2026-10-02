import "server-only";
import { wcGet } from "./client";
import { decodeEntities } from "./normalize";

const stripTags = (s = "") => decodeEntities(String(s).replace(/<[^>]*>/g, " ")).replace(/\s+/g, " ").trim();

/** Avis approuves d'un produit, normalises (le courriel n'est jamais expose). */
export async function getProductReviews(productId) {
  const { data } = await wcGet(
    "products/reviews",
    { product: Number(productId), status: "approved", per_page: 50 },
    { revalidate: 60, tags: ["woocommerce", `reviews-${productId}`] }
  );
  return data.map((r) => ({
    id: r.id,
    author: decodeEntities(r.reviewer || "Client"),
    rating: Number(r.rating) || 0,
    date: r.date_created_gmt ? `${r.date_created_gmt}Z` : r.date_created,
    content: stripTags(r.review),
    verified: Boolean(r.verified),
  }));
}
