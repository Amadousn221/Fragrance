"use client";
import { useContextElement } from "@/context/Context";

// Compteur du panier : total des quantites (lignes WooCommerce et lignes demo).
export default function CartLength() {
  const { cartCount } = useContextElement();
  return <>{cartCount}</>;
}
