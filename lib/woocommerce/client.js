import "server-only";
import { getWooConfig } from "./config";

export class WooNotConfiguredError extends Error {
  constructor() {
    super("WooCommerce n'est pas configure (variables d'environnement manquantes).");
    this.name = "WooNotConfiguredError";
  }
}

export class WooRequestError extends Error {
  constructor(status, path) {
    super(`Requete WooCommerce en echec (${status}) sur ${path}`);
    this.name = "WooRequestError";
    this.status = status;
  }
}

/**
 * GET en lecture seule sur l'API REST WooCommerce (wc/v3).
 * Les cles transitent dans l'en-tete Authorization (Basic, HTTPS), jamais dans l'URL
 * et jamais vers le navigateur. Reponse mise en cache par Next (revalidate).
 * @returns {Promise<{ data: any, totalPages: number, total: number }>}
 */
export async function wcGet(path, params = {}, { revalidate = 300, tags = ["woocommerce"] } = {}) {
  const { url, key, secret, configured } = getWooConfig();
  if (!configured) throw new WooNotConfiguredError();

  const qs = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== null && v !== "") qs.set(k, String(v));
  }
  const query = qs.toString();
  const endpoint = `${url}/wp-json/wc/v3/${path}${query ? `?${query}` : ""}`;

  const res = await fetch(endpoint, {
    headers: {
      Authorization: `Basic ${Buffer.from(`${key}:${secret}`).toString("base64")}`,
      Accept: "application/json",
    },
    next: { revalidate, tags },
  });
  // Le chemin seul est journalise : jamais l'URL complete ni les en-tetes.
  if (!res.ok) throw new WooRequestError(res.status, path);

  return {
    data: await res.json(),
    totalPages: Number(res.headers.get("x-wp-totalpages") || 1),
    total: Number(res.headers.get("x-wp-total") || 0),
  };
}
