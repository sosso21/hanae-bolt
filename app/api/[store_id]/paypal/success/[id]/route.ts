import { getStore } from "@/lib/multi-store/multi-store.constants";
import { NextResponse } from "next/server";

/**
 * Get PayPal access token
 */
async function getPayPalAccessToken() {
  const client = process.env.PAYPAL_CLIENT_ID!;
  const secret = process.env.PAYPAL_SECRET!;
  const auth = Buffer.from(`${client}:${secret}`).toString("base64");

  const paypalApiUrl = process.env.NEXT_PAYPAL_API_URL;
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
    const {
      STORE_ID,
      STORE_TITLE,
      NEXT_SHOPIFY_ACCESS_TOKEN,
      NEXT_SHOPIFY_API_KEY,
      NEXT_SHOPIFY_SECRET_KEY,
      NEXT_SHOPIFY_STORE_DOMAIN,
    } = getStore(store_id);
    if (!id) {
      return NextResponse.json({ error: "ERROR_MISSING_ID" }, { status: 400 });
    }

    const { searchParams } = new URL(req.url);
    const paypalOrderID = searchParams.get("token");
    if (!paypalOrderID) {
      return NextResponse.json(
        { error: "ERROR_MISSING_PAYPAL_ORDER_ID" },
        { status: 400 }
      );
    }

    // ✅ Retrieve PayPal order to check if already captured
    const accessToken = await getPayPalAccessToken();
    const orderRes = await fetch(
      `${process.env.NEXT_PAYPAL_API_URL}/v2/checkout/orders/${paypalOrderID}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!orderRes.ok) {
      const errText = await orderRes.text();
      return NextResponse.json(
        {
          error:
            process.env.NODE_ENV === "development"
              ? errText
              : "ERROR_FETCH_PAYPAL_ORDER",
        },
        { status: 500 }
      );
    }

    const orderData = await orderRes.json();

    // ✅ Ensure the PayPal payment is completed
    if (orderData.status !== "COMPLETED") {
      return NextResponse.json(
        { error: "ERROR_PAYMENT_NOT_COMPLETED" },
        { status: 400 }
      );
    }

    // ✅ Fetch order from Shopify
    const shopifyOrderRes = await fetch(
      `https://${process.env.NEXT_SHOPIFY_STORE_DOMAIN}/admin/api/2023-10/orders/${id}.json`,
      {
        headers: {
          "X-Shopify-Access-Token": process.env.NEXT_SHOPIFY_ACCESS_TOKEN || "",
        },
      }
    );

    if (!shopifyOrderRes.ok) {
      return NextResponse.json(
        { error: "ERROR_FETCH_ORDER" },
        { status: shopifyOrderRes.status }
      );
    }

    const { order } = await shopifyOrderRes.json();

    // ✅ Check existing transactions to decide kind
    const txnsRes = await fetch(
      `https://${process.env.NEXT_SHOPIFY_STORE_DOMAIN}/admin/api/2023-10/orders/${id}/transactions.json`,
      {
        headers: {
          "X-Shopify-Access-Token": process.env.NEXT_SHOPIFY_ACCESS_TOKEN || "",
        },
      }
    );

    if (!txnsRes.ok) {
      const err = await txnsRes.text();
      return NextResponse.json(
        {
          error:
            process.env.NODE_ENV === "development"
              ? err
              : "ERROR_FETCH_TRANSACTIONS",
        },
        { status: txnsRes.status }
      );
    }

    const { transactions } = await txnsRes.json();
    let kind: "sale" | "capture" = "sale";
    if (transactions && transactions.length > 0) {
      kind = "capture";
    }

    // ✅ Create transaction in Shopify to mark order as paid
    const txnRes = await fetch(
      `https://${process.env.NEXT_SHOPIFY_STORE_DOMAIN}/admin/api/2023-10/orders/${id}/transactions.json`,
      {
        method: "POST",
        headers: {
          "X-Shopify-Access-Token": process.env.NEXT_SHOPIFY_ACCESS_TOKEN || "",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          transaction: {
            kind,
            status: "success",
            amount: order.current_total_price.toString(),
            gateway: "paypal",
          },
        }),
      }
    );

    if (!txnRes.ok) {
      const err = await txnRes.text();
      return NextResponse.json(
        {
          error:
            process.env.NODE_ENV === "development"
              ? err
              : "ERROR_CREATE_TRANSACTION",
        },
        { status: txnRes.status }
      );
    }

    // ✅ Redirect to success page
    const redirectUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/fr/success`;
    return NextResponse.redirect(redirectUrl);
  } catch (error: any) {
    console.error("PAYPAL_SUCCESS_ROUTE_ERROR:", error);
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
