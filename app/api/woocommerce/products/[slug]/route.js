import { NextResponse } from "next/server";
import { getProductBySlug } from "@/lib/woocommerce";
import { wooErrorResponse } from "@/lib/woocommerce/http";

// GET /api/woocommerce/products/:slug  (produit + variations)
export async function GET(_request, { params }) {
  const { slug } = await params;
  try {
    const product = await getProductBySlug(slug);
    if (!product) return NextResponse.json({ error: "not_found" }, { status: 404 });
    return NextResponse.json({ product });
  } catch (error) {
    return wooErrorResponse(error);
  }
}
