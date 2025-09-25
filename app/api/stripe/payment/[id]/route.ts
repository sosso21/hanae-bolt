// app/api/stripe/payment/[id]/route.ts 
// -
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const sessions = await stripe.checkout.sessions.list({ limit: 50 });

    const existingSession = sessions.data.find(
      (s) =>
        s.metadata?.shopify_order_id === id.toString() &&
        s.payment_status === "paid"
    );

    if (existingSession) {
      const redirectUrl =
        process.env.NEXT_PUBLIC_STRIPE_SUCCESS_URL ||
        "http://localhost:3000/api/stripe/success";
      return NextResponse.redirect(`${redirectUrl}/${id}`);
    }

    const shopifyRes = await fetch(
      `https://${process.env.NEXT_SHOPIFY_STORE_DOMAIN}/admin/api/2023-10/orders/${id}.json`,
      {
        headers: {
          "X-Shopify-Access-Token": process.env.NEXT_SHOPIFY_ACCESS_TOKEN || "",
          "Content-Type": "application/json",
        },
      }
    );

    if (!shopifyRes.ok) {
      return NextResponse.json(
        { error: "ERROR_ORDER" },
        { status: shopifyRes.status }
      );
    }

    const { order } = await shopifyRes.json();
    const totalAmount = Math.round(parseFloat(order.current_total_price) * 100);

    if (!totalAmount || totalAmount <= 0) {
      return NextResponse.json(
        { error: "ERROR_INVALID_AMOUNT" },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: order.currency.toLowerCase() || "eur",
            unit_amount: totalAmount,
            product_data: {
              name: `Order #${order.id}`,
              description: order.name,
            },
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${
        process.env.NEXT_PUBLIC_STRIPE_SUCCESS_URL ||
        "http://localhost:3000/api/stripe/success"
      }/${order.id}`,
      cancel_url:
        process.env.NEXT_PUBLIC_CANCEL_URL || "http://localhost:3000/cancel",
      metadata: {
        shopify_order_id: order.id.toString(),
      },
    });

    return NextResponse.redirect(session.url!, {
      headers: { "Referrer-Policy": "no-referrer" },
    });
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
