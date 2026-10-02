"use client";
import { useRef } from "react";

// Rangee horizontale a defilement natif (scroll-snap) avec fleches discretes (desktop).
export default function ScrollRow({ children, label = "Produits", nav = true }) {
  const ref = useRef(null);
  const scrollBy = (dir) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.max(240, el.clientWidth * 0.8), behavior: "smooth" });
  };
  return (
    <div className="hm-row">
      <div className="hm-row__track" ref={ref} role="list" aria-label={label} tabIndex={0}>
        {children}
      </div>
      {nav && (
      <div className="hm-row__nav">
        <button type="button" onClick={() => scrollBy(-1)} aria-label="Précédent" className="hm-row__btn">
          <span aria-hidden="true">←</span>
        </button>
        <button type="button" onClick={() => scrollBy(1)} aria-label="Suivant" className="hm-row__btn">
          <span aria-hidden="true">→</span>
        </button>
      </div>
      )}
    </div>
  );
}
