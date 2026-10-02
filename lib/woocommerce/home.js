import "server-only";
import { getCategories, getProducts, isWooConfigured } from "./index";
import { HOME_AUDIENCES, HOME_TYPES } from "./home-config";

// Visuel de repli des blocs de l'accueil (categorie sans image ni produit illustre).
const PLACEHOLDER = "/images/home/placeholder-fragrance.jpg";

/**
 * Resout les blocs de configuration vers de vraies categories WooCommerce.
 * Image : image de la categorie WooCommerce, sinon visuel editorial local (`entry.image`), sinon image du produit
 * publie le plus recent de la categorie.
 * Renvoie uniquement les blocs disponibles (categorie existante et non vide).
 */
async function resolveBlocks(config, categories) {
  const bySlug = new Map(categories.map((c) => [c.slug, c]));
  const blocks = [];
  for (const entry of config) {
    const category = entry.slugs.map((s) => bySlug.get(s)).find((c) => c && c.count > 0);
    if (!category) continue;
    // Priorite : image de la categorie WooCommerce > visuel editorial local > image du produit recent > placeholder.
    let image = category.image?.src || entry.image || null;
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
 * Selection du moment (jusqu'a `count` produits, tous avec image) :
 *   1. produits "mis en avant" (etoile) dans WooCommerce ;
 *   2. completee par popularite WooCommerce (total_sales), en stock ;
 *   3. completee par les produits les plus recents, en stock.
 * Les produits deja affiches dans "Nouveautes" (`exclude`) sont evites. Si la boutique est trop petite pour
 * atteindre `min` produits sans eux, la selection est completee en les reutilisant (jamais de produit invente).
 */
export async function getHomeFeatured({ count, min, exclude = [] }) {
  const picked = [];
  const seen = new Set(exclude);
  const add = (products) => {
    for (const p of withImage(products)) {
      if (picked.length >= count) return;
      if (!seen.has(p.id)) {
        seen.add(p.id);
        picked.push(p);
      }
    }
  };
  const fetchStep = (query) => getProducts({ perPage: count + SPARE, ...query }).then((r) => r.products);

  add(await fetchStep({ featured: true, orderby: "date", order: "desc" }));
  if (picked.length < count) {
    add(await fetchStep({ orderby: "popularity", order: "desc", inStockOnly: true, exclude: [...seen] }));
  }
  if (picked.length < count) {
    add(await fetchStep({ orderby: "date", order: "desc", inStockOnly: true, exclude: [...seen] }));
  }
  if (picked.length < min && exclude.length) {
    seen.clear();
    picked.forEach((p) => seen.add(p.id));
    add(await fetchStep({ featured: true, orderby: "date", order: "desc" }));
    if (picked.length < min) add(await fetchStep({ orderby: "popularity", order: "desc", inStockOnly: true }));
  }
  return { products: picked };
}
