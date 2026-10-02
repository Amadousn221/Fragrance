import { NextResponse } from "next/server";
import { wcPost } from "@/lib/woocommerce/client";

// Depot d'un avis client : cree en attente de moderation (status "hold"), jamais publie directement.
export async function POST(request) {
  let b;
  try {
    b = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }
  // Piege anti-robot : champ cache que seuls les robots remplissent.
  if (b.website) return NextResponse.json({ ok: true });

  const productId = Number(b.productId);
  const rating = Number(b.rating);
  const name = String(b.name || "").trim().slice(0, 80);
  const email = String(b.email || "").trim().slice(0, 120);
  const review = String(b.review || "").trim().slice(0, 2000);
  if (!Number.isInteger(productId) || productId <= 0 || !(rating >= 1 && rating <= 5) || !name || !review || !/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json({ error: "Veuillez renseigner une note, votre nom, un e-mail valide et votre avis." }, { status: 400 });
  }
  try {
    await wcPost("products/reviews", { product_id: productId, review, reviewer: name, reviewer_email: email, rating: Math.round(rating), status: "hold" });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[reviews] échec de l'envoi", e?.status, e?.message);
    return NextResponse.json({ error: "Votre avis n'a pas pu être envoyé pour le moment. Réessayez plus tard." }, { status: 502 });
  }
}
