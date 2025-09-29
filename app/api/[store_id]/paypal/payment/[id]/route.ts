import { NextResponse } from "next/server";

async function getPayPalAccessToken() {
  const client = process.env.PAYPAL_CLIENT_ID!;
  const secret = process.env.PAYPAL_SECRET!;

  const auth = Buffer.from(`${client}:${secret}`).toString("base64");

  const paypal_api_url = process.env.NEXT_PAYPAL_API_URL;
  const res = await fetch(`${paypal_api_url}/v1/oauth2/token`, {
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

    if (order.financial_status === "paid") {
      const redirectUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/fr/success`;
      return NextResponse.redirect(redirectUrl);
    }

    const totalAmount = parseFloat(order.current_total_price);
    if (!totalAmount || totalAmount <= 0) {
      return NextResponse.json(
        { error: "ERROR_INVALID_AMOUNT" },
        { status: 400 }
      );
    }

    const accessToken = await getPayPalAccessToken();

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
            return_url: `${process.env.NEXT_PUBLIC_PAYPAL_SUCCESS_URL}/${order.id}`,
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

    const approveLink = orderData.links.find(
      (link: any) => link.rel === "approve"
    )?.href;

    if (!approveLink) {
      return NextResponse.json(
        { error: "ERROR_NO_APPROVAL_LINK" },
        { status: 500 }
      );
    }

    return NextResponse.redirect(approveLink, {
      headers: { "Referrer-Policy": "no-referrer" },
    });
  } catch (error: any) {
    console.error("PayPal API error:", error);
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
