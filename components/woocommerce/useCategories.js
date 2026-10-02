"use client";
import { useEffect, useState } from "react";

// Categories WooCommerce reelles pour la navigation (via /api/woocommerce/categories).
// Une seule requete par chargement de page ; en cas d'echec la navigation reste utilisable sans categories.
let cache = null;
let inflight = null;

function load() {
  if (cache) return Promise.resolve(cache);
  if (!inflight) {
    inflight = fetch("/api/woocommerce/categories")
      .then((r) => (r.ok ? r.json() : { categories: [] }))
      .then((j) => (cache = (j.categories || []).filter((c) => c.slug !== "uncategorized")))
      .catch(() => [])
      .finally(() => {
        inflight = null;
      });
  }
  return inflight;
}

export default function useCategories() {
  const [categories, setCategories] = useState(cache || []);
  useEffect(() => {
    let alive = true;
    load().then((list) => alive && setCategories(list));
    return () => {
      alive = false;
    };
  }, []);
  return categories;
}
