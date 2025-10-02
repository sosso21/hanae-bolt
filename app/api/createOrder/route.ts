import { NextResponse } from "next/server";
import { encodePriceToOrderId, decodeOrderIdToPrice } from "@/lib/order-id";
import { STORES } from "@/lib/multi-store/multi-store.constants";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const totalPrice = body?.getTotalPrice;
    if (totalPrice === undefined || totalPrice === null) {
      return NextResponse.json(
        { error: "MISSING_TOTAL_PRICE" },
        { status: 400 }
      );
    }

    const priceString =
      typeof totalPrice === "number" ? String(totalPrice) : String(totalPrice);
    const orderId = await encodePriceToOrderId(priceString);

    const fakeStore = STORES.find((store) => store.STORE_KIND === "FAKE");

    return NextResponse.json({
      success: true,
      orderId,
      stripeUrl: `/api/${fakeStore?.STORE_ID}/stripe/payment/${orderId ?? 1}`,
      paypalUrl: `/api/${fakeStore?.STORE_ID}/paypal/payment/${orderId ?? 1}`,
    });
  } catch (error) {
    console.error("CREATE_ORDER_POST_ERROR", error);
    return NextResponse.json({ error: "ERROR_CREATE_ORDER" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get("orderId");
    if (!orderId) {
      return NextResponse.json({ error: "MISSING_ORDER_ID" }, { status: 400 });
    }
    const price = await decodeOrderIdToPrice(orderId);
    return NextResponse.json({ success: true, totalPrice: price });
  } catch (error) {
    console.error("CREATE_ORDER_GET_ERROR", error);
    return NextResponse.json(
      { error: "ERROR_DECODE_ORDER_ID" },
      { status: 400 }
    );
  }
}
