"use client";
import React, { useState } from "react";
import { subscribeToNewsletter } from "@/lib/newsletter";

const MESSAGES = {
  invalid_email: "Veuillez saisir une adresse e-mail valide.",
  not_configured: "L'inscription sera bientôt disponible. Merci de votre intérêt.",
  error: "Une erreur est survenue. Veuillez réessayer.",
  success: "Merci, votre inscription est bien enregistrée.",
};

// Par defaut : section du template (page demo, formulaire inerte). Avec `live` : formulaire branche sur
// lib/newsletter.js (point d'integration unique ; aucun service externe n'est appele tant qu'il n'est pas configure).
export default function NewsLetter({
  live = false,
  title = "Sign up and get 20% off your first order",
  text = "Sign up for early sale access, new in, promotions and more",
  placeholder = "Enter your e-mail",
  btnLabel = "SUBSCRIBE",
  className = "",
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | invalid_email | not_configured | error

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!live) return;
    setStatus("loading");
    try {
      const res = await subscribeToNewsletter(email);
      setStatus(res.ok ? "success" : res.reason || "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className={`section-newsletter ${className}`}>
      <div className="content">
        <h3 className="heading text-white wow fadeInUp">{title}</h3>
        <p className="text text-white wow fadeInUp" data-wow-delay="0.1s">
          {text}
        </p>
        <form
          className="form-newsletter subscribe-form wow fadeInUp"
          data-wow-delay="0.2s"
          id="subscribe-form"
          onSubmit={onSubmit}
          noValidate
        >
          <div id="subscribe-content" className="subscribe-content">
            <fieldset className="email">
              <label htmlFor="subscribe-email" className="visually-hidden">
                {placeholder}
              </label>
              <input
                type="email"
                name="email-form"
                id="subscribe-email"
                className="subscribe-email"
                placeholder={placeholder}
                tabIndex={0}
                aria-required="true"
                autoComplete={live ? "email" : undefined}
                value={live ? email : undefined}
                onChange={live ? (e) => setEmail(e.target.value) : undefined}
                aria-describedby="subscribe-msg"
              />
            </fieldset>
            <div className="button-submit">
              <button
                className="subscribe-button text-btn-uppercase font-2"
                type={live ? "submit" : "button"}
                id="subscribe-button"
                disabled={status === "loading"}
              >
                {btnLabel}
              </button>
            </div>
          </div>
        </form>
        <div id="subscribe-msg" className="subscribe-msg" role="status" aria-live="polite">
          {live ? MESSAGES[status] || "" : ""}
        </div>
      </div>
    </section>
  );
}
