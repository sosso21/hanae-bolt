// app/api/[store_id]/paypal/payment/[id]/route.ts
import { getStore } from "@/lib/multi-store/multi-store.constants";
import { NextResponse } from "next/server";

/**
 * Get PayPal access token (global, not store-specific)
 */
async function getPayPalAccessToken() {
  const client = process.env.PAYPAL_CLIENT_ID!;
  const secret = process.env.PAYPAL_SECRET!;
  const auth = Buffer.from(`${client}:${secret}`).toString("base64");

  const paypalApiUrl = process.env.NEXT_PAYPAL_API_URL!;
  const res = await fetch(`${paypalApiUrl}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  if (!res.ok) {
    throw new Error("ERROR_PAYPAL_ACCESS_TOKEN");
  }

  const data = await res.json();
  return data.access_token as string;
}

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

    // ✅ Fetch Shopify order
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

    // ✅ If already paid → redirect to success
    if (order.financial_status === "paid") {
      const redirectUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/fr/success`;
      return NextResponse.redirect(redirectUrl);
    }

    // ✅ Check valid amount
    const totalAmount = parseFloat(order.current_total_price);
    if (!totalAmount || totalAmount <= 0) {
      return NextResponse.json(
        { error: "ERROR_INVALID_AMOUNT" },
        { status: 400 }
      );
    }

    // ✅ Create PayPal order
    const accessToken = await getPayPalAccessToken();

    const NEXT_PUBLIC_PAYPAL_SUCCESS_URL =
      `${process.env.NEXT_PUBLIC_PAYPAL_SUCCESS_URL}`
        .split("[store_id]")
        .join(store_id);

    const createOrderRes = await fetch(
      `${process.env.NEXT_PAYPAL_API_URL}/v2/checkout/orders`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          intent: "CAPTURE",
          purchase_units: [
            {
              amount: {
                currency_code: order.currency || "EUR",
                value: totalAmount.toFixed(2),
              },
              description: `Order #${order.id} - ${order.name}`,
            },
          ],
          application_context: {
            return_url: `${NEXT_PUBLIC_PAYPAL_SUCCESS_URL}/${order.id}`,
            cancel_url: process.env.NEXT_PUBLIC_CANCEL_URL,
          },
        }),
      }
    );

    if (!createOrderRes.ok) {
      const errorText = await createOrderRes.text();
      return NextResponse.json(
        {
          error:
            process.env.NODE_ENV === "development"
              ? errorText
              : "ERROR_CREATE_PAYPAL_ORDER",
        },
        { status: 500 }
      );
    }

    const orderData = await createOrderRes.json();

    // ✅ Extract approval link
    const approveLink = orderData.links.find(
      (link: any) => link.rel === "approve"
    )?.href;

    if (!approveLink) {
      return NextResponse.json(
        { error: "ERROR_NO_APPROVAL_LINK" },
        { status: 500 }
      );
    }

    // ✅ Redirect to PayPal checkout
    return NextResponse.redirect(approveLink, {
      headers: { "Referrer-Policy": "no-referrer" },
    });
  } catch (error: any) {
    console.error("PAYPAL_PAYMENT_ROUTE_ERROR:", error);
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
