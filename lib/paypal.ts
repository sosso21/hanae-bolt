export async function getPayPalAccessToken() {
  const auth = Buffer.from(
    `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`
  ).toString("base64");

  const res = await fetch(
    `https://${
      process.env.NODE_ENV === "production"
        ? "api-m.paypal.com"
        : "api-m.sandbox.paypal.com"
    }/v1/oauth2/token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${auth}`,
      },
      body: "grant_type=client_credentials",
    }
  );

  if (!res.ok) throw new Error("PayPal token error");
  const data = await res.json();
  return data.access_token as string;
}
