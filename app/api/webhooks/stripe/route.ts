/**
 * Stripe webhook endpoint
 *
 * To test locally:
 *   1. Install the Stripe CLI: https://stripe.com/docs/stripe-cli
 *   2. Run: stripe listen --forward-to localhost:3000/api/webhooks/stripe
 *   3. Set STRIPE_WEBHOOK_SECRET in .env.local to the secret printed by the CLI
 *
 * In production:
 *   1. Add this URL to your Stripe dashboard webhook configuration
 *   2. Set STRIPE_WEBHOOK_SECRET to the signing secret from the dashboard
 */

import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getStripe } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("[stripe-webhook] STRIPE_WEBHOOK_SECRET is not set");
    return NextResponse.json(
      { error: "Webhook secret not configured" },
      { status: 500 }
    );
  }

  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    const stripe = getStripe();
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Invalid signature";
    console.error("[stripe-webhook] Signature verification failed:", msg);
    return NextResponse.json({ error: msg }, { status: 400 });
  }

  // Handle events
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      await handleCheckoutComplete(session);
      break;
    }

    case "payment_intent.payment_failed": {
      const pi = event.data.object as Stripe.PaymentIntent;
      console.log("[stripe-webhook] Payment failed:", pi.id);
      // TODO: notify customer, update order status, etc.
      break;
    }

    default:
      // Log unhandled events in dev
      if (process.env.NODE_ENV === "development") {
        console.log("[stripe-webhook] Unhandled event type:", event.type);
      }
  }

  return NextResponse.json({ received: true });
}

async function handleCheckoutComplete(
  session: Stripe.Checkout.Session
) {
  // TODO: Implement order fulfilment logic here:
  //
  // 1. Save the order to your database (Prisma, Supabase, PlanetScale, etc.)
  // 2. Send order confirmation email to customer
  // 3. Update inventory counts
  // 4. Trigger third-party fulfilment (Printful, ShipBob, etc.)
  // 5. Log the 10% charity contribution
  //
  // session.customer_email — customer email
  // session.amount_total   — total in pence
  // session.metadata       — metadata passed at checkout creation
  // session.line_items     — fetch with: stripe.checkout.sessions.listLineItems(session.id)
  //
  // Example:
  // await db.orders.create({ data: { stripeSessionId: session.id, ... } })

  console.log("[stripe-webhook] Order completed:", {
    sessionId: session.id,
    email: session.customer_email,
    amount: session.amount_total,
    metadata: session.metadata,
  });
}
