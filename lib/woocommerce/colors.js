// Teintes des pastilles de couleur (fiche produit et cartes). Clés en minuscules.
const COLOR_ATTRS = /^(couleur|color|colour)$/i;
const COLOR_HEX = {
  "blanc ivoire": "#F4EFE4", ivoire: "#F4EFE4", blanc: "#FFFFFF", noir: "#111111", gris: "#9A9A9A",
  beige: "#D9C7A8", nude: "#E3BFA4", marron: "#6B4A33", camel: "#B98A55", cognac: "#9A4E1C", taupe: "#8B7B6E",
  rouge: "#C0262D", bordeaux: "#6D1A2A", rose: "#E8A5B7", "rose métallisé": "#E3A6B4", orange: "#E8762C",
  jaune: "#F2C94C", vert: "#3C8D5A", kaki: "#7A7A4B", turquoise: "#2EB5B0", bleu: "#2F5FA8",
  "bleu marine": "#1B2A4A", marine: "#1B2A4A", violet: "#6F4A8E", doré: "#C9A24A", dore: "#C9A24A",
  argenté: "#C0C0C0", argente: "#C0C0C0",
  "vert foncé": "#1F4D36", "vert forêt": "#2D5A3D", "beige bicolore": "#D9C7A8", "jaune / moutarde": "#D9A826", moutarde: "#D9A826",
  "ivoire / blanc": "#F4EFE4", "bleu royal": "#2A52BE", "bleu ciel": "#8EC5E8", "beige / nude": "#DCC1A5",
};

export const isColorAttribute = (name) => COLOR_ATTRS.test(name || "");

// Teinte d'une option de couleur ; null si inconnue (le composant retombe alors sur un bouton texte).
export function getColorSwatch(attrName, option) {
  if (!isColorAttribute(attrName)) return null;
  const key = String(option).trim().toLowerCase();
  // Nom compose ("Ivoire / Blanc") non liste : on retombe sur la premiere teinte.
  return COLOR_HEX[key] || COLOR_HEX[key.split("/")[0].trim()] || null;
}
