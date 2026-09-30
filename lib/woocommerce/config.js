import "server-only";

// Variables attendues (serveur uniquement, jamais prefixees NEXT_PUBLIC_) :
//   WOOCOMMERCE_URL, WOOCOMMERCE_CONSUMER_KEY, WOOCOMMERCE_CONSUMER_SECRET
export function getWooConfig() {
  const url = (process.env.WOOCOMMERCE_URL || "").trim().replace(/\/+$/, "");
  const key = process.env.WOOCOMMERCE_CONSUMER_KEY || "";
  const secret = process.env.WOOCOMMERCE_CONSUMER_SECRET || "";
  return { url, key, secret, configured: Boolean(url && key && secret) };
}

export function isWooConfigured() {
  return getWooConfig().configured;
}
