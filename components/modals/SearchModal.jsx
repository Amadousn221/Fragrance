"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { formatPrice } from "@/lib/format";

// Recherche produits WooCommerce reels (via /api/woocommerce/products?search=).
// Aucune donnee statique : sans saisie, la modale n'affiche aucun produit.
export default function SearchModal() {
  const [query, setQuery] = useState("");
  const [state, setState] = useState({ status: "idle", products: [] });

  useEffect(() => {
    const q = query.trim();
    if (q.length < 2) {
      setState({ status: "idle", products: [] });
      return;
    }
    const controller = new AbortController();
    setState((s) => ({ ...s, status: "loading" }));
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/woocommerce/products?search=${encodeURIComponent(q)}&per_page=8`,
          { signal: controller.signal }
        );
        if (!res.ok) throw new Error(String(res.status));
        const json = await res.json();
        setState({ status: "done", products: json.products || [] });
      } catch (e) {
        if (e.name !== "AbortError") setState({ status: "error", products: [] });
      }
    }, 300);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query]);

  return (
    <div className="modal fade modal-search" id="search">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="d-flex justify-content-between align-items-center">
            <h5>Recherche</h5>
            <span
              className="icon-close icon-close-popup"
              data-bs-dismiss="modal"
            />
          </div>
          <form className="form-search" onSubmit={(e) => e.preventDefault()}>
            <fieldset className="text">
              <input
                type="search"
                placeholder="Rechercher un produit…"
                name="text"
                tabIndex={0}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoComplete="off"
                aria-label="Rechercher un produit"
              />
            </fieldset>
            <button type="submit" aria-label="Rechercher">
              <svg
                className="icon"
                width={20}
                height={20}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                  stroke="#181818"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M21.35 21.0004L17 16.6504"
                  stroke="#181818"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </form>
          <div>
            {state.status === "loading" && <p className="text-caption-1">Recherche en cours…</p>}
            {state.status === "error" && (
              <p className="text-caption-1">La recherche est momentanément indisponible.</p>
            )}
            {state.status === "done" && state.products.length === 0 && (
              <p className="text-caption-1">Aucun produit ne correspond à « {query.trim()} ».</p>
            )}
            {state.products.length > 0 && (
              <ul className="d-flex flex-column gap-3 mt-3" style={{ listStyle: "none", padding: 0 }}>
                {state.products.map((p) => (
                  <li key={p.id}>
                    <Link href={`/product/${p.slug}`} className="d-flex align-items-center gap-3 link">
                      {p.imgSrc && (
                        <img src={p.imgSrc} alt={p.title} width={56} height={72} style={{ objectFit: "cover" }} />
                      )}
                      <span className="flex-grow-1">
                        <span className="d-block text-title">{p.title}</span>
                        <span className="d-block text-caption-1">{formatPrice(p.price)}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
