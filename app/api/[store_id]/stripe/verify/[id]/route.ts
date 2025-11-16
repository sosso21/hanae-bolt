// app/api/stripe/verify/[id]/route.ts
// -

import { NextResponse } from "next/server";
import Stripe from "stripe";

// Lazy initialization to avoid build-time errors
function getStripe(): Stripe {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error("STRIPE_SECRET_KEY is not configured");
  }
  return new Stripe(secretKey);
}

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const stripe = getStripe();
    const sessions = await stripe.checkout.sessions.list({
      limit: 50,
    });

    const session = sessions.data.find(
      (s) =>
        s.metadata?.shopify_order_id === id.toString() &&
        s.payment_status === "paid"
    );

    if (!session) {
      return NextResponse.json(
        { error: "ERROR_VERIFY_PAYMENT" },
        { status: 400 }
      );
    }

    return NextResponse.json({ paid: true, session });
  } catch (error: any) {
    return NextResponse.json(
      {
        error:
          process.env.NODE_ENV === "development"
            ? error.message
            : "ERROR_SERVER",
      },
      { status: 500 }
    );
  }
}
