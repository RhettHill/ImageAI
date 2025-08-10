"use client";

import { loadStripe } from "@stripe/stripe-js";
import { useEffect } from "react";

import { useToast } from "@/components/ui/use-toast";
import { checkoutCredits } from "@/lib/actions/transaction.action";
import { Button } from "@/components/ui/button";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const Checkout = ({
  plan,
  amount,
  credits,
  buyerId,
}: {
  plan: string;
  amount: number;
  credits: number;
  buyerId: string;
}) => {
  const { toast } = useToast();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      toast({
        title: "Order placed!",
        description: "You will receive an email confirmation",
      });
    }

    if (query.get("canceled")) {
      toast({
        title: "Order canceled!",
        description: "Continue to shop around and checkout when you're ready",
      });
    }
  }, [toast]);

  const onCheckout = async () => {
    try {
      const transaction = { plan, amount, credits, buyerId };
      const { sessionId } = await checkoutCredits(transaction); // must return { sessionId }

      const stripe = await stripePromise;
      if (!stripe) throw new Error("Stripe failed to load");

      const { error } = await stripe.redirectToCheckout({ sessionId });
      if (error) console.error(error.message);
    } catch (err) {
      console.error(err);
      toast({
        title: "Checkout failed",
        description: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <section>
      <Button
        type="button"
        role="link"
        onClick={onCheckout}
        className="w-full rounded-full bg-purple-gradient bg-cover"
      >
        Buy Credit
      </Button>
    </section>
  );
};

export default Checkout;
