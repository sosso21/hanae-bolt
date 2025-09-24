import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

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

    const paymentLink = await stripe.paymentLinks.create({
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: order.currency.toLowerCase() || "eur",
            unit_amount: totalAmount,
            product_data: {
              name: `Order #${order.id}`,
              description: order.name,
            },
          },
        },
      ],
      after_completion: {
        type: "redirect",
        redirect: {
          url: `${
            process.env.NEXT_PUBLIC_SUCCESS_URL ||
            "http://localhost:3000/api/success"
          }/${order.id}`,
        },
      },
      metadata: {
        shopify_order_id: order.id.toString(),
      },
    });

    return NextResponse.redirect(paymentLink.url);
  } catch (error: any) {
    console.error("ERROR_PAYMENT:", error);
    return NextResponse.json(
      { error: error.message || "ERROR_SERVER" },
      { status: 500 }
    );
  }
}
