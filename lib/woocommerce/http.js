import "server-only";
import { NextResponse } from "next/server";
import { WooNotConfiguredError, WooRequestError } from "./client";

/** Convertit une erreur WooCommerce en reponse JSON sans divulguer de detail interne. */
export function wooErrorResponse(error) {
  if (error instanceof WooNotConfiguredError) {
    return NextResponse.json({ error: "woocommerce_not_configured" }, { status: 503 });
  }
  if (error instanceof WooRequestError) {
    console.error(error.message);
    return NextResponse.json({ error: "woocommerce_upstream_error" }, { status: 502 });
  }
  console.error(error);
  return NextResponse.json({ error: "internal_error" }, { status: 500 });
}
