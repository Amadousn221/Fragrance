import { NextResponse } from "next/server";
import { getCategories } from "@/lib/woocommerce";
import { wooErrorResponse } from "@/lib/woocommerce/http";

// GET /api/woocommerce/categories
export async function GET() {
  try {
    return NextResponse.json({ categories: await getCategories() });
  } catch (error) {
    return wooErrorResponse(error);
  }
}
