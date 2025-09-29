// app/api/[store_id]/stripe/payment/[id]/route.ts
import { getStore } from "@/lib/multi-store/multi-store.constants";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string; store_id: string }> }
) {
  try {
    const { id, store_id } = await context.params;

    // ✅ Retrieve store configuration
    const { STORE_KIND, NEXT_SHOPIFY_ACCESS_TOKEN, NEXT_SHOPIFY_STORE_DOMAIN } =
      getStore(store_id);

    // ✅ Handle FAKE store case
    if (STORE_KIND === "FAKE") {
      return NextResponse.json(
        { message: "FAKE store - skipping real payment" },
        { status: 200 }
      );
    }

    // ✅ Check if Stripe session already exists and is paid
    const sessions = await stripe.checkout.sessions.list({ limit: 50 });
    const existingSession = sessions.data.find(
      (s) =>
        s.metadata?.shopify_order_id === id.toString() &&
        s.payment_status === "paid"
    );

    const NEXT_PUBLIC_STRIPE_SUCCESS_URL =
      `${process.env.NEXT_PUBLIC_STRIPE_SUCCESS_URL}`
        .split("[store_id]")
        .join(store_id);

    if (existingSession) {
      return NextResponse.redirect(`${NEXT_PUBLIC_STRIPE_SUCCESS_URL}/${id}`);
    }

    // ✅ Fetch Shopify order (multi-store)
    const shopifyRes = await fetch(
      `https://${NEXT_SHOPIFY_STORE_DOMAIN}/admin/api/2023-10/orders/${id}.json`,
      {
        headers: {
          "X-Shopify-Access-Token": NEXT_SHOPIFY_ACCESS_TOKEN,
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

    // ✅ If order already marked as paid in Shopify
    if (order.financial_status === "paid") {
      const redirectUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/fr/success`;
      return NextResponse.redirect(redirectUrl);
    }

    // ✅ Create Stripe checkout session
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
      success_url: `${NEXT_PUBLIC_STRIPE_SUCCESS_URL}/${order.id}`,
      cancel_url: process.env.NEXT_PUBLIC_CANCEL_URL,
      metadata: {
        shopify_order_id: order.id.toString(),
      },
    });

    return NextResponse.redirect(session.url!, {
      headers: { "Referrer-Policy": "no-referrer" },
    });
  } catch (error: any) {
    console.error("STRIPE_PAYMENT_ROUTE_ERROR:", error);
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
