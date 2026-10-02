// Configuration de la page d'accueil. Module pur (aucun secret).
//
// Les blocs de l'accueil sont relies a des categories WooCommerce reelles. Chaque bloc liste les slugs
// acceptes, par ordre de preference : le premier slug present dans WooCommerce (et contenant au moins un
// produit publie) est utilise. Un bloc dont aucun slug n'existe n'est PAS affiche (aucun faux bloc,
// aucun filtrage de remplacement). Pour activer un bloc, creer la categorie correspondante dans WooCommerce
// (Produits > Categories) avec l'un des slugs ci-dessous, puis lui ajouter une image (sinon l'image du
// produit le plus recent de la categorie est utilisee).

/** Section 02 : Homme / Femme / Unisexe. `label` = texte affiche. */
export const HOME_AUDIENCES = [
  { key: "homme", label: "Homme", slugs: ["homme", "men"] },
  { key: "femme", label: "Femme", slugs: ["femme", "women"] },
  { key: "unisexe", label: "Unisexe", slugs: ["unisexe", "unisex"] },
];

/**
 * Section 04 "Explorer par univers" : exactement 6 univers, dans cet ordre (slider horizontal).
 * Slugs cibles uniquement. Une categorie absente ou sans produit publie reste masquee jusqu'a sa creation.
 */
export const HOME_TYPES = [
  { key: "sacs", label: "Sacs", slugs: ["sacs-accessoires"] },
  { key: "chaussures", label: "Chaussures", slugs: ["chaussures"] },
  { key: "parfums", label: "Parfums", slugs: ["parfums"] },
  { key: "cosmetiques", label: "Cosmétiques", slugs: ["cosmetiques"] },
  { key: "accessoires", label: "Accessoires", slugs: ["accessories"] },
  { key: "beaute", label: "Beauté", slugs: ["beaute"] },
];

/**
 * Navigation principale (en-tete + menu mobile) : "Nouveautes" est toujours present (boutique triee par
 * date) ; les autres entrees n'apparaissent que si la categorie WooCommerce existe (voir resolveNavItems).
 */
export function resolveNavItems(categories) {
  const bySlug = new Map(categories.map((c) => [c.slug, c]));
  const find = (slugs) => slugs.map((s) => bySlug.get(s)).find(Boolean);
  const items = [{ key: "nouveautes", label: "Nouveautés", href: "/shop" }];
  for (const { key, label, slugs } of [...HOME_AUDIENCES, ...HOME_TYPES]) {
    const cat = find(slugs);
    if (cat) items.push({ key, label, href: `/category/${cat.slug}` });
  }
  return items;
}

/** Univers affiches dans "Explorer par univers" (sous-ensemble de HOME_TYPES, dans l'ordre de HOME_TYPES). */
export const HOME_UNIVERSE_KEYS = ["sacs", "chaussures", "parfums", "cosmetiques"];

/** Nombre de produits par catalogue. */
export const HOME_NEW_ARRIVALS_COUNT = 8;
export const HOME_FEATURED_COUNT = 8;
/** Sous cette quantite de produits "mis en avant", la selection est completee (voir getHomeFeatured). */
export const HOME_FEATURED_MIN = 4;

/**
 * Contenu du Hero : photo de parfum (visuel paysage, recadre sur le flacon en mobile). Une seule diapositive :
 * ajouter des entrees pour activer le carrousel. Champs optionnels : `imgMobileSrc`, `secondary` ({ label, href }).
 */
export const HOME_HERO_SLIDES = [
  {
    imgSrc: "/images/hero/hero-parfum-desktop.jpg",
    alt: "Eau de parfum African Sweet, Oud Al Malik Perfumes, et son coffret dore",
    subheading: "NOUVELLE SÉLECTION",
    heading: "Le style qui vous ressemble.",
    text: "Parfums, accessoires et essentiels lifestyle sélectionnés avec soin.",
    btnText: "DÉCOUVRIR",
    href: "/shop",
  },
];

/**
 * Reassurance : exactement 4 elements. `icon` = icone de la police du theme. Textes a faire valider
 * commercialement avant mise en production.
 */
export const HOME_REASSURANCE = [
  { id: 1, icon: "icon-shipping", title: "Livraison", description: "Livraison partout au Sénégal" },
  { id: 2, icon: "icon-sealCheck", title: "Paiement", description: "Paiement simple et sécurisé" },
  { id: 3, icon: "icon-headset", title: "Service client", description: "Une équipe disponible pour vous accompagner" },
  { id: 4, icon: "icon-ShoppingBagOpen", title: "Sélection", description: "Des produits choisis avec soin" },
];
