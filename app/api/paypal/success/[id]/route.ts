import { NextResponse } from "next/server";
import { getPayPalAccessToken } from "@/lib/paypal";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const url = new URL(req.url);
    const paypalOrderId = url.searchParams.get("token");
    if (!paypalOrderId) {
      return NextResponse.json(
        { error: "ERROR_MISSING_TOKEN" },
        { status: 400 }
      );
    }

    // ✅ Capture le paiement PayPal (obligatoire)
    const token = await getPayPalAccessToken();
    const captureRes = await fetch(
      `https://api-m.paypal.com/v2/checkout/orders/${paypalOrderId}/capture`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!captureRes.ok) {
      return NextResponse.json(
        { error: "ERROR_CAPTURE_PAYMENT" },
        { status: captureRes.status }
      );
    }

    const captureData = await captureRes.json();
    if (captureData.status !== "COMPLETED") {
      return NextResponse.json(
        { error: "ERROR_PAYMENT_NOT_CONFIRMED" },
        { status: 400 }
      );
    }

    const orderRes = await fetch(
      `https://${process.env.NEXT_SHOPIFY_STORE_DOMAIN}/admin/api/2023-10/orders/${id}.json`,
      {
        headers: {
          "X-Shopify-Access-Token": process.env.NEXT_SHOPIFY_ACCESS_TOKEN || "",
        },
      }
    );
    if (!orderRes.ok) {
      return NextResponse.json(
        { error: "ERROR_FETCH_ORDER" },
        { status: orderRes.status }
      );
    }
    const { order } = await orderRes.json();

    const txnsRes = await fetch(
      `https://${process.env.NEXT_SHOPIFY_STORE_DOMAIN}/admin/api/2023-10/orders/${id}/transactions.json`,
      {
        headers: {
          "X-Shopify-Access-Token": process.env.NEXT_SHOPIFY_ACCESS_TOKEN || "",
        },
      }
    );
    const { transactions } = await txnsRes.json();
    let kind: "sale" | "capture" =
      transactions && transactions.length > 0 ? "capture" : "sale";

    // ✅ Crée la transaction Shopify
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
          error: "ERROR_CREATE_TRANSACTION",
          details:
            process.env.NODE_ENV === "development" ? err : "ERROR_SERVER",
        },
        { status: txnRes.status }
      );
    }

    const redirectUrl = `${
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
    }/fr/success`;
    return NextResponse.redirect(redirectUrl);
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
