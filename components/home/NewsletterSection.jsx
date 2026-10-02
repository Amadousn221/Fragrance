"use client";
import { useState } from "react";
import { subscribeToNewsletter } from "@/lib/newsletter";

const MESSAGES = {
  invalid_email: "Veuillez saisir une adresse e-mail valide.",
  not_configured: "L'inscription sera bientôt disponible. Merci de votre intérêt.",
  error: "Une erreur est survenue. Veuillez réessayer.",
  success: "Merci, votre inscription est bien enregistrée.",
};

// Section 06 : newsletter (interface seule, aucun service connecte ; pas de popup automatique).
export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | invalid_email | not_configured | error

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await subscribeToNewsletter(email);
      setStatus(res.ok ? "success" : res.reason || "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="hm-section hm-newsletter">
      <div className="container">
        <div className="hm-newsletter__inner">
          <h2 className="hm-newsletter__title">Rejoignez notre univers</h2>
          <p className="hm-newsletter__text">
            Nouveautés, sélections et offres exclusives directement dans votre boîte mail.
          </p>
          <form className="hm-newsletter__form" onSubmit={onSubmit} noValidate>
            <label htmlFor="hm-newsletter-email" className="visually-hidden">
              Votre adresse e-mail
            </label>
            <input
              id="hm-newsletter-email"
              type="email"
              name="email"
              autoComplete="email"
              placeholder="Votre adresse e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="hm-newsletter__input"
              aria-describedby="hm-newsletter-status"
            />
            <button type="submit" className="hm-newsletter__btn" disabled={status === "loading"}>
              S'inscrire
            </button>
          </form>
          <p id="hm-newsletter-status" className="hm-newsletter__status" role="status" aria-live="polite">
            {MESSAGES[status] || ""}
          </p>
        </div>
      </div>
    </section>
  );
}
