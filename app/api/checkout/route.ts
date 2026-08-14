import { NextRequest, NextResponse } from "next/server";
import { createCheckoutSession } from "@/lib/stripe";
import type { CartItem } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const items: CartItem[] = body.items;

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: "Cart is empty" },
        { status: 400 }
      );
    }

    // Basic validation — ensure each item has required fields
    for (const item of items) {
      if (!item.product?.id || !item.variant?.id || !item.quantity) {
        return NextResponse.json(
          { error: "Invalid cart item" },
          { status: 400 }
        );
      }
    }

    const session = await createCheckoutSession(items);

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Checkout failed";
    console.error("[checkout]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
