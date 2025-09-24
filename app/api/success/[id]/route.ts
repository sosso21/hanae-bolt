import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    if (!id) {
      return NextResponse.json({ error: "ERROR_MISSING_ID" }, { status: 400 });
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

    if (!txnsRes.ok) {
      const err = await txnsRes.text();
      console.error("ERROR_FETCH_TRANSACTIONS:", err);
      return NextResponse.json(
        { error: "ERROR_FETCH_TRANSACTIONS" },
        { status: txnsRes.status }
      );
    }

    const { transactions } = await txnsRes.json();
    let kind: "sale" | "capture" = "sale";
    if (transactions && transactions.length > 0) {
      kind = "capture";
    }

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
            gateway: "stripe",
          },
        }),
      }
    );

    if (!txnRes.ok) {
      const err = await txnRes.text();
      console.error("ERROR_CREATE_TRANSACTION:", err);
      return NextResponse.json(
        { error: "ERROR_CREATE_TRANSACTION", details: err },
        { status: txnRes.status }
      );
    }

    const redirectUrl =
      process.env.NEXT_PUBLIC_STORE_URL || "http://localhost:3000";

    return NextResponse.redirect(redirectUrl);
  } catch (error: any) {
    console.error("ERROR_SERVER:", error);
    return NextResponse.json(
      { error: error.message || "ERROR_SERVER" },
      { status: 500 }
    );
  }
}
