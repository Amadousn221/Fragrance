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

/** Nombre de produits par catalogue. */
export const HOME_NEW_ARRIVALS_COUNT = 8;
export const HOME_FEATURED_COUNT = 8;
/** Sous cette quantite de produits "mis en avant", la selection est completee (voir getHomeFeatured). */
export const HOME_FEATURED_MIN = 4;

/** Contenu du Hero : un visuel paysage (desktop) + un visuel portrait (mobile). Le texte sera retravaille plus tard. */
export const HOME_HERO_SLIDES = [
  {
    imgSrc: "/images/hero/hero-parfum-desktop.jpg",
    imgMobileSrc: "/images/hero/hero-parfum-mobile.jpg",
    alt: "Eau de parfum African Sweet, Oud Al Malik Perfumes, et son coffret dore",
    subheading: "BOUTIQUE LIFESTYLE",
    heading: "Fragrance.",
    text: "Parfums, sacs et accessoires choisis avec soin.",
    btnText: "Découvrir la boutique",
    href: "/shop",
    secondary: { label: "Voir les parfums", href: "/category/parfums" },
  },
];

/** Section 07 : exactement 4 elements. Textes a faire valider commercialement avant mise en production. */
export const HOME_REASSURANCE = [
  { key: "livraison", title: "Livraison", text: "Livraison partout au Sénégal" },
  { key: "paiement", title: "Paiement sécurisé", text: "Paiement simple et sécurisé" },
  { key: "service", title: "Service client", text: "Une équipe disponible pour vous accompagner" },
  { key: "selection", title: "Sélection", text: "Des produits choisis avec soin" },
];
