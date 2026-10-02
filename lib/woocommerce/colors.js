// Teintes des pastilles de couleur (fiche produit et cartes). Clés en minuscules.
const COLOR_ATTRS = /^(couleur|color|colour)$/i;
const COLOR_HEX = {
  "blanc ivoire": "#F4EFE4", ivoire: "#F4EFE4", blanc: "#FFFFFF", noir: "#111111", gris: "#9A9A9A",
  beige: "#D9C7A8", nude: "#E3BFA4", marron: "#6B4A33", camel: "#B98A55", cognac: "#9A4E1C", taupe: "#8B7B6E",
  rouge: "#C0262D", bordeaux: "#6D1A2A", rose: "#E8A5B7", "rose métallisé": "#E3A6B4", orange: "#E8762C",
  jaune: "#F2C94C", vert: "#3C8D5A", kaki: "#7A7A4B", turquoise: "#2EB5B0", bleu: "#2F5FA8",
  "bleu marine": "#1B2A4A", marine: "#1B2A4A", violet: "#6F4A8E", doré: "#C9A24A", dore: "#C9A24A",
  argenté: "#C0C0C0", argente: "#C0C0C0",
};

export const isColorAttribute = (name) => COLOR_ATTRS.test(name || "");

// Teinte d'une option de couleur ; null si inconnue (le composant retombe alors sur un bouton texte).
export function getColorSwatch(attrName, option) {
  if (!isColorAttribute(attrName)) return null;
  return COLOR_HEX[String(option).trim().toLowerCase()] || null;
}
