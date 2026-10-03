// Cartes produit : un produit variable avec plus de 4 couleurs est affiche en plusieurs cartes de 4 couleurs.
// Module pur (serveur comme client). `variations` : variations normalisees (normalizeVariation).
import { isColorAttribute } from "./colors";

export const COLORS_PER_CARD = 4;

const sameOption = (a, b) => String(a).trim().toLowerCase() === String(b).trim().toLowerCase();

// Donnees d'une couleur pour la carte : image, prix et stock de la premiere variation de cette couleur.
function colorVariant(product, colorName, option, variations) {
  const v =
    variations.find(
      (x) => x.inStock && x.attributes.some((a) => isColorAttribute(a.name) && sameOption(a.option, option))
    ) ||
    variations.find((x) => x.attributes.some((a) => isColorAttribute(a.name) && sameOption(a.option, option)));
  return {
    option,
    image: v?.image?.src || null,
    price: v?.price ?? product.price,
    oldPrice: v?.onSale && v?.regularPrice ? v.regularPrice : undefined,
    inStock: v ? v.inStock : product.inStock,
  };
}

/** Eclate un produit en cartes de 4 couleurs. Renvoie [product] tel quel s'il n'y a rien a eclater. */
export function splitByColorGroups(product, variations = []) {
  const colorAttr = (product.attributes || []).find((a) => isColorAttribute(a.name) && a.options?.length);
  if (product.type !== "variable" || !colorAttr) return [product];

  const colors = colorAttr.options.map((option) => colorVariant(product, colorAttr.name, option, variations));
  const groups = [];
  for (let i = 0; i < colors.length; i += COLORS_PER_CARD) groups.push(colors.slice(i, i + COLORS_PER_CARD));

  return groups.map((cardColors, n) => ({
    ...product,
    cardKey: `${product.id}-${n}`,
    cardColors,
    // Image de depart de la carte : celle de sa premiere couleur.
    imgSrc: cardColors[0].image || product.imgSrc,
    imgHover: cardColors[0].image || product.imgHover,
  }));
}
