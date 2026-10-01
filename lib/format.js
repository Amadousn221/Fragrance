// Formatage des prix : boutique Senegal, devise XOF (F CFA), sans decimales.
const nf = new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 });

/** 19000 -> "19 000 F CFA" (espaces insecables). */
export function formatPrice(amount) {
  const n = Number(amount);
  if (amount === null || amount === undefined || amount === "" || Number.isNaN(n)) return "";
  return `${nf.format(n)} F CFA`.replace(/ /g, " ");
}
