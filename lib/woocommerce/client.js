import "server-only";
import { getWooConfig } from "./config";

export class WooNotConfiguredError extends Error {
  constructor() {
    super("WooCommerce n'est pas configure (variables d'environnement manquantes).");
    this.name = "WooNotConfiguredError";
  }
}

export class WooRequestError extends Error {
  constructor(status, path, detail = "") {
    super(`Requete WooCommerce en echec (${status}) sur ${path}${detail ? ` : ${detail}` : ""}`);
    this.name = "WooRequestError";
    this.status = status;
  }
}

/**
 * GET en lecture seule sur l'API REST WooCommerce (wc/v3).
 * Les cles transitent dans l'en-tete Authorization (Basic, HTTPS) ; en repli (401 si l'hebergeur retire cet en-tete)
 * elles passent en parametres d'URL, cote serveur seulement. Jamais vers le navigateur. Reponse mise en cache par Next (revalidate).
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

  const request = (target, withHeader) =>
    fetch(target, {
      headers: {
        ...(withHeader ? { Authorization: `Basic ${Buffer.from(`${key}:${secret}`).toString("base64")}` } : {}),
        Accept: "application/json",
      },
      next: { revalidate, tags },
    });

  let res = await request(endpoint, true);
  // Certains hebergeurs (LiteSpeed/Apache mutualise, WAF) suppriment l'en-tete Authorization : WooCommerce repond
  // alors 401. Repli unique, cote serveur et en HTTPS uniquement : cles en parametres d'URL (jamais journalisees).
  if (res.status === 401 && url.startsWith("https://")) {
    const authQs = new URLSearchParams(qs);
    authQs.set("consumer_key", key);
    authQs.set("consumer_secret", secret);
    res = await request(`${url}/wp-json/wc/v3/${path}?${authQs.toString()}`, false);
  }
  // Le chemin seul est journalise : jamais l'URL complete ni les en-tetes.
  if (!res.ok) {
    // Code d'erreur WooCommerce (ex. woocommerce_rest_authentication_error) pour le diagnostic ; jamais de secret.
    let detail = "";
    try {
      const body = await res.json();
      detail = [body.code, body.message].filter(Boolean).join(" - ").slice(0, 160);
    } catch {}
    throw new WooRequestError(res.status, path, detail);
  }

  return {
    data: await res.json(),
    totalPages: Number(res.headers.get("x-wp-totalpages") || 1),
    total: Number(res.headers.get("x-wp-total") || 0),
  };
}

/**
 * POST sur l'API REST WooCommerce (ecriture : avis clients). Utilise WOOCOMMERCE_WRITE_KEY / WOOCOMMERCE_WRITE_SECRET
 * si definies (cle dediee), sinon les cles de lecture. Cote serveur uniquement ; jamais de cache.
 */
export async function wcPost(path, body) {
  const { url, key, secret, configured } = getWooConfig();
  if (!configured) throw new WooNotConfiguredError();
  const k = process.env.WOOCOMMERCE_WRITE_KEY || key;
  const s = process.env.WOOCOMMERCE_WRITE_SECRET || secret;
  const endpoint = `${url}/wp-json/wc/v3/${path}`;
  const send = (target, withHeader) =>
    fetch(target, {
      method: "POST",
      headers: {
        ...(withHeader ? { Authorization: `Basic ${Buffer.from(`${k}:${s}`).toString("base64")}` } : {}),
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });
  let res = await send(endpoint, true);
  if (res.status === 401 && url.startsWith("https://")) {
    res = await send(`${endpoint}?${new URLSearchParams({ consumer_key: k, consumer_secret: s })}`, false);
  }
  if (!res.ok) {
    let detail = "";
    try {
      const b = await res.json();
      detail = [b.code, b.message].filter(Boolean).join(" - ").slice(0, 160);
    } catch {}
    throw new WooRequestError(res.status, path, detail);
  }
  return res.json();
}
