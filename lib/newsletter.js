// Inscription newsletter : point d'integration unique.
//
// Aucun service n'est connecte pour le moment : rien n'est envoye ni stocke.
// Pour brancher Klaviyo (ou autre), remplacer le corps de `subscribeToNewsletter` par un appel a une route
// serveur (ex. POST /api/newsletter) qui detient la cle API ; ne jamais exposer la cle au navigateur.
// Le composant NewsletterSection n'a pas a changer : il affiche le resultat de cette fonction.

/** @returns {Promise<{ ok: boolean, reason?: "not_configured" | "invalid_email" | "error" }>} */
export async function subscribeToNewsletter(email) {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(email).trim())) {
    return { ok: false, reason: "invalid_email" };
  }
  return { ok: false, reason: "not_configured" };
}
