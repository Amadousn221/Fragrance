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

/** Section 04 : navigation par type de produit (le 1er bloc disponible est le plus grand de la mosaique). */
export const HOME_TYPES = [
  { key: "sacs", label: "Sacs", slugs: ["sacs", "sacs-accessoires"] },
  { key: "chaussures", label: "Chaussures", slugs: ["chaussures", "sneakers"] },
  { key: "parfums", label: "Parfums", slugs: ["parfums"] },
  { key: "vetements", label: "Vêtements", slugs: ["vetements"] },
  { key: "accessoires", label: "Accessoires", slugs: ["accessoires", "accessories"] },
];

/** Nombre de produits par catalogue. */
export const HOME_NEW_ARRIVALS_COUNT = 8;
export const HOME_FEATURED_COUNT = 8;
/** Sous cette quantite de produits "mis en avant", la selection est completee (voir getHomeFeatured). */
export const HOME_FEATURED_MIN = 4;

/** Contenu du Hero (images conservees pour ce lot ; le visuel sera retravaille plus tard). */
export const HOME_HERO_SLIDES = [
  {
    imgSrc: "/images/slider/slider-women1.jpg",
    alt: "Fragrance",
    subheading: "FRAGRANCE",
    heading: "Boutique\nlifestyle",
    btnText: "Découvrir la boutique",
  },
  {
    imgSrc: "/images/slider/slider-women2.jpg",
    alt: "Fragrance",
    subheading: "FRAGRANCE",
    heading: "Une sélection\nchoisie avec soin",
    btnText: "Découvrir la boutique",
  },
];

/** Section 07 : exactement 4 elements. Textes a faire valider commercialement avant mise en production. */
export const HOME_REASSURANCE = [
  { key: "livraison", title: "Livraison", text: "Livraison partout au Sénégal" },
  { key: "paiement", title: "Paiement sécurisé", text: "Paiement simple et sécurisé" },
  { key: "service", title: "Service client", text: "Une équipe disponible pour vous accompagner" },
  { key: "selection", title: "Sélection", text: "Des produits choisis avec soin" },
];
