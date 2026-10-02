"use client";
import { useState } from "react";

const Stars = ({ value }) => (
  <div className="list-star">
    {[1, 2, 3, 4, 5].map((n) => (
      <i key={n} className="icon icon-star" style={n <= Math.round(value) ? undefined : { opacity: 0.25 }} />
    ))}
  </div>
);

const formatDate = (d) => {
  const date = new Date(d);
  return Number.isNaN(date.getTime()) ? "" : date.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
};

// Avis clients WooCommerce : resume, liste et formulaire (l'avis est modere avant publication).
export default function ProductReviews({ productId, reviews }) {
  const [sort, setSort] = useState("recent");
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [status, setStatus] = useState({ state: "idle", message: "" });

  const count = reviews.length;
  const average = count ? reviews.reduce((s, r) => s + r.rating, 0) / count : 0;
  const sorted = [...reviews].sort((a, b) =>
    sort === "high" ? b.rating - a.rating : sort === "low" ? a.rating - b.rating : new Date(b.date) - new Date(a.date)
  );

  const submit = async (e) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setStatus({ state: "sending", message: "" });
    try {
      const res = await fetch("/api/woocommerce/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId,
          rating,
          name: f.get("name"),
          email: f.get("email"),
          review: f.get("review"),
          website: f.get("website"),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Envoi impossible.");
      setStatus({ state: "done", message: "Merci ! Votre avis a bien été envoyé et sera publié après validation." });
      setOpen(false);
      setRating(0);
      e.currentTarget.reset();
    } catch (err) {
      setStatus({ state: "error", message: err.message });
    }
  };

  return (
    <>
      <div className="tab-reviews-heading">
        <div className="top">
          <div className="text-center">
            <div className="number title-display">{count ? average.toFixed(1) : "–"}</div>
            <Stars value={average} />
            <p>
              ({count} {count > 1 ? "avis" : "avis"})
            </p>
          </div>
          <div className="rating-score">
            {[5, 4, 3, 2, 1].map((n) => {
              const c = reviews.filter((r) => r.rating === n).length;
              return (
                <div className="item" key={n}>
                  <div className="number-1 text-caption-1">{n}</div>
                  <i className="icon icon-star" />
                  <div className="line-bg">
                    <div style={{ width: `${count ? (c / count) * 100 : 0}%` }} />
                  </div>
                  <div className="number-2 text-caption-1">{c}</div>
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <button type="button" className="btn-style-4 text-btn-uppercase letter-1" onClick={() => setOpen((v) => !v)}>
            {open ? "Annuler" : "Écrire un avis"}
          </button>
        </div>
      </div>

      {status.state === "done" && <p className="text-secondary mb_24">{status.message}</p>}

      {open && (
        <form className="form-write-review" style={{ display: "block" }} onSubmit={submit}>
          <div className="heading">
            <h4>Écrire un avis :</h4>
            <div className="d-flex gap-4" role="radiogroup" aria-label="Note">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  role="radio"
                  aria-checked={rating === n}
                  aria-label={`${n} sur 5`}
                  onClick={() => setRating(n)}
                  style={{ background: "none", border: 0, padding: 0, fontSize: 24, lineHeight: 1, color: n <= rating ? "#f5a623" : "#d0d0d0" }}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
          <div className="mb_32">
            <div className="mb_8">Votre avis</div>
            <fieldset className="d-flex mb_20">
              <textarea name="review" rows={4} placeholder="Écrivez votre commentaire ici" required maxLength={2000} />
            </fieldset>
            <div className="cols mb_20">
              <fieldset>
                <input type="text" name="name" placeholder="Votre nom (public)" required maxLength={80} />
              </fieldset>
              <fieldset>
                <input type="email" name="email" placeholder="Votre e-mail (privé)" required maxLength={120} />
              </fieldset>
            </div>
            <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-9999px" }} />
            {status.state === "error" && <p className="mb_12" style={{ color: "#c0262d" }}>{status.message}</p>}
          </div>
          <div className="button-submit">
            <button className="text-btn-uppercase" type="submit" disabled={!rating || status.state === "sending"}>
              {status.state === "sending" ? "Envoi…" : "Envoyer mon avis"}
            </button>
          </div>
        </form>
      )}

      {count === 0 ? (
        <p className="text-secondary mt-4">Aucun avis pour le moment. Soyez le premier à donner votre avis.</p>
      ) : (
        <div className="reply-comment style-1">
          <div className="d-flex mb_24 gap-20 align-items-center justify-content-between flex-wrap">
            <h4>{count} {count > 1 ? "commentaires" : "commentaire"}</h4>
            <div className="d-flex align-items-center gap-12">
              <div className="text-caption-1">Trier par :</div>
              <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Trier les avis">
                <option value="recent">Plus récents</option>
                <option value="high">Meilleures notes</option>
                <option value="low">Notes les plus basses</option>
              </select>
            </div>
          </div>
          <div className="reply-comment-wrap">
            {sorted.map((r) => (
              <div className="reply-comment-item" key={r.id}>
                <div className="user">
                  <div className="image">
                    <img alt="" src="/images/avatar/user-default.jpg" width={120} height={120} />
                  </div>
                  <div>
                    <h6>{r.author}</h6>
                    <Stars value={r.rating} />
                    <div className="day text-secondary-2 text-caption-1">
                      {formatDate(r.date)}
                      {r.verified ? " - Achat vérifié" : ""}
                    </div>
                  </div>
                </div>
                <p className="text-secondary">{r.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
