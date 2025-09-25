import { NextResponse } from "next/server";
import { getPayPalAccessToken } from "@/lib/paypal";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const token = await getPayPalAccessToken();

    // List all PayPal orders related to the Shopify ID (here we assume reference_id = id)
    // ⚠️ PayPal doesn't have an exact equivalent to "list checkout sessions" -> we need to store the PayPal order ID
    // Simplification: we call the Search Orders API (unofficial)
    // => Best practice: save the PayPal orderID when creating and verify it here.

    // Here, we assume the PayPal ID is passed via query ?token=...
    const url = new URL(req.url);
    const paypalOrderId = url.searchParams.get("token");
    if (!paypalOrderId) {
      return NextResponse.json(
        { error: "ERROR_MISSING_TOKEN" },
        { status: 400 }
      );
    }

    const res = await fetch(
      `https://api-m.paypal.com/v2/checkout/orders/${paypalOrderId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (!res.ok)
      return NextResponse.json(
        { error: "ERROR_VERIFY_PAYMENT" },
        { status: res.status }
      );

    const data = await res.json();
    const paid = data.status === "COMPLETED";

    return NextResponse.json({ paid, order: data });
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
