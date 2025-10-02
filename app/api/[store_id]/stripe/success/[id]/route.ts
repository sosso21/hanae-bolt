// app/api/[store_id]/stripe/success/[id]/route.ts
import { getStore } from "@/lib/multi-store/multi-store.constants";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string; store_id: string }> }
) {
  try {
    const { id, store_id } = await context.params;
    if (!id) {
      return NextResponse.json({ error: "ERROR_MISSING_ID" }, { status: 400 });
    }

    // ✅ Retrieve store configuration
    const { STORE_KIND, NEXT_SHOPIFY_ACCESS_TOKEN, NEXT_SHOPIFY_STORE_DOMAIN } =
      getStore(store_id);

    // ✅ Handle FAKE store case
    if (STORE_KIND === "FAKE") {
      const redirectUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/fr/success`;
      return NextResponse.redirect(redirectUrl);
    }

    // ✅ Verify with Stripe first
    const verifyRes = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/${store_id}/stripe/verify/${id}`
    );

    if (!verifyRes.ok) {
      return NextResponse.json(
        { error: "ERROR_VERIFY_PAYMENT" },
        { status: verifyRes.status }
      );
    }

    const verifyData = await verifyRes.json();
    if (!verifyData.paid) {
      return NextResponse.json(
        { error: "ERROR_PAYMENT_NOT_CONFIRMED" },
        { status: 400 }
      );
    }

    // ✅ Fetch order from Shopify
    const orderRes = await fetch(
      `https://${NEXT_SHOPIFY_STORE_DOMAIN}/admin/api/2023-10/orders/${id}.json`,
      {
        headers: {
          "X-Shopify-Access-Token": NEXT_SHOPIFY_ACCESS_TOKEN,
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

    // ✅ Fetch existing transactions
    const txnsRes = await fetch(
      `https://${NEXT_SHOPIFY_STORE_DOMAIN}/admin/api/2023-10/orders/${id}/transactions.json`,
      {
        headers: {
          "X-Shopify-Access-Token": NEXT_SHOPIFY_ACCESS_TOKEN,
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

    // ✅ Create transaction in Shopify
    const txnRes = await fetch(
      `https://${NEXT_SHOPIFY_STORE_DOMAIN}/admin/api/2023-10/orders/${id}/transactions.json`,
      {
        method: "POST",
        headers: {
          "X-Shopify-Access-Token": NEXT_SHOPIFY_ACCESS_TOKEN,
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

    // ✅ Redirect to store
    const redirectUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/fr/success`;
    return NextResponse.redirect(redirectUrl);
  } catch (error: any) {
    console.error("STRIPE_SUCCESS_ROUTE_ERROR:", error);
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
