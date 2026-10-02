import "server-only";
import { getCategories, getProducts, isWooConfigured } from "./index";
import { HOME_AUDIENCES, HOME_TYPES } from "./home-config";

const PLACEHOLDER = "/images/products/placeholder.svg";

/**
 * Resout les blocs de configuration vers de vraies categories WooCommerce.
 * Image : image de la categorie si elle existe, sinon image du produit publie le plus recent de la categorie.
 * Renvoie uniquement les blocs disponibles (categorie existante et non vide).
 */
async function resolveBlocks(config, categories) {
  const bySlug = new Map(categories.map((c) => [c.slug, c]));
  const blocks = [];
  for (const entry of config) {
    const category = entry.slugs.map((s) => bySlug.get(s)).find((c) => c && c.count > 0);
    if (!category) continue;
    let image = category.image?.src || null;
    if (!image) {
      try {
        const { products } = await getProducts({ category: category.id, perPage: 6, orderby: "date", order: "desc" });
        image = products.find((p) => p.images.length)?.images[0].src || null;
      } catch {
        image = null;
      }
    }
    blocks.push({
      key: entry.key,
      label: entry.label,
      slug: category.slug,
      href: `/category/${category.slug}`,
      count: category.count,
      image: image || PLACEHOLDER,
    });
  }
  return blocks;
}

/** Categories de l'accueil (Homme/Femme/Unisexe + types). Ne leve jamais : renvoie des listes vides en cas d'echec. */
export async function getHomeCategoryBlocks() {
  if (!isWooConfigured()) return { audiences: [], types: [] };
  try {
    const categories = await getCategories();
    const [audiences, types] = await Promise.all([
      resolveBlocks(HOME_AUDIENCES, categories),
      resolveBlocks(HOME_TYPES, categories),
    ]);
    return { audiences, types };
  } catch {
    return { audiences: [], types: [] };
  }
}

// Les catalogues d'accueil n'affichent que des produits avec une vraie image (un visuel gris "image indisponible"
// n'a pas sa place en page d'accueil). Ces produits restent visibles dans /shop. On en demande un peu plus pour compenser.
const SPARE = 6;
const withImage = (products) => products.filter((p) => p.images.length > 0);

/** Nouveautes : derniers produits publies (avec image). */
export async function getHomeNewArrivals(count) {
  const { products } = await getProducts({ perPage: count + SPARE, orderby: "date", order: "desc" });
  return withImage(products).slice(0, count);
}

/**
 * Selection du moment : produits "mis en avant" (etoile) dans WooCommerce. S'il y en a moins que `min`,
 * la selection est completee par popularite WooCommerce (ventes) en excluant les produits deja affiches
 * dans "Nouveautes". Aucun produit n'est invente : tout vient de WooCommerce.
 */
export async function getHomeFeatured({ count, min, exclude = [] }) {
  const featured = withImage((await getProducts({ perPage: count, featured: true, orderby: "date", order: "desc" })).products);
  if (featured.length >= min) return { products: featured, source: "featured" };
  const seen = new Set(featured.map((p) => p.id));
  const { products: popular } = await getProducts({
    perPage: count + SPARE,
    orderby: "popularity",
    order: "desc",
    inStockOnly: true,
    exclude: [...exclude, ...seen],
  });
  return { products: [...featured, ...withImage(popular)].slice(0, count), source: "popularity" };
}
