/* eslint-disable camelcase */
import { createTransaction } from "@/lib/actions/transaction.action";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  let event;
  try {
    const body = await request.text();
    const sig = request.headers.get("stripe-signature") as string;

    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("❌ Webhook signature verification failed:", err);
    return new Response(`Webhook Error: ${err}`, { status: 400 });
  }

  try {
    if (event.type === "checkout.session.completed") {
  const session = event.data.object as Stripe.Checkout.Session;
  console.log("✅ Webhook hit:", session.id);
  console.log("Metadata received:", session.metadata);

  const transaction = {
    stripeId: session.id,
    amount: session.amount_total ? session.amount_total / 100 : 0,
    plan: session.metadata?.plan || "",
    credits: Number(session.metadata?.credits) || 0,
    buyerId: session.metadata?.buyerId || "",
    createdAt: new Date(),
  };

  const newTransaction = await createTransaction(transaction);
  console.log("Transaction created:", newTransaction);

  return new Response("ok", { status: 200 });
}
}catch (err) {
    console.error("❌ Webhook handler failed:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
