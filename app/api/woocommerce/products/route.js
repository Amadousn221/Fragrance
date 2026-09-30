import { NextResponse } from "next/server";
import { getProducts } from "@/lib/woocommerce";
import { wooErrorResponse } from "@/lib/woocommerce/http";

// GET /api/woocommerce/products?page=&per_page=&category=&search=&orderby=&order=
export async function GET(request) {
  const sp = request.nextUrl.searchParams;
  try {
    const result = await getProducts({
      page: sp.get("page") || 1,
      perPage: sp.get("per_page") || 12,
      category: sp.get("category") || undefined,
      search: sp.get("search") || undefined,
      orderby: sp.get("orderby") || undefined,
      order: sp.get("order") || undefined,
    });
    return NextResponse.json(result);
  } catch (error) {
    return wooErrorResponse(error);
  }
}
