import { NextResponse } from "next/server";
import { getPayPalAccessToken } from "@/lib/paypal";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    // ✅ Vérifie si déjà payé
    const verifyRes = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/paypal/verify/${id}`
    );
    if (verifyRes.ok) {
      const { paid } = await verifyRes.json();
      if (paid) {
        const redirectUrl = process.env.NEXT_PUBLIC_PAYPAL_SUCCESS_URL;
        return NextResponse.redirect(`${redirectUrl}/${id}`);
      }
    }

    // ✅ Récupère la commande Shopify
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
    const totalAmount = parseFloat(order.current_total_price);
    if (!totalAmount || totalAmount <= 0) {
      return NextResponse.json(
        { error: "ERROR_INVALID_AMOUNT" },
        { status: 400 }
      );
    }

    // ✅ Crée la commande PayPal
    const token = await getPayPalAccessToken();
    const paypalRes = await fetch(
      `https://api-m.paypal.com/v2/checkout/orders`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          intent: "CAPTURE",
          purchase_units: [
            {
              reference_id: id.toString(),
              amount: {
                currency_code: order.currency,
                value: totalAmount.toFixed(2),
              },
              description: order.name,
            },
          ],
          application_context: {
            return_url: `${process.env.NEXT_PUBLIC_PAYPAL_SUCCESS_URL}/${id}`,
            cancel_url: process.env.NEXT_PUBLIC_CANCEL_URL,
          },
        }),
      }
    );

    if (!paypalRes.ok) {
      const err = await paypalRes.text();
      return NextResponse.json(
        {
          error: "ERROR_CREATE_ORDER",
          details:
            process.env.NODE_ENV === "development" ? err : "ERROR_SERVER",
        },
        { status: paypalRes.status }
      );
    }

    const orderData = await paypalRes.json();
    const approveUrl = orderData.links.find(
      (l: any) => l.rel === "approve"
    )?.href;
    if (!approveUrl) throw new Error("No approve link from PayPal");

    return NextResponse.redirect(approveUrl, {
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
