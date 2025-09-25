import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

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
