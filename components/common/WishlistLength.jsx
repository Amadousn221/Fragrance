"use client";
import { useContextElement } from "@/context/Context";

// Compteur de favoris (entrees WooCommerce uniquement).
export default function WishlistLength() {
  const { wishlistItems } = useContextElement();
  return <>{wishlistItems.length}</>;
}
